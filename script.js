const menu = document.querySelector('.menu-btn');
const links = document.querySelector('.nav-links');
menu.addEventListener('click', () => links.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click',()=>links.classList.remove('open')));

document.getElementById('year').textContent = new Date().getFullYear();

const card = document.querySelector('.tilt');
card.addEventListener('mousemove', e => {
  const r = card.getBoundingClientRect();
  const x = (e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`rotate(${3+x*5}deg) rotateX(${-y*5}deg) rotateY(${x*5}deg)`;
});
card.addEventListener('mouseleave',()=>card.style.transform='rotate(3deg)');

document.querySelectorAll('.draggable').forEach(el=>{
  let dragging=false, ox=0, oy=0;
  el.addEventListener('pointerdown',e=>{
    dragging=true; el.setPointerCapture(e.pointerId);
    const r=el.getBoundingClientRect(); ox=e.clientX-r.left; oy=e.clientY-r.top;
    el.style.cursor='grabbing';
  });
  el.addEventListener('pointermove',e=>{
    if(!dragging)return;
    const hero=document.querySelector('.hero').getBoundingClientRect();
    el.style.left=(e.clientX-hero.left-ox)+'px';
    el.style.top=(e.clientY-hero.top-oy)+'px';
    el.style.right='auto';el.style.bottom='auto';
  });
  el.addEventListener('pointerup',()=>{dragging=false;el.style.cursor='grab'});
});

const bowl=document.getElementById('fruitBowl');
const fruits=['🍓','🍊','🍋','🥝','🍒','🍑','🍉','🍇'];
bowl.addEventListener('click',()=>{
  bowl.textContent=Array.from({length:5},()=>fruits[Math.floor(Math.random()*fruits.length)]).join(' ');
  bowl.animate([{transform:'scale(1)'},{transform:'scale(1.25) rotate(5deg)'},{transform:'scale(1)'}],{duration:350});
});

const cursor=document.getElementById('cursorFruit');
let last=0;
window.addEventListener('mousemove',e=>{
  if(innerWidth<850)return;
  cursor.style.display='block';cursor.style.left=(e.clientX+14)+'px';cursor.style.top=(e.clientY+12)+'px';
  const now=Date.now();
  if(now-last>700){cursor.textContent=fruits[Math.floor(Math.random()*fruits.length)];last=now;}
});
