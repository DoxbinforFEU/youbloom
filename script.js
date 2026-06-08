gsap.registerPlugin(ScrollTrigger);

// Stars
(()=>{
  const s=document.getElementById('stars');
  for(let i=0;i<130;i++){
    const d=document.createElement('div'); d.className='star';
    const z=Math.random()*2+.4;
    d.style.cssText=`width:${z}px;height:${z}px;top:${Math.random()*100}%;left:${Math.random()*100}%;animation-duration:${2+Math.random()*4}s;animation-delay:${Math.random()*6}s`;
    s.appendChild(d);
  }
})();

// Particles
(()=>{
  const p=document.getElementById('particles');
  for(let i=0;i<22;i++){
    const d=document.createElement('div'); d.className='particle';
    const z=Math.random()*5+2;
    d.style.cssText=`width:${z}px;height:${z}px;left:${Math.random()*100}%;animation-duration:${9+Math.random()*11}s;animation-delay:${Math.random()*10}s;--dx:${(Math.random()-.5)*90}px`;
    p.appendChild(d);
  }
})();

// Cursor
const cur=document.getElementById('cursor'),ring=document.getElementById('cursor-ring'),ml=document.getElementById('mlight');
document.addEventListener('mousemove',e=>{
  gsap.to(cur,{left:e.clientX-5,top:e.clientY-5,duration:.05});
  gsap.to(ring,{left:e.clientX-16,top:e.clientY-16,duration:.18});
  gsap.to(ml,{left:e.clientX,top:e.clientY,duration:.3});
});

// Progress bar
window.addEventListener('scroll',()=>{
  document.getElementById('prog').style.width=
    (window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
});

// Loader
const ltl=gsap.timeline();
ltl.to('#ld-sub',{opacity:1,duration:.9,delay:.6})
   .to('#ld-bar',{width:'180px',duration:1.1,ease:'power2.inOut'})
   .to('#loader',{opacity:0,duration:.7,delay:.4})
   .set('#loader',{display:'none'})
   .then(()=>boot());

function boot(){
  // Hero title char split
  const t=document.getElementById('hero-title');
  t.innerHTML=[...'Cali'].map(c=>`<span style="display:inline-block">${c}</span>`).join('');
  gsap.fromTo(t.querySelectorAll('span'),
    {opacity:0,y:70,rotateX:90,scale:.6},
    {opacity:1,y:0,rotateX:0,scale:1,duration:1.1,stagger:.14,ease:'back.out(1.8)',delay:.1}
  );
  gsap.to('#hero-sub',{opacity:1,duration:1,delay:1.1});
  gsap.to('#hero-tag',{opacity:1,duration:1,delay:1.7});
  gsap.to('#scroll-ind',{opacity:1,duration:1,delay:2.1});
  gsap.to('#hero-title',{filter:'brightness(1.25)',duration:2.5,yoyo:true,repeat:-1,ease:'sine.inOut'});

  setupScrollReveal();
  buildCards();
  startHearts();
}

function setupScrollReveal(){
  // All .reveal elements
  document.querySelectorAll('.reveal').forEach(el=>{
    gsap.fromTo(el,{opacity:0,y:45},{
      opacity:1,y:0,duration:1,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 82%',once:true}
    });
  });

  // Parallax on cinematic image (clipped inside .cinematic-media)
  const ci=document.querySelector('.cinematic-media img');
  if(ci) gsap.fromTo(ci,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:'.layout-cinematic',start:'top bottom',end:'bottom top',scrub:true}});

  // Stagger cards when they enter
  ScrollTrigger.create({
    trigger:'#cards-grid',start:'top 80%',once:true,
    onEnter:()=>gsap.fromTo('.mot-card',{opacity:0,y:40,scale:.94},
      {opacity:1,y:0,scale:1,stagger:.07,duration:.75,ease:'back.out(1.5)'}
    )
  });
}

// Motivation Cards
const CARDS=[
  {icon:"✦",title:"You are doing well",sub:"Be Proud",msg:`Where times feel so short and you feel unmotivated, just know that we once felt that way. But we always kept pushing.`},
  {icon:"🌙",title:"Sweet Dreams, Sleep Well.",sub:"You will always deserve that beauty rest",msg:`Resting is good for the soul, mind, and heart, that's how humans recover and heal. Don't stress yourself too much.`},
  {icon:"💜",title:"I love you 777",sub:"Everlasting Love",msg:`I love how you take care of yourself even when you feel down. Your consistency shines a lot and it shows every single bit of push that you do towards yourself.`},
  {icon:"⭐",title:"You shine amongst all the brightest stars in every universe.",sub:"You are a one of one",msg:`You are a gift in this world, most people wouldn't even experience this, and I'm thankful that I get to experience and cherish your love.`},
  {icon:"💮",title:"You are as graceful as a peony",sub:"your favourite flower.",msg:`The way you bloom speaks for itself, you are a one of a kind. A gentle and beautiful soul, that was meant to push themselves and achieve success in life. That's what I see in you that you cannot, but you will eventually.`},
  {icon:"🏆",title:"Your accomplishments speaks for it self",sub:"When you want it, you can get it",msg:`Your accomplishments in school, speaks a lot about your dedication and how you want to stand out in this world. I never had accomplishments, until I had you. I've accomplished peace and the love of eternity for my soul.`},
  {icon:"𓊍",title:"Dont rush yourself, you have a lot of time",sub:"You're doing great.",msg:`You don't have to get the best outcome just yet, it'll take time and I'm for sure that you will get them. I trust you.`},
  {icon:"🧠",title:"You are both brains and beauty",sub:"One of the greatest assets you have is your brain, no one can take that away.",msg:`Your intelligence and humour are the qualities you have that I admire a lot. You correct me when I'm wrong, make me laugh, when I'm sad. You always gave me the happiness I never fully had. `},
  {icon:"🫶",title:"You have me, and I will never go away",sub:"Believe in you the way I believe in you.",msg:`We have our similiraties and differences, but I would always want you to adapt the optimism I have towards myself, towards you, and towards the both of us. Time does not stop ticking, but remember that I will always find away to slow it down.`},
  {icon:"✝︎",title:"I will always pray for us",sub:"Our souls are interlinked",msg:`Our prayers had been answered and the faith that I have in this relationship will never go away, the way I have my faith in the lord that he will guide us through our darkest paths,`},
];

