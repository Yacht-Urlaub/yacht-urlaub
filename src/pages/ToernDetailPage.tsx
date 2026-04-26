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
        heading: 'Was ist ein Segelurlaub wirklich?',
        text: 'Ein Segelurlaub für Einsteiger ist viel mehr als nur Segeln. Für die meisten Gäste bedeutet er Urlaub am Wasser, traumhafte Buchten, türkisblaues Meer, Baden, Schnorcheln und das Entdecken von Küsten, Inseln und Kulturen. Tatsächlich besteht ein Segelurlaub nur zu etwa 5 % aus echtem Segeln – der Rest ist purer Genuss und Erholung. Sie haben noch nie gesegelt? Perfekt! Unsere Einsteiger-Törns sind genau dafür gemacht.',
        img: '/images/Zielgruppen/Einsteiger 1.jpg',
        imgAlt: 'Einsteiger am Segelboot',
      },
      {
        heading: 'Ihr Skipper nimmt Sie an die Hand',
        text: 'Unsere erfahrenen Skipper nehmen Sie behutsam mit in die Welt des Segelns. Sie entscheiden, wie aktiv Sie sein möchten – einfach entspannen oder aktiv die Grundlagen des Segelns erlernen. Alles kann, nichts muss. Der Skipper sorgt für maximale Sicherheit auf See, kennt die besten Buchten und Häfen aus eigener Erfahrung und passt die Route flexibel an Wetter und Wünsche an.',
        img: '/images/Zielgruppen/Einsteiger2.jpg',
        imgAlt: 'Skipper erklärt Einsteigern das Segeln',
        reverse: true,
      },
      {
        heading: 'Ein typischer Tag an Bord',
        text: 'Frühstück mit Blick auf eine ruhige Bucht, Baden und Schnorcheln direkt von der Yacht, Weiterfahrt zu einer Insel oder Küstenstadt, Mittagessen an Bord oder in einer Taverne – und der Sonnenuntergang im Hafen oder vor Anker. Jeder Tag bietet neue Highlights: malerische Küstenorte, kristallklare Badeplätze und regionale Köstlichkeiten. Bringen Sie einfach Neugier und Lust auf Neues mit – wir kümmern uns um den Rest.',
        img: '/images/Zielgruppen/back-view-beach-beautiful-1007901.jpg',
        imgAlt: 'Badeplatz auf einem Segeltörn',
      },
    ],
    packages: [
      { title: 'Segeln in Dalmatien ab Split', region: 'Kroatien · Dalmatien', days: '7 Tage', price: 'Preis auf Anfrage' },
      { title: 'Segeln in die Kornaten', region: 'Kroatien · Kornaten', days: '7 Tage', price: 'Preis auf Anfrage' },
      { title: 'Segeln ab Pula oder Krk', region: 'Kroatien · Istrien', days: '7 Tage', price: 'Preis auf Anfrage' },
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
        text: 'Ein Familienurlaub sollte unvergesslich sein – voller Abenteuer, Entspannung und gemeinsamer Erlebnisse. Mit unseren familienfreundlichen Segeltörns entdecken Sie die schönsten Strände, spannende Städte und faszinierende Unterwasserwelten. Kleine Piraten dürfen das Steuer übernehmen, während die Eltern die Seele baumeln lassen. Schwimmen in versteckten Buchten, spannende Landgänge und kinderfreundliche Ausflüge – die Yacht wird zur schwimmenden Abenteuerbasis.',
        img: '/images/Zielgruppen/Familie 1.jpg',
        imgAlt: 'Familie auf dem Segelboot',
      },
      {
        heading: 'Exklusive Familienvorteile in Kroatien',
        text: 'Unser Partner mySea ermöglicht allen Familien, günstiger durch die Inselwelt Kroatiens zu segeln. Durch die Initiative „Club der 15 %" profitieren Familien von bis zu 15 % Rabatt bei Marinas, Restaurants, Nationalparks und weiteren Anbietern entlang der kroatischen Küste. Ein konkreter Vorteil, der den Familienurlaub auf dem Wasser noch attraktiver macht.',
        img: '/images/Zielgruppen/Familie.jpg',
        imgAlt: 'Kinder beim Schnorcheln',
        reverse: true,
      },
      {
        heading: 'Die schönsten Familien-Reviere',
        text: 'Kroatien mit seinen vielen geschützten Buchten und kurzen Überfahrten ist das ideale Revier für Familien. Auch Griechenland und die Balearen bieten ruhiges Fahrwasser, traumhafte Strände und familienfreundliche Häfen. Kinder sind bei uns willkommen – und werden oft zu den begeistertsten Seglern an Bord! Die Flexibilität der Route richtet sich nach den Familienwünschen. Unser Team berät Sie gerne.',
        img: '/images/Zielgruppen/Familie.webp',
        imgAlt: 'Familienfreundliche Bucht',
      },
    ],
    packages: [
      { title: 'Segeln in Griechenland', region: 'Griechenland · Ägäis & Ionische Inseln', days: '7 Tage', price: 'Preis auf Anfrage' },
      { title: 'Segeln in die Kornaten', region: 'Kroatien · Kornaten', days: '7 Tage', price: 'Preis auf Anfrage' },
      { title: 'Segeln ab Pula oder Krk', region: 'Kroatien · Istrien', days: '7 Tage', price: 'Preis auf Anfrage' },
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
    title: 'Luxury Yachtreise für Genießer',
    heroImg: '/images/Zielgruppen/Entdecker 3.jpg',
    seoTitle: 'Luxury-Yachtreisen – Segeln mit Stil | Yacht-Urlaub',
    seoDesc: 'Luxus-Yachtreisen auf exklusiven Yachten: Erstklassiger Motoryacht-Charter, absolute Privatsphäre, frische Meeresfrüchte und professionelle Crew. Willkommen bei Ihrem Luxury Yachting Partner.',
    sections: [
      {
        heading: 'Willkommen bei Ihrem Luxury Yachting Partner',
        text: 'Erleben Sie die unberührte Schönheit der adriatischen Küste mit unserem exklusiven Luxury-Yachtcharter. Kroatien mit mehr als 1.200 Inseln vor der Küste ist eine der schönsten Regionen Europas – azurblaues Wasser zum Schnorcheln, malerische Buchten und eine vielfältige Küche warten auf Sie. Erstklassige Motoryacht-Vermietung und eine einzigartige Urlaubsstimmung: Das ist Luxury Yachting mit Yacht-Urlaub.',
        img: '/images/Zielgruppen/Entdecker 3.jpg',
        imgAlt: 'Luxusyacht auf dem Meer',
      },
      {
        heading: 'Absolute Privatsphäre & Exklusivität',
        text: 'An Bord unserer Luxusyachten erwartet Sie absolute Privatsphäre, täglich frisch gefangene kulinarische Köstlichkeiten und aufregende Wasserspielzeuge. Eine erfahrene Crew kümmert sich um Ihren Komfort, während der Kapitän Sie zu den verborgenen Schätzen der Küste führt. Lehnen Sie sich zurück und lassen Sie sich von Ort zu Ort bringen – das einmalige Freiheitsgefühl einer Luxus-Yachtreise wartet auf Sie.',
        img: '/images/Zielgruppen/entdecker2.jpg',
        imgAlt: 'Entdecker-Törn auf der Yacht',
        reverse: true,
      },
      {
        heading: 'Maßgeschneidertes Erlebnis',
        text: 'Auf unseren Luxury-Törns erwartet Sie ein individuell abgestimmtes Erlebnis: Exklusive Yachten mit allen Annehmlichkeiten, professionelle mehrsprachige Skipper mit lokalem Know-how und ein persönlicher Service, der keine Wünsche offen lässt. Von den Seychellen und der Karibik bis zur Adria – wir begleiten Sie zu den schönsten Orten der Welt. Kontaktieren Sie uns für Ihr persönliches Angebot.',
        img: '/images/Zielgruppen/Sunset Hula Hula.jpg',
        imgAlt: 'Sonnenuntergang auf der Luxury-Yacht',
      },
    ],
    packages: [
      { title: 'Luxury Seychellen', region: 'Seychellen · Mahé – La Digue', days: '10 Tage', price: 'Preis auf Anfrage' },
      { title: 'Luxury Karibik BVI', region: 'Karibik · Britische Jungferninseln', days: '14 Tage', price: 'Preis auf Anfrage' },
      { title: 'Luxury Kroatien', region: 'Kroatien · Adria', days: '7 Tage', price: 'Preis auf Anfrage' },
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
