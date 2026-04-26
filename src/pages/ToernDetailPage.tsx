import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import Kontakt from '../components/Kontakt'

const toernData: Record<string, {
  id: string
  subtitle: string
  title: string
  heroImg: string
  seoTitle: string
  seoDesc: string
  sections: { heading?: string; text: string; img?: string; imgAlt?: string; reverse?: boolean }[]
  packages: { title: string; region: string; days: string; price: string }[]
}> = {
  einsteiger: {
    id: 'einsteiger',
    subtitle: 'Für Einsteiger',
    title: 'Der erste Schritt auf das Deck – und ein neues Abenteuer beginnt',
    heroImg: '/images/Zielgruppen/Einsteiger 1.jpg',
    seoTitle: 'Einsteiger-Segeltörns – Noch nie gesegelt? Kein Problem! | Yacht-Urlaub',
    seoDesc: 'Einsteiger-Segeltörns mit erfahrenem Skipper: Keine Vorkenntnisse nötig. Entdecken Sie malerische Buchten, schnorcheln und entspannen – wir kümmern uns um den Rest.',
    sections: [
      {
        heading: 'Der erste Schritt auf das Deck',
        text: 'Stellen Sie sich vor: Die Sonne glitzert auf dem türkisblauen Wasser, eine sanfte Brise streicht über Ihr Gesicht, und das leise Plätschern der Wellen begleitet Sie, während Sie das erste Mal auf einer Segelyacht stehen. Ein Gefühl von Freiheit, das Sie so noch nie erlebt haben. Sie haben noch nie gesegelt? Perfekt! Unsere Einsteiger-Törns sind genau dafür gemacht. Egal, ob Sie die Begriffe Schot und Wende noch nie gehört haben – Sie brauchen keinerlei Vorkenntnisse.',
        img: '/images/Zielgruppen/Einsteiger 1.jpg',
        imgAlt: 'Einsteiger am Segelboot',
      },
      {
        heading: 'Ihr Skipper nimmt Sie an die Hand',
        text: 'Unsere erfahrenen Skipper nehmen Sie an die Hand und führen Sie behutsam in die Welt des Segelns ein. Sie entscheiden, wie aktiv Sie sein möchten: Möchten Sie einfach nur entspannen und die Seele baumeln lassen oder aktiv mit anpacken und die Grundlagen des Segelns erlernen? Alles kann, nichts muss.',
        img: '/images/Zielgruppen/Einsteiger2.jpg',
        imgAlt: 'Skipper erklärt Einsteigern das Segeln',
        reverse: true,
      },
      {
        heading: 'Jeden Tag neue Highlights',
        text: 'Während des Törns entdecken Sie malerische Küstenorte, versteckte Buchten und kristallklare Badeplätze. Ob beim Schnorcheln, Sonnenbaden oder beim Genießen regionaler Köstlichkeiten an Land – jeder Tag bietet neue Highlights. Und das Beste: Sie benötigen keinerlei Vorkenntnisse. Bringen Sie einfach Ihre Neugier und Lust auf Neues mit – wir kümmern uns um den Rest. Bereit für Ihr erstes Segelabenteuer?',
        img: '/images/Zielgruppen/back-view-beach-beautiful-1007901.jpg',
        imgAlt: 'Badeplatz auf einem Segeltörn',
      },
    ],
    packages: [
      { title: 'Einsteiger-Package Adria', region: 'Kroatien · Dalmatien', days: '7 Tage', price: 'ab 890 €' },
      { title: 'Einsteiger-Package Griechenland', region: 'Griechenland · Ionische Inseln', days: '7 Tage', price: 'ab 950 €' },
      { title: 'Schnupper-Törn Balearen', region: 'Spanien · Mallorca', days: '5 Tage', price: 'ab 750 €' },
    ],
  },

  familien: {
    id: 'familien',
    subtitle: 'Für Familien',
    title: 'Der perfekte Familienurlaub auf dem Wasser',
    heroImg: '/images/Zielgruppen/Familie 1.jpg',
    seoTitle: 'Familien-Segeltörns – Unvergessliches Abenteuer für die ganze Familie | Yacht-Urlaub',
    seoDesc: 'Familienfreundliche Segeltörns: Kleine Piraten am Steuer, Eltern entspannen. Sicherheit, Spaß und gemeinsame Erlebnisse auf dem Meer.',
    sections: [
      {
        heading: 'Familienurlaub auf dem Wasser',
        text: 'Ein Familienurlaub sollte unvergesslich sein – voller Abenteuer, Entspannung und gemeinsamer Erlebnisse. Mit unseren familienfreundlichen Segeltörns entdecken Sie die schönsten Strände, spannende Städte und faszinierende Unterwasserwelten. Kleine Piraten dürfen das Steuer übernehmen, während die Eltern die Seele baumeln lassen.',
        img: '/images/Zielgruppen/Familie 1.jpg',
        imgAlt: 'Familie auf dem Segelboot',
      },
      {
        heading: 'Sicherheit und Spaß für alle',
        text: 'Unsere Skipper sind erfahren im Umgang mit Familien und Kindern. Sie achten auf ein sicheres Bordklima und sorgen dafür, dass sich alle an Bord wohlfühlen. Kinder sind bei uns willkommen – und werden oft zu den begeistertsten Seglern an Bord! Die Yacht wird zur Spielwiese: Schnorcheln, Tauchen, Angeln, Beachcombing – der Abenteuerspielplatz ist das ganze Meer.',
        img: '/images/Zielgruppen/Familie.jpg',
        imgAlt: 'Kinder beim Schnorcheln',
        reverse: true,
      },
      {
        heading: 'Die schönsten Familien-Reviere',
        text: 'Kroatien mit seinen vielen geschützten Buchten und kurzen Überfahrten ist das ideale Revier für Familien. Auch Griechenland und die Balearen bieten ruhiges Fahrwasser, traumhafte Strände und familienfreundliche Häfen. Unser Team berät Sie gerne, welches Revier am besten zu Ihrer Familie passt.',
        img: '/images/Zielgruppen/Familie.webp',
        imgAlt: 'Familienfreundliche Bucht',
      },
    ],
    packages: [
      { title: 'Familien-Package Kroatien', region: 'Kroatien · Dalmatien', days: '7 Tage', price: 'ab 980 €' },
      { title: 'Familien-Package Balearen', region: 'Spanien · Mallorca – Menorca', days: '7 Tage', price: 'ab 1.050 €' },
      { title: 'Familien-Abenteuer Griechenland', region: 'Griechenland · Ionische Inseln', days: '7 Tage', price: 'ab 1.020 €' },
    ],
  },

  freunde: {
    id: 'freunde',
    subtitle: 'Für Freunde',
    title: 'Mit Freunden segeln und feiern',
    heroImg: '/images/Zielgruppen/Freunde 1.jpg',
    seoTitle: 'Freunde-Segeltörns – Abenteuer mit deiner Crew | Yacht-Urlaub',
    seoDesc: 'Segeltörns für Freundesgruppen: Geburtstag, Junggesellenabschied oder einfach Urlaub. Freiheit, Sonne, Meer – und das gemeinsam.',
    sections: [
      {
        heading: 'Mit Freunden segeln und feiern',
        text: 'Erlebe mit deinen Freunden ein Abenteuer, über das ihr noch lange erzählen werdet. Egal ob zu einem besonderen Anlass – Geburtstag, Junggesellenabschied oder einfach nur eine Woche Urlaub mit Freunden – kommt an Bord einer unserer modernen Yachten! Feiert mit euren Liebsten eine Party wie nie zuvor! Wer kann schon sagen, dass er danach auf einer Yacht mitten auf dem Meer aufgewacht ist?',
        img: '/images/Zielgruppen/Freunde 1.jpg',
        imgAlt: 'Freunde auf der Yacht',
      },
      {
        heading: 'Warum Yacht-Urlaub?',
        text: 'Bucht bei Yacht-Urlaub, ganz einfach, weil ihr frei entscheiden könnt, auf welcher Art von Yacht ihr euer Wunsch-Reiseziel erleben wollt. Ihr könnt euch entspannt zurücklehnen, während unsere erfahrenen Skipper euch durch die sieben Weltmeere bringen. Dabei beraten wir euch gerne, welches Ziel am besten zu euren Wünschen passt! Legt ihr viel Wert auf ein wenig Kulinarik und Kultur? Oder wollt ihr lieber feiern und die Nächte erleben?',
        img: '/images/Zielgruppen/Freunde im Wasser.jpg',
        imgAlt: 'Freunde beim Schwimmen vom Boot',
        reverse: true,
      },
      {
        heading: 'Unvergessliche Momente',
        text: 'Mit Yacht-Urlaub wird euer einzigartiges Erlebnis mit Freunden unvergesslich sein. Hoch die Gläser und ab ins Abenteuer! Besucht malerische Hafenstädte, taucht in versteckten Buchten, tanzt bis in den Morgen in Ibiza oder relaxt auf dem Sonnendeck – euer Törn, eure Regeln.',
        img: '/images/Zielgruppen/Freunde3.jpg',
        imgAlt: 'Freunde beim Sonnenuntergang',
      },
    ],
    packages: [
      { title: 'Freunde-Package Kroatien', region: 'Kroatien · Dalmatien', days: '7 Tage', price: 'ab 890 €' },
      { title: 'Party-Törn Balearen', region: 'Spanien · Ibiza – Formentera', days: '7 Tage', price: 'ab 1.100 €' },
      { title: 'Freunde-Package Griechenland', region: 'Griechenland · Kykladen', days: '7 Tage', price: 'ab 990 €' },
    ],
  },

  luxury: {
    id: 'luxury',
    subtitle: 'Für Anspruchsvolle',
    title: 'Für Genießer und Entdecker',
    heroImg: '/images/Zielgruppen/Entdecker 3.jpg',
    seoTitle: 'Luxury-Yachtreisen – Segeln mit Stil | Yacht-Urlaub',
    seoDesc: 'Luxus-Segeltörns auf exklusiven Yachten: Fremde Kulturen entdecken, kulinarische Highlights genießen und einzigartige Denkmäler besichtigen. Rundum-Service inklusive.',
    sections: [
      {
        heading: 'Für Genießer und Entdecker',
        text: 'Sie wollen entdecken, was die Welt zu bieten hat? Fremde Kulturen kennenlernen, kulinarische Kostbarkeiten probieren und einzigartige Denkmäler besichtigen, sind für Sie Teil eines perfekten Urlaubserlebnisses? Dann sind Sie bei unseren Segeltörns für Entdecker und Genießer genau richtig! Bereisen Sie das Meer auf einer traumhaften Yacht und erkunden Sie dabei die regionalen Besonderheiten. Kultur und Kulinarik im Mittelmeer der Karibik oder den Seychellen.',
        img: '/images/Zielgruppen/Entdecker 3.jpg',
        imgAlt: 'Luxusyacht auf dem Meer',
      },
      {
        heading: 'Ihre Entdeckungsreise',
        text: 'Buchen Sie Ihre Entdeckungsreise bei Yacht-Urlaub, denn mit uns erleben Sie die schönsten und verborgenen Orte, die bekanntesten Sehenswürdigkeiten und bezauberndsten Strände bequem auf einer gemütlichen Yacht, begleitet von unserem erfahrenen Skipper. Lehnen Sie sich zurück und lassen Sie sich von Ort zu Ort bringen, während Sie das einmalige Freiheitsgefühl eines Yacht-Urlaubs genießen.',
        img: '/images/Zielgruppen/entdecker2.jpg',
        imgAlt: 'Entdecker-Törn auf der Yacht',
        reverse: true,
      },
      {
        heading: 'Werden Sie Yacht-Urlaub Entdecker',
        text: 'Auf unseren Luxury-Törns erwartet Sie ein maßgeschneidertes Erlebnis: Exklusive Yachten mit allen Annehmlichkeiten, professionelle Skipper mit lokalem Know-how, und ein persönlicher Service, der keine Wünsche offen lässt. Von den Seychellen bis zur Karibik – wir begleiten Sie zu den schönsten Orten der Welt.',
        img: '/images/Zielgruppen/Sunset Hula Hula.jpg',
        imgAlt: 'Sonnenuntergang auf der Luxury-Yacht',
      },
    ],
    packages: [
      { title: 'Luxury-Package Seychellen', region: 'Seychellen · Mahé – La Digue', days: '10 Tage', price: 'ab 2.490 €' },
      { title: 'Luxury-Package Karibik BVI', region: 'Karibik · Britische Jungferninseln', days: '14 Tage', price: 'ab 2.990 €' },
      { title: 'Luxury-Törn Griechenland', region: 'Griechenland · Kykladen', days: '7 Tage', price: 'ab 1.490 €' },
    ],
  },
}

