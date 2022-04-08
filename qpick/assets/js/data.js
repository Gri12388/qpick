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