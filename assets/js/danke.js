/* Danke-Seite: Vorname, Kalender-Links, Frage vorab, Fortschritt */
(function () {
  'use strict';
  var LP = window.LP || {}, EV = LP.event || {}, L = LP.links || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var sget = function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } };
  var lget = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };
  var lset = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  var istLive = (LP.liveHosts || []).indexOf(location.hostname) !== -1;
  if (!istLive) document.body.classList.add('vorschau-modus');
  $$('[data-ev]').forEach(function (el) { var k = el.getAttribute('data-ev'); if (EV[k]) el.textContent = EV[k]; });

  var vorname = sget('tsb_vorname'), email = sget('tsb_email');
  var vk = $('[data-vorname-komma]'); if (vk && vorname) vk.textContent = ', ' + vorname;
  var eh = $('[data-email-hinweis]'); if (eh && email) eh.textContent = ' an ' + email;

  /* Kalender */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function utc(iso) { var d = new Date(iso); return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + '00Z'; }
  var titel = (EV.name || 'Live-Webinar') + ': ' + (EV.titel || ''), details = 'Zugangslink kommt per E-Mail. Gastgeber: Martin Krutzfeld, Krutzfeld Technologies GmbH.';
  var g = $('[data-kalender=google]');
  if (g) g.href = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' + encodeURIComponent(titel) + '&dates=' + utc(EV.startISO) + '/' + utc(EV.endeISO) + '&details=' + encodeURIComponent(details) + '&ctz=' + encodeURIComponent(EV.zeitzone || 'Europe/Zurich');
  var ics = $('[data-kalender=ics]');
  if (ics) {
    var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Krutzfeld Technologies//Webinar//DE', 'BEGIN:VEVENT', 'UID:webinar-' + utc(EV.startISO) + '@krutzfeld.tech', 'DTSTAMP:' + utc(new Date().toISOString()), 'DTSTART:' + utc(EV.startISO), 'DTEND:' + utc(EV.endeISO), 'SUMMARY:' + titel, 'DESCRIPTION:' + details, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    ics.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(body);
  }
  var ae = $('[data-kalender=addevent]'); if (ae) ae.href = L.kalenderAddEvent || '#';
  var eg = $('[data-link=erstgespraech]'); if (eg) eg.href = L.erstgespraech || '#';

  /* Fortschritt merken */
  function erledigt(name) {
    lset('tsb_danke_' + name, '1');
    var li = $('[data-schritt=' + name + ']'); if (li) { li.classList.add('erledigt'); var s = $('.s', li); if (s) s.innerHTML = '<svg class="i"><use href="#i-haken"/></svg>'; }
    var f = $('[data-f=' + name + ']'); if (f) f.classList.add('voll');
  }
  ['kalender', 'frage', 'gespraech'].forEach(function (n) { if (lget('tsb_danke_' + n) === '1') erledigt(n); });
  $$('[data-kalender]').forEach(function (a) { a.addEventListener('click', function () { erledigt('kalender'); }); });
  if (eg) eg.addEventListener('click', function () { erledigt('gespraech'); });

  /* Frage vorab */
  var ff = $('[data-frage-form]');
  if (ff) ff.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = ff.frage.value.trim(); if (text.length < 5) { ff.frage.focus(); return; }
    var ok = $('[data-frage-ok]', ff);
    var cfg = LP.anmeldung || {};
    var fertig = function () { if (ok) ok.hidden = false; ff.frage.value = ''; erledigt('frage'); };
    if (istLive && cfg.anmeldeEndpunkt) {
      fetch(cfg.anmeldeEndpunkt, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ typ: 'frage', email: email || '', vorname: vorname || '', frage: text }) }).then(fertig).catch(fertig);
    } else fertig();
  });
})();