export default function ToernDetailPage() {
  const { id } = useParams<{ id: string }>()
  const data = id ? toernData[id] : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!data) return <Navigate to="/toerns" replace />

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={data.seoTitle}
        description={data.seoDesc}
        canonical={`/toerns/${data.id}`}
        image={data.heroImg}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img
          src={data.heroImg}
          alt={data.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.88) 0%, rgba(15,35,56,0.45) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Start</Link>
            <span>›</span>
            <Link to="/toerns" style={{ color: 'rgba(255,255,255,0.6)' }}>Törns</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>{data.subtitle}</span>
          </motion.nav>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {data.subtitle}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1.5rem', maxWidth: '650px', lineHeight: 1.25 }}>
            {data.title}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
            <Link to="/#kontakt" className="btn btn-primary" style={{ marginRight: '1rem' }}>Jetzt anfragen</Link>
            <Link to="/toerns" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>← Alle Törns</Link>
          </motion.div>
        </div>
      </div>

      {/* Content Sections */}
      {data.sections.map((section, i) => (
        <section key={i} className="section" style={{ background: i % 2 === 0 ? '#fff' : 'var(--gray-light)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: section.img ? '1fr 1fr' : '1fr',
              gap: '4rem',
              alignItems: 'center',
              direction: section.reverse ? 'rtl' : 'ltr',
            }} className="content-grid">
              <div style={{ direction: 'ltr' }}>
                {section.heading && (
                  <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                    {section.heading}
                  </h2>
                )}
                <p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.85 }}>{section.text}</p>
              </div>
              {section.img && (
                <div style={{ direction: 'ltr', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                  <img
                    src={section.img}
                    alt={section.imgAlt || ''}
                    loading="lazy"
                    style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Packages */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Unsere Packages
            </p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#fff', marginBottom: '0.75rem' }}>
              Passende Reisepakete
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="packages-grid">
            {data.packages.map(pkg => (
              <div key={pkg.title} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '4px',
                padding: '2rem',
              }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
                  {pkg.region}
                </p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', fontSize: '1.35rem', marginBottom: '1rem', lineHeight: 1.3 }}>
                  {pkg.title}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem' }}>⏱ {pkg.days}</span>
                  <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem' }}>{pkg.price}</span>
                </div>
                <Link to="/#kontakt" className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '9px 18px', width: '100%', textAlign: 'center', display: 'block', boxSizing: 'border-box' }}>
                  Anfragen →
                </Link>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .packages-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .content-grid { grid-template-columns: 1fr 1fr !important; }
          @media (max-width: 900px) {
            .packages-grid { grid-template-columns: 1fr !important; }
            .content-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          }
        `}</style>
      </section>

      {/* Kontakt */}
      <Kontakt />
    </main>
  )
}
