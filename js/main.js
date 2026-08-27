/* ─────────────────────────────────────────
   AMPER — main.js
   Shared components + interactivity
───────────────────────────────────────── */

/* ── ОБЩИЕ КАРТИНКИ ──
   Раньше лежали здесь же в base64 и раздували main.js до 960 КБ: браузер
   тянул все фото при каждом заходе на любую страницу и не мог их кешировать.
   Теперь это обычные файлы из папки img/ — грузятся параллельно, кешируются
   и не задерживают отрисовку. Заменить фото = положить файл в img/ и
   поправить путь ниже. */
const IMG = {
  battery: 'img/battery-varta.jpg',
  heroBg: 'img/hero-main.jpg',
  heroBgServices: 'img/hero-services.jpg',
  heroBgAbout: 'img/hero-about.jpg',
  footerMapDesk: 'img/footer-map.png',
  footerMapMob: 'img/footer-map-mobile.png',
};

// ── ИКОНКИ ──
// Инлайном, а не файлами: иконки перекрашиваются через currentColor
// (в шапке чёрные, в тёмном меню белые) и не дают лишних запросов.
const ICON_SEARCH = '<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">' +
  '<circle cx="9" cy="9" r="6.2" stroke="currentColor" stroke-width="1.8"/>' +
  '<path d="M13.6 13.6L18.2 18.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
// крестик закрытия полноэкранного поиска — векторная иконка вместо символа
// «✕»: по девпанели 18×18, обычный текстовый глиф на таком размере плывёт
const ICON_CLOSE_X = '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M4 4l10 10M14 4L4 14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';

// иконка-«ползунки» рядом с заголовком «Фильтр» внутри панели фильтра — как в макете (rivet-icons filter-solid)
const ICON_FILTER = '<svg viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M1 4.5h16M1 13.5h16" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
  '<circle cx="6.5" cy="4.5" r="3.2" fill="currentColor"/>' +
  '<circle cx="11.5" cy="13.5" r="3.2" fill="currentColor"/></svg>';

// иконка-«воронка» кнопки открытия фильтра на мобильном — срисована с
// исходника Figma (файл «Фильтр» в папке Дизайн)
const ICON_FUNNEL = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M4 5h16l-6.2 8.2v6l-3.6-1.8v-4.2z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>';

// плитки «Доставка / Самовывоз / Гарантии» на странице товара — контурные
// иконки, срисованы с исходников Figma (Frame 1000003468)
const ICON_DELIVERY = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M2 7.5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9.5a1 1 0 0 1-1 1h-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<path d="M2 7.5v8.5a1 1 0 0 0 1 1h1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
  '<path d="M13 10h3.6a1 1 0 0 1 .8.4l2.4 3.2a1 1 0 0 1 .2.6V17a1 1 0 0 1-1 1h-1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
  '<circle cx="7" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/>' +
  '<circle cx="17" cy="18" r="1.8" stroke="currentColor" stroke-width="1.6"/>' +
  '<path d="M9 18h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
const ICON_PICKUP = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M12 3l8 4.2v9.6L12 21l-8-4.2V7.2L12 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
  '<path d="M12 11.5V21M4 7.2l8 4.3 8-4.3" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>';
const ICON_WARRANTY = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
  '<path d="M7 2.5h7l4 4V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
  '<path d="M14 2.5V7a1 1 0 0 0 1 1h4" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' +
  '<path d="M9 13h6M9 16.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>';
// треугольники стрелок слайдера «Похожие товары» — как в макете
const ICON_ARROW_LEFT = '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false"><path d="M8.5 1.5 3 6l5.5 4.5V1.5z"/></svg>';
const ICON_ARROW_RIGHT = '<svg viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" focusable="false"><path d="M3.5 1.5 9 6l-5.5 4.5V1.5z"/></svg>';

