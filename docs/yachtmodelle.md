# Yachtmodelle (/yachtmodelle)

Stand: November 2026. Übersicht `/yachtmodelle`, je Modell `/yachtmodelle/<id>` (41 Modelle).
Bisher **nur Deutsch**: Daten und Texte liegen nur auf Deutsch vor, es gibt keine EN-Route, keinen
Menüpunkt auf yacht-holiday.net und kein hreflang. Eine englische Fassung braucht übersetzte Daten
(`src/data/yachtModels.json`, ca. 107 KB) und Routen im Muster `/yacht-models` (siehe `i18n.ts`).

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
| `scripts/yachtmodelle-thumbs.cjs` | Erzeugt die Vorschau- und Kartenbilder aus dem Hauptvideo |

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
  BAVARIA YACHTS, HanseYachts AG). Keine Videos von Händlern, Charterfirmen oder Magazinen (das wäre Werbung für Dritte).
  Vor dem Eintragen den Kanal prüfen: `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<ID>&format=json`
  liefert `author_name`. Das Feld `by` heißt „Offizielles Video von <Kanal>“. Modelle ohne offizielles Video
  (Bavaria Voyager 45, Hanse 461) zeigen den Hinweis „Ein Video folgt“.
- **Vorschaubilder liegen lokal** (`public/images/yachtmodelle/<id>.jpg` 1280 px und `<id>-card.jpg` 640×400, aus dem
  Hauptvideo). Erzeugt mit `node scripts/yachtmodelle-thumbs.cjs` (braucht Netz auf `i.ytimg.com`, `curl`, ImageMagick).
  Modelle mit eigenem Foto (`images[0]`) nehmen dieses. Eigene Fotos ersetzen die Vorschaubilder jederzeit: Datei
  gleichen Namens überschreiben.
- Die Seite lädt **nichts** direkt von YouTube/Matterport, bevor jemand auf Play klickt. Der Klick lädt YouTube im
  Datenschutzmodus (`youtube-nocookie.com`); darunter steht ein Hinweis, Datenschutzerklärung Abschnitt 7 beschreibt es.
- 3D-Rundgänge (`tours`, Matterport) sind im Code vorbereitet, aktuell aber **leer**: der einzige Rundgang (Bali 4.8,
  Ionian Charter) ist Werbung einer Charterfirma und wurde entfernt. Neue Rundgänge nur mit schriftlicher Erlaubnis
  des Eigentümers, Quelle sichtbar.
- **Hanse:** Hanse hat nach Angabe des Betreibers keine Rechte an den eigenen Bildern. Für Hanse-Modelle werden deshalb
  **keine** Vorschaubilder, Fotos oder Grundrisse der Werft übernommen (Illustration bzw. eigene Fotos). Die Videos
  bleiben nur eingebettet (YouTube-Player, keine Kopie).
- Fotos und Grundrisse nur aus eigener Mediathek bzw. Pressebereichen, nie von Werftseiten verlinken. Grundrisse werden
  direkt auf der Seite gezeigt (Feld `layouts[].img`, Pfad z. B. `/images/yachtmodelle/layouts/<id>-<n>.jpg`).
- Es gibt bewusst **keinen** Abschnitt „Kosten“ (Preis nur im Angebot).

## Anfrageformular
`sendForm('yachtmodell-anfrage', …)` an `netlify/functions/contact.mjs` (Felder `name`, `email`, `zeitraum`,
`personen`, `revier`, `skipperWunsch`, `nachricht`, `modell`, `werft`, `seite`). GA4 `generate_lead` mit
`form_name: yachtmodell-anfrage` und Meta `Lead` kommen automatisch aus `sendForm`.
