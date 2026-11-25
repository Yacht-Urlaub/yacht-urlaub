// Netlify Function: alle Formulare der Seite → Resend
//
// Erwartet POST mit JSON. Pflicht sind eine E-Mail-Adresse und ein Name;
// alles Weitere ist frei. Die Formulare heissen ihre Felder unterschiedlich
// (name vs. vorname/nachname, phone vs. telefon, message vs. nachricht bzw.
// anmerkung/anmerkungen), deshalb werden die gaengigen Varianten hier
// zusammengefuehrt. Alle uebrigen Felder landen unveraendert in der Mail.
//
// Umgebung: RESEND_API_KEY (Pflicht), CONTACT_TO, RESEND_FROM,
//           RECAPTCHA_SECRET, RECAPTCHA_SECRET_EN, RECAPTCHA_MODE,
//           RECAPTCHA_MIN_SCORE.

const FORM_LABELS = {
  kontakt: 'Kontaktformular',
  anfrage: 'Anfrage-Formular (Seitenende)',
  urlaubsplaner: 'Urlaubsplaner',
  'kabinen-buchung': 'Kabinen-Buchung',
  'sailaway-anfrage': 'Sail-Away-Anmeldung',
  'partner-anfrage': 'Reisebüro / Affiliate',
  'skipper-anfrage': 'Skipper- und Bord-Service',
  'charter-anfrage': 'Yacht-Charter-Anfrage',
  'crew-anfrage': 'Anfrage an die Crew',
  'porto-heli-buchung': 'Verbindliche Buchungsanfrage Porto Heli',
  'yachtmodell-anfrage': 'Yachtmodell-Anfrage',
}

// Felder, die als Absenderangaben gelten und nicht noch einmal
// in der Feldliste auftauchen sollen
const NAME_KEYS = ['name', 'vorname', 'nachname']
const PHONE_KEYS = ['phone', 'telefon']
const MESSAGE_KEYS = ['message', 'nachricht', 'anmerkung', 'anmerkungen']
const CONSUMED = new Set([...NAME_KEYS, ...PHONE_KEYS, ...MESSAGE_KEYS, 'email', 'formName', 'form-name',
  // technisch, gehoert nicht in die Mail
  'recaptchaToken', 'recaptchaState'])

const LABELS = {
  destination: 'Destination', toerntyp: 'Törn-Typ', personen: 'Personen',
  datum_von: 'Reise von', datum_bis: 'Reise bis', yacht: 'Yacht',
  buchungsabsicht: 'Buchungsabsicht', gefunden: 'Gefunden über',
  kontaktart: 'Bevorzugter Kontakt', newsletter: 'Newsletter',
  reviere: 'Reviere', beginn: 'Beginn', dauer: 'Dauer (Tage)',
  buchung: 'Buchungsart', kommunikation: 'Kommunikation',
  geburtsjahr: 'Geburtsjahr', erfahren: 'Aufmerksam geworden durch',
  reise: 'Reise', adresse: 'Adresse', plz: 'PLZ', ort: 'Ort',
  zahlungsart: 'Zahlungsart', modus: 'Modus', gruppe: 'Gruppe',
  getraenke: 'Getränke', yachtTyp: 'Yacht-Typ', kabinen: 'Kabinen',
  revier: 'Revier', alter: 'Alter', start: 'Start', ende: 'Ende',
  // Yachtmodell-Anfrage (skipperWunsch statt skipper: das Feld 'skipper' heisst bei Porto Heli Kosten)
  modell: 'Yachtmodell', werft: 'Werft', zeitraum: 'Zeitraum', skipperWunsch: 'Skipper', seite: 'Seite',
  // Porto-Heli-Buchung (Kalkulation nur intern)
  yachtIntern: 'Yacht (intern)', bookingManagerYachtId: 'Booking-Manager-Yacht-ID',
  von: 'Anreise (Freitag)', bis: 'Abreise (Freitag)', naechte: 'Nächte', gaeste: 'Gäste',
  endpreisKunde: 'Endpreis laut Website (EUR)', listenpreis: 'Listenpreis Charter (EUR)',
  rabattProzent: 'Rabatt (%)', charterNachRabatt: 'Charter nach Rabatt (EUR)',
  operationsFee: 'Nebenkosten / Operations-Fee (EUR)', skipper: 'Skipper (EUR)',
  rundung: 'Rundung (EUR)', preisstand: 'Preisstand', sprache: 'Sprache der Seite',
}

