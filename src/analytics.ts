/**
 * Google Analytics 4 + Google Ads (Conversions per GA4-Import) mit
 * Consent Mode v2 ("Advanced"). Doku: docs/analytics.md
 *
 * - Der Google-Tag steht fest im <head> von index.html (Pruefer von Search
 *   Console/Ads finden ihn dort) und laedt auf jeder Seite. Alle vier
 *   v2-Signale (analytics_storage, ad_storage, ad_user_data,
 *   ad_personalization) starten auf "denied". Ohne Einwilligung setzt der Tag
 *   keine Cookies und sendet nur cookielose Signale, aus denen Google
 *   Conversions/Verhalten modelliert.
 * - "Alle akzeptieren" im CookieBanner -> enableAnalytics(): alle vier Signale
 *   auf "granted". "Nur notwendige" laesst alles auf "denied" (die cookielosen
 *   Signale laufen weiter).
 * - Gespeicherte Einwilligung wird beim naechsten Besuch schon in index.html
 *   vor dem ersten Treffer angewendet (initAnalytics wiederholt das nur).
 * - Widerruf (Footer-Link "Cookie-Einstellungen" -> Banner -> "Nur
 *   notwendige"): disableAnalytics() setzt alle Signale auf "denied" und
 *   loescht die Google-Cookies.
 * - Dieselbe Mess-ID fuer beide Domains; GA4 trennt sie ueber den Hostnamen.
 * - Seitenaufrufe sendet die SPA selbst (send_page_view: false; SEO.tsx ruft
 *   trackPageView bei jedem Seitenwechsel), sonst wuerde nur der erste Aufruf
 *   gezaehlt. Nach "Alle akzeptieren" wird fuer GA4 KEIN zweiter page_view
 *   gesendet: die Seite ist schon als Treffer gezaehlt, ein zweiter waere
 *   doppelt.
 * - Debug: ?ga_debug=1 an die URL haengen -> Ereignisse erscheinen im
 *   GA4-DebugView.
 * - Meta-Pixel (src/metaPixel.ts) haengt an denselben Stellen: init/enable/
 *   disable laufen mit, trackEvent/trackPageView senden das Meta-Gegenstueck
 *   (Lead, Contact, InitiateCheckout, PageView). Anders als Google laedt der
 *   Meta-Pixel strikt nur nach Einwilligung.
 */
import { getConsent } from './consent'
import { initMetaPixel, enableMetaPixel, disableMetaPixel, trackMetaEvent, trackMetaPageView } from './metaPixel'

type GtagArgs = unknown[]
declare global {
  interface Window {
    dataLayer?: GtagArgs[]
    gtag?: (...args: GtagArgs) => void
    __PRERENDER__?: boolean
  }
}

const DENIED = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
} as const
const GRANTED = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
} as const

// Der Tag kommt aus index.html; im Prerender und ohne Tag (z. B. Skript
// blockiert) wird nichts gesendet.
function gtagReady(): boolean {
  return typeof window !== 'undefined' && !window.__PRERENDER__ && typeof window.gtag === 'function'
}

/** Beim App-Start: fruehere Zustimmung (nochmal) anwenden. */
export function initAnalytics() {
  if (getConsent() === 'accepted') {
    if (gtagReady()) window.gtag!('consent', 'update', GRANTED)
    initMetaPixel()
  }
}

/** Direkt nach "Alle akzeptieren". */
export function enableAnalytics() {
  if (gtagReady()) window.gtag!('consent', 'update', GRANTED)
  enableMetaPixel()
  trackMetaPageView() // Meta laedt erst jetzt; der GA4-Treffer der Seite ist schon gezaehlt
}

// Google-Cookies (GA4, Ads/Conversion-Linker) beim Widerruf entfernen.
function deleteGoogleCookies() {
  const host = window.location.hostname
  const parent = host.replace(/^www\./, '')
  const domains = [undefined, host, `.${parent}`]
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (!/^(_ga|_gid|_gat|_gcl_|_gac_|FPLC)/.test(name)) continue
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

/** Widerruf ("Nur notwendige"): Signale auf denied, Cookies weg. */
export function disableAnalytics() {
  if (typeof window === 'undefined') return
  disableMetaPixel()
  if (gtagReady()) window.gtag!('consent', 'update', DENIED)
  deleteGoogleCookies()
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  trackMetaEvent(name, params) // no-op ohne Einwilligung bzw. ohne Meta-Gegenstueck
  if (!gtagReady()) return
  window.gtag!('event', name, params)
}

/**
 * Seitenaufruf. Wird von SEO.tsx aufgerufen (jede Seite hat genau eine
 * <SEO>-Komponente), weil dort der endgueltige Seitentitel bekannt ist — ein
 * Timer nach dem Routenwechsel haette bei lazy geladenen Seiten den Titel der
 * vorherigen Seite erwischt.
 */
export function trackPageView(title: string) {
  trackMetaPageView()
  trackEvent('page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  })
}

// Wo auf der Seite wurde geklickt? Reihenfolge = Prioritaet.
function linkLocation(a: Element): string {
  if (a.closest('.whatsapp-fab')) return 'fab'
  if (a.closest('.side-contact')) return 'side_contact'
  if (a.closest('header')) return 'header'
  if (a.closest('footer')) return 'footer'
  if (/^\/(en\/)?(kontakt|contact)\/?$/.test(window.location.pathname)) return 'contact_page'
  if (a.closest('#kontakt')) return 'contact_section'
  return 'content'
}

/**
 * contact_click: Klicks auf WhatsApp-, tel:- und mailto:-Links
 * (ein Listener fuer die ganze Seite).
 */
export function trackContactClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!a) return
  const href = a.getAttribute('href') || ''
  let method: 'phone' | 'whatsapp' | 'email' | null = null
  if (href.startsWith('tel:')) method = 'phone'
  else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) method = 'whatsapp'
  else if (href.startsWith('mailto:')) method = 'email'
  if (method) trackEvent('contact_click', { method, link_location: linkLocation(a) })
}
