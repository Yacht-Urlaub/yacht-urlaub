import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { PhoneIcon, MailIcon, WhatsAppIcon, MapPinIcon, CalendarIcon, SailboatIcon } from './Icons'
import { useLang } from '../i18n'
import { sendForm } from '../lib/sendForm'

const inputStyle = (error?: boolean): React.CSSProperties => ({
  width: '100%', padding: '11px 14px',
  border: `1.5px solid ${error ? '#e53e3e' : '#e2e8f0'}`,
  borderRadius: '4px', fontSize: '0.9rem', outline: 'none',
  fontFamily: 'DM Sans, sans-serif', background: '#fff',
  color: 'var(--text)', transition: 'border-color 0.2s',
})

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.72rem', fontWeight: 700,
  color: 'var(--navy)', marginBottom: '6px',
  textTransform: 'uppercase', letterSpacing: '0.06em',
}


type Form = {
  destination: string
  toerntyp: string
  personen: string
  datum_von: string
  datum_bis: string
  yacht: string
  buchungsabsicht: string
  gefunden: string
  kontaktart: string
  name: string
  email: string
  phone: string
  message: string
  newsletter: boolean
}

const initial: Form = {
  destination: '', toerntyp: '', personen: '2',
  datum_von: '', datum_bis: '', yacht: '',
  buchungsabsicht: '', gefunden: '', kontaktart: '',
  name: '', email: '', phone: '', message: '', newsletter: false,
}

const kf = {
  formDe: { whither: 'Wohin soll es gehen?', wahl: 'Bitte wählen', dest: 'Destination *', art: 'Art des Törns',
    pers: 'Personen *', von: 'Abreise *', bis: 'Rückkehr (ca.)', yacht: 'Yacht-Typ', weiter: 'Weiter →',
    name: 'Name *', mail: 'E-Mail *', tel: 'Telefon', nachricht: 'Nachricht', absenden: 'Anfrage senden →',
    fast: 'Fast geschafft!', check: 'Bitte prüfen Sie Ihre Angaben und senden Sie die Anfrage ab.',
    errWahl: 'Bitte wählen', errDatum: 'Datum eingeben', errAnzahl: 'Anzahl eingeben', errName: 'Name eingeben', errMail: 'Gültige E-Mail eingeben',
    grpEU: 'Europa', grpFern: 'Karibik & Fernziele', offen: 'Noch offen / beraten lassen',
    dests: ['Kroatien – Dalmatien', 'Kroatien – Kornaten', 'Kroatien – Istrien', 'Griechenland – Ionische Inseln', 'Griechenland – Kykladen', 'Balearen – Mallorca', 'Balearen – Ibiza & Formentera', 'Kanaren'],
    destsFern: ['Karibik – BVI', 'Karibik – Grenadinen', 'Seychellen', 'Thailand'],
    typen: ['Skippered (mit Skipper)', 'Bareboat (selbst segeln)', 'Kabinentörn', 'Charter', 'Noch unsicher'],
    yachten: ['Segelyacht', 'Katamaran', 'Motoryacht', 'Egal'],
    absichten: [
      { val: 'sofort', label: 'Ich möchte so bald wie möglich buchen.' },
      { val: 'bald', label: 'Ich möchte in den nächsten Wochen buchen.' },
      { val: 'info', label: 'Ich erkundige mich vorerst nur.' },
    ],
    reach: 'Wie können wir Sie erreichen?', namePh: 'Ihr Name', mailPh: 'ihre@email.at',
    kontaktarten: ['Telefon', 'E-Mail', 'WhatsApp'],
    wishes: 'Ihre Wünsche & Fragen', wishesPh: 'Was ist Ihnen besonders wichtig? Haben Sie spezielle Wünsche?',
    found: 'Wie haben Sie von uns erfahren?',
    foundOpts: ['Freunde & Bekannte', 'Online-Suche (Google etc.)', 'Facebook', 'Instagram', 'YouTube', 'Reisemesse', 'War bereits Gast', 'Sonstiges'],
    nl: 'Ja, ich möchte den Newsletter mit Angeboten und Neuigkeiten erhalten.', zurueck: '← Zurück' },
  formEn: { whither: 'Where do you want to go?', wahl: 'Please choose', dest: 'Destination *', art: 'Type of cruise',
    pers: 'Persons *', von: 'Departure *', bis: 'Return (approx.)', yacht: 'Yacht type', weiter: 'Next →',
    name: 'Name *', mail: 'Email *', tel: 'Phone', nachricht: 'Message', absenden: 'Send request →',
    fast: 'Almost done!', check: 'Please check your details and submit the request.',
    errWahl: 'Please choose', errDatum: 'Enter a date', errAnzahl: 'Enter a number', errName: 'Enter your name', errMail: 'Enter a valid email',
    grpEU: 'Europe', grpFern: 'Caribbean & long-haul', offen: 'Still open / please advise me',
    dests: ['Croatia – Dalmatia', 'Croatia – Kornati', 'Croatia – Istria', 'Greece – Ionian Islands', 'Greece – Cyclades', 'Balearics – Mallorca', 'Balearics – Ibiza & Formentera', 'Canary Islands'],
    destsFern: ['Caribbean – BVI', 'Caribbean – Grenadines', 'Seychelles', 'Thailand'],
    typen: ['Skippered (with skipper)', 'Bareboat (sail yourself)', 'Cabin cruise', 'Charter', 'Not sure yet'],
    yachten: ['Sailing yacht', 'Catamaran', 'Motor yacht', 'No preference'],
    absichten: [
      { val: 'sofort', label: 'I would like to book as soon as possible.' },
      { val: 'bald', label: 'I would like to book within the next weeks.' },
      { val: 'info', label: 'I am just inquiring for now.' },
    ],
    reach: 'How can we reach you?', namePh: 'Your name', mailPh: 'your@email.com',
    kontaktarten: ['Phone', 'Email', 'WhatsApp'],
    wishes: 'Your wishes & questions', wishesPh: 'What matters most to you? Any special requests?',
    found: 'How did you hear about us?',
    foundOpts: ['Friends & family', 'Online search (Google etc.)', 'Facebook', 'Instagram', 'YouTube', 'Travel fair', 'Already been a guest', 'Other'],
    nl: 'Yes, I would like to receive the newsletter with offers and news.', zurueck: '← Back' },
}

