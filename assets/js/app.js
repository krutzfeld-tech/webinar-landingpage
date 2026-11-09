/* Webinar-Landingpage: Zielgruppen-Weiche, Anmelde-Popup, Exit-Intent, Animationen, Vorschau-Modus */
(function () {
  'use strict';
  var LP = window.LP || {};
  var EV = LP.event || {};
  var KEY_ZG = 'tsb_zg', KEY_REG = 'tsb_registriert', KEY_EXIT = 'tsb_exit';
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
  var badge = $('[data-pop-badge]'), letzterFokus = null;
  function zeigeSchritt(name) {
    if (schrittWeiche) schrittWeiche.hidden = name !== 'weiche';
    if (schrittForm) schrittForm.hidden = name !== 'formular';
  }
  function oeffnen(opts) {
    opts = opts || {};
    if (!modal) return;
    letzterFokus = document.activeElement;
    var seg = store.get(KEY_ZG);
    if (badge) badge.textContent = opts.badge || 'Kurze Frage vorab';
    zeigeSchritt(seg ? 'formular' : 'weiche');
    modal.hidden = false; modal.classList.add('offen'); document.body.classList.add('popup-offen');
    var f = seg ? $('#anmeldung input[name=vorname]') : $('.kachel', modal);
    if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function schliessen() {
    if (!modal) return;
    modal.classList.remove('offen'); modal.hidden = true; document.body.classList.remove('popup-offen');
    if (letzterFokus && letzterFokus.focus) letzterFokus.focus();
  }
  $$('[data-anmelden]').forEach(function (b) { b.addEventListener('click', function () { oeffnen({ badge: 'Kurze Frage vorab' }); }); });
  $$('[data-schliessen]').forEach(function (b) { b.addEventListener('click', schliessen); });
  if (modal) modal.addEventListener('click', function (e) { if (e.target === modal) schliessen(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && !modal.hidden) schliessen(); });

  /* Weiche: Kachel wählen */
  $$('.kachel').forEach(function (k) {
    k.addEventListener('click', function () {
      var seg = k.getAttribute('data-zg');
      store.set(KEY_ZG, seg); personalisieren(seg);
      $$('.kachel').forEach(function (x) { x.classList.toggle('aktiv', x === k); });
      zeigeSchritt('formular');
      var f = $('#anmeldung input[name=vorname]'); if (f) setTimeout(function () { f.focus(); }, 50);
    });
  });

  /* Weiche beim ersten Besuch (nicht für Angemeldete, nicht bei ?zg=) */
  var registriert = store.get(KEY_REG) === '1';
  if (!zg && !registriert && !params.has('zg') && !params.has('ohne-weiche')) {
    setTimeout(function () { oeffnen({ badge: 'Kurze Frage vorab' }); }, 900);
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
    var btn = $('button[type=submit]', form); if (btn) { btn.disabled = true; btn.firstChild.textContent = 'Einen Moment …'; }
    if (!istLive) { store.set(KEY_REG, '1'); location.href = 'danke.html?vorschau=1'; return; }
    var cfg = LP.anmeldung || {};
    if (cfg.modus === 'endpunkt' && cfg.anmeldeEndpunkt) {
      fetch(cfg.anmeldeEndpunkt, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorname: vorname, email: email, zielgruppe: seg, tag: 'webinar-zg-' + (seg || 'ohne'), quelle: location.href }) })
        .then(function () { store.set(KEY_REG, '1'); location.href = 'danke.html'; })
        .catch(function () { if (fehler) { fehler.textContent = 'Das hat nicht geklappt. Bitte versuch es noch einmal.'; fehler.classList.add('zeigen'); } if (btn) { btn.disabled = false; btn.firstChild.textContent = 'Platz sichern'; } });
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
    if (!store.get(KEY_ZG)) return;
    if (modal && !modal.hidden) return;
    store.set(KEY_EXIT, '1', true);
    oeffnen({ badge: 'Kurze Frage, bevor Du gehst' });
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
    var x = 17; // Mitte der Stufen-Kästchen (18px Innenabstand + 17px halbe Breite)
    var x1 = ar.left - lr.left + 18 + x, y1 = ar.top - lr.top + ar.height;
    var x2 = zr.left - lr.left + 18 + x, y2 = zr.top - lr.top - 4;
    var bog = Math.min(Math.max(60, (y2 - y1) * 0.35), Math.max(12, x1 - 8));
    var cx = x1 - bog;
    svg.setAttribute('viewBox', '0 0 ' + lr.width + ' ' + lr.height);
    $('path', svg).setAttribute('d', 'M ' + x1 + ' ' + y1 + ' C ' + cx + ' ' + (y1 + 40) + ', ' + cx + ' ' + (y2 - 40) + ', ' + x2 + ' ' + y2);
    $('.spitze', svg).setAttribute('points', (x2 - 7) + ',' + (y2 - 12) + ' ' + (x2 + 7) + ',' + (y2 - 12) + ' ' + x2 + ',' + (y2 + 1));
    if (lbl) { lbl.style.top = ((y1 + y2) / 2 - 14) + 'px'; }
  }
  pfeilZeichnen();
  window.addEventListener('resize', pfeilZeichnen);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pfeilZeichnen);
  window.addEventListener('load', pfeilZeichnen);
})();
