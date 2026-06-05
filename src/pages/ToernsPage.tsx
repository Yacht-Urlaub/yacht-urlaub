import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { AnchorIcon, WavesIcon, ShieldIcon, SparklesIcon } from '../components/Icons'
import { useLang } from '../i18n'

const categories = [
  {
    id: 'einsteiger',
    subtitle: 'Für Einsteiger',
    title: 'Zum ersten Mal hier?',
    text: 'Noch nie gesegelt? Perfekt. Spüren Sie das Kribbeln, wenn sich die Yacht in Bewegung setzt – sicher begleitet von einem erfahrenen Skipper.',
    img: '/images/Zielgruppen/Einsteiger 1.jpg',
    cta: 'Einsteiger-Törns',
  },
  {
    id: 'freunde',
    subtitle: 'Für Freunde',
    title: 'Mit Freunden',
    text: 'Auf eurer Yacht erlebt ihr gemeinsam, was sonst nur in Filmen passiert. Sonne, Meer, Freiheit — und das gemeinsam.',
    img: '/images/Zielgruppen/Freunde 1.jpg',
    cta: 'Freunde-Törns',
  },
  {
    id: 'familien',
    subtitle: 'Für Familien',
    title: 'Familien-Törns',
    text: 'Ein Segelabenteuer, das Kinder staunen und Eltern durchatmen lässt. Unvergessliche Momente für die ganze Familie.',
    img: '/images/Zielgruppen/Familie 1.jpg',
    cta: 'Familien-Törns',
  },
  {
    id: 'luxury',
    subtitle: 'Für Anspruchsvolle',
    title: 'Luxury',
    text: 'Gönnen Sie sich Meer mit Stil. An Bord unserer Luxusyachten wird jeder Sonnenuntergang zur Privataufführung.',
    img: '/images/Zielgruppen/Entdecker 3.jpg',
    cta: 'Luxury-Törns',
  },
]

const highlights = [
  { icon: <AnchorIcon size={26} />, label: 'Skipper inklusive', desc: 'Erfahrene, mehrsprachige Skipper' },
  { icon: <WavesIcon size={26} />, label: 'Alle Reviere', desc: 'Kroatien, Griechenland, Karibik, Seychellen' },
  { icon: <ShieldIcon size={26} />, label: 'Sicher reisen', desc: 'RYA-zertifizierte Skipper, Sicherheitsbriefing' },
  { icon: <SparklesIcon size={26} />, label: 'Rundum-Sorglos', desc: 'Von der Buchung bis zur Rückkehr alles geregelt' },
]

const tol = {
  de: { tag: 'Unsere Törns', h1: 'Dein perfekter Segeltörn',
    sub: 'Von der ersten Segelstunde bis zum Luxuserlebnis — wir haben den passenden Törn für jeden.',
    forAll: 'Für jeden der Richtige', choose: 'Wähle deinen Törn',
    chooseSub: 'Egal ob du zum ersten Mal auf See gehst oder erfahrener Segler bist — bei uns findest du den Törn, der perfekt zu dir passt.',
    hl: [
      { label: 'Skipper inklusive', desc: 'Erfahrene, mehrsprachige Skipper' },
      { label: 'Alle Reviere', desc: 'Kroatien, Griechenland, Karibik, Seychellen' },
      { label: 'Sicher reisen', desc: 'RYA-zertifizierte Skipper, Sicherheitsbriefing' },
      { label: 'Rundum-Sorglos', desc: 'Von der Buchung bis zur Rückkehr alles geregelt' },
    ],
    base: '/toerns' },
  en: { tag: 'Holiday-Trips', h1: 'The right thing for everybody',
    sub: 'From your first sailing lesson to a luxury experience — we have the right cruise for everyone.',
    forAll: 'The right one for everyone', choose: 'Choose your cruise',
    chooseSub: 'Whether you are going to sea for the first time or are an experienced sailor — with us you will find the cruise that fits you perfectly.',
    hl: [
      { label: 'Skipper included', desc: 'Experienced, multilingual skippers' },
      { label: 'All sailing areas', desc: 'Croatia, Greece, Caribbean, Seychelles' },
      { label: 'Travel safely', desc: 'RYA-certified skippers, safety briefing' },
      { label: 'All-round carefree', desc: 'Everything taken care of from booking to return' },
    ],
    base: '/en/cruises' },
}
const enCruiseIds: Record<string, string> = { einsteiger: 'for-beginners', freunde: 'for-friends', familien: 'for-families', luxury: 'luxury' }
const catTitlesEn: Record<string, { subtitle: string; title: string; text: string; cta: string }> = {
  einsteiger: { subtitle: 'For beginners', title: 'New to sailing?', text: "Join our beginner's cruise and delve into everything you've ever wanted to know about life on a yacht.", cta: 'Learn more' },
  freunde: { subtitle: 'For friends', title: 'Sail with friends', text: 'Come aboard and embark on a unique holiday adventure with your friends.', cta: 'Learn more' },
  familien: { subtitle: 'For families', title: 'Create Family Memories', text: 'Experience a joy-filled family holiday with memorable experiences. Little pirates can take the helm.', cta: 'Learn more' },
  luxury: { subtitle: 'Luxury', title: 'Luxury sailing', text: 'Experience pure luxury and timeless elegance on board our motor yachts.', cta: 'Learn more' },
}

