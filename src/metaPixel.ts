/**
 * Meta-Pixel (Facebook/Instagram), nur mit Einwilligung. Doku: docs/analytics.md
 *
 * - Ohne Einwilligung wird fbevents.js gar nicht erst geladen und es gibt keinen
 *   einzigen fbq-Aufruf: kein Request an Meta, keine Cookies (_fbp/_fbc).
 * - "Alle akzeptieren" -> enableMetaPixel(): Skript laden, init, PageView.
 *   Gespeicherte Einwilligung wird beim naechsten Besuch ueber initMetaPixel()
 *   (aus analytics.ts) wieder angewendet.
 * - Widerruf ("Cookie-Einstellungen" -> "Nur notwendige"): disableMetaPixel()
 *   ruft fbq('consent','revoke'), stoppt alle weiteren Ereignisse und loescht
 *   _fbp/_fbc.
 * - Jedes Ereignis bekommt eine eventID (UUID). Sie wird als 4. Argument von
 *   fbq('track') mitgesendet, damit eine spaetere Conversions API dieselben
 *   Ereignisse mit derselben event_id melden kann, ohne doppelt zu zaehlen.
 * - Die Zuordnung GA4-Ereignis -> Meta-Ereignis steht in META_EVENTS; so bleiben
 *   die Aufrufstellen (sendForm, Buchen-Buttons, Kontakt-Klicks) unveraendert.
 * - Automatische Ereigniserkennung (autoConfig: Button-Klicks, Seiten-Metadaten)
 *   ist aus: es sollen nur die hier definierten Ereignisse gesendet werden.
 */
import { getConsent } from './consent'

export const META_PIXEL_ID = '934962698069526'

type Fbq = {
  (...args: unknown[]): void
  callMethod?: (...args: unknown[]) => void
  queue: unknown[]
  loaded: boolean
  version: string
  push: Fbq
}
declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

let scriptLoaded = false
// true = Einwilligung liegt vor, Ereignisse duerfen gesendet werden
let active = false
// Nach einem Widerruf im selben Seitenaufruf muss beim erneuten Zustimmen nur
// consent=grant gesetzt werden (init/Skript existieren schon).
let revoked = false

function loadScript() {
  // Standard-Loader von Meta, lesbar ausgeschrieben (identisches Verhalten).
  if (window.fbq) return
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args)
    else n.queue.push(args)
  } as Fbq
  n.queue = []
  n.loaded = true
  n.version = '2.0'
  n.push = n
  window.fbq = n
  if (!window._fbq) window._fbq = n
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://connect.facebook.net/en_US/fbevents.js'
  document.head.appendChild(s)
}

function newEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  } catch {
    // ignorieren, Fallback unten
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`
}

function load() {
  if (typeof window === 'undefined' || window.__PRERENDER__) return
  if (!scriptLoaded) {
    scriptLoaded = true
    loadScript()
    window.fbq!('set', 'autoConfig', false, META_PIXEL_ID)
    window.fbq!('init', META_PIXEL_ID)
  } else if (revoked) {
    window.fbq!('consent', 'grant')
  }
  revoked = false
  active = true
}

/** Beim App-Start: nur laden, wenn schon frueher zugestimmt wurde. */
export function initMetaPixel() {
  if (getConsent() === 'accepted') load()
}

/** Direkt nach "Alle akzeptieren": laden; PageView der aktuellen Seite meldet analytics.ts. */
export function enableMetaPixel() {
  load()
}

// Meta-Cookies beim Widerruf entfernen (_fbp wird auf der Hauptdomain gesetzt).
function deleteMetaCookies() {
  const host = window.location.hostname
  const parent = host.replace(/^www\./, '')
  const domains = [undefined, host, `.${host}`, `.${parent}`]
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (!/^(_fbp|_fbc)$/.test(name)) continue
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
    }
  }
}

/** Widerruf ("Nur notwendige"): Einwilligung entziehen, Ereignisse stoppen, Cookies weg. */
export function disableMetaPixel() {
  if (typeof window === 'undefined') return
  active = false
  // Ohne geladenes Pixel gibt es nichts zu widerrufen und es darf auch kein fbq-Aufruf passieren.
  if (scriptLoaded && window.fbq) {
    window.fbq('consent', 'revoke')
    revoked = true
  }
  deleteMetaCookies()
}

// GA4-Ereignis -> Meta-Standardereignis (+ Parametern)
const num = (v: unknown) => (typeof v === 'number' && isFinite(v) ? v : undefined)
const META_EVENTS: Record<string, (p: Record<string, unknown>) => { name: string; params: Record<string, unknown> }> = {
  generate_lead: p => ({ name: 'Lead', params: { content_name: p.form_name } }),
  contact_click: p => ({ name: 'Contact', params: { content_category: p.method } }),
  booking_start: p => {
    const value = num(p.value)
    return {
      name: 'InitiateCheckout',
      params: { ...(value !== undefined ? { value } : {}), currency: 'EUR', content_name: p.package_name },
    }
  },
}

/** PageView (bei jedem SPA-Seitenwechsel). Gibt die eventID zurueck (oder undefined ohne Einwilligung). */
export function trackMetaPageView(): string | undefined {
  if (!active || !window.fbq) return undefined
  const eventID = newEventId()
  window.fbq('track', 'PageView', {}, { eventID })
  return eventID
}

/** Meta-Gegenstueck zu einem GA4-Ereignis senden (falls es eines gibt). Gibt die eventID zurueck. */
export function trackMetaEvent(gaName: string, params: Record<string, unknown> = {}): string | undefined {
  if (!active || !window.fbq) return undefined
  const map = META_EVENTS[gaName]
  if (!map) return undefined
  const { name, params: metaParams } = map(params)
  const eventID = newEventId()
  window.fbq('track', name, metaParams, { eventID })
  return eventID
}
