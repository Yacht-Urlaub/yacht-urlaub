import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BASE_DE } from '../i18n'
import { Link } from '../router'
import SEO from '../components/SEO'

// Rueckblick auf das Event "Sail into the Seasons – Vienna Edition"
// (14.11.2026, District Living Vienna). Das Event richtete sich nur an den
// deutschsprachigen Markt — die Seite gibt es deshalb nur auf
// yacht-urlaub.net (DE-Route in App.tsx, kein EN-Pendant in i18n.ts).

const DIR = '/images/events/sail-into-the-seasons-2026'

// Fotos vom Event. Leeres Array → Galerie-Abschnitt wird ausgeblendet.
const GALLERY: { src: string; alt: string }[] = [
  { src: `${DIR}/gallery/rueckblick-01b.webp`, alt: 'Gespannte Gesichter im Publikum während des Vortrags' },
  { src: `${DIR}/gallery/rueckblick-02.webp`, alt: 'Begrüßung der Gäste am Mikrofon vor der Yacht-Urlaub-Leinwand' },
  { src: `${DIR}/gallery/rueckblick-03.webp`, alt: 'Rum-Flaschen und eine Kokosnuss auf dem Verkostungstisch von Rumzentrum.at' },
  { src: `${DIR}/gallery/rueckblick-04.webp`, alt: 'Fragerunde zu den British Virgin Islands mit Mikrofon vor dem Yacht-Urlaub-Roll-up' },
  { src: `${DIR}/gallery/rueckblick-05.webp`, alt: 'BVI-Corner mit Roll-up der British Virgin Islands, Tablet und Prospekten' },
  { src: `${DIR}/gallery/rueckblick-06b.webp`, alt: 'Vortrag zu Yacht-Typen vor dem Publikum im District Living' },
  { src: `${DIR}/gallery/rueckblick-07.webp`, alt: 'Weintisch von Weingut Mario Altan mit den Weinen DER EINZIGE' },
  { src: `${DIR}/gallery/rueckblick-08.webp`, alt: 'Persönliche Beratung am Yacht-Urlaub-Infotisch' },
  { src: `${DIR}/gallery/rueckblick-09.webp`, alt: 'Gäste in den Sitzreihen während des Vortrags' },
  { src: `${DIR}/gallery/rueckblick-10.webp`, alt: 'Tombola-Gewinner mit seinem Preis am Yacht-Urlaub-Stand' },
  { src: `${DIR}/gallery/rueckblick-11.webp`, alt: 'Gute Laune bei den Gästen im District Living' },
  { src: `${DIR}/gallery/rueckblick-12.webp`, alt: 'Crew-Foto: das Yacht-Urlaub-Team mit Partnern vor der Leinwand' },
]

const programm = [
  { time: '13:30', title: 'Einlass & Ankommen', text: 'Erste Gespräche, Flyer und Törn-Fotos an unseren zwei Infotischen und in der BVI-Corner.' },
  { time: '14:00', title: 'Ihr erster Yacht-Urlaub', text: 'Manuel Göschl, Inhaber von Yacht-Urlaub, erklärte Einsteigern, wie ein Segelurlaub mit Skipper abläuft – ganz ohne Vorkenntnisse.' },
  { time: '15:00', title: 'British Virgin Islands hautnah', text: 'Fragerunde und persönlicher Austausch mit dem offiziellen Tourismusboard der Britischen Jungferninseln.' },
  { time: 'ab 15:00', title: 'Rum & Wein', text: 'Internationale Rumsorten von Rumzentrum.at und Weine von DER EINZIGE.' },
  { time: '16:00', title: 'Sail-Off 2027: Adria oder Karibik?', text: 'Zwei Reviere, zwei Arten zu segeln: Dubrovnik & Montenegro oder die British Virgin Islands – mit je einem Kojen-Törn zum Mitsegeln.' },
  { time: '18:00', title: 'Tombola', text: 'Hauptpreis: ein Segelgutschein im Wert von € 1.250,– – dazu viele weitere Preise.' },
]

