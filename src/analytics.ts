/**
 * Google Analytics 4 mit Consent Mode v2 ("Basic"-Variante).
 *
 * - Ohne Einwilligung wird gtag.js gar nicht erst geladen: kein Request an
 *   Google, keine Cookies, keine Messung. Der Consent-Default steht trotzdem
 *   auf "denied" (alle vier v2-Signale), falls das Skript doch irgendwann
 *   vor dem Update geladen wird.
 * - "Alle akzeptieren" im CookieBanner -> enableAnalytics(): Skript laden,
 *   analytics_storage auf "granted". Die Werbe-Signale (ad_storage,
 *   ad_user_data, ad_personalization) bleiben "denied", bis Google Ads
 *   angebunden ist und der Banner das ausdruecklich abdeckt.
 * - Wer schon frueher zugestimmt hat, wird beim App-Start wieder erfasst
 *   (initAnalytics).
 * - Dieselbe Mess-ID fuer beide Domains; GA4 trennt sie ueber den
 *   Hostnamen (yacht-urlaub.net / yacht-holiday.net).
 * - Seitenaufrufe sendet die SPA selbst (send_page_view: false; SEO.tsx ruft
 *   trackPageView bei jedem Seitenwechsel), sonst wuerde nur der erste Aufruf
 *   gezaehlt.
 */
import { getConsent } from './consent'

export const GA_ID = 'G-CRH1CYGY1C'

type GtagArgs = unknown[]
declare global {
  interface Window {
    dataLayer?: GtagArgs[]
    gtag?: (...args: GtagArgs) => void
    __PRERENDER__?: boolean
  }
}

let loaded = false

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    // gtag.js erwartet echte `arguments`-Objekte im dataLayer, keine Arrays.
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as GtagArgs)
    }
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    })
  }
}

function load() {
  if (loaded || typeof window === 'undefined' || window.__PRERENDER__) return
  loaded = true
  ensureGtag()
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.gtag!('js', new Date())
  window.gtag!('consent', 'update', { analytics_storage: 'granted' })
  window.gtag!('config', GA_ID, { send_page_view: false })
}

/** Beim App-Start: nur laden, wenn schon frueher zugestimmt wurde. */
export function initAnalytics() {
  if (getConsent() === 'accepted') load()
}

/** Direkt nach "Alle akzeptieren": laden und die aktuelle Seite nachmelden. */
export function enableAnalytics() {
  load()
  trackPageView(document.title)
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!loaded || !window.gtag) return
  window.gtag('event', name, params)
}

/**
 * Seitenaufruf. Wird von SEO.tsx aufgerufen (jede Seite hat genau eine
 * <SEO>-Komponente), weil dort der endgueltige Seitentitel bekannt ist — ein
 * Timer nach dem Routenwechsel haette bei lazy geladenen Seiten den Titel der
 * vorherigen Seite erwischt.
 */
export function trackPageView(title: string) {
  trackEvent('page_view', {
    page_title: title,
    page_location: window.location.href,
    page_path: window.location.pathname + window.location.search,
  })
}

/** Klicks auf Telefon / WhatsApp / E-Mail (ein Listener fuer die ganze Seite). */
export function trackContactClick(e: MouseEvent) {
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!a) return
  const href = a.getAttribute('href') || ''
  let method: string | null = null
  if (href.startsWith('tel:')) method = 'phone'
  else if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) method = 'whatsapp'
  else if (href.startsWith('mailto:')) method = 'email'
  if (method) trackEvent('contact_click', { method, link_url: href })
}
