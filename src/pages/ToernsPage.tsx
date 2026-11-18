import { Link } from '../router'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { AnchorIcon, WavesIcon, ShieldIcon, SparklesIcon } from '../components/Icons'
import { useLang, isEnHost, BASE_DE, BASE_EN } from '../i18n'
import PackagesGrid from '../components/PackagesGrid'

const categories = [
  {
    id: 'einsteiger',
    subtitle: 'Für Einsteiger',
    title: 'Zum ersten Mal hier?',
    text: 'Noch nie gesegelt? Perfekt. Spüren Sie das Kribbeln, wenn sich die Yacht in Bewegung setzt – sicher begleitet von einem erfahrenen Skipper.',
    img: '/images/toerns/card-einsteiger.webp',
    cta: 'Einsteiger-Törns',
  },
  {
    id: 'freunde',
    subtitle: 'Für Freunde',
    title: 'Mit Freunden',
    text: 'Auf eurer Yacht erlebt ihr gemeinsam, was sonst nur in Filmen passiert. Sonne, Meer, Freiheit — und das gemeinsam.',
    img: '/images/toerns/card-freunde.webp',
    cta: 'Freunde-Törns',
  },
  {
    id: 'familien',
    subtitle: 'Für Familien',
    title: 'Familien-Törns',
    text: 'Ein Segelabenteuer, das Kinder staunen und Eltern durchatmen lässt. Unvergessliche Momente für die ganze Familie.',
    img: '/images/toerns/card-familien.webp',
    cta: 'Familien-Törns',
  },
  {
    id: 'luxury',
    subtitle: 'Für Anspruchsvolle',
    title: 'Luxury',
    text: 'Gönnen Sie sich Meer mit Stil. An Bord unserer Luxusyachten wird jeder Sonnenuntergang zur Privataufführung.',
    img: '/images/toerns/card-luxury.webp',
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
  en: { tag: 'Our cruises', h1: 'Your perfect sailing cruise',
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
  einsteiger: { subtitle: 'For beginners', title: 'New to sailing?', text: "Join our beginner's cruise and delve into everything you've ever wanted to know about life on a yacht.", cta: 'Beginner cruises' },
  freunde: { subtitle: 'For friends', title: 'Sail with friends', text: 'Come aboard and embark on a unique holiday adventure with your friends.', cta: 'Cruises for friends' },
  familien: { subtitle: 'For families', title: 'Create Family Memories', text: 'Experience a joy-filled family holiday with memorable experiences. Little pirates can take the helm.', cta: 'Family cruises' },
  luxury: { subtitle: 'Luxury', title: 'Luxury sailing', text: 'Experience pure luxury and timeless elegance on board our motor yachts.', cta: 'Luxury cruises' },
}

const catAlt: Record<'de' | 'en', Record<string, string>> = {
  de: {
    einsteiger: 'Paar am Steuerrad einer Segelyacht blickt aufs türkisfarbene Meer',
    freunde: 'Vier lachende Freunde an Bord einer Segelyacht',
    familien: 'Vater und zwei Kinder am Steuerrad einer Segelyacht',
    luxury: 'Luxus-Motoryacht in schneller Fahrt auf offenem Meer',
  },
  en: {
    einsteiger: 'Couple at the helm of a sailing yacht looking out over turquoise water',
    freunde: 'Four friends laughing together on board a sailing yacht',
    familien: 'Father and two children at the wheel of a sailing yacht',
    luxury: 'Luxury motor yacht cruising at speed on open water',
  },
}

// Kurzfassung der Antworten aus der FAQ-Seite (pages/FaqPage.tsx bzw.
// data/faqEn.ts) — bei inhaltlichen Aenderungen dort hier nachziehen.
const hubFaq: Record<'de' | 'en', { q: string; a: string }[]> = {
  de: [
    { q: 'Brauche ich Segelerfahrung für einen Törn?', a: 'Nein, es werden keine Vorkenntnisse im Segeln vorausgesetzt. Wer möchte, kann jederzeit selbst das Steuer übernehmen und die Segel trimmen – es besteht aber keine Verpflichtung dazu.' },
    { q: 'Benötige ich einen Bootsführerschein?', a: 'Nein. Für unsere Segeltörns mit Skipper ist kein Bootsführerschein erforderlich – der Skipper übernimmt die gesamte Navigation und Verantwortung an Bord.' },
    { q: 'Wer begleitet uns an Bord?', a: 'An Bord sind die mitreisenden Personen laut Buchung sowie der Skipper, der für Ihre Sicherheit und das Wohl aller Gäste verantwortlich ist und Ihnen rund um die Uhr zur Verfügung steht.' },
    { q: 'Können Kinder mitreisen?', a: 'Ja, Kinder sind herzlich willkommen. Ein festes Mindestalter gibt es nicht – die Einschätzung, ob die Reise für das jeweilige Kind passt, liegt bei den Eltern. Bei Fragen zur passenden Route und Reisezeit für Familien beraten wir Sie gerne.' },
    { q: 'Wie buche ich einen Törn?', a: 'Entweder buchen Sie ein Törn-Package direkt online, oder Sie nutzen den Urlaubsplaner bzw. das Anfrageformular für einen individuellen Törn. Bei einer Anfrage erhalten Sie ein Angebot und können Ihre Wunschyacht sieben Tage lang unverbindlich reservieren (Option).' },
  ],
  en: [
    { q: 'Do I need sailing experience for a cruise?', a: 'No, no prior sailing experience is required. If you like, you can take the helm and trim the sails yourself at any time – but there is no obligation to do so.' },
    { q: 'Do I need a boating licence?', a: "No. A boating licence isn't required for our skippered sailing cruises – the skipper handles all navigation and responsibility on board." },
    { q: 'Who is on board with us?', a: 'On board are the travellers listed in your booking plus the skipper, who is responsible for your safety and the wellbeing of all guests and is available to you around the clock.' },
    { q: 'Can children come along?', a: "Yes, children are very welcome. There is no fixed minimum age – it's up to you as parents to judge what suits your child. If you have questions about the right route or travel time for families, we're happy to advise you." },
    { q: 'How do I book a cruise?', a: 'You can either book a cruise package directly online, or use the holiday planner or the enquiry form for an individual cruise. After an enquiry you receive an offer and can reserve your preferred yacht without obligation for seven days (option).' },
  ],
}

export default function ToernsPage() {
  const lang = useLang()
  const s = tol[lang]
  const en = lang === 'en'
  const base = isEnHost() ? BASE_EN : BASE_DE
  const brand = en ? 'Yacht-Holiday' : 'Yacht-Urlaub'
  const hubUrl = `${base}${en ? '/cruises' : '/toerns'}`
  const catUrl = (id: string) => `${hubUrl}/${en ? enCruiseIds[id] : id}`
  const metaDescription = en
    ? 'Skippered sailing cruises for everyone: beginner, friends, family and luxury cruises in Croatia, Greece, the Caribbean and beyond – no sailing experience needed.'
    : 'Segeltörns mit Skipper für jeden: Einsteiger-, Freunde-, Familien- und Luxury-Törns in Kroatien, Griechenland, der Karibik und mehr – ohne Vorkenntnisse buchbar.'
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: en ? 'Our cruises – sailing trips for everyone' : 'Unsere Törns – Segeltörns für jeden',
      description: metaDescription,
      url: hubUrl,
      inLanguage: en ? 'en' : 'de',
      image: `${base}/images/toerns/og-toerns.jpg`,
      isPartOf: { '@type': 'WebSite', name: brand, url: `${base}/` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: categories.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: en ? catTitlesEn[c.id].title : c.title,
          url: catUrl(c.id),
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: en ? 'Home' : 'Startseite', item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: en ? 'Cruises' : 'Törns', item: hubUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: hubFaq[lang].map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={en ? "Our cruises – sailing trips for everyone | Yacht-Holiday" : "Unsere Törns – Segeltörns für jeden | Yacht-Urlaub"}
        description={metaDescription}
        image="/images/toerns/og-toerns.jpg"
        schema={schema}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(420px, 30vw, 580px)', overflow: 'hidden' }}>
        <img
          src="/images/toerns/hero-toerns-1600.webp"
          srcSet="/images/toerns/hero-toerns-800.webp 800w, /images/toerns/hero-toerns-1600.webp 1600w, /images/toerns/hero-toerns-2400.webp 2400w"
          sizes="100vw"
          width={2400}
          height={1300}
          alt={en ? 'Woman on the bow of a sailing yacht looking out over the sea to the horizon' : 'Frau am Bug einer Segelyacht blickt über das Meer zum Horizont'}
          fetchPriority="high"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '72% 32%' }}
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

          <div className="toerns-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
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
                  alt={catAlt[lang][cat.id]}
                  loading="lazy"
                  decoding="async"
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

      <PackagesGrid />

      {/* Haeufige Fragen — sichtbar im DOM (details/summary, kein JS noetig),
          dieselben Fragen stehen auch im FAQPage-Schema oben. */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              FAQ
            </p>
            <h2 className="section-title">{en ? 'Frequently asked questions about our cruises' : 'Häufige Fragen zu unseren Törns'}</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {hubFaq[lang].map(f => (
              <details key={f.q} className="toerns-faq" style={{ border: '1px solid var(--gray-mid)', borderRadius: '6px', padding: '1rem 1.25rem', background: '#fff' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--navy)', fontSize: '1rem', lineHeight: 1.4 }}>{f.q}</summary>
                <p style={{ margin: '0.75rem 0 0', color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.75 }}>{f.a}</p>
              </details>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            <Link to={en ? '/en/faq' : '/faq'} style={{ color: 'var(--blue)', fontWeight: 600 }}>
              {en ? 'All questions and answers →' : 'Alle Fragen und Antworten →'}
            </Link>
          </p>
        </div>
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

      {/* Yoga-Retreat — eigenes Band, weil es kein Zielgruppen-Toern ist,
          sondern ein Toern mit eigenem Thema. Nach der CTA und vor dem
          (global gerenderten) Kontaktformular platziert, damit es nicht
          zwischen den vier Zielgruppen-Kacheln und den Packages auffaellt. */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="yoga-band"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', aspectRatio: '4/3', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
              <img
                src="/images/yoga/Yoga_in_der_Bucht.jpg"
                alt={en ? 'Yoga on deck in a quiet bay' : 'Yoga an Deck in einer stillen Bucht'}
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ color: 'var(--blue)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem', fontWeight: 600 }}>
                {en ? 'Body and mind' : 'Für Körper und Geist'}
              </p>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem', lineHeight: 1.25 }}>
                {en ? 'Yoga retreat under sail' : 'Yoga-Retreat unter Segeln'}
              </h2>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '1.75rem' }}>
                {en
                  ? 'Sunrise on deck, a quiet bay instead of a studio, mediterranean cooking on board — one week of sailing and yoga, guided by Rebecca. On a sailing yacht or a catamaran.'
                  : 'Sonnenaufgang an Deck, eine stille Bucht statt Studio, mediterrane Küche an Bord — eine Woche Segeln und Yoga, begleitet von Rebecca. Auf Segelyacht oder Katamaran.'}
              </p>
              <Link to={en ? '/en/yoga' : '/yoga'} className="btn btn-primary" style={{ fontSize: '0.78rem' }}>
                {en ? 'To the yoga retreat →' : 'Zum Yoga-Retreat →'}
              </Link>
            </div>
          </motion.div>
        </div>
        <style>{`
          @media (max-width: 760px) {
            .yoga-band { grid-template-columns: 1fr !important; gap: 1.75rem !important; }
          }
        `}</style>
      </section>
    </main>
  )
}
