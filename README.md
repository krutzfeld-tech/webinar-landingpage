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
| `assets/js/film.js` + `assets/js/vendor/gsap-3.12.5.min.js` | Hero-Animation (Idee, Prototyp in 7 Tagen, Durchklicken, App, Garantie), seit 17.11.2026 mit Inhalt und Bildschirmen aus dem Gotcha-Prototyp. GSAP ist die unveränderte Datei von cdnjs (SHA-256 geprüft am 13.11.2026). |
| `assets/css/style.css` | Stil aus dem Webinar-Deck (dunkel, Cyan `#67e8f9`, Inter). Korrekturen nach der Übernahme stehen als eigener Block am Dateiende. |
| `assets/video/`, `video/` | Teaser-Video vom 09.11.2026 samt Bauskript. Seit der Fassung vom 13.11.2026 auf der Seite nicht mehr eingebunden. |
| `render.yaml` | Render Static Site (publishPath `.`, kein Build) |

## Vorschau-Modus

Die Seite ist nur auf Hosts aus `LP.liveHosts` „echt“. Überall sonst erscheint das rote Banner „Vorschau: Anmeldungen werden nicht gespeichert“ und das Formular leitet direkt auf `danke.html`.

**Seit dem 17.11.2026 live auf `testen-statt-bauen.de`** (und `www`): kein Banner, die Knöpfe führen zur Anmeldung bei WebinarJam (Abschnitt „Live seit 17.11.2026“). Die Render-Adresse `webinar-landingpage-hwlt.onrender.com` und der lokale Server bleiben Vorschau. `noindex` und `robots.txt` sperren Suchmaschinen weiterhin; die Seite ist für Einladungen per Mail gedacht.

Zielgruppe per URL vorbelegen (für Anzeigen, überspringt die Weiche): `?zg=angebote`, `?zg=ki`, `?zg=gebrannt`, `?zg=idee`. Weiche unterdrücken: `?ohne-weiche`.

## Live seit 17.11.2026: Anmeldung über WebinarJam (Modus `direkt`)

Martin am 17.11.2026: „Wie kriegen wir den Vorschaumodus weg?“, dazu Julias „Fahrplan Webinar-Technik“ von Just Close (Entwurf v07).

Der Fahrplan legt den Anmeldeweg fest: Anmeldung im WebinarJam-Formular (Vorname, Nachname, E-Mail) → WebinarJam setzt in ActiveCampaign den Tag `webinar-2026-12-02-registered` → ActiveCampaign schickt Bestätigung (mit Zugangslink und Kalenderlink), Erinnerungen am Vortag, eine Stunde vorher und um 10:45 Uhr. Die Mails von WebinarJam selbst sind ausgeschaltet.

Die Seite hängt sich davor (`LP.anmeldung.modus: 'direkt'`): Jeder Knopf „Jetzt meinen Platz sichern“ führt auf https://event.webinarjam.com/llorqy/register/4o867mug. Ein eigenes Formular gibt es im Live-Betrieb nicht, also keine doppelte Eingabe. Die Zielgruppen-Frage beim ersten Besuch bleibt (sie passt nur Texte an), das Exit-Popup zeigt Termin und Knopf ohne Felder. `danke.html` wird im Live-Betrieb nicht erreicht; die Danke-Seite mit Kalender-Knopf liegt bei WebinarJam.

Voraussetzungen außerhalb dieser Seite (Fahrplan, Stand v07):
- Schritt 29, Automationen in ActiveCampaign aktivieren: Bis dahin bekommt ein Angemeldeter keine Bestätigung.
- Schritt 32, Testanmeldung mit drei Postfächern: über `https://testen-statt-bauen.de`, vor der ersten Einladung.
- WebinarJam-Anmeldeseite und AddEvent an die Seite angleichen (Titel, Dauer, Praxisbeispiel, Foto), siehe „Einheitliche Angaben“.

Verloren geht in diesem Modus die Zielgruppe für das CRM (Tags `webinar-zg-…`); die gäbe es nur mit dem Modus `endpunkt`.

## Einheitliche Angaben (Stand 17.11.2026)

