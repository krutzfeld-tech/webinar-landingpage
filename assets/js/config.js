// Konfiguration der Webinar-Landingpage. Nur hier ändern, nicht im HTML.
window.LP = {
  event: {
    name: 'Live-Webinar',
    titel: 'In 7 Tagen klickst Du Dich durch Deine App-Idee',
    startISO: '2026-12-02T11:00:00+01:00',   // Quelle: AddEvent (Europe/Zurich)
    endeISO:  '2026-12-02T12:00:00+01:00',   // OFFEN: AddEvent blockt 11 bis 13 Uhr, Storyline rechnet mit 60 Minuten
    datumKurz: 'Mi, 2. Dez. 2026',
    datumLang: 'Mittwoch, 2. Dezember 2026',
    zeitText: '11:00\u00a0Uhr',
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
      dach: 'Webinar für Unternehmer mit Angeboten auf dem Tisch',
      frage: 'Woran erkennst Du, welchem der 3 Angebote auf Deinem Tisch Du glauben kannst?',
      einstieg: 'Drei Entwickler, drei Vorstellungen von Deiner Idee. Deshalb liegen die Preise so weit auseinander. Und gesehen hat die App noch keiner, auch Du nicht.',
      schmerz: 'Also entscheidest Du nach Bauchgefühl. Oder nach dem Preis.',
      fuerwen: '… Du Angebote für Deine App vorliegen hast und keines davon beurteilen kannst.'
    },
    ki: {
      dach: 'Webinar für Unternehmer, die selbst mit KI gebaut haben',
      frage: 'Deine KI-App läuft zu 80 Prozent. Wer baut die letzten 20?',
      einstieg: 'Mit KI kommst Du schnell weit. Dann hakt es bei Login, Daten oder Zahlung. Und keiner weiß, was im Code wirklich steckt.',
      schmerz: 'Also holst Du Angebote für den Rest ein. Vergleichen kannst Du keines.',
      fuerwen: '… Du schon selbst mit KI gebaut hast und wissen willst, was aus diesem Stand wird.'
    },
    gebrannt: {
      dach: 'Webinar für Unternehmer, die schon einmal Lehrgeld gezahlt haben',
      frage: 'Würdest Du dem nächsten Entwickler wieder vorab zahlen, bevor Du etwas gesehen hast?',
      einstieg: 'Beim letzten Mal gab es Konzepte, Termine und Rechnungen. Eine App, die läuft, gab es nicht.',
      schmerz: 'Jetzt liegen neue Angebote auf dem Tisch. Und wieder sollst Du vorab zahlen.',
      fuerwen: '… Du schon einmal für eine App gezahlt hast, die nie fertig wurde.'
    },
    idee: {}
  }
};
