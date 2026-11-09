# Webinar-Landingpage „Testen statt bauen“

Anmeldeseite für das Live-Webinar **„In 7 Tagen klickst Du Dich durch Deine eigene App. Ohne vorab 5-stellig zu investieren.“**
Mittwoch, 2. Dezember 2026, 11:00 Uhr (Europe/Zurich), Gastgeber Martin Krutzfeld.

Stand: **Entwurf vom 09.11.2026**, gebaut nach dem Just-Close-Skill `webinar-landingpage` (Karte https://trello.com/c/dexwOimv).
Reine statische Seite: kein Build, kein Framework, keine Drittskripte, Schrift lokal.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die Seite: Topbar, Hero, Problem, Reihenfolge (Leiter), Schritte, Beweis, Inhalte, Ticket, Für wen, Gastgeber, Referenzen, Warum live, FAQ, Schluss, Popup |
| `danke.html` + `assets/js/danke.js` | Danke-Seite: Vorname, Kalender (Google, ICS, AddEvent), Frage vorab, Erstgespräch |
| `assets/js/config.js` | Termin, Links, Live-Hosts, Anmelde-Modus, Texte je Zielgruppe. **Nur hier ändern.** |
| `assets/js/app.js` | Zielgruppen-Weiche, Anmelde-Popup, Exit-Intent, Reveal-Animationen, Leiter-Pfeil |
| `assets/css/style.css` | Stil aus dem Webinar-Deck (dunkel, Cyan `#67e8f9`, Inter) |
| `render.yaml` | Render Static Site (publishPath `.`, kein Build) |

## Vorschau-Modus

Die Seite ist nur auf Hosts aus `LP.liveHosts` „echt“. Überall sonst erscheint das rote Banner „Vorschau: Anmeldungen werden nicht gespeichert“ und das Formular leitet direkt auf `danke.html`. Die Live-Hosts sind derzeit **leer**, also ist auch der Render-Dienst eine Vorschau. Für den Livegang: Hostname eintragen, `noindex` in beiden HTML-Dateien entfernen.

Zielgruppe per URL vorbelegen (für Anzeigen, überspringt die Weiche): `?zg=angebote`, `?zg=ki`, `?zg=gebrannt`, `?zg=idee`. Weiche unterdrücken: `?ohne-weiche`.

## Anmelde-System (offen)

Zwei Wege sind vorbereitet (`LP.anmeldung.modus`):
- `weiterleitung` (aktiv): nach dem Absenden zur WebinarJam-Anmeldeseite https://event.webinarjam.com/llorqy/register/4o867mug, Vorname und E-Mail als Parameter `first_name`, `email`, Zielgruppe als `zg`. Ob WebinarJam die Felder vorbelegt, ist nicht geprüft.
- `endpunkt`: POST als JSON `{vorname, email, zielgruppe, tag, quelle}` an `anmeldeEndpunkt` (zum Beispiel ein nexus-hub-Endpunkt, der WebinarJam per API registriert und Close taggt), danach `danke.html`. Die Danke-Seite schickt die Frage vorab als `{typ:'frage', email, vorname, frage}` an denselben Endpunkt.

Tags fürs CRM: `webinar-zg-angebote`, `webinar-zg-ki`, `webinar-zg-gebrannt`, `webinar-zg-idee`, `webinar-zg-ohne`.

## Headline

Gesetzt ist der von Martin abgenommene Webinar-Titel (Deck Folie 1, WebinarJam, AddEvent), damit Seite, Anmeldesystem und Kalender dasselbe sagen. Zwei Alternativen nach der Skill-Formel „Wunsch zuerst, Methode am Ende“, falls gewünscht:
1. „Wie Du in 7 Tagen Deine App durchklickst und ihren Festpreis kennst, bevor Du einen Entwickler beauftragst.“
2. „Wie Unternehmer ihre App-Idee in 7 Tagen testen, bevor sie 5-stellig investieren. Mit dem 7-Tage-Prototyp.“

## Offene Punkte (nichts davon ist erfunden, alles wartet auf Entscheidung oder Material)

1. **Foto von Martin** fehlt (im Website-Repo gibt es keins); Platzhalter sind Kreise mit „MK“.
2. **Dauer**: AddEvent blockt 11 bis 13 Uhr, die Storyline rechnet mit 60 Minuten. Seite sagt „60 Minuten plus Fragen“.
3. **Praxis-Beweis**: anonymisiert als „Studio mit zwei Standorten“ (PelviVibes). Zitat und Zahlen stammen aus Gespräch 18.06.2026 und der Kundendatenbank (Stand 27.10.2026). Name, Logo und Zitat mit Namen erst nach Freigabe der Inhaberin.
4. **Referenzen**: übernommen von krutzfeld.tech (Christina Mendel, Dr. André Plass, Holling Services). Keine Zitate, nur Beschreibungen, wie dort.
5. **Live-Bonus**: der Skill empfiehlt eine Vorlage nur für Live-Teilnehmer. Nichts Entschiedenes vorhanden, deshalb steht dort „Frage live beantwortet“ und der Automatisierungs-Check zur Buchung des Erstgesprächs (Deck Folie 176). Verlosung: keine.
6. **Aufzeichnung**: WebinarJam-Replay-Link existiert noch nicht. FAQ sagt „nur für Angemeldete“.
7. **VIP-Schritt per SMS** aus dem Skill ist weggelassen (kein SMS-System). Danke-Seite hat stattdessen Kalender, Frage vorab und Erstgespräch.
8. **Impressum/Datenschutz** verlinken auf krutzfeld.tech. Datenschutzerklärung dort um WebinarJam ergänzen, bevor die Seite live geht.
9. **Domain**: Vorschlag `webinar.krutzfeld.tech` oder `testen-statt-bauen.de` (heute IONOS-Weiterleitung auf krutzfeld.tech/call).

## UX-Iterationen 09.11.2026 (lokal, noch nicht deployt)

1. **Breite und Raster:** Inhalt bis 1280 px, Hero 7/5 mit Bühne (Handy plus schwebende Karten), Beweis-Kopf zweispaltig mit Kundenkarte, Ticket, FAQ und „Für wen“ auf volle Breite, Gastgeber ausgewogen.
2. **Hierarchie und Lesefluss:** Sektionsköpfe bei Rastern zentriert, CTA als Zeile (Button plus Mikrozeile), Fakten in die Gastgeberkarte, kürzerer Hero-Lead, Sticky-CTA auf dem Handy, Verbinder in der Problemkette.
3. **Feinschliff:** Handy-Mock mit echtem Inhalt (Anfrage, Schritt 2 von 3), Icons in Inhalte- und Live-Karten, Hover- und Druckzustände, Topbar-Schatten, kompaktere Abstände auf dem Handy, Footer-Logo, Leiter-Etikett und Pfeil auf schmalen Bildschirmen.

Screenshots je Iteration: `qa/iter0` (vorher) bis `qa/iter3`.

## Prüfen

Lokal: `python3 -m http.server 8080` im Repo-Ordner, dann http://localhost:8080. Screenshots 390 px und 1440 px plus Lighthouse liegen im Ordner `qa/` (nicht versioniert).
