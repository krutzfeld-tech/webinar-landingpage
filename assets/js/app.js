/* Webinar-Landingpage: Zielgruppen-Weiche, Anmelde-Popup, Exit-Intent, Animationen, Vorschau-Modus */
(function () {
  'use strict';
  var LP = window.LP || {};
  var EV = LP.event || {};
  var KEY_ZG = 'tsb_zg', KEY_REG = 'tsb_registriert', KEY_EXIT = 'tsb_exit', KEY_WEICHE = 'tsb_weiche';
  var store = {
    get: function (k, s) { try { return (s ? sessionStorage : localStorage).getItem(k); } catch (e) { return null; } },
    set: function (k, v, s) { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) {} }
  };
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* Vorschau-Modus: nur auf Live-Hosts echt */
  var istLive = (LP.liveHosts || []).indexOf(location.hostname) !== -1;
  if (!istLive) document.body.classList.add('vorschau-modus');

  /* Termin-Texte aus der Konfiguration */
  $$('[data-ev]').forEach(function (el) { var k = el.getAttribute('data-ev'); if (EV[k]) el.textContent = EV[k]; });

  /* Zielgruppe: URL-Parameter > Speicher */
  var params = new URLSearchParams(location.search);
  var zg = params.get('zg');
  if (zg && LP.zielgruppen && LP.zielgruppen[zg] !== undefined) store.set(KEY_ZG, zg); else zg = store.get(KEY_ZG);
  function personalisieren(seg) {
    var T = (LP.zielgruppen || {})[seg] || {};
    $$('[data-zgt]').forEach(function (el) {
      var k = el.getAttribute('data-zgt');
      if (!el.hasAttribute('data-standard')) el.setAttribute('data-standard', el.textContent);
      el.textContent = T[k] || el.getAttribute('data-standard');
    });
    var hidden = $('#anmeldung input[name=zielgruppe]'); if (hidden) hidden.value = seg || '';
  }
  if (zg) personalisieren(zg);

  /* Popup */
  var modal = $('#modal'), schrittWeiche = $('[data-schritt=weiche]'), schrittForm = $('[data-schritt=formular]');
  var letzterFokus = null;
  /* 'erstbesuch' = Weiche beim Laden (danach zurück zur Seite), 'anmelden' = über einen CTA (danach Formular) */
  var modus = 'anmelden';
  function zeigeSchritt(name) {
    if (schrittWeiche) schrittWeiche.hidden = name !== 'weiche';
    if (schrittForm) schrittForm.hidden = name !== 'formular';
  }
  /* Weiche nur beim ersten Besuch. Buttons und Exit-Intent öffnen immer direkt das Formular. */
  var formPill = $('[data-form-pill]'), formTitel = $('[data-form-titel]');
  function oeffnen(opts) {
    opts = opts || {};
    if (!modal) return;
    letzterFokus = document.activeElement;
    modus = opts.modus || 'anmelden';
    var weiche = modus === 'erstbesuch';
    var formUnter = $('[data-form-unter]');
    if (formPill) formPill.textContent = modus === 'exit' ? 'Bevor Du gehst' : 'Kostenfreies Live-Webinar';
    if (formTitel) formTitel.textContent = modus === 'exit' ? 'Willst Du Deine App\u2011Idee anklicken, bevor Du zahlst?' : 'In 7\u00a0Tagen klickst Du Dich durch Deine App\u2011Idee.';
    if (formUnter) formUnter.textContent = modus === 'exit' ? 'Dann komm live dazu. Ich zeige Dir, wie das in 7\u00a0Tagen geht, ohne vorab 5\u2011stellig zu investieren.' : 'Live zeige ich Dir, wie Du die eine Annahme hinter Deiner Idee findest und testest, bevor Du 5\u2011stellig zahlst.';
    zeigeSchritt(weiche ? 'weiche' : 'formular');
    modal.classList.toggle('ist-weiche', weiche);
    modal.hidden = false; modal.classList.add('offen'); document.body.classList.add('popup-offen');
    var f = weiche ? $('.kachel', modal) : $('#anmeldung input[name=vorname]');
    if (f) setTimeout(function () { f.focus({ preventScroll: true }); }, 60);
  }
  function schliessen() {
    if (!modal) return;
    modal.classList.remove('offen'); modal.hidden = true; document.body.classList.remove('popup-offen');
    store.set(KEY_WEICHE, '1');
    if (letzterFokus && letzterFokus.focus) letzterFokus.focus();
  }
  $$('[data-anmelden]').forEach(function (b) { b.addEventListener('click', function () { oeffnen({ modus: 'anmelden' }); }); });
  $$('[data-schliessen]').forEach(function (b) { b.addEventListener('click', schliessen); });
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) schliessen(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && !modal.hidden) schliessen(); });

  /* Weiche: Kachel wählen */
  $$('.kachel').forEach(function (k) {
    k.addEventListener('click', function () {
      var seg = k.getAttribute('data-zg');
      store.set(KEY_ZG, seg); personalisieren(seg);
      $$('.kachel').forEach(function (x) { x.classList.toggle('aktiv', x === k); });
      if (modus === 'erstbesuch') { schliessen(); return; }
      zeigeSchritt('formular');
      var f = $('#anmeldung input[name=vorname]'); if (f) setTimeout(function () { f.focus(); }, 50);
    });
  });

  /* Weiche beim ersten Besuch (nicht für Angemeldete, nicht bei ?zg=) */
  var registriert = store.get(KEY_REG) === '1';
  if (!zg && !registriert && store.get(KEY_WEICHE) !== '1' && !params.has('zg') && !params.has('ohne-weiche')) {
    setTimeout(function () { oeffnen({ modus: 'erstbesuch' }); }, 900);
  }

  /* Anmeldung */
  var form = $('#anmeldung');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var vorname = form.vorname.value.trim(), email = form.email.value.trim();
    var ok = vorname.length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    var fehler = $('[data-fehler]', form); if (fehler) fehler.classList.toggle('zeigen', !ok);
    if (!ok) return;
    var seg = store.get(KEY_ZG) || '';
    store.set('tsb_vorname', vorname, true); store.set('tsb_email', email, true); store.set('tsb_seg', seg, true);
    var btn = $('button[type=submit]', form); if (btn) { btn.disabled = true; (btn.querySelector('span') || btn).textContent = 'Einen Moment …'; }
    if (!istLive) { store.set(KEY_REG, '1'); location.href = 'danke.html?vorschau=1'; return; }
    var cfg = LP.anmeldung || {};
    if (cfg.modus === 'endpunkt' && cfg.anmeldeEndpunkt) {
      fetch(cfg.anmeldeEndpunkt, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorname: vorname, email: email, zielgruppe: seg, tag: 'webinar-zg-' + (seg || 'ohne'), quelle: location.href }) })
        .then(function () { store.set(KEY_REG, '1'); location.href = 'danke.html'; })
        .catch(function () { if (fehler) { fehler.textContent = 'Das hat nicht geklappt. Bitte versuch es noch einmal.'; fehler.classList.add('zeigen'); } if (btn) { btn.disabled = false; (btn.querySelector('span') || btn).textContent = 'Platz sichern'; } });
    } else {
      store.set(KEY_REG, '1');
      var url = (LP.links || {}).webinarjamAnmeldung || 'danke.html';
      var sep = url.indexOf('?') === -1 ? '?' : '&';
      location.href = url + sep + 'first_name=' + encodeURIComponent(vorname) + '&email=' + encodeURIComponent(email) + '&zg=' + encodeURIComponent(seg);
    }
  });

  /* Exit-Intent: einmal pro Sitzung, nicht für Angemeldete, frühestens nach 20 s, nie vor der Weiche */
  var start = Date.now();
  function exitIntent() {
    if (registriert || store.get(KEY_EXIT, true) === '1') return;
    if (Date.now() - start < 20000) return;
    if (modal && !modal.hidden) return;
    store.set(KEY_EXIT, '1', true);
    oeffnen({ modus: 'exit' });
  }
  document.addEventListener('mouseout', function (e) { if (!e.relatedTarget && e.clientY <= 0) exitIntent(); });
  var maxScroll = 0, letzterY = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
    if (y > maxScroll) maxScroll = y;
    if (h > 0 && maxScroll / h > 0.5 && letzterY - y > 320) exitIntent();
    letzterY = y;
  }, { passive: true });

  /* Sticky-CTA auf dem Handy: erscheint, sobald der Hero-Button aus dem Bild ist */
  var sticky = $('[data-sticky]'), heroBtn = $('.hero [data-anmelden]');
  if (sticky && heroBtn && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { var raus = !en[0].isIntersecting && en[0].boundingClientRect.top < 0; sticky.classList.toggle('zeigen', raus); sticky.setAttribute('aria-hidden', raus ? 'false' : 'true'); $('button', sticky).tabIndex = raus ? 0 : -1; }).observe(heroBtn);
  }

  /* Tilt-Effekt wie appTiltCard der Website */
  function reduziertMotion() { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  if (!reduziertMotion()) $$('[data-tilt]').forEach(function (el) {
    var max = 5, persp = 900;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect(), cx = r.width / 2, cy = r.height / 2;
      var ry = ((e.clientX - r.left - cx) / cx) * max, rx = ((cy - (e.clientY - r.top)) / cy) * max;
      el.style.transform = 'perspective(' + persp + 'px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = 'perspective(' + persp + 'px) rotateX(0deg) rotateY(0deg)'; });
  });

  /* Hero-Teaser: bei reduzierter Bewegung anhalten */
  var teaser = $('[data-teaser]');
  if (teaser && reduziertMotion()) { teaser.removeAttribute('autoplay'); teaser.pause(); teaser.setAttribute('controls', ''); }

  /* Reveal-Animationen */
  var reduziert = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = $$('.reveal');
  if (reduziert || !('IntersectionObserver' in window)) reveals.forEach(function (r) { r.classList.add('visible'); });
  else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    reveals.forEach(function (r) { io.observe(r); });
  }

  /* Leiter: roter Sprung-Pfeil von Stufe 1 zu Stufe 6, aus der echten Lage berechnet */
  var leiter = $('[data-leiter]');
  function pfeilZeichnen() {
    if (!leiter) return;
    var a = $('[data-stufe="1"]', leiter), z = $('[data-stufe="6"]', leiter), svg = $('svg.sprung', leiter), lbl = $('.sprung-label', leiter);
    if (!a || !z || !svg) return;
    var lr = leiter.getBoundingClientRect(), ar = a.getBoundingClientRect(), zr = z.getBoundingClientRect();
    /* Klammer-Pfeil links außen: aus der Mitte von Stufe 1 raus, runter, mit Spitze in die Mitte von Stufe 6 */
    var xa = ar.left - lr.left - 4, y1 = ar.top - lr.top + ar.height / 2, y2 = zr.top - lr.top + zr.height / 2;
    var xg = xa - 22, r = 12;
    svg.setAttribute('viewBox', '0 0 ' + lr.width + ' ' + lr.height);
    $('path', svg).setAttribute('d', 'M ' + xa + ' ' + y1 + ' H ' + (xg + r) + ' Q ' + xg + ' ' + y1 + ' ' + xg + ' ' + (y1 + r) + ' V ' + (y2 - r) + ' Q ' + xg + ' ' + y2 + ' ' + (xg + r) + ' ' + y2 + ' H ' + (xa - 9));
    $('.spitze', svg).setAttribute('points', (xa - 11) + ',' + (y2 - 6) + ' ' + (xa - 11) + ',' + (y2 + 6) + ' ' + (xa - 1) + ',' + y2);
    if (lbl) { lbl.style.top = ((y1 + y2) / 2 - lbl.offsetHeight / 2) + 'px'; lbl.style.left = '50%'; lbl.style.transform = 'translateX(-50%)'; }
  }
  pfeilZeichnen();
  window.addEventListener('resize', pfeilZeichnen);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pfeilZeichnen);
  window.addEventListener('load', pfeilZeichnen);
})();

