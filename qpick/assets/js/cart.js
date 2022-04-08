//---------------------------- Modules ----------------------------

import * as data from './data.js'




//---------------------------- Variables ----------------------------

const cart = document.querySelector('.header__circle-cart'); // Pic of a cart in top-right corner / Пиктограмма тележки в верхнем правом углу
const display = document.querySelector('.cart'); // Area for cards of good and total account exposing / Зона размещения карточек товаров и итогового подсчета 




//---------------------------- Functions ----------------------------

//--------------------------------------------------------------------
// The function calculates total cost of goods in the basket and 
// displays the total sum at appropriate 

// Функция подсчитывает общую стоимость товаров в корзине и отображает 
// эту сумму в соответствующем месте страницы
function countTotal() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  
  if (basket.length === 0) return;

  let total = display.querySelector('.cart__sum');
  let sum = 0;

  basket.forEach(item=>{
    let price = data.goods.find(elem=>elem.id === item.id).price
    sum += price * item.count;
  })

  total.textContent = sum + ' ₽';
}



//--------------------------------------------------------------------
// The function forms and exposes cards of goods on the page 
// Функция формирует и размещает карточки товаров на странице
function expose() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  
  if (basket.length === 0) return;
  
  let goods = display.querySelector('.cart__goods');
  
  basket.forEach(item=>{
    let card = document.createElement('div');
    card.classList.add('cart__card');
    card.dataset.goodId = item.id;
    
    let cardData = data.goods.find(elem=>elem.id === item.id);

    card.innerHTML = `<div class="cart__left">
    <div class="cart__imagearea">
      <img src="./assets/pics/png/${cardData.id}.png" alt="good" class="cart__image">
    </div>
    <div class="cart__counterarea">
      <div class="cart__minus hover" data-minus="minus">
        <div class="cart__minus-wrapper" data-minus="minus">
          <svg class="cart__minus-svg svg" data-minus="minus">
            <use xlink:href="./assets/pics/svg/pics.svg#minus" data-minus="minus">
            </use>
          </svg>
        </div>
      </div>
      <p class="cart__count">${item.count}</p>
      <div class="cart__plus hover" data-plus="plus">
        <div class="cart__plus-wrapper" data-plus="plus">
          <svg class="cart__plus-svg svg" data-plus="plus">
            <use xlink:href="./assets/pics/svg/pics.svg#plus" data-plus="plus">
            </use>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="cart__right">
    <div class="cart__deletearea">
      <div class="cart__delete" data-delete="delete">
        <svg class="cart__delete-svg svg" data-delete="delete">
          <use xlink:href="./assets/pics/svg/pics.svg#delete" data-delete="delete">
          </use>
        </svg>
      </div>
    </div>
    <div class="cart__descriptionarea">
      <p class="class__description">${cardData.name}</p>
      <p class="class__cost">${cardData.price} ₽</p>
    </div>
    <div class="cart__pricearea">
      <p class="cart__price">${cardData.price} ₽</p>
    </div>
  </div>`;

  goods.appendChild(card);
  });
}




//--------------------------------------------------------------------
// The function increases amount of corresponding good in the basket
// Функция увеличивает количество соответствующего товара в корзине
function increaseAmount(e) {
  if (e.target.dataset.plus !== 'plus') return

  let basket = JSON.parse(sessionStorage.getItem('basket'));
  let id = e.currentTarget.dataset.goodId;
  let price = data.goods.find(item=>item.id === id).price;
  let total = display.querySelector('.cart__sum');
  let count = e.currentTarget.querySelector('.cart__count');

  basket.find(item=>item.id === id).count++;
  sessionStorage.setItem('basket', JSON.stringify(basket));
  data.showGoodsAmount(cart);

  count.textContent = +count.textContent + 1;
  total.textContent = parseFloat(total.textContent) + price + ' ₽';
}



//--------------------------------------------------------------------
// The function decreases amount of corresponding good in the basket
// Функция увеличивает количество соответствующего товара в корзине
function decreaseAmount(e) {
  if (e.target.dataset.minus !== 'minus') return

  let basket = JSON.parse(sessionStorage.getItem('basket'));
  let id = e.currentTarget.dataset.goodId;
  let price = data.goods.find(item=>item.id === id).price;
  let total = display.querySelector('.cart__sum');
  let count = e.currentTarget.querySelector('.cart__count');
  let elem = basket.find(item=>item.id === id);

  if (elem.count > 1) elem.count--;
  sessionStorage.setItem('basket', JSON.stringify(basket));
  data.showGoodsAmount(cart);

  if (+count.textContent > 1) {
    count.textContent = +count.textContent - 1;
    total.textContent = parseFloat(total.textContent) - price + ' ₽';
  }
  
}



//--------------------------------------------------------------------
// The function deletes the card of good out of the basket
// Функция удаляет карточку товра из корзины
function deleteCard(e) {
  if (e.target.dataset.delete !== 'delete') return

  let basket = JSON.parse(sessionStorage.getItem('basket'));
  let id = e.currentTarget.dataset.goodId;
  let pos = basket.findIndex(item=>item.id === id);

  if (pos != -1) basket.splice(pos, 1);
  sessionStorage.setItem('basket', JSON.stringify(basket));
  
  init();
}



//--------------------------------------------------------------------
// The function imitates an oder making, deleting all cards of goods 
// out of the basket and esposing corresponding text on the page

// Функция имитирует оформление заказа, удаляя все карточки товаров из 
// корзины и размещая соответствующую надпись на странице
function makeOder() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  
  basket.length = 0;
  sessionStorage.setItem('basket', JSON.stringify(basket));
  
  data.showGoodsAmount(cart);
  
  display.classList.add('cart-empty');
  display.textContent = 'Заказ оформлен';
}



//--------------------------------------------------------------------
// The function prepares the page for upcoming operations with it's
// elements: it forms missing parts of HTML code depending on 
// emerging circumstances; it links event listeners. 

// Функция подготавливает страницу для дальнейших операций с ее
// элементами: формирует недостающие участик HTML кода в зависимости
// складывающихся обстоятельств; подключает обработчики событий. 
function init() {
  if (!sessionStorage.getItem('basket')) sessionStorage.setItem('basket', JSON.stringify([]));
  
  if (JSON.parse(sessionStorage.getItem('basket')).length === 0) {
    display.classList.add('cart-empty');
    display.textContent = 'Корзина пуста';
  }
  else {
    if (display.classList.contains('cart-empty')) display.classList.remove('cart-empty');
    display.innerHTML = `<div class="cart__goods">
    <h3 class="cart__basket">Корзина</h3>
    </div>
    <div class="cart__result">
    <div class="cart__total">
      <div class="cart__bill">
        <p class="cart__res">ИТОГО</p>
        <p class="cart__sum"></p>
      </div>
      <button class="cart__button hover">Перейти к оформлению</button>
    </div>
    </div>`;
  
    expose();

    countTotal();

    document.querySelector('.cart__button').addEventListener('click', makeOder);

    document.querySelectorAll('.cart__card').forEach(item=>item.addEventListener('click', increaseAmount)); 
    
    document.querySelectorAll('.cart__card').forEach(item=>item.addEventListener('click', decreaseAmount)); 
    
    document.querySelectorAll('.cart__card').forEach(item=>item.addEventListener('click', deleteCard)); 
  }

  data.showGoodsAmount(cart);
  
};



//---------------------------- Execute ----------------------------

init();

