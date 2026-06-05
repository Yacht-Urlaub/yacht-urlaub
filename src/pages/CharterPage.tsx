import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

// Inhalte 1:1 von yacht-urlaub.net/charter/yacht-charter-anfragen
const yachtTypen = ['Einrumpf-Segler', 'Katamaran', 'Motoryacht', 'Katamaran-Motoryacht', 'Trabakul']
const kabinen = ['1 Kabine', '2 Kabinen', '3 Kabinen', '4 Kabinen', '5 Kabinen', '6 Kabinen']
const yachtAlter = ['0-2 Jahre', '3-5 Jahre', '5-8 Jahre', 'älter', 'egal']

const warum = [
  { title: 'Qualität, auf die Sie sich verlassen können', text: 'Dank unserer langjährigen Erfahrung wissen wir genau, welche Flotten und Charter-Basen wirklich überzeugen. Sollten vor Ort Unstimmigkeiten auftreten, greifen wir auf unser breites Netzwerk zurück und lösen Probleme schnell und unkompliziert. Wir kennen die Flottenbetreiber, ihre Buchungsverantwortlichen und sogar die Basisleiter oft persönlich – genau die Menschen, mit denen Sie vor Ort in Kontakt treten.' },
  { title: 'Tipps für eine stressfreie Anreise', text: 'Ihr Urlaub beginnt schon vor der Reise. Wir kennen die Marinas, ihre Umgebung und wissen, wie Charter-Basen funktionieren. Ob Einkaufsmöglichkeiten, Parkplätze oder Transfers – wir geben Ihnen wertvolle Tipps, damit Sie entspannt starten können.' },
  { title: 'Individuelle Beratung und beste Angebote', text: 'Wir hören auf Ihre Wünsche und finden die passende Yacht für Sie – inklusive Planungshilfen für Reviere und Routen. Unser Qualitätsversprechen: Anbieter mit schlechtem Service oder schlechten Yachten kommen für uns nicht in Frage! Sollte dennoch etwas schiefgehen, stehen wir an Ihrer Seite.' },
  { title: 'Unsere Leidenschaft für Yachting – Ihr Vorteil', text: 'Yachting ist nicht nur unser Beruf, sondern unsere Passion. Profitieren Sie von unserer Expertise und lassen Sie uns Ihren perfekten Törn gestalten – weltweit!' },
]

const yachtBilder = [
  { src: '/images/charter/bavaria46-vision.jpg', caption: 'Einrumpfer/Monohull Segelyacht' },
  { src: '/images/charter/Saba-50-Katamaran.jpg', caption: 'Katamaran' },
  { src: '/images/charter/Motor-Katamaran.jpg', caption: 'Motor-Katamaran' },
]

const partnerLogos = [
  '/images/charter/partner/pitter.png', '/images/charter/partner/partner1.jpg',
  '/images/charter/partner/partner2.jpg', '/images/charter/partner/partner3.png',
  '/images/charter/partner/angelina.png', '/images/charter/partner/istion.jpg',
  '/images/charter/partner/dream.png', '/images/charter/partner/navigare.png',
]

const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' } as const
const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

