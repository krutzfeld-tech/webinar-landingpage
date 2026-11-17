// Konfiguration der Webinar-Landingpage. Nur hier ändern, nicht im HTML.
window.LP = {
  event: {
    name: 'Live-Webinar',
    titel: 'In 7 Tagen klickst Du Dich durch Deine App-Idee',
    startISO: '2026-12-02T11:00:00+01:00',   // Quelle: AddEvent (Europe/Zurich)
    endeISO:  '2026-12-02T13:00:00+01:00',   // Termin wie in WebinarJam und AddEvent: 11 bis 13 Uhr (Fahrplan v07). Der Vortrag dauert 60 Minuten, danach Fragen.
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
  // Hostnamen, auf denen Anmeldungen echt sind. Überall sonst Vorschau (rotes Banner, nichts wird gespeichert),
  // also auch auf der Render-Adresse und lokal.
  liveHosts: ['testen-statt-bauen.de', 'www.testen-statt-bauen.de'],
  anmeldung: {
    // 'direkt': kein eigenes Formular. Die Knöpfe führen zur WebinarJam-Anmeldeseite, dort trägt sich der Besucher einmal ein.
    //           WebinarJam gibt die Anmeldung an ActiveCampaign weiter (Tag webinar-2026-12-02-registered), von dort kommen
    //           Bestätigung und Erinnerungen. Das ist der Weg aus Julias Fahrplan (v07).
    // 'weiterleitung': eigenes Formular, danach zur WebinarJam-Anmeldeseite. Nicht verwenden: WebinarJam übernimmt Vorname
    //           und E-Mail nicht, der Besucher müsste alles noch einmal eintippen (geprüft 17.11.2026).
    // 'endpunkt': eigenes Formular, POST als JSON an anmeldeEndpunkt, danach danke.html
    modus: 'direkt',
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
