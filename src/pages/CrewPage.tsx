import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const team = [
  {
    name: 'Manuel Göschl, MBA',
    role: 'Gründer & Skipper',
    img: '/images/team_destinationen/Manuel neu blau.webp',
    qualifications: ['Skipper-Patent Hochseeschein', 'MBA Wirtschaftsuniversität Wien', 'Über 10 Jahre Erfahrung', '30.000+ Seemeilen'],
    bio: 'Manuel verbindet seit über 10 Jahren seine Leidenschaft fürs Segeln mit betriebswirtschaftlichem Know-how. Er gründete Yacht-Urlaub mit der Vision, unvergessliche Segelabenteuer für alle zugänglich zu machen — von Einsteigern bis zu erfahrenen Seglern. Für ihn ist jeder Törn eine neue Geschichte.',
  },
  {
    name: 'Rebecca',
    role: 'Destinationsexpertin',
    img: '/images/team_destinationen/Rebecca.jpg',
    qualifications: ['Spezialistin Karibik & Kroatien', 'Mehrjährige Segelerfahrung', 'Routenplanung & Logistik', 'Multilingual: DE/EN/HR'],
    bio: 'Rebecca kennt die schönsten Buchten der Karibik und Kroatiens aus erster Hand. Sie plant Routen, die unvergessliche Momente garantieren — von versteckten Ankerplätzen bis zu den besten Strandrestaurants. Ihr Netzwerk vor Ort macht den Unterschied.',
  },
  {
    name: 'Toni Liebscher',
    role: 'Skipper',
    img: '/images/team_destinationen/skipper-toni-liebscher.jpg',
    qualifications: ['Hochseeskipper-Patent', 'Tausende Seemeilen Erfahrung', 'Sicherheitstrainer', 'Mittelmeer & Atlantik'],
    bio: 'Als erfahrener Skipper hat Toni tausende Seemeilen unter dem Kiel. Sicherheit, Komfort und Spaß an Bord — das ist seine Mission. Seine ruhige, kompetente Art macht auch Einsteiger schnell zu überzeugten Seglern.',
  },
]

const values = [
  { icon: '⚓', title: 'Sicherheit', text: 'Alle unsere Skipper sind lizenziert und verfügen über Hochseescheine. Sicherheitsbriefings und aktuellste Wetteranalysen sind Standard.' },
  { icon: '🗺️', title: 'Lokales Know-how', text: 'Wir kennen die besten Ankerplätze, Restaurants und Geheimtipps in jedem Revier — aus eigener Erfahrung, nicht aus Reiseführern.' },
  { icon: '🤝', title: 'Persönlicher Service', text: 'Kein Callcenter, kein anonymes Buchungssystem. Ihr Ansprechpartner kennt Ihren Törn und ist vor, während und nach der Reise für Sie da.' },
  { icon: '🌊', title: 'Leidenschaft', text: 'Wir sind selbst begeisterte Segler. Diese Leidenschaft spüren unsere Gäste — in jeder Planung, jedem Törn, jeder Empfehlung.' },
]

export default function CrewPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Unser Team – Skipper & Crew"
        description="Lernen Sie das Yacht-Urlaub Team kennen: erfahrene Skipper, Destinationsexperten und leidenschaftliche Segler. Über 10 Jahre Erfahrung, tausende Seemeilen, persönlicher Service."
        canonical="/crew"
        image="/images/team_destinationen/Manuel neu blau.webp"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden', background: 'var(--navy)' }}>
        <img
          src="/images/team_destinationen/skipper-toni-liebscher.jpg"
          alt="Unser Team"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.9) 0%, rgba(7,27,47,0.5) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Menschen hinter dem Törn
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}>
            Unser Team
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.8 }}>
            Leidenschaftliche Segler mit jahrelanger Erfahrung — wir freuen uns darauf, Sie an Bord zu begrüßen.
          </motion.p>
        </div>
      </div>

      {/* Team Members */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3.5rem' }}
          >
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Ihr Team an Bord
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
              Skipper & Experten
            </h2>
            <p style={{ color: 'var(--gray)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
              Unser kleines, eingespieltes Team steht für persönlichen Service und echte Segelleidenschaft.
            </p>
          </motion.div>

          <div className="crew-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2.5rem' }}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                style={{ background: 'var(--gray-light)', borderRadius: '4px', overflow: 'hidden' }}
              >
                <div style={{ aspectRatio: '1/1', overflow: 'hidden' }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/team_destinationen/Foto.jpg' }}
                  />
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <p style={{ color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{member.role}</p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.2rem', color: 'var(--navy)', marginBottom: '1rem' }}>{member.name}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{member.bio}</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {member.qualifications.map(q => (
                      <li key={q} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text)' }}>
                        <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span> {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '3rem' }}
          >
            <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Was uns ausmacht
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#fff' }}>
              Unsere Werte
            </h2>
          </motion.div>
          <div className="crew-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '4px', padding: '2rem 1.5rem', textAlign: 'center' }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1rem', marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.83rem', lineHeight: 1.7 }}>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#fff', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
              Lernen Sie uns persönlich kennen
            </h2>
            <p style={{ color: 'var(--gray)', marginBottom: '2rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
              Starten Sie Ihren Traumtörn mit einem unverbindlichen Gespräch — wir beraten Sie gerne persönlich.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/urlaubsplaner" className="btn btn-primary">Urlaub planen →</Link>
              <a href="#kontakt" className="btn btn-outline">Kontakt aufnehmen</a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .crew-grid { grid-template-columns: 1fr 1fr !important; }
          .crew-values-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .crew-grid { grid-template-columns: 1fr !important; }
          .crew-values-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