/**
 * reCAPTCHA v3 pruefen.
 *
 * Rueckgabe: { ok, grund, score }. ok=false heisst "sieht nach Bot aus" —
 * ob daraus eine Ablehnung wird, entscheidet der Modus:
 *
 *   RECAPTCHA_MODE=monitor   (Vorgabe) nur protokollieren, nichts abweisen
 *   RECAPTCHA_MODE=enforce   abweisen
 *
 * Der Umweg ueber "monitor" ist Absicht: Wenn die beiden Domains im
 * Google-Konto nicht eingetragen sind, liefert der Browser gar kein Token
 * — mit sofortigem Abweisen waeren dann alle Anfragen weg, und zwar
 * unbemerkt. Erst nach dem Blick in die Funktionsprotokolle auf enforce
 * stellen.
 *
 * Ohne RECAPTCHA_SECRET passiert gar nichts; die Formulare laufen wie zuvor.
 */
async function pruefeRecaptcha(token, remoteIp, host) {
  // Jede Domain hat ihr eigenes Schluesselpaar im Google-Konto. Der Browser
  // waehlt den Websiteschluessel nach Host (src/lib/recaptcha.ts), hier muss
  // derselbe Host denselben geheimen Schluessel treffen — sonst weist Google
  // das Token ab.
  const istEn = /(^|\.)yacht-holiday\.net$/.test(String(host || '').toLowerCase().split(':')[0])
  const secret = (istEn && process.env.RECAPTCHA_SECRET_EN) || process.env.RECAPTCHA_SECRET
  if (!secret) return { ok: true, grund: 'kein Schluessel hinterlegt' }
  if (!token) return { ok: false, grund: 'kein Token mitgeschickt' }

  const minScore = Number(process.env.RECAPTCHA_MIN_SCORE || '0.5')

  let body
  try {
    const params = new URLSearchParams({ secret, response: token })
    if (remoteIp) params.set('remoteip', remoteIp)
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    })
    body = await res.json()
  } catch (e) {
    // Google nicht erreichbar — das darf keine echte Anfrage kosten
    return { ok: true, grund: `Pruefung nicht moeglich: ${e?.message || e}` }
  }

  if (!body.success) {
    return { ok: false, grund: `abgelehnt: ${(body['error-codes'] || []).join(', ') || 'ohne Angabe'}` }
  }
  const score = typeof body.score === 'number' ? body.score : null
  if (score !== null && score < minScore) {
    return { ok: false, grund: `Score ${score} unter ${minScore}`, score }
  }
  return { ok: true, grund: 'bestanden', score, hostname: body.hostname }
}

const pick = (data, keys) => {
  for (const k of keys) {
    const v = data?.[k]
    if (v !== undefined && v !== null && String(v).trim()) return String(v).trim()
  }
  return ''
}

const fmt = (v) => {
  if (Array.isArray(v)) return v.join(', ')
  if (typeof v === 'boolean') return v ? 'ja' : 'nein'
  return String(v)
}

// Absenderangaben und Mailtext aus den Formulardaten zusammenbauen
function composeMail(formKey, data) {
  const formLabel = FORM_LABELS[formKey] || formKey
  const name = pick(data, ['name']) ||
    [pick(data, ['vorname']), pick(data, ['nachname'])].filter(Boolean).join(' ')
  const email = pick(data, ['email'])
  const phone = pick(data, PHONE_KEYS)
  const message = pick(data, MESSAGE_KEYS)

  const extras = Object.entries(data)
    .filter(([k, v]) => !CONSUMED.has(k) && v !== '' && v !== null && v !== undefined &&
      !(Array.isArray(v) && v.length === 0))
    .map(([k, v]) => `${LABELS[k] || k}: ${fmt(v)}`)

  const lines = [
    `Formular: ${formLabel}`,
    '',
    `Name: ${name}`,
    `E-Mail: ${email}`,
    `Telefon: ${phone || '-'}`,
  ]
  if (extras.length) lines.push('', '--- Angaben aus dem Formular ---', ...extras)
  if (message) lines.push('', '--- Nachricht ---', message)
  return { formLabel, name, email, lines }
}

/**
 * Abgewiesene Anfrage melden (nur im Modus "enforce").
 *
 * Eine echte Interessentin mit blockiertem Google-Skript, nicht eingetragener
 * Domain oder zu niedrigem Score sieht nur eine Fehlermeldung — ohne Meldung
 * ginge die Anfrage unbemerkt verloren. Deshalb geht, wenn Name und gueltige
 * E-Mail vorliegen, eine Hinweismail mit allen Angaben an CONTACT_TO; der
 * Betreff beginnt mit "[ABGEWIESEN]" und laesst sich per Filter sortieren.
 * Fehler hier duerfen die Abweisung nicht verhindern.
 */
