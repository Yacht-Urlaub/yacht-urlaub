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
  newsCta: string
  card: {
    kicker: string; head: string; sub: string; badge: string; text: string; codeLabel: string
    cd: (d: number, h: number, m: number) => string; imgAlt: string
  }
  pkHref: string; planHref: string
}> = {
  de: {
    close: 'Schließen', kicker: 'Nur bis 27. November', sub: 'Segelurlaub 2027 zum Bestpreis',
    off: '-5 %', allPkgs: 'auf alle Package-Buchungen', withCode: 'mit Code',
    copy: 'Klicken zum Kopieren', copied: 'Kopiert ✓', valid: 'gültig bis 27.11.2026',
    dealsH: 'Black-Friday-Angebote', dealsT: 'für deine individuelle Yachtanfrage über den Urlaubsplaner',
    ctaPk: 'Zu den Packages', ctaPlan: 'Zum Urlaubsplaner', srCopied: 'Code BF2026 kopiert',
    newsCta: 'Zu den Packages', pkHref: '/buchen', planHref: '/urlaubsplaner',
    card: {
      kicker: 'Nur bis 27. November', head: 'BLACK FRIDAY', sub: 'Segelurlaub 2027 zum Bestpreis', badge: 'PACKAGES',
      text: '5 % Rabatt auf alle Package-Buchungen. Black-Friday-Angebote gibt es auch für deine Yachtanfrage.',
      codeLabel: 'Dein Code',
      cd: (d, h, m) => `Noch ${d} ${d === 1 ? 'Tag' : 'Tage'} ${h} Std. ${m} Min.`,
      imgAlt: 'Freunde baden im Meer vor einer Segelyacht',
    },
  },
  en: {
    close: 'Close', kicker: 'Until 27 November only', sub: 'Sailing holidays 2027 at the best price',
    off: '-5 %', allPkgs: 'off all package bookings', withCode: 'with code',
    copy: 'Click to copy', copied: 'Copied ✓', valid: 'valid until 27 Nov 2026',
    dealsH: 'Black Friday deals', dealsT: 'for your individual yacht enquiry via the holiday planner',
    ctaPk: 'View packages', ctaPlan: 'To the holiday planner', srCopied: 'Code BF2026 copied',
    newsCta: 'View packages', pkHref: '/en/book-now', planHref: '/en/holiday-planner',
    card: {
      kicker: 'Until 27 November only', head: 'BLACK FRIDAY', sub: 'Sailing holidays 2027 at the best price', badge: 'PACKAGES',
      text: '5% off all package bookings. Black Friday deals are also available for your yacht enquiry.',
      codeLabel: 'Your code',
      cd: (d, h, m) => `${d} ${d === 1 ? 'day' : 'days'} ${h} hrs ${m} min left`,
      imgAlt: 'Friends swimming in the sea in front of a sailing yacht',
    },
  },
}