// ── HEADER HTML ──
function renderHeader(activePage = '') {
  // Состав и расположение — по макету: навигация уехала в верхнюю строку,
  // «Каталог», поиск и телефон остались в основной.
  // «О компании» и «Статьи» добавлены в выпадающее меню: в макете на десктопе
  // их нет вовсе, а без них эти страницы недостижимы из шапки.
  const pages = [
    { href: 'index.html', label: 'Главная' },
    {
      // href ведёт на «Доставку»: раньше здесь был '#', и клик по пункту
      // прокручивал страницу вверх и дописывал решётку в адрес
      href: 'delivery.html', label: 'Покупателям', dropdown: [
        { href: 'services.html',       label: 'Услуги' },
        { href: 'delivery.html',       label: 'Доставка' },
        { href: 'services.html#parts', label: 'Запчасти под заказ' },
        { href: 'about.html',          label: 'О компании' },
        { href: 'articles.html',       label: 'Статьи' },
      ]
    },
    { href: 'contacts.html', label: 'Контакты' },
  ];

  const navItems = pages.map(p => {
    if (p.dropdown) {
      const items = p.dropdown.map(d =>
        `<a href="${d.href}" class="${activePage === d.href ? 'active' : ''}">${d.label}</a>`
      ).join('');
      return `<li class="nav-dropdown"><a href="${p.href}">${p.label}</a>
        <div class="nav-dropdown-menu"><div class="nav-dropdown-menu-inner">${items}</div></div></li>`;
    }
    return `<li><a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a></li>`;
  }).join('');

  // Мобильное меню — состав из макета. «Каталога» в списке нет: он вынесен
  // отдельной кнопкой в шапку меню, как в Figma.
  const mobilePages = [
    { href: 'index.html',    label: 'Главная' },
    { href: 'services.html', label: 'Услуги' },
    { href: 'delivery.html', label: 'Доставка' },
    { href: 'about.html',    label: 'О компании' },
    { href: 'contacts.html', label: 'Контакты' },
    { href: 'articles.html', label: 'Статьи' },
  ];
  const mobileItems = mobilePages.map(p =>
    `<a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a>`
  ).join('');

  // logo-text_sm.svg уже содержит подпись «аккумуляторный центр» внутри
  // самой картинки — раньше та же подпись рисовалась ещё раз обычным
  // текстом поверх, и в шапке было два «аккумуляторный центр» подряд.
  const logoInner = `
        <span class="logo-bolt-svg">
          <img src="img/logo-bolt_sm.svg" alt="" width="22" height="34" style="flex-shrink:0;">
          <img src="img/logo-text_sm.svg" alt="АМПЕР аккумуляторный центр" height="34" class="logo-text-img">
        </span>`;

  const catalogIcon = '<span class="btn-catalog-icon"><span></span><span></span><span></span><span></span></span>';

  return `
<header class="header">
  <div class="container">
    <div class="header-top">
      <div class="header-top-left">
        <span class="header-addr">г. Волжский, ул. Пушкина 51д/319</span>
        <a href="mailto:amper134@yandex.ru">amper134@yandex.ru</a>
      </div>
      <nav class="header-top-nav">
        <ul class="nav">${navItems}</ul>
      </nav>
    </div>
    <div class="header-main">
      <button class="burger" id="burgerBtn" type="button" aria-label="Открыть меню" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <a href="index.html" class="logo">${logoInner}</a>
      <a href="catalog.html" class="btn-catalog">
        ${catalogIcon}
        <span class="btn-catalog-label">Каталог</span>
      </a>
      <div class="search-wrap">
        <span class="search-icon">${ICON_SEARCH}</span>
        <input type="search" class="search-input" id="searchInput" placeholder="Поиск" autocomplete="off">
        <div class="search-drop" id="searchDrop" hidden></div>
      </div>
      <button class="icon-btn icon-btn-search" id="searchOpenBtn" type="button" aria-label="Поиск">${ICON_SEARCH}</button>
      <a href="tel:+79950253434" class="header-phone">+7-995-025-34-34</a>
    </div>
  </div>
</header>

<div class="search-overlay" id="searchOverlay">
  <div class="search-overlay-bar">
    <div class="search-overlay-field">
      <input type="search" id="searchOverlayInput" placeholder="Поиск" autocomplete="off">
      <span class="search-overlay-icon">${ICON_SEARCH}</span>
    </div>
    <button class="search-overlay-close" id="searchOverlayClose" type="button" aria-label="Закрыть поиск">${ICON_CLOSE_X}</button>
  </div>
  <div class="search-overlay-body" id="searchOverlayBody"></div>
</div>

<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu-bar">
    <button class="mobile-menu-close" id="mobileClose" type="button" aria-label="Закрыть меню">✕</button>
    <a href="index.html" class="mobile-menu-logo">
      <img src="img/logo-bolt_sm.svg" alt="" width="20" height="30">
      <img src="img/logo-text_sm.svg" alt="АМПЕР" height="16">
    </a>
    <button class="icon-btn icon-btn-light" id="mobileSearchOpen" type="button" aria-label="Поиск">${ICON_SEARCH}</button>
    <a href="catalog.html" class="icon-btn icon-btn-white" aria-label="Каталог">${catalogIcon}</a>
  </div>
  <nav class="mobile-nav">${mobileItems}</nav>
  <div class="mobile-menu-contacts">
    <div class="mobile-menu-label">Адрес</div>
    <div class="mobile-menu-val mobile-menu-addr">г. Волжский, ул. Пушкина 51д/319</div>
    <div class="mobile-menu-label">Почта</div>
    <a class="mobile-menu-val" href="mailto:amper134@yandex.ru">amper134@yandex.ru</a>
  </div>
</div>`;
}

