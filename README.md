# Webinar-Landingpage „Testen statt bauen“

Anmeldeseite für das Live-Webinar **„In 7 Tagen klickst Du Dich durch Deine App-Idee. Ohne vorab 5-stellig zu investieren.“**
Mittwoch, 2. Dezember 2026, 11:00 Uhr (Europe/Zurich), Gastgeber Martin Krutzfeld.

Stand: **Fassung vom 13.11.2026** (aus `krutzfeld-webinar-lp.zip` übernommen, siehe unten), Erstentwurf vom 09.11.2026 nach dem Just-Close-Skill `webinar-landingpage` (Karte https://trello.com/c/dexwOimv).
Reine statische Seite: kein Build, kein Framework, keine Aufrufe an fremde Server. Schrift und die Animationsbibliothek GSAP 3.12.5 liegen lokal.

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Die Seite: Kopfzeile, Hero mit Animation, Kundenleiste, Problem, Denkfehler (Leiter), Schritte, Beweis, Inhalte, Ticket mit Countdown, Für wen, Gastgeber, Referenzen, Warum live, FAQ, Schluss, Insel unten, Popup |
| `danke.html` + `assets/js/danke.js` | Danke-Seite: Vorname, Kalender (Google, ICS, AddEvent), Frage vorab, Erstgespräch |
| `assets/js/config.js` | Termin, Links, Live-Hosts, Anmelde-Modus, Texte je Zielgruppe. **Nur hier ändern.** |
| `assets/js/app.js` | Zielgruppen-Weiche, Anmelde-Popup, Exit-Intent, Reveal-Animationen, Leiter-Pfeil, Zähler, Insel unten, Countdown |
| `assets/js/film.js` + `assets/js/vendor/gsap-3.12.5.min.js` | Hero-Animation (Idee, Prototyp in 7 Tagen, Durchklicken, App, Garantie). GSAP ist die unveränderte Datei von cdnjs (SHA-256 geprüft am 13.11.2026). |
| `assets/css/style.css` | Stil aus dem Webinar-Deck (dunkel, Cyan `#67e8f9`, Inter). Korrekturen nach der Übernahme stehen als eigener Block am Dateiende. |
| `assets/video/`, `video/` | Teaser-Video vom 09.11.2026 samt Bauskript. Seit der Fassung vom 13.11.2026 auf der Seite nicht mehr eingebunden. |
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

Seit der Fassung vom 13.11.2026 heißt die Seite „In 7 Tagen klickst Du Dich durch Deine **App-Idee**“ (Hero, Ticket, Popup, Kalendereintrag der Danke-Seite über `LP.event.titel`). Die WebinarJam-Anmeldeseite heißt weiterhin „In 7 Tagen klickst du dich durch deine **eigene App**“ (geprüft am 13.11.2026). Bis zum Livegang angleichen, damit Seite, Anmeldesystem und Kalender dasselbe sagen.

## Termin ändern

`assets/js/config.js` reicht nicht mehr allein. Fest im Code stehen zusätzlich: das Ticket in `index.html` (Datumskachel „Mi 02 Dez 2026“, „11:00 Uhr“, „60 Min.“, `data-countdown="2026-12-02T11:00:00+01:00"`), die Insel unten in `index.html` („Live · Mi, 2. Dez., 11 Uhr“, „60 Minuten plus Fragen“) und die Tageszählung der Insel in `assets/js/app.js` (`2026-12-02`, „um 11 Uhr“).

## Fassung vom 13.11.2026

Martin hat die überarbeitete Seite als `krutzfeld-webinar-lp.zip` geliefert; sie ist unverändert übernommen (Commit „Neue Fassung der Anmeldeseite …“). Neu gegenüber dem 09.11.2026: Hero mit Animation statt Video, Kundenleiste, Problemkette mit vier animierten Karten, Kennzahlen und Zitat im Praxisfall, Ticket mit Countdown, Foto von Martin, Insel unten, Exit-Popup mit eigenem Text.

Nicht übernommen:
- `vercel.json`, `.vercelignore`: Das Hosting bleibt Render (`render.yaml`).
- `assets/img/gotcha-1.webp`: auf der Seite nirgends eingebunden. Das Bild zeigt das Profil aus der alten Gotcha-App mit Martins Telefonnummer, Mail-Adresse und Anschrift. Repo und Seite sind öffentlich, deshalb bleibt es draußen.

Nach der Übernahme korrigiert (eigener Commit, eigener Block am Ende von `style.css`):
- Das Anführungszeichen im Praxis-Zitat lag über der ersten Zitatzeile.
- Die Seite war auf Handys bis 400 px Breite und auf Tablets (768 bis 1023 px) breiter als der Bildschirm. Ursache: die getippte Notizzeile in „Warum live“ und drei Spalten ab 768 px. Jetzt stehen „Schritte“ und „Inhalte“ bis 1023 px, „Warum live“ bis 1099 px einspaltig. Ab 1100 px ist nichts verändert.

Geprüft am 13.11.2026 lokal mit Chrome (Playwright) bei 360 bis 1920 px: keine Konsolenfehler, keine Ladefehler, keine Fremdaufrufe, kein seitlicher Überlauf; Weiche, Popup, Exit-Popup, Pflichtfeld-Prüfung und Danke-Seite laufen. Bei 320 und 344 px Breite wird die Notizzeile rechts abgeschnitten.

Cache: Render liefert `/assets/*` ein Jahr lang als unveränderlich aus (`render.yaml`). CSS und JS tragen deshalb `?v=<Zeitstempel>` in `index.html` und `danke.html`; nach jeder Änderung an diesen Dateien den Wert erhöhen. Ein Bild, das unter gleichem Namen ersetzt wird, sehen frühere Besucher weiter in der alten Fassung, also neuen Dateinamen vergeben.

## Offene Punkte (nichts davon ist erfunden, alles wartet auf Entscheidung oder Material)

1. ~~Foto von Martin~~ erledigt mit der Fassung vom 13.11.2026 (`assets/img/martin.webp`, `martin-avatar.webp`).
2. **Dauer**: AddEvent blockt 11 bis 13 Uhr, die Storyline rechnet mit 60 Minuten. Seite sagt „60 Minuten plus Fragen“.
3. **Praxis-Beweis**: anonymisiert als „Fitness-Studio mit 2 Standorten“, Unterzeile „Beckenboden-Training in der Schweiz“ (PelviVibes). Zitat und Zahlen stammen aus Gespräch 18.06.2026 und der Kundendatenbank (Stand 27.10.2026). Name, Logo und Zitat mit Namen erst nach Freigabe der Inhaberin.
4. **Referenzen**: übernommen von krutzfeld.tech (Christina Mendel, Dr. André Plass, Holling Services). Keine Zitate, nur Beschreibungen, wie dort.
5. **Live-Bonus**: der Skill empfiehlt eine Vorlage nur für Live-Teilnehmer. Nichts Entschiedenes vorhanden, deshalb steht dort „Frage live beantwortet“ und der Automatisierungs-Check zur Buchung des Erstgesprächs (Deck Folie 176). Verlosung: keine.
6. **Aufzeichnung**: WebinarJam-Replay-Link existiert noch nicht. Seit der Fassung vom 13.11.2026 sagt die Seite nichts mehr zur Aufzeichnung.
7. **VIP-Schritt per SMS** aus dem Skill ist weggelassen (kein SMS-System). Danke-Seite hat stattdessen Kalender, Frage vorab und Erstgespräch.
8. **Impressum/Datenschutz** verlinken auf krutzfeld.tech. Datenschutzerklärung dort um WebinarJam ergänzen, bevor die Seite live geht.
9. **Domain**: Vorschlag `webinar.krutzfeld.tech` oder `testen-statt-bauen.de` (heute IONOS-Weiterleitung auf krutzfeld.tech/call).

## UX-Iterationen 09.11.2026 (abgelöst durch die Fassung vom 13.11.2026)

1. **Breite und Raster:** Inhalt bis 1280 px, Hero 7/5 mit Bühne (Handy plus schwebende Karten), Beweis-Kopf zweispaltig mit Kundenkarte, Ticket, FAQ und „Für wen“ auf volle Breite, Gastgeber ausgewogen.
2. **Hierarchie und Lesefluss:** Sektionsköpfe bei Rastern zentriert, CTA als Zeile (Button plus Mikrozeile), Fakten in die Gastgeberkarte, kürzerer Hero-Lead, Sticky-CTA auf dem Handy, Verbinder in der Problemkette.
3. **Feinschliff:** Handy-Mock mit echtem Inhalt (Anfrage, Schritt 2 von 3), Icons in Inhalte- und Live-Karten, Hover- und Druckzustände, Topbar-Schatten, kompaktere Abstände auf dem Handy, Footer-Logo, Leiter-Etikett und Pfeil auf schmalen Bildschirmen.

Screenshots je Iteration: `qa/iter0` (vorher) bis `qa/iter3`.

## Deploy

Render Static Site `webinar-landingpage` (https://webinar-landingpage-hwlt.onrender.com, Dienst srv-dbonuuijnfac73fgs4s0). **Seit dem 10.11.2026 deployt ein Push auf `main` von selbst** (die Render-GitHub-App ist in der Organisation wieder installiert; geprüft am 13.11.2026, Auslöser `new_commit`). Vorher löste ein Push keinen Deploy aus, deshalb wurde das Repo öffentlich geschaltet und der Deploy per API angestoßen.

Kommt nach einem Push kein Deploy, von Hand anstoßen: im Render-Dashboard „Manual Deploy“ oder im Nexus `python3 skills/render-blueprint/deploy-anstossen.py srv-dbonuuijnfac73fgs4s0 --ausfuehren`.

## Prüfen

Lokal: `python3 -m http.server 8081 --bind 127.0.0.1` im Repo-Ordner, dann http://localhost:8081. Mit `?ohne-weiche` öffnet sich die Zielgruppen-Frage nicht. Screenshots 390 px und 1440 px plus Lighthouse liegen im Ordner `qa/` (nicht versioniert).
