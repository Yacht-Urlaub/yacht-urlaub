import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Link } from '../router'
import { useLang } from '../i18n'

const groupsEn = [
  {
    title: 'New to sailing?',
    subtitle: 'For beginners',
    text: "Join our beginner's cruise and delve into everything you've ever wanted to know about life on a yacht, all while relishing a distinctive holiday experience.",
    img: '/images/Zielgruppen/Einsteiger 1.jpg',
    cta: 'Learn more',
    href: '/en/cruises/for-beginners',
  },
  {
    title: 'Sail with friends',
    subtitle: 'For friends',
    text: 'Come aboard and embark on a unique holiday adventure with your friends - perfect for special occasions or as a refreshing break from the routine of everyday life.',
    img: '/images/Zielgruppen/Freunde 1.jpg',
    cta: 'Learn more',
    href: '/en/cruises/for-friends',
  },
  {
    title: 'Create Family Memories',
    subtitle: 'For families',
    text: 'Experience a joy-filled family holiday with memorable experiences. Little pirates can take the helm and feel absolutely fantastic.',
    img: '/images/Zielgruppen/Familie 1.jpg',
    cta: 'Learn more',
    href: '/en/cruises/for-families',
  },
  {
    title: 'Luxury sailing',
    subtitle: 'Luxury',
    text: 'Experience pure luxury and timeless elegance on board our motor yachts full of unforgettable moments and exclusive experiences tailored to your desires.',
    img: '/images/Zielgruppen/Entdecker 3.jpg',
    cta: 'Learn more',
    href: '/en/cruises/luxury',
  },
]

const groupsDe = [
  {
    title: 'Zum ersten Mal hier?',
    subtitle: 'Für Einsteiger',
    text: 'Noch nie gesegelt? Perfekt. Spüren Sie das Kribbeln, wenn sich die Yacht in Bewegung setzt – sicher begleitet von einem Skipper, der Sie entspannt einführt.',
    img: '/images/Zielgruppen/Einsteiger 1.jpg',
    cta: 'Einsteiger-Törns',
    href: '/toerns/einsteiger',
  },
  {
    title: 'Mit Freunden',
    subtitle: 'Für Freunde',
    text: 'Ob Action oder Chillen: Auf eurer Yacht erlebt ihr gemeinsam, was sonst nur in Filmen passiert. Ein Urlaub, der für immer verbindet.',
    img: '/images/Zielgruppen/Freunde 1.jpg',
    cta: 'Freunde-Törns',
    href: '/toerns/freunde',
  },
  {
    title: 'Familien-Törns',
    subtitle: 'Für Familien',
    text: 'Ein Segelabenteuer, das Kinder staunen und Eltern durchatmen lässt. Zeit für Entdeckungen – ganz ohne Alltagsstress.',
    img: '/images/Zielgruppen/Familie 1.jpg',
    cta: 'Familien-Törns',
    href: '/toerns/familien',
  },
  {
    title: 'Luxury',
    subtitle: 'Für Anspruchsvolle',
    text: 'Gönnen Sie sich Meer mit Stil. An Bord unserer Luxusyachten wird jeder Sonnenuntergang zur Privataufführung.',
    img: '/images/Zielgruppen/Entdecker 3.jpg',
    cta: 'Luxury-Törns',
    href: '/toerns/luxury',
  },
]

function Card({ g, i }: { g: typeof groupsDe[0]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12 }}
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        aspectRatio: '3/4',
      }}
    >
      <img
        src={g.img}
        alt={g.title}
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
        <p style={{ color: 'var(--blue-light)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{g.subtitle}</p>
        <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.4rem', marginBottom: '0.75rem', lineHeight: 1.25 }}>{g.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{g.text}</p>
        <Link to={g.href} className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '9px 18px' }}>{g.cta} →</Link>
      </div>
    </motion.div>
  )
}

export default function Zielgruppen() {
  const lang = useLang()
  const groups = lang === 'en' ? groupsEn : groupsDe
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="toerns" className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {lang === 'en' ? 'Holiday-Trips' : 'Unsere Törns'}
          </p>
          <h2 className="section-title">{lang === 'en' ? 'The right thing for everybody' : 'Dein perfekter Segeltörn'}</h2>
          <p className="section-subtitle">{lang === 'en' ? 'From your first sailing lesson to a luxury experience — we have the right cruise for everyone.' : 'Von der ersten Segelstunde bis zum Luxuserlebnis — wir haben den passenden Törn für jeden.'}</p>
        </motion.div>

        <div className="zielgruppen-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {groups.map((g, i) => <Card key={g.title} g={g} i={i} />)}
        </div>

        {/* Urlaubsplaner-Banner (wie auf der Originalseite) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            marginTop: '2.5rem', background: 'var(--navy)', borderRadius: '6px',
            padding: '2.25rem 2.5rem', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap',
          }}
        >
          <div>
            <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              {lang === 'en' ? 'Bespoke Cruise with the YACHT-HOLIDAY planner' : 'Individueller Törn mit dem YACHT-URLAUB Urlaubsplaner'}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              {lang === 'en' ? 'You know what you want? Start NOW your holiday planning for free!' : 'Sie wissen, was Sie möchten? Starten Sie JETZT unseren Urlaubsplaner. Unverbindlich und kostenlos!'}
            </p>
          </div>
          <Link to={lang === 'en' ? '/en/holiday-planner' : '/urlaubsplaner'} className="btn btn-gold" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
            {lang === 'en' ? 'Get a quote →' : 'Anfrage starten →'}
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .zielgruppen-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .zielgruppen-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