| Angabe | gilt | Seite | WebinarJam-Anmeldeseite | AddEvent | Deck |
|---|---|---|---|---|---|
| Titel | „In 7 Tagen klickst Du Dich durch Deine App-Idee“ | stimmt | „… deine eigene App!“, offen | „… deine eigene App“, offen | angepasst am 17.11.2026 |
| Termin | Mi, 02.12.2026, 11 bis 13 Uhr (Fahrplan) | 11:00 Uhr, Kalendereintrag 11 bis 13 Uhr | stimmt | stimmt | |
| Dauer | 60 Minuten Vortrag, danach Fragen (Storyline: 60 Minuten) | „60 Min. plus Fragen“ | „in den 90 Minuten“, offen | | |
| Praxisbeispiel | PelviVibes, Studio für Beckenbodentraining, ohne Zahlen | stimmt | „Hebammen-Praxis mit zwei Standorten“, offen | | Folie 55 ohne Kundenzahl seit 17.11.2026 |
| Buchungslink | `testen-statt-bauen.de/call` → Calendly | stimmt | | | stimmt |
| Aufzeichnung | nirgends ankündigen (Fahrplan Schritt 9) | stimmt | | | |

„Offen“ heißt: nur im jeweiligen Konto zu ändern; in Martins Chrome waren WebinarJam und AddEvent am 17.11.2026 nicht angemeldet.

## Anmelde-System (Stand vor dem 17.11.2026, überholt durch den Abschnitt oben)

Zwei Wege sind vorbereitet (`LP.anmeldung.modus`):
- `weiterleitung` (aktiv): nach dem Absenden zur WebinarJam-Anmeldeseite https://event.webinarjam.com/llorqy/register/4o867mug, Vorname und E-Mail als Parameter `first_name`, `email`, Zielgruppe als `zg`. **Geprüft am 17.11.2026: WebinarJam belegt die Felder nicht vor**, siehe „Prüfung 17.11.2026“.
- `endpunkt`: POST als JSON `{vorname, email, zielgruppe, tag, quelle}` an `anmeldeEndpunkt` (zum Beispiel ein nexus-hub-Endpunkt, der WebinarJam per API registriert und Close taggt), danach `danke.html`. Die Danke-Seite schickt die Frage vorab als `{typ:'frage', email, vorname, frage}` an denselben Endpunkt.

Tags fürs CRM: `webinar-zg-angebote`, `webinar-zg-ki`, `webinar-zg-gebrannt`, `webinar-zg-idee`, `webinar-zg-ohne`.

### Prüfung 17.11.2026: Für echte Anmeldungen noch nicht eingerichtet

Die Seite selbst läuft (live gleich Repo, keine Fehler, alle Links erreichbar). Der Anmeldeweg trägt noch nicht:

1. **Vorschau-Modus:** `LP.liveHosts` ist leer. Jede Anmeldung endet auf `danke.html?vorschau=1`, gespeichert oder weitergegeben wird nichts.
2. **Modus `weiterleitung` taugt so nicht:** Mit gesetztem Live-Host (im Browser simuliert) leitet das Formular auf `https://event.webinarjam.com/llorqy/register/4o867mug?first_name=…&email=…&zg=…`. WebinarJam wertet die Parameter nicht aus: Der Besucher sieht eine zweite Anmeldeseite, muss „REGISTRIEREN“ klicken und Vorname, Nachname (dort Pflichtfeld) und E-Mail noch einmal eintippen. Unsere `danke.html` (Kalender, Frage vorab, Erstgespräch) erreicht er nie.
3. **Frage vorab:** Ohne `anmeldeEndpunkt` bestätigt die Danke-Seite die Frage, verwirft sie aber.
4. **WebinarJam-Seite weicht ab:** Titel „… deine eigene App!“, „Was erwartet Dich in den 90 Minuten?“ (hier: 60 Minuten plus Fragen; AddEvent: 11 bis 13 Uhr), Praxisbeispiel „Hebammen-Praxis mit zwei Standorten“ (hier: Fitness-Studio, Beckenboden-Training), Gastgeber ohne Foto.
5. **Datenschutzerklärung** auf krutzfeld.tech nennt weder WebinarJam noch Calendly (das Erstgespräch `testen-statt-bauen.de/call` führt auf Calendly).
6. **Messung:** Die Seite hat keine Statistik und kein Pixel. Anmeldungen je Anzeige oder Zielgruppe lassen sich nur über den Endpunkt (Tag `webinar-zg-…`) zählen.
7. Vorschaubild für geteilte Links (`og:image`) fehlt; Adresse ist die Render-Adresse, `noindex` und `robots.txt` sperren Suchmaschinen.

