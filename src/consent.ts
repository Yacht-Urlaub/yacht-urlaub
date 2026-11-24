// Einwilligung aus dem Cookie-Banner (localStorage). Eigene Datei, damit
// analytics.ts und CookieBanner.tsx sich nicht gegenseitig importieren.
const STORAGE_KEY = 'yu_cookie_consent'

export type ConsentState = 'accepted' | 'rejected' | null

export function getConsent(): ConsentState {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ConsentState) ?? null
  } catch {
    return null
  }
}

export function setConsent(value: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // localStorage gesperrt (z. B. privater Modus): Einwilligung gilt dann nur fuer diese Sitzung
  }
}

const OPEN_EVENT = 'yu-open-cookie-settings'

/** Cookie-Banner erneut oeffnen (Footer-Link "Cookie-Einstellungen"), um die Wahl zu aendern/zu widerrufen. */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onOpenCookieSettings(handler: () => void) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}
