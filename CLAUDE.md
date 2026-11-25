# SEO-Check bei neuen/geänderten Seiten

Bei jeder neuen Seite und jeder inhaltlichen Änderung an einer bestehenden
Seite gehört ein kompletter SEO-Check dazu — nicht nur "sieht gut aus im
Browser". Das umfasst mindestens:

- `<SEO>`-Komponente (`src/components/SEO.tsx`) mit spezifischem, nicht
  generischem `title` und `description` (keine Dopplung über mehrere
  Seiten hinweg).
- `image`-Prop gesetzt, wenn die Seite ein eigenes, zur Seite passendes
  Bild hat (sonst greift der generische Default). Bild möglichst nicht als
  `.webp` referenzieren, wenn es als `og:image` dient — WhatsApp, iMessage
  und einige ältere Social-Crawler zeigen WebP-Vorschaubilder teils nicht
  zuverlässig an.
- `schema`-Prop (JSON-LD) wo inhaltlich sinnvoll — z. B. `Product`/`Offer`
  für buchbare Angebote mit Preis, `TouristDestination` für Reiseziele,
  `FAQPage` für FAQ-Inhalte. Siehe bestehende Beispiele in
  `src/pages/PackageDetailPage.tsx` und `src/pages/DestinationPage.tsx`.
- Alt-Texte auf allen Bildern, auf Deutsch und Englisch getrennt formuliert
  (nicht einfach den deutschen Text kopiert).
- Für beide Sprachen prüfen (`useLang()`/`isEnHost()`) — ein Fix nur auf der
  deutschen Seite reicht nicht, siehe das Muster `dict = { de: {...}, en:
  {...} }`.
- **Preview-Infos aktiv gegenprüfen, nicht nur den Code lesen:** Ein
  `title`-Prop, der korrekt zweisprachig ist, heißt nicht, dass
  `description` (oder `schema`) es auch sind — genau das ist schon einmal
  seitenweise übersehen worden (12 Seiten + alle Destinationen-Detailseiten
  hatten eine englische `title` aber eine fest deutsche `description`, die
  unverändert auch auf yacht-holiday.net auftauchte, inkl. in
  WhatsApp-Link-Vorschauen). Bei jeder Änderung an einer Seite mit
  `<SEO>`-Komponente deshalb den tatsächlich gerenderten
  `<meta name="description">`/`og:description` für **beide** Domains
  prüfen (z. B. per Playwright `document.querySelector('meta[name=
  "description"]').content` auf `localhost` und `en.localhost`), nicht nur
  den JSX-Code überfliegen. Dasselbe gilt für Inhalte in `schema` (JSON-LD):
  auch dort auf hartcodierte deutsche Strings, hartcodierte
  `yacht-urlaub.net`-URLs/Bildpfade auf englischen Seiten sowie auf
  inhaltlich veraltete Beschreibungen (z. B. ein Angebot, das es nicht mehr
  gibt) achten.

## Snapshot nach jeder Content-Änderung neu erzeugen

Die Seite ist eine reine Client-Side-React-SPA (Vite, kein SSR). Crawler
ohne JavaScript — WhatsApp, Telegram, iMessage, Slack, LinkedIn, aber auch
die meisten KI-Crawler (GPTBot, CCBot, ClaudeBot, PerplexityBot, ...) —
führen kein JS aus und sehen deshalb nur das aus, was tatsächlich als
statisches HTML ausgeliefert wird. Deshalb gibt es `scripts/prerender.cjs`:
es rendert jede Seite einmal per Headless-Chromium und schreibt das
fertige HTML nach `public/<pfad>/index.html` (Vite kopiert das beim
nächsten `npm run build` unverändert nach `dist/`, kein Zusatzschritt im
Netlify-Build nötig).

**Nach jeder Änderung, die Title/Description/Bild/Inhalt einer Seite
betrifft — neue Seite, neues Angebot, geänderter SEO-Text — muss der
betroffene Snapshot neu erzeugt und mit committet werden:**

```
find public -name index.html -delete
rm -rf dist
npm run build
GLOBAL_NM=$(npm root -g) NODE_PATH="$GLOBAL_NM" node scripts/prerender.cjs
node scripts/update-sitemap-lastmod.cjs
```