Wege zu einer Anmeldung ohne Doppeleingabe (Quelle: WebinarJam-Dokumentation, nicht am Konto geprüft):
- **Endpunkt (dafür ist der Modus `endpunkt` gebaut):** Ein eigener Server-Endpunkt nimmt `{vorname, email, zielgruppe, tag, quelle}` an und meldet über `POST https://api.webinarjam.com/webinarjam/register` an (`api_key`, `webinar_id`, `first_name`, `email`, `schedule`). Der API-Schlüssel darf nicht in die Seite. Danach `danke.html`, dieselbe Adresse nimmt die Frage vorab.
- **One-Click-Link:** WebinarJam erzeugt ihn im Webinar unter „Advanced“ (`https://event.webinarjam.com/register/1click/…?first_name=…&email=…&schedule_id=…`). Laut WebinarJam für Mails an bestehende Kontakte gedacht; jedes Pflichtfeld des Webinars braucht einen Parameter (Nachname). Eine eigene Bestätigungsseite bekommt die Daten als `wj_lead_…`-Parameter.

## Headline

Seit der Fassung vom 13.11.2026 heißt die Seite „In 7 Tagen klickst Du Dich durch Deine **App-Idee**“ (Hero, Ticket, Popup, Kalendereintrag der Danke-Seite über `LP.event.titel`). Die WebinarJam-Anmeldeseite heißt weiterhin „In 7 Tagen klickst du dich durch deine **eigene App**“ (geprüft am 13.11.2026). Bis zum Livegang angleichen, damit Seite, Anmeldesystem und Kalender dasselbe sagen.

## Termin ändern

`assets/js/config.js` reicht nicht mehr allein. Fest im Code stehen zusätzlich: das Ticket in `index.html` (Datumskachel „Mi 02 Dez 2026“, „11:00 Uhr“, „60 Min.“, `data-countdown="2026-12-02T11:00:00+01:00"`), die Insel unten in `index.html` („Live · Mi, 2. Dez., 11 Uhr“, „60 Minuten plus Fragen“) und die Tageszählung der Insel in `assets/js/app.js` (`2026-12-02`, „um 11 Uhr“).

## Gotcha statt Holling (17.11.2026)

Martin: „Ersetze Holger Holling komplett mit Gotcha, füge unten noch pelvi-vibes hinzu. Auch das Hero Video sollte dem Design Overhaul von Gotcha entsprechen.“

Geändert:
- **Kundenleiste:** „Holling Services“ entfernt (Max & Molly stand schon dort).
- **Schritte:** Die zwei Telefone zeigen die Startseite und „Nachbarn alarmieren“ aus dem Gotcha-Prototyp (`assets/img/gotcha-start.webp`, `gotcha-alarm.webp`), Herkunftssatz angepasst.
- **Aus der Praxis:** Der zweite Fall ist Max & Molly statt Holling.
- **Gastgeber:** „Apps für Max & Molly (Gotcha Pet) und PelviVibes“.
- **Referenzen:** Karte Max & Molly ersetzt Holger Holling, Karte PelviVibes kommt dazu; vier Karten (eine Spalte auf dem Handy, zwei ab 640 px, vier ab 1100 px).
- **Hero-Film (zweite Fassung nach Martins Rückmeldung „der Text der Herostory passt nicht, für Gotcha bitte etwas Passendes und mehrere der neuen Designs“):** Der Film erzählt jetzt die Geschichte von Gotcha. Idee: QR-Code am Halsband, Finder scannt und ruft an, Nachbarn helfen suchen. Sieben Mitteilungen von Tag 1 bis Tag 7. Danach ein Klickweg durch sechs Bildschirme des neuen Designs: Start, Bruno, „Wo war Bruno zuletzt?“, „Nachbarn alarmieren“, „Bruno wird gesucht“, „Willkommen zurück, Bruno.“ (`gotcha-start`, `-tier`, `-suche`, `-alarm`, `-suchmodus`, `-gefunden`). Der Anhänger heißt im Film „QR-Code“, weil „Tag“ dort der Kalendertag ist. Texte, Bildschirme und Klickstellen stehen oben in `assets/js/film.js` (`IDEE`, `NOTE`, `FUNK`, `SCREENS`, `KLICK`). Das Telefon im Film ist 16 px schmaler (Seitenverhältnis der neuen Bildschirme). Mitbehoben: Der Klick-Ring im Film blinkte durchgehend, weil die Animation des Rings aus Schritt 2 auch für ihn galt.
- Die Holling-Bilder sind gelöscht.

