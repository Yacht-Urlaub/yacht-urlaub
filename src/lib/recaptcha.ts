/**
 * reCAPTCHA v3 — unsichtbarer Bot-Schutz fuer alle Formulare.
 *
 * v3 zeigt kein Haekchen-Widget. Beim Absenden holt der Browser ein Token,
 * das die Netlify-Function anschliessend bei Google prueft und dabei einen
 * Score zwischen 0.0 (sehr wahrscheinlich Bot) und 1.0 (sehr wahrscheinlich
 * Mensch) zurueckbekommt.
 *
 * Die Websiteschluessel sind oeffentlich — sie stehen im ausgelieferten
 * JavaScript und sind an die im Google-Konto hinterlegten Domains gebunden.
 * Die geheimen Schluessel gehoeren ausschliesslich auf den Server
 * (RECAPTCHA_SECRET und RECAPTCHA_SECRET_EN bei Netlify), niemals hierher.
 *
 * Diese Datei gibt nie einen Fehler nach aussen: laesst sich das Skript
 * nicht laden — Werbeblocker, Netzausfall, nicht eingetragene Domain —,
 * liefert getRecaptchaToken() null. Ueber die Folge entscheidet der Server,
 * nicht der Browser. Sonst haette ein blockiertes Google-Skript zur Folge,
 * dass ein echter Interessent sein Formular nicht abschicken kann.
 */

/**
 * Ein Schluesselpaar je Domain — so wie im Google-Konto angelegt. Getrennte
 * Schluessel heisst getrennte Statistik: im reCAPTCHA-Konto laesst sich
 * dadurch sehen, wie viel Bot-Verkehr auf der deutschen und wie viel auf der
 * englischen Seite ankommt.
 *
 * Geprueft am 17.08.2026, welche Herkunft welcher Schluessel akzeptiert:
 *
 *                                  Standard   yacht-holiday
 *   yacht-urlaub.net (+ www)          ja          nein
 *   yacht-holiday.net (+ www)         ja           ja
 *   en-test.yacht-urlaub.net          ja          nein
 *   yacht-urlaub-team.netlify.app    nein         nein
 *
 * Der Standardschluessel deckt also auch die englische Domain ab — er ist
 * die Rueckfalloption, falls ein Host nicht in der Tabelle steht.
 *
 * Der Netlify-Host ist bei keinem eingetragen: auf Deploy-Vorschauen kommt
 * deshalb kein Token zustande. Im Beobachtungsmodus faellt das nicht auf,
 * im Modus "enforce" waeren Formulare dort nicht absendbar. Wer das
 * braucht, laesst die Domain im Google-Konto nachtragen.
 */
const SITE_KEY_STANDARD = '6LdmwW4sAAAAAMvXNne0kjGA4LVoE3d-qg9wx8A8'

const SITE_KEYS: Record<string, string> = {
  'yacht-holiday.net': '6Le71IotAAAAAJwh6lY_ehlTEAkmZrhJz7aDYV3-',
  'www.yacht-holiday.net': '6Le71IotAAAAAJwh6lY_ehlTEAkmZrhJz7aDYV3-',
}

/** Passender Websiteschluessel zum aufgerufenen Host. */
export function siteKeyFor(hostname?: string): string {
  const h = (hostname ?? (typeof window === 'undefined' ? '' : window.location.hostname)).toLowerCase()
  return SITE_KEYS[h] ?? SITE_KEY_STANDARD
}

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
    el.src = `https://www.google.com/recaptcha/api.js?render=${siteKeyFor()}&hl=${lang}`
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
    return await withTimeout(g.execute(siteKeyFor(), { action: safeAction }), TIMEOUT_MS)
  } catch {
    return null
  }
}
