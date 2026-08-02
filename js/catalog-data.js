/* ═══════════ ДАННЫЕ КАТАЛОГА ═══════════
   Раньше лежали внутри catalog.html. Вынесены в отдельный файл, потому что
   поиск в шапке работает на всех страницах и тоже читает CATALOG.
   Файл подключается ПЕРЕД main.js. */

/* ── ОПИСАНИЕ ФИЛЬТРОВ ──
   Только данные, без функций — переносится в JSON как есть. */
const FILTER_DEFS = {
  use:        { title: 'Применяемость',  type: 'checks', labels: { auto:'Автомобильные', moto:'Мото', boat:'Лодочные', traction:'Тяговые / ИБП' } },
  capacity:   { title: 'Ёмкость, Ah',    type: 'range' },
  polarity:   { title: 'Полярность',     type: 'checks', labels: { direct:'Прямая', reverse:'Обратная' } },
  tech:       { title: 'Технология',     type: 'checks', labels: { ca:'Ca/Ca', efb:'EFB', agm:'AGM', gel:'GEL', 'agm-gel':'AGM+GEL' } },
  case:       { title: 'Тип корпуса',    type: 'checks', labels: { euro:'Европейский', asia:'Азиатский' } },
  brand:      { title: 'Бренд',          type: 'checks', labels: { VARTA:'VARTA', TOPLA:'TOPLA', ZUBR:'ZUBR', PLATIN:'PLATIN', ENEUS:'ENEUS' } },
  chargeType: { title: 'Тип устройства', type: 'checks', labels: { auto:'Автоматическое', pulse:'Импульсное', jump:'Пуско-зарядное', starter:'Пусковое' } },
  voltage:    { title: 'Напряжение',     type: 'checks', labels: { '12':'12 В', '24':'24 В', '12/24':'12 / 24 В' } },
  current:    { title: 'Ток заряда, A',  type: 'range' },
  accType:    { title: 'Тип',            type: 'checks', labels: { terminal:'Клеммы', wire:'Провода', mount:'Крепления', tool:'Инструмент' } },
  material:   { title: 'Материал',       type: 'checks', labels: { lead:'Свинец', brass:'Латунь', copper:'Медь', steel:'Сталь', plastic:'Пластик' } },
};

/* ── КАТАЛОГ ──
   ВНИМАНИЕ: данные демонстрационные. Бренд, технология и ёмкость взяты
   из названий моделей, полярность / тип корпуса / пусковой ток проставлены
   правдоподобно — заменить на реальные, когда клиент передаст номенклатуру.
   price: null → «Цена уточняется».
   ill — иллюстрация раздела из макета (карточки категорий и плитки каталога). */
