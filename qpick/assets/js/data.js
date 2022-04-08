//---------------------------- Variables ----------------------------

export const goods = [
  {
    id: '0',
    name: 'Apple BYZ S852I',
    rate: 4.7,
    price: 2927,
    oldPrice: 3527,
    discount: -20,
  },
  {
    id: '1',
    name: 'Apple EarPods',
    rate: 4.5,
    price: 2327,
    oldPrice: null,
    discount: null,
  },
  {
    id: '2',
    name: 'Apple EarPods',
    rate: 4.5,
    price: 2327,
    oldPrice: null,
    discount: null,
  },
  {
    id: '3',
    name: 'Apple AirPods',
    rate: 4.7,
    price: 9523,
    oldPrice: null,
    discount: null,
  },
  {
    id: '4',
    name: 'GERLAX GH-04',
    rate: 4.7,
    price: 6527,
    oldPrice: null,
    discount: null,
  },
  {
    id: '5',
    name: 'BOROFONE BO4',
    rate: 4.7,
    price: 7527,
    oldPrice: null,
    discount: null,
  }
]; // Database of goods / База данных товаров
export const translation = [
  ['Наушники', 'Headphones'],                       //0
  ['Беспроводные наушники', 'Wireless headphones'], //1
  ['Купить', 'Buy'],                                //2
  ['Избранное', 'Favorites'],                       //3
  ['Корзина', 'Basket'],                            //4
  ['Контакты', 'Contacts'],                         //5
  ['Условия сервиса', 'Service conditions'],        //6
  ['ИТОГО', 'TOTAL'],                               //7
  ['Перейти к оформлению', 'Make order'],           //8
  ['Корзина пуста', 'Basket is empty'],             //9
  ['Заказ оформлен', 'Order has been made']         //10
]; // Dictionary / Словарь


//---------------------------- Functions ----------------------------

//--------------------------------------------------------------------
// The function displays amount of chosen goods on the pic of a cart
// at the top-right corner of all pages
 
// Функция отображает количество выбранных товаров на пиктограмме
// тележки в верхнем правом углу всех страниц
export function showGoodsAmount(where) {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  if (basket.length === 0) where.style='display:none';
  else {
    where.style='display:flex';
    where.textContent = basket.reduce((sum, item)=>sum+item.count, 0);
  } 
}



//--------------------------------------------------------------------
// The function switches language at footer and translates page's text
// Функция переключает язык в footer и переводит текст страницы
export function switchLanguage(e) {
  if (e.currentTarget.id === 'rus') localStorage.setItem('lang12388', '0');
  else if (e.currentTarget.id === 'eng') localStorage.setItem('lang12388', '1');
  translateText();
}



//--------------------------------------------------------------------
// The function translates text of pages to appropriate language
// Функция переводит текст сраниц на соответствующий язык
export function translateText() {
  document.querySelectorAll('[data-translate]').forEach(item=> {
    item.textContent = translation[+item.dataset.translate][+localStorage.getItem('lang12388')];
  });
  document.querySelectorAll('.footer__lang').forEach(item=>{
    if (item.classList.contains('footer__lang-chosen')) item.classList.remove('footer__lang-chosen');
  })
  switch (localStorage.getItem('lang12388')) {
    case '0': document.getElementById('rus').classList.add('footer__lang-chosen'); break;
    case '1': document.getElementById('eng').classList.add('footer__lang-chosen'); break;
  }
}