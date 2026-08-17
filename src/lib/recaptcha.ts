/**
 * reCAPTCHA v3 — unsichtbarer Bot-Schutz fuer alle Formulare.
 *
 * v3 zeigt kein Haekchen-Widget. Beim Absenden holt der Browser ein Token,
 * das die Netlify-Function anschliessend bei Google prueft und dabei einen
 * Score zwischen 0.0 (sehr wahrscheinlich Bot) und 1.0 (sehr wahrscheinlich
 * Mensch) zurueckbekommt.
 *
 * Der Websiteschluessel ist oeffentlich — er steht im ausgelieferten
 * JavaScript und ist an die im Google-Konto hinterlegten Domains gebunden.
 * Der geheime Schluessel gehoert ausschliesslich auf den Server
 * (Netlify-Umgebungsvariable RECAPTCHA_SECRET), niemals hierher.
 *
 * Diese Datei gibt nie einen Fehler nach aussen: laesst sich das Skript
 * nicht laden — Werbeblocker, Netzausfall, nicht eingetragene Domain —,
 * liefert getRecaptchaToken() null. Ueber die Folge entscheidet der Server,
 * nicht der Browser. Sonst haette ein blockiertes Google-Skript zur Folge,
 * dass ein echter Interessent sein Formular nicht abschicken kann.
 */

export const RECAPTCHA_SITE_KEY = '6LdmwW4sAAAAAMvXNne0kjGA4LVoE3d-qg9wx8A8'

/** Nach dieser Zeit wird ohne Token abgeschickt, statt den Nutzer warten zu lassen. */
const TIMEOUT_MS = 5000

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void
      execute: (siteKey: string, opts: { action: string }) => Promise<string>
    }
  }
}

let loader: Promise<void> | null = null

/** Laedt das Skript genau einmal, egal wie viele Formulare danach fragen. */
function loadScript(lang: string): Promise<void> {
  if (loader) return loader
  loader = new Promise<void>((resolve, reject) => {
    if (window.grecaptcha) return resolve()
    const el = document.createElement('script')
    el.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}&hl=${lang}`
    el.async = true
    el.defer = true
    el.onload = () => resolve()
    el.onerror = () => reject(new Error('reCAPTCHA konnte nicht geladen werden'))
    document.head.appendChild(el)
  })
  return loader
}

const withTimeout = <T,>(p: Promise<T>, ms: number): Promise<T> =>
  Promise.race([p, new Promise<T>((_, rej) => setTimeout(() => rej(new Error('timeout')), ms))])

/**
 * Token fuer eine Aktion holen. Gibt null zurueck, wenn irgendetwas
 * dazwischenkommt — der Aufrufer schickt dann ohne Token ab.
 *
 * Google laesst in Aktionsnamen nur Buchstaben, Ziffern, / und _ zu.
 * Unsere Formularschluessel enthalten Bindestriche, die werden ersetzt.
 */
export async function getRecaptchaToken(action: string, lang = 'de'): Promise<string | null> {
  if (typeof window === 'undefined') return null
  const safeAction = action.replace(/[^A-Za-z0-9/_]/g, '_')
  try {
    await withTimeout(loadScript(lang), TIMEOUT_MS)
    const g = window.grecaptcha
    if (!g) return null
    await withTimeout(new Promise<void>(res => g.ready(res)), TIMEOUT_MS)
    return await withTimeout(g.execute(RECAPTCHA_SITE_KEY, { action: safeAction }), TIMEOUT_MS)
  } catch {
    return null
  }
}
