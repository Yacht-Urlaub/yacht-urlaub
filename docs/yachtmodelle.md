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
| `public/images/yachtmodelle/` | Eigene Fotos (bisher nur `lagoon-42-1.jpg`) |

Vorlage war das Artefakt „Yachtmodelle“ (Daten kamen aus `models.json`, erzeugt mit `build_models.py`
beim Artefakt-Ersteller). Ein neues Modell: weiteres Objekt in `yachtModels.json` ergänzen, die URL in
`public/sitemap.xml` eintragen und den Snapshot-Ablauf aus `CLAUDE.md` laufen lassen.

## SEO
- Title: `<Name> – <Typ> chartern | Yacht-Urlaub`, Description: `<Name>: <Tagline>` (höchstens ~150
  Zeichen, sonst nur die Tagline). Canonical je Seite, JSON-LD `FAQPage` + `BreadcrumbList`.
- `image`: nur Lagoon 42 hat ein eigenes Foto; alle anderen nutzen das Standardbild.
- Jede Seite hat einen Snapshot (`scripts/prerender.cjs`), die URLs stehen in `sitemap.xml` und `llms.txt`.

## Datenschutz
- Videos (YouTube, Datenschutzmodus) und 3D-Rundgänge (Matterport) laden **erst nach Klick** (Vorschau ist
  die Illustration bzw. das eigene Foto, **keine** YouTube-/Matterport-Vorschaubilder). Unter dem Video
  steht ein Hinweis, Datenschutzerklärung Abschnitt 7 beschreibt es.
- Matterport-Rundgänge gehören den jeweiligen Charterfirmen (Bali 4.8: Ionian Charter). Die Quelle
  steht sichtbar neben dem Rundgang; die Erlaubnis der Firma muss vorliegen.
- Fotos und Grundrisse nur aus eigener Mediathek bzw. Pressebereichen, nie von Werftseiten verlinken.

## Anfrageformular
`sendForm('yachtmodell-anfrage', …)` an `netlify/functions/contact.mjs` (Felder `name`, `email`, `zeitraum`,
`personen`, `revier`, `skipperWunsch`, `nachricht`, `modell`, `werft`, `seite`). GA4 `generate_lead` mit
`form_name: yachtmodell-anfrage` und Meta `Lead` kommen automatisch aus `sendForm`.
