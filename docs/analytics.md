# Analytics, Einwilligung und Ereignisse

Stand: November 2026. Code: `src/analytics.ts`, `src/consent.ts`,
`src/components/CookieBanner.tsx`.

## Aufbau

- **Google Analytics 4**, Property „Yacht-Urlaub - GA4“, Mess-ID `G-CRH1CYGY1C`,
  für beide Domains (yacht-urlaub.net, yacht-holiday.net; GA4 trennt sie über
  den Hostnamen).
- **Direkt per gtag**, kein Google Tag Manager. Der alte Container
  `GTM-K5DMXXN` wird bewusst **nicht** eingebaut.
- **Google Ads** (Konto 617-671-8961) ist in GA4 verknüpft. Conversions werden
  aus den GA4-Schlüsselereignissen **importiert** — es gibt keine direkte
  `AW-…`-Conversion im Code.
- Planyo-Buchungen (`purchase`) sind **nicht** Teil dieses Stands (kommt mit
  dem Umbau der Customer Journey). Der Planyo-iFrame wird nicht angefasst.

## Einwilligung (Consent Mode v2, „Basic“)

| Zustand | gtag.js geladen | analytics_storage | ad_storage | ad_user_data | ad_personalization |
| --- | --- | --- | --- | --- | --- |
| Noch keine Wahl | nein | denied | denied | denied | denied |
| „Nur notwendige“ | nein | denied | denied | denied | denied |
| „Alle akzeptieren“ | ja | granted | granted | granted | granted |

- Der Default (alles `denied`) wird gesetzt, bevor gtag lädt.
- Ohne Einwilligung geht **kein** Request an Google, es gibt keine Cookies.
- Die Wahl steht in `localStorage` (`yu_cookie_consent`) und wird beim nächsten
  Besuch sofort wieder angewendet (`initAnalytics`).
- **Widerruf:** Footer-Link „Cookie-Einstellungen“ / „Cookie settings“ öffnet
  den Banner erneut. „Nur notwendige“ setzt alle vier Signale auf `denied`,
  stoppt die Messung (`ga-disable-G-CRH1CYGY1C`) und löscht die Google-Cookies
  (`_ga*`, `_gid`, `_gcl_*`, `_gac_*`).
- Der Seitenaufbau-Snapshot (`scripts/prerender.cjs`) lädt nie Analytics
  (`window.__PRERENDER__`).

## Ereignisse

| Ereignis | Wann | Parameter |
| --- | --- | --- |
| `page_view` | Bei jedem Seitenwechsel der SPA (aus `SEO.tsx`) und direkt nach „Alle akzeptieren“ | `page_title`, `page_location`, `page_path` |
| `generate_lead` | Nach **erfolgreich** abgesendetem Formular (zentral in `src/lib/sendForm.ts`, gilt für alle Formulare) | `form_name` |
| `contact_click` | Klick auf WhatsApp-, `tel:`- oder `mailto:`-Link (ein Listener in `App.tsx`) | `method`: `whatsapp` \| `phone` \| `email`; `link_location`: `fab` \| `side_contact` \| `header` \| `footer` \| `contact_page` \| `contact_section` \| `content` |
| `booking_start` | Klick auf „Jetzt buchen“ bei einem Package (öffnet das Planyo-Buchungsfenster) | `package_name`, `package_id`, `value` (Einstiegspreis pro Person), `currency` = `EUR` |
| `booking_search` | Suche im Planyo-Widget auf /buchen abgeschickt | – |

`generate_lead` – `form_name`-Werte: `anfrage` (Kontaktformular auf den
Seiten, u. a. Yoga), `kontakt` (Kontaktseite), `urlaubsplaner`,
`kabinen-buchung`, `charter-anfrage`, `skipper-anfrage`, `crew-anfrage`,
`partner-anfrage` (Reisebüro), `sailaway-anfrage`.

`link_location`: `fab` = schwebender WhatsApp-Button, `side_contact` =
Kontaktleiste am rechten Rand, `header`/`footer` = Navigation bzw. Fußzeile,
`contact_page` = Kontaktseite, `contact_section` = Kontaktbereich (`#kontakt`)
auf einer Seite, `content` = alles andere.

In GA4 als **Schlüsselereignisse** markiert: `generate_lead`, `contact_click`,
`booking_start`. Ereignisnamen nicht ändern, sonst bricht der Ads-Import.

## Testen

- URL mit `?ga_debug=1` öffnen, im Banner „Alle akzeptieren“ klicken →
  Ereignisse erscheinen in GA4 → Verwaltung → DebugView.
- Lokal im Browser: `window.dataLayer` in der Konsole ansehen
  (`Array.from(window.dataLayer.map(a => Array.from(a)))`).
- Vor der Einwilligung darf kein Request an `googletagmanager.com` /
  `google-analytics.com` gehen (DevTools → Netzwerk).
- uBlock Origin & Co. blockieren Google Analytics — zum Testen abschalten.
