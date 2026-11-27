/**
 * Segeln ab Porto Heli — Destinationsseite mit eingebauter Buchungsstrecke.
 *
 * Vorlage: Artefakt "Segeln ab Porto Heli". Preise/Verfuegbarkeit stehen in
 * src/data/portoHeli.ts und werden woechentlich aus dem Booking Manager
 * aktualisiert (danach Snapshot neu erzeugen, siehe CLAUDE.md).
 *
 * Die Buchung ist eine verbindliche Anfrage: das Formular geht ueber
 * sendForm() ("porto-heli-buchung") per Mail an das Team, das innerhalb von
 * 24 Stunden bestaetigt. Es gibt keine Zahlung auf der Seite.
 */
import { useMemo, useRef, useState } from 'react'
import SEO from '../components/SEO'
import RecaptchaHinweis from '../components/RecaptchaHinweis'
import { Link } from '../router'
import { useLang, isEnHost, BASE_DE, BASE_EN, MAIL, yachtModelPath } from '../i18n'
import { sendForm } from '../lib/sendForm'
import { trackEvent } from '../analytics'
import { PH_CONFIG, PH_PHOTOS, PH_PRICES, PH_SEASON, PH_SKYSCANNER_URL, PH_YACHTS, type PhYacht } from '../data/portoHeli'

type Lang = 'de' | 'en'

// ───────────────────────── Preislogik ─────────────────────────
// Ein Preis fuer alles: Charter nach Rabatt + Nebenkosten + Skipper, als "schoener" Preis
// (Regel wie im Artefakt "Segeln ab Porto Heli", Stand 24.11.2026):
//  1) Liegt ein Ankerpreis X.490 / X.990 hoechstens 100 EUR darunter oder 150 EUR darueber,
//     wird er genommen (z. B. 12.076 -> 11.990)
//  2) sonst aufrunden auf die naechste Endung ...50 oder ...90 (z. B. 9.196 -> 9.250)
const nice = (n: number): number => {
  const anchors: number[] = []
  for (let k = Math.floor(n / 1000) - 1; k <= Math.floor(n / 1000) + 1; k++) anchors.push(k * 1000 + 490, k * 1000 + 990)
  const anchor = anchors.filter(v => v >= n - 100 && v <= n + 150).sort((x, y) => x - y)[0]
  if (anchor) return anchor
  const h = Math.floor(n / 100) * 100
  return [h + 50, h + 90, h + 150].find(v => v >= n)!
}
const dates = Object.keys(PH_PRICES).filter(d => d >= PH_SEASON[0] && d <= PH_SEASON[1]).sort()
const priceOf = (y: PhYacht, d: string | null): number | null => {
  const v = d ? PH_PRICES[d]?.[y.id] : undefined
  return v ? nice(v[1] + y.fee + PH_CONFIG.skipper) : null
}
const minPrice = (y: PhYacht) => Math.min(...dates.map(d => priceOf(y, d)).filter((p): p is number => p !== null))
const ppOf = (y: PhYacht, p: number) => Math.ceil(p / y.guests / 10) * 10 - 1 // z. B. 1.249 EUR p. P.
const plus7 = (d: string) => {
  const t = new Date(d + 'T12:00:00Z')
  t.setUTCDate(t.getUTCDate() + 7)
  return t.toISOString().slice(0, 10)
}
const allMins = PH_YACHTS.map(minPrice)
const lowest = Math.min(...allMins)
const highest = Math.max(...PH_YACHTS.flatMap(y => dates.map(d => priceOf(y, d)).filter((p): p is number => p !== null)))

const eur = (n: number, lang: Lang) =>
  lang === 'en' ? `€${n.toLocaleString('en-GB', { maximumFractionDigits: 0 })}` : `${n.toLocaleString('de-DE', { maximumFractionDigits: 0 })} €`