const HINWEIS_MAX = 5
const hinweise = [] // { t, email } der zuletzt gesendeten Hinweismails

async function meldeAbgewiesen(formKey, data, grund) {
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return
    const { formLabel, name, email, lines } = composeMail(formKey, data)
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    // Kein Postfach-Flut durch Bots:
    // 1) Nur Anfragen aus unserem eigenen Formular (traegt "recaptchaState",
    //    siehe src/lib/sendForm.ts). Direkte Aufrufe der Function bleiben stumm.
    if (!data.recaptchaState) {
      console.log(`[recaptcha] ${formKey}: keine Hinweismail (Aufruf nicht aus dem Formular)`)
      return
    }
    // 2) Hoechstens HINWEIS_MAX Mails pro Stunde je Function-Instanz, und je
    //    E-Mail-Adresse nur eine. (Der Zaehler lebt im Arbeitsspeicher der
    //    Instanz — Obergrenze gegen Fluten, kein exaktes Limit.)
    const jetzt = Date.now()
    while (hinweise.length && jetzt - hinweise[0].t > 3600_000) hinweise.shift()
    if (hinweise.length >= HINWEIS_MAX || hinweise.some(h => h.email === email.toLowerCase())) {
      console.log(`[recaptcha] ${formKey}: keine Hinweismail (Limit/Duplikat)`)
      return
    }
    hinweise.push({ t: jetzt, email: email.toLowerCase() })
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Yacht-Urlaub Kontakt <kontakt@yacht-urlaub.net>',
        to: [process.env.CONTACT_TO || 'info@yacht-urlaub.net'],
        reply_to: email,
        subject: `[ABGEWIESEN] ${formLabel}: Anfrage von ${name}`,
        text: [
          'Diese Anfrage wurde von der Bot-Pruefung (reCAPTCHA) abgewiesen und NICHT als normale Anfrage zugestellt.',
          `Grund: ${grund}`,
          'Die Person hat auf der Website eine Fehlermeldung gesehen. Sieht die Anfrage echt aus, bitte direkt antworten (Antwort geht an die angegebene E-Mail-Adresse).',
          '',
          ...lines,
        ].join('\n'),
      }),
    })
    console.log(`[recaptcha] ${formKey}: Hinweismail ${res.ok ? 'gesendet' : `fehlgeschlagen (${res.status})`}`)
  } catch (e) {
    console.log(`[recaptcha] ${formKey}: Hinweismail nicht moeglich: ${e?.message || e}`)
  }
}

// ── Eingangsbestaetigung an den Kunden (nur Porto-Heli-Buchung) ──
// Kurze Mail: was wurde angefragt, und dass die Buchungsbestaetigung folgt.
// Interne Kalkulation und Booking-Manager-ID stehen bewusst NICHT darin.
const WOCHENTAG = { de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }
const MONATE_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const datum = (iso, lang) => {
  const d = new Date(`${iso}T12:00:00Z`)
  if (Number.isNaN(d.getTime())) return String(iso)
  const [y, m, t] = iso.split('-')
  return lang === 'en' ? `${WOCHENTAG.en[d.getUTCDay()]} ${+t} ${MONATE_EN[+m - 1]} ${y}` : `${WOCHENTAG.de[d.getUTCDay()]} ${t}.${m}.${y}`
}
const euro = (n, lang) =>
  Number.isFinite(Number(n)) ? (lang === 'en' ? `€${Number(n).toLocaleString('en-GB')}` : `${Number(n).toLocaleString('de-DE')} €`) : String(n)