const angebote = [
  {
    img: '/images/kabinen/dubrovnik/gallery/g-dubrovnik-lovrijenac.webp',
    alt: 'Blick auf die Festung Lovrijenac und die Altstadtmauern von Dubrovnik',
    region: 'Kroatien · Sommer',
    title: 'Dubrovnik: 7 Nächte zwischen Elaphiten, Korčula und Mljet',
    date: '05.–12.06.2027',
    facts: ['Katamaran Bali 4.1 mit Skipper Manuel', 'ACI Marina Dubrovnik', 'Altstadt vom Wasser, Austern in Ston, Nationalpark Mljet'],
    old: '€ 1.980,–',
    price: '€ 1.390,–',
    href: '/kabinen#dubrovnik',
  },
  {
    img: '/images/kabinen/karibik-bvi/gallery/g-baths-strand-yacht.webp',
    alt: 'Granitfelsen und Sandstrand von The Baths auf Virgin Gorda, im Hintergrund eine Yacht',
    region: 'Karibik · Winter',
    title: 'British Virgin Islands: 10 Nächte zwischen Tortola, Jost Van Dyke, Anegada und Virgin Gorda',
    date: '27.02.–09.03.2027',
    facts: ['Katamaran Bali 4.2 mit Skipper Manuel', 'Start ab Tortola', 'The Baths, Anegada-Hummer, Painkiller an der White Bay'],
    old: '€ 2.910,–',
    price: '€ 2.330,–',
    href: '/kabinen#bvi',
  },
]

const partner = [
  { name: 'BVI Tourism', text: 'Das offizielle Tourismusboard der Britischen Jungferninseln – mit Insider-Wissen aus erster Hand.' },
  { name: 'Rumzentrum.at', text: 'Für die Verkostung internationaler Rumsorten – der perfekte Vorgeschmack auf die Karibik.' },
  { name: 'DER EINZIGE', text: 'Für die Weine des Abends vom Weingut Mario Altan.' },
  { name: 'District Living Vienna', text: 'Für die Location in der Donau City.' },
]