const MONTHS: Record<Lang, string[]> = {
  de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
}
const MON_SHORT_DE = ['Jan', 'Feb', 'März', 'Apr', 'Mai', 'Juni', 'Juli', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
const MON_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const dm = (d: string, lang: Lang) =>
  lang === 'en' ? `${+d.slice(8, 10)} ${MON_SHORT[+d.slice(5, 7) - 1]}` : `${d.slice(8, 10)}.${d.slice(5, 7)}.`
const dmy = (d: string, lang: Lang) => (lang === 'en' ? `${dm(d, lang)} ${d.slice(0, 4)}` : `${dm(d, lang)}${d.slice(0, 4)}`)
// Preisstand nur als Monat/Jahr, z. B. "Nov. 26"
const standText = (lang: Lang) => {
  const [y, m] = PH_CONFIG.stand.split('-')
  const mon = lang === 'en' ? MON_SHORT[+m - 1] : MON_SHORT_DE[+m - 1]
  return lang === 'en' ? `${mon} ${y.slice(2)}` : `${mon}.${y.slice(2)}`
}

// ───────────────────────── Texte ─────────────────────────
type Day = { d: string; nm: string; place: string; text: string; hi?: boolean; photo?: string; alt?: string }
type YText = { cabins: string; extra: string; pitch: string; alt: string }

const T = {
  de: {
    seoTitle: 'Segeln ab Porto Heli: Katamaran-Törn Peloponnes | Yacht-Urlaub',
    seoDesc: 'Katamaran-Törn ab Porto Heli, Peloponnes: Nafplio, Leonidio, Kyparissi, Gerakas, Monemvasia. Fr–Fr, neue Lagoon-Katamarane mit Skipper, Preis sofort sichtbar.',
    crumbDest: 'Destinationen', crumbGr: 'Griechenland', crumbHere: 'Porto Heli',
    badgeNew: 'Neu für 2027', badgeFri: 'Start jeden Freitag',
    eyebrow: 'Peloponnes · Argolischer Golf',
    h1: 'Segeln, wo Griechenland noch leise ist',
    lead: 'Von Porto Heli nach Nafplio, in die Bergdörfer Leonidio und Kyparissi, durch den Fjord von Gerakas bis zum Felsen von Monemvasia. Eine Woche auf brandneuen Lagoon-Katamaranen, mit Skipper.',
    ctaBook: 'Freie Wochen & Preise →', ctaRoute: 'Route ansehen',
    heroAlt: 'Lagoon-Katamaran unter Segeln vor der Küste der Peloponnes',
    trust: ['5 Sterne auf Google', 'Trusted Shops zertifiziert', 'Über 10 Jahre Erfahrung', 'Antwort innerhalb von 24 Stunden'],
    whyKick: 'Warum Porto Heli', whyH2: 'Das Revier, das noch kaum jemand kennt',
    whyIntro: 'Zwei Stunden von Athen, aber weit weg vom Trubel der Kykladen. Hier ankern Sie unter Kletterfelsen, essen in Fischtavernen ohne Reservierung und haben die Bucht oft für sich.',
    why: [
      ['Freitag statt Samstag', 'Sie legen ab, wenn andere noch packen. Ein Brückentag genügt, am Samstag liegen Sie schon in Nafplio.'],
      ['Geschützter Golf, kurze Schläge', 'Tagesetappen von 11 bis 25 Seemeilen. Viel Zeit zum Baden, Ankern und Entdecken.'],
      ['Orte mit Geschichte', 'Venezianisches Nafplio, die autofreie Felsenstadt Monemvasia, Dörfer, die man am besten vom Wasser aus erreicht.'],
      ['Katamarane Baujahr 2024–2026', 'Klimaanlage, Generator, Wassermacher und unser Skipper an Bord. Dazu ein Welcome Pack mit griechischen Spezialitäten.'],
    ] as [string, string][],
    sideH: 'Reisedaten',
    side: [
      ['Basis', 'Porto Heli, Peloponnes'], ['Wechseltag', 'Freitag (Check-in 17 Uhr, Check-out 9 Uhr)'], ['Dauer', '7 Nächte'],
      ['Strecke', 'ca. 125 sm'], ['Saison', 'April bis Oktober'], ['Yachten', 'Lagoon 38, 42, 43, 46'], ['Skipper', 'inklusive'],
      ['Anreise', 'Flug Athen, Fähre oder Transfer'],
    ] as [string, string][],
    sideFrom: 'Woche inkl. Skipper ab', sideCta: 'Termin wählen →',
    routeKick: 'Die Route · 7 Nächte · ca. 125 sm', routeH2: 'Porto Heli – Nafplio – Monemvasia – Porto Heli',
    routeIntro: 'Ein Routenvorschlag: Ihr Skipper passt ihn an Wind und Wünsche an.',
    mapAlt: 'Routenkarte: ab Porto Heli über Nafplio, Leonidio, Kyparissi und Gerakas nach Monemvasia, zurück über Kyparissi und Spetses; Verlängerung nach Elafonisos und Kythira',
    legend: ['Startmarina', 'Zwischenstopp', 'Hinweg', 'Rückweg', 'Verlängerung'],
    mapCaption: 'Routenvorschlag ab Porto Heli · nicht zur Navigation',
    routeDetails: 'Details zur Route ab Porto Heli', highlight: 'Highlight', photoBy: 'Foto',
    days: [
      { d: 'Freitag', nm: 'Anreise', place: 'Porto Heli', text: 'Check-in ab 17 Uhr, Einkaufen und der erste Ouzo an der Uferpromenade. Ihr Skipper erklärt die Yacht, die erste Nacht verbringen Sie in der Marina.', photo: 'ph1', alt: 'Bucht bei Porto Heli' },
      { d: 'Samstag', nm: 'ca. 24 sm', place: 'Nafplio', text: 'Quer über den Golf in Griechenlands erste Hauptstadt. Wasserburg Bourtzi, 999 Stufen hinauf zur Festung Palamidi und abends Tavernen in den venezianischen Gassen der Altstadt.', photo: 'naf3', alt: 'Nafplio, Wasserburg Bourtzi' },
      { d: 'Sonntag', nm: 'ca. 25 sm', place: 'Leonidio (Plaka)', text: 'Entlang der Küste nach Süden. Rote Kletterwände ragen über dem kleinen Hafen Plaka auf, die Fischtaverne liegt direkt am Kai.', photo: 'leo2', alt: 'Leonidio mit den roten Felswänden' },
      { d: 'Montag', nm: 'ca. 11 sm', place: 'Kyparissi', text: 'Kurzer Schlag, langer Badetag. Das Dorf war lange nur per Boot erreichbar und ist bis heute ein Geheimtipp mit glasklarem Wasser.' },
      { d: 'Dienstag', nm: 'ca. 20 sm', place: 'Gerakas & Monemvasia', text: 'Mittagspause im Fjord von Gerakas, abends der Höhepunkt der Woche: die autofreie Felsenstadt Monemvasia mit byzantinischen Gassen und Blick bis zum Horizont.', hi: true, photo: 'mon2', alt: 'Monemvasia, Felsen und Altstadt' },
      { d: 'Mittwoch', nm: 'ca. 20 sm', place: 'Kyparissi', text: 'Morgens hinauf zur Oberstadt, dann zurück nach Norden mit Badestopp in einer Bucht unter den Parnon-Bergen.' },
      { d: 'Donnerstag', nm: 'ca. 25 sm', place: 'Spetses & Porto Heli', text: 'Mittagsstopp auf der Insel Spetses mit ihren Kapitänshäusern und Pferdekutschen, abends zurück in die Basis.', photo: 'spe1', alt: 'Hafen von Spetses' },
      { d: 'Freitag', nm: 'Abreise', place: 'Porto Heli', text: 'Check-out bis 9 Uhr. Frühstück an Bord, dann mit Fähre oder Transfer zurück nach Athen.' },
    ] as Day[],
    extTitle: 'Elafonisos & Kythira', extKick: 'Verlängerungs-Tipp',
    extText: 'Hinter Kap Maleas warten der Simos-Strand auf Elafonisos und die Insel Kythira. Mit 10 bis 14 Nächten ohne Hetze machbar, wir planen das gerne mit Ihnen.',
    extAlt: 'Simos-Strand auf Elafonisos', extCta: 'Längeren Törn anfragen',
    fleetKick: 'Die Flotte in Porto Heli', fleetH2: 'Vier Lagoon-Katamarane, zwei davon nagelneu',
    modelLink: (m: string) => `Grundrisse und Details zur ${m}`,
    fleetIntro: 'Die Lagoon 38 und die Lagoon 43 kommen 2026 neu in die Flotte und bieten in ihrer Größe besonders viel Platz und Komfort. Alle Preise inklusive Yacht-Urlaub-Skipper.',
    catamaran: 'Katamaran', built: 'Baujahr', labCabins: 'Kabinen', labGuests: 'Gäste', labExtra: 'Extra', guestsUpTo: (n: number) => `bis ${n} + Skipper`,
    newBadge: 'Neu 2026', weekFrom: 'Woche inkl. Skipper', from: 'ab', pp: (p: string) => `${p} p. P.`, dates: 'Termine',
    yachts: {
      L38: { cabins: '3 Doppelkabinen, Owner-Version', extra: 'Klima, Generator, Wassermacher', pitch: 'Der kompakte Neuling mit großzügiger Eignerkabine. Ideal für Paare und Familien, unschlagbar im Preis.', alt: 'Lagoon 38 vor Anker' },
      L42: { cabins: '4 Doppelkabinen', extra: '5 Klimaanlagen, Espresso, Hydraulik-Gangway', pitch: 'Der bewährte Allrounder für Freundesgruppen: viel Platz zum kleinen Preis pro Person.', alt: 'Lagoon 42 vor Anker' },
      L43: { cabins: '3 Doppelkabinen + Pullman', extra: 'SUP und Sea Scooter inklusive', pitch: 'Brandneu, viel Lounge-Fläche, modernes Design. Für alle, die Komfort ohne Kompromiss wollen.', alt: 'Lagoon 43 vor Anker' },
      L46: { cabins: '4 Doppelkabinen', extra: 'Bugstrahlruder, TV, Wassermacher', pitch: 'Das Flaggschiff: vier Bäder, große Flybridge, Platz für die ganze Familie.', alt: 'Lagoon 46 vor Anker' },
    } as Record<string, YText>,
    bookKick: 'Termine & Preise 2027', bookH2: 'Yacht wählen, Woche wählen, buchen',
    bookIntro: (stand: string) => `Wählen Sie Ihre Yacht und Ihre Wunschwoche. Sie sehen sofort den Gesamtpreis für die Yacht inkl. Skipper. Wir prüfen die Verfügbarkeit und bestätigen Ihre Buchungsanfrage innerhalb von 24 Stunden. Erst mit der Buchungsbestätigung ist die Reise bestätigt. Verfügbarkeit Stand ${stand}.`,
    step1: '1 · Yacht', step2: '2 · Woche (Freitag bis Freitag)', step3: '3 · Skipper', step4: '4 · Ihre Daten',
    pillSub: (g: number, p: string): [string, string] => [`bis ${g} Gäste`, `ab ${p}`],
    freeWeeks: (n: number) => `${n} freie Wochen · Preis pro Woche inkl. Skipper`,
    fri: 'Fr', booked: 'belegt', legendFree: 'frei', legendChoice: 'Ihre Wahl', legendBooked: 'belegt',
    weekLabel: (d: string, p: string | null) => `Woche ab Freitag ${d}${p ? ', ' + p : ', belegt'}`,
    skipperTitle: 'Yacht-Urlaub-Skipper immer inklusive.',
    skipperText: 'Erfahren, deutschsprachig und revierkundig. Sie brauchen keinen Segelschein, Mitsegeln ist ausdrücklich erwünscht.',
    fName: 'Vor- und Nachname', fMail: 'E-Mail', fTel: 'Telefon', fPax: 'Anzahl Gäste', fAdr: 'Adresse (Straße, Hausnummer)', fPlz: 'PLZ', fOrt: 'Ort', fMsg: 'Nachricht (optional)',
    errWeek: 'Bitte wählen Sie eine freie Woche.',
    errFields: (max: number | null) => `Bitte prüfen Sie die markierten Felder${max ? ` (maximal ${max} Gäste)` : ''}.`,
    errTerms: 'Bitte bestätigen Sie AGB und Datenschutz.',
    errSend: 'Ihre Buchungsanfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut, rufen Sie uns an (+43 1 997 15 82) oder schreiben Sie an',
    sumH: 'Ihre Buchung', withSkipper: 'mit Skipper', noWeek: 'Noch keine Woche gewählt', nights: '7 Nächte',
    sumPick: (p: string) => `Ab ${p} pro Woche. Wählen Sie eine freie Woche, dann sehen Sie hier Ihren Endpreis.`,
    sumTotal: 'Gesamtpreis für die Yacht, alles inklusive',
    sumPp: (p: string, g: number) => `${p} p. P. bei ${g} Gästen`,
    incl: [
      'Inklusive: Yacht-Urlaub-Skipper, alle Charter-Nebenkosten, Dinghy mit Außenborder, Bettwäsche, Handtücher, Welcome Pack',
      'Bordkasse für Treibstoff, Häfen und Verpflegung (auch für den Skipper)',
      `Kaution ${PH_CONFIG.deposit.toLocaleString('de-DE')} €, vor Ort per Kreditkarte`,
    ],
    termsA: 'Ich akzeptiere die', terms: 'AGB', termsAnd: 'und die', privacy: 'Datenschutzbestimmungen',
    submit: 'Buchungsanfrage senden', sending: 'Wird gesendet …', noPay: 'Jetzt noch keine Zahlung. Die Zahlungsinformationen (50/50) erhalten Sie mit unserer Buchungsbestätigung.',
    doneBadge: 'Buchungsanfrage eingegangen',
    doneH: 'Danke für Ihre Buchungsanfrage!',
    doneText: 'Wir prüfen die Verfügbarkeit Ihrer gewählten Yacht und Woche. Eine Zusammenfassung Ihrer Anfrage erhalten Sie per E-Mail. Die Buchungsbestätigung mit allen Vertrags- und Zahlungsinformationen folgt innerhalb von 24 Stunden.',
    doneSummary: (y: string, when: string, pax: number, p: string) => `Ihre Anfrage: ${y}, ${when}, ${pax} Gäste, Gesamtpreis ${p} inklusive Skipper.`,
    doneWa: 'Fragen per WhatsApp', doneAgain: 'Weitere Woche ansehen',
    flyAd: 'Anzeige', flyH: 'Flüge nach Athen vergleichen',
    flyP: 'Am besten landen Sie am Freitag bis mittags (Check-in ab 17 Uhr). Zurück geht es nach dem Check-out um 9 Uhr, ein Rückflug ab dem frühen Nachmittag passt gut.',
    flyCta: 'Flüge bei Skyscanner ansehen →',
    flyNote: 'Partnerlink: Wenn Sie darüber buchen, erhalten wir eine kleine Provision. Für Sie ändert sich der Preis nicht.',
    travKick: 'Anreise', travH2: 'Von Athen nach Porto Heli',
    travIntro: 'Fliegen Sie nach Athen. Bis zum Check-in um 17 Uhr bleibt genug Zeit, ein Flug am Vormittag oder zu Mittag ist ideal.',
    trav: [
      { top: true, badge: 'Unser Tipp', h: 'Schnellfähre ab Piräus', p: 'Über Poros, Hydra und Spetses nach Porto Heli, ca. 2 Std. 40 Min. Schon die Anreise ist ein Ausflug durch den Saronischen Golf.', s: 'Vom Flughafen mit Metro oder Taxi nach Piräus. Fahrplan 2027 vor der Buchung prüfen.' },
      { h: 'Privat-Transfer', p: 'Direkt vom Flughafen Athen zur Yacht, bis 8 Personen, ca. 2,5 Stunden. Am bequemsten für Gruppen mit Gepäck.', s: '450 € pro Strecke, 900 € hin und zurück. Auf Wunsch bestellen wir den Transfer für Sie, zahlbar vor Ort (wie bei allen Extras).' },
      { h: 'Bus oder Mietwagen', p: 'KTEL-Bus ab Busbahnhof Kifissos nach Kranidi (ca. 2 Std. 45 Min.), dann Bus oder Taxi in 25 Minuten. Mit dem Mietwagen ca. 2,5 Stunden.', s: 'Die günstigste Variante, mit Umsteigen.' },
    ] as { top?: boolean; badge?: string; h: string; p: string; s: string }[],
    faqH: 'Häufige Fragen',
    faq: [
      ['Brauche ich einen Segelschein?', 'Nein. Unser Skipper ist bei diesem Törn immer dabei und übernimmt die Verantwortung für die Yacht. Mitsegeln ist ausdrücklich erwünscht.'],
      ['Ist die Buchung sofort verbindlich?', 'Ihre Buchungsanfrage ist verbindlich. Wir prüfen die Verfügbarkeit und bestätigen Ihnen die Buchung innerhalb von 24 Stunden. Erst mit unserer Buchungsbestätigung kommt der Vertrag zustande. Ist die Woche nicht mehr verfügbar, informieren wir Sie und unterbreiten Ihnen auf Wunsch eine Alternative. Sie zahlen nichts, solange keine Buchung bestätigt wurde.'],
      ['Was ist im Preis enthalten?', 'Ein Preis für alles rund um die Yacht: Katamaran für 7 Nächte, Yacht-Urlaub-Skipper, alle Charter-Nebenkosten, Dinghy mit Außenborder, Bettwäsche, Handtücher und Welcome Pack. Vor Ort zahlen Sie nur die Bordkasse (Treibstoff, Häfen, Verpflegung inkl. Skipper) und hinterlegen die Kaution.'],
      ['Wo schläft der Skipper?', 'In der Crew-Kabine. Die Gäste-Kabinen bleiben für Sie, deshalb nennen wir bei jeder Yacht die Zahl der Gäste ohne Skipper.'],
      ['Wie windig ist es im Argolischen Golf?', 'Der Golf ist gut geschützt und meist ruhiger als die Kykladen. Im Hochsommer weht nachmittags oft eine frische Brise, ideal zum Segeln.'],
      ['Wie bezahle ich?', 'Die Zahlung erfolgt in zwei Raten: 50 % bei Buchung mit der Buchungsbestätigung, die Sie kurz nach Ihrer Buchungsanfrage von uns erhalten, und die restlichen 50 % sechs Wochen vor Reiseantritt. Bei der Buchung auf dieser Seite wird noch nichts bezahlt.'],
    ] as [string, string][],
    ctaKick: 'Neu in der Flotte', ctaH2: 'Brandneue Lagoon 43: Ihre Wunschwoche ist noch frei',
    ctaText: 'Unser Neuzugang 2026 ist für die Saison 2027 noch in jeder Woche verfügbar. Sichern Sie sich Ihren Termin, bevor sich das Revier herumspricht. Fragen? Wir beraten Sie kostenlos und unverbindlich.',
    ctaPick: 'Lagoon 43 wählen →', ctaWa: 'WhatsApp +43 660 2652481', ctaPhone: 'Telefon +43 1 997 15 82 · Mo–Fr 10–19 Uhr',
    credits: 'Bildnachweise (Wikimedia Commons)', creditsRest: 'Yachtfotos: Eigner. Kartendaten © OpenStreetMap-Mitwirkende.',
    productName: 'Katamaran-Törn ab Porto Heli (Peloponnes)',
    termsPath: '/agb', privacyPath: '/datenschutz', destPath: '/destinationen', grPath: '/destinationen/griechenland',
    waText: 'Hallo! Ich interessiere mich für den Törn ab Porto Heli und hätte dazu noch eine Frage.',
  },
  en: {
    seoTitle: 'Sailing from Porto Heli: catamaran cruise, Peloponnese | Yacht-Holiday',
    seoDesc: 'Catamaran cruise from Porto Heli, Peloponnese: Nafplio, Leonidio, Kyparissi, Gerakas, Monemvasia. Fri–Fri, new Lagoon catamarans with skipper, price shown instantly.',
    crumbDest: 'Destinations', crumbGr: 'Greece', crumbHere: 'Porto Heli',
    badgeNew: 'New for 2027', badgeFri: 'Departures every Friday',
    eyebrow: 'Peloponnese · Argolic Gulf',
    h1: 'Sail where Greece is still quiet',
    lead: 'From Porto Heli to Nafplio, the mountain villages of Leonidio and Kyparissi, through the fjord of Gerakas to the rock of Monemvasia. One week on brand-new Lagoon catamarans, with a skipper.',
    ctaBook: 'Free weeks & prices →', ctaRoute: 'View the route',
    heroAlt: 'Lagoon catamaran under sail off the coast of the Peloponnese',
    trust: ['5 stars on Google', 'Trusted Shops certified', 'Over 10 years of experience', 'Reply within 24 hours'],
    whyKick: 'Why Porto Heli', whyH2: 'The sailing area hardly anyone knows yet',
    whyIntro: 'Two hours from Athens, yet far from the bustle of the Cyclades. Anchor beneath climbing cliffs, eat in fish tavernas without a reservation and often have the bay to yourself.',
    why: [
      ['Friday instead of Saturday', 'You cast off while others are still packing. One bridge day is enough, and by Saturday you are already in Nafplio.'],
      ['Sheltered gulf, short hops', 'Daily legs of 11 to 25 nautical miles. Plenty of time for swimming, anchoring and exploring.'],
      ['Places with history', 'Venetian Nafplio, the car-free rock town of Monemvasia, villages best reached from the water.'],
      ['Catamarans built 2024–2026', 'Air conditioning, generator, watermaker and our skipper on board. Plus a welcome pack with Greek specialities.'],
    ] as [string, string][],
    sideH: 'Trip facts',
    side: [
      ['Base', 'Porto Heli, Peloponnese'], ['Changeover day', 'Friday (check-in 5 pm, check-out 9 am)'], ['Duration', '7 nights'],
      ['Distance', 'approx. 125 nm'], ['Season', 'April to October'], ['Yachts', 'Lagoon 38, 42, 43, 46'], ['Skipper', 'included'],
      ['Getting there', 'Flight to Athens, ferry or transfer'],
    ] as [string, string][],
    sideFrom: 'Week incl. skipper from', sideCta: 'Choose a date →',
    routeKick: 'The route · 7 nights · approx. 125 nm', routeH2: 'Porto Heli – Nafplio – Monemvasia – Porto Heli',
    routeIntro: 'A suggested route: your skipper will adapt it to the wind and your wishes.',
    mapAlt: 'Route map: from Porto Heli via Nafplio, Leonidio, Kyparissi and Gerakas to Monemvasia, back via Kyparissi and Spetses; extension to Elafonisos and Kythira',
    legend: ['Start marina', 'Stopover', 'Outbound', 'Return', 'Extension'],
    mapCaption: 'Suggested route from Porto Heli · not for navigation',
    routeDetails: 'Route details from Porto Heli', highlight: 'Highlight', photoBy: 'Photo',
    days: [
      { d: 'Friday', nm: 'Arrival', place: 'Porto Heli', text: 'Check-in from 5 pm, shopping and your first ouzo on the waterfront. Your skipper shows you the yacht, and you spend the first night in the marina.', photo: 'ph1', alt: 'Cove near Porto Heli' },
      { d: 'Saturday', nm: 'approx. 24 nm', place: 'Nafplio', text: "Across the gulf to Greece's first capital. The Bourtzi water fortress, 999 steps up to the Palamidi fortress and, in the evening, tavernas in the Venetian lanes of the old town.", photo: 'naf3', alt: 'Nafplio, Bourtzi water fortress' },
      { d: 'Sunday', nm: 'approx. 25 nm', place: 'Leonidio (Plaka)', text: 'South along the coast. Red climbing walls tower over the little harbour of Plaka, and the fish taverna sits right on the quay.', photo: 'leo2', alt: 'Leonidio with its red rock walls' },
      { d: 'Monday', nm: 'approx. 11 nm', place: 'Kyparissi', text: 'A short hop and a long day for swimming. The village could only be reached by boat for a long time and is still an insider tip with crystal-clear water.' },
      { d: 'Tuesday', nm: 'approx. 20 nm', place: 'Gerakas & Monemvasia', text: 'Lunch break in the fjord of Gerakas, then the highlight of the week in the evening: the car-free rock town of Monemvasia with Byzantine lanes and views to the horizon.', hi: true, photo: 'mon2', alt: 'Monemvasia, rock and old town' },
      { d: 'Wednesday', nm: 'approx. 20 nm', place: 'Kyparissi', text: 'Up to the upper town in the morning, then back north with a swim stop in a bay beneath the Parnon mountains.' },
      { d: 'Thursday', nm: 'approx. 25 nm', place: 'Spetses & Porto Heli', text: 'Lunch stop on the island of Spetses with its captains’ houses and horse-drawn carriages, then back to base in the evening.', photo: 'spe1', alt: 'Harbour of Spetses' },
      { d: 'Friday', nm: 'Departure', place: 'Porto Heli', text: 'Check-out by 9 am. Breakfast on board, then back to Athens by ferry or transfer.' },
    ] as Day[],
    extTitle: 'Elafonisos & Kythira', extKick: 'Extension tip',
    extText: 'Beyond Cape Maleas you will find Simos beach on Elafonisos and the island of Kythira. Doable without rushing in 10 to 14 nights, and we are happy to plan it with you.',
    extAlt: 'Simos beach on Elafonisos', extCta: 'Enquire about a longer cruise',
    fleetKick: 'The fleet in Porto Heli', fleetH2: 'Four Lagoon catamarans, two of them brand new',
    modelLink: (m: string) => `Floor plans and details of the ${m}`,
    fleetIntro: 'The Lagoon 38 and the Lagoon 43 join the fleet new in 2026 and offer particularly generous space and comfort for their size. All prices include a Yacht-Urlaub skipper.',
    catamaran: 'Catamaran', built: 'built', labCabins: 'Cabins', labGuests: 'Guests', labExtra: 'Extras', guestsUpTo: (n: number) => `up to ${n} + skipper`,
    newBadge: 'New 2026', weekFrom: 'Week incl. skipper', from: 'from', pp: (p: string) => `${p} p. p.`, dates: 'Dates',
    yachts: {
      L38: { cabins: '3 double cabins, owner’s version', extra: 'A/C, generator, watermaker', pitch: 'The compact newcomer with a generous owner’s cabin. Ideal for couples and families, unbeatable value.', alt: 'Lagoon 38 at anchor' },
      L42: { cabins: '4 double cabins', extra: '5 air conditioners, espresso machine, hydraulic gangway', pitch: 'The proven all-rounder for groups of friends: lots of space at a low price per person.', alt: 'Lagoon 42 at anchor' },
      L43: { cabins: '3 double cabins + pullman', extra: 'SUP and sea scooter included', pitch: 'Brand new, lots of lounge space, modern design. For everyone who wants comfort without compromise.', alt: 'Lagoon 43 at anchor' },
      L46: { cabins: '4 double cabins', extra: 'Bow thruster, TV, watermaker', pitch: 'The flagship: four bathrooms, a large flybridge and room for the whole family.', alt: 'Lagoon 46 at anchor' },
    } as Record<string, YText>,
    bookKick: 'Dates & prices 2027', bookH2: 'Choose a yacht, choose a week, book',
    bookIntro: (stand: string) => `Choose your yacht and your preferred week. You see the total price for the yacht including skipper straight away. We check availability and confirm your booking request within 24 hours. Your trip is only confirmed once you receive our booking confirmation. Availability as of ${stand}.`,
    step1: '1 · Yacht', step2: '2 · Week (Friday to Friday)', step3: '3 · Skipper', step4: '4 · Your details',
    pillSub: (g: number, p: string): [string, string] => [`up to ${g} guests`, `from ${p}`],
    freeWeeks: (n: number) => `${n} free weeks · price per week incl. skipper`,
    fri: 'Fri', booked: 'booked', legendFree: 'free', legendChoice: 'Your choice', legendBooked: 'booked',
    weekLabel: (d: string, p: string | null) => `Week from Friday ${d}${p ? ', ' + p : ', booked'}`,
    skipperTitle: 'A Yacht-Urlaub skipper is always included.',
    skipperText: 'Experienced, German- and English-speaking and local knowledge of the area. You do not need a sailing licence, and joining in on the sailing is very welcome.',
    fName: 'First and last name', fMail: 'E-mail', fTel: 'Phone', fPax: 'Number of guests', fAdr: 'Address (street, number)', fPlz: 'Postcode', fOrt: 'City', fMsg: 'Message (optional)',
    errWeek: 'Please choose a free week.',
    errFields: (max: number | null) => `Please check the highlighted fields${max ? ` (maximum ${max} guests)` : ''}.`,
    errTerms: 'Please confirm the terms and the privacy policy.',
    errSend: 'Your booking request could not be sent. Please try again, call us (+43 1 997 15 82) or write to',
    sumH: 'Your booking', withSkipper: 'with skipper', noWeek: 'No week chosen yet', nights: '7 nights',
    sumPick: (p: string) => `From ${p} per week. Choose a free week and your final price appears here.`,
    sumTotal: 'Total price for the yacht, everything included',
    sumPp: (p: string, g: number) => `${p} p. p. with ${g} guests`,
    incl: [
      'Included: Yacht-Urlaub skipper, all charter extras, dinghy with outboard, bed linen, towels, welcome pack',
      'Kitty for fuel, harbour fees and provisions (also for the skipper)',
      `Deposit €${PH_CONFIG.deposit.toLocaleString('en-GB')}, paid on site by credit card`,
    ],
    termsA: 'I accept the', terms: 'terms and conditions', termsAnd: 'and the', privacy: 'privacy policy',
    submit: 'Send booking request', sending: 'Sending …', noPay: 'No payment yet. You will receive the payment information (50/50) with our booking confirmation.',
    doneBadge: 'Booking request received',
    doneH: 'Thank you for your booking request!',
    doneText: 'We are checking the availability of the yacht and week you chose. You will receive a summary of your request by e-mail. The booking confirmation with all contract and payment information follows within 24 hours.',
    doneSummary: (y: string, when: string, pax: number, p: string) => `Your request: ${y}, ${when}, ${pax} guests, total price ${p} including skipper.`,
    doneWa: 'Questions via WhatsApp', doneAgain: 'View another week',
    flyAd: 'Advertisement', flyH: 'Compare flights to Athens',
    flyP: 'Ideally you land on Friday by lunchtime (check-in from 5 pm). The way back starts after check-out at 9 am, so a flight from early afternoon fits well.',
    flyCta: 'View flights on Skyscanner →',
    flyNote: 'Partner link: if you book through it we receive a small commission. The price does not change for you.',
    travKick: 'Getting there', travH2: 'From Athens to Porto Heli',
    travIntro: 'Fly to Athens. There is plenty of time before check-in at 5 pm, so a flight in the morning or around noon is ideal.',
    trav: [
      { top: true, badge: 'Our tip', h: 'High-speed ferry from Piraeus', p: 'Via Poros, Hydra and Spetses to Porto Heli, approx. 2 h 40 min. The journey itself is already an excursion across the Saronic Gulf.', s: 'From the airport to Piraeus by metro or taxi. Check the 2027 timetable before booking.' },
      { h: 'Private transfer', p: 'Straight from Athens airport to the yacht, up to 8 people, approx. 2.5 hours. The most comfortable option for groups with luggage.', s: '€450 each way, €900 return. On request we will order the transfer for you, payable on site (like all extras).' },
      { h: 'Bus or rental car', p: 'KTEL bus from Kifissos bus station to Kranidi (approx. 2 h 45 min), then a bus or taxi for 25 minutes. By rental car approx. 2.5 hours.', s: 'The cheapest option, with a change.' },
    ] as { top?: boolean; badge?: string; h: string; p: string; s: string }[],
    faqH: 'Frequently asked questions',
    faq: [
      ['Do I need a sailing licence?', 'No. Our skipper is always on board on this cruise and takes responsibility for the yacht. Joining in on the sailing is very welcome.'],
      ['Is the booking binding straight away?', 'Your booking request is binding. We check availability and confirm the booking to you within 24 hours. The contract only comes into being with our booking confirmation. If the week is no longer available, we will let you know and, if you wish, offer you an alternative. You pay nothing as long as no booking has been confirmed.'],
      ['What is included in the price?', 'One price for everything around the yacht: catamaran for 7 nights, Yacht-Urlaub skipper, all charter extras, dinghy with outboard, bed linen, towels and welcome pack. On site you only pay the kitty (fuel, harbour fees, provisions incl. the skipper) and leave the deposit.'],
      ['Where does the skipper sleep?', 'In the crew cabin. The guest cabins stay yours, which is why we state the number of guests without skipper for each yacht.'],
      ['How windy is it in the Argolic Gulf?', 'The gulf is well sheltered and usually calmer than the Cyclades. In high summer a fresh breeze often blows in the afternoon, ideal for sailing.'],
      ['How do I pay?', 'Payment is made in two instalments: 50% on booking, with the booking confirmation that you receive from us shortly after your booking request, and the remaining 50% six weeks before the start of your trip. Nothing is paid when you book on this page.'],
    ] as [string, string][],
    ctaKick: 'New in the fleet', ctaH2: 'Brand-new Lagoon 43: your preferred week is still free',
    ctaText: 'Our 2026 newcomer is still available every week of the 2027 season. Secure your date before word gets around about the area. Questions? We advise you free of charge and without obligation.',
    ctaPick: 'Choose the Lagoon 43 →', ctaWa: 'WhatsApp +43 660 2652481', ctaPhone: 'Phone +43 1 997 15 82 · Mon–Fri 10 am–7 pm',
    credits: 'Photo credits (Wikimedia Commons)', creditsRest: 'Yacht photos: owners. Map data © OpenStreetMap contributors.',
    productName: 'Catamaran cruise from Porto Heli (Peloponnese)',
    termsPath: '/en/terms', privacyPath: '/en/data-privacy', destPath: '/en/destinations', grPath: '/en/destinations/greece',
    waText: 'Hello! I am interested in the cruise from Porto Heli and have a question.',
  },
}

const PH_PATH = { de: '/toerns/porto-heli', en: '/cruises/porto-heli' }

// ───────────────────────── Seite ─────────────────────────
export default function PortoHeliPage() {
  const lang = useLang() as Lang
  const t = T[lang]
  const base = isEnHost() ? BASE_EN : BASE_DE
  const pageUrl = `${base}${PH_PATH[lang]}`

  const [yachtId, setYachtId] = useState<PhYacht['id']>('L43')
  const [week, setWeek] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', mail: '', tel: '', pax: '4', adresse: '', plz: '', ort: '', msg: '' })
  const [agb, setAgb] = useState(false)
  const [bad, setBad] = useState<string[]>([])
  const [msg, setMsg] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState<null | { name: string; yacht: PhYacht; week: string; pax: number; price: number; mail: string }>(null)
  const started = useRef(false)

  const yacht = PH_YACHTS.find(v => v.id === yachtId)!
  const price = priceOf(yacht, week)
  const yt = t.yachts[yacht.id]

  const groups = useMemo(() => {
    const g: Record<number, string[]> = {}
    dates.forEach(d => { (g[+d.slice(5, 7) - 1] = g[+d.slice(5, 7) - 1] || []).push(d) })
    return g
  }, [])
  const freeCount = dates.filter(d => priceOf(yacht, d)).length

  function pickYacht(id: PhYacht['id'], scroll = false) {
    setYachtId(id)
    const y = PH_YACHTS.find(v => v.id === id)!
    if (week && !priceOf(y, week)) setWeek(null)
    if (scroll) document.getElementById('buchen')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function pickWeek(d: string) {
    setWeek(d)
    // GA4 booking_start: erste Wochenwahl je Seitenaufruf (Namen/Parameter siehe docs/analytics.md)
    if (!started.current) {
      started.current = true
      trackEvent('booking_start', {
        package_name: `${t.productName} – ${yacht.model}`, package_id: 'porto-heli',
        value: priceOf(yacht, d) ?? undefined, currency: 'EUR',
      })
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    const fails: string[] = []
    if (form.name.trim().length < 3) fails.push('name')
    if (!/^\S+@\S+\.\S+$/.test(form.mail.trim())) fails.push('mail')
    if (form.tel.replace(/\D/g, '').length < 6) fails.push('tel')
    if (form.adresse.trim().length < 3) fails.push('adresse')
    if (form.plz.trim().length < 3) fails.push('plz')
    if (form.ort.trim().length < 2) fails.push('ort')
    const pax = +form.pax
    if (!pax || pax < 1 || pax > yacht.guests) fails.push('pax')
    setBad(fails)
    let m = ''
    if (!price || !week) m = t.errWeek
    else if (fails.length) m = t.errFields(fails.includes('pax') ? yacht.guests : null)
    else if (!agb) m = t.errTerms
    setMsg(m)
    if (m || !price || !week) {
      const first = fails[0] ? document.getElementById('ph-f-' + fails[0]) : document.getElementById('ph-form')
      first?.scrollIntoView({ block: 'center' })
      if (fails[0]) (first as HTMLElement | null)?.focus()
      return
    }
    const v = PH_PRICES[week][yacht.id]
    setSending(true)
    const ok = await sendForm('porto-heli-buchung', {
      name: form.name.trim(), email: form.mail.trim(), telefon: form.tel.trim(), nachricht: form.msg.trim(),
      adresse: form.adresse.trim(), plz: form.plz.trim(), ort: form.ort.trim(),
      destination: 'Porto Heli – Peloponnes', yacht: yacht.model, yachtIntern: yacht.name, bookingManagerYachtId: yacht.bmId,
      von: week, bis: plus7(week), naechte: 7, gaeste: pax, endpreisKunde: price,
      listenpreis: v[0], rabattProzent: v[2], charterNachRabatt: v[1], operationsFee: yacht.fee,
      skipper: PH_CONFIG.skipper, rundung: price - (v[1] + yacht.fee + PH_CONFIG.skipper),
      preisstand: PH_CONFIG.stand, sprache: lang,
    })
    setSending(false)
    if (!ok) { setMsg(`${t.errSend} ${MAIL[lang]}.`); return }
    setDone({ name: form.name.trim(), yacht, week, pax, price, mail: form.mail.trim() })
    document.getElementById('buchen')?.scrollIntoView({ block: 'start' })
  }

  // ── SEO: Produkt mit Preisspanne + FAQ + Brotkrumen (alles aus denselben Daten wie die Sichtbarkeit) ──
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: t.productName,
        description: t.seoDesc,
        image: `${base}/images/porto-heli/hero.jpg`,
        url: pageUrl,
        brand: { '@type': 'Brand', name: lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub' },
        offers: {
          '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: lowest, highPrice: highest,
          offerCount: dates.length * PH_YACHTS.length, availability: 'https://schema.org/InStock', url: pageUrl,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: t.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t.crumbDest, item: `${base}${lang === 'en' ? '/destinations' : '/destinationen'}` },
          { '@type': 'ListItem', position: 2, name: t.crumbGr, item: `${base}${lang === 'en' ? '/destinations/greece' : '/destinationen/griechenland'}` },
          { '@type': 'ListItem', position: 3, name: t.crumbHere, item: pageUrl },
        ],
      },
    ],
  }

  const sideFromPrice = eur(lowest, lang)
  const waHref = `https://wa.me/436602652481?text=${encodeURIComponent(t.waText)}`

  return (
    <main className="ph" style={{ paddingTop: '72px' }}>
      <SEO title={t.seoTitle} description={t.seoDesc} image="/images/porto-heli/hero.jpg" schema={schema} />

      {/* Hero */}
      <section className="ph-hero" id="top">
        <img className="ph-scene" src="/images/porto-heli/hero.jpg" alt={t.heroAlt} fetchPriority="high" width={1600} height={900} />
        <div className="container ph-hero-in">
          <p className="ph-crumbs">
            <Link to={t.destPath}>{t.crumbDest}</Link> › <Link to={t.grPath}>{t.crumbGr}</Link> › {t.crumbHere}
          </p>
          <div className="ph-badges"><span className="ph-badge">{t.badgeNew}</span><span className="ph-badge dk">{t.badgeFri}</span></div>
          <p className="ph-eyebrow">{t.eyebrow}</p>
          <h1>{t.h1}</h1>
          <p className="ph-lead">{t.lead}</p>
          <div className="ph-ctas">
            <a className="btn btn-gold" href="#buchen">{t.ctaBook}</a>
            <a className="btn ph-ghost" href="#route">{t.ctaRoute}</a>
          </div>
        </div>
      </section>

      <div className="ph-trust"><div className="container">{t.trust.map(x => <span key={x}>{x}</span>)}</div></div>

      {/* Warum + Reisedaten */}
      <section className="ph-band">
        <div className="container ph-two">
          <div>
            <p className="ph-kick">{t.whyKick}</p>
            <h2>{t.whyH2}</h2>
            <p className="ph-intro">{t.whyIntro}</p>
            <div className="ph-why">
              {t.why.map(([h, p], i) => (
                <div key={h}>
                  <svg viewBox="0 0 24 24" aria-hidden="true">{WHY_ICONS[i]}</svg>
                  <span><b>{h}</b><p>{p}</p></span>
                </div>
              ))}
            </div>
          </div>
          <aside className="ph-side" aria-label={t.sideH}>
            <h3>{t.sideH}</h3>
            <table><tbody>{t.side.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table>
            <p className="from">{t.sideFrom}<b>{sideFromPrice}</b></p>
            <a className="btn btn-gold" href="#buchen">{t.sideCta}</a>
          </aside>
        </div>
      </section>

      {/* Route */}
      <section className="ph-band gray" id="route">
        <div className="container">
          <p className="ph-kick">{t.routeKick}</p>
          <h2>{t.routeH2}</h2>
          <p className="ph-intro">{t.routeIntro}</p>
          <div className="ph-route">
            <figure className="ph-map">
              <img src={`/images/porto-heli/route-map-${lang}.svg`} alt={t.mapAlt} width={840} height={1620} loading="lazy" />
            </figure>
            <div>
              <p className="ph-rt">{t.routeDetails}</p>
              <div className="ph-legend2">
                <span><svg viewBox="-26 -26 52 52" aria-hidden="true"><g fill="none" stroke="#2b2b2b" strokeWidth="3.2" strokeLinecap="round"><circle cx="0" cy="-17" r="6" /><path d="M0 -11V20M-11 -3H11M-19 5Q-17 21 0 21Q17 21 19 5" /></g></svg>{t.legend[0]}</span>
                <span><i className="dot" />{t.legend[1]}</span>
                <span><i className="ln" style={{ background: '#e3b83a' }} />{t.legend[2]}</span>
                <span><i className="ln" style={{ background: '#ef7b72' }} />{t.legend[3]}</span>
                <span><i className="ln dash" />{t.legend[4]}</span>
              </div>
              <p className="ph-mapcap">{t.mapCaption}</p>
              <ol className="ph-days">
                {t.days.map((d, i) => (
                  <li key={i} className={d.hi ? 'hi' : ''}>
                    <p className="d">{d.d}<span>{d.nm}</span></p>
                    <h3>{d.place}{d.hi && <em>{t.highlight}</em>}</h3>
                    <p>{d.text}</p>
                    {d.photo && (
                      <figure>
                        <img src={`/images/porto-heli/d-${d.photo}.jpg`} alt={d.alt} width={600} height={400} loading="lazy" />
                        <figcaption>{t.photoBy}: {PH_PHOTOS[d.photo].by}</figcaption>
                      </figure>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="ph-ext">
            <img className="ph-extimg" src="/images/porto-heli/d-ela2.jpg" alt={t.extAlt} width={520} height={347} loading="lazy" />
            <div><p className="ph-kick gold">{t.extKick}</p><h3>{t.extTitle}</h3><p>{t.extText}</p></div>
            <a className="btn ph-ghost" href="#kontakt">{t.extCta}</a>
          </div>
        </div>
      </section>

      {/* Flotte */}
      <section className="ph-band" id="yachten">
        <div className="container">
          <p className="ph-kick">{t.fleetKick}</p>
          <h2>{t.fleetH2}</h2>
          <p className="ph-intro">{t.fleetIntro}</p>
          <div className="ph-yachts">
            {PH_YACHTS.map(y => {
              const p = minPrice(y)
              const yy = t.yachts[y.id]
              return (
                <article key={y.id} className={`ph-yc${y.star ? ' star' : ''}`}>
                  <div className="ph-ph">
                    {y.star && <span className="ph-badge">{t.newBadge}</span>}
                    <img src={y.img} alt={yy.alt} width={600} height={400} loading="lazy" />
                  </div>
                  <div className="bd">
                    <div><h3>{y.model}</h3><p className="sub">{t.catamaran} · {t.built} {y.year}</p></div>
                    <ul>
                      <li><b>{t.labCabins}</b>{yy.cabins}</li>
                      <li><b>{t.labGuests}</b>{t.guestsUpTo(y.guests)}</li>
                      <li><b>{t.labExtra}</b>{yy.extra}</li>
                    </ul>
                    <p style={{ fontSize: '0.95rem' }}>{yy.pitch}</p>
                    {/* Neuer Tab: wer in der Buchung steckt, soll Auswahl und Wunschwoche nicht verlieren */}
                    <Link className="ml" to={yachtModelPath(y.model.toLowerCase().replace(/\s+/g, '-'), lang)} target="_blank" rel="noopener">{t.modelLink(y.model)} →</Link>
                    <div className="pz">
                      <div><small>{t.weekFrom}</small><strong>{t.from} {eur(p, lang)}</strong><small>{t.pp(eur(ppOf(y, p), lang))}</small></div>
                      <button type="button" className="btn btn-navy" onClick={() => pickYacht(y.id, true)}>{t.dates}</button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Buchung */}
      <section className="ph-band gray" id="buchen">
        <div className="container">
          <p className="ph-kick">{t.bookKick}</p>
          <h2>{t.bookH2}</h2>
          <p className="ph-intro">{t.bookIntro(standText(lang))}</p>

          {done ? (
            <div className="ph-done" role="status">
              <img src={done.yacht.img} alt={t.yachts[done.yacht.id].alt} width={800} height={533} />
              <span className="ph-badge">{t.doneBadge}</span>
              <h3>{t.doneH}</h3>
              <p>{t.doneText}</p>
              <p>{t.doneSummary(done.yacht.model, `${lang === 'en' ? 'Fri' : 'Fr'} ${dm(done.week, lang)} – ${lang === 'en' ? 'Fri' : 'Fr'} ${dmy(plus7(done.week), lang)}`, done.pax, eur(done.price, lang))}</p>
              <div className="ph-row">
                <a className="btn ph-wa" href={waHref} target="_blank" rel="noopener noreferrer">{t.doneWa}</a>
                <button type="button" className="btn btn-navy" onClick={() => { setDone(null); setWeek(null); setAgb(false); setMsg(''); document.getElementById('buchen')?.scrollIntoView() }}>{t.doneAgain}</button>
              </div>
            </div>
          ) : (
            <form className="ph-book" id="ph-form" noValidate onSubmit={submit}>
              <div>
                <div className="ph-card"><h3>{t.step1}</h3>
                  <div className="ph-pills">
                    {PH_YACHTS.map(v => (
                      <button key={v.id} type="button" className="ph-pill" aria-pressed={v.id === yachtId} onClick={() => pickYacht(v.id)}>
                        <b>{v.model}</b><span>{t.pillSub(v.guests, eur(minPrice(v), lang))[0]}</span><span>{t.pillSub(v.guests, eur(minPrice(v), lang))[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="ph-card"><h3>{t.step2} <small>{t.freeWeeks(freeCount)}</small></h3>
                  <div className="ph-months">
                    {Object.keys(groups).map(m => (
                      <div className="mo" key={m}>
                        <h4>{MONTHS[lang][+m]} 2027</h4>
                        <div className="ph-wks">
                          {groups[+m].map(d => {
                            const p = priceOf(yacht, d)
                            return (
                              <button key={d} type="button" className="ph-wk" disabled={!p} aria-pressed={week === d}
                                aria-label={t.weekLabel(dm(d, lang), p ? eur(p, lang) : null)} onClick={() => p && pickWeek(d)}>
                                <b>{t.fri} {dm(d, lang)}</b><span>{p ? eur(p, lang) : t.booked}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="ph-legend">
                    <span><i />{t.legendFree}</span>
                    <span><i style={{ background: 'var(--navy)', borderColor: 'var(--navy)' }} />{t.legendChoice}</span>
                    <span><i style={{ background: 'var(--gray-mid)' }} />{t.legendBooked}</span>
                  </div>
                </div>
                <div className="ph-card"><h3>{t.step3}</h3>
                  <div className="ph-incl">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M4 21c0-4 4-6 8-6s8 2 8 6" /><path d="M9 3h6" /></svg>
                    <p><b>{t.skipperTitle}</b> {t.skipperText}</p>
                  </div>
                </div>
                <div className="ph-card"><h3>{t.step4}</h3>
                  <div className="ph-formgrid">
                    <label className="ph-f">{t.fName}<input id="ph-f-name" className="ph-inp" autoComplete="name" required aria-invalid={bad.includes('name') || undefined} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                    <label className="ph-f">{t.fMail}<input id="ph-f-mail" className="ph-inp" type="email" autoComplete="email" required aria-invalid={bad.includes('mail') || undefined} value={form.mail} onChange={e => setForm({ ...form, mail: e.target.value })} /></label>
                    <label className="ph-f">{t.fTel}<input id="ph-f-tel" className="ph-inp" type="tel" autoComplete="tel" required aria-invalid={bad.includes('tel') || undefined} value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} /></label>
                    <label className="ph-f">{t.fPax}<input id="ph-f-pax" className="ph-inp" type="number" min={1} max={yacht.guests} required aria-invalid={bad.includes('pax') || undefined} value={form.pax} onChange={e => setForm({ ...form, pax: e.target.value })} /></label>
                  </div>
                  <div className="ph-formgrid ph-adr">
                    <label className="ph-f adr">{t.fAdr}<input id="ph-f-adresse" className="ph-inp" autoComplete="street-address" required aria-invalid={bad.includes('adresse') || undefined} value={form.adresse} onChange={e => setForm({ ...form, adresse: e.target.value })} /></label>
                    <label className="ph-f plz">{t.fPlz}<input id="ph-f-plz" className="ph-inp" autoComplete="postal-code" required aria-invalid={bad.includes('plz') || undefined} value={form.plz} onChange={e => setForm({ ...form, plz: e.target.value })} /></label>
                    <label className="ph-f ort">{t.fOrt}<input id="ph-f-ort" className="ph-inp" autoComplete="address-level2" required aria-invalid={bad.includes('ort') || undefined} value={form.ort} onChange={e => setForm({ ...form, ort: e.target.value })} /></label>
                  </div>
                  <label className="ph-f" style={{ marginTop: '0.9rem' }}>{t.fMsg}<textarea className="ph-inp" rows={3} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} /></label>
                  <RecaptchaHinweis />
                </div>
              </div>

              <aside className="ph-sum" aria-live="polite">
                <div className="pic"><img src={yacht.img} alt={yt.alt} width={600} height={400} /><span>{yacht.model}{yacht.star ? ` · ${t.newBadge}` : ''}</span></div>
                <h3>{t.sumH}</h3>
                <div><p className="who">{yacht.model} {t.withSkipper}</p>
                  <p className="when">{week && price ? `${lang === 'en' ? 'Fri' : 'Fr'} ${dm(week, lang)} – ${lang === 'en' ? 'Fri' : 'Fr'} ${dmy(plus7(week), lang)} · ${t.nights}` : t.noWeek}</p></div>
                {week && price ? (
                  <div className="price">{eur(price, lang)}<small>{t.sumTotal} · {t.sumPp(eur(ppOf(yacht, price), lang), yacht.guests)}</small></div>
                ) : (
                  <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,.75)' }}>{t.sumPick(eur(minPrice(yacht), lang))}</p>
                )}
                <ul>{t.incl.map(x => <li key={x}>{x}</li>)}</ul>
                <label className="chk"><input type="checkbox" checked={agb} onChange={e => setAgb(e.target.checked)} />
                  <span>{t.termsA} <Link to={t.termsPath}>{t.terms}</Link> {t.termsAnd} <Link to={t.privacyPath}>{t.privacy}</Link>.</span>
                </label>
                {msg && <p className="ph-err" role="alert">{msg}</p>}
                <button className="btn btn-gold" type="submit" disabled={!price || sending}>{sending ? t.sending : t.submit}</button>
                <p className="note">{t.noPay}</p>
              </aside>
            </form>
          )}
        </div>
      </section>

      {/* Anreise */}
      <section className="ph-band" id="anreise">
        <div className="container">
          <p className="ph-kick">{t.travKick}</p>
          <h2>{t.travH2}</h2>
          <p className="ph-intro">{t.travIntro}</p>
          {PH_SKYSCANNER_URL && (
            <div className="ph-fly">
              <div>
                <span className="ph-badge">{t.flyAd}</span>
                <h3>{t.flyH}</h3>
                <p>{t.flyP}</p>
                <small>{t.flyNote}</small>
              </div>
              <a className="btn btn-gold" href={PH_SKYSCANNER_URL} target="_blank" rel="sponsored noopener noreferrer"
                onClick={() => trackEvent('affiliate_click', { partner: 'skyscanner', link_location: 'anreise' })}>{t.flyCta}</a>
            </div>
          )}
          <div className="ph-trav">
            {t.trav.map(x => (
              <div key={x.h} className={x.top ? 'top' : ''}>
                {x.badge && <span className="ph-badge">{x.badge}</span>}
                <h3>{x.h}</h3><p>{x.p}</p><small>{x.s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="ph-band gray" id="faq">
        <div className="container" style={{ maxWidth: 900 }}>
          <h2 style={{ marginBottom: '1.4rem' }}>{t.faqH}</h2>
          {t.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="ph-band">
        <div className="container">
          <div className="ph-cta">
            <div><p className="ph-kick gold">{t.ctaKick}</p><h2>{t.ctaH2}</h2><p>{t.ctaText}</p></div>
            <div className="act">
              <button className="btn btn-gold" type="button" onClick={() => pickYacht('L43', true)}>{t.ctaPick}</button>
              <a className="btn ph-wa" href={waHref} target="_blank" rel="noopener noreferrer">{t.ctaWa}</a>
              <small>{t.ctaPhone}</small>
            </div>
          </div>
          <p className="ph-credits">
            {t.credits}: {Object.entries(PH_PHOTOS).map(([k, p], i) => (
              <span key={k}>{i > 0 ? ' · ' : ''}{t.days.find(d => d.photo === k)?.alt ?? t.extAlt}: {p.by}, <a href={p.url} target="_blank" rel="noopener noreferrer">{p.lic}</a></span>
            ))}. {t.creditsRest}
          </p>
        </div>
      </section>

      <style>{CSS}</style>
    </main>
  )
}

const WHY_ICONS = [
  <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></>,
  <path d="M3 12c3-3 6-3 9 0s6 3 9 0M3 17c3-3 6-3 9 0s6 3 9 0" />,
  <><path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>,
  <path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L3.3 9.2l6.1-.6z" />,
]

// Stile der Seite (Praefix ph-), Farben/Buttons kommen aus index.css
const CSS = `
.ph [id]{scroll-margin-top:90px}
.ph a:not(.btn){color:var(--blue)}
.ph h1,.ph h2,.ph h3,.ph p{margin:0}
.ph-hero{position:relative;color:#fff;background:var(--navy);overflow:hidden;min-height:min(78vh,700px);display:flex;align-items:flex-end}
.ph-scene{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 60%}
.ph-hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,27,47,.15) 30%,rgba(7,27,47,.85))}
.ph-hero-in{position:relative;z-index:2;padding-bottom:56px;padding-top:96px;width:100%}
.ph-crumbs{font-size:.8rem;color:rgba(255,255,255,.8);margin-bottom:14px!important}
.ph .ph-crumbs a{color:inherit;text-decoration:none}
.ph .ph-crumbs a:hover{text-decoration:underline}
.ph-badges{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px}
.ph-badge{display:inline-block;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:5px 10px;border-radius:3px;background:var(--gold);color:var(--navy)}
.ph-badge.dk{background:rgba(255,255,255,.16);color:#fff}
.ph-eyebrow{font-size:.75rem;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--blue-pale);text-shadow:0 1px 6px rgba(0,0,0,.5)}
.ph-hero h1{font-family:'DM Sans',sans-serif;font-size:clamp(2.1rem,5.2vw,3.6rem);line-height:1.05;margin:10px 0 14px;max-width:820px;text-wrap:balance;color:#fff}
.ph-lead{font-size:clamp(1.05rem,1.6vw,1.25rem);max-width:660px;color:rgba(255,255,255,.92)}
.ph-ctas{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.ph .btn.ph-ghost{background:transparent;color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.8)}
.ph .btn.ph-wa{background:#25d366;color:var(--navy);box-shadow:none}
.ph-trust{background:var(--gray-light);border-bottom:1px solid var(--gray-mid)}
.ph-trust .container{display:flex;flex-wrap:wrap;gap:8px 34px;justify-content:center;padding-top:14px;padding-bottom:14px;font-size:.88rem;font-weight:600;color:var(--navy)}
.ph-trust span::before{content:"✓ ";color:var(--blue)}
.ph-band{padding:clamp(40px,5vw,72px) 0}
.ph-band.gray{background:var(--gray-light)}
.ph-kick{font-size:.85rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--blue);margin-bottom:6px!important}
.ph-kick.gold{color:var(--gold-light)}
.ph h2{font-family:'DM Sans',sans-serif;font-size:clamp(1.5rem,2.6vw,1.9rem);line-height:1.2;color:var(--navy);margin-bottom:10px!important;text-wrap:balance}
.ph-intro{max-width:720px;margin-bottom:28px!important;color:#334155}
.ph-two{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:40px;align-items:start}
@media(max-width:960px){.ph-two{grid-template-columns:minmax(0,1fr)}}
.ph-why{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:22px}
.ph-why>div{display:flex;gap:14px}
.ph-why svg{flex:none;width:44px;height:44px;padding:11px;border-radius:50%;background:var(--navy);stroke:var(--gold);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ph-why b{display:block;color:var(--navy)}
.ph-why p{font-size:.95rem}
.ph-side{position:sticky;top:96px;background:var(--navy);color:#fff;border-radius:3px;padding:24px}
@media(max-width:960px){.ph-side{position:static}}
.ph-side h3{font-size:1.1rem;margin-bottom:12px!important;color:#fff}
.ph-side table{width:100%;border-collapse:collapse;font-size:.88rem}
.ph-side td{padding:8px 0;border-top:1px solid rgba(255,255,255,.12);vertical-align:top}
.ph-side td:first-child{color:rgba(255,255,255,.7);width:42%;padding-right:8px}
.ph-side .btn{width:100%;margin-top:18px}
.ph-side .from{margin-top:16px!important;font-size:.82rem;color:rgba(255,255,255,.8)}
.ph-side .from b{display:block;font-size:1.65rem;color:#fff;line-height:1.2}
.ph-route{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:40px;align-items:start}
@media(max-width:900px){.ph-route{grid-template-columns:minmax(0,1fr)}}
.ph-map{margin:0;position:sticky;top:88px;display:flex;flex-direction:column;align-items:center}
.ph-map>img{width:min(100%,calc((100vh - 108px) * 840 / 1620));height:auto;display:block;border-radius:4px;box-shadow:0 2px 12px rgba(0,0,0,.12)}
.ph-legend2{display:flex;flex-wrap:wrap;gap:6px 18px;background:#eeebe6;padding:12px 16px;border-radius:4px;font-style:italic;font-size:.88rem;color:#555;margin-bottom:6px}
.ph-legend2 span{display:inline-flex;align-items:center;gap:7px}
.ph-legend2 svg{width:20px;height:20px}
.ph-legend2 .dot{width:11px;height:11px;border-radius:50%;background:#0b5ea8;display:inline-block}
.ph-legend2 .ln{width:30px;height:4px;border-radius:2px;display:inline-block}
.ph-legend2 .dash{background:repeating-linear-gradient(90deg,#e3b83a 0 8px,transparent 8px 13px)}
.ph-mapcap{font-size:.8rem;color:var(--gray);margin-bottom:18px!important}
@media(max-width:900px){.ph-map{position:static}.ph-map>img{width:100%}}
.ph-rt{font-size:1.15rem;font-weight:700;font-style:italic;color:var(--blue);margin-bottom:16px!important}
.ph-days{list-style:none;margin:0 0 0 14px;padding:0;border-left:3px solid #f5c330}
.ph-days li{position:relative;padding:0 0 26px 30px}
.ph-days li::before{content:"";position:absolute;left:-10px;top:3px;width:12px;height:12px;border-radius:50%;background:#0b5ea8;border:3px solid #fff;box-shadow:0 0 0 1px #0b5ea8}
.ph-days .d{font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--blue)}
.ph-days .d span{color:var(--gray);font-weight:600;letter-spacing:0;text-transform:none;margin-left:8px}
.ph-days h3{font-family:'DM Sans',sans-serif;font-size:1.05rem;color:var(--navy);margin:2px 0 4px!important}
.ph-days h3 em{font-style:normal;margin-left:8px;font-size:.7rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:3px;background:var(--gold);color:var(--navy);vertical-align:2px}
.ph-days p{font-size:.93rem;line-height:1.75;color:#444}
.ph-days figure{margin:10px 0 0;position:relative;max-width:520px}
.ph-days figure img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:4px;display:block}
.ph-days figcaption{position:absolute;right:6px;bottom:6px;font-size:.66rem;color:#fff;background:rgba(0,0,0,.5);padding:1px 6px;border-radius:2px}
.ph-ext{margin-top:28px;background:var(--navy);color:#fff;border-radius:3px;padding:24px 28px;display:flex;flex-wrap:wrap;gap:16px 32px;align-items:center;justify-content:space-between}
.ph-ext>div{flex:1 1 360px}
.ph-extimg{width:260px;max-width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:3px;flex:0 1 260px}
.ph-ext h3{font-family:'DM Sans',sans-serif;font-size:1.3rem;margin:4px 0 6px!important;color:#fff}
.ph-ext p{color:rgba(255,255,255,.9)}
.ph-yachts{display:grid;grid-template-columns:repeat(auto-fit,minmax(255px,1fr));gap:20px}
.ph-yc{background:#fff;border:1px solid var(--gray-mid);border-radius:3px;overflow:hidden;display:flex;flex-direction:column}
.ph-yc.star{border-color:var(--navy)}
.ph-ph{position:relative;aspect-ratio:3/2;background:var(--navy-mid);overflow:hidden}
.ph-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.ph-ph .ph-badge{position:absolute;top:12px;left:12px;z-index:2}
.ph-yc .bd{padding:18px 20px 20px;display:flex;flex-direction:column;gap:10px;flex:1}
.ph-yc h3{font-family:'DM Sans',sans-serif;font-size:1.25rem;color:var(--navy);line-height:1.25}
.ph-yc .sub{font-size:.88rem;color:var(--gray)}
.ph-yc .ml{font-size:.9rem;font-weight:600;color:var(--blue);text-decoration:none}
.ph-yc .ml:hover,.ph-yc .ml:focus-visible{text-decoration:underline}
.ph-yc ul{list-style:none;margin:0;padding:10px 0;border-top:1px solid var(--gray-mid);border-bottom:1px solid var(--gray-mid);display:grid;gap:4px;font-size:.9rem}
.ph-yc li{display:grid;grid-template-columns:76px minmax(0,1fr);gap:0 8px}
.ph-yc li b{color:var(--navy)}
.ph-yc .pz{margin-top:auto;display:flex;justify-content:space-between;align-items:flex-end;gap:10px}
.ph-yc .pz small{display:block;font-size:.8rem;color:var(--gray)}
.ph-yc .pz strong{font-size:1.4rem;color:var(--navy);white-space:nowrap}
.ph-yc .btn{padding:12px 16px}
.ph-book{display:grid;grid-template-columns:minmax(0,1fr) 360px;gap:24px;align-items:start}
@media(max-width:960px){.ph-book{grid-template-columns:minmax(0,1fr)}}
.ph-card{background:#fff;border:1px solid var(--gray-mid);border-radius:3px;padding:22px;margin-bottom:18px}
.ph-card h3{font-family:'DM Sans',sans-serif;font-size:1.05rem;color:var(--navy);margin-bottom:12px!important;display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;align-items:baseline}
.ph-card h3 small{font-size:.82rem;font-weight:400;color:var(--gray)}
.ph-pills{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.ph-pill{font:inherit;text-align:left;padding:12px 14px;border-radius:3px;border:2px solid var(--gray-mid);background:#fff;color:var(--navy);cursor:pointer;min-height:44px}
.ph-pill[aria-pressed=true]{border-color:var(--navy);background:var(--blue-pale)}
.ph-pill b{display:block}.ph-pill span{display:block;font-size:.82rem;color:var(--gray);white-space:nowrap}
.ph-months{display:flex;flex-direction:column;gap:14px}
.ph-months h4{margin:0 0 6px;font-size:.8rem;font-weight:700;color:var(--gray);text-transform:uppercase;letter-spacing:.06em}
.ph-wks{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:8px}
.ph-wk{font:inherit;padding:8px 10px;border-radius:3px;border:2px solid var(--gray-mid);background:#fff;color:var(--navy);text-align:left;cursor:pointer;min-height:52px}
.ph-wk b{display:block;font-size:.82rem}.ph-wk span{font-size:.9rem;white-space:nowrap}
.ph-wk:hover:not(:disabled){border-color:var(--blue)}
.ph-wk[aria-pressed=true]{background:var(--navy);border-color:var(--navy);color:#fff}
.ph-wk:disabled{background:var(--gray-mid);color:var(--gray);cursor:not-allowed}
.ph-wk:disabled span{text-decoration:line-through}
.ph-legend{display:flex;gap:8px 18px;flex-wrap:wrap;margin-top:12px;font-size:.8rem;color:var(--gray)}
.ph-legend i{display:inline-block;width:13px;height:13px;border-radius:2px;vertical-align:-2px;margin-right:5px;border:2px solid var(--gray-mid)}
.ph-incl{display:flex;gap:12px;align-items:flex-start;background:var(--blue-pale);border-radius:3px;padding:14px 16px}
.ph-incl svg{flex:none;width:28px;height:28px;stroke:var(--navy);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.ph-formgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.ph-adr{margin-top:14px;grid-template-columns:minmax(0,2fr) minmax(0,1fr) minmax(0,2fr)}
@media(max-width:700px){.ph-adr{grid-template-columns:minmax(0,1fr) minmax(0,2fr)}.ph-adr .adr{grid-column:1/-1}}
.ph-f{display:flex;flex-direction:column;gap:5px;font-size:.88rem;font-weight:600;color:var(--navy)}
.ph-inp{font:inherit;font-size:16px;padding:12px 14px;border:1px solid #cbd5e1;border-radius:3px;color:#1e293b;background:#fff;width:100%}
.ph-inp[aria-invalid=true]{border-color:#dc2626}
.ph-err{font-size:.85rem;color:#fecaca;font-weight:600;background:rgba(220,38,38,.18);padding:8px 10px;border-radius:3px}
.ph-sum{position:sticky;top:96px;background:var(--navy);color:#fff;border-radius:3px;padding:24px;display:flex;flex-direction:column;gap:14px}
@media(max-width:960px){.ph-sum{position:static}}
.ph-sum h3{font-family:'DM Sans',sans-serif;font-size:1.2rem;color:#fff}
.ph-sum .pic{margin:-24px -24px 0;aspect-ratio:3/2;overflow:hidden;border-radius:3px 3px 0 0;position:relative}
.ph-sum .pic img{width:100%;height:100%;object-fit:cover;display:block}
.ph-sum .pic span{position:absolute;left:12px;bottom:10px;background:rgba(7,27,47,.78);color:#fff;font-size:.82rem;font-weight:700;padding:4px 10px;border-radius:3px}
.ph-sum .who{font-weight:700}.ph-sum .when{font-size:.88rem;color:rgba(255,255,255,.8)}
.ph-sum .price{font-size:2.1rem;font-weight:700;line-height:1.1;border-top:1px solid rgba(255,255,255,.18);padding-top:14px}
.ph-sum .price small{display:block;font-size:.8rem;font-weight:400;color:rgba(255,255,255,.8);margin-top:4px}
.ph-sum ul{margin:0;padding-left:18px;font-size:.8rem;color:rgba(255,255,255,.8);display:grid;gap:3px}
.ph-sum .chk{display:flex;gap:10px;font-size:.82rem;color:rgba(255,255,255,.92);cursor:pointer;align-items:flex-start}
.ph-sum .chk input{width:20px;height:20px;margin:0;flex:none;accent-color:var(--gold)}
.ph-sum .chk a{color:#fff}
.ph-sum .note{font-size:.8rem;color:rgba(255,255,255,.7);text-align:center}
.ph-sum .btn:disabled{background:#94a3b8;box-shadow:none;cursor:not-allowed}
.ph-done{background:#fff;border:2px solid var(--navy);border-radius:3px;padding:32px;display:flex;flex-direction:column;gap:14px;max-width:820px}
.ph-done img{width:100%;max-height:280px;object-fit:cover;border-radius:3px}
.ph-done .ph-badge{align-self:flex-start}
.ph-done h3{font-family:'DM Sans',sans-serif;font-size:1.6rem;color:var(--navy)}
.ph-row{display:flex;gap:12px;flex-wrap:wrap}
.ph-fly{display:flex;flex-wrap:wrap;gap:16px 28px;align-items:center;justify-content:space-between;background:var(--blue-pale);border-left:4px solid var(--gold);border-radius:3px;padding:20px 24px;margin-bottom:20px}
.ph-fly>div{flex:1 1 420px;display:flex;flex-direction:column;gap:6px;align-items:flex-start}
.ph-fly h3{font-family:'DM Sans',sans-serif;font-size:1.15rem;color:var(--navy)}
.ph-fly small{font-size:.78rem;color:var(--gray)}
.ph-trav{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px}
.ph-trav>div{background:#fff;border:1px solid var(--gray-mid);border-radius:3px;padding:22px;display:flex;flex-direction:column;gap:8px}
.ph-trav>div.top{border:2px solid var(--blue)}
.ph-trav h3{font-family:'DM Sans',sans-serif;font-size:1.15rem;color:var(--navy)}
.ph-trav small{font-size:.82rem;color:var(--gray)}
.ph-trav .ph-badge{align-self:flex-start}
.ph details{background:#fff;border:1px solid var(--gray-mid);border-radius:3px;padding:16px 20px;margin-bottom:10px}
.ph summary{font-weight:700;color:var(--navy);cursor:pointer}
.ph details p{margin-top:10px!important}
.ph-cta{background:var(--navy);color:#fff;border-radius:3px;padding:clamp(26px,4vw,44px);display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between}
.ph-cta h2{color:#fff}
.ph-cta p{color:rgba(255,255,255,.9);max-width:620px}
.ph-cta>div:first-child{flex:1 1 420px}
.ph-cta .act{display:flex;flex-direction:column;gap:10px}
.ph-cta .act small{font-size:.82rem;color:rgba(255,255,255,.75);text-align:center}
.ph-credits{margin-top:18px!important;font-size:.75rem;color:var(--gray)}
@media(prefers-reduced-motion:reduce){.ph *{scroll-behavior:auto}}
`
