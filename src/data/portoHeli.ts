// Daten der Seite "Segeln ab Porto Heli" (src/pages/PortoHeliPage.tsx).
//
// WOECHENTLICH AKTUALISIEREN (aus dem Booking Manager), danach Snapshot neu
// erzeugen — siehe CLAUDE.md:
//   - PRICES: Freitag -> Yacht -> [Listenpreis, Preis nach Rabatt, Rabatt %].
//             Fehlt eine Yacht bei einem Datum, gilt die Woche als belegt.
//   - CONFIG.stand: Datum des Preisstands (wird auf der Seite angezeigt).
// Der Endpreis fuer Kunden ist EIN Preis fuer alles:
//   Charter nach Rabatt + Nebenkosten (fee) + Skipper, aufgerundet auf ...90
//   (siehe priceOf() in der Seite).

export type PhYacht = {
  id: 'L38' | 'L42' | 'L43' | 'L46'
  bmId: string // Booking-Manager-ID, nur intern (Buchungsmail)
  name: string // Schiffsname, nur intern (Buchungsmail), nicht auf der Seite
  model: string
  year: number
  star: boolean // "Neu 2026"
  guests: number // Gaeste ohne Skipper
  fee: number // Nebenkosten (Operations-Fee) in EUR
  img: string
}

export const PH_CONFIG = {
  stand: '2026-11-24', // Preisstand (ISO)
  skipper: 1950, // Yacht-Urlaub-Skipper, fix inklusive (EUR)
  deposit: 4000, // Kaution (EUR)
}

export const PH_YACHTS: PhYacht[] = [
  { id: 'L38', bmId: '8040812180000105853', name: 'AYAYU 1', model: 'Lagoon 38', year: 2026, star: true, guests: 6, fee: 434, img: '/images/porto-heli/y-l38.jpg' },
  { id: 'L42', bmId: '3480301438005853', name: 'AURA', model: 'Lagoon 42', year: 2024, star: false, guests: 8, fee: 434, img: '/images/porto-heli/y-l42.jpg' },
  { id: 'L43', bmId: '4743671596705853', name: 'SERENITY', model: 'Lagoon 43', year: 2026, star: true, guests: 6, fee: 496, img: '/images/porto-heli/y-l43.jpg' },
  { id: 'L46', bmId: '4211621438005853', name: 'WINDEA', model: 'Lagoon 46', year: 2025, star: false, guests: 8, fee: 496, img: '/images/porto-heli/y-l46.jpg' },
]

/** Erste und letzte Anreise der Saison (Rueckgabe spaetestens 29.10.) */
export const PH_SEASON: [string, string] = ['2027-04-02', '2027-10-22']

export const PH_PRICES: Record<string, Record<string, [number, number, number]>> = {
  '2027-03-26': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-04-02': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-04-09': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-04-16': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-04-23': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10] },
  '2027-04-30': { L46: [9800, 8820, 10], L43: [7500, 6750, 10], L42: [6400, 5760, 10], L38: [5739, 5165, 10] },
  '2027-05-07': { L46: [9800, 8820, 10], L43: [7500, 6750, 10], L42: [6400, 5760, 10], L38: [5739, 5165, 10] },
  '2027-05-14': { L46: [9800, 8820, 10], L43: [7500, 6750, 10] },
  '2027-05-21': { L46: [9800, 8820, 10], L43: [7500, 6750, 10] },
  '2027-05-28': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L38: [6314, 5683, 10] },
  '2027-06-04': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-06-11': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-06-18': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-06-25': { L43: [9000, 8100, 10], L38: [6314, 5683, 10] },
  '2027-07-02': { L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-07-09': { L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-07-16': { L46: [12600, 11340, 10], L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-07-23': { L46: [12600, 11340, 10], L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-07-30': { L46: [12600, 11340, 10], L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-08-06': { L46: [12600, 11340, 10], L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-08-13': { L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-08-20': { L43: [10700, 9630, 10], L38: [6889, 6200, 10] },
  '2027-08-27': { L46: [12600, 11340, 10], L43: [10700, 9630, 10], L42: [9900, 8910, 10], L38: [6889, 6200, 10] },
  '2027-09-03': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-09-10': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-09-17': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-09-24': { L46: [11700, 10530, 10], L43: [9000, 8100, 10], L42: [7800, 7020, 10], L38: [6314, 5683, 10] },
  '2027-10-01': { L46: [9800, 8820, 10], L43: [7500, 6750, 10], L42: [6400, 5760, 10], L38: [5739, 5165, 10] },
  '2027-10-08': { L46: [9800, 8820, 10], L43: [7500, 6750, 10], L42: [6400, 5760, 10], L38: [5739, 5165, 10] },
  '2027-10-15': { L46: [9800, 8820, 10], L43: [7500, 6750, 10], L38: [5739, 5165, 10] },
  '2027-10-22': { L46: [9800, 8820, 10], L43: [7500, 6750, 10], L42: [6400, 5760, 10], L38: [5739, 5165, 10] },
  '2027-10-29': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-11-05': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-11-12': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-11-19': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
  '2027-11-26': { L46: [7900, 7110, 10], L43: [5500, 4950, 10], L38: [4830, 4347, 10], L42: [4500, 4050, 10] },
}

/** Fotonachweise (Wikimedia Commons) — Pflicht laut Lizenz */
export const PH_PHOTOS: Record<string, { by: string; lic: string; url: string }> = {
  ph1: { by: 'dronepicr', lic: 'CC BY 2.0', url: 'https://commons.wikimedia.org/wiki/File:Cove_in_Hinitsa,_Porto_Heli,_Greece_(48760330952).jpg' },
  naf3: { by: 'Giles Laurent', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:1007_Bourtzi_Castle_in_Nafplio_Photo_by_Giles_Laurent.jpg' },
  leo2: { by: 'Herbert Ortner', lic: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:Leonidi_from_west_1993.jpg' },
  mon2: { by: 'DimitrisP67', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Monemvasia_(photo_5).jpg' },
  spe1: { by: 'Matankic', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Spetses_boats.jpg' },
  ela2: { by: 'DimitrisP67', lic: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Elafonisos_island_Small_Simos_beach.jpg' },
}

/**
 * Skyscanner-Affiliate-Link fuer "Anreise" (Fluege nach Athen).
 * Leer = der Hinweiskasten wird nicht angezeigt. Link hier eintragen, dann
 * erscheint er automatisch (als "Anzeige" gekennzeichnet, rel="sponsored").
 */
export const PH_SKYSCANNER_URL = ''
