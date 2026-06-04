import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const articles = [
  {
    id: 'seychellen-angebot',
    tag: 'Angebot',
    title: 'Dein Platz an der Sonne',
    date: '18.04. – 28.04.2026',
    text: '18.04. – 28.04.2026 ab Mahé, Seychellen inklusive Skipper, Katamaran-Komfort und unvergesslicher Momente.',
    img: '/images/Destinationsbilder/Seychellen.webp',
    href: '/destinationen/seychellen',
    cta: 'Mehr erfahren',
  },
  {
    id: 'familien-kroatien',
    tag: 'Familie',
    title: 'Vorteile für Familien in Kroatien',
    date: 'Saison 2026',
    text: 'Unser Partner MySea ermöglicht allen Familien günstiger durch die Inselwelt Kroatiens zu segeln. Exklusive Familienrabatte und familienfreundliche Routen.',
    img: '/images/news/Dalmatia_kat.webp',
    href: '/toerns/familien',
    cta: 'Mehr erfahren',
  },
  {
    id: 'kabinen-angebote',
    tag: 'Kabinen',
    title: 'Kabinen-Angebote',
    date: 'Ganzjährig',
    text: 'Entdecken Sie exklusive Kabinenangebote für Ihren Traum-Yachturlaub – individuell und unvergesslich! Buchen Sie eine einzelne Kabine auf einer Gemeinschaftsyacht.',
    img: '/images/news/beach-bikini-jump.jpg',
    href: '#kontakt',
    cta: 'Angebote ansehen',
  },
  {
    id: 'einsteiger-package',
    tag: 'Einsteiger',
    title: 'Einsteiger-Package in der Adria',
    date: 'Mai – Oktober 2026',
    text: 'Noch nie gesegelt? Kein Problem! Unser Einsteiger-Package in Kroatien bringt Sie sicher und entspannt durch die dalmatinischen Inseln.',
    img: '/images/Zielgruppen/Einsteiger 1.jpg',
    href: '/toerns/einsteiger',
    cta: 'Mehr erfahren',
  },
  {
    id: 'dalmatien-split',
    tag: 'Angebot',
    title: 'Segeln in Dalmatien ab Split',
    date: 'Sommer 2026',
    text: 'Die klassische Route entlang der süddalmatinischen Küste: von Split nach Dubrovnik mit Stopps auf Hvar, Vis und Mljet.',
    img: '/images/Destinationsbilder/Header/Kroatien Bucht.webp',
    href: '/destinationen/kroatien',
    cta: 'Mehr erfahren',
  },
  {
    id: 'griechenland-paket',
    tag: 'Angebot',
    title: 'Segeln in Griechenland',
    date: 'Mai – Oktober 2026',
    text: 'Die ionischen Inseln, die Kykladen oder der Saronische Golf – Griechenland bietet unendliche Möglichkeiten für Ihren Segelurlaub.',
    img: '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
    href: '/destinationen/griechenland',
    cta: 'Mehr erfahren',
  },
]

const tags = ['Alle', 'Angebot', 'Familie', 'Kabinen', 'Einsteiger']

export default function NewsPage() {
  const [activeTag, setActiveTag] = useState('Alle')

  const filtered = activeTag === 'Alle' ? articles : articles.filter(a => a.tag === activeTag)

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="News & Angebote – Top-Deals für Ihren Yachturlaub | Yacht-Urlaub"
        description="Aktuelle Segelurlaub-Angebote, Kabinen-Deals und Paketreisen von Yacht-Urlaub. Kroatien, Griechenland, Seychellen, Karibik und mehr."
        canonical="/news"
        image="/images/Destinationsbilder/Seychellen.webp"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '360px', overflow: 'hidden' }}>
        <img
          src="/images/Destinationsbilder/Seychellen.webp"
          alt="News & Angebote"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.88) 0%, rgba(15,35,56,0.45) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Aktuelles
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            Top-News &amp; Angebote
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: '480px' }}>
            Aktuelle Angebote, Schnäppchen und Neuigkeiten rund um Ihren Yachturlaub.
          </motion.p>
        </div>
      </div>

      {/* Filter Tags */}
      <div style={{ background: '#fff', borderBottom: '1px solid #eee', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '6px 16px', fontSize: '0.78rem', fontWeight: 600,
                border: '1px solid',
                borderColor: activeTag === tag ? 'var(--blue)' : '#ddd',
                background: activeTag === tag ? 'var(--blue)' : 'transparent',
                color: activeTag === tag ? '#fff' : 'var(--gray)',
                borderRadius: '2px', cursor: 'pointer',
                transition: 'all 0.2s',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div className="news-page-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {filtered.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
                style={{
                  background: '#fff',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                  border: '1px solid #eee',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                  <img
                    src={article.img}
                    alt={article.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
                  />
                  <span style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: 'var(--blue)', color: '#fff',
                    padding: '3px 10px', fontSize: '0.65rem', fontWeight: 600,
                    letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px',
                  }}>
                    {article.tag}
                  </span>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ color: 'var(--blue)', fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    {article.date}
                  </p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.25rem', color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {article.title}
                  </h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.75, flex: 1, marginBottom: '1.25rem' }}>{article.text}</p>
                  <Link to={article.href} style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{article.cta} →</Link>
                </div>
              </motion.article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--gray)' }}>
              <p>Keine Beiträge in dieser Kategorie.</p>
            </div>
          )}
        </div>
        <style>{`
          @media (max-width: 900px) {
            .news-page-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .news-page-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* Newsletter CTA */}
      <section className="section" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              Kein Angebot verpassen
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#fff', marginBottom: '1.25rem' }}>
              Ihr Traumurlaub wartet
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.8 }}>
              Kontaktieren Sie uns für ein persönliches Angebot – wir finden den perfekten Törn für Sie.
            </p>
            <a href="#kontakt" className="btn btn-primary">Jetzt anfragen</a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