const CATALOG = {
  acc: {
    label: 'Аккумуляторы', ill: 'img/ill-battery.png',
    desc: 'Надёжные аккумуляторы для автомобилей, мотоциклов, лодок и ИБП. Поможем подобрать подходящую модель по параметрам, бренду и типу техники',
    filters: ['use', 'capacity', 'polarity', 'tech', 'case', 'brand'],
    products: [
      { name:'VARTA Silver Dynamic AGM 70Ah', brand:'VARTA',  tech:'agm', capacity:70,  cranking:760, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'VARTA Silver Dynamic AGM 74Ah', brand:'VARTA',  tech:'agm', capacity:74,  cranking:750, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'VARTA Blue Dynamic EFB N70',    brand:'VARTA',  tech:'efb', capacity:70,  cranking:630, polarity:'direct',  case:'asia', use:['auto'],            price:null, isNew:true  },
      { name:'VARTA Black Dynamic 60Ah',      brand:'VARTA',  tech:'ca',  capacity:60,  cranking:540, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'VARTA Silver Dynamic 72Ah',     brand:'VARTA',  tech:'ca',  capacity:72,  cranking:680, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'VARTA Silver Dynamic AGM 80Ah', brand:'VARTA',  tech:'agm', capacity:80,  cranking:800, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'VARTA Powersports AGM 12Ah',    brand:'VARTA',  tech:'agm', capacity:12,  cranking:200, polarity:'direct',  case:'asia', use:['moto'],            price:null, isNew:false },
      { name:'TOPLA Energy 70Ah',             brand:'TOPLA',  tech:'ca',  capacity:70,  cranking:700, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'TOPLA Top 55Ah',                brand:'TOPLA',  tech:'ca',  capacity:55,  cranking:540, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'TOPLA Premium 80Ah',            brand:'TOPLA',  tech:'ca',  capacity:80,  cranking:800, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:true  },
      { name:'TOPLA Marine 90Ah',             brand:'TOPLA',  tech:'gel', capacity:90,  cranking:700, polarity:'reverse', case:'euro', use:['boat','traction'], price:null, isNew:false },
      { name:'ZUBR Asia 65Ah',                brand:'ZUBR',   tech:'ca',  capacity:65,  cranking:580, polarity:'direct',  case:'asia', use:['auto'],            price:null, isNew:true  },
      { name:'ZUBR Тяговый 100Ah',            brand:'ZUBR',   tech:'gel', capacity:100, cranking:750, polarity:'reverse', case:'euro', use:['traction'],        price:null, isNew:false },
      { name:'PLATIN PRO 75Ah',               brand:'PLATIN', tech:'ca',  capacity:75,  cranking:720, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
      { name:'ENEUS Energy 60Ah',             brand:'ENEUS',  tech:'ca',  capacity:60,  cranking:520, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false },
    ],
  },

  charge: {
    label: 'Зарядные устройства', ill: 'img/ill-charger.png',
    desc: 'Современные зарядные устройства для быстрого и безопасного обслуживания аккумуляторов. Решения для личного использования и профессиональных задач',
    filters: ['chargeType', 'voltage', 'current'],
    products: [
      { name:'Зарядное устройство 12 В, 4 A',          chargeType:'auto',    voltage:'12',    current:4,  price:null, isNew:false },
      { name:'Автоматическое ЗУ 12 В, 8 A',            chargeType:'auto',    voltage:'12',    current:8,  price:null, isNew:false },
      { name:'Зарядное устройство 12/24 В, 10 A',      chargeType:'auto',    voltage:'12/24', current:10, price:null, isNew:true  },
      { name:'ЗУ для мото-аккумуляторов 12 В, 2 A',    chargeType:'auto',    voltage:'12',    current:2,  price:null, isNew:false },
      { name:'Импульсное ЗУ 12 В, 6 A',                chargeType:'pulse',   voltage:'12',    current:6,  price:null, isNew:false },
      { name:'Зарядно-восстановительное ЗУ 12 В, 10 A',chargeType:'pulse',   voltage:'12',    current:10, price:null, isNew:true  },
      { name:'Пуско-зарядное устройство 12 В, 20 A',   chargeType:'jump',    voltage:'12',    current:20, price:null, isNew:false },
      { name:'Пусковое устройство 12 В, 800 A',        chargeType:'starter', voltage:'12',    current:2,  price:null, isNew:false },
    ],
  },

  access: {
    label: 'Аксессуары', ill: 'img/ill-accessory.png',
    desc: 'Клеммы, провода, крепления и другие полезные аксессуары для подключения, обслуживания и эксплуатации аккумуляторов',
    filters: ['accType', 'material'],
    products: [
      { name:'Клеммы аккумуляторные свинцовые',     accType:'terminal', material:'lead',    price:null, isNew:false },
      { name:'Клеммы аккумуляторные латунные',      accType:'terminal', material:'brass',   price:null, isNew:false },
      { name:'Провода прикуривателя 400 A',         accType:'wire',     material:'copper',  price:null, isNew:true  },
      { name:'Провода прикуривателя 600 A',         accType:'wire',     material:'copper',  price:null, isNew:false },
      { name:'Крепление аккумулятора универсальное',accType:'mount',    material:'steel',   price:null, isNew:false },
      { name:'Прижимная планка АКБ',                accType:'mount',    material:'steel',   price:null, isNew:false },
      { name:'Ареометр для электролита',            accType:'tool',     material:'plastic', price:null, isNew:false },
      { name:'Щётка для чистки клемм',              accType:'tool',     material:'steel',   price:null, isNew:false },
      { name:'Тестер аккумулятора цифровой',        accType:'tool',     material:'plastic', price:null, isNew:true  },
    ],
  },
};

/* Что показывать в карточке товара. Это слой представления, поэтому
   функции живут здесь, а не в данных — иначе CATALOG не лёг бы в JSON. */
const CARD_SPECS = {
  acc: p => [
    ['Ёмкость / Пуск.ток', `${p.capacity} / ${p.cranking}`],
    ['Полярность',  FILTER_DEFS.polarity.labels[p.polarity]],
    ['Тип корпуса', FILTER_DEFS.case.labels[p.case]],
    ['Технология',  FILTER_DEFS.tech.labels[p.tech]],
  ],
  charge: p => [
    ['Ток заряда', `${p.current} A`],
    ['Напряжение', FILTER_DEFS.voltage.labels[p.voltage]],
    ['Тип',        FILTER_DEFS.chargeType.labels[p.chargeType]],
  ],
  access: p => [
    ['Тип',       FILTER_DEFS.accType.labels[p.accType]],
    ['Материал',  FILTER_DEFS.material.labels[p.material]],
  ],
};

/* ── ИСТОЧНИК ДАННЫХ ──
   Переезд на отдельный файл — замена тела этой функции на:
     return fetch('data/catalog.json').then(r => r.json());
   Всё остальное трогать не нужно. Учтите: с fetch страница перестанет
   работать при открытии с диска через file:// — нужен сервер или GitHub Pages. */
function loadCatalog() {
  return Promise.resolve(CATALOG);
}
