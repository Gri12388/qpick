//---------------------------- Modules ----------------------------

import * as data from './data.js'



//---------------------------- Variables ----------------------------


const expositionWire = [
  {id:'0', mode:'oldPrice'},
  {id:'1'},
  {id:'2'},
  {id:'0', mode:'discount'},
  {id:'1'},
  {id:'2'},
]; // Array of wired headphones / Массив проводных наушников 
const expositionWireless = [
  {id:'3'},
  {id:'4'},
  {id:'5'},
]; // Array of wireless headphones / Массив безпроводных наушников 

const cart = document.querySelector('.header__circle-cart'); // Pic of a cart in top-right corner / Пиктограмма тележки в верхнем правом углу
const wireArea = document.getElementById('wireArea'); // Area of wired headphones / Зона проводных наушников
const wirelessArea = document.getElementById('wirelessArea'); // Area of wireless headphones / Зона безпроводных наушников



//---------------------------- Functions ----------------------------

//--------------------------------------------------------------------
// The function forms and exposes cards of goods on the page 
// Функция формирует и размещает карточки товаров на странице
function expose(where, what) {
  what.forEach(item=>{
    let cardData = data.goods.find(elem=>elem.id === item.id);
    
    if (cardData === undefined) return;
    
    let card = document.createElement('div');
    card.classList.add('card');
    if (item.mode==='discount') card.classList.add('card-discount');
    card.dataset.goodId = item.id;

    card.innerHTML = `<img src="./assets/pics/png/${cardData.id}.png" alt="headphone" class="image">
    <div class="content">
      <div class="upline">
        <p class="name">${cardData.name}</p>
        <div class="price">
          <p class="newprice">${cardData.price} ₽</p>
          <p class="oldprice">${item.mode==='oldPrice'?cardData.oldPrice + ' ₽':''}</p>
        </div>
        <p class="discount" ${item.mode!=='discount'?'hidden':''}>${item.mode==='discount'?cardData.discount+'%':''}</p>
      </div>
      <div class="downline">
        <div class="rate">
          <img src="./assets/pics/png/star.png" alt="star" class="star">
          <p class="number">${cardData.rate}</p>
        </div>
        <p class="buy hover" data-translate="2">Купить</p>
      </div>
    </div>`;
    
    where.appendChild(card);
  })
}



//--------------------------------------------------------------------
// The function adds a good to the basket
// Функция добавляет товар в корзину
function addGood(e) {
    if(e.target.className.split(' ')[0]==='buy') {
      let basket = JSON.parse(sessionStorage.getItem('basket'));
      let good;

      if (good = basket.find(elem=>elem.id === e.currentTarget.dataset.goodId)) good.count++;
      else basket.push({id: e.currentTarget.dataset.goodId, count: 1}); 
      
      sessionStorage.setItem('basket', JSON.stringify(basket));
      
      data.showGoodsAmount(cart);
    }
}



//--------------------------------------------------------------------
// The function prepares the page for upcoming operations with it's
// elements: it forms missing parts of HTML code depending on 
// emerging circumstances; it links event listeners; it translates
// text to required language. 

// Функция подготавливает страницу для дальнейших операций с ее
// элементами: формирует недостающие участик HTML кода в зависимости
// складывающихся обстоятельств; подключает обработчики событий, 
// переводит текст на нужный язык. 
function init() {
  expose(wireArea, expositionWire);
  expose(wirelessArea, expositionWireless);
  
  if (!sessionStorage.getItem('basket')) sessionStorage.setItem('basket', JSON.stringify([]));

  if (!localStorage.getItem('lang12388')) localStorage.setItem('lang12388', '0');

  data.showGoodsAmount(cart);

  data.translateText(document.getElementsByTagName('body'));

  document.querySelectorAll('.card').forEach(item=>item.addEventListener('click', addGood));

  document.querySelectorAll('.footer__lang').forEach(item=>item.addEventListener('click', data.switchLanguage));
}



//---------------------------- Execute ----------------------------

init();