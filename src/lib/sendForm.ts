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
 */
export async function sendForm(
  formName: string,
  fields: Record<string, unknown>,
): Promise<boolean> {
  try {
    const res = await fetch('/.netlify/functions/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formName, ...fields }),
    })
    return res.ok
  } catch {
    return false
  }
}
