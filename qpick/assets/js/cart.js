import * as data from './data.js'

const display = document.querySelector('.cart');
const cart = document.querySelector('.header__circle-cart');

function countTotal() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  if (basket.length === 0) return;

  let total = display.querySelector('.cart__sum');
  let sum = 0;
  basket.forEach(item=>{
    let price = data.goods.find(elem=>elem.id === +item.id).price
    sum += price * item.count;
  })
  total.textContent = sum + ' ₽';
}

function expose() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  if (basket.length === 0) return;
  let goods = display.querySelector('.cart__goods');
  basket.forEach(item=>{
    let card = document.createElement('div');
    card.classList.add('cart__card');
    
    let cardData = data.goods.find(elem=>elem.id === +item.id);

    card.innerHTML = `<div class="cart__left">
    <div class="cart__imagearea">
      <img src="./assets/pics/png/${cardData.id}.png" alt="good" class="cart__image">
    </div>
    <div class="cart__counterarea">
      <div class="cart__minus hover">
        <div class="cart__minus-wrapper">
          <svg class="cart__minus-svg svg">
            <use xlink:href="./assets/pics/svg/pics.svg#minus">
            </use>
          </svg>
        </div>
      </div>
      <p class="cart__count">${item.count}</p>
      <div class="cart__plus hover">
        <div class="cart__plus-wrapper">
          <svg class="cart__plus-svg svg">
            <use xlink:href="./assets/pics/svg/pics.svg#plus">
            </use>
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="cart__right">
    <div class="cart__deletearea">
      <div class="cart__delete">
        <svg class="cart__delete-svg">
          <use xlink:href="./assets/pics/svg/pics.svg#delete">
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

function makeOder() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  basket.length = 0;
  sessionStorage.setItem('basket', JSON.stringify(basket));
  data.showGoodsAmount(cart);
  display.classList.add('cart-empty');
  display.textContent = 'Заказ оформлен';
}


(function init() {
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
  }

  data.showGoodsAmount(cart);
  
})();

