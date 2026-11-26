# SEO-, AEO- und GEO-Standard für yacht-urlaub.net / yacht-holiday.net

**Stand: 26. November 2026 · nächste Prüfung: spätestens 10. Dezember 2026 (alle 2 Wochen, siehe unten).**

Gilt für jede neue oder geänderte Seite, jeden Text und jedes Bild. Ergänzt die Regeln in `CLAUDE.md`
(Snapshot-Ablauf, beide Domains prüfen). Der Standard ist bewusst kurz und belegt; Marketing-Floskeln, die
niemand prüfen kann, stehen hier nicht.

## 1. Was heute belegt ist (Quellen)

| Thema | Aussage | Quelle (Stand) |
| --- | --- | --- |
| KI-Funktionen in Google (AI Overviews, AI Mode) | Keine Spezialoptimierung nötig. Die Seite muss indexiert und mit Snippet anzeigbar sein. Text muss als Text vorliegen, strukturierte Daten müssen zum sichtbaren Text passen. | developers.google.com/search/docs/appearance/ai-features (10.12.2025) |
| Leitfaden „Optimizing for generative AI features“ | Eigener Blickwinkel, Inhalte jenseits des Allgemeinwissens, gute Gliederung, semantisches HTML, gute Seitenerfahrung, hochwertige Bilder/Videos. **Nicht nötig:** llms.txt, Markdown-Kopien, „Chunking“, Umschreiben für KI, künstliche Erwähnungen, Spezial-Schema. | developers.google.com/search/docs/fundamentals/ai-optimization-guide (10.07.2026) |
| Strukturierte Daten | Unterstützt: u. a. Breadcrumb, Organization, Product, Review-Snippet, Video, Local Business. FAQ taucht in der Tabelle nicht mehr auf. | developers.google.com/search/docs/appearance/structured-data/search-gallery |
| Bilder | Alt-Text ist das wichtigste Metadatum; sprechende Dateinamen; WebP und AVIF werden unterstützt; `<picture>`/`srcset` mit Fallback-`src`. | developers.google.com/search/docs/appearance/google-images |
| Andere KI-Suchen (ChatGPT, Perplexity, Claude) | Lesen meist nur das ausgelieferte HTML (kein JavaScript). Crawler (OAI-SearchBot, PerplexityBot, ClaudeBot) dürfen nicht blockiert sein. Wirksam laut Studien: direkte Antwort in den ersten Sätzen, konkrete Zahlen, eigene Daten, kurze Absätze unter klaren Überschriften. Kein Effekt belegt: FAQ-/Schema-Blöcke allein, llms.txt. | GEO-Studien 2024–2026 (u. a. Aggarwal et al., arXiv 2311.09735; Sammelauswertungen 2026) – Wirkung je Engine unterschiedlich |

## 2. Regeln für Seiten

1. **Rohes HTML liefert den Inhalt.** Jede Seite wird als Snapshot vorgerendert (`scripts/prerender.cjs`, siehe `CLAUDE.md`). Prüfen: `curl`/Snapshot enthält H1, Haupttext, Fakten, FAQ.
2. **Title (≤ 60 Zeichen) und Description (100–158 Zeichen) je Seite einzigartig**, mit dem Suchbegriff am Anfang („<Modell> chartern“), den wichtigsten Fakten und einem klaren nächsten Schritt. Nie dieselbe Description für mehrere Seiten. Auf beiden Domains die gerenderten Meta-Tags prüfen.
3. **Eine H1 pro Seite**, Hierarchie ohne Sprünge (H1 → H2 → H3). Überschriften als Fragen oder Nutzenversprechen, die den Suchbegriff natürlich enthalten.
4. **Antwort zuerst.** Jeder Abschnitt beantwortet die Frage in den ersten ein bis zwei Sätzen, Details danach. FAQ-Antworten beginnen mit der Kernaussage.
5. **Nur belegte Fakten.** Zahlen und Eigenschaften aus Werftseite, Datenblatt oder eigener Prüfung; nicht erfinden, keine Superlative ohne Beleg. Wo Angaben fehlen: Bereich oder „je nach Yacht“ statt Raten.
6. **Eigener Mehrwert vor Wiederholung:** Das haben nur wir: Einordnung für Crews („Ist die Yacht das Richtige für Sie?“), Charter-Praxis, Vergleich ähnlicher Modelle, Beratung. Herstellertexte nicht abschreiben.
7. **Strukturierte Daten** (JSON-LD): BreadcrumbList auf allen Unterseiten; `WebPage`/`CollectionPage` mit `ItemList` für Übersichten; `FAQPage` nur für echte, sichtbare FAQ (für Verständlichkeit, nicht für Rich Results); `Product`/`Offer` nur bei sichtbarem Preis. Inhalte müssen mit dem sichtbaren Text übereinstimmen. Kein erfundenes Review-/Rating-Markup.
8. **Interne Links** mit sprechendem Ankertext; jede neue Seite von mindestens einer thematisch passenden Seite verlinken und in die Sitemap aufnehmen (`lastmod` pflegt `scripts/update-sitemap-lastmod.cjs`).
9. **robots.txt** darf Suchcrawler und KI-Suchcrawler nicht blockieren (aktuell: alles erlaubt, nur aggressive SEO-Tools gesperrt). Bei CDN-/Hosting-Änderungen prüfen, dass OAI-SearchBot, PerplexityBot, ClaudeBot, Googlebot ankommen.
10. **llms.txt** (`public/llms.txt`) bleibt als günstige Übersicht für KI-Agenten bestehen, wird aber nicht als Rankingfaktor behandelt.
11. **Aktualität:** Veraltete Aussagen und Zahlen entfernen oder datieren (z. B. „Stand November 2026“). Geänderte Inhalte lösen über den Hash in `scripts/sitemap-lastmod.json` ein neues `lastmod` aus.