Quellen, nichts erfunden:
- Wortlaut „Gotcha, die App von Max & Molly“, „Hersteller smarter Hundehalsbänder“, „Studio für Beckenbodentraining“, „2 Standorte, eigene App. Erst durchgeklickt, dann gebaut.“: Webinar-Deck, Folien 55 und 169 (dort zusätzlich „Heute 160 Kunden“, auf der Seite weggelassen).
- „Mit der App Gotcha finden verlorene Haustiere nach Hause. Beratung und Weiterentwicklung der App.“: nach dem Text zu Gotcha auf krutzfeld.tech. Link https://gotchapet.com wie dort.
- Gotcha-Logo: `public/assets/logos-cases/gotcha.png` aus dem Repo der Website krutzfeld.tech (beschnitten). PelviVibes-Zeichen: `favicon.svg` von https://www.pelvi-vibes.ch.
- Bildschirme: `r-heute-1`, `r-tier`, `ab-suche-1`, `ab-suche-2`, `r-suchmodus`, `r-gefunden` aus `krutzfeld-technologies-nexus/projekte/gotcha/spezifikationen/2026-11-16-alle-ablaeufe/screens/` (Prototyp-Stand 16.11.2026).
- Die sieben Mitteilungen im Film zeigen einen Prototyp in 7 Tagen als Beispiel. Ihre Inhalte gibt es im Gotcha-Prototyp wirklich (Startseite, Hund anmelden in drei Schritten, je Bildschirm eine Frage, Finder-Seite, Einstieg über den QR-Code, Alarm an die Nachbarn); die Zuordnung zu einzelnen Tagen ist Darstellung. Der Prototyp selbst entstand vom 10.11. bis 16.11.2026.
- Nicht übernommen: die Zahl „7.000 neue Nutzer im Monat, vorher 10“ aus dem Deck. Sie steht in keiner Gotcha-Quelle und wäre eine Geschäftszahl des Kunden.

**Von Martin am 17.11.2026 entschieden** (Antwort im Chat: „1) Egal, 2) Ja, Isabelle hat das freigegeben, nur keine Zahlen explizit nennen“), danach veröffentlicht:
1. Die Bildschirme zeigen Fotos, Muster und Logos von Max & Molly und einen Entwurf, den der Kunde noch nicht freigegeben hat. Das Prototyp-Repo sagt dazu: „Sie gehören Max & Molly und dienen hier nur der Vorführung gegenüber Max & Molly. Nicht öffentlich ablegen.“ Dieses Repo und die Seite sind öffentlich. Die Referenzfreigabe von Max & Molly ist im Nexus als offen vermerkt.
2. Über den Referenzen steht „Gerne stelle ich ein Gespräch her“. Das gilt damit auch für Max & Molly und PelviVibes.
3. PelviVibes steht mit Namen in Gastgeber, Referenzen und im Fall „Aus der Praxis“; Zahlen von PelviVibes stehen nicht auf der Seite (offener Punkt 3 unten).

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
3. ~~Praxis-Beweis anonym~~ erledigt am 17.11.2026: Isabelle hat die Nennung freigegeben (Martin im Chat: „Isabelle hat das freigegeben, nur keine Zahlen explizit nennen“). Der Fall heißt „So kam PelviVibes in nur 7 Wochen zur eigenen App“, Unterzeile „Studio für Beckenbodentraining mit 2 Standorten in der Schweiz“. Die Kacheln mit 225 Anfragen und 160 Kunden und die Quellenzeile sind entfernt, ebenso „Heute 160 Kunden“ in der Referenzkarte. Geblieben sind „2 Standorte“ (steht auf pelvi-vibes.ch), „7 Wochen“ und „20 Minuten Erstgespräch“ (Angaben zum Projekt, keine Geschäftszahlen von PelviVibes). Das Zitat steht bei „Die Gründerin von PelviVibes“, ohne Personennamen.
4. **Referenzen**: Christina Mendel und Dr. André Plass wie auf krutzfeld.tech; seit 17.11.2026 Max & Molly (Gotcha) statt Holling Services und zusätzlich PelviVibes, siehe „Gotcha statt Holling“. Keine Zitate, nur Beschreibungen.
5. **Live-Bonus**: der Skill empfiehlt eine Vorlage nur für Live-Teilnehmer. Nichts Entschiedenes vorhanden, deshalb steht dort „Frage live beantwortet“ und der Automatisierungs-Check zur Buchung des Erstgesprächs (Deck Folie 176). Verlosung: keine.
6. **Aufzeichnung**: WebinarJam-Replay-Link existiert noch nicht. Seit der Fassung vom 13.11.2026 sagt die Seite nichts mehr zur Aufzeichnung.
7. **VIP-Schritt per SMS** aus dem Skill ist weggelassen (kein SMS-System). Danke-Seite hat stattdessen Kalender, Frage vorab und Erstgespräch.
8. **Impressum/Datenschutz** verlinken auf krutzfeld.tech. Datenschutzerklärung dort um WebinarJam ergänzen, bevor die Seite live geht.
9. **Domain**: entschieden am 17.11.2026, die Seite läuft auf `testen-statt-bauen.de` (Abschnitt „Domain“).

