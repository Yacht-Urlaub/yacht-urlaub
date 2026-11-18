// Gemeinsame Konstanten der Black-Friday-Aktion 2026 (Popup + Top-News-Karte).
// Nach END blenden sich beide automatisch aus.
export const BF_END = new Date('2026-11-27T23:59:59+01:00')
export const BF_CODE = 'BF2026'
export const bfActive = () => new Date() <= BF_END

type Lang = 'de' | 'en'
export const bfText: Record<Lang, {
  close: string; kicker: string; sub: string; off: string; allPkgs: string; withCode: string
  copy: string; copied: string; valid: string; dealsH: string; dealsT: string
  ctaPk: string; ctaPlan: string; srCopied: string
  newsTag: string; newsTitle: string; newsText: string; newsCta: string
  pkHref: string; planHref: string
}> = {
  de: {
    close: 'Schließen', kicker: 'Nur bis 27. November', sub: 'Segelurlaub 2027 zum Bestpreis',
    off: '-5 %', allPkgs: 'auf alle Package-Buchungen', withCode: 'mit Code',
    copy: 'Klicken zum Kopieren', copied: 'Kopiert ✓', valid: 'gültig bis 27.11.2026',
    dealsH: 'Black-Friday-Angebote', dealsT: 'für deine individuelle Yachtanfrage über den Urlaubsplaner',
    ctaPk: 'Zu den Packages', ctaPlan: 'Zum Urlaubsplaner', srCopied: 'Code BF2026 kopiert',
    newsTag: 'Black Friday', newsTitle: 'BLACK FRIDAY: -5 % AUF ALLE PACKAGES',
    newsText: 'Nur bis 27. November: Mit dem Code BF2026 sparen Sie 5 % auf alle Package-Buchungen für Ihren Segelurlaub 2027. Auch für Ihre individuelle Yachtanfrage über den Urlaubsplaner gibt es Black-Friday-Angebote.',
    newsCta: 'Zu den Packages', pkHref: '/buchen', planHref: '/urlaubsplaner',
  },
  en: {
    close: 'Close', kicker: 'Until 27 November only', sub: 'Sailing holidays 2027 at the best price',
    off: '-5 %', allPkgs: 'off all package bookings', withCode: 'with code',
    copy: 'Click to copy', copied: 'Copied ✓', valid: 'valid until 27 Nov 2026',
    dealsH: 'Black Friday deals', dealsT: 'for your individual yacht enquiry via the holiday planner',
    ctaPk: 'View packages', ctaPlan: 'To the holiday planner', srCopied: 'Code BF2026 copied',
    newsTag: 'Black Friday', newsTitle: 'BLACK FRIDAY: 5% OFF ALL PACKAGES',
    newsText: 'Until 27 November only: use code BF2026 to save 5% on every package booking for your 2027 sailing holiday. Black Friday deals are also available for your individual yacht enquiry via the holiday planner.',
    newsCta: 'View packages', pkHref: '/en/book-now', planHref: '/en/holiday-planner',
  },
}
