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
npm run build
GLOBAL_NM=$(npm root -g) NODE_PATH="$GLOBAL_NM" node scripts/prerender.cjs
```

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

# PR- und Preview-Link immer im Chat durchgeben

Änderungen nie nur stillschweigend committen/pushen und als "fertig"
melden. Sobald ein Pull Request erstellt wird, den PR-Link **immer**
direkt im Chat mitteilen — ebenso den Netlify-Deploy-Preview-Link,
sobald er verfügbar ist (Status-Check `netlify/.../deploy-preview` am
PR, braucht nach dem Erstellen ein paar Minuten). Nichts als "live"
bezeichnen, solange es nicht tatsächlich nach `main` gemergt ist.

# Planyo: Änderungen nur mit größter Sorgfalt

Planyo (Buchungssystem, Site-ID 46954) ist mächtig, aber komplex. Ein
unbedachter API-Aufruf kann Kalender, Preise oder Buchungen für alle
Packages lahmlegen. Das ist schon passiert: Ein „harmloser“ Test, der
alle API-Methoden ohne Parameter aufrief, um die Rechte eines Keys zu
ermitteln, hat per `set_weekly_schedule` den gesamten Sandbox-Kalender
gesperrt. Deshalb gilt verbindlich:

- **Erst Sandbox, dann Live.** Alles wird zuerst gegen
  `sandbox.planyo.com` gebaut und getestet (Kopie der Echtdaten, wird
  jede Nacht überschrieben). Live (`www.planyo.com`) erst, wenn es dort
  nachweislich funktioniert und der User zugestimmt hat.
- **Keine „ich probier mal“-Aufrufe.** Schreibende Methoden (`set_*`,
  `add_*`, `modify_*`, `remove_*`, `delete_*`, `make_reservation`,
  `do_reservation_action`, …) nur gezielt aufrufen: vorher die Doku der
  Methode lesen (`https://www.planyo.com/api.php?topic=<methode>`),
  alle Parameter vollständig und bewusst setzen, Wirkung vorher dem
  User beschreiben. Nie Methoden „durchprobieren“, nie mit Platzhalter-
  IDs wie 0 (manche Methoden gelten dann für die ganze Site).
- **Rechte eines Keys nur mit lesenden Methoden prüfen**, oder den User
  fragen.
- **Kein `admin_mode=true`** bei Buchungen: Er umgeht Verfügbarkeit und
  Regeln und erzeugt Konflikt-Buchungen.
- **Testbuchungen** nur in der Sandbox, mit erkennbarem Testnamen,
  `@example.com`-Adresse und `send_notifications=false`, danach sofort
  stornieren (`do_reservation_action`, `action=Cancel`, `is_quiet=true`).
- **Rate-Limits:** max. 30 Aufrufe in 3 s, 300/min, 3600/h, 12000/Tag
  (sonst Fehlercode 5). Massenabfragen bündeln, z. B. `get_rental_price`
  mit `start_time_2…_50`.
- **Nach jedem schreibenden Test** lesend prüfen, dass nichts anderes
  verändert wurde (Verfügbarkeit, Preise), und Auffälligkeiten sofort
  melden statt weiter zu probieren.
- **Keys nie ins Repo.** Sie gehören in Netlify-Umgebungsvariablen
  (`PLANYO_API_KEY`, ggf. `PLANYO_SANDBOX=1`) bzw. in die Einstellungen
  der Cloud-Umgebung.
- Die öffentliche Netlify-Function `netlify/functions/planyo.mjs` lässt
  nur die Methoden der Buchungsstrecke durch (Freigabeliste). Verwaltungs-
  Methoden wie `list_reservations` würden Kundendaten öffentlich machen
  und kommen dort nie hinein.

Gesammeltes Wissen zur Planyo-Einrichtung (Ressourcen, Formularfelder,
Preislogik, Trusted Shops, offene Punkte): `docs/planyo.md`.
