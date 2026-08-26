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
  tech:       { title: 'Технология',     type: 'checks', labels: {
    ca:'Ca/Ca', efb:'EFB', agm:'AGM', gel:'GEL', 'agm-gel':'AGM+GEL',
    'li-ion':'Li-ion, Li-pol', lifepo4:'LiFePO4', lto:'LTO', 'ni-cd':'Ni-Cd, Ni-MH',
  } },
  case:       { title: 'Тип корпуса',    type: 'checks', labels: { euro:'Европейский', asia:'Азиатский' } },
  // размер корпуса АКБ — код + габариты Д×Ш×В, мм (реальные типоразмеры)
  caseSize:   { title: 'Размер корпуса', type: 'checks', labels: {
    B19:'187×127×227 (B19)', B20:'197×129×227 (B20)', B24:'238×129×227 (B24)',
    D20:'207×173×205 (D20)', D23:'232×173×225 (D23)', D26:'260×173×225 (D26)', D31:'306×173×225 (D31)',
    GR31:'330×173×240 (GR31)',
    L1:'207×175×190 (L1)', LB1:'207×175×175 (LB1)',
    L2:'242×175×190 (L2)', LB2:'242×175×175 (LB2)',
    L3:'278×175×190 (L3)', LB3:'278×175×175 (LB3)',
    L4:'315×175×190 (L4)', LB4:'315×175×175 (LB4)',
    L5:'353×175×190 (L5)', L6:'393×175×190 (L6)',
    A:'513×189×223 (A)', B:'513×223×223 (B)', C:'518×276×242 (C)',
    special:'Специальный',
  } },
  // полный список брендов — из БРЕНДЫ.xlsx (папка Дизайн), три отдельных
  // списка на категорию, как в самом файле
  brand:      { title: 'Бренд',          type: 'checks', labels: {
    BRAVO:'BRAVO', DECUS:'DECUS', DELTA:'DELTA', 'E-Lab':'E-Lab', EUROSTART:'EUROSTART',
    INDEX:'INDEX', MUTLU:'MUTLU', PLATIN:'PLATIN', PowerMaq:'PowerMaq', RAZOR:'RAZOR',
    'Red Energy':'Red Energy', ROCKET:'ROCKET', SOLITE:'SOLITE', TAB:'TAB', TITAN:'TITAN',
    TOYOKO:'TOYOKO', TOPLA:'TOPLA', TUBOR:'TUBOR', 'TYUMEN BATTERY':'TYUMEN BATTERY',
    VARTA:'VARTA', VESLINE:'VESLINE', VOLAT:'VOLAT', ZUBR:'ZUBR', АКОМ:'АКОМ', ОДИН:'ОДИН',
  } },
  chargeType: { title: 'Тип',            type: 'checks', labels: { pulse:'Импульсное', transformer:'Трансформаторное', jump:'Пуско-зарядное' } },
  voltage:    { title: 'Номинальное напряжение аккумулятора, В', type: 'checks', labels: { '6':'6', '12':'12' } },
  dualVoltage:{ title: 'Режим 12/24В',   type: 'checks', labels: { yes:'Да', no:'Нет' } },
  current:    { title: 'Макс. ток заряда, А', type: 'range' },
  chargeBrand:{ title: 'Бренд',          type: 'checks', labels: { MAXINTER:'MAXINTER', ОРИОН:'ОРИОН' } },
  accType:    { title: 'Тип',            type: 'checks', labels: { terminal:'Клеммы', wire:'Провода, перемычки', mount:'Крепление АКБ', jumper:'Провода внешнего запуска', other:'Прочее' } },
  material:   { title: 'Материал',       type: 'checks', labels: { lead:'Свинец', brass:'Латунь', copper:'Медь', steel:'Сталь', plastic:'Пластик' } },
  accessBrand:{ title: 'Бренд',          type: 'checks', labels: {
    AIRLINE:'AIRLINE', BYNIK:'BYNIK', 'Oil Right':'Oil Right', ГАРАНТ:'ГАРАНТ',
    ГЛАВДОР:'ГЛАВДОР', КЛЕМОС:'КЛЕМОС', МаякАвто:'МаякАвто',
  } },
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
    filters: ['use', 'capacity', 'polarity', 'tech', 'case', 'caseSize', 'brand'],
    // dims — стандартные для группы типоразмеров АКБ по ёмкости (не выдуманные:
    // это распространённые размеры корпуса Д×Ш×В), warranty — общая гарантия
    // магазина 6 месяцев на все аккумуляторы, пока клиент не пришлёт свои сроки
    products: [
      { name:'VARTA Silver Dynamic AGM 70Ah', brand:'VARTA',  tech:'agm', capacity:70,  cranking:760, polarity:'reverse', case:'euro', use:['auto'],            price:5000, isNew:false, dims:'278×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'VARTA Silver Dynamic AGM 74Ah', brand:'VARTA',  tech:'agm', capacity:74,  cranking:750, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false, dims:'278×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'VARTA Blue Dynamic EFB N70',    brand:'VARTA',  tech:'efb', capacity:70,  cranking:630, polarity:'direct',  case:'asia', use:['auto'],            price:5000, isNew:true,  dims:'278×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'VARTA Black Dynamic 60Ah',      brand:'VARTA',  tech:'ca',  capacity:60,  cranking:540, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false, dims:'242×175×190', warranty:'6 месяцев', caseSize:'L2' },
      { name:'VARTA Silver Dynamic 72Ah',     brand:'VARTA',  tech:'ca',  capacity:72,  cranking:680, polarity:'reverse', case:'euro', use:['auto'],            price:5000, isNew:false, dims:'278×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'VARTA Silver Dynamic AGM 80Ah', brand:'VARTA',  tech:'agm', capacity:80,  cranking:800, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false, dims:'315×175×175', warranty:'6 месяцев', caseSize:'L4' },
      { name:'VARTA Powersports AGM 12Ah',    brand:'VARTA',  tech:'agm', capacity:12,  cranking:200, polarity:'direct',  case:'asia', use:['moto'],            price:5000, isNew:false, dims:'150×65×130',  warranty:'6 месяцев', caseSize:'special' },
      { name:'TOPLA Energy 70Ah',             brand:'TOPLA',  tech:'ca',  capacity:70,  cranking:700, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false, dims:'278×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'TOPLA Top 55Ah',                brand:'TOPLA',  tech:'ca',  capacity:55,  cranking:540, polarity:'reverse', case:'euro', use:['auto'],            price:5000, isNew:false, dims:'242×175×190', warranty:'6 месяцев', caseSize:'L2' },
      { name:'TOPLA Premium 80Ah',            brand:'TOPLA',  tech:'ca',  capacity:80,  cranking:800, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:true,  dims:'315×175×175', warranty:'6 месяцев', caseSize:'L4' },
      { name:'TOPLA Marine 90Ah',             brand:'TOPLA',  tech:'gel', capacity:90,  cranking:700, polarity:'reverse', case:'euro', use:['boat','traction'], price:5000, isNew:false, dims:'353×175×190', warranty:'6 месяцев', caseSize:'L5' },
      { name:'ZUBR Asia 65Ah',                brand:'ZUBR',   tech:'ca',  capacity:65,  cranking:580, polarity:'direct',  case:'asia', use:['auto'],            price:null, isNew:true,  dims:'242×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'ZUBR Тяговый 100Ah',            brand:'ZUBR',   tech:'gel', capacity:100, cranking:750, polarity:'reverse', case:'euro', use:['traction'],        price:5000, isNew:false, dims:'353×175×190', warranty:'6 месяцев', caseSize:'L6' },
      { name:'PLATIN PRO 75Ah',               brand:'PLATIN', tech:'ca',  capacity:75,  cranking:720, polarity:'reverse', case:'euro', use:['auto'],            price:null, isNew:false, dims:'278×175×190', warranty:'6 месяцев', caseSize:'L3' },
      { name:'DELTA Energy 60Ah',             brand:'DELTA',  tech:'ca',  capacity:60,  cranking:520, polarity:'reverse', case:'euro', use:['auto'],            price:5000, isNew:false, dims:'242×175×190', warranty:'6 месяцев', caseSize:'L2' },
    ],
  },

  charge: {
    label: 'Зарядные устройства', ill: 'img/ill-charger.png',
    desc: 'Современные зарядные устройства для быстрого и безопасного обслуживания аккумуляторов. Решения для личного использования и профессиональных задач',
    filters: ['chargeType', 'voltage', 'dualVoltage', 'current', 'chargeBrand'],
    products: [
      { name:'Зарядное устройство трансформаторное 12 В, 4 A',   chargeType:'transformer', voltage:'12', dualVoltage:'no',  current:4,  chargeBrand:'MAXINTER', price:null, isNew:false },
      { name:'Трансформаторное ЗУ 12 В, 8 A',                    chargeType:'transformer', voltage:'12', dualVoltage:'no',  current:8,  chargeBrand:'ОРИОН',    price:null, isNew:false },
      { name:'Зарядное устройство 12/24 В, 10 A',                chargeType:'transformer', voltage:'12', dualVoltage:'yes', current:10, chargeBrand:'MAXINTER', price:null, isNew:true  },
      { name:'ЗУ для мото-аккумуляторов 6 В, 2 A',               chargeType:'transformer', voltage:'6',  dualVoltage:'no',  current:2,  chargeBrand:'ОРИОН',    price:null, isNew:false },
      { name:'Импульсное ЗУ 12 В, 6 A',                          chargeType:'pulse',       voltage:'12', dualVoltage:'no',  current:6,  chargeBrand:'MAXINTER', price:null, isNew:false },
      { name:'Зарядно-восстановительное ЗУ 12 В, 10 A',          chargeType:'pulse',       voltage:'12', dualVoltage:'no',  current:10, chargeBrand:'ОРИОН',    price:null, isNew:true  },
      { name:'Пуско-зарядное устройство 12 В, 20 A',             chargeType:'jump',        voltage:'12', dualVoltage:'no',  current:20, chargeBrand:'MAXINTER', price:null, isNew:false },
      { name:'Пуско-зарядное устройство 12/24 В, 25 A',          chargeType:'jump',        voltage:'12', dualVoltage:'yes', current:25, chargeBrand:'ОРИОН',    price:null, isNew:false },
    ],
  },

  access: {
    label: 'Аксессуары', ill: 'img/ill-accessory.png',
    desc: 'Клеммы, провода, крепления и другие полезные аксессуары для подключения, обслуживания и эксплуатации аккумуляторов',
    filters: ['accType', 'accessBrand'],
    products: [
      { name:'Клеммы аккумуляторные свинцовые',     accType:'terminal', material:'lead',    accessBrand:'AIRLINE',   price:null, isNew:false },
      { name:'Клеммы аккумуляторные латунные',      accType:'terminal', material:'brass',   accessBrand:'BYNIK',     price:null, isNew:false },
      { name:'Перемычка АКБ силовая',               accType:'wire',     material:'copper',  accessBrand:'ГАРАНТ',    price:null, isNew:false },
      { name:'Провод соединительный аккумуляторный',accType:'wire',     material:'copper',  accessBrand:'ГЛАВДОР',   price:null, isNew:false },
      { name:'Крепление аккумулятора универсальное',accType:'mount',    material:'steel',   accessBrand:'КЛЕМОС',    price:null, isNew:false },
      { name:'Прижимная планка АКБ',                accType:'mount',    material:'steel',   accessBrand:'МаякАвто',  price:null, isNew:false },
      { name:'Провода прикуривателя 400 A',         accType:'jumper',   material:'copper',  accessBrand:'AIRLINE',   price:null, isNew:true  },
      { name:'Провода прикуривателя 600 A',         accType:'jumper',   material:'copper',  accessBrand:'BYNIK',     price:null, isNew:false },
      { name:'Ареометр для электролита',            accType:'other',    material:'plastic', accessBrand:'Oil Right', price:null, isNew:false },
      { name:'Щётка для чистки клемм',               accType:'other',    material:'steel',   accessBrand:'ГАРАНТ',    price:null, isNew:false },
      { name:'Тестер аккумулятора цифровой',        accType:'other',    material:'plastic', accessBrand:'МаякАвто',  price:null, isNew:true  },
    ],
  },
};

/* Что показывать в карточке товара. Это слой представления, поэтому
   функции живут здесь, а не в данных — иначе CATALOG не лёг бы в JSON. */
const CARD_SPECS = {
  acc: p => [
    ['Ёмкость / Пуск.ток', `${p.capacity} / ${p.cranking}`],
    ['Габариты Д×Ш×В, мм', p.dims],
    ['Полярность',  FILTER_DEFS.polarity.labels[p.polarity]],
    ['Гарантия',    p.warranty],
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