## UX-Iterationen 09.11.2026 (abgelöst durch die Fassung vom 13.11.2026)

1. **Breite und Raster:** Inhalt bis 1280 px, Hero 7/5 mit Bühne (Handy plus schwebende Karten), Beweis-Kopf zweispaltig mit Kundenkarte, Ticket, FAQ und „Für wen“ auf volle Breite, Gastgeber ausgewogen.
2. **Hierarchie und Lesefluss:** Sektionsköpfe bei Rastern zentriert, CTA als Zeile (Button plus Mikrozeile), Fakten in die Gastgeberkarte, kürzerer Hero-Lead, Sticky-CTA auf dem Handy, Verbinder in der Problemkette.
3. **Feinschliff:** Handy-Mock mit echtem Inhalt (Anfrage, Schritt 2 von 3), Icons in Inhalte- und Live-Karten, Hover- und Druckzustände, Topbar-Schatten, kompaktere Abstände auf dem Handy, Footer-Logo, Leiter-Etikett und Pfeil auf schmalen Bildschirmen.

Screenshots je Iteration: `qa/iter0` (vorher) bis `qa/iter3`.

## Domain testen-statt-bauen.de

Martin am 17.11.2026: „Die Seite muss noch auf testen-statt-bauen.de stattfinden.“

Stand bei Render (17.11.2026, per `skills/render-blueprint/domain-anlegen.py` und `routen-setzen.py` im Nexus):
- Custom Domains am Dienst: `testen-statt-bauen.de` (Hauptadresse) und `www.testen-statt-bauen.de` (leitet auf die Hauptadresse). Beide warten auf die DNS-Umstellung.
- Route `/call` leitet auf https://krutzfeld.tech/call (von dort weiter zum Calendly-Termin). Der Buchungslink `testen-statt-bauen.de/call` steht im Deck, auf der Danke-Seite und in `config.js`; bisher trug ihn die Weiterleitung der ganzen Domain bei IONOS.

DNS liegt bei IONOS (Nameserver `ui-dns`), in Martins Konto. Umgestellt am 17.11.2026 um 16:17 Uhr im IONOS-Konto (Auftrag Martin):

| Eintrag | vorher | jetzt |
|---|---|---|
| Weiterleitung der Domain auf krutzfeld.tech | aktiv | von IONOS deaktiviert, als der A-Eintrag geändert wurde |
| A `@` | 217.160.0.179 | 216.24.57.1 |
| AAAA `@` | 2001:8d8:100f:f000::200 | entfernt |
| `www` | A und AAAA auf die IONOS-Weiterleitung | CNAME `webinar-landingpage-hwlt.onrender.com` |
| MX, SPF, DMARC, DKIM (IONOS, WebinarJam/SendGrid, ActiveCampaign), `route` (lemlist) | | unverändert |

Der vollständige Stand vor der Umstellung und der Weg zurück stehen im Nexus: `markt/webinar/dns-testen-statt-bauen-vor-umstellung-2026-11-17.txt`. Render hat beide Domains nach der Umstellung bestätigt (`domain-anlegen.py … --verifizieren`).

Der Vorschau-Modus hängt nicht an der Domain: Solange `LP.liveHosts` leer ist, zeigt auch `testen-statt-bauen.de` das rote Banner und speichert keine Anmeldung (Abschnitt „Prüfung 17.11.2026“).

## Deploy

Render Static Site `webinar-landingpage` (https://webinar-landingpage-hwlt.onrender.com, Dienst srv-dbonuuijnfac73fgs4s0). **Seit dem 10.11.2026 deployt ein Push auf `main` von selbst** (die Render-GitHub-App ist in der Organisation wieder installiert; geprüft am 13.11.2026, Auslöser `new_commit`). Vorher löste ein Push keinen Deploy aus, deshalb wurde das Repo öffentlich geschaltet und der Deploy per API angestoßen.

Kommt nach einem Push kein Deploy, von Hand anstoßen: im Render-Dashboard „Manual Deploy“ oder im Nexus `python3 skills/render-blueprint/deploy-anstossen.py srv-dbonuuijnfac73fgs4s0 --ausfuehren`.

## Prüfen

Lokal: `python3 -m http.server 8081 --bind 127.0.0.1` im Repo-Ordner, dann http://localhost:8081. Mit `?ohne-weiche` öffnet sich die Zielgruppen-Frage nicht. Screenshots 390 px und 1440 px plus Lighthouse liegen im Ordner `qa/` (nicht versioniert).
