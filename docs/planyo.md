# Planyo-Anbindung: Wissensstand

Stand: 29.10.2026. Ermittelt in der Sandbox (`sandbox.planyo.com`, Kopie
der Echtdaten). Sicherheitsregeln für API-Aufrufe stehen in `CLAUDE.md`.

## Ziel

Die komplette Customer Journey wird neu gebaut: Package-Seite mit
Direktbuchung über die Planyo-REST-API. Das Planyo-Iframe auf `/buchen`
(`public/buchen-widget.html`) und das Planyo-Buchungsformular
(`booking.php`-Links in `src/pages/PackageDetailPage.tsx`) fallen weg.
Prototyp am Beispiel Dalmatien: Claude-Artefakt „Planyo-Modul Dalmatien“.

## Zugänge

- REST-API: `https://www.planyo.com/rest/` bzw.
  `https://sandbox.planyo.com/rest/`. Doku je Methode:
  `https://www.planyo.com/api.php?topic=<methode>`.
- Sandbox und Live haben getrennte API-Keys (Sandbox-Key funktioniert auf
  Live nicht). Keys liegen beim User, nie im Repo.
- MCP-Connector `https://www.planyo.com/mcp/?key=…` (Live): 12 Tools
  (Verfügbarkeit, Preis, Warenkorb, Reservierung anlegen/stornieren,
  Webhooks). Kann keine Preise oder Einstellungen ändern. In Claude als
  Connector nur mit Key in der URL anlegen, sonst „needs reconnect“.
- Cloud-Umgebung braucht `www.planyo.com` und `sandbox.planyo.com` unter
  Allowed domains.

## Ressourcen (Packages)

| ID | Name |
|---|---|
| 139296 | Istrien |
| 139297 | Dalmatien |
| 139385 | Einsteiger |
| 139428 | Karibik-BVI |
| 140041 | Kornaten |
| 140043 | Karibik-Grenadinen |

`list_resources` liefert 9 Ressourcen, weitere dort nachsehen.

Dalmatien (`get_resource_info`): 13 Plätze (Planyo zählt **Personen**),
Dauer 7/10/14 Tage (`rental_time_value` 168/240/336), Übernachtungs-
Ressource, Anzahlung 25 %, Grundpreis 690 EUR p.P. (wird von Saisonregeln
überschrieben).

## Saisonen und Starttage (Site-weit, `get_resource_seasons`)

`start_weekday_flags`: Bitmaske So=1, Mo=2, Di=4, Mi=8, Do=16, Fr=32,
Sa=64. 72 = Sa+Mi, 64 = nur Sa.

- 30.4.–26.6. und 6.9.–31.10.: Start Sa oder Mi
- 27.6.–5.9.: Start nur Sa

## Preise Dalmatien 2027 (p.P., 7 Tage, gemessen mit `get_rental_price`)

Mai 620 · Juni 740 · Juli 840 · 31.7.–14.8. 870 · 21.8.–4.9. 840 ·
Anfang Sept. 780 · ab 22.9. 690. 10 und 14 Tage anteilig (×10/7, ×2).
Preis ist linear in der Personenzahl.

## Formularfelder (`get_form_items`, resource_id 139297)

Als `rental_prop_<name>` an `get_rental_price` / `make_reservation`:

| Feld | Werte | Preiswirkung |
|---|---|---|
| `Yacht_Typ` | `Monohull/Einrumpfyacht`, `Segel-Katamaran` | Katamaran ×1,5 auf alles außer Einzelkabine |
| `Comfort_Package` | `yes` / `no` | 60 EUR p.P. und Woche |
| `Spritpauschale` | `yes` / `no` | 40 EUR p.P. und Woche |
| `Premium_Yacht_Upgrade` | `yes` / `no` | 350 EUR p.P. und Woche |
| `Bord_Service` | `yes` / `no` | 390 EUR p.P. und Woche |
| `Einzelkabine_n_` | 0–5 | 550 EUR je Kabine und Woche |
| `agreement` | `yes` | Pflicht (AGB) |
| `captcha` | beliebig | Pflicht, wird per API aber nicht geprüft |
| `Voucher` | Code | Gutschein |

Checkboxen wirken nur mit `yes` (oder `on`), **nicht** mit `true` oder `1`.

Comfort-Package und Spritpauschale sollen künftig zusammengelegt werden
(Prototyp: 100 EUR p.P. und Woche), in Planyo noch zwei Felder.

Standardfelder, Pflicht: `first_name`, `last_name`, `email`, `address`,
`city`, `zip`, `country` (ISO-2), Telefon (`phone_prefix`,
`phone_number`).

## Zusatzprodukte (`list_additional_products`)

Für Dalmatien freigegeben, pauschal pro Buchung, Anhängen nach der
Buchung mit `set_reservation_products` (`product_<id>=<anzahl>`,
`recalculate_price=true`):

- 25643 SUP (Stand-Up-Paddle), 150 EUR, max. 2
- 25644 BBQ-Grill, 100 EUR, max. 1
- 27901 Törnbesprechung mit Skipper, 100 EUR