// ── FOOTER HTML ──
function renderFooter() {
  return `
<footer class="footer">
  <div class="footer-map-wrap">
    <img id="footer-map-img" class="footer-map-img" alt="">
  </div>
  <div class="container footer-content">
    <div class="footer-grid">

      <!-- Колонка 1: телефон + мессенджеры + карта Волжского -->
      <div class="footer-col-left">
        <div class="footer-label">Телефон</div>
        <a href="tel:+79950253434" class="footer-phone-big">+7-995-025-34-34</a>
        <div class="footer-label">Мессенджеры</div>
        <div class="footer-messengers">
          <a href="#" class="footer-messenger" title="Telegram"><img src="img/icon-telegram.png" alt="Telegram" width="18" height="18"></a>
          <a href="#" class="footer-messenger" title="Max"><img src="img/icon-max.png" alt="Max" width="18" height="18"></a>
          <a href="mailto:amper134@yandex.ru" class="footer-messenger" title="Email"><img src="img/icon-mail.png" alt="Email" width="18" height="18"></a>
        </div>

      </div>

      <!-- Колонки 2+3: адрес и меню (на мобиле в одну строку) -->
      <div class="footer-col-mid-right">
      <div class="footer-col-mid">
        <div class="footer-label">Адрес магазина</div>
        <span class="footer-val">г. Волжский, ул. Пушкина<br class="footer-addr-break"> 51д/319</span>
        <div class="footer-label">График работы</div>
        <span class="footer-val">Ежедневно с 8.30 до 18.30</span>
      </div>

      <!-- Колонка 3: меню -->
      <div class="footer-col-right">
        <div class="footer-label">Меню</div>
        <nav class="footer-nav">
          <a href="index.html">Главная</a>
          <a href="catalog.html">Каталог</a>
          <a href="delivery.html">Покупателям</a>
          <a href="about.html">О компании</a>
          <a href="contacts.html">Контакты</a>
        </nav>
      </div>
      </div><!-- /footer-col-mid-right -->

    </div>
  </div><!-- /footer-content: карта и копирайт ниже — уже вне контейнера,
             иначе их «container» вкладывался бы в этот и удваивал padding -->
  <!-- Карта только для мобилы — между контентом и копирайтом -->
  <div class="footer-map-mobile">
    <img id="footer-map-mob-img" alt="">
  </div>
  <div class="container">
    <div class="footer-bottom">
      <span class="footer-copy">Все права защищены ©АМПЕР</span>
      <a href="#" class="footer-policy">Политика конфиденциальности</a>
      <span class="footer-credit"><span>Разработка</span><a href="https://lead-studio.pro" target="_blank" rel="noopener"><img src="img/lead-studio-icon.png" alt="" class="footer-credit-icon-img"><img src="img/lead-studio-text.png" alt="Lead Studio" class="footer-credit-logo"></a></span>
    </div>
  </div>
</footer>`;
}

// ── CTA FORM HTML ──
function renderCtaForm(dark = false) {
  return `
<section class="cta-banner">
  <div class="container">
    <div class="cta-inner">
      <div>
        <h2 class="cta-title">Подобрать аккумулятор</h2>
        <p class="cta-desc">Наши специалисты учитывают все характеристики — от ёмкости до типа <br class="cta-desc-break">корпуса. Вы получите точный подбор, консультацию и рекомендации <br class="cta-desc-break">по эксплуатации</p>
      </div>
      <div class="cta-form">
        <form class="contact-form" onsubmit="handleForm(event)">
          <div class="form-field">
            <input type="text" class="form-input" name="name" autocomplete="name" placeholder="Имя" required>
            <span class="form-required">*</span>
          </div>
          <div class="form-field">
            <input type="tel" class="form-input" name="phone" autocomplete="tel" placeholder="Ваш телефон" required>
            <span class="form-required">*</span>
          </div>
          <!-- поле необязательное — звёздочки здесь быть не должно -->
          <div class="form-field">
            <input type="text" class="form-input" name="request" placeholder="Что нужно найти?">
          </div>
          <!-- галочка снята по умолчанию и обязательна: согласие на обработку
               персональных данных должно быть активным действием посетителя -->
          <label class="form-check">
            <input type="checkbox" name="consent" required>
            Я согласен/на на обработку персональных данных
          </label>
          <button type="submit" class="form-submit">Отправить</button>
        </form>
      </div>
    </div>
  </div>
</section>`;
}

// ── BREADCRUMB ──
function renderBreadcrumb(items) {
  const html = items.map((item, i) =>
    i < items.length - 1
      ? `<a href="${item.href}">${item.label}</a><span class="breadcrumb-sep">/</span>`
      : `<span>${item.label}</span>`
  ).join('');
  return `<div class="breadcrumb"><div class="container">${html}</div></div>`;
}

// ── ЗАГЛУШКИ ДЛЯ НЕЗАГРУЗИВШИХСЯ ФОТО ──
// Пока фото товаров лежат на внешнем домене, часть картинок не отдаётся.
// Вместо иконки «битое изображение» + alt-текста подставляем аккуратную заглушку.
function productImgFallback(el) {
  const ph = document.createElement('div');
  ph.className = 'img-fallback';
  ph.textContent = '🔋';
  el.replaceWith(ph);
}
function articleImgFallback(el) {
  const ph = document.createElement('div');
  ph.className = 'article-card-img-placeholder';
  el.replaceWith(ph);
}

// ── PRODUCT CARD ──
// price === null → «По запросу» (пока клиент не передал прайс);
// «Р» — буквой, не значком ₽: в Adderley нет глифа ₽, браузер подставлял
// его из запасного шрифта, отсюда несовпадающая высота символа
function productCard(name, specs, price = null) {
  const isInquiry = price == null;
  const priceValue = isInquiry ? 'По запросу' : `${price.toLocaleString('ru-RU')} Р`;
  return `
<a href="product.html?name=${encodeURIComponent(name)}" class="product-card">
  <div class="product-card-img">
    <img src="${IMG.battery}" alt="${name}" loading="lazy" onerror="productImgFallback(this)">
  </div>
  <div class="product-card-body">
    <div class="product-card-name">${name}</div>
    ${specs.map(s => `<div class="product-spec"><span>${s[0]}</span><span class="product-spec-val">${s[1]}</span></div>`).join('')}
    <div class="product-price"><span class="price-label">Цена</span><span class="price-value${isInquiry ? ' price-value-inquiry' : ''}">${priceValue}</span></div>
    <span class="btn-link">Подробнее</span>
  </div>
</a>`;
}

