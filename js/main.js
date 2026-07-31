/* ─────────────────────────────────────────
   AMPER — main.js
   Shared components + interactivity
───────────────────────────────────────── */

// ── HEADER HTML ──
function renderHeader(activePage = '') {
  const pages = [
    { href: 'index.html',    label: 'Главная' },
    { href: 'catalog.html',  label: 'Каталог' },
    {
      label: 'Покупателям', dropdown: [
        { href: 'services.html',       label: 'Услуги' },
        { href: 'delivery.html',       label: 'Доставка' },
        { href: 'services.html#parts', label: 'Запчасти под заказ' },
      ]
    },
    { href: 'about.html',    label: 'О нас' },
    { href: 'contacts.html', label: 'Контакты' },
  ];

  const navItems = pages.map(p => {
    if (p.dropdown) {
      const items = p.dropdown.map(d =>
        `<a href="${d.href}" class="${activePage === d.href ? 'active' : ''}">${d.label}</a>`
      ).join('');
      return `<li class="nav-dropdown"><a href="#">${p.label}</a>
        <div class="nav-dropdown-menu">${items}</div></li>`;
    }
    return `<li><a href="${p.href}" class="${activePage === p.href ? 'active' : ''}">${p.label}</a></li>`;
  }).join('');

  return `
<header class="header">
  <div class="container">
    <div class="header-top">
      <div class="header-top-left">
        <span>📍 г. Волжский, ул. Пушкина 51д/319</span>
        <a href="mailto:amper134@yandex.ru">amper134@yandex.ru</a>
      </div>
    </div>
    <div class="header-main">
      <a href="index.html" class="logo">
        <span class="logo-bolt">⚡</span>
        <div class="logo-wrap">
          <span>АМПЕР</span>
          <span class="logo-sub">аккумуляторный центр</span>
        </div>
      </a>
      <a href="catalog.html" class="btn-catalog">
        <span class="btn-catalog-icon"><span></span><span></span><span></span><span></span></span>
        Каталог
      </a>
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input type="search" class="search-input" placeholder="Поиск" />
      </div>
      <nav>
        <ul class="nav">${navItems}</ul>
      </nav>
      <a href="tel:+79950253434" class="header-phone">+7-995-025-34-34</a>
      <div class="burger" id="burgerBtn">
        <span></span><span></span><span></span>
      </div>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-menu-close" id="mobileClose">✕</button>
  <nav class="mobile-nav">
    <a href="index.html">Главная</a>
    <a href="catalog.html">Каталог</a>
    <a href="services.html">Услуги</a>
    <a href="delivery.html">Доставка</a>
    <a href="about.html">О нас</a>
    <a href="contacts.html">Контакты</a>
    <a href="articles.html">Статьи</a>
  </nav>
  <div class="mobile-phone-block">
    <div style="font-size:12px;color:#cbcbcb;text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px;">Телефон</div>
    <a href="tel:+79950253434" style="font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;color:#FF4F00;display:block;margin-bottom:16px;">+7-995-025-34-34</a>
    <div style="font-size:12px;color:#cbcbcb;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px;">Мессенджеры</div>
    <div style="display:flex;gap:10px;">
      <a href="#" style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">✈</a>
      <a href="#" style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">◎</a>
      <a href="mailto:amper134@yandex.ru" style="width:36px;height:36px;border:1px solid rgba(255,255,255,0.2);border-radius:8px;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">✉</a>
    </div>
  </div>
</div>`;
}

