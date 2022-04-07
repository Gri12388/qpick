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

function main() {
  const wireArea = document.getElementById('wireArea');
  const wirelessArea = document.getElementById('wirelessArea');
  expose(wireArea, expositionWire);
  expose(wirelessArea, expositionWireless);
  if (!sessionStorage.getItem('basket')) sessionStorage.setItem('basket', JSON.stringify([]));
}

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

main();