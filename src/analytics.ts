/**
 * Google Analytics 4 + Google Ads (Conversions per GA4-Import) mit
 * Consent Mode v2 ("Basic"-Variante). Doku: docs/analytics.md
 *
 * - Ohne Einwilligung wird gtag.js gar nicht erst geladen: kein Request an
 *   Google, keine Cookies, keine Messung. Der Consent-Default steht trotzdem
 *   auf "denied" (alle vier v2-Signale), falls das Skript vor dem Update
 *   geladen wird.
 * - "Alle akzeptieren" im CookieBanner -> enableAnalytics(): Skript laden und
 *   alle vier Signale (analytics_storage, ad_storage, ad_user_data,
 *   ad_personalization) auf "granted" setzen. "Nur notwendige" laesst alles
 *   auf "denied".
 * - Gespeicherte Einwilligung wird beim naechsten Besuch sofort wieder
 *   angewendet (initAnalytics).
 * - Widerruf (Footer-Link "Cookie-Einstellungen" -> Banner -> "Nur
 *   notwendige"): disableAnalytics() setzt alle Signale auf "denied", stoppt
 *   die Messung und loescht die Google-Cookies.
 * - Dieselbe Mess-ID fuer beide Domains; GA4 trennt sie ueber den Hostnamen.
 * - Seitenaufrufe sendet die SPA selbst (send_page_view: false; SEO.tsx ruft
 *   trackPageView bei jedem Seitenwechsel), sonst wuerde nur der erste Aufruf
 *   gezaehlt.
 * - Debug: ?ga_debug=1 an die URL haengen -> Ereignisse erscheinen im
 *   GA4-DebugView (nur mit Einwilligung).
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

let scriptLoaded = false
// true = Einwilligung liegt vor, Ereignisse duerfen gesendet werden
let active = false

function ensureGtag() {
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    // gtag.js erwartet echte `arguments`-Objekte im dataLayer, keine Arrays.
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as GtagArgs)
    }
    window.gtag('consent', 'default', { ...DENIED, wait_for_update: 500 })
  }
}

function setDisabledFlag(disabled: boolean) {
  ;(window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = disabled
}

function load() {
  if (typeof window === 'undefined' || window.__PRERENDER__) return
  ensureGtag()
  setDisabledFlag(false)
  if (!scriptLoaded) {
    scriptLoaded = true
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.gtag!('js', new Date())
    const debug = /[?&]ga_debug=1\b/.test(window.location.search)
    window.gtag!('config', GA_ID, { send_page_view: false, ...(debug ? { debug_mode: true } : {}) })
  }
  window.gtag!('consent', 'update', GRANTED)
  active = true
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

/** Widerruf ("Nur notwendige"): Signale auf denied, Messung aus, Cookies weg. */
export function disableAnalytics() {
  if (typeof window === 'undefined') return
  active = false
  if (scriptLoaded && window.gtag) {
    window.gtag('consent', 'update', DENIED)
    setDisabledFlag(true)
  }
  deleteGoogleCookies()
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!active || !window.gtag) return
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
