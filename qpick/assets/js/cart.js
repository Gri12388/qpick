import * as data from './data.js'

function addCard() {
  let card = document.createElement('div');
  card.classList.add('cart__card');
  let obj = {
    img: '<img src="./assets/pics/png/3.png" alt="good" class="cart__image">'
  }
  let data = obj;
  card.innerHTML = `<div class="cart__left">
  <div class="cart__imagearea">
    ${data.img}
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
    <p class="cart__count">1</p>
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
    <p class="class__description">Apple BYZ S852I</p>
    <p class="class__cost">2 927 ₽</p>
  </div>
  <div class="cart__pricearea">
    <p class="cart__price"> 2 927 ₽</p>
  </div>
</div>`;

  document.querySelector('.cart__goods').appendChild(card);
}

addCard();
addCard();
addCard();
addCard();
console.log(sessionStorage.getItem('basket'));