const kicker = { color: 'var(--blue)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase' as const, fontWeight: 600, marginBottom: '0.4rem' }
const h2 = { fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)', color: 'var(--navy)', lineHeight: 1.25, marginBottom: '0.6rem', fontWeight: 700 }
const card = { background: '#fff', border: '1px solid #eee', borderRadius: '4px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }

export default function NewsSailIntoTheSeasons2026Page() {
  const [open, setOpen] = useState<number | null>(null)
  const url = `${BASE_DE}/news/sail-into-the-seasons-2026`

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen(i => (i === null ? i : (i + 1) % GALLERY.length))
      if (e.key === 'ArrowLeft') setOpen(i => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const h1 = 'Sail into the Seasons: so war unser Segel-Nachmittag in Wien'
  const lead = 'Am 14. November 2026 haben wir im District Living Vienna gemeinsam mit dem Tourismusboard der British Virgin Islands, Rumzentrum.at und DER EINZIGE die Segelsaison 2027 eingeläutet. Danke an alle, die dabei waren!'

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        headline: h1,
        description: lead,
        image: `${BASE_DE}${DIR}/rueckblick-titel-2.jpg`,
        datePublished: '2026-11-23',
        dateModified: '2026-11-23',
        author: { '@type': 'Organization', name: 'Yacht-Urlaub' },
        publisher: { '@type': 'Organization', name: 'Yacht-Urlaub' },
        mainEntityOfPage: url,
        about: { '@id': `${url}#event` },
      },
      {
        '@type': 'Event',
        '@id': `${url}#event`,
        name: 'Sail into the Seasons – Vienna Edition',
        startDate: '2026-11-14T13:30:00+01:00',
        endDate: '2026-11-14T20:00:00+01:00',
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        isAccessibleForFree: true,
        image: `${BASE_DE}${DIR}/rueckblick-titel-2.jpg`,
        location: {
          '@type': 'Place',
          name: 'District Living Vienna',
          address: { '@type': 'PostalAddress', streetAddress: 'Donau-City-Straße 3', postalCode: '1220', addressLocality: 'Wien', addressCountry: 'AT' },
        },
        organizer: { '@type': 'Organization', name: 'Yacht-Urlaub', url: BASE_DE },
      },
    ],
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Rückblick: Sail into the Seasons 2026 in Wien"
        description="Fotos und Highlights vom Yacht-Urlaub-Event am 14.11.2026 in Wien: Einsteiger-Vortrag, British Virgin Islands, Sail-Off mit Dubrovnik oder Karibik, Rum-Verkostung und die Kojen-Angebote 2027."
        image={`${DIR}/rueckblick-titel-2.webp`}
        schema={schema}
      />

      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '400px', overflow: 'hidden' }}>
        <img
          src={`${DIR}/rueckblick-titel-2.webp`}
          alt="Einsteiger-Vortrag „Mein erster Törn“ vor vollem Saal im District Living Vienna"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.9) 0%, rgba(15,35,56,0.55) 60%, rgba(15,35,56,0.15) 100%)' }} />
        <div className="container" style={{ position: 'relative', padding: '4rem 0' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Rückblick · Vienna Edition
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4.4vw, 3rem)', lineHeight: 1.12, color: '#fff', maxWidth: '17em', marginBottom: '1rem', fontWeight: 700 }}>
            {h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', maxWidth: '36em' }}>
            {lead}
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.25rem' }}>
            {['14.11.2026', 'Wien · Donau City', 'BVI & Dubrovnik'].map(m => (
              <span key={m} style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2px', padding: '4px 10px' }}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Programm */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p style={kicker}>Der Nachmittag</p>
          <h2 style={h2}>Vom ersten Segeltraum bis zur Tombola</h2>
          <p style={{ maxWidth: '64ch', color: 'var(--text)', marginBottom: '2rem' }}>
            Ein Nachmittag voller Fernweh: Vorträge für Einsteiger und alte Hasen, Karibik-Feeling aus erster Hand, gute Gespräche bei Rum und Wein – und zum Schluss die große Verlosung.
          </p>
          <div className="sits-prog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.25rem' }}>
            {programm.map((p, i) => (
              <motion.div key={p.time}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                style={{ ...card, padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <span style={{ alignSelf: 'flex-start', fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', background: 'var(--blue-pale, #e0f2fe)', borderRadius: '20px', padding: '2px 10px' }}>{p.time.startsWith('ab') ? p.time : `${p.time} Uhr`}</span>
                <b style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', lineHeight: 1.3 }}>{p.title}</b>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.6 }}>{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galerie */}
      {GALLERY.length > 0 && (
        <section className="section" style={{ background: '#fff' }}>
          <div className="container" style={{ maxWidth: '1100px' }}>
            <p style={kicker}>Galerie</p>
            <h2 style={h2}>Die schönsten Momente</h2>
            <p style={{ maxWidth: '64ch', color: 'var(--text)', marginBottom: '2rem' }}>Klicken Sie auf ein Foto, um es groß anzusehen. Fotos: Lukas Fuchs sowie Lisa & Enya.</p>
            <div className="sits-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gridAutoRows: '190px', gap: '10px' }}>
              {GALLERY.map((g, i) => (
                <button key={g.src} onClick={() => setOpen(i)} aria-label={`Foto vergrößern: ${g.alt}`}
                  className={i % 7 === 0 ? 'sits-big' : undefined}
                  style={{ padding: 0, border: 0, cursor: 'zoom-in', overflow: 'hidden', borderRadius: '4px', background: '#eee' }}>
                  <img src={g.src} alt={g.alt} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s', display: 'block' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
                </button>
              ))}
            </div>
          </div>
          {open !== null && (
            <div role="dialog" aria-modal="true" aria-label={GALLERY[open].alt} onClick={() => setOpen(null)}
              style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(7,27,47,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
              <img src={GALLERY[open].src} alt={GALLERY[open].alt} onClick={e => e.stopPropagation()}
                style={{ maxWidth: '100%', maxHeight: '88vh', objectFit: 'contain', borderRadius: '4px' }} />
              <button onClick={e => { e.stopPropagation(); setOpen((open - 1 + GALLERY.length) % GALLERY.length) }} aria-label="Vorheriges Foto" style={lbBtn('left')}>‹</button>
              <button onClick={e => { e.stopPropagation(); setOpen((open + 1) % GALLERY.length) }} aria-label="Nächstes Foto" style={lbBtn('right')}>›</button>
              <button onClick={() => setOpen(null)} aria-label="Schließen" style={{ ...lbBtn('right'), top: '1.5rem', transform: 'none', fontSize: '1.6rem' }}>×</button>
            </div>
          )}
        </section>
      )}

      {/* Angebote */}
      <section className="section" style={{ background: GALLERY.length > 0 ? 'var(--gray-light)' : '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p style={kicker}>Die Angebote vom Abend</p>
          <h2 style={h2}>Sommer oder Winter? Am besten beides.</h2>
          <p style={{ maxWidth: '64ch', color: 'var(--text)', marginBottom: '2rem' }}>
            Beim Sail-Off haben wir zwei Kojen-Törns 2027 vorgestellt. Sie buchen eine einzelne Koje auf einer Gemeinschaftsyacht, Skipper Manuel ist an Bord – ideal für Alleinreisende, Paare und kleine Gruppen. Keine Segelkenntnisse nötig.
          </p>
          <div className="sits-offer-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem' }}>
            {angebote.map((a, i) => (
              <motion.article key={a.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ ...card, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img src={a.img} alt={a.alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--blue)', color: '#fff', padding: '3px 10px', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px' }}>{a.region}</span>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)' }}>{a.date}</span>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.15rem', color: 'var(--navy)', lineHeight: 1.3, fontWeight: 700 }}>{a.title}</h3>
                  <ul style={{ margin: 0, padding: '0.8rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.92rem', color: 'var(--text)' }}>
                    {a.facts.map(f => <li key={f}>› {f}</li>)}
                  </ul>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', flexWrap: 'wrap' }}>
                    <s style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{a.old}</s>
                    <b style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem' }}>{a.price}</b>
                    <span style={{ color: 'var(--gray)', fontSize: '0.85rem' }}>pro Koje</span>
                  </div>
                  <Link to={a.href} className="btn btn-primary" style={{ marginTop: 'auto', textAlign: 'center' }}>Details & Koje anfragen →</Link>
                </div>
              </motion.article>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '1.5rem' }}>
            Preise pro Koje (pro Person). An- und Abreise sowie Bordkasse sind nicht inkludiert. Alle Details auf der Seite <Link to="/kabinen" style={{ color: 'var(--blue)' }}>Kabinen-Angebote</Link>.
          </p>
        </div>
      </section>

      {/* Danke */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p style={kicker}>Danke</p>
          <h2 style={h2}>Ohne unsere Partner wäre der Abend nur halb so schön</h2>
          <div className="sits-partner-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
            {partner.map(p => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', borderTop: '3px solid var(--blue-light)', paddingTop: '0.9rem' }}>
                <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>{p.name}</b>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.6 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '4px', padding: '2.25rem', display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Nicht dabei gewesen?</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '52ch' }}>Kein Problem – wir beraten Sie gern persönlich zu Ihrem Segelurlaub 2027. Oder Sie stellen sich Ihren Törn gleich selbst im Urlaubsplaner zusammen.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '240px' }}>
              <Link to="/urlaubsplaner" className="btn btn-primary" style={{ textAlign: 'center' }}>Zum Urlaubsplaner →</Link>
              <a href="https://wa.me/436602652481" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'var(--whatsapp, #25d366)', color: 'var(--navy)', textAlign: 'center' }}>WhatsApp schreiben</a>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>oder anrufen: +43 1 997 15 82</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .sits-gallery .sits-big { grid-column: span 2; grid-row: span 2; }
        @media (max-width: 900px) {
          .sits-prog-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .sits-partner-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .sits-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-auto-rows: 160px !important; }
        }
        @media (max-width: 640px) {
          .sits-prog-grid, .sits-offer-grid, .sits-partner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}

function lbBtn(side: 'left' | 'right') {
  return {
    position: 'absolute' as const, [side]: '1.5rem', top: '50%', transform: 'translateY(-50%)',
    width: '48px', height: '48px', borderRadius: '50%', border: 0, cursor: 'pointer',
    background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '2rem', lineHeight: 1,
  }
}
