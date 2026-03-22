import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const inputStyle = (error?: boolean): React.CSSProperties => ({
  width: '100%', padding: '11px 14px',
  border: `1.5px solid ${error ? '#e53e3e' : '#e2e8f0'}`,
  borderRadius: '4px', fontSize: '0.9rem', outline: 'none',
  fontFamily: 'Open Sans, sans-serif', background: '#fff',
  color: 'var(--text)', transition: 'border-color 0.2s',
})

const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.72rem', fontWeight: 700,
  color: 'var(--navy)', marginBottom: '6px',
  textTransform: 'uppercase', letterSpacing: '0.06em',
}

const steps = ['Reisedaten', 'Kontakt', 'Absenden']

type Form = {
  destination: string
  toerntyp: string
  personen: string
  datum_von: string
  datum_bis: string
  yacht: string
  name: string
  email: string
  phone: string
  message: string
  newsletter: boolean
}

const initial: Form = {
  destination: '', toerntyp: '', personen: '2',
  datum_von: '', datum_bis: '', yacht: '',
  name: '', email: '', phone: '', message: '', newsletter: false,
}

export default function Kontakt() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<Form>(initial)
  const [errors, setErrors] = useState<Partial<Form>>({})

  const set = (k: keyof Form, v: string | boolean) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const validateStep = (s: number) => {
    const e: Partial<Form> = {}
    if (s === 0) {
      if (!form.destination) e.destination = 'Bitte wählen'
      if (!form.datum_von) e.datum_von = 'Datum eingeben'
      if (!form.personen) e.personen = 'Anzahl eingeben'
    }
    if (s === 1) {
      if (!form.name.trim()) e.name = 'Name eingeben'
      if (!form.email.includes('@')) e.email = 'Gültige E-Mail eingeben'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const next = () => { if (validateStep(step)) setStep(s => s + 1) }
  const back = () => setStep(s => s - 1)
  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(1)) {
      const formData = new FormData()
      formData.append('form-name', 'anfrage')
      Object.entries(form).forEach(([k, v]) => formData.append(k, String(v)))
      fetch('/', { method: 'POST', body: formData })
        .finally(() => setSent(true))
    }
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
            <p className="section-label">Kontakt</p>
            <h2 className="section-title">Anfrage starten</h2>
            <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              Wir beraten Sie gerne persönlich. Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden.
            </p>

            {[
              { icon: '📞', label: 'Telefon', val: '+43 1 997 15 82', sub: 'Mo–Fr 10:00–19:00, Sa 13:00–17:00', href: 'tel:+43199715820', bg: 'var(--navy)' },
              { icon: '💬', label: 'WhatsApp', val: '+43 660 2652481', sub: 'Schnelle Antwort', href: 'https://wa.me/436602652481', bg: '#25d366' },
              { icon: '✉️', label: 'E-Mail', val: 'info@yacht-urlaub.net', sub: '', href: 'mailto:info@yacht-urlaub.net', bg: 'var(--navy)' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.1rem' }}>
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
              {['✓ Persönliche Beratung', '✓ Antwort innerhalb 24h', '✓ Kostenlose Erstberatung', '✓ Über 10 Jahre Erfahrung'].map(t => (
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
                  style={{ fontSize: '3rem', marginBottom: '1rem' }}
                >⛵</motion.div>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>Anfrage gesendet!</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                  Vielen Dank, <strong>{form.name}</strong>! Wir melden uns innerhalb von 24 Stunden bei Ihnen unter <strong>{form.email}</strong>.
                </p>
                <button onClick={() => { setSent(false); setStep(0); setForm(initial) }} className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
                  Neue Anfrage
                </button>
              </motion.div>
            ) : (
              <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', overflow: 'hidden' }}>

                {/* Step indicator */}
                <div style={{ padding: '1.25rem 2rem', background: 'var(--navy)', display: 'flex', alignItems: 'center', gap: 0 }}>
                  {steps.map((s, i) => (
                    <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: i <= step ? 'var(--blue-light)' : 'rgba(255,255,255,0.15)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        transition: 'background 0.3s',
                      }}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: i <= step ? '#fff' : 'rgba(255,255,255,0.4)', marginLeft: '6px', fontWeight: i === step ? 700 : 400 }}>{s}</span>
                      {i < steps.length - 1 && <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)', margin: '0 12px' }} />}
                    </div>
                  ))}
                </div>

                <form name="anfrage" data-netlify="true" onSubmit={submit} style={{ padding: '2rem' }}>
                  <input type="hidden" name="form-name" value="anfrage" />

                  {/* Step 0: Reisedaten */}
                  {step === 0 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                        Wohin soll die Reise gehen?
                      </h3>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>Destination *</label>
                        <select value={form.destination} onChange={e => set('destination', e.target.value)} style={inputStyle(!!errors.destination)}>
                          <option value="">Bitte wählen</option>
                          <optgroup label="Europa">
                            <option>Kroatien – Dalmatien</option>
                            <option>Kroatien – Kornaten</option>
                            <option>Kroatien – Istrien</option>
                            <option>Griechenland – Ionische Inseln</option>
                            <option>Griechenland – Kykladen</option>
                            <option>Balearen – Mallorca</option>
                            <option>Balearen – Ibiza & Formentera</option>
                            <option>Kanaren</option>
                          </optgroup>
                          <optgroup label="Karibik & Fernziele">
                            <option>Karibik – BVI</option>
                            <option>Karibik – Grenadinen</option>
                            <option>Seychellen</option>
                            <option>Thailand</option>
                          </optgroup>
                          <option value="offen">Noch offen / beraten lassen</option>
                        </select>
                        {errors.destination && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.destination}</p>}
                      </div>

                      <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={labelStyle}>Art des Törns</label>
                          <select value={form.toerntyp} onChange={e => set('toerntyp', e.target.value)} style={inputStyle()}>
                            <option value="">Bitte wählen</option>
                            <option>Skippered (mit Skipper)</option>
                            <option>Bareboat (selbst segeln)</option>
                            <option>Kabinentörn</option>
                            <option>Charter</option>
                            <option>Noch unsicher</option>
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>Personen *</label>
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
                          <label style={labelStyle}>Abreise *</label>
                          <input type="date" value={form.datum_von} min={today}
                            onChange={e => set('datum_von', e.target.value)}
                            style={inputStyle(!!errors.datum_von)} />
                          {errors.datum_von && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.datum_von}</p>}
                        </div>
                        <div>
                          <label style={labelStyle}>Rückkehr (ca.)</label>
                          <input type="date" value={form.datum_bis} min={form.datum_von || today}
                            onChange={e => set('datum_bis', e.target.value)}
                            style={inputStyle()} />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={labelStyle}>Gewünschter Yachttyp</label>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {['Segelyacht', 'Katamaran', 'Motoryacht', 'Egal'].map(y => (
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

                      <button type="button" onClick={next} className="btn btn-primary" style={{ width: '100%' }}>
                        Weiter →
                      </button>
                    </motion.div>
                  )}

                  {/* Step 1: Kontaktdaten */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                      <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.15rem', marginBottom: '1.5rem' }}>
                        Wie können wir Sie erreichen?
                      </h3>

                      {/* Summary */}
                      <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '0.85rem 1rem', marginBottom: '1.5rem', fontSize: '0.8rem', color: 'var(--gray)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <span>📍 {form.destination || '–'}</span>
                        <span>📅 {form.datum_von || '–'}</span>
                        <span>👤 {form.personen} Personen</span>
                        {form.yacht && <span>⛵ {form.yacht}</span>}
                      </div>

                      <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <label style={labelStyle}>Name *</label>
                          <input value={form.name} onChange={e => set('name', e.target.value)}
                            placeholder="Ihr Name" style={inputStyle(!!errors.name)} />
                          {errors.name && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.name}</p>}
                        </div>
                        <div>
                          <label style={labelStyle}>E-Mail *</label>
                          <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                            placeholder="ihre@email.at" style={inputStyle(!!errors.email)} />
                          {errors.email && <p style={{ color: '#e53e3e', fontSize: '0.72rem', marginTop: '4px' }}>{errors.email}</p>}
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>Telefon</label>
                        <input value={form.phone} onChange={e => set('phone', e.target.value)}
                          placeholder="+43 ..." style={inputStyle()} />
                      </div>

                      <div style={{ marginBottom: '1.25rem' }}>
                        <label style={labelStyle}>Ihre Wünsche & Fragen</label>
                        <textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)}
                          placeholder="Was ist Ihnen besonders wichtig? Haben Sie spezielle Wünsche?"
                          style={{ ...inputStyle(), resize: 'vertical' }} />
                      </div>

                      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '1.5rem', cursor: 'pointer' }}>
                        <input type="checkbox" checked={form.newsletter} onChange={e => set('newsletter', e.target.checked)}
                          style={{ marginTop: '3px', flexShrink: 0 }} />
                        <span style={{ fontSize: '0.78rem', color: 'var(--gray)', lineHeight: 1.5 }}>
                          Ja, ich möchte den Newsletter mit Angeboten und Neuigkeiten erhalten.
                        </span>
                      </label>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button type="button" onClick={back} className="btn btn-ghost" style={{ flex: 1 }}>← Zurück</button>
                        <button type="submit" className="btn btn-navy" style={{ flex: 2 }}>Anfrage absenden ⛵</button>
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
        }
      `}</style>
    </section>
  )
}