// ── ARTICLE CARD ──
// Принимает запись из ARTICLES (js/articles-data.js) целиком, чтобы
// заголовок, текст, фото и ссылка не разъезжались по трём страницам.
function articleCard(a) {
  return `
<a href="${a.file}" class="article-card">
  ${a.img
    ? `<img src="${a.img}" alt="${a.title}" class="article-card-img" loading="lazy" onerror="articleImgFallback(this)">`
    : `<div class="article-card-img-placeholder"></div>`}
  <div class="article-card-body">
    <div class="article-card-title">${a.title}</div>
    <div class="article-card-text">${a.excerpt}</div>
    <span class="btn-link">Подробнее</span>
  </div>
</a>`;
}

/* ═══════════════ СТРАНИЦА СТАТЬИ ═══════════════
   Каждая статья — отдельный html-файл: так у неё нормальный адрес,
   её индексирует поиск и можно дать ссылку. Общая обвязка (шапка, крошки,
   фото, форма, подвал, «Читайте также») собирается здесь — в самом файле
   статьи остаётся только текст. */
function initArticlePage(id) {
  const a = (typeof ARTICLES !== 'undefined') && ARTICLES.filter(x => x.id === id)[0];
  if (!a) return;

  document.getElementById('header-mount').innerHTML = renderHeader('articles.html');
  document.getElementById('breadcrumb-mount').innerHTML = renderBreadcrumb([
    { href: 'index.html',    label: 'Главная' },
    { href: 'articles.html', label: 'Статьи' },
    { href: a.file,          label: a.title },
  ]);

  const hero = document.getElementById('article-hero-img');
  if (hero) {
    hero.style.backgroundImage = `url(${a.img})`;
    hero.style.backgroundSize = 'cover';
    hero.style.backgroundPosition = 'center';
  }

  // «Читайте также» — другие статьи, а не эта же самая
  const also = document.getElementById('see-also-mount');
  if (also) also.innerHTML = ARTICLES.filter(x => x.id !== id).slice(0, 4).map(articleCard).join('');

  document.getElementById('cta-mount').innerHTML = renderCtaForm();
  document.getElementById('footer-mount').innerHTML = renderFooter();
}

// ── FORM HANDLER ──
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit, button[type=submit]');
  btn.textContent = 'Отправлено ✓';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Отправить';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}

// ── TABS ──
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tabs = btn.closest('.tabs');
      // на мобиле список категорий свёрнут — видна только активная строка
      // со стрелкой; тап по ней раскрывает список остальных, не переключая вкладку
      if (tabs && btn.classList.contains('active')) {
        tabs.classList.toggle('open');
        return;
      }
      const group = btn.closest('.tabs-wrap') || document;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      if (tabs) tabs.classList.remove('open');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const btn = document.getElementById('burgerBtn');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('mobileClose');
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const hide = () => {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  btn.addEventListener('click', open);
  if (close) close.addEventListener('click', hide);
  // клик по пункту меню закрывает оверлей
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', hide));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) hide();
  });
}

/* ═══════════════ ПОИСК ═══════════════
   Один движок на два интерфейса: выпадашка под полем на десктопе
   и полноэкранный оверлей на мобильном (как в макете).
   Индекс собирается из CATALOG (js/catalog-data.js). Если файл не подключён,
   поиск молча выключается — остальная страница работает как раньше. */
const SEARCH_LIMIT = 5;   // сколько карточек показываем, остальное — по «Смотреть все»

function searchIndex() {
  if (typeof CATALOG === 'undefined') return [];
  if (!searchIndex.cache) {
    const list = [];
    Object.keys(CATALOG).forEach(cat => {
      CATALOG[cat].products.forEach(p => list.push({ name: p.name, price: p.price, cat: cat }));
    });
    searchIndex.cache = list;
  }
  return searchIndex.cache;
}

function searchFind(query) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  return searchIndex().filter(p => p.name.toLowerCase().indexOf(q) !== -1);
}

// раздел, в котором совпадений больше всего — туда ведёт «Смотреть все»
function searchTopCat(found) {
  const count = {};
  found.forEach(p => { count[p.cat] = (count[p.cat] || 0) + 1; });
  return Object.keys(count).sort((a, b) => count[b] - count[a])[0];
}

function searchWordForm(n) {
  const mod100 = n % 100, mod10 = n % 10;
  if (mod100 >= 11 && mod100 <= 14) return 'товаров';
  if (mod10 === 1) return 'товар';
  if (mod10 >= 2 && mod10 <= 4) return 'товара';
  return 'товаров';
}

function searchAllUrl(query, found) {
  return `catalog.html?cat=${searchTopCat(found)}&q=${encodeURIComponent(query.trim())}`;
}

