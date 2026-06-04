import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const benefits = [
  { icon: '💰', title: 'Attraktive Provisionen', text: 'Verdienen Sie bis zu 10% Provision auf jede vermittelte Buchung — transparent, pünktlich und ohne versteckte Abzüge.' },
  { icon: '📦', title: 'Fertige Reisepakete', text: 'Fertig konfektionierte Pakete mit Yacht, Skipper, Transfers und Versicherung — bereit zum Verkauf ohne zusätzlichen Aufwand.' },
  { icon: '🛠️', title: 'Marketing-Support', text: 'Hochwertige Bilder, Videos, Texte und Verkaufsunterlagen in Ihrem Corporate Design auf Anfrage verfügbar.' },
  { icon: '📞', title: 'Persönlicher Ansprechpartner', text: 'Sie erhalten einen dedizierten Ansprechpartner bei Yacht-Urlaub — für schnelle Angebote und reibungslose Abwicklung.' },
  { icon: '🌍', title: 'Breites Portfolio', text: 'Kroatien, Griechenland, Balearen, Karibik-BVI, Seychellen und Thailand — für jeden Kunden das passende Revier.' },
  { icon: '🔒', title: 'Sichere Abwicklung', text: 'Trusted Shops zertifiziert, transparente Stornobedingungen und direkter Kundenschutz — Ihr Ruf ist bei uns sicher.' },
]

const steps = [
  { num: '01', title: 'Partneranfrage stellen', text: 'Füllen Sie das Formular unten aus — wir melden uns innerhalb von 24 Stunden.' },
  { num: '02', title: 'Partnervertrag & Onboarding', text: 'Sie erhalten Ihren Partnervertrag, Zugangsdaten und alle Verkaufsunterlagen.' },
  { num: '03', title: 'Angebote anfragen', text: 'Schicken Sie uns Kundenanfragen — wir erstellen individuelle Angebote in Ihrem Namen.' },
  { num: '04', title: 'Provision erhalten', text: 'Nach Buchungsbestätigung und Reiseantritt wird Ihre Provision automatisch abgerechnet.' },
]

export default function ReisebueroPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Reisebüros & Affiliate-Partner"
        description="Werden Sie Yacht-Urlaub Partner: Attraktive Provisionen, fertige Reisepakete und persönlicher Support für Reisebüros und Affiliate-Partner. Segelurlaub in Kroatien, Griechenland, Karibik und mehr."
        canonical="/reisebuero"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '360px', overflow: 'hidden', background: 'var(--navy)' }}>
        <img
          src="/images/team_destinationen/destinationen.jpg"
          alt="Partner"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.92) 0%, rgba(7,27,47,0.5) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Partnerschaft
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Reisebüros & Affiliate-Partner
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.8 }}>
            Erweitern Sie Ihr Portfolio mit hochwertigen Segelreisen — und verdienen Sie attraktive Provisionen.
          </motion.p>
        </div>
      </div>

      {/* Benefits */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Ihre Vorteile
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
              Warum Partner von Yacht-Urlaub?
            </h2>
            <p style={{ color: 'var(--gray)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Über 10 Jahre Erfahrung, mehr als 500 zufriedene Gäste und ein Portfolio, das verkauft sich selbst.
            </p>
          </motion.div>

          <div className="rb-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ border: '1.5px solid var(--gray-light)', borderRadius: '4px', padding: '2rem', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--blue)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(2,132,199,0.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--gray-light)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{b.icon}</div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>{b.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7 }}>{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              So funktioniert's
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--navy)' }}>
              In 4 Schritten zum Partner
            </h2>
          </motion.div>
          <div className="rb-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ textAlign: 'center', padding: '1.5rem 1rem' }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'var(--navy)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.1rem',
                  margin: '0 auto 1.25rem',
                }}>{s.num}</div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '0.6rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.82rem', lineHeight: 1.7 }}>{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="partner-anfrage" className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '2.5rem' }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Partneranfrage
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
              Jetzt Partner werden
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>
              Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            name="partner-anfrage"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={e => {
              e.preventDefault()
              const form = e.target as HTMLFormElement
              fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString(),
              }).then(() => {
                form.reset()
                alert('Vielen Dank! Wir melden uns in Kürze bei Ihnen.')
              })
            }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            <input type="hidden" name="form-name" value="partner-anfrage" />
            <input type="hidden" name="bot-field" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Name *
                </label>
                <input required name="name" type="text" placeholder="Ihr Name"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Reisebüro / Firma *
                </label>
                <input required name="firma" type="text" placeholder="Name des Unternehmens"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  E-Mail *
                </label>
                <input required name="email" type="email" placeholder="ihre@email.at"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Telefon
                </label>
                <input name="telefon" type="tel" placeholder="+43 ..."
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Website / Social Media
              </label>
              <input name="website" type="url" placeholder="https://..."
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Ihre Nachricht
              </label>
              <textarea name="nachricht" rows={4} placeholder="Kurze Vorstellung Ihres Unternehmens und Ihrer Erwartungen an die Partnerschaft..."
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #e2e8f0', borderRadius: '4px', fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '13px 32px' }}>
              Partneranfrage senden →
            </button>
          </motion.form>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .rb-benefits-grid { grid-template-columns: 1fr 1fr !important; }
          .rb-steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .rb-benefits-grid { grid-template-columns: 1fr !important; }
          .rb-steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
