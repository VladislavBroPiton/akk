/* ═══════════════ СВОЯ МЕТРИКА: СБОР НА СТОРОНЕ САЙТА ═══════════════
   Ни Яндекса, ни Google. Скрипт сам собирает событие и отправляет его
   на наш приёмник. Пока endpoint пустой — скрипт молчит и ничего не шлёт,
   сайт работает как обычно.

   Что НЕ собираем принципиально: содержимое полей форм (имя, телефон),
   точный IP, ничего, что позволяет опознать человека. Только обезличенные
   технические данные и факт действия.

   Подключается ПЕРЕД main.js, обработчики вешаются делегированием —
   в остальной код лезть не нужно.                                        */

(function () {
  'use strict';

  const CFG = {
    // URL приёмника на Render. Пустая строка = сбор выключен.
    endpoint: 'https://amper-stat.onrender.com/collect',
    // Сколько ждать после ввода в поиске, прежде чем засчитать запрос
    searchDelay: 1200,
  };

  if (!CFG.endpoint) return;

  // ── ИДЕНТИФИКАТОРЫ ──
  // uid живёт в localStorage — отличает нового посетителя от вернувшегося.
  // sid живёт в sessionStorage — одна вкладка = один визит.
  function id(store, key) {
    try {
      let v = store.getItem(key);
      if (!v) {
        v = Math.random().toString(36).slice(2) + Date.now().toString(36);
        store.setItem(key, v);
      }
      return v;
    } catch (e) {
      return 'no-storage';   // приватный режим — считаем как разовый визит
    }
  }

  // ── УСТРОЙСТВО И ОС ──
  function device() {
    const ua = navigator.userAgent;
    const touch = navigator.maxTouchPoints || 0;

    // iPadOS с 13-й версии представляется маком — ловим по тач-точкам
    const isIpad = /iPad/.test(ua) || (/Macintosh/.test(ua) && touch > 1);
    const isIphone = /iPhone|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);
    const isAndroidTablet = isAndroid && !/Mobile/.test(ua);

    let os = 'Другая';
    if (isIphone || isIpad) os = 'iOS';
    else if (isAndroid) os = 'Android';
    else if (/Windows/.test(ua)) os = 'Windows';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/Linux/.test(ua)) os = 'Linux';

    let type = 'desktop';
    if (isIphone || (isAndroid && /Mobile/.test(ua))) type = 'mobile';
    else if (isIpad || isAndroidTablet) type = 'tablet';

    let browser = 'Другой';
    if (/YaBrowser/.test(ua)) browser = 'Яндекс.Браузер';
    else if (/Edg\//.test(ua)) browser = 'Edge';
    else if (/OPR\//.test(ua)) browser = 'Opera';
    else if (/Firefox/.test(ua)) browser = 'Firefox';
    else if (/Chrome/.test(ua)) browser = 'Chrome';
    else if (/Safari/.test(ua)) browser = 'Safari';

    return {
      type: type,
      os: os,
      browser: browser,
      screen: screen.width + 'x' + screen.height,
      viewport: document.documentElement.clientWidth + 'x' + document.documentElement.clientHeight,
      dpr: window.devicePixelRatio || 1,
      lang: navigator.language || '',
      tz: (Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
    };
  }

  // ── ИСТОЧНИК ПЕРЕХОДА ──
  function source() {
    const p = new URLSearchParams(location.search);
    const ref = document.referrer || '';
    let channel = 'Прямой';

    if (p.get('utm_source')) channel = 'Реклама / метка';
    else if (ref) {
      const host = (ref.split('/')[2] || '').replace(/^www\./, '');
      if (host && host !== location.host) {
        if (/yandex\./.test(host)) channel = 'Яндекс';
        else if (/google\./.test(host)) channel = 'Google';
        else if (/(vk\.com|t\.me|ok\.ru|instagram|facebook)/.test(host)) channel = 'Соцсети';
        else if (/(2gis|maps)/.test(host)) channel = 'Карты';
        else channel = 'Другие сайты';
      } else {
        channel = 'Внутренний';
      }
    }

    return {
      channel: channel,
      referrer: ref.slice(0, 300),
      utm_source: p.get('utm_source') || '',
      utm_medium: p.get('utm_medium') || '',
      utm_campaign: p.get('utm_campaign') || '',
    };
  }

  const uid = id(localStorage, '_amp_uid');
  const sid = id(sessionStorage, '_amp_sid');
  const dev = device();
  const src = source();
  const started = Date.now();

  // ── ОТПРАВКА ──
  // sendBeacon не блокирует уход со страницы и переживает закрытие вкладки.
  function send(event, data) {
    const body = JSON.stringify({
      uid: uid,
      sid: sid,
      event: event,
      data: data || {},
      page: location.pathname.split('/').pop() || 'index.html',
      query: location.search.slice(0, 200),
      title: document.title.slice(0, 150),
      device: dev,
      source: src,
      ts: new Date().toISOString(),
    });

    // Тип строго text/plain. С application/json браузер потребует preflight,
    // а sendBeacon его не умеет — запрос на другой домен просто не уйдёт.
    // Сервер разбирает тело как JSON вручную.
    const blobType = 'text/plain;charset=UTF-8';

    if (navigator.sendBeacon) {
      const ok = navigator.sendBeacon(CFG.endpoint, new Blob([body], { type: blobType }));
      if (ok) return;
    }
    fetch(CFG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': blobType },
      body: body,
      keepalive: true,
      mode: 'cors',
    }).catch(function () { /* аналитика не должна ломать сайт */ });
  }

  // ── ПРОСМОТР СТРАНИЦЫ ──
  send('pageview');

  // ── ГЛУБИНА ПРОКРУТКИ И ВРЕМЯ ──
  // Отправляем один раз при уходе: видно, дочитывают ли до формы внизу.
  let maxScroll = 0;
  window.addEventListener('scroll', function () {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    const pct = Math.round((window.scrollY / h) * 100);
    if (pct > maxScroll) maxScroll = Math.min(100, pct);
  }, { passive: true });

  let leftSent = false;
  function onLeave() {
    if (leftSent) return;
    leftSent = true;
    send('leave', {
      seconds: Math.round((Date.now() - started) / 1000),
      scroll: maxScroll,
    });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') onLeave();
  });
  window.addEventListener('pagehide', onLeave);

  // ── ЦЕЛЕВЫЕ ДЕЙСТВИЯ ──
  // Делегирование: разметка собирается из JS уже после загрузки,
  // поэтому вешаться на конкретные элементы нельзя.
  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';

    if (href.indexOf('tel:') === 0) return send('phone', { where: place(a) });
    if (href.indexOf('mailto:') === 0) return send('mail', { where: place(a) });
    if (a.classList.contains('footer-messenger')) return send('messenger');
    if (href.indexOf('yandex.ru/maps') !== -1) return send('route');
    if (a.classList.contains('search-row')) return send('search_click');
    if (href.indexOf('catalog.html?cat=') !== -1) return send('open_section', { section: href.split('cat=')[1].split('&')[0] });
  }, true);

  function place(el) {
    if (el.closest('.header')) return 'шапка';
    if (el.closest('.footer')) return 'подвал';
    if (el.closest('.mobile-menu')) return 'мобильное меню';
    return 'страница';
  }

  // ── ОТПРАВКА ФОРМЫ ──
  // Пишем только факт и с какой формы. Содержимое полей не трогаем.
  document.addEventListener('submit', function (e) {
    const f = e.target;
    send('form', {
      where: f.closest('.article-sidebar-widget') ? 'виджет статьи'
           : f.closest('.cta-banner') ? 'блок «Подобрать аккумулятор»'
           : 'другая',
    });
  }, true);

  // ── ПОИСК ПО САЙТУ ──
  // Самое ценное: запросы, по которым ничего не нашлось, — это список
  // товаров, которых не хватает в каталоге.
  const seen = {};
  let timer = null;
  document.addEventListener('input', function (e) {
    const el = e.target;
    if (el.id !== 'searchInput' && el.id !== 'searchOverlayInput') return;
    const q = el.value.trim().toLowerCase();
    clearTimeout(timer);
    if (q.length < 3 || seen[q]) return;
    timer = setTimeout(function () {
      seen[q] = true;
      const found = (typeof searchFind === 'function') ? searchFind(q).length : null;
      send('search', { query: q.slice(0, 80), found: found });
    }, CFG.searchDelay);
  }, true);

  // ── ФИЛЬТРЫ КАТАЛОГА ──
  // Что реально ищут: ёмкость, полярность, бренд — подсказка по закупке.
  document.addEventListener('change', function (e) {
    const cb = e.target;
    if (!cb.dataset || !cb.dataset.key || !cb.closest('#sidebar')) return;
    if (cb.type === 'checkbox' && !cb.checked) return;
    send('filter', { key: cb.dataset.key, value: cb.value || cb.dataset.bound });
  }, true);

  // ── «ПОКАЗАТЬ ЕЩЁ» ──
  document.addEventListener('click', function (e) {
    const b = e.target.closest('.load-more button');
    if (b) send('load_more');
  }, true);
})();
