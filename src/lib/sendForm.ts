/**
 * Absenden aller Formulare der Seite.
 *
 * Frueher gingen die meisten Formulare per POST auf "/" mit
 * data-netlify="true" an Netlify Forms. Das kann bei dieser Anwendung nicht
 * funktionieren: Netlify erkennt Formulare beim Build im statischen HTML,
 * hier werden sie aber erst zur Laufzeit von React erzeugt. Die Eingaben
 * landeten deshalb im Nichts — Netlify hatte kein einziges Formular
 * registriert.
 *
 * Alle Formulare laufen jetzt ueber dieselbe Netlify-Function, die per
 * Resend verschickt — derselbe Weg, den das Kontaktformular schon nutzte.
 * Und weil alles durch diese eine Stelle laeuft, haengt hier auch der
 * reCAPTCHA-Bot-Schutz: ein Token pro Absendevorgang, geprueft wird es
 * serverseitig.
 */
import { getRecaptchaToken } from './recaptcha'
import { langFromPath } from '../i18n'

export async function sendForm(
  formName: string,
  fields: Record<string, unknown>,
): Promise<boolean> {
  try {
    // langFromPath deckt beide Faelle ab: englische Domain und /en-Pfad
    const lang = typeof window === 'undefined' ? 'de' : langFromPath(window.location.pathname)
    const recaptchaToken = await getRecaptchaToken(formName, lang)
    const res = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formName, ...fields, recaptchaToken }),
    })
    return res.ok
  } catch {
    return false
  }
}
