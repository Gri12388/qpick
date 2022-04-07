import * as data from './data.js'

const expositionWire = [
  {id:0, mode:'oldPrice'},
  {id:1},
  {id:2},
  {id:0, mode:'discount'},
  {id:1},
  {id:2},
];
const expositionWireless = [
  {id:3},
  {id:4},
  {id:5},
];

const wireArea = document.getElementById('wireArea');
const wirelessArea = document.getElementById('wirelessArea');
const cart = document.querySelector('.header__circle-cart');



function expose(where, what) {
  what.forEach(item=>{
    let cardData = data.goods.find(elem=>{
      if (elem.id === item.id) return elem;
      else return null;
    });
    if (cardData === null) return;
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
        <p class="buy hover">Купить</p>
      </div>
    </div>`;
    
    where.appendChild(card);
  })
}

function showGoodsAmount() {
  let basket = JSON.parse(sessionStorage.getItem('basket'));
  if (basket.length === 0) cart.style='display:none';
  else {
    cart.style='display:flex';
    cart.textContent = basket.reduce((sum, item)=>sum+item.count, 0);
  } 
  
}

function addGood(e) {
    if(e.target.className.split(' ')[0]==='buy') {
      let basket = JSON.parse(sessionStorage.getItem('basket'));
      let good;
      if (good = basket.find(elem=>{if (elem.id === e.currentTarget.dataset.goodId) return elem})) good.count++;
      else basket.push({id: e.currentTarget.dataset.goodId, count: 1}); 
      sessionStorage.setItem('basket', JSON.stringify(basket));
      showGoodsAmount();
    }
}

function init() {
  expose(wireArea, expositionWire);
  expose(wirelessArea, expositionWireless);
  
  if (!sessionStorage.getItem('basket')) sessionStorage.setItem('basket', JSON.stringify([]));

  showGoodsAmount();

  document.querySelectorAll('.card').forEach(item=>item.addEventListener('click', addGood));
}

init();