## 3. Regeln für Bilder

- **Alt-Text** auf jedem inhaltlichen Bild, konkret und je Bild verschieden („Grundriss der Lagoon 42 – Unterdeck: 4 Kabinen“), ohne Keyword-Aufzählung. Rein dekorative oder doppelte Bilder bekommen `alt=""`. Deutsch und Englisch getrennt formulieren, nicht übersetzen lassen.
- **Dateinamen** sprechend und klein geschrieben (`lagoon-42-foto.jpg`). Ersetzte Bilder immer unter neuem Namen ablegen (der Browser-Cache für `/images/*` beträgt 30 Tage).
- **Format und Größe:** WebP für Anzeige (`<picture>` mit JPG-Fallback), `og:image` immer als JPG. Hero 1280 × 720, Karten 640 × 400, Pläne höchstens 1600 px breit. Richtwert: Hero ≤ ca. 120 KB (WebP), Karte ≤ ca. 40 KB.
- **`width`/`height`** an jedem `<img>` (verhindert Layoutsprünge). Das Bild über der Falz (LCP) mit `loading="eager"` und `fetchpriority="high"`, alle anderen `loading="lazy"` und `decoding="async"`.
- **Nichts von Dritten vor Einwilligung/Klick laden** (YouTube/Matterport erst nach Klick, siehe `docs/yachtmodelle.md`).
- **Rechte:** Fotos der Werften nur nach Absprache; Hanse-Fotos nur eigene (Stand: Klärung läuft).

## 4. Regeln für Texte (Marketing)

- **Ansprache** durchgehend „Sie“, konkret, kurze Sätze, Nutzen vor Eigenschaft („Salon und Cockpit auf einer Ebene – so sitzt die ganze Crew zusammen“ statt „großer Salon“).
- **Suchbegriffe natürlich:** „<Modell> chartern“, „Katamaran chartern“, Revier + Yachttyp. Maximal einmal pro Absatz, nie als Aufzählung. Keine Keyword-Listen, keine Text-Varianten nur für KI.
- **Einzigartig pro Seite:** Tagline, Description und „Leben an Bord“ je Modell eigenständig. Keine Satzbausteine, die auf 50 Seiten identisch stehen (Ausnahme: sachliche Standardantworten in der FAQ).
- **Glaubwürdigkeit:** nur belegbare Aussagen; Quellen sichtbar (z. B. Quelle des 3D-Rundgangs); Vertrauenssignale nur, wenn echt (Trusted Shops, Google-Bewertungen).
- **Handlungsaufforderung** je Seite eindeutig („Verfügbarkeit anfragen“).
- **Beide Sprachen:** Deutsche und englische Fassung getrennt texten; englische Seiten auf `yacht-holiday.net` mit eigener Description, eigenen Alt-Texten und Schema (keine deutschen Reststrings, keine `yacht-urlaub.net`-URLs). `/yachtmodelle` (DE) und `/yacht-models` (EN) teilen Komponenten und Daten, die englischen Texte pflegt `src/data/yachtModels.en.json`, siehe `docs/yachtmodelle.md`.

## 5. Messen

Google Search Console (Leistung, Seitenindexierung, Bericht zu KI-Funktionen soweit verfügbar) und Bing Webmaster Tools (AI Performance) auswerten; Suchanfragen je Modell prüfen; Stichproben mit echten Kundenfragen in ChatGPT, Perplexity und Google („Welchen Katamaran für 8 Personen in Kroatien chartern?“) und notieren, ob und womit wir genannt werden.

## 6. Prüfrhythmus: alle zwei Wochen

Ein geplanter Auftrag („SEO/AEO/GEO-Standard prüfen“) läuft am 1. und 15. jedes Monats und

1. liest die oben genannten Google-Seiten und die Änderungsprotokolle (Search Central Blog, Search Status Dashboard) erneut,
2. sucht nach neuen belastbaren Aussagen zu KI-Suche/GEO (nur Quellen mit Daten, keine reinen Anbieter-Behauptungen),
3. gleicht das mit diesem Dokument ab und aktualisiert Stand-Datum und Regeln, wenn sich etwas geändert hat,
4. meldet das Ergebnis kurz („unverändert“ oder „Änderungen: …“). Änderungen an Seiten erfolgen nie ohne Auftrag.

Beim Arbeiten an Seiten gilt: Ist das Stand-Datum oben älter als 14 Tage, zuerst diese Prüfung nachholen.
