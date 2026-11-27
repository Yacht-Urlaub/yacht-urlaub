# Yachtmodelle (/yachtmodelle)

Stand: November 2026. Übersicht `/yachtmodelle`, je Modell `/yachtmodelle/<id>` (57 Modelle in den Daten, 52 sichtbar: Hanse ausgeblendet, siehe unten).

## Hanse ausgeblendet (seit 27.11.2026)

Zwischen der Hansewerft und ihren Fotografen läuft ein Rechtsstreit (Angabe des Betreibers). Bis zur Klärung zeigt die
Seite nichts von Hanse: die 5 Modelle (hanse-410, -461, -505, -510, -590) tragen in `src/data/yachtModels.json` das Feld
`"hidden": true`. Daten, Pläne und englische Übersetzungen bleiben erhalten (Prüfskript prüft sie weiter). Wirkung: keine Seite,
nicht in Übersicht, Filter, Schema (ItemList), Sitemaps (DE und EN) und `llms.txt`; Aufrufe von `/yachtmodelle/hanse-*` bzw.
`/yacht-models/hanse-*` leitet `netlify.toml` per 302 auf die Übersicht. Bildmaterial von Hanse wurde ohnehin nie
verwendet (Illustration statt Foto; die Pläne hat der Betreiber freigegeben).
**Wieder einblenden:** `hidden` entfernen, die zwei Redirect-Regeln in `netlify.toml` löschen, die 5 Modelle in beide Sitemaps
eintragen, `llms.txt` (Zahl, Werftliste) anpassen, Snapshots neu erzeugen. Wichtig: Presseberichte zum Streit habe ich bei einer
Suche nicht gefunden (nur den unverwandten Plagiatsstreit Hanse gegen Cantiere del Pardo); die Entscheidung beruht auf der Angabe
des Betreibers.
**Zweisprachig:** Deutsch auf yacht-urlaub.net, Englisch auf yacht-holiday.net unter `/yacht-models` und
`/yacht-models/<id>` (intern `/en/yacht-models/...`, Paar in `i18n.ts`, damit hreflang und Sprachumschalter
stimmen). Dieselben Komponenten, die Sprache kommt aus `useLang()`.

## Englische Fassung pflegen

- **Eine Datenquelle:** `src/data/yachtModels.json` bleibt deutsch. Die englischen Texte stehen in
  `src/data/yachtModels.en.json` als Wörterbuch „deutscher Satz → englischer Satz“ (Schlüssel ist der
  deutsche Text exakt wie in der JSON). `src/pages/yachtmodelle/lang.ts` übersetzt damit beim Rendern
  (`localizeModel`). Reine Zahlen mit Einheit (`11,4 m`, `1.120 l`, `2 × 45 PS`) rechnet `lang.ts` selbst um
  (Dezimalpunkt, Tausenderkomma, PS → hp) und brauchen keinen Eintrag.