Der letzte Schritt pflegt `<lastmod>` in beiden Sitemaps (ChatGPT Search/
OAI-SearchBot, Googlebot & Co. nutzen es zur Re-Crawl-Entscheidung). Das
Datum wird nur dann auf heute gesetzt, wenn sich der inhaltlich relevante
Teil des Snapshots geaendert hat (Hash in `scripts/sitemap-lastmod.json`,
wird mitcommittet) — nicht bei jedem Build/Deploy. Ein reines Neu-Rendern
ohne Inhaltsaenderung muss `0 geaendert` melden; meldet es viele Seiten,
ist irgendwo ein nicht-deterministischer Anteil im Snapshot (dann in
`normalise()` des Skripts ausklammern, wie Inline-Styles/`min`-Datum).
Neue Route: zuerst in die Sitemap eintragen, dann diese Schritte — sie
bekommt beim ersten Lauf automatisch ein lastmod.

Die SPA-Huelle fuer den Prerender ist Vites unveraenderte `index.html`
(von `apply-prerendered-home.cjs` nach `node_modules/.cache/prerender-shell.html`
gesichert). Nicht `dist/index.html` direkt verwenden: die ist nach dem
Build schon der eingefrorene Startseiten-Snapshot und liess sonst
Title/Description der Startseite doppelt in jedem Unterseiten-Snapshot
landen. Gegenpruefung nach dem Lauf: genau ein `<meta name="description"`
pro Snapshot.

Das `rm -rf dist` vorneweg ist seit dem Umstieg auf Code-Splitting
(`React.lazy()` pro Route in `App.tsx`, siehe Kommentar dort) nicht mehr
optional: Vite/Rolldown leert `dist/` vor einem Build nicht zuverlässig
selbst, und ein `dist/<pfad>/index.html` aus einem fruheren Lauf bleibt
sonst liegen. `scripts/prerender.cjs` serviert Seiten per einfachem
Static-File-Server aus `dist/` (pfad-, nicht hostbasiert) — eine solche
Leiche wird dann fuer JEDE Domain unter diesem Pfad ausgeliefert, auch
wenn eigentlich die SPA-Huelle greifen sollte (identischer
Wirkmechanismus wie der `/faq`-`/yoga`-Host-Kollisions-Bug weiter unten,
nur diesmal durch `dist/`- statt `public/`-Reste ausgeloest). Nach jedem
Lauf gegenpruefen, dass `public/__en/faq/index.html` und
`public/__en/yoga/index.html` wirklich `lang="en"` tragen.

**Zweiter, davon unabhaengiger Mechanismus fuer denselben Bug:** Auch
mit korrekt geleertem `dist/` kann `/faq`/`/yoga` auf Englisch wieder
Deutsch anzeigen, wenn sich zwischen zwei Regenerierungen die
JS-Asset-Hashes geaendert haben (jede Aenderung an einer `.tsx`-Datei
aendert den Hash ihres Chunks). Ursache: `public/faq/index.html` und
`public/yoga/index.html` sind selbst committete, fertig gerenderte
Snapshots mit eingebetteten `<script>`-Tags auf die zum Zeitpunkt
ihrer letzten Erzeugung aktuellen Hashes. `vite build` kopiert sie wie
jede andere Datei aus `public/` unveraendert nach `dist/faq/index.html`
bzw. `dist/yoga/index.html` (normales, korrektes `publicDir`-Verhalten
— kein Bug fuer sich). Zeigt das darin eingebettete `<script>`-Tag auf
einen Hash, den es im frischen `dist/assets/` nicht mehr gibt, 404et
der Ladevorgang, React mountet nie, und die alte (deutsche) Snapshot-
Fassung bleibt unveraendert stehen — auch wenn `prerender.cjs` sie
anschliessend unter `en.localhost` abruft, denn sein Static-Server ist
pfad-, nicht hostbasiert und liefert fuer `/faq` auf jedem Host dasselbe
`dist/faq/index.html` aus. Betrifft nur `/faq` und `/yoga`, weil nur
dort DE und EN denselben URL-Pfad teilen; alle anderen Seiten haben pro
Sprache einen eigenen Pfad, sodass ihr jeweiliger stehengebliebener
Snapshot zufaellig ohnehin zur richtigen Sprache gehoert.
**Fix:** vor jedem Build zusaetzlich alle vorhandenen
`public/**/index.html` loeschen (`find public -name index.html
-delete`), damit `dist/` an diesen Pfaden auf die SPA-Huelle +
aktuelle Chunks faellt statt auf einen alten Snapshot, dann erst
`rm -rf dist`, bauen, neu prerendern. Das `rm -rf dist` allein (siehe
oben) reicht bei diesem Mechanismus nicht, weil `dist/` ja korrekt leer
war — das Problem liegt in den committeten `public/`-Dateien, nicht in
`dist/`-Resten.

