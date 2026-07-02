// Netlify Function: Kontaktformular → Resend
// Erwartet POST mit JSON { name, email, phone?, message }
// Sendet eine E-Mail via Resend (API-Key in Netlify-Env RESEND_API_KEY).

export default async (req) => {
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } })

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let data
  try { data = await req.json() } catch { return json({ error: 'Ungültige Anfrage' }, 400) }

  const name = (data?.name || '').toString().trim()
  const email = (data?.email || '').toString().trim()
  const phone = (data?.phone || '').toString().trim()
  const message = (data?.message || '').toString().trim()

  if (!name || !email || !message) return json({ error: 'Bitte Name, E-Mail und Nachricht ausfüllen.' }, 400)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json({ error: 'Bitte eine gültige E-Mail angeben.' }, 400)

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return json({ error: 'Server nicht konfiguriert (RESEND_API_KEY fehlt).' }, 500)

  const to = process.env.CONTACT_TO || 'info@yacht-urlaub.net'
  // Absender-Domain muss in Resend verifiziert sein; sonst onboarding@resend.dev (nur an Account-Mail)
  const from = process.env.RESEND_FROM || 'Yacht-Urlaub Kontakt <kontakt@yacht-urlaub.net>'

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || '-'}\n\nNachricht:\n${message}`,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return json({ error: 'E-Mail konnte nicht gesendet werden.', detail: detail.slice(0, 300) }, 502)
  }
  return json({ ok: true })
}
