import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export default function Kontakt() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', destination: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kontakt" className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Kontakt
            </p>
            <h2 className="section-title">Anfrage starten</h2>
            <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              Wir beraten Sie gerne persönlich und helfen Ihnen, den perfekten Törn zu finden. Kontaktieren Sie uns — wir antworten innerhalb von 24 Stunden.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.1rem' }}>📞</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Telefon</p>
                  <a href="tel:+43199715820" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)' }}>+43 1 997 15 82</a>
                  <p style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>Mo–Fr 10:00–19:00, Sa 13:00–17:00</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#25d366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>WhatsApp</p>
                  <a href="https://wa.me/436602652481" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)' }}>+43 660 2652481</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1.1rem' }}>✉️</span>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>E-Mail</p>
                  <a href="mailto:info@yacht-urlaub.net" style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--navy)' }}>info@yacht-urlaub.net</a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {sent ? (
              <div style={{ background: '#fff', borderRadius: '6px', padding: '3rem', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⛵</p>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>Anfrage gesendet!</h3>
                <p style={{ color: 'var(--gray)', lineHeight: 1.7 }}>Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '6px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name *</label>
                    <input
                      required value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Ihr Name"
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '0.9rem', outline: 'none', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>E-Mail *</label>
                    <input
                      type="email" required value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="ihre@email.at"
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '0.9rem', outline: 'none', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Telefon</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="+43 ..."
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '0.9rem', outline: 'none', fontFamily: 'Open Sans, sans-serif' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Destination</label>
                    <select
                      value={form.destination}
                      onChange={e => setForm({ ...form, destination: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '0.9rem', outline: 'none', fontFamily: 'Open Sans, sans-serif', background: '#fff' }}
                    >
                      <option value="">Bitte wählen</option>
                      <option>Kroatien</option>
                      <option>Griechenland</option>
                      <option>Balearen</option>
                      <option>Kanaren</option>
                      <option>Karibik-BVI</option>
                      <option>Windward Islands</option>
                      <option>Thailand</option>
                      <option>Seychellen</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ihre Nachricht</label>
                  <textarea
                    rows={4} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Erzählen Sie uns von Ihren Wünschen..."
                    style={{ width: '100%', padding: '10px 14px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '0.9rem', outline: 'none', resize: 'vertical', fontFamily: 'Open Sans, sans-serif' }}
                  />
                </div>
                <button type="submit" className="btn btn-navy" style={{ width: '100%', fontSize: '0.82rem' }}>
                  Anfrage senden →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #kontakt .container > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  )
}