export default function CharterPage() {
  const [form, setForm] = useState({
    yachtTyp: '', kabinen: '', revier: '', alter: '', start: '', ende: '',
    name: '', email: '', telefon: '', anmerkungen: '',
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    const body = new URLSearchParams({ 'form-name': 'charter-anfrage', ...form })
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      setSent(true)
    } finally { setSending(false) }
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Yacht-Charter anfragen – Bareboat-Charter weltweit | Yacht-Urlaub"
        description="Sie wollen eine Yacht chartern? Gerne nehmen wir Ihre Anfrage für Yacht-Charter (nur Yacht ohne Skipper/Bord-Service) entgegen – weltweit, persönlich und mit Qualitätsversprechen."
        canonical="/charter"
        image="/images/charter/header.png"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="/images/charter/header.png" alt="Yacht-Charter" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '0.75rem' }}>
            Yacht-Charter
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.8 }}>
            Sie wollen eine Yacht chartern? Gerne nehmen wir Ihre Anfrage für Yacht-Charter (nur Yacht ohne Skipper/Bord-Service) entgegen!
          </motion.p>
        </div>
      </div>

      {/* Hinweis */}
      <section style={{ background: '#fff8e6', borderBottom: '1px solid #f0e0b0', padding: '1rem 0' }}>
        <div className="container">
          <p style={{ color: '#7a5c00', fontSize: '0.88rem' }}>
            ⚠️ Wichtiger Hinweis für Charter-Kunden: Warum Preisvergleiche oft täuschen – <Link to="/faq" style={{ color: 'var(--blue)', fontWeight: 700 }}>hier unbedingt nachlesen »</Link>
          </p>
        </div>
      </section>

      {/* Formular + Sidebar */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          <div className="charter-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem' }}>
            <div>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Anfrage starten</h2>
              {sent ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', marginBottom: '0.5rem' }}>Vielen Dank!</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>Ihre Charter-Anfrage wurde übermittelt. Wir melden uns schnellstmöglich!</p>
                </div>
              ) : (
                <form name="charter-anfrage" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}
                  style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
                  <input type="hidden" name="form-name" value="charter-anfrage" />
                  <p style={{ display: 'none' }}><input name="bot-field" /></p>

                  <div className="charter-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Yacht-Typ *</label>
                      <select required name="yachtTyp" value={form.yachtTyp} onChange={e => set('yachtTyp', e.target.value)} style={inputStyle}>
                        <option value="">Bitte wählen …</option>
                        {yachtTypen.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Anzahl Kabinen *</label>
                      <select required name="kabinen" value={form.kabinen} onChange={e => set('kabinen', e.target.value)} style={inputStyle}>
                        <option value="">Bitte wählen …</option>
                        {kabinen.map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Revier / Wunschhäfen *</label>
                    <input required name="revier" value={form.revier} onChange={e => set('revier', e.target.value)}
                      placeholder="(z.B. Dalmatien / Split / ACI Split) Mehrfachnennungen möglich!" style={inputStyle} />
                  </div>

                  <div className="charter-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Alter der Yacht *</label>
                      <select required name="alter" value={form.alter} onChange={e => set('alter', e.target.value)} style={inputStyle}>
                        <option value="">Bitte wählen …</option>
                        {yachtAlter.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Startdatum (Check-In Tag)</label>
                      <input type="date" name="start" value={form.start} onChange={e => set('start', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>Enddatum (Check-Out Tag)</label>
                      <input type="date" name="ende" value={form.ende} onChange={e => set('ende', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, margin: '1.5rem 0 1rem' }}>Kontaktdaten</h3>

                  <div className="charter-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Vor- und Nachname *</label>
                      <input required name="name" value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>E-Mail *</label>
                      <input required type="email" name="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Telefonnummer für Rückfragen *</label>
                    <input required type="tel" name="telefon" value={form.telefon} onChange={e => set('telefon', e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Anmerkungen/Wünsche</label>
                    <textarea name="anmerkungen" rows={4} value={form.anmerkungen} onChange={e => set('anmerkungen', e.target.value)}
                      placeholder="Länge/Ausstattung/sonstiges Wissenswertes" style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  <button type="submit" disabled={sending} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '13px 36px', opacity: sending ? 0.6 : 1 }}>
                    {sending ? 'wird gesendet …' : 'Anfrage senden'}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar: Yacht-Bilder + Direktkontakt */}
            <div>
              {yachtBilder.map(b => (
                <figure key={b.src} style={{ marginBottom: '1.25rem' }}>
                  <img src={b.src} alt={b.caption} loading="lazy" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  <figcaption style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.4rem' }}>{b.caption}</figcaption>
                </figure>
              ))}
              <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '6px', padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', marginBottom: '0.5rem' }}>Ihre Charter-Anfrage – einfach und persönlich!</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                  Schreiben Sie uns direkt an:<br />
                  <a href="mailto:charter@yacht-urlaub.net" style={{ color: 'var(--gold)', fontWeight: 700 }}>charter@yacht-urlaub.net</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum bei uns chartern */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '2rem' }}>
            Warum bei uns chartern?
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {warum.map((w, i) => (
              <div key={w.title}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--blue)', fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  {i + 1}. {w.title}
                </h3>
                <p style={{ color: '#444', fontSize: '0.93rem', lineHeight: 1.8 }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner */}
      <section style={{ background: 'var(--gray-light)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '2rem' }}>
            Eine Auswahl unserer Partner
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {partnerLogos.map(logo => (
              <img key={logo} src={logo} alt="Charter-Partner" loading="lazy"
                style={{ height: '44px', objectFit: 'contain', filter: 'grayscale(1) opacity(0.6)', transition: 'filter 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0) opacity(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1) opacity(0.6)')}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            ))}
          </div>
          <p style={{ color: 'var(--gray)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>und viele mehr....</p>
          <p style={{ color: '#444', fontSize: '0.95rem' }}>
            Jetzt Anfragen: <a href="mailto:charter@yacht-urlaub.net" style={{ color: 'var(--blue)', fontWeight: 700 }}>charter@yacht-urlaub.net</a>
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .charter-grid { grid-template-columns: 1fr !important; }
          .charter-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
