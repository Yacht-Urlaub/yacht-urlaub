import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const angebote = [
  {
    id: 'kornaten-juni',
    title: 'Segelurlaub in die Kornaten',
    destination: 'Kroatien · Kornaten',
    abfahrt: 'Zadar',
    datum: '06.06. – 13.06.2026',
    preis: '€ 720,–',
    preisNote: 'pro Person, in der Doppelkabine (Einzelnutzung +50 %)',
    plaetze: '4 Plätze noch übrig!',
    plaetzeColor: '#16a34a',
    bord: false,
    desc: 'Eine unvergessliche Woche auf einer gemütlichen Einrumpf-Segelyacht durch den Nationalpark Kornaten. Perfekt für Meeresliebhaber, die die ursprünglichste Inselwelt Kroatiens erleben möchten.',
    img: '/images/packages/Kornaten/gallery/Telascica.webp',
    included: [
      'Übernachtung in der Doppelkabine',
      'Skipper inklusive',
      'Endstrandreinigung',
      'Nationalparkgebühren',
      'Hafen- und Bojengebühren laut Route',
    ],
  },
  {
    id: 'kornaten-august',
    title: 'Segelurlaub in die Kornaten',
    destination: 'Kroatien · Kornaten',
    abfahrt: 'Zadar',
    datum: '22.08. – 29.08.2026',
    preis: '€ 1.210,–',
    preisNote: 'pro Person, in der Doppelkabine (Einzelnutzung +50 %)',
    plaetze: 'Nur noch 2 Plätze übrig!',
    plaetzeColor: '#dc2626',
    bord: true,
    bordNote: 'Bord-Service inklusive (Frühstück & Mittagssnack)',
    desc: 'Das Rundum-Sorglos-Paket in den Kornaten: Mit Bord-Service für Frühstück und Mittagssnack an Bord — Sie müssen sich um nichts kümmern. Einfach genießen.',
    img: '/images/packages/Kornaten/gallery/Mono Kornaten.webp',
    included: [
      'Übernachtung in der Doppelkabine',
      'Skipper inklusive',
      'Bord-Service: Frühstück & Mittagssnack',
      'Endstrandreinigung',
      'Nationalparkgebühren',
      'Hafen- und Bojengebühren laut Route',
    ],
  },
]

export default function KabinenPage() {

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Kabinen-Angebote – Einzelne Kabine buchen"
        description="Buchen Sie eine einzelne Kabine auf einer Gemeinschaftsyacht. Aktuelle Kabinen-Angebote für Kroatien (Kornaten, Dalmatien) und weitere Destinationen. Ideal für Alleinreisende und Paare."
        canonical="/kabinen"
        image="/images/packages/Kornaten/gallery/Telascica.webp"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="/images/packages/Kornaten/gallery/Telascica.webp" alt="Kabinen-Angebote"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/katamaran.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Für Alleinreisende & kleine Gruppen
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem', fontWeight: 700 }}>
            Kabinen-Angebote
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.8 }}>
            Buchen Sie eine einzelne Kabine auf einer Gemeinschaftsyacht — und teilen Sie sich die Yacht mit einer netten Crew.
          </motion.p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ background: '#fff', padding: '3.5rem 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <p style={{ color: 'var(--blue)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Was ist ein Kabinentörn?
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--navy)', marginBottom: '1.25rem', fontWeight: 700 }}>
            Segelurlaub — auch alleine oder zu zweit
          </h2>
          <p style={{ color: 'var(--gray)', lineHeight: 1.9, fontSize: '0.95rem', marginBottom: '1rem' }}>
            Beim Kabinentörn buchen Sie nicht die gesamte Yacht, sondern nur eine oder zwei Kabinen. Sie segeln gemeinsam mit anderen Gästen — und unserem erfahrenen Skipper, der die Navigation übernimmt. Eine hervorragende Möglichkeit, den Segelurlaub auch als Einzelperson, Paar oder kleine Gruppe zu erleben — ohne eine ganze Yacht chartern zu müssen.
          </p>
          <p style={{ color: 'var(--gray)', lineHeight: 1.9, fontSize: '0.95rem' }}>
            Segelerfahrung ist nicht erforderlich. Der Skipper übernimmt die gesamte Navigation — Sie genießen einfach.
          </p>
        </div>
      </section>

      {/* Angebote */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          <p style={{ color: 'var(--blue)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>
            Aktuelle Termine
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: 'var(--navy)', marginBottom: '3rem', textAlign: 'center', fontWeight: 700 }}>
            Verfügbare Kabinen-Angebote
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {angebote.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img src={a.img} alt={a.title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/katamaran.jpg' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--navy)', color: '#fff', padding: '6px 14px', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {a.datum}
                  </div>
                  {a.bord && (
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--gold)', color: 'var(--navy)', padding: '5px 12px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      ✦ Mit Bord-Service
                    </div>
                  )}
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <p style={{ color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {a.destination} · Abfahrt: {a.abfahrt}
                  </p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 700 }}>{a.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{a.desc}</p>

                  {/* Included */}
                  <ul style={{ listStyle: 'none', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {a.included.map(item => (
                      <li key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.84rem', color: 'var(--text)' }}>
                        <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>

                  {/* Price + Availability */}
                  <div style={{ borderTop: '1px solid var(--gray-mid)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.1 }}>{a.preis}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--gray)', marginTop: '4px' }}>{a.preisNote}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: a.plaetzeColor, marginBottom: '0.5rem' }}>{a.plaetze}</p>
                      <a href="#kontakt" className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '10px 20px' }}>
                        Jetzt anfragen →
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info boxes */}
      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: '👥', title: 'Gemeinschaft an Bord', text: 'Sie segeln mit anderen Gästen und lernen neue Menschen kennen — oft entstehen so lebenslange Freundschaften.' },
              { icon: '⛵', title: 'Kein Segelschein nötig', text: 'Unser erfahrener Skipper übernimmt die Navigation. Sie müssen nur genießen — Vorkenntnisse sind kein Muss.' },
              { icon: '💶', title: 'Günstigere Alternative', text: 'Die geteilten Kosten machen den Segelurlaub erschwinglich — ohne auf Komfort oder Erlebnis verzichten zu müssen.' },
            ].map(box => (
              <motion.div key={box.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{box.icon}</div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.75rem' }}>{box.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.8 }}>{box.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem', fontWeight: 700 }}>
              Interesse an einem Kabinentörn?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Fragen Sie uns einfach — wir finden das passende Angebot für Sie.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-outline">+43 1 997 15 82</a>
              <a href="#kontakt" className="btn btn-primary">Anfrage starten →</a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .container > div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; }
          .container > div[style*="repeat(auto-fit"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