const kk = {
  de: { label: 'Kontakt', h2: 'Anfrage starten',
    sub: 'Wir beraten Sie gerne persönlich. Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden bei Ihnen.',
    tel: 'Telefon', wa: 'WhatsApp', mail: 'E-Mail', waSub: 'Schnelle Antwort',
    badges: ['✓ Persönliche Beratung', '✓ Antwort innerhalb 24h', '✓ Kostenlose Erstberatung', '✓ Über 10 Jahre Erfahrung'],
    steps: ['Reisedaten', 'Kontakt', 'Absenden'],
    sentH: 'Anfrage gesendet!', new: 'Neue Anfrage' },
  en: { label: 'Contact', h2: 'Get a quote',
    sub: 'We are happy to advise you personally. Fill in the form — we will get back to you within 24 hours.',
    tel: 'Phone', wa: 'WhatsApp', mail: 'Email', waSub: 'Quick reply',
    badges: ['✓ Personal consultation', '✓ Reply within 24h', '✓ Free initial consultation', '✓ More than 10 years of experience'],
    steps: ['Travel data', 'Contact', 'Submit'],
    sentH: 'Request sent!', new: 'New request' },
}

export default function Kontakt() {
  const lang = useLang()
  const kt = kk[lang]
  const kfm = lang === 'en' ? kf.formEn : kf.formDe
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const [form, setForm] = useState<Form>(initial)
  const [errors, setErrors] = useState<Partial<Form>>({})

  const set = (k: keyof Form, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validateStep = (s: number) => {
    const e: Partial<Form> = {}
    if (s === 0) {
      if (!form.destination) e.destination = kfm.errWahl
      if (!form.datum_von) e.datum_von = kfm.errDatum
      if (!form.personen) e.personen = kfm.errAnzahl
    }
    if (s === 1) {
      if (!form.name.trim()) e.name = kfm.errName
      if (!form.email.includes('@')) e.email = kfm.errMail
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep(step)) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(1)) return
    setSending(true)
    setFailed(false)
    const ok = await sendForm('anfrage', form)
    setSending(false)
    // Frueher wurde die Erfolgsmeldung ungeprueft gezeigt (.finally) — eine
    // fehlgeschlagene Anfrage sah damit aus wie eine erfolgreiche.
    if (ok) setSent(true)
    else setFailed(true)
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="kontakt" className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

          {/* Left — Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">{kt.label}</p>
            <h2 className="section-title">{kt.h2}</h2>
            <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              {kt.sub}
            </p>

            {[
              { icon: <PhoneIcon size={20} />, label: kt.tel, val: '+43 1 997 15 82', sub: 'Mo–Fr 10:00–19:00, Sa 13:00–17:00', href: 'tel:+43199715820', bg: 'var(--navy)' },
              { icon: <WhatsAppIcon size={20} />, label: kt.wa, val: '+43 660 2652481', sub: kt.waSub, href: 'https://wa.me/436602652481', bg: '#25d366' },
              { icon: <MailIcon size={20} />, label: kt.mail, val: 'info@yacht-urlaub.net', sub: '', href: 'mailto:info@yacht-urlaub.net', bg: 'var(--navy)' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: c.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.icon}
                </div>
                <div>
                  <p style={{ fontSize: '0.68rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.label}</p>
                  <a href={c.href} style={{ fontSize: '0.97rem', fontWeight: 700, color: 'var(--navy)' }}>{c.val}</a>
                  {c.sub && <p style={{ fontSize: '0.74rem', color: 'var(--gray)' }}>{c.sub}</p>}
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div style={{ marginTop: '2rem', padding: '1.25rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--gray-mid)' }}>
              {kt.badges.map(t => (
                <p key={t} style={{ fontSize: '0.82rem', color: 'var(--text)', marginBottom: '0.4rem' }}>{t}</p>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ background: '#fff', borderRadius: '8px', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
              >
                <motion.div
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  style={{ marginBottom: '1rem', color: 'var(--blue)', display: 'flex', justifyContent: 'center' }}
                ><SailboatIcon size={56} /></motion.div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>{kt.sentH}</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Vielen Dank, <strong>{form.name}</strong>! Wir melden uns innerhalb von 24 Stunden bei Ihnen unter <strong>{form.email}</strong>.
                </p>
                <button onClick={() => { setSent(false); setStep(0); setForm(initial) }} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                  {kt.new}
                </button>
              </motion.div>
            ) : (
              <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

                {/* Step indicator */}
                <div className="kontakt-stepper" style={{ padding: '1.25rem 2rem', background: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 0 }}>
                  {kt.steps.map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < kt.steps.length - 1 ? 1 : 'none' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: i <= step ? 'var(--blue-light)' : 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        transition: 'background 0.3s',
                      }}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span className={i === step ? 'kontakt-step-label active' : 'kontakt-step-label'} style={{ fontSize: '0.7rem', color: i <= step ? '#fff' : 'rgba(255,255,255,0.4)', marginLeft: '6px', fontWeight: i === step ? 700 : 400 }}>{s}</span>
                      {i < kt.steps.length - 1 && <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)', margin: '0 12px' }} />}
                    </div>
                  ))}
                </div>

                <form onSubmit={submit} style={{ padding: '2rem' }}>

                  {/* Step 0: Reisedaten */}
                  {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                      <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                        {kfm.whither}
                      </h3>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>{kfm.dest}</label>
                        <select value={form.destination} onChange={e => set('destination', e.target.value)} style={inputStyle(!!errors.destination)}>
                          <option value="">{kfm.wahl}</option>
                          <optgroup label={kfm.grpEU}>
                            {kfm.dests.map(d => <option key={d}>{d}</option>)}
                          </optgroup>
                          <optgroup label={kfm.grpFern}>
                            {kfm.destsFern.map(d => <option key={d}>{d}</option>)}
                          </optgroup>
                          <option value="offen">{kfm.offen}</option>
                        </select>
                        {errors.destination && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.destination}</p>}
                      </div>

                      <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={labelStyle}>{kfm.art}</label>
                          <select value={form.toerntyp} onChange={e => set('toerntyp', e.target.value)} style={inputStyle()}>
                            <option value="">{kfm.wahl}</option>
                            {kfm.typen.map(d => <option key={d}>{d}</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>{kfm.pers}</label>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button type="button"
                              onClick={() => set('personen', String(Math.max(1, parseInt(form.personen) - 1)))}
                              style={{ width: '36px', height: '36px', border: '1.5px solid #e2e8f0', borderRadius: '4px', background: '#fff', fontSize: '1.1rem', cursor: 'pointer', flexShrink: 0 }}>−</button>
                            <input type="number" min="1" max="20" value={form.personen}
                              onChange={e => set('personen', e.target.value)}
                              style={{ ...inputStyle(!!errors.personen), textAlign: 'center', flex: 1 }} />
                            <button type="button"
                              onClick={() => set('personen', String(Math.min(20, parseInt(form.personen) + 1)))}
                              style={{ width: '36px', height: '36px', border: '1.5px solid #e2e8f0', borderRadius: '4px', background: '#fff', fontSize: '1.1rem', cursor: 'pointer', flexShrink: 0 }}>+</button>
                          </div>
                        </div>
                      </div>

                      <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={labelStyle}>{kfm.von}</label>
                          <input type="date" value={form.datum_von} min={today}
                            onChange={e => set('datum_von', e.target.value)}
                            style={inputStyle(!!errors.datum_von)} />
                          {errors.datum_von && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.datum_von}</p>}
                        </div>
                        <div>
                          <label style={labelStyle}>{kfm.bis}</label>
                          <input type="date" value={form.datum_bis} min={form.datum_von || today}
                            onChange={e => set('datum_bis', e.target.value)}
                            style={inputStyle()} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Gewünschter Yachttyp</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {kfm.yachten.map(y => (
                            <button key={y} type="button"
                              onClick={() => set('yacht', y)}
                              style={{
                                padding: '7px 14px', borderRadius: '20px', fontSize: '0.78rem', cursor: 'pointer',
                                border: `1.5px solid ${form.yacht === y ? 'var(--blue)' : '#e2e8f0'}`,
                                background: form.yacht === y ? 'var(--blue-pale)' : '#fff',
                                color: form.yacht === y ? 'var(--blue)' : 'var(--gray)',
                                fontWeight: form.yacht === y ? 700 : 400,
                                transition: 'all 0.2s',
                              }}>
                              {y}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Buchungsabsicht</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {[
                            ...kfm.absichten,
                          ].map(opt => (
                            <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: '#444' }}>
                              <input type="radio" name="buchungsabsicht" value={opt.val}
                                checked={form.buchungsabsicht === opt.val}
                                onChange={() => set('buchungsabsicht', opt.val)}
                                style={{ accentColor: 'var(--blue)' }} />
                              {opt.label}
                            </label>
                          ))}
                        </div>
                      </div>

                      <button type="button" onClick={next} className="btn btn-primary" style={{ width: '100%' }}>
                        Weiter →
                      </button>
                    </motion.div>
                  )}

                  {/* Step 1: Kontaktdaten */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                      <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                        {kfm.reach}
                      </h3>

                      {/* Summary */}
                      <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--gray)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><MapPinIcon size={13} /> {form.destination || '–'}</span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><CalendarIcon size={13} /> {form.datum_von || '–'}</span>
                        <span>{form.personen} Personen</span>
                        {form.yacht && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}><SailboatIcon size={13} /> {form.yacht}</span>}
                      </div>

                      <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={labelStyle}>{kfm.name}</label>
                          <input value={form.name} onChange={e => set('name', e.target.value)}
                            placeholder={kfm.namePh} style={inputStyle(!!errors.name)} />
                          {errors.name && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.name}</p>}
                        </div>
                        <div>
                          <label style={labelStyle}>{kfm.mail}</label>
                          <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                            placeholder={kfm.mailPh} style={inputStyle(!!errors.email)} />
                          {errors.email && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.email}</p>}
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>{kfm.tel}</label>
                        <input value={form.phone} onChange={e => set('phone', e.target.value)}
                          placeholder="+43 ..." style={inputStyle()} />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>Gewünschte Kontaktart</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {kfm.kontaktarten.map(k => (
                            <button key={k} type="button"
                              onClick={() => set('kontaktart', k)}
                              style={{
                                padding: '7px 14px', borderRadius: '20px', fontSize: '0.78rem', cursor: 'pointer',
                                border: `1.5px solid ${form.kontaktart === k ? 'var(--blue)' : '#e2e8f0'}`,
                                background: form.kontaktart === k ? 'var(--blue-pale)' : '#fff',
                                color: form.kontaktart === k ? 'var(--blue)' : 'var(--gray)',
                                fontWeight: form.kontaktart === k ? 700 : 400,
                                transition: 'all 0.2s',
                              }}>
                              {k}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>{kfm.wishes}</label>
                        <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)}
                          placeholder={kfm.wishesPh}
                          style={{ ...inputStyle(), resize: 'vertical' }} />
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>{kfm.found}</label>
                        <select value={form.gefunden} onChange={e => set('gefunden', e.target.value)} style={inputStyle()}>
                          <option value="">{kfm.wahl}</option>
                          {kfm.foundOpts.map(d => <option key={d}>{d}</option>)}
                        </select>
                      </div>

                      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '1.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.newsletter} onChange={e => set('newsletter', e.target.checked)}
                          style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.5 }}>
                          {kfm.nl}
                        </span>
                      </label>

                      {failed && (
                        <p style={{ fontSize: '0.82rem', color: '#e53e3e', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                          {lang === 'en'
                            ? 'Your request could not be sent. Please try again or email us at info@yacht-urlaub.net.'
                            : 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@yacht-urlaub.net.'}
                        </p>
                      )}
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button type="button" onClick={back} className="btn btn-ghost" style={{ flex: 1 }}>{kfm.zurueck}</button>
                        <button type="submit" className="btn btn-navy" style={{ flex: 2 }} disabled={sending}>{sending ? '…' : kfm.absenden}</button>
                      </div>
                    </motion.div>
                  )}
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
        input:focus, select:focus, textarea:focus { border-color: var(--blue) !important; box-shadow: 0 0 0 3px rgba(27,122,158,0.1); }
        @media (max-width: 900px) {
          #kontakt .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
        @media (max-width: 560px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .kontakt-stepper { padding: 1rem 1.25rem !important; }
          .kontakt-step-label:not(.active) { display: none; }
        }
      `}</style>
    </section>
  )
}
