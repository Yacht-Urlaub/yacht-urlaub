import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

const destinations = [
  { id: 'kroatien', label: 'Kroatien', sub: 'Dalmatien · Kornaten · Istrien', img: '/images/Destinationsbilder/Header/Kroatien Bucht.webp' },
  { id: 'griechenland', label: 'Griechenland', sub: 'Ionische Inseln · Kykladen · Ägäis', img: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg' },
  { id: 'balearen', label: 'Balearen', sub: 'Mallorca · Ibiza · Menorca', img: '/images/Destinationsbilder/blick-auf-palma-de-mallorca.jpg' },
  { id: 'karibik', label: 'Karibik-BVI', sub: 'Britische Jungferninseln · Grenadinen', img: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg' },
  { id: 'seychellen', label: 'Seychellen', sub: 'Mahé · Praslin · La Digue', img: '/images/Destinationsbilder/Seychellen.webp' },
  { id: 'thailand', label: 'Thailand', sub: 'Phuket · Phi-Phi · Similan', img: '/images/Destinationsbilder/Thailand 1.jpg' },
  { id: 'ueberrasch', label: 'Überrasch mich!', sub: 'Wir empfehlen das Beste für Sie', img: '/images/Front.jpg' },
]

const tripTypes = [
  { id: 'einsteiger', label: 'Für Einsteiger', desc: 'Noch nie gesegelt? Kein Problem — unser Skipper kümmert sich um alles.', icon: '🌊' },
  { id: 'familie', label: 'Für Familien', desc: 'Unvergessliche Abenteuer für die ganze Familie.', icon: '👨‍👩‍👧‍👦' },
  { id: 'freunde', label: 'Für Freunde', desc: 'Gemeinsam die Freiheit auf dem Meer erleben.', icon: '🥂' },
  { id: 'luxury', label: 'Luxury', desc: 'Exklusiv, stilsicher und unvergesslich — das beste Erlebnis.', icon: '✨' },
  { id: 'charter', label: 'Privatyacht / Charter', desc: 'Komplette Yacht für sich allein — mit oder ohne Skipper.', icon: '⛵' },
  { id: 'kabine', label: 'Einzelne Kabine', desc: 'Ideal für Alleinreisende und Paare.', icon: '🛏️' },
]

const durations = ['3–4 Tage', '7 Tage (1 Woche)', '10 Tage', '14 Tage (2 Wochen)', 'Flexibel']

const steps = ['Destination', 'Reisezeitraum', 'Art des Törns', 'Ihre Daten']

const fadeIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

type FormData = {
  destination: string
  month: string
  duration: string
  tripType: string
  name: string
  email: string
  phone: string
  notes: string
}

export default function UrlaubsplanerPage() {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<FormData>({
    destination: '',
    month: '',
    duration: '',
    tripType: '',
    name: '',
    email: '',
    phone: '',
    notes: '',
  })

  const update = (key: keyof FormData, val: string) => setForm(prev => ({ ...prev, [key]: val }))

  const canNext = () => {
    if (step === 0) return !!form.destination
    if (step === 1) return !!form.month && !!form.duration
    if (step === 2) return !!form.tripType
    return !!form.name && !!form.email
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = new URLSearchParams({
      'form-name': 'urlaubsplaner',
      destination: form.destination,
      month: form.month,
      duration: form.duration,
      tripType: form.tripType,
      name: form.name,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
    })
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
    } catch {
      // continue regardless
    }
    setSent(true)
  }

  const selectedDest = destinations.find(d => d.id === form.destination)
  const selectedTrip = tripTypes.find(t => t.id === form.tripType)

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-light)' }}>
      <SEO
        title="Urlaubsplaner – Segelurlaub planen | Yacht-Urlaub"
        description="Planen Sie Ihren Traumurlaub in 4 einfachen Schritten: Destination wählen, Zeitraum festlegen, Art des Törns auswählen und Anfrage senden."
        canonical="/urlaubsplaner"
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3.5rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            In 4 Schritten zum Traumurlaub
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '0.75rem' }}>
            Urlaubsplaner
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
            Sagen Sie uns, was Sie sich vorstellen — wir machen daraus Ihren perfekten Segelurlaub.
          </p>
        </div>
      </div>

      {sent ? (
        <div className="container" style={{ maxWidth: '640px', padding: '5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>⚓</div>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '2rem', marginBottom: '1rem' }}>
            Vielen Dank, {form.name}!
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            Wir haben Ihre Anfrage erhalten und melden uns innerhalb von 24 Stunden bei Ihnen — persönlich, ohne automatische Antwort.
          </p>
          <a href="/" className="btn btn-primary">Zurück zur Startseite</a>
        </div>
      ) : (
        <div className="container" style={{ maxWidth: '860px', padding: '3rem 1.5rem 5rem' }}>

          {/* Progress */}
          <div className="planer-stepper" style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: '3rem' }}>
            {steps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: i < step ? 'pointer' : 'default' }}
                  onClick={() => i < step && setStep(i)}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: i < step ? 'var(--blue)' : i === step ? 'var(--navy)' : 'var(--gray-mid)',
                    color: i <= step ? '#fff' : 'var(--gray)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.85rem',
                    transition: 'all 0.3s',
                    boxShadow: i === step ? '0 0 0 3px rgba(2,132,199,0.25)' : 'none',
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="planer-step-label" style={{ fontSize: '0.68rem', marginTop: '4px', color: i === step ? 'var(--navy)' : 'var(--gray)', fontWeight: i === step ? 700 : 400, whiteSpace: 'nowrap' }}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="planer-connector" style={{ width: '60px', height: '2px', background: i < step ? 'var(--blue)' : 'var(--gray-mid)', margin: '0 4px', marginBottom: '18px', transition: 'background 0.3s' }} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* Step 0: Destination */}
            {step === 0 && (
              <motion.div key="step0" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Wohin soll die Reise gehen?
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>Wählen Sie Ihr Wunschrevier</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="planer-dest-grid">
                  {destinations.map(d => (
                    <button
                      key={d.id}
                      onClick={() => update('destination', d.id)}
                      style={{
                        position: 'relative', overflow: 'hidden', border: '3px solid',
                        borderColor: form.destination === d.id ? 'var(--blue)' : 'transparent',
                        borderRadius: '6px', cursor: 'pointer', background: 'none', padding: 0,
                        outline: 'none', aspectRatio: '4/3',
                        boxShadow: form.destination === d.id ? '0 0 0 2px var(--blue)' : '0 2px 12px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <img src={d.img} alt={d.label} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: form.destination === d.id
                          ? 'linear-gradient(to top, rgba(2,132,199,0.85) 0%, rgba(2,132,199,0.4) 50%, transparent 100%)'
                          : 'linear-gradient(to top, rgba(7,27,47,0.85) 0%, rgba(7,27,47,0.3) 60%, transparent 100%)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem',
                        transition: 'background 0.2s',
                      }}>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', textAlign: 'left', lineHeight: 1.2 }}>{d.label}</span>
                        <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', textAlign: 'left', marginTop: '2px' }}>{d.sub}</span>
                        {form.destination === d.id && (
                          <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Zeitraum */}
            {step === 1 && (
              <motion.div key="step1" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Wann möchten Sie reisen?
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2.5rem', fontSize: '0.9rem' }}>Wählen Sie Ihren ungefähren Reisezeitraum</p>

                <div style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', maxWidth: '560px', margin: '0 auto' }}>
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      Monat / Zeitraum
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                      {['April 2026', 'Mai 2026', 'Juni 2026', 'Juli 2026', 'August 2026', 'September 2026', 'Oktober 2026', 'November 2026', 'Flexibel'].map(m => (
                        <button key={m} onClick={() => update('month', m)} style={{
                          padding: '10px 8px', borderRadius: '4px', border: '2px solid',
                          borderColor: form.month === m ? 'var(--blue)' : 'var(--gray-mid)',
                          background: form.month === m ? 'var(--blue-pale)' : '#fff',
                          color: form.month === m ? 'var(--blue)' : 'var(--text)',
                          fontSize: '0.82rem', fontWeight: form.month === m ? 700 : 400,
                          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                          transition: 'all 0.15s',
                        }}>
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                      Reisedauer
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {durations.map(d => (
                        <button key={d} onClick={() => update('duration', d)} style={{
                          padding: '10px 18px', borderRadius: '4px', border: '2px solid',
                          borderColor: form.duration === d ? 'var(--blue)' : 'var(--gray-mid)',
                          background: form.duration === d ? 'var(--blue-pale)' : '#fff',
                          color: form.duration === d ? 'var(--blue)' : 'var(--text)',
                          fontSize: '0.85rem', fontWeight: form.duration === d ? 700 : 400,
                          cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                          transition: 'all 0.15s',
                        }}>
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Art des Törns */}
            {step === 2 && (
              <motion.div key="step2" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Welche Art von Törn?
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>Was entspricht am besten Ihren Vorstellungen?</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} className="planer-trip-grid">
                  {tripTypes.map(t => (
                    <button
                      key={t.id}
                      onClick={() => update('tripType', t.id)}
                      style={{
                        textAlign: 'left', padding: '1.5rem', borderRadius: '6px', border: '2px solid',
                        borderColor: form.tripType === t.id ? 'var(--blue)' : 'var(--gray-mid)',
                        background: form.tripType === t.id ? 'var(--blue-pale)' : '#fff',
                        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'DM Sans, sans-serif',
                        boxShadow: form.tripType === t.id ? '0 4px 16px rgba(2,132,199,0.15)' : '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{t.icon}</div>
                      <div style={{ fontWeight: 700, color: form.tripType === t.id ? 'var(--blue)' : 'var(--navy)', fontSize: '1rem', marginBottom: '0.4rem' }}>{t.label}</div>
                      <div style={{ color: 'var(--gray)', fontSize: '0.82rem', lineHeight: 1.6 }}>{t.desc}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Kontaktdaten */}
            {step === 3 && (
              <motion.div key="step3" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  Wie dürfen wir Sie kontaktieren?
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
                  Wir melden uns persönlich innerhalb von 24 Stunden.
                </p>

                {/* Summary */}
                <div style={{ background: 'var(--navy)', borderRadius: '6px', padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  {selectedDest && (
                    <div>
                      <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Destination</span>
                      <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{selectedDest.label}</p>
                    </div>
                  )}
                  {form.month && (
                    <div>
                      <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Zeitraum</span>
                      <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{form.month} · {form.duration}</p>
                    </div>
                  )}
                  {selectedTrip && (
                    <div>
                      <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Törn-Art</span>
                      <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{selectedTrip.label}</p>
                    </div>
                  )}
                </div>

                <form
                  name="urlaubsplaner"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', maxWidth: '560px', margin: '0 auto' }}
                >
                  <input type="hidden" name="form-name" value="urlaubsplaner" />
                  <input type="hidden" name="destination" value={form.destination} />
                  <input type="hidden" name="month" value={form.month} />
                  <input type="hidden" name="duration" value={form.duration} />
                  <input type="hidden" name="tripType" value={form.tripType} />
                  <p style={{ display: 'none' }}><label>Nicht ausfüllen: <input name="bot-field" /></label></p>

                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Name *</label>
                      <input
                        type="text" name="name" required value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Ihr vollständiger Name"
                        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-mid)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>E-Mail *</label>
                      <input
                        type="email" name="email" required value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="ihre@email.de"
                        style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-mid)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Telefon (optional)</label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={e => update('phone', e.target.value)}
                      placeholder="+43 / +49 / +41 ..."
                      style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-mid)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' }}>Anmerkungen / Wünsche</label>
                    <textarea
                      name="notes" rows={4} value={form.notes}
                      onChange={e => update('notes', e.target.value)}
                      placeholder="Anzahl Personen, besondere Wünsche, Erfahrung, Budget ..."
                      style={{ width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-mid)', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canNext()}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '14px', opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed' }}
                  >
                    Anfrage senden — kostenlos &amp; unverbindlich →
                  </button>
                  <p style={{ color: 'var(--gray)', fontSize: '0.75rem', marginTop: '0.75rem', textAlign: 'center' }}>
                    Wir melden uns persönlich innerhalb von 24 Stunden. Kein Spam.
                  </p>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Nav Buttons */}
          {step < 3 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', maxWidth: '860px' }}>
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{
                  background: 'none', border: '1.5px solid var(--gray-mid)', color: 'var(--gray)',
                  padding: '11px 24px', borderRadius: '4px', cursor: step === 0 ? 'not-allowed' : 'pointer',
                  opacity: step === 0 ? 0.4 : 1, fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
              >
                ← Zurück
              </button>
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '11px 32px', opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed' }}
              >
                Weiter →
              </button>
            </div>
          )}
          {step === 3 && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>
              <button
                onClick={() => setStep(2)}
                style={{
                  background: 'none', border: '1.5px solid var(--gray-mid)', color: 'var(--gray)',
                  padding: '11px 24px', borderRadius: '4px', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
                }}
              >
                ← Zurück
              </button>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .planer-dest-grid { grid-template-columns: 1fr 1fr !important; }
          .planer-trip-grid { grid-template-columns: 1fr !important; }
          .planer-connector { width: 28px !important; }
        }
        @media (max-width: 480px) {
          .planer-dest-grid { grid-template-columns: 1fr !important; }
          .planer-connector { width: 16px !important; }
          .planer-step-label { display: none !important; }
          .planer-stepper { margin-bottom: 2rem !important; }
        }
      `}</style>
    </main>
  )
}