function kundenMail(data) {
  const lang = data.sprache === 'en' ? 'en' : 'de'
  const vorname = String(pick(data, ['name'])).split(/\s+/)[0] || ''
  const wann = `${datum(data.von, lang)} – ${datum(data.bis, lang)}`
  if (lang === 'en') {
    return {
      subject: 'Your booking request for Porto Heli – we have received it',
      text: [
        `Hello ${vorname},`,
        '',
        'thank you for your booking request. This is what we received:',
        '',
        'Destination: Porto Heli, Peloponnese',
        `Yacht: ${data.yacht} (with skipper)`,
        `Trip: ${wann} (7 nights)`,
        `Guests: ${data.gaeste}`,
        `Total price: ${euro(data.endpreisKunde, lang)} including skipper`,
        '',
        'What happens next: we check availability and confirm the booking to you within 24 hours. The contract only comes into being with our booking confirmation. It contains all contract and payment information (50% on booking, 50% six weeks before departure). If the week is no longer available, we will let you know and, if you wish, offer you an alternative. You pay nothing as long as no booking has been confirmed.',
        '',
        'Questions? Simply reply to this e-mail or call us on +43 1 997 15 82.',
        '',
        'Kind regards',
        'Your Yacht-Holiday team',
      ].join('\n'),
    }
  }
  return {
    subject: 'Ihre Buchungsanfrage für Porto Heli – wir haben sie erhalten',
    text: [
      `Guten Tag ${vorname},`,
      '',
      'vielen Dank für Ihre Buchungsanfrage. Das haben wir erhalten:',
      '',
      'Destination: Porto Heli, Peloponnes',
      `Yacht: ${data.yacht} (mit Skipper)`,
      `Reise: ${wann} (7 Nächte)`,
      `Gäste: ${data.gaeste}`,
      `Gesamtpreis: ${euro(data.endpreisKunde, lang)} inklusive Skipper`,
      '',
      'So geht es weiter: Wir prüfen die Verfügbarkeit und bestätigen Ihnen die Buchung innerhalb von 24 Stunden. Erst mit unserer Buchungsbestätigung kommt der Vertrag zustande. Sie enthält alle Vertrags- und Zahlungsinformationen (50 % bei Buchung, 50 % sechs Wochen vor Reiseantritt). Ist die Woche nicht mehr verfügbar, informieren wir Sie und unterbreiten Ihnen auf Wunsch eine Alternative. Sie zahlen nichts, solange keine Buchung bestätigt wurde.',
      '',
      'Fragen? Antworten Sie einfach auf diese E-Mail oder rufen Sie uns an: +43 1 997 15 82.',
      '',
      'Herzliche Grüße',
      'Ihr Yacht-Urlaub-Team',
    ].join('\n'),
  }
}

async function sendeKundenbestaetigung(formKey, data, email) {
  if (formKey !== 'porto-heli-buchung') return
  try {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return
    const { subject, text } = kundenMail(data)
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Yacht-Urlaub Kontakt <kontakt@yacht-urlaub.net>',
        to: [email],
        reply_to: process.env.CONTACT_TO || 'info@yacht-urlaub.net',
        subject,
        text,
      }),
    })
    console.log(`[buchung] ${formKey}: Eingangsbestaetigung ${res.ok ? 'gesendet' : `fehlgeschlagen (${res.status})`}`)
  } catch (e) {
    // darf die Anfrage nicht gefaehrden: das Team hat die Mail schon
    console.log(`[buchung] ${formKey}: Eingangsbestaetigung nicht moeglich: ${e?.message || e}`)
  }
}

export default async (req) => {
  const json = (obj, status = 200) =>
    new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } })

  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let data
  try { data = await req.json() } catch { return json({ error: 'Ungültige Anfrage' }, 400) }

  const formKey = pick(data, ['formName', 'form-name']) || 'kontakt'

  // Bot-Pruefung zuerst: billiger als alles Weitere, und ein Bot soll nicht
  // aus den Feldfehlern lernen, welche Angaben das Formular erwartet.
  const captcha = await pruefeRecaptcha(
    data.recaptchaToken,
    req.headers.get('x-nf-client-connection-ip') || req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
    req.headers.get('x-forwarded-host') || req.headers.get('host'),
  )
  const enforce = (process.env.RECAPTCHA_MODE || 'monitor').toLowerCase() === 'enforce'
  if (!captcha.ok) {
    console.log(`[recaptcha] ${formKey}: ${captcha.grund}${enforce ? ' → abgewiesen' : ' → durchgelassen (monitor)'}`)
    if (enforce) {
      await meldeAbgewiesen(formKey, data, captcha.grund)
      return json({ error: 'Ihre Anfrage konnte nicht geprüft werden. Bitte laden Sie die Seite neu und versuchen Sie es erneut.' }, 403)
    }
  } else {
    console.log(`[recaptcha] ${formKey}: ${captcha.grund}${captcha.score != null ? `, Score ${captcha.score}, Host ${captcha.hostname}` : ''}`)
  }

  const { formLabel: mailLabel, name, email, lines } = composeMail(formKey, data)

  if (!name || !email) return json({ error: 'Bitte Name und E-Mail ausfüllen.' }, 400)
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
      subject: `${mailLabel}: Anfrage von ${name}`,
      text: lines.join('\n'),
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return json({ error: 'E-Mail konnte nicht gesendet werden.', detail: detail.slice(0, 300) }, 502)
  }
  await sendeKundenbestaetigung(formKey, data, email)
  return json({ ok: true })
}