function searchRow(p) {
  const price = p.price == null ? 'Цена уточняется' : `${p.price.toLocaleString('ru-RU')} Р`;
  return `
<a class="search-row" href="product.html?name=${encodeURIComponent(p.name)}">
  <span class="search-row-img"><img src="${IMG.battery}" alt="" loading="lazy" onerror="productImgFallback(this)"></span>
  <span class="search-row-body">
    <span class="search-row-name">${p.name}</span>
    <span class="search-row-price">${price}</span>
    <span class="btn-link">Подробнее</span>
  </span>
</a>`;
}

// общая разметка результатов для обоих интерфейсов
function searchResultsHtml(query, found) {
  if (query.trim().length < 2) return '';
  if (!found.length) {
    return `<div class="search-empty">По запросу «${query.trim()}» ничего не найдено</div>`;
  }
  return `
<div class="search-meta">
  <span>Найдено ${found.length} ${searchWordForm(found.length)}</span>
  <a href="${searchAllUrl(query, found)}">Смотреть все</a>
</div>
<div class="search-list">${found.slice(0, SEARCH_LIMIT).map(searchRow).join('')}</div>`;
}

function initSearch() {
  const overlay = document.getElementById('searchOverlay');
  const input = document.getElementById('searchInput');
  const drop = document.getElementById('searchDrop');
  if (!overlay || !input || !drop) return;

  const oInput = document.getElementById('searchOverlayInput');
  const oBody = document.getElementById('searchOverlayBody');

  const openOverlay = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // мобильное меню и оверлей поиска не должны висеть одновременно
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
    oInput.focus();
  };
  const closeOverlay = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openBtn = document.getElementById('searchOpenBtn');
  const menuBtn = document.getElementById('mobileSearchOpen');
  if (openBtn) openBtn.addEventListener('click', openOverlay);
  if (menuBtn) menuBtn.addEventListener('click', openOverlay);
  document.getElementById('searchOverlayClose').addEventListener('click', closeOverlay);

  // Enter — уходим в каталог с этим запросом
  const submit = value => {
    const found = searchFind(value);
    if (!found.length) return;
    location.href = searchAllUrl(value, found);
  };

  oInput.addEventListener('input', () => {
    oBody.innerHTML = searchResultsHtml(oInput.value, searchFind(oInput.value));
  });
  oInput.addEventListener('keydown', e => { if (e.key === 'Enter') submit(oInput.value); });

  input.addEventListener('input', () => {
    const html = searchResultsHtml(input.value, searchFind(input.value));
    drop.innerHTML = html;
    drop.hidden = !html;
  });
  input.addEventListener('keydown', e => { if (e.key === 'Enter') submit(input.value); });
  // закрываем выпадашку кликом мимо
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-wrap')) drop.hidden = true;
  });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    drop.hidden = true;
    if (overlay.classList.contains('open')) closeOverlay();
  });
}

/* ── ВЫПАДАЮЩАЯ СОРТИРОВКА ──
   Нативный <select> под макет не оформить: список вариантов рисует
   операционная система, а не страница. Поэтому свой: подпись сверху,
   значение крупно в Oswald, панель с остальными вариантами.
   Текущий вариант из списка убирается — как в Figma. */
function initSortDropdown(root, onChange) {
  const el = typeof root === 'string' ? document.getElementById(root) : root;
  if (!el || el.dataset.bound) return el;
  el.dataset.bound = '1';

  const btn = el.querySelector('.sort-btn');
  const current = el.querySelector('.sort-current');
  const options = Array.prototype.slice.call(el.querySelectorAll('.sort-list button'));

  const markCurrent = () => options.forEach(o =>
    o.classList.toggle('is-current', o.dataset.value === el.dataset.value));

  const close = () => {
    el.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  };

  btn.addEventListener('click', e => {
    e.stopPropagation();
    const open = !el.classList.contains('open');
    el.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  });

  options.forEach(o => o.addEventListener('click', () => {
    el.dataset.value = o.dataset.value;
    current.textContent = o.textContent;
    markCurrent();
    close();
    if (onChange) onChange(o.dataset.value);
  }));

  document.addEventListener('click', e => { if (!el.contains(e.target)) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });

  markCurrent();
  return el;
}

// ── THUMBNAIL SWITCHER ──
function initThumbs() {
  const thumbs = document.querySelectorAll('.product-thumb');
  const main = document.querySelector('.product-main-img img');
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const src = thumb.querySelector('img');
      if (main && src) main.src = src.src;
    });
  });
}

// ── FILTER TOGGLE (mobile) ──
function toggleFilter() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// ── SHOW FILTER BTN ON MOBILE ──
function checkMobileFilterBtn() {
  const btn = document.getElementById('filterToggle');
  if (!btn) return;
  if (!btn.innerHTML) btn.innerHTML = ICON_FUNNEL;
  btn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
}

// ── COLLAPSIBLE FILTER SECTIONS ──
// вызывается и на DOMContentLoaded, и после динамической сборки сайдбара —
// флаг не даёт навесить обработчик дважды
function initFilterCollapse() {
  document.querySelectorAll('.sidebar-title').forEach(title => {
    if (title.dataset.bound) return;
    title.dataset.bound = '1';
    title.addEventListener('click', () => {
      title.classList.toggle('collapsed');
      const body = title.nextElementSibling;
      if (body) body.hidden = title.classList.contains('collapsed');
    });
  });
}

