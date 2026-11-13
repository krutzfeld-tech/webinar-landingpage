/* Krutzfeld Hero-Animation: Idee -> Prototyp in 7 Tagen -> Durchklicken -> fertige App -> Garantie.
   Umgebaut aus dem JustClose-NTX-Hero-Film (hookfilm-film.js), gleiche Mechanik: 1600x900-Bühne, GSAP-Timeline, Endlosschleife. */
(function(){
'use strict';
var root=document.querySelector('[data-film]');
var stage=root&&root.querySelector('.kf');
if(!stage||!window.gsap)return;
var $=function(s,r){return (r||stage).querySelector(s);},$$=function(s,r){return [].slice.call((r||stage).querySelectorAll(s));};
var F=function(tl,el,a,b,t){return tl.fromTo(el,a,Object.assign({immediateRender:false},b),t);};
var IDEE=['Sanitär-Checks digital machen','Räume einzeln abhaken','Mängel mit Foto festhalten','Bericht für den Kunden'];
var NOTE=[['Tag 1','Prototyp','Masken für alle Räume angelegt'],['Tag 2','Prototyp','Prüffragen mit Ampel eingebaut'],['Tag 3','Feedback','Kunde: Kommentar bei Gelb Pflicht'],['Tag 4','Prototyp','Foto pro Prüfpunkt ergänzt'],['Tag 5','Feedback','Monteur: Weiter-Knopf größer'],['Tag 6','Prototyp','Objektliste und Navigation fertig'],['Tag 7','Prototyp','Bereit zum Durchklicken']];
var FUNK=['Objekte und Räume verwalten','Checks pro Raum','Prüffragen mit Ampel','Kommentar-Pflicht bei Gelb','Foto pro Prüfpunkt','Mehrsprachig','Bereit für Feldtests'];
var ICO='<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
stage.innerHTML='<div class="ew">'+
 '<div class="grid"></div>'+
 '<div class="card idee"><div class="c-h"><b>Deine App&#8209;Idee</b><span class="c-s">seit Monaten im Kopf</span></div><div class="zettel">'+IDEE.map(function(t){return '<div class="zl"><i></i><span>'+t+'</span></div>';}).join('')+'</div></div>'+
 '<div class="card funk"><div class="c-h"><b>Deine App</b><span class="c-s">Funktionen</span></div>'+FUNK.map(function(t){return '<div class="ci"><i>✓</i><span>'+t+'</span></div>';}).join('')+'<div class="c-f"><span class="live">Festpreis steht</span></div></div>'+
 '<div class="phone"><div class="screen"><div class="island"></div>'+
   '<div class="ls"><div class="ls-date">Dein Prototyp</div><div class="ls-time">Tag 1</div><div class="bar"><i></i></div>'+
   '<div class="notifs">'+NOTE.map(function(n){return '<div class="nt"><div class="ic">'+ICO+'</div><div class="tx"><div class="hdr"><span>'+n[1]+'</span><span>'+n[0]+'</span></div><p>'+n[2]+'</p></div></div>';}).join('')+'</div></div>'+
   '<div class="app a1"><img src="assets/img/holling-1.webp" alt=""></div>'+
   '<div class="app a2"><img src="assets/img/holling-2.webp" alt=""></div>'+
   '<span class="tap"></span><div class="home"></div></div></div>'+
 '<div class="garantie-pill"><svg viewBox="0 0 24 24" width="40" height="40"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3Z" fill="none" stroke="#22d3ee" stroke-width="2"/><path d="m9 12 2.2 2.2L15.5 10" fill="none" stroke="#22d3ee" stroke-width="2"/></svg><span><b>Kein Prototyp nach 7&nbsp;Tagen?</b>Dann zahlst Du nichts.</span></div>'+
 '<div class="cap"></div>'+
 '<div class="hud"><span class="n">01</span><b>Die Idee</b></div>'+
 '<div class="ff"><svg viewBox="0 0 24 14" width="28" height="16"><path d="M0 0l11 7-11 7zM12 0l11 7-11 7z" fill="currentColor"/></svg>Zeitraffer</div>'+
'</div>';
function fit(){var w=stage.parentNode.clientWidth||1000;stage.style.transform='scale('+(w/1000)+')';}
fit();window.addEventListener('resize',fit);

function build(){
  var tl=gsap.timeline({paused:true});
  var ew=$('.ew'),hud=$('.hud'),hn=$('.hud .n'),hb=$('.hud b'),cap=$('.cap'),ff=$('.ff');
  var idee=$('.card.idee'),zls=$$('.zl'),funk=$('.card.funk'),cis=$$('.card.funk .ci'),live=$('.live');
  var phone=$('.phone'),lt=$('.ls-time'),bar=$('.bar i'),nts=$$('.nt'),a1=$('.a1'),a2=$('.a2'),tap=$('.tap');
  var gp=$('.garantie-pill');
  var NH=96; /* Höhe einer Mitteilung inkl. Abstand */
  /* Grundzustand für jeden Durchlauf */
  tl.set(ew,{opacity:1,filter:'blur(0px)'},0);
  tl.set([idee,funk,gp,cap,ff,live,tap],{opacity:0},0);
  tl.set([phone,funk,cap,hud],{filter:'none'},0);
  tl.set(phone,{x:460,opacity:0,rotation:0,scale:1},0);
  tl.set([a1,a2],{opacity:0,x:0,scale:1},0);
  tl.set(nts,{opacity:0,y:0},0);
  tl.set(zls,{opacity:0,x:-20},0);
    tl.call(function(){hn.textContent='01';hb.textContent='Die Idee';cap.innerHTML='';lt.textContent='Tag 1';bar.style.width='0%';cis.forEach(function(c){c.classList.remove('an');});},null,0);
  function step(t,n,txt){tl.to(hud,{opacity:0,x:-14,duration:.14},t);tl.call(function(){hn.textContent=(n<10?'0':'')+n;hb.textContent=txt;},null,t+.14);F(tl,hud,{opacity:0,x:-14},{opacity:1,x:0,duration:.25,ease:'power3.out'},t+.15);}
  function capt(t,html){tl.to(cap,{opacity:0,duration:.15},t);tl.call(function(){cap.innerHTML=html;},null,t+.15);F(tl,cap,{opacity:0,y:30},{opacity:1,y:0,duration:.35,ease:'power3.out'},t+.2);}
  /* 01 Die Idee */
  F(tl,hud,{opacity:0,x:-14},{opacity:1,x:0,duration:.3},.1);
  F(tl,idee,{x:-60,opacity:0},{x:0,opacity:1,duration:.5,ease:'power3.out'},.3);
  zls.forEach(function(z,k){F(tl,z,{opacity:0,x:-20},{opacity:1,x:0,duration:.3,ease:'power2.out'},.8+k*.45);});
  capt(.6,'Die Idee.');
  /* 02 Prototyp in 7 Tagen */
  var P=3.6;
  step(P,2,'Prototyp in 7 Tagen');
  tl.to(idee,{x:-80,opacity:0,duration:.4,ease:'power2.in'},P);tl.to(cap,{opacity:0,duration:.2},P);
  tl.to(phone,{x:0,opacity:1,duration:.7,ease:'power3.out'},P+.2);
  F(tl,ff,{opacity:0},{opacity:1,duration:.3},P+.6);
  capt(P+.4,'Prototyp.');
  var tt=P+1.0;
  nts.forEach(function(n,k){
    F(tl,n,{opacity:0,y:-24,scale:.96},{opacity:1,y:0,scale:1,duration:.22,ease:'power2.out'},tt);
    for(var j=0;j<k;j++){tl.to(nts[j],{y:(k-j)*NH,duration:.22,ease:'power2.out'},tt);}
    (function(k){tl.call(function(){lt.textContent=NOTE[k][0];bar.style.width=((k+1)/7*100)+'%';},null,tt);})(k);
    F(tl,phone,{rotation:k%2?1.4:-1.4},{rotation:0,duration:.3,ease:'elastic.out(1.2,0.3)'},tt);
    tt+=.55;
  });
  tl.to(ff,{opacity:0,duration:.3},tt);
  /* 03 Kunden klicken durch */
  var D=tt+.4;
  step(D,3,'Kunden testen');
  tl.to(phone,{scale:1.04,duration:.6,ease:'power3.inOut'},D);
  F(tl,a1,{opacity:0,scale:.96},{opacity:1,scale:1,duration:.4,ease:'power2.out'},D+.3);
  capt(D+.3,'Durchklicken.');
  function tp(t,x,y){tl.set(tap,{left:x,top:y},t);F(tl,tap,{opacity:0,scale:.4},{opacity:1,scale:1,duration:.18},t);tl.to(tap,{scale:1.6,opacity:0,duration:.35},t+.22);}
  tp(D+1.2,190,215);
  F(tl,a2,{opacity:0,x:60},{opacity:1,x:0,duration:.35,ease:'power3.out'},D+1.55);
  tp(D+2.4,195,290);tp(D+3.1,304,612);
  /* 04 Deine App mit allen Funktionen */
  var A=D+3.7;
  step(A,4,'Deine App');
  F(tl,funk,{x:-90,opacity:0},{x:0,opacity:1,duration:.4,ease:'power3.out'},A);
  cis.forEach(function(c,k){var t=A+.5+k*.32;tl.call(function(){c.classList.add('an');},null,t);F(tl,$('i',c),{scale:1.5},{scale:1,duration:.25,ease:'back.out(3)'},t);});
  var AE=A+.5+cis.length*.32;
  F(tl,live,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.3,ease:'back.out(2.5)'},AE);
  capt(A+.3,'Die App.');
  /* Endbild: App bleibt stehen, Garantie kommt dazu */
  var G=AE+.9;
  tl.to(cap,{opacity:0,y:10,duration:.3},G);
  F(tl,gp,{opacity:0,y:30,scale:.96},{opacity:1,y:0,scale:1,duration:.45,ease:'back.out(1.8)'},G+.25);
  tl.addLabel('ende',G+.8);
  return tl;
}
var RM=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
var tl=build();
var pp=root.querySelector('.film-pp');
var fertig=false;
tl.eventCallback('onComplete',function(){fertig=true;if(pp)pp.hidden=true;});
if(RM){tl.progress(1);fertig=true;if(pp)pp.hidden=true;}
var sicht=false,pausiert=false;
function run(){if(fertig)return;if(sicht&&!pausiert&&!document.hidden)tl.play();else tl.pause();}
if('IntersectionObserver' in window){new IntersectionObserver(function(e){sicht=e[0].isIntersecting;run();},{threshold:.25}).observe(root);}else{sicht=true;run();}
document.addEventListener('visibilitychange',run);
if(pp){pp.addEventListener('click',function(){pausiert=!pausiert;pp.classList.toggle('pausiert',pausiert);pp.setAttribute('aria-label',pausiert?'Animation abspielen':'Animation pausieren');run();});}
window.krutzfeldFilm=tl;
})();