Das Skript liest die Routenliste aus `public/sitemap.xml` /
`public/sitemap-en.xml` — eine komplett neue Route (nicht nur neuer Inhalt
auf einer bestehenden) muss also zuerst dort ergänzt werden, sonst wird sie
nicht mit erzeugt. Playwright ist bewusst kein `devDependency` (würde bei
jedem Netlify-Build unnötig einen Chromium-Download anstoßen) — das Paket
ist in dieser Sandbox/lokal global installiert, daher der `NODE_PATH`-Trick.
`.cjs` statt `.mjs`, weil ESM-`import` `NODE_PATH` ignoriert.

Sonderfälle (siehe Kopfkommentare in den Skripten für Details):
- Die Startseite kollidiert mit Vites eigener `dist/index.html` und läuft
  deshalb über `prerendered/home-de.html` + `home-en.html` plus
  `scripts/apply-prerendered-home.cjs` (Teil von `npm run build`).
- `/faq` und `/yoga` heißen auf Deutsch und Englisch gleich; die englische
  Fassung liegt unter `public/__en/...` und wird in `netlify.toml`
  host-gebunden dorthin umgeschrieben.

Wenn unklar ist, ob eine Änderung einen Snapshot ungültig macht: lieber
einmal zu oft neu generieren. Der Lauf dauert für alle ~99 Seiten rund
3–4 Minuten.

## Porto-Heli-Seite: Preise und Termine aktualisieren

Die Seite `/toerns/porto-heli` (EN `/cruises/porto-heli`,
`src/pages/PortoHeliPage.tsx`) zeigt Wochenpreise und Verfuegbarkeit aus
`src/data/portoHeli.ts`. Die Daten kommen woechentlich aus dem Booking
Manager: `PH_PRICES` (Freitag -> Yacht -> [Liste, nach Rabatt, Rabatt %];
fehlt eine Yacht, ist die Woche belegt) und `PH_CONFIG.stand` (Preisstand)
anpassen, danach den normalen Snapshot-Ablauf (siehe oben) laufen lassen und
mit committen. Der Endpreis wird in `priceOf()` berechnet (Charter nach
Rabatt + Nebenkosten + Skipper, dann "schoener" Preis: Ankerpreis X.490/X.990
wenn hoechstens 100 EUR darunter oder 150 EUR darueber, sonst aufrunden auf
...50 oder ...90; Preis p. P. in `ppOf()`). Diese Rundungsregeln kommen aus
dem Artefakt "Segeln ab Porto Heli" und muessen mit ihm uebereinstimmen. Die Buchung geht als
Formular `porto-heli-buchung` ueber `sendForm` an `CONTACT_TO`; die Mail
enthaelt die interne Kalkulation und die Booking-Manager-Yacht-ID.

# PR- und Preview-Link immer im Chat durchgeben

Änderungen nie nur stillschweigend committen/pushen und als "fertig"
melden. Sobald ein Pull Request erstellt wird, den PR-Link **immer**
direkt im Chat mitteilen — ebenso den Netlify-Deploy-Preview-Link,
sobald er verfügbar ist (Status-Check `netlify/.../deploy-preview` am
PR, braucht nach dem Erstellen ein paar Minuten). Nichts als "live"
bezeichnen, solange es nicht tatsächlich nach `main` gemergt ist.
