import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const skipperServices = [
  {
    icon: '⚓',
    title: 'Skipper-Service',
    desc: 'Unser erfahrenes Skipper-Team übernimmt die Navigation — Sie genießen entspannt den Urlaub. Ideal für Einsteiger und alle, die einfach relaxen möchten.',
    features: [
      'Erfahrene, mehrsprachige Skipper (DE/EN)',
      'Hochseeskipper-Patent & Sicherheitszertifikate',
      'Lokales Revier-Know-how & Geheimtipps',
      'Sicherheitsbriefing & Einweisung inklusive',
      'Tagesweise oder für die gesamte Reise buchbar',
      'Auf Wunsch auch Segelunterricht während des Törns',
    ],
  },
  {
    icon: '🍽️',
    title: 'Bord-Service',
    desc: 'Vom Frühstück bis zum Sundowner-Cocktail — unser Bord-Service macht Ihren Segelurlaub zum Rundum-sorglos-Erlebnis.',
    features: [
      'Proviantplanung & Einkauf nach Wunsch',
      'Kochen an Bord auf Anfrage',
      'Bordwäsche & Reinigungsservice',
      'Willkommens-Paket bei Anreise',
      'Transfer-Organisation (Flughafen, Marina)',
      'Individuelle Sonderwünsche auf Anfrage',
    ],
  },
  {
    icon: '👩‍✈️',
    title: 'Hostess & Koch',
    desc: 'Für Luxury-Törns oder besondere Anlässe stellen wir auf Wunsch eine professionelle Hostess oder einen Bordkoch zur Verfügung.',
    features: [
      'Professionelle Hostess für Events & Gruppen',
      'Erfahrene Bordköche auf Anfrage',
      'Tagesweise oder für die gesamte Reise',
      'Menüplanung nach Ihren Wünschen',
      'Diätetische Anforderungen berücksichtigt',
      'Preise auf Anfrage',
    ],
  },
]

const faqs = [
  {
    q: 'Brauche ich Segelerfahrung wenn ich einen Skipper buche?',
    a: 'Nein — das ist der große Vorteil des Skipper-Service. Der Skipper übernimmt die gesamte Navigation, Ankermanöver und alle seemännischen Aufgaben. Sie können sich vollständig entspannen und das Meer genießen.',
  },
  {
    q: 'Kann ich trotzdem selbst am Steuer mithelfen?',
    a: 'Selbstverständlich! Die meisten Gäste wollen das. Unser Skipper erklärt gerne Segelgrundlagen, lässt Sie ans Steuer und macht den Urlaub zum aktiven Lernerlebnis — wenn Sie das möchten.',
  },
  {
    q: 'Wie wird der Skipper untergebracht?',
    a: 'Der Skipper schläft in einer eigenen kleinen Kabine (Skipperkabine) an Bord. Bei kleineren Yachten oder auf Wunsch kann der Skipper auch an Land übernachten.',
  },
  {
    q: 'Was kostet der Skipper-Service?',
    a: 'Der Skipper-Service ist bei unseren geführten Törns und Packages im Preis inbegriffen. Bei individuellen Charterreisen wird der Skipper tagesweise abgerechnet. Bitte kontaktieren Sie uns für ein individuelles Angebot.',
  },
]

export default function SkipperPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Skipper- & Bord-Service | Yacht-Urlaub"
        description="Professioneller Skipper-Service und Bord-Service für Ihren Segelurlaub. Erfahrene Skipper, Hostess, Bordkoch auf Anfrage. Keine Vorkenntnisse nötig — wir kümmern uns um alles."
        canonical="/skipper"
        image="/images/team_destinationen/skipper-manuel-goeschl.jpg"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img
          src="/images/team_destinationen/skipper-toni-liebscher.jpg"
          alt="Skipper & Bord-Service"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/monohull.jpg' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 65%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Sorglos-Paket an Bord
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Skipper- & Bord-Service
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.8 }}>
            Sie segeln, wir kümmern uns um den Rest — von der Navigation bis zum Abendessen.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a href="#anfrage" className="btn btn-primary">Service anfragen →</a>
            <Link to="/crew" className="btn btn-outline">Unser Team kennenlernen</Link>
          </motion.div>
        </div>
      </div>

      {/* Services */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Unser Angebot
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
              Rundum-sorglos auf dem Wasser
            </h2>
            <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8 }}>
              Kein Stress, keine Vorkenntnisse nötig — unser Service-Team sorgt dafür, dass Sie sich von der ersten bis zur letzten Minute erholen können.
            </p>
          </motion.div>

          <div className="skipper-services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {skipperServices.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ border: '1.5px solid var(--gray-light)', borderRadius: '4px', padding: '2rem' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>{s.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{s.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '0.6rem', fontSize: '0.82rem', color: 'var(--text)' }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Häufige Fragen
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--navy)' }}>
              Alles zum Skipper-Service
            </h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
            {faqs.map((item, i) => (
              <motion.details
                key={item.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden' }}
              >
                <summary style={{
                  padding: '1.25rem 1.5rem', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                  color: 'var(--navy)', fontSize: '0.95rem',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  listStyle: 'none',
                }}>
                  {item.q}
                  <span style={{ color: 'var(--blue)', fontSize: '1.2rem', flexShrink: 0, marginLeft: '1rem' }}>+</span>
                </summary>
                <div style={{ padding: '0 1.5rem 1.25rem', color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.8 }}>
                  {item.a}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Anfrage */}
      <section id="anfrage" className="section" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
              Skipper & Service anfragen
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Teilen Sie uns Ihre Wünsche mit — wir stellen das passende Service-Paket für Ihren Törn zusammen.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-outline">+43 1 997 15 82</a>
              <a href="#kontakt" className="btn btn-primary">Anfrage starten →</a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .skipper-services-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .skipper-services-grid { grid-template-columns: 1fr !important; }
        }
        details summary::-webkit-details-marker { display: none; }
      `}</style>
    </main>
  )
}