- **Nach jeder Textänderung in `yachtModels.json` (neues Modell, geänderter Satz):**
  `node scripts/check-yachtmodelle-en.cjs` – meldet fehlende, leere und veraltete Einträge. Fehlende Sätze
  ins Wörterbuch eintragen (britisches Englisch, Bootsbegriffe: Salon = saloon, Krängung = heel, Heckstufen = stern
  steps, Beiboot = tender/dinghy, Laufdeck = side deck, Eignerkabine = owner's cabin). Ohne Eintrag bleibt der
  Satz auf der englischen Seite deutsch.
- **Oberflächentexte** (Überschriften, Formular, Hinweise, Werften-Texte, Ausstattung): `lang.ts` (`UI`, `BRANDS_L`,
  `EQUIP_L`, `EXTRAS_L`); Title/Description/FAQ-Standardfragen: `data.ts` (`modelTitle`, `modelDescription`, `faqsFor`
  mit Parameter `lang`).
- **Wörterbuch wird nur auf der englischen Seite geladen** (`useEnglishTexts()`, eigener Chunk), deutsche Besucher
  laden es nicht.
- **Neue Sitemap-Einträge** für jedes neue Modell in `public/sitemap.xml` (DE) **und** `public/sitemap-en.xml`
  (`/yacht-models/<id>`).
- **Prüfen:** gerenderte `description`/`og:description`, Schema und Alt-Texte auf `en.localhost` auf deutsche
  Reststrings und `yacht-urlaub.net`-URLs ansehen (siehe CLAUDE.md).

## Links von anderen Seiten auf die Modelle

Wo eine Seite ein konkretes Modell nennt, das eine eigene Modellseite hat, steht ein Link darauf (Deutsch und Englisch). Adresse
immer über `yachtModelPath(id, lang)` aus `src/i18n.ts` bilden (lädt keine Modelldaten mit). Stand: Porto-Heli-Flottenkarten
(Lagoon 38, 42, 43, 46), BVI-Kabinenangebot (Bali 4.2: Datenfeld „Modell“ und Link unter dem Yachttext) und die News-Seite zum Event
(nur Deutsch, Bali 4.2). Links aus Buchungs- und Angebotsseiten öffnen im neuen Tab, damit Auswahl und Wunschwoche nicht verloren gehen.
Ohne eigene Modellseite, deshalb ohne Link: Bali 4.1 (Dubrovnik-Angebot), Fountaine Pajot Saona 47 (Phuket-Angebot), Lagoon 400/450
und Dufour 45/512 in Törnberichten und Flottenbildern. Wird ein Modell neu aufgenommen, das auf der Website erwähnt ist, den Link ergänzen.

## Dateien

| Datei | Inhalt |
| --- | --- |
| `src/data/yachtModels.json` | Alle Modelldaten (eine Liste, ein Objekt je Modell). Feldbeschreibung in `src/pages/yachtmodelle/data.ts` (`Model`) |
| `src/pages/yachtmodelle/Overview.tsx` | Übersicht mit Filter (Typ, Werft, „Mit 3D-Rundgang“, Suche) |
| `src/pages/yachtmodelle/Detail.tsx` | Detailseite je Modell inkl. Anfrageformular |
| `src/pages/yachtmodelle/shared.tsx` | Illustration, Video-/3D-Einbettung (Klick zum Laden), Icons |
| `src/pages/yachtmodelle/data.ts` | Typen, Werften-Texte, Kosten/Ausstattung, Title/Description-Regeln |
| `src/pages/yachtmodelle/yachtmodelle.css` | Alle Styles, strikt unter `.ym` |
| `public/images/yachtmodelle/` | Vorschau- und Kartenbilder je Modell, ein eigenes Foto (`lagoon-42-1.jpg`) |
| `scripts/yachtmodelle-photos.cjs` + `scripts/yachtmodelle-photos.json` | Erzeugt Vorschau- und Kartenbilder aus Werft-Fotos (JSON: Modell-ID → Foto-URL) |

Vorlage war das Artefakt „Yachtmodelle“ (Daten kamen aus `models.json`, erzeugt mit `build_models.py`
beim Artefakt-Ersteller). Ein neues Modell: weiteres Objekt in `yachtModels.json` ergänzen, die URL in
`public/sitemap.xml` eintragen und den Snapshot-Ablauf aus `CLAUDE.md` laufen lassen.

## SEO
- Title: `<Name> – <Typ> chartern | Yacht-Urlaub`, Description: `<Name>: <Tagline>` (höchstens ~150
  Zeichen, sonst nur die Tagline). Canonical je Seite, JSON-LD `FAQPage` + `BreadcrumbList`.
- `image` (og:image): das Vorschaubild des Modells (JPG); Voyager 45 und Hanse 461 nutzen das Standardbild.
- Jede Seite hat einen Snapshot (`scripts/prerender.cjs`), die URLs stehen in `sitemap.xml` und `llms.txt`.

## Videos und Bilder
- **Nur offizielle Hersteller-Videos** (Kanäle Bali Catamarans, Lagoon Catamarans, Jeanneau Officiel, Beneteau Yacht Channel,
  BAVARIA YACHTS, HanseYachts AG, Dufour). Keine Videos von Händlern, Charterfirmen oder Magazinen (das wäre Werbung für Dritte).
  Vor dem Eintragen den Kanal prüfen: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`
  liefert `author_name`. Das Feld `by` heißt „Offizielles Video von <Kanal>“. Modelle ohne passendes Video
  (Bavaria Voyager 45, Hanse 461) zeigen den Hinweis „Ein Video folgt“.
- **Modellbilder liegen lokal** (`public/images/yachtmodelle/<id>-foto.jpg` 1280×720 und `<id>-foto-card.jpg` 640×400; „-foto“ im Namen umgeht den 30-Tage-Cache, ersetzte Bilder immer unter neuem Namen ablegen). Es sind
  Außen-/Segelfotos von den Websites der Werften (Lagoon, Bali, Jeanneau, Beneteau, Bavaria), **keine** YouTube-Vorschaubilder.
  Die Quell-URL je Modell steht in `scripts/yachtmodelle-photos.json`; erzeugt mit `node scripts/yachtmodelle-photos.cjs`
  (braucht Netz auf die Werft-Hosts, `curl`, ImageMagick). Lagoon 42 nutzt das eigene Foto; Hanse und Voyager 45 haben kein Bild (Illustration).
  Eigene Fotos ersetzen die Bilder jederzeit: Datei gleichen Namens überschreiben. Schwächere Motive (Stand November 2026):
  Lagoon 46 und 51, Bali Catspace/5.2/5.8 – dort lohnt ein besseres Foto.
- **Videos: Image-Filme, keine Walkthroughs, nichts auf Französisch.** Pro Modell 1–2 offizielle Image-/Markenfilme
  (englisch oder ohne Sprache), keine Rundgänge/Guided Tours/Interviews.
- **YouTube-Player reduziert** (`youtubeSrc()`/`Embed` in `shared.tsx`): Standardleiste (Play/Pause, Lautstärke, Qualität, Vollbild),
  dazu `rel=0`, `iv_load_policy=3`, `disablekb=1`, `modestbranding=1`; der iframe ist ein Sandbox-iframe **ohne** `allow-popups`,
  Links im Player (Titel, „Auf YouTube ansehen“, Teilen) öffnen also nichts. Am Videoende meldet der Player per postMessage
  den Status „beendet“, die Seite entfernt den Player und zeigt wieder Vorschaubild + Play – so erscheinen keine
  Endbildschirm-Vorschläge. Nicht abschaltbar (YouTube-Vorgabe): Titelzeile während Pause/Start und Overlay beim Pausieren.
- Die Seite lädt **nichts** direkt von YouTube/Matterport, bevor jemand auf Play klickt. Der Klick lädt YouTube im
  Datenschutzmodus (`youtube-nocookie.com`); darunter steht ein Hinweis, Datenschutzerklärung Abschnitt 7 beschreibt es.
- 3D-Rundgänge (`tours`, Matterport; Stand November 2026, 14 Modelle): Bali 4.2, 4.8, Lagoon 42, 46, 50, 55, Sun Odyssey 380, 440, 490,
  First 44, Oceanis 48, Oceanis 51.1 und Hanse 505. Es sind Rundgänge von Charterfirmen, Maklern und Händlern (Ionian Charter, Horizon Yacht Charters,
  Ancasta, Virtual Agency 3D, seeduu.de, Sailing Forever, AndreaMcc): die Quelle steht sichtbar am Rundgang, die Erlaubnis der jeweiligen
  Firma muss der Betreiber einholen. Beim Lagoon 46 ist die Beschreibung des Rundgangs französisch. Neue Rundgänge nur nach Freigabe
  durch den Betreiber.
- **Hanse:** Hanse hat nach Angabe des Betreibers keine Rechte an den eigenen Bildern. Für Hanse-Modelle werden deshalb
  **keine** Fotos übernommen (Illustration bzw. eigene Fotos; Klärung läuft). **Grundrisse** der Hanse dürfen verwendet werden
  (Betreiber, November 2026): sie stammen von hanseyachts.hr, wurden auf den Rumpf zugeschnitten und gedreht. Die Videos
  bleiben nur eingebettet (YouTube-Player, keine Kopie).
- Fotos und Grundrisse nur aus eigener Mediathek bzw. Pressebereichen, nie von Werftseiten verlinken. Grundrisse werden
  direkt auf der Seite gezeigt: Feld `plans: [{ img, caption }]`, Dateien unter `public/images/yachtmodelle/plans/<id>-<n>.webp`
  (weiß hinterlegt, max. 1600 px breit; alle Pläne eines Modells haben dieselbe Leinwandgröße, damit die Karten auf einer Höhe sitzen – Dateiendung `-n.webp`). Die Tabelle der Versionen (`layouts`) bleibt als Text daneben.
- **Quelle der Grundrisse (Stand November 2026):** Modellseiten der Werften (Lagoon, Bali, Jeanneau, Beneteau), 28 Modelle,
  nur Pläne des jeweiligen Modells (Unterdeck-/Kabinenpläne, dazu Deck-/Cockpitpläne). Bildunterschriften bei Lagoon, Bali und
  Beneteau aus den Dateinamen (Kabinen/Bäder), bei Jeanneau neutral „Variante 1/2/3“. Hanse 410: nur Variante 1 und 4 (Wunsch des Betreibers). Jeanneau Yachts 54: die Werftseite hat keine Pläne („Grundrisse folgen“). **Ohne Plan:** Bavaria (die Werft zeigt nur Teilmodule wie Bug-, Heck- oder Salonbereich, keine Gesamtpläne), Bali 4.8
  (Modell nicht mehr auf der Bali-Seite), Sun Odyssey 440 und 490 (alte Seiten ohne Pläne), Voyager 45. Dort steht „Grundrisse folgen“.
- **Dufour** (November 2026, 6 aktuelle Modelle 37, 39, 41, 44, 48, 54): Daten, Fotos und Pläne von www.dufour-yachts.com, Videos vom offiziellen Kanal. Die Pläne sind dort hochkant (Bug oben) mit Zusatzmodulen am Rand; sie wurden auf den Rumpf zugeschnitten und um 90° gedreht, damit alle Pläne der Seite quer liegen. Bewusst nicht aufgenommen: ältere Baureihen (z. B. Dufour 390, 412, 430, 460, 470, 520, 530), die in Charterflotten häufig sind; für die Dufour 48 gibt es nur einen französisch betitelten Image-Film (daher kein Video).
- **Fountaine Pajot** (November 2026, 5 aktuelle Modelle FP41, FP44, FP48, FP51, FP55): Daten, Fotos und Pläne von catamarans-fountaine-pajot.com (Host in der Sandbox-Freigabe), Videos vom offiziellen Kanal „Fountaine Pajot“ (jeweils der Image-Film, keine Walkthroughs). Die Pläne sind dort hochkant (Bug oben), wurden um 90° gedreht und je Modell auf eine gemeinsame Leinwand gebracht (`-n.webp`). Bewusst nicht aufgenommen: ältere Baureihen (Isla 40, Astrea 42, Elba 45, Tanna 47, Aura 51 – die Werftseite leitet sie auf die Nachfolger um, es gibt dort kein Werftmaterial), die großen FPY 59S/70S/80S/120S und Motoryachten. Die Beschriftungen der FP41-Pläne („Variante 1/2“) folgen nicht den Werftnamen (Maestro 2/3, Quatuor 2/4), weil die Zuordnung der vier Bilder aus der Seite nicht eindeutig war; Gästezahlen sind aus den Doppelkabinen abgeleitet (Kabinen × 2). 3D-Rundgänge: keine Matterport-Links bekannt (die Werftseite hat einen eigenen „Virtual visit“).
- Es gibt bewusst **keinen** Abschnitt „Kosten“ (Preis nur im Angebot).

## Anfrageformular
`sendForm('yachtmodell-anfrage', …)` an `netlify/functions/contact.mjs` (Felder `name`, `email`, `zeitraum`,
`personen`, `revier`, `skipperWunsch`, `nachricht`, `modell`, `werft`, `seite`). GA4 `generate_lead` mit
`form_name: yachtmodell-anfrage` und Meta `Lead` kommen automatisch aus `sendForm`.