// ── FOOTER HTML ──
function renderFooter() {
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-phone-big-label" style="font-size:13px;color:#cbcbcb;text-transform:uppercase;letter-spacing:.07em;margin-bottom:8px;">Телефон</div>
        <a href="tel:+79950253434" class="footer-phone-big">+7-995-025-34-34</a>
        <div style="font-size:13px;color:#cbcbcb;text-transform:uppercase;letter-spacing:.07em;margin-bottom:10px;">Мессенджеры</div>
        <div class="footer-messengers">
          <a href="#" class="footer-messenger">✈</a>
          <a href="#" class="footer-messenger">◎</a>
          <a href="mailto:amper134@yandex.ru" class="footer-messenger">✉</a>
        </div>
      </div>
      <div>
        <div class="footer-label">Адрес магазина</div>
        <span class="footer-val">г. Волжский, ул. Пушкина 51д/319</span>
        <div class="footer-label">Почта</div>
        <a href="mailto:amper134@yandex.ru" class="footer-val footer-mail">amper134@yandex.ru</a>
        <div class="footer-label">График работы</div>
        <span class="footer-val">Ежедневно: 08:30 – 18:30</span>
      </div>
      <div>
        <div class="footer-nav-title">Меню</div>
        <nav class="footer-nav">
          <a href="index.html">Главная</a>
          <a href="catalog.html">Каталог</a>
          <a href="delivery.html">Покупателям</a>
          <a href="about.html">О нас</a>
          <a href="contacts.html">Контакты</a>
        </nav>
      </div>
    </div>
  </div>
  <div class="footer-bottom-wrap" style="background:rgba(255,79,0,0.08);margin-top:32px;">
    <div class="container">
      <div class="footer-bottom">
        <span>Copyright © Ампер аккумуляторный центр</span>
        <a href="#">Политика конфиденциальности</a>
      </div>
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
        <p class="cta-desc">Наши специалисты учитывают все характеристики — от ёмкости до типа корпуса. Вы получите точный подбор, консультацию и рекомендации по эксплуатации</p>
      </div>
      <div class="cta-form">
        <form class="contact-form" onsubmit="handleForm(event)">
          <div class="form-field">
            <input type="text" class="form-input" placeholder="Имя" required>
            <span class="form-required">*</span>
          </div>
          <div class="form-field">
            <input type="tel" class="form-input" placeholder="Ваш телефон" required>
            <span class="form-required">*</span>
          </div>
          <div class="form-field">
            <input type="text" class="form-input" placeholder="Что нужно найти?">
            <span class="form-required">*</span>
          </div>
          <label class="form-check">
            <input type="checkbox" checked>
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
// price === null → «Цена уточняется» (пока клиент не передал прайс)
function productCard(name, specs, badge = 'В наличии', price = null) {
  const priceLabel = price == null
    ? 'Цена уточняется'
    : `${price.toLocaleString('ru-RU')} ₽`;
  return `
<div class="product-card">
  <div class="product-card-img">
    <span class="product-badge">${badge}</span>
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Car_battery_1.jpg/640px-Car_battery_1.jpg" alt="${name}" onerror="productImgFallback(this)">
  </div>
  <div class="product-card-body">
    <div class="product-card-name">${name}</div>
    ${specs.map(s => `<div class="product-spec"><span>${s[0]}</span><span class="product-spec-val">${s[1]}</span></div>`).join('')}
    <div class="product-price">${priceLabel}</div>
    <a href="product.html" class="btn-link">Подробнее</a>
  </div>
</div>`;
}

// ── ARTICLE CARD ──
function articleCard(title, text, imgSrc) {
  return `
<div class="article-card">
  ${imgSrc
    ? `<img src="${imgSrc}" alt="${title}" class="article-card-img" onerror="articleImgFallback(this)">`
    : `<div class="article-card-img-placeholder"></div>`}
  <div class="article-card-body">
    <div class="article-card-title">${title}</div>
    <div class="article-card-text">${text}</div>
    <a href="article.html" class="btn-link">Подробнее</a>
  </div>
</div>`;
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
      const group = btn.closest('.tabs-wrap') || document;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
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

  const open = () => { menu.classList.add('open'); document.body.style.overflow = 'hidden'; };
  const hide = () => { menu.classList.remove('open'); document.body.style.overflow = ''; };

  btn.addEventListener('click', open);
  if (close) close.addEventListener('click', hide);
  // клик по пункту меню закрывает оверлей
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', hide));
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
  if (btn) btn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
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
  list: [], shown: 0, PAGE: 12,

  init(opts) {
    this.key = opts.key;
    this.cfg = opts.section;
    this.defs = opts.defs;
    this.cardSpecs = opts.cardSpecs;
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

  // ── СБОРКА САЙДБАРА ПО КОНФИГУ РАЗДЕЛА ──
  renderSidebar() {
    const blocks = this.cfg.filters.map(key => {
      const def = this.defs[key];
      if (!def) return '';
      let body;

      if (def.type === 'range') {
        const vals = this.cfg.products.map(p => Number(p[key])).filter(v => !isNaN(v));
        const min = Math.min(...vals), max = Math.max(...vals);
        body = `
          <div class="filter-range-inputs">
            <input type="number" class="filter-num" data-key="${key}" data-bound="min" placeholder="от ${min}">
            <span>–</span>
            <input type="number" class="filter-num" data-key="${key}" data-bound="max" placeholder="до ${max}">
          </div>`;
      } else {
        // показываем только те варианты, что реально встречаются в разделе
        const present = new Set();
        this.cfg.products.forEach(p => {
          const v = p[key];
          (Array.isArray(v) ? v : [v]).forEach(x => present.add(String(x)));
        });
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
        <div class="sidebar-section">
          <div class="sidebar-title">${def.title}</div>
          <div class="filter-body">${body}</div>
        </div>`;
    }).join('');

    document.getElementById('sidebar').innerHTML = `
      <div class="filter-head">
        <div class="filter-head-title">Фильтр</div>
        <button class="filter-reset" type="button">Сбросить все</button>
      </div>
      ${blocks}
      <button class="filter-btn" type="button">Применить</button>`;
  },

  // ── СОСТОЯНИЕ ЧИТАЕМ ИЗ DOM ──
  readState() {
    const state = { checks: {}, ranges: {} };
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(cb => {
      if (!cb.checked) return;
      (state.checks[cb.dataset.key] = state.checks[cb.dataset.key] || []).push(cb.value);
    });
    document.querySelectorAll('#sidebar .filter-num').forEach(inp => {
      if (inp.value === '') return;
      const r = state.ranges[inp.dataset.key] = state.ranges[inp.dataset.key] || {};
      r[inp.dataset.bound] = Number(inp.value);
    });
    return state;
  },

  // skipKey — чтобы посчитать счётчики без учёта своей же группы
  match(p, state, skipKey) {
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
    this.list = sortProducts(this.results(state), document.getElementById('sort-select').value);
    this.shown = this.PAGE;
    this.renderGrid();
    this.updateCounts(state);
    this.syncUrl(state);
    document.getElementById('cat-title').innerHTML =
      `${this.cfg.label} <span>${this.list.length}</span>`;
  },

  showMore() { this.shown += this.PAGE; this.renderGrid(); },

  renderGrid() {
    const grid = document.getElementById('cat-grid');
    const empty = document.getElementById('cat-empty');
    const more = document.getElementById('load-more-wrap');

    if (!this.list.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      more.hidden = true;
      return;
    }
    empty.hidden = true;
    const slice = this.list.slice(0, this.shown);
    grid.innerHTML = slice.map(p =>
      productCard(p.name, this.cardSpecs(p), 'В наличии', p.price)).join('');
    more.hidden = this.shown >= this.list.length;
    document.getElementById('load-more-left').textContent = this.list.length - slice.length;
    initReveal();
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
    if (btn) btn.textContent = `Применить (${this.list.length})`;
  },

  // ── АДРЕСНАЯ СТРОКА ──
  // replaceState, а не pushState: иначе каждый чекбокс плодил бы запись в истории
  syncUrl(state) {
    const p = new URLSearchParams();
    p.set('cat', this.key);
    for (const key in state.checks) {
      if (state.checks[key].length) p.set(key, state.checks[key].join(','));
    }
    for (const key in state.ranges) {
      const r = state.ranges[key];
      p.set(key, `${r.min === undefined ? '' : r.min}-${r.max === undefined ? '' : r.max}`);
    }
    const sort = document.getElementById('sort-select').value;
    if (sort !== 'popular') p.set('sort', sort);
    history.replaceState(null, '', location.pathname + '?' + p.toString());
  },

  readUrl() {
    const p = new URLSearchParams(location.search);
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(cb => {
      const v = p.get(cb.dataset.key);
      cb.checked = !!v && v.split(',').indexOf(cb.value) !== -1;
    });
    document.querySelectorAll('#sidebar .filter-num').forEach(inp => {
      const v = p.get(inp.dataset.key);
      if (!v || v.indexOf('-') === -1) return;
      const parts = v.split('-');
      inp.value = inp.dataset.bound === 'min' ? parts[0] : parts[1];
    });
    const sort = p.get('sort');
    if (sort) document.getElementById('sort-select').value = sort;
  },

  reset() {
    document.querySelectorAll('#sidebar input[type=checkbox]').forEach(c => { c.checked = false; });
    document.querySelectorAll('#sidebar .filter-num').forEach(i => { i.value = ''; });
    this.apply();
  },

  bind() {
    const sidebar = document.getElementById('sidebar');
    // на десктопе применяем сразу, на мобиле — по кнопке, чтобы список не дёргался под пальцем
    sidebar.addEventListener('change', () => { if (!this.isMobile()) this.apply(); });
    sidebar.addEventListener('input', e => {
      if (e.target.classList.contains('filter-num') && !this.isMobile()) this.apply();
    });
    sidebar.querySelector('.filter-reset').addEventListener('click', () => this.reset());
    sidebar.querySelector('.filter-btn').addEventListener('click', () => {
      this.apply();
      if (this.isMobile()) sidebar.classList.remove('open');
    });
    document.getElementById('sort-select').addEventListener('change', () => this.apply());
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

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  checkMobileFilterBtn();
  window.addEventListener('resize', checkMobileFilterBtn);
  initTabs();
  initMobileMenu();
  initThumbs();
  initFilterCollapse();
  initReveal();
});