/* Zahlen hochzählen, sobald sie sichtbar sind */
(function () {
  var els = [].slice.call(document.querySelectorAll('[data-zaehle]'));
  if (!els.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  els.forEach(function (e) { e.textContent = '0'; });
  var io = new IntersectionObserver(function (en) {
    en.forEach(function (x) {
      if (!x.isIntersecting) return; io.unobserve(x.target);
      var el = x.target, ziel = +el.getAttribute('data-zaehle'), t0 = null, d = 1400;
      function f(t) { if (!t0) t0 = t; var k = Math.min(1, (t - t0) / d); el.textContent = Math.round(ziel * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); }
      requestAnimationFrame(f);
    });
  }, { threshold: .6 });
  els.forEach(function (e) { io.observe(e); });
})();

/* Insel unten: Botschaften im Wechsel, Tage bis zum Start, mobil erst nach dem ersten Scrollen */
(function () {
  var ins = document.getElementById('insel'); if (!ins) return;
  var box = ins.querySelector('.insel-text'), t = document.getElementById('insel-tage');
  try {
    var heute = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Zurich' }).format(new Date());
    var tage = Math.round((Date.parse('2026-12-02T00:00:00Z') - Date.parse(heute + 'T00:00:00Z')) / 86400000);
    if (t) { if (tage > 1) t.textContent = 'Start in ' + tage + ' Tagen'; else if (tage === 1) t.textContent = 'Morgen um 11 Uhr'; else if (tage === 0) t.textContent = 'Heute um 11 Uhr'; }
  } catch (e) {}
  function an() { if (window.scrollY > 12) { ins.classList.add('da'); var ib = ins.querySelector('.insel-btn'); if (ib) setTimeout(function(){ ib.classList.add('ring-los'); }, 400); removeEventListener('scroll', an); } }
  addEventListener('scroll', an, { passive: true }); an();
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var els = box.querySelectorAll(':scope > span'), i = 0;
  setInterval(function () {
    var alt = els[i]; i = (i + 1) % els.length; var neu = els[i];
    alt.classList.remove('aktiv'); alt.classList.add('raus');
    neu.classList.remove('raus'); neu.classList.add('aktiv');
    setTimeout(function () { alt.classList.remove('raus'); }, 600);
  }, 2600);
})();

/* Countdown im Ticket */
(function () {
  var box = document.querySelector('[data-countdown]'); if (!box) return;
  var ziel = Date.parse(box.getAttribute('data-countdown'));
  var f = function (k) { return box.querySelector('[data-cd="' + k + '"]'); };
  var T = f('t'), S = f('s'), M = f('m'), X = f('x');
  var z = function (n) { return (n < 10 ? '0' : '') + n; };
  function tick() {
    var d = Math.max(0, ziel - Date.now()), s = Math.floor(d / 1000);
    T.textContent = z(Math.floor(s / 86400)); S.textContent = z(Math.floor(s % 86400 / 3600));
    M.textContent = z(Math.floor(s % 3600 / 60)); X.textContent = z(s % 60);
  }
  tick(); setInterval(tick, 1000);
})();

/* Button-Ring: einmal abspielen, sobald der Button im Bild ist */
(function () {
  var btns = [].slice.call(document.querySelectorAll('.super, .btn-weiss'));
  if (!('IntersectionObserver' in window)) { btns.forEach(function (b) { b.classList.add('ring-los'); }); return; }
  var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('ring-los'); io.unobserve(e.target); } }); }, { threshold: 0.6 });
  btns.forEach(function (b) { io.observe(b); });
})();