function buildCards(){
  const g=document.getElementById('cards-grid');
  CARDS.forEach(c=>{
    const el=document.createElement('div'); el.className='mot-card';
    el.innerHTML=`<div class="card-front"><span class="card-icon">${c.icon}</span><h3>${c.title}</h3><p>${c.sub}</p></div>
<div class="card-msg"><button class="card-close" onclick="closeCard(this)">✕</button><p>${c.msg}</p></div>`;
    el.addEventListener('click',function(e){if(!e.target.classList.contains('card-close')) openCard(this);});
    el.addEventListener('mousemove',function(e){
      const r=this.getBoundingClientRect();
      gsap.to(this,{rotateY:(e.clientX-r.left)/r.width*14-7,rotateX:-((e.clientY-r.top)/r.height*10-5),duration:.3});
    });
    el.addEventListener('mouseleave',function(){gsap.to(this,{rotateY:0,rotateX:0,duration:.5,ease:'elastic.out(1,.5)'})});
    g.appendChild(el);
  });
}
function openCard(c){
  const m=c.querySelector('.card-msg');
  m.classList.add('open');
  gsap.fromTo(m,{scale:.88,opacity:0},{scale:1,opacity:1,duration:.45,ease:'back.out(1.7)'});
}
function closeCard(b){
  const m=b.closest('.card-msg');
  gsap.to(m,{scale:.88,opacity:0,duration:.28,ease:'power2.in',onComplete:()=>m.classList.remove('open')});
}

// Hearts
function startHearts(){
  const el=document.getElementById('hearts');
  const sym=["💜","✦","♡","✨","★"];
  setInterval(()=>{
    const h=document.createElement('div'); h.className='heart';
    h.textContent=sym[Math.floor(Math.random()*sym.length)];
    h.style.cssText=`left:${Math.random()*90}%;font-size:${1+Math.random()*1.4}rem;animation-duration:${6+Math.random()*5}s;animation-delay:${Math.random()*1.5}s`;
    el.appendChild(h); setTimeout(()=>h.remove(),12000);
  },900);
}

// Player
const aud=document.getElementById('aud');
let playing=false;
// Ensure embedded source is used and volume matches UI
(function initEmbeddedAudio(){
  try{
    const srcEl = aud.querySelector('source');
    if(srcEl && !aud.src) aud.src = srcEl.src;
    aud.load();
    const v = document.querySelector('.pl-vol input');
    if(v) aud.volume = v.value/100;
  }catch(e){console.error(e)}
})();
function togglePlay(){
  if(!aud.src) return; // no-op if no source
  if(playing){aud.pause();playing=false;document.getElementById('pl-btn').textContent='▶';stopViz();}
  else{aud.play();playing=true;document.getElementById('pl-btn').textContent='⏸';startViz();}
}
function endAud(){playing=false;document.getElementById('pl-btn').textContent='▶';stopViz();}
aud.addEventListener('timeupdate',()=>{
  if(!aud.duration)return;
  const p=(aud.currentTime/aud.duration)*100;
  document.getElementById('pl-fill').style.width=p+'%';
  document.getElementById('pl-cur').textContent=fmt(aud.currentTime);
  document.getElementById('pl-dur').textContent=fmt(aud.duration);
});
document.getElementById('pl-prog').addEventListener('click',function(e){
  if(!aud.duration)return;
  const r=this.getBoundingClientRect();
  aud.currentTime=((e.clientX-r.left)/r.width)*aud.duration;
});
function setVol(el){aud.volume=el.value/100;el.style.setProperty('--v',el.value+'%');}
function fmt(s){const m=Math.floor(s/60),sec=Math.floor(s%60);return m+':'+(sec<10?'0':'')+sec;}
const vz=document.getElementById('pl-viz');
for(let i=0;i<20;i++){const b=document.createElement('div');b.className='viz-bar';vz.appendChild(b);}
let vint;
function startViz(){vint=setInterval(()=>{vz.querySelectorAll('.viz-bar').forEach(b=>{b.style.height=(3+Math.random()*15)+'px';b.style.opacity=.4+Math.random()*.6;});},110);}
function stopViz(){clearInterval(vint);vz.querySelectorAll('.viz-bar').forEach(b=>{b.style.height='3px';b.style.opacity='.4';});}