## Verfügbarkeit

- Vor dem Absenden `can_make_reservation` aufrufen. Liefert verständliche
  Gründe auf DE/EN (`language=EN`), z. B. falscher Starttag („kann nur
  beginnen am: Mittwoch, Samstag“), zu viele Personen („Nur 13 Einheiten“),
  Mindestdauer, Vergangenheit, max. 548 Tage im Voraus.
- `is_resource_available` liefert `quantity_available` (freie Plätze),
  übersah am 28.10. aber eine (von uns verursachte) Sperre. Für die
  Anzeige im Kalender ok, für die Entscheidung „buchbar“ nicht.
- `get_resource_usage_for_month` (`year`, `month`) funktioniert,
  `get_resource_usage` braucht andere Parameter.

## Buchung (am 29.10.2026 komplett in der Sandbox getestet)

1. `make_reservation` ohne `admin_mode`, mit allen Pflichtfeldern,
   `rental_prop_agreement=yes`, `rental_prop_captcha=<beliebig>`
   (Planyo prüft den Wert per API nicht), `send_notifications` bewusst
   setzen, `refcode` für die Herkunft. Antwort: `reservation_id`,
   `status`, `total_price` (stimmte exakt mit unserer Berechnung) und in
   `user_text` die komplette Planyo-Bestätigungsseite als HTML.
2. Zusatzprodukte: `set_reservation_products` mit `product_<id>=<n>`,
   `recalculate_price=true`. Antwort `new_price`.
3. Freie Plätze sinken sofort (13 → 7 bei 6 Personen).
4. `get_reservation_data`: Status, Preis, Produkte, `ppp_rs`-Token.
5. Links und Beträge über `process_template` mit `reservation_id`
   (Tags aus https://www.planyo.com/faq.php?q=204):
   - `$(online_payment_amount)` Anzahlung (25 %)
   - `$(payment_form_url:$(online_payment_amount))` Link zur Planyo-
     Zahlungsseite für die Anzahlung, `$(payment_form_url_outstanding)`
     für den Restbetrag
   - `$(details_url)`, `$(cancel_url)`, `$(amount_outstanding)`
6. Bestätigen/Stornieren: `do_reservation_action` mit `action=Confirm`
   bzw. `Cancel`, `is_quiet=true` unterdrückt Mails.

`get_reservation_payment_amount` meldete „Reservation not found“,
`list_reservation_payments` funktioniert.

Status-Bits (`$(status_code)`, prüfen mit `$(has_status:x)`):
1 = reserviert, 2 = (gesetzt mit der Bestätigung), 4 = bestätigt,
8 = vom Admin storniert, 128 = Konflikt. Beobachtet: neu 1, bestätigt 7,
storniert 11.

## Bezahlung

Stripe Checkout über Planyo (`payment-stripe-checkout-init.php`).
Planyo schlägt 2 % für Online-Zahlung auf (`online_payment_surcharge`).
Nach der Zahlung führt Stripe auf eine Planyo-Seite zurück
(`success_url` ist signiert, nicht änderbar). Alternativ Überweisung
nach Rechnung.

## Gutscheine

`rental_prop_Voucher=<code>` in `get_rental_price` prüft den Code sofort
(ungültig: Fehlercode 3 mit Klartextmeldung). Gutscheine verwalten:
`list_vouchers`.

## Trusted Shops

Shop-ID `X8C58FF076608DD16CD36F796D67C0862` (öffentlich, steht auch in
`index.html`). Die Planyo-Bestätigungsseite enthält bei Status genau 1
oder 4 einen versteckten Block für die Bewertungseinladung:

```html
<div id="trustedShopsCheckout" style="display: none;">
  <span id="tsCheckoutOrderNr">…</span>
  <span id="tsCheckoutBuyerEmail">…</span>
  <span id="tsCheckoutOrderAmount">…</span>
  <span id="tsCheckoutOrderCurrency">EUR</span>
  <span id="tsCheckoutOrderPaymentType">…</span>
  <span id="tsCheckoutOrderEstDeliveryDate">…</span>
</div>
```

Für die neue Bestätigungsseite übernehmen. Im Test bestätigt:

- Planyo füllt `EstDeliveryDate` mit `12.06.2027`. Trusted Shops erwartet
  `YYYY-MM-DD`; auf unserer Seite korrekt formatieren.
- `OrderAmount` ist der Preis vor Zusatzprodukten (5590 statt 5840).
  Auf unserer Seite den Endpreis nach `set_reservation_products` nehmen.
- Die Bedingung „Status genau 1 oder 4“ trifft nur direkt nach der
  Buchung zu (Status 1); bestätigte Buchungen haben 7.
- Das Trustbadge-Skript ist in der SPA schon geladen und muss den Block
  nach der Buchung neu erkennen (in der Umsetzung lösen).

## Offen

- Webhooks (`add_notification_callback`) für Mail ans Büro und Tracking.