// ── URL QUERY HELPER ──
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// ── SORTING ──
// Товары без цены (price === null) сортировка по цене не трогает —
// заработает автоматически, когда клиент передаст прайс.
function sortProducts(list, mode) {
  const items = list.slice();
  if (mode === 'price-asc' || mode === 'price-desc') {
    const dir = mode === 'price-asc' ? 1 : -1;
    return items.sort((a, b) => {
      if (a.price == null && b.price == null) return 0;
      if (a.price == null) return 1;   // «цена уточняется» — всегда в конец
      if (b.price == null) return -1;
      return (a.price - b.price) * dir;
    });
  }
  if (mode === 'new') return items.sort((a, b) => Number(b.isNew) - Number(a.isNew));
  return items; // «популярные» — порядок как в источнике
}

/* ═══════════════ КАТАЛОГ: ФИЛЬТРЫ ═══════════════
   Движок универсальный и от данных не зависит: получает конфиг раздела,
   сам строит сайдбар, считает счётчики, синхронит состояние с адресной строкой.
   Состояние фильтров живёт в DOM — отдельного стора нет намеренно,
   иначе его пришлось бы синхронизировать в трёх местах.            */
const CatalogUI = {
  key: '', cfg: null, defs: null, cardSpecs: null,
  list: [], page: 1, PAGE: 12,
  q: '',   // текстовый запрос из поиска в шапке (?q=)

  init(opts) {
    this.key = opts.key;
    this.cfg = opts.section;
    this.defs = opts.defs;
    this.cardSpecs = opts.cardSpecs;
    this.q = getParam('q') || '';
    this.renderSidebar();
    this.readUrl();
    this.bind();
    this.apply();
  },

  isMobile() { return window.innerWidth <= 768; },

  // значение может быть массивом (например, применяемость)
  hasValue(v, want) {
    return Array.isArray(v) ? v.map(String).includes(want) : String(v) === want;
  },

  // закрашивает трек ползунка слева от бегунка через CSS-переменную
  updateSliderFill(inp) {
    const pct = (inp.value - inp.min) / (inp.max - inp.min || 1) * 100;
    inp.style.setProperty('--fill', pct + '%');
  },

  // ── СБОРКА САЙДБАРА ПО КОНФИГУ РАЗДЕЛА ──
  renderSidebar() {
    const blocks = this.cfg.filters.map(key => {
      const def = this.defs[key];
      if (!def) return '';
      let body;

      if (def.type === 'range') {
        const vals = this.cfg.products.map(p => Number(p[key])).filter(v => !isNaN(v));
        const min = Math.min(...vals), max = Math.max(...vals);
        // один ползунок — «от», а не пара полей: показывает товары с этим
        // значением и выше. Проценты для заливки трека считает updateSliderFill().
        body = `
          <div class="filter-slider">
            <input type="range" class="filter-range-input" data-key="${key}" min="${min}" max="${max}" value="${min}">
            <div class="filter-range-labels"><span>${min}</span><span>${max}</span></div>
          </div>`;
      } else {
        // показываем только те варианты, что реально встречаются в разделе
        const present = new Set();
        this.cfg.products.forEach(p => {
          const v = p[key];
          (Array.isArray(v) ? v : [v]).forEach(x => present.add(String(x)));
        });
        // «Применяемость»/«Тип» — выбор только одного варианта, но визуально
        // те же квадратные чекбоксы, что и у остальных фильтров (не radio-
        // кружки) — взаимное исключение навешано отдельно в bind()
        body = Object.keys(def.labels)
          .filter(v => present.has(v))
          .map(v => `
            <label class="filter-check">
              <input type="checkbox" data-key="${key}" value="${v}">
              <span>${def.labels[v]}</span>
              <span class="filter-count"></span>
            </label>`).join('');
      }

      return `
        <div class="sidebar-section" data-filter-key="${key}">
          <div class="sidebar-title">${def.title}</div>
          <div class="filter-body">${body}</div>
        </div>`;
    }).join('');

    // сортировка — отдельно от панели чекбоксов: на мобиле видна сразу на
    // странице (рядом с кнопкой-воронкой), не спрятана внутри шторки фильтра
    document.getElementById('catalog-sort-mount').innerHTML = `
      <div class="sort catalog-sort" id="catalog-sort" data-value="popular">
        <button class="sort-btn" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span class="sort-btn-label"><span class="sort-btn-prefix">Сортировать по:</span> <span class="sort-current">Популярные</span></span>
        </button>
        <div class="sort-list" role="listbox">
          <button type="button" role="option" data-value="popular">Популярные</button>
          <button type="button" role="option" data-value="price-desc">Сначала дорогие</button>
          <button type="button" role="option" data-value="price-asc">Сначала дешевые</button>
        </div>
      </div>`;

    document.getElementById('sidebar').innerHTML = `
      <div class="filter-head">
        <div class="filter-head-title">Фильтр${ICON_FILTER}</div>
        <div class="filter-head-actions">
          <button class="filter-reset" type="button">Сбросить все</button>
        </div>
      </div>
      ${blocks}
      <button class="filter-btn" type="button">Применить</button>`;

    initSortDropdown('catalog-sort', () => this.apply());
    document.querySelectorAll('#sidebar .filter-range-input').forEach(inp => this.updateSliderFill(inp));
  },

  // ── СОСТОЯНИЕ ЧИТАЕМ ИЗ DOM ──
  readState() {
    const state = { checks: {}, ranges: {} };
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(cb => {
      if (!cb.checked) return;
      (state.checks[cb.dataset.key] = state.checks[cb.dataset.key] || []).push(cb.value);
    });
    // ползунок «от» — значение ниже своего минимума ничего не отсекает,
    // поэтому его можно всегда учитывать, не проверяя, двигали ли бегунок
    document.querySelectorAll('#sidebar .filter-range-input').forEach(inp => {
      state.ranges[inp.dataset.key] = { min: Number(inp.value) };
    });
    return state;
  },

  // skipKey — чтобы посчитать счётчики без учёта своей же группы
  match(p, state, skipKey) {
    if (this.q && p.name.toLowerCase().indexOf(this.q.toLowerCase()) === -1) return false;
    for (const key in state.checks) {
      if (key === skipKey) continue;
      const sel = state.checks[key];
      if (!sel.length) continue;
      if (!sel.some(v => this.hasValue(p[key], v))) return false;
    }
    for (const key in state.ranges) {
      if (key === skipKey) continue;
      const r = state.ranges[key], v = Number(p[key]);
      if (r.min !== undefined && v < r.min) return false;
      if (r.max !== undefined && v > r.max) return false;
    }
    return true;
  },

  results(state, skipKey) {
    return this.cfg.products.filter(p => this.match(p, state, skipKey));
  },

  // ── ПРИМЕНИТЬ ──
  apply() {
    const state = this.readState();
    const sort = document.getElementById('catalog-sort').dataset.value;
    this.list = sortProducts(this.results(state), sort);
    this.page = 1;
    this.renderGrid();
    this.updateCounts(state);
    this.updateCaseFiltersVisibility(state);
    this.syncUrl(state);
    // при поиске показываем сам запрос и даём его сбросить
    const query = this.q
      ? ` <a class="catalog-query" href="catalog.html?cat=${this.key}">по запросу «${this.q}» ✕</a>`
      : '';
    document.getElementById('cat-title').innerHTML =
      `${this.cfg.label} <span>${this.list.length}</span>${query}`;
  },

  goToPage(n) {
    this.page = n;
    this.renderGrid();
    document.getElementById('cat-grid').scrollIntoView({ block: 'start', behavior: 'smooth' });
  },

  renderGrid() {
    const grid = document.getElementById('cat-grid');
    const empty = document.getElementById('cat-empty');
    const pagination = document.getElementById('pagination');

    if (!this.list.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      pagination.innerHTML = '';
      return;
    }
    empty.hidden = true;
    const totalPages = Math.ceil(this.list.length / this.PAGE);
    if (this.page > totalPages) this.page = totalPages;
    const start = (this.page - 1) * this.PAGE;
    const slice = this.list.slice(start, start + this.PAGE);
    grid.innerHTML = slice.map(p =>
      productCard(p.name, this.cardSpecs(p), p.price)).join('');
    this.renderPagination(totalPages);
    initReveal();
  },

  // страницы вокруг текущей + первая/последняя, промежутки — многоточием
  pageNumbers(cur, total) {
    const keep = new Set([1, total, cur - 1, cur, cur + 1].filter(n => n >= 1 && n <= total));
    const list = Array.from(keep).sort((a, b) => a - b);
    const out = [];
    list.forEach((n, i) => {
      if (i > 0 && n - list[i - 1] > 1) out.push('…');
      out.push(n);
    });
    return out;
  },

  renderPagination(totalPages) {
    const el = document.getElementById('pagination');
    if (totalPages <= 1) { el.innerHTML = ''; return; }
    const cur = this.page;
    el.innerHTML = `
      <button class="page-btn prev-next prev" type="button" data-page="${cur - 1}" ${cur === 1 ? 'disabled' : ''}><span class="page-btn-arrow"></span><span class="page-btn-text">Назад</span></button>
      ${this.pageNumbers(cur, totalPages).map(n => n === '…'
        ? `<span class="page-btn page-dots">…</span>`
        : `<button class="page-btn ${n === cur ? 'active' : ''}" type="button" data-page="${n}">${n}</button>`
      ).join('')}
      <button class="page-btn prev-next next" type="button" data-page="${cur + 1}" ${cur === totalPages ? 'disabled' : ''}><span class="page-btn-text">Вперёд</span><span class="page-btn-arrow"></span></button>`;
  },

  // «Тип корпуса»/«Размер корпуса» имеют смысл только для автомобильных АКБ —
  // у мото/лодочных/тяговых нет этих стандартных типоразмеров. Прячем секции
  // в сайдбаре, если выбрана «Применяемость» и среди неё нет «Автомобильные».
  // На карточку товара (p.dims) это не влияет — там отдельное поле.
  updateCaseFiltersVisibility(state) {
    const selectedUse = state.checks.use || [];
    const showCaseFilters = !selectedUse.length || selectedUse.includes('auto');
    ['case', 'caseSize'].forEach(key => {
      const section = document.querySelector(`#sidebar .sidebar-section[data-filter-key="${key}"]`);
      if (section) section.hidden = !showCaseFilters;
    });
  },

  // счётчик у пункта = сколько найдётся, если выбрать именно его
  updateCounts(state) {
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(cb => {
      const key = cb.dataset.key;
      const n = this.results(state, key).filter(p => this.hasValue(p[key], cb.value)).length;
      const label = cb.closest('.filter-check');
      label.querySelector('.filter-count').textContent = n;
      const dead = n === 0 && !cb.checked;
      label.classList.toggle('is-empty', dead);
      cb.disabled = dead;
    });
    const btn = document.querySelector('#sidebar .filter-btn');
    if (btn) btn.textContent = 'Применить';
  },

  // ── АДРЕСНАЯ СТРОКА ──
  // replaceState, а не pushState: иначе каждый чекбокс плодил бы запись в истории
  syncUrl(state) {
    const p = new URLSearchParams();
    p.set('cat', this.key);
    for (const key in state.checks) {
      if (state.checks[key].length) p.set(key, state.checks[key].join(','));
    }
    // ползунок пишем в адрес, только если его реально сдвинули с минимума —
    // иначе там всегда болтался бы «capacity=20» и на неизменённый фильтр
    document.querySelectorAll('#sidebar .filter-range-input').forEach(inp => {
      if (Number(inp.value) > Number(inp.min)) p.set(inp.dataset.key, inp.value);
    });
    const sort = document.getElementById('catalog-sort').dataset.value;
    if (sort !== 'popular') p.set('sort', sort);
    if (this.q) p.set('q', this.q);
    history.replaceState(null, '', location.pathname + '?' + p.toString());
  },

  readUrl() {
    const p = new URLSearchParams(location.search);
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(cb => {
      const v = p.get(cb.dataset.key);
      cb.checked = !!v && v.split(',').indexOf(cb.value) !== -1;
    });
    document.querySelectorAll('#sidebar .filter-range-input').forEach(inp => {
      const v = p.get(inp.dataset.key);
      if (v === null || v === '') return;
      inp.value = v;
      this.updateSliderFill(inp);
    });
    const sort = p.get('sort');
    const sortEl = document.getElementById('catalog-sort');
    const opt = sort && sortEl.querySelector(`.sort-list button[data-value="${sort}"]`);
    if (opt) {
      sortEl.dataset.value = sort;
      sortEl.querySelector('.sort-current').textContent = opt.textContent;
    }
  },

  reset() {
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(c => { c.checked = false; });
    document.querySelectorAll('#sidebar .filter-range-input').forEach(inp => {
      inp.value = inp.min;
      this.updateSliderFill(inp);
    });
    this.apply();
  },

  bind() {
    const sidebar = document.getElementById('sidebar');
    // на десктопе применяем сразу, на мобиле — по кнопке, чтобы список не дёргался под пальцем.
    // Видимость «Тип корпуса»/«Размер корпуса» — исключение: она не трогает
    // список товаров и счётчики, поэтому обновляется сразу и на мобиле, не
    // дожидаясь «Применить».
    sidebar.addEventListener('change', (e) => {
      // одиночный выбор («Применяемость»/«Тип») — снимаем остальные галочки
      // той же группы; сами инпуты остаются обычными чекбоксами (квадрат),
      // просто ведут себя как радио — по макету везде одинаковый вид
      const key = e.target.dataset.key;
      const def = key && this.defs[key];
      if (def && def.single && e.target.checked) {
        sidebar.querySelectorAll(`input[data-key="${key}"]`).forEach(cb => {
          if (cb !== e.target) cb.checked = false;
        });
      }
      this.updateCaseFiltersVisibility(this.readState());
      if (!this.isMobile()) this.apply();
    });
    sidebar.addEventListener('input', e => {
      if (!e.target.classList.contains('filter-range-input')) return;
      this.updateSliderFill(e.target);
      if (!this.isMobile()) this.apply();
    });
    sidebar.querySelector('.filter-reset').addEventListener('click', () => this.reset());
    sidebar.querySelector('.filter-btn').addEventListener('click', () => {
      this.apply();
      if (this.isMobile()) sidebar.classList.remove('open');
    });
    document.getElementById('pagination').addEventListener('click', e => {
      const btn = e.target.closest('.page-btn[data-page]');
      if (!btn || btn.disabled) return;
      const n = Number(btn.dataset.page);
      if (n >= 1) this.goToPage(n);
    });
  },
};

// ── SCROLL REVEAL ──
// Класс .reveal вешается из JS, поэтому без JS ничего не прячется.
function initReveal(root = document) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  root.querySelectorAll('.category-card, .product-card, .service-card, .article-card').forEach(el => {
    if (el.classList.contains('reveal')) return;
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// ── FOOTER MAP INIT ──
function initFooterMap() {
  if (typeof IMG === 'undefined') return;
  // Десктоп — фоновая карта
  var desk = document.getElementById('footer-map-img');
  if (desk) desk.src = IMG.footerMapDesk;
  // Мобила — отдельный блок снизу
  var mob = document.getElementById('footer-map-mob-img');
  if (mob) mob.src = IMG.footerMapMob;
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  checkMobileFilterBtn();
  window.addEventListener('resize', checkMobileFilterBtn);
  initTabs();
  initMobileMenu();
  initSearch();
  initThumbs();
  initFilterCollapse();
  initReveal();
  initFooterMap();
});