export default function ToernsPage() {
  const lang = useLang()
  const s = tol[lang]
  const en = lang === 'en'
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={en ? "Our cruises – sailing trips for everyone | Yacht-Holiday" : "Unsere Törns – Segeltörns für jeden | Yacht-Urlaub"}
        description="Von der ersten Segelstunde bis zum Luxuserlebnis: Einsteiger-Törns, Familien-Törns, Freunde-Törns und Luxury-Törns mit erfahrenen Skippern weltweit."
        canonical="/toerns"
        image="/images/Zielgruppen/Einsteiger 1.jpg"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img
          src="/images/Zielgruppen/Freunde 1.jpg"
          alt="Unsere Törns"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.85) 0%, rgba(15,35,56,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {s.tag}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            {s.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '520px', lineHeight: 1.7 }}>
            {s.sub}
          </motion.p>
        </div>
      </div>

      {/* Highlights Bar */}
      <div style={{ background: 'var(--navy)', padding: '1.5rem 0' }}>
        <div className="container toerns-highlights" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {highlights.map((h, hi) => (
            <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: 'var(--blue-light, #7fc4ff)', display: 'flex', flexShrink: 0 }}>{h.icon}</span>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem' }}>{s.hl[hi].label}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{s.hl[hi].desc}</div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .toerns-highlights { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            .toerns-highlights { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>

      {/* Category Cards */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              {s.forAll}
            </p>
            <h2 className="section-title">{s.choose}</h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {s.chooseSub}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  borderRadius: '4px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
                  loading="lazy"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(18,43,64,0.9) 0%, rgba(18,43,64,0.3) 50%, transparent 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
                  <p style={{ color: 'var(--blue-light)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{en ? catTitlesEn[cat.id].subtitle : cat.subtitle}</p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.4rem', marginBottom: '0.75rem', lineHeight: 1.25 }}>{en ? catTitlesEn[cat.id].title : cat.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{en ? catTitlesEn[cat.id].text : cat.text}</p>
                  <Link to={en ? `/en/cruises/${enCruiseIds[cat.id]}` : `/toerns/${cat.id}`} className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '9px 18px' }}>
                    {en ? catTitlesEn[cat.id].cta : cat.cta} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .toerns-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .toerns-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              {en ? 'No suitable cruise for you?' : 'Kein passender Törn dabei?'}
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '1.25rem' }}>
              {en ? 'Your bespoke cruise, tailor-made' : 'Dein individueller Törn nach Maß'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {en ? 'We plan your dream cruise entirely to your wishes — travel time, destination, yacht and crew. Contact us for a personal quote.' : 'Wir planen deinen Traumtörn ganz nach deinen Wünschen — Reisezeit, Zielgebiet, Yacht und Crew. Kontaktiere uns für ein persönliches Angebot.'}
            </p>
            <a href="#kontakt" className="btn btn-primary">{en ? 'Get a quote' : 'Jetzt anfragen'}</a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
