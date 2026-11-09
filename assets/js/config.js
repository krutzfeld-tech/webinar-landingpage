// Konfiguration der Webinar-Landingpage. Nur hier ändern, nicht im HTML.
window.LP = {
  event: {
    name: 'Live-Webinar',
    titel: 'In 7 Tagen klickst Du Dich durch Deine eigene App',
    startISO: '2026-12-02T11:00:00+01:00',   // Quelle: AddEvent (Europe/Zurich)
    endeISO:  '2026-12-02T12:00:00+01:00',   // OFFEN: AddEvent blockt 11 bis 13 Uhr, Storyline rechnet mit 60 Minuten
    datumKurz: 'Mi, 2. Dez. 2026',
    datumLang: 'Mittwoch, 2. Dezember 2026',
    zeitText: '11:00 Uhr',
    dauerText: '60 Minuten plus Fragen',
    zeitzone: 'Europe/Zurich'
  },
  links: {
    webinarjamAnmeldung: 'https://event.webinarjam.com/llorqy/register/4o867mug',
    kalenderAddEvent: 'https://www.addevent.com/event/fz10n2fcph1r',
    erstgespraech: 'https://testen-statt-bauen.de/call'
  },
  // Hostnamen, auf denen Anmeldungen echt sind. Leer = überall Vorschau (rotes Banner, nichts wird gespeichert).
  liveHosts: [],
  anmeldung: {
    // 'weiterleitung': nach dem Absenden zur WebinarJam-Anmeldeseite (Vorname und E-Mail als Parameter mitgegeben)
    // 'endpunkt': POST als JSON an anmeldeEndpunkt, danach danke.html
    modus: 'weiterleitung',
    anmeldeEndpunkt: ''
  },
  // Texte je Zielgruppe (Schlüssel = data-zgt im HTML). Fehlt ein Schlüssel, bleibt der Standardtext stehen.
  zielgruppen: {
    angebote: {
      dach: 'Live-Webinar für Unternehmer mit Angeboten auf dem Tisch',
      frage: 'Woran erkennst Du, welchem der drei Preise Du glauben kannst?',
      schmerz: 'Drei Angebote, drei Preise. Und vergleichen kannst Du keinen davon.',
      fuerwen: '… Du Angebote für Deine App vorliegen hast und keines davon beurteilen kannst.'
    },
    ki: {
      dach: 'Live-Webinar für Unternehmer, die selbst mit KI gebaut haben',
      frage: 'Würdest Du Dein Geschäft auf einer App laufen lassen, bei der keiner weiß, was in den letzten 20 Prozent steckt?',
      schmerz: 'Du baust selbst mit KI. Bis 80 Prozent läuft es. Dann hört es einfach auf.',
      fuerwen: '… Du schon selbst mit KI gebaut hast und wissen willst, was aus diesem Stand wird.'
    },
    gebrannt: {
      dach: 'Live-Webinar für Unternehmer, die schon einmal Lehrgeld gezahlt haben',
      frage: 'Würdest Du dem nächsten Entwickler wieder vorab zahlen, bevor Du etwas gesehen hast?',
      schmerz: 'Die letzten Entwickler haben rumgeeiert. Das Geld ist weg, die App nicht fertig.',
      fuerwen: '… Du schon einmal für eine App gezahlt hast, die nie fertig wurde.'
    },
    idee: {}
  }
};
