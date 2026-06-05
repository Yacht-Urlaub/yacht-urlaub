import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { packages } from '../components/Packages'

type Section = {
  heading?: string
  small?: boolean
  paragraphs: string[]
  listTitle?: string
  list?: string[]
  afterList?: string[]
  img?: string
  imgAlt?: string
  reverse?: boolean
}

type ToernPage = {
  id: string
  breadcrumb: string
  h1: string
  heroImg: string
  seoTitle: string
  seoDesc: string
  packageTeasers: string[] // Package-IDs → echte Angebote
  extraTeaser?: { title: string; to: string; label: string; img: string }
  banner?: { img: string; title: string; text: string; footer: string }
  sections: Section[]
  faq?: { q: string; a: string }[]
  luxury?: boolean
}

// Inhalte 1:1 von yacht-urlaub.net übernommen
const toernData: Record<string, ToernPage> = {
  einsteiger: {
    id: 'einsteiger',
    breadcrumb: 'für Einsteiger',
    h1: 'Segeltörn für Einsteiger',
    heroImg: '/images/Zielgruppen/beach-blue-sky-cheerful.jpg',
    seoTitle: 'Segeltörn für Einsteiger – entspannt, sicher & ohne Vorkenntnisse | Yacht-Urlaub',
    seoDesc: 'Segelurlaub für Einsteiger mit erfahrenem Skipper: Keine Vorkenntnisse nötig. Traumhafte Buchten, türkisblaues Meer, Baden und Schnorcheln – wir kümmern uns um den Rest.',
    packageTeasers: ['dalmatien', 'kornaten', 'istrien'],
    sections: [
      {
        heading: 'Segelurlaub für Einsteiger – entspannt, sicher & ohne Vorkenntnisse',
        paragraphs: [
          'Ein Segelurlaub für Einsteiger ist viel mehr als nur Segeln. Für die meisten Gäste bedeutet er Urlaub am Wasser, traumhafte Buchten, türkisblaues Meer, Baden, Schnorcheln und das Entdecken von Küsten, Inseln und Kulturen – und nicht das aktive Segelsetzen.',
          'Tatsächlich besteht ein Segelurlaub nur zu etwa 5 % aus echtem "Segeln". Die restliche Zeit genießen Sie entspannte Tage an Bord, schwimmen in kristallklarem Wasser, gehen an Land essen oder erkunden charmante Hafenstädte. Gesegelt wird, wenn Wind und Route es zulassen – ganz entspannt und immer sicher begleitet.',
          'Gerade für Einsteiger ist ein Segelurlaub die ideale Art zu reisen: jeden Tag ein neuer Ort, kein Kofferpacken, kein Hotelwechsel – und dennoch maximaler Komfort und Erholung.',
        ],
        img: '/images/packages/Einsteiger/gallery/IMG_7874.jpg',
        imgAlt: 'Segelurlaub für Einsteiger',
      },
      {
        heading: 'Segelurlaub mit Skipper – perfekt für Anfänger',
        paragraphs: [
          'Für Einsteiger empfehlen wir einen Segelurlaub mit erfahrenem Skipper. Der Skipper übernimmt Navigation, Sicherheit und das Handling der Yacht – Sie genießen den Urlaub.',
        ],
        listTitle: 'Vorteile für Anfänger:',
        list: [
          'Keine Segelkenntnisse nötig',
          'Maximale Sicherheit auf See',
          'Lokales Insiderwissen zu Buchten & Häfen',
          'Flexible Routen je nach Wetter & Wunsch',
          'Entspannter Urlaub ohne Verantwortung',
        ],
        afterList: [
          'Auf Wunsch erklärt der Skipper gerne die Grundlagen des Segelns – ganz ohne Druck. So können Sie erste Erfahrungen sammeln oder einfach nur entspannen und genießen.',
          'Ein Segelurlaub für Einsteiger ist damit eine der komfortabelsten und abwechslungsreichsten Urlaubsformen, die es gibt – egal ob in Kroatien, Griechenland oder anderen Segelrevieren.',
        ],
        img: '/images/packages/dalmatien/gallery/WP_20150818_001.jpg',
        imgAlt: 'Segelurlaub mit Skipper',
        reverse: true,
      },
      {
        heading: 'Was bedeutet „Segelurlaub" wirklich?',
        paragraphs: [
          'Der Begriff Segelurlaub wird oft missverstanden. Es geht dabei nicht um sportliches Segeln oder körperliche Anstrengung. Vielmehr ist Segelurlaub ein Synonym für entschleunigten Urlaub auf dem Meer.',
        ],
        listTitle: 'Ein typischer Tag sieht so aus:',
        list: [
          'Frühstück mit Blick auf eine ruhige Bucht',
          'Baden & Schnorcheln direkt von der Yacht',
          'Weiterfahrt zu einer Insel oder Küstenstadt',
          'Mittagessen an Bord oder in einer Taverne',
          'Sonnenuntergang im Hafen oder vor Anker',
        ],
        afterList: [
          'Ob Katamaran oder Segelyacht – Sie bestimmen das Tempo. Wer möchte, darf gerne beim Segeln mithelfen. Wer lieber entspannt, lässt sich treiben. Alles kann, nichts muss.',
          'Gerade für Paare, Freunde, Familien oder kleine Gruppen ist Segelurlaub eine perfekte Kombination aus Natur, Kultur, Erholung und Freiheit – und damit ideal für Segel-Einsteiger.',
        ],
        img: '/images/Zielgruppen/keine_zuordnung.jpg',
        imgAlt: 'Entspannter Tag an Bord',
      },
    ],
    faq: [
      { q: 'Brauche ich Segelerfahrung?', a: 'Nein, für einen Segelurlaub mit Skipper sind keinerlei Vorkenntnisse nötig.' },
      { q: 'Ist Segelurlaub anstrengend?', a: 'Nein – der Fokus liegt auf Erholung, Baden, Genuss und Natur.' },
      { q: 'Ist Segelurlaub für Anfänger sicher?', a: 'Ja, mit professionellem Skipper und geprüften Yachten sehr sicher.' },
    ],
  },

  freunde: {
    id: 'freunde',
    breadcrumb: 'für Freunde',
    h1: 'Segeltörn für Freunde',
    heroImg: '/images/Zielgruppen/Freunde Snap.png',
    seoTitle: 'Segeltörn für Freunde – Mit Freunden segeln und feiern | Yacht-Urlaub',
    seoDesc: 'Segeltörns für Freundesgruppen: Geburtstag, Junggesellenabschied oder einfach Urlaub mit Freunden. Kommt an Bord einer unserer modernen Yachten!',
    packageTeasers: ['dalmatien', 'karibik-bvi', 'griechenland'],
    extraTeaser: {
      title: 'SailAway Party-Flotte',
      to: '/sailaway',
      label: 'MEHR ERFAHREN',
      img: '/images/sailaway/header.jpg',
    },
    sections: [
      {
        heading: 'Mit Freunden segeln und feiern',
        paragraphs: [
          'Erlebe mit deinen Freunden ein Abenteuer, über das ihr noch lange erzählen werdet. Egal ob zu einem besonderen Anlass – Geburtstag, Junggesellenabschied oder einfach nur eine Woche Urlaub mit Freunden – kommt an Bord einer unserer modernen Yachten! Feier mit deinen Liebsten eine Party wie nie zuvor! - Wer kann schon sagen, dass er danach auf einer Yacht mitten auf dem Meer aufgewacht ist?',
          'Besucht die zahlreichen Bars, Clubs und Tavernen und relaxt am nächsten Tag in einer gemütlichen Bucht umgeben von türkisblauem Wasser. Ihr werdet euch fragen, ob es nur ein schöner Traum ist oder einer der besten Urlaube, die ihr je gemacht habt!',
        ],
        img: '/images/Zielgruppen/freunde2.jpg',
        imgAlt: 'Freunde auf der Yacht',
      },
      {
        paragraphs: [
          'Mit Yacht-Urlaub wird euer einzigartiges Erlebnis mit Freunden unvergesslich sein.',
          'Hoch die Gläser und ab ins Abenteuer!',
        ],
        img: '/images/Zielgruppen/Freunde3.jpg',
        imgAlt: 'Feiern an Bord',
        reverse: true,
      },
      {
        paragraphs: [
          'Bucht bei Yacht-Urlaub, ganz einfach, weil ihr frei entscheiden könnt, auf welcher Art von Yacht ihr euer Wunsch-Reiseziel erleben wollt. Ihr könnt euch entspannt zurücklehnen, während unsere erfahrenen Skipper euch durch die sieben Weltmeere bringen. Dabei beraten wir euch gerne, welches Ziel am besten zu euren Wünschen passt! Legt ihr viel Wert auf ein wenig Kulinarik und Kultur? Oder wollt ihr einfach nur die Nacht zum Tage machen und feiern? Alles ist möglich! Auf unseren erprobten Routen werdet ihr nichts von alle dem vermissen.',
        ],
        img: '/images/Zielgruppen/Freunde im Wasser.jpg',
        imgAlt: 'Freunde im Wasser',
      },
    ],
  },

  familien: {
    id: 'familien',
    breadcrumb: 'für Familien',
    h1: 'Segeltörn für Familien',
    heroImg: '/images/Zielgruppen/familie.jpeg',
    seoTitle: 'Segeltörn für Familien – Der perfekte Familienurlaub auf dem Wasser | Yacht-Urlaub',
    seoDesc: 'Familienfreundliche Segeltörns: Kleine Piraten dürfen das Steuer übernehmen, während die Eltern die Seele baumeln lassen. Sicherheit, Spaß und gemeinsame Erlebnisse.',
    packageTeasers: ['griechenland', 'kornaten', 'istrien'],
    banner: {
      img: '/images/partner/Club15.png',
      title: 'Entdecken Sie den Club der 15 % – Exklusive Vorteile für Familien!',
      text: 'Segeln Sie durch Kroatien und genießen Sie 15 % Rabatt auf zahlreiche Yachthäfen, Bojenfelder, Restaurants, Nationalparks und mehr. Diese exklusive mySea-Initiative wurde gemeinsam mit kroatischen Liegeplatzpartnern ins Leben gerufen, um Familien den Traum vom Segelurlaub noch erschwinglicher zu machen. Wir als Yacht-Urlaub machen Ihnen den Zugang zu der Aktion ohne weiteren Aufwand möglich.',
      footer: 'Weil unvergessliche Abenteuer auf dem Wasser für alle leistbar bleiben sollten!',
    },
    sections: [
      {
        heading: 'Der perfekte Familienurlaub auf dem Wasser',
        paragraphs: [
          'Ein Familienurlaub sollte unvergesslich sein – voller Abenteuer, Entspannung und gemeinsamer Erlebnisse. Mit unseren familienfreundlichen Segeltörns entdecken Sie die schönsten Strände, spannende Städte und faszinierende Unterwasserwelten. Kleine Piraten dürfen das Steuer übernehmen, während die Eltern die Seele baumeln lassen.',
          'Buchen Sie Ihren Familienurlaub bei Yacht-Urlaub, weil wir wissen worauf es ankommt. Unsere erfahrenen Skipper führen Sie an jene Orte, die Sie immer schon mal sehen wollten. Dabei achten wir auf das Wohlbefinden jeder Altersgruppe.',
          'Genießen Sie unbeschwerte Tage auf dem Meer mit Yacht-Urlaub – denn wir wissen, worauf es beim Familiensegeln ankommt. Lassen Sie den Alltag hinter sich und starten Sie in Ihr nächstes großes Abenteuer!',
          'Yachturlaub - ist mit Kindern der perfekte Urlaub! Spaß, Abenteuer, Erholung und Genuß inklusive!',
          'Jetzt Familien-Segeltörn planen und einzigartige Erinnerungen schaffen!',
        ],
        img: '/images/Zielgruppen/familie_bug kl.png',
        imgAlt: 'Familie am Bug der Yacht',
      },
      {
        heading: 'Warum ein Segeltörn mit der Familie?',
        small: true,
        paragraphs: [],
        list: [
          'Erlebnis pur: Schwimmen in versteckten Buchten, spannende Landgänge und kinderfreundliche Ausflüge.',
          'Sicherheit & Komfort: Unsere erfahrenen Skipper sorgen für eine entspannte Reise – für Groß und Klein.',
          'Flexibilität & Individualität: Wir passen die Route Ihren Wünschen an, damit jeder auf seine Kosten kommt.',
          'Kulinarische Vielfalt: Kochen an Bord oder ein Besuch in handverlesenen Restaurants – ganz nach Ihrem Geschmack.',
        ],
        img: '/images/Zielgruppen/Familie 1.jpg',
        imgAlt: 'Familie auf dem Segelboot',
        reverse: true,
      },
    ],
  },

  luxury: {
    id: 'luxury',
    breadcrumb: 'Luxury',
    h1: 'Luxus-Yachttrip',
    heroImg: '/images/luxury/header.png',
    seoTitle: 'Luxus-Yachttrip – Luxury Yachtreise für Genießer | Yacht-Urlaub',
    seoDesc: 'Erleben Sie die unberührte Schönheit der adriatischen Küste mit unserem exklusiven Motoryachtcharter. Luxus-Motoryacht «NIKITA» – Riva 100 Corsaro.',
    packageTeasers: [],
    luxury: true,
    sections: [
      {
        heading: 'Luxury Yachtreise für Genießer',
        paragraphs: [
          'Willkommen bei Ihrem Luxury Yachting Partner!',
          'Erleben Sie die unberührte Schönheit der adriatischen Küste mit unserem exklusiven Motoryachtcharter. Entdecken Sie malerische Buchten, erleben Sie die vielfältige Kulinarik und entspannen Sie am Strand oder an Bord während Sie die atemberaubende Natur Kroatiens genießen.',
          'Mit mehr als 1.200 Inseln vor der Küste Kroatiens zählt dieses Gebiet zu den schönsten und attraktivsten in ganz Europa. Tauchen Sie ein in azurblaues Meer, das zum Schnorcheln einlädt und erkunden Sie malerische Riffe sowie eine Vielzahl an traumhaften Buchten.',
          'Erstklassige Motoryachtvermietung',
          'Bei uns können Sie eine Luxus-Motoryacht chartern, die keinerlei Wünsche offen lässt, um die beeindruckende Küstenlandschaft und unvergleichliche Schönheit Kroatiens in vollen Zügen genießen.',
          'Unsere Yachtvermietung bietet Ihnen exklusiven Luxus und Komfort, um ein individuell zugeschnittenes Chartererlebnis zu ermöglichen.',
          'Lehnen Sie sich entspannt zurück und genießen Sie die atemberaubende Natur, die kulturellen Highlights, das pulsierende Nachtleben und die unzähligen kulinarischen Delikatessen Kroatiens.',
          'Einzigartige Urlaubsstimmung',
          'Genießen Sie Luxus und Komfort auf einer unserer erstklassigen Motoryachten. Unsere erfahrene Crew kümmert sich um Ihr Wohlergehen und Ihr Captain führt Sie zu den verborgenen Schätzen Kroatiens, während Sie sich an Bord in exklusiver Atmosphäre entspannen.',
          'Buchen Sie noch heute Ihren nächsten Urlaub voller Entspannung, Abenteuer und Kulinarik umgeben von einem luxuriösen Ambiente. Ein Urlaubserlebnis ganz nach Ihren Wünschen wartet auf Sie!',
        ],
      },
    ],
  },
}

const LUXURY_HIGHLIGHTS = [
  '/images/luxury/nikita-17.png',
  '/images/luxury/nikita_int-6.png',
  '/images/luxury/nikita-8-1.png',
]
const LUXURY_IMPRESSIONEN = [
  '/images/luxury/nikita-5.png',
  '/images/luxury/nikita-4.png',
  '/images/luxury/nikita-2.png',
  '/images/luxury/nikita-14.png',
  '/images/luxury/nikita-10.png',
  '/images/luxury/nikita_int-10.png',
  '/images/luxury/nikita_int-1.png',
]

export default function ToernDetailPage() {
  const { id } = useParams<{ id: string }>()
  const data = id ? toernData[id] : null

  if (!data) return <Navigate to="/toerns" replace />

  const teaserPackages = data.packageTeasers
    .map(pid => packages.find(p => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => !!p)

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={data.seoTitle}
        description={data.seoDesc}
        canonical={`/toerns/${data.id}`}
        image={data.heroImg}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
        <img
          src={data.heroImg}
          alt={data.h1}
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
            <span style={{ color: '#fff' }}>{data.breadcrumb}</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1.5rem', maxWidth: '650px', lineHeight: 1.25 }}>
            {data.h1}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <Link to={data.luxury ? '/urlaubsplaner' : '/buchen'} className="btn btn-primary" style={{ marginRight: '1rem' }}>
              {data.luxury ? 'Urlaubsplanung starten' : 'Jetzt buchen'}
            </Link>
            <Link to="/toerns" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>← Alle Törns</Link>
          </motion.div>
        </div>
      </div>

      {/* Package-Teaser (echte Angebote wie auf der Originalseite) */}
      {teaserPackages.length > 0 && (
        <section style={{ background: 'var(--gray-light)', padding: '3.5rem 0' }}>
          <div className="container">
            <div className="teaser-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(teaserPackages.length + (data.extraTeaser ? 1 : 0), 4)}, 1fr)`, gap: '1.5rem' }}>
              {teaserPackages.map(pkg => (
                <div key={pkg.id} style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img src={pkg.cardImg} alt={pkg.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).src = '/images/packages/default-header-image.jpg' }} />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                      {pkg.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '0.8rem', lineHeight: 1.55, flex: 1, marginBottom: '1rem' }}>{pkg.subtitle}</p>
                    <Link to={`/packages/${pkg.id}`} className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '9px 16px', alignSelf: 'flex-start' }}>
                      ▶ ZUM ANGEBOT
                    </Link>
                  </div>
                </div>
              ))}
              {data.extraTeaser && (
                <div style={{ background: 'var(--navy)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img src={data.extraTeaser.img} alt={data.extraTeaser.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                      {data.extraTeaser.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.55, flex: 1, marginBottom: '1rem' }}>
                      Die Party-Flottille für alle zwischen 21 und 35.
                    </p>
                    <Link to={data.extraTeaser.to} className="btn btn-gold" style={{ fontSize: '0.72rem', padding: '9px 16px', alignSelf: 'flex-start' }}>
                      {data.extraTeaser.label}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* mySea-Banner (Familien) */}
      {data.banner && (
        <section style={{ background: '#fff', padding: '3rem 0 0' }}>
          <div className="container">
            <div className="banner-grid" style={{ background: 'var(--blue-pale, #eaf4fb)', borderRadius: '6px', padding: '2rem', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '2rem', alignItems: 'center' }}>
              <img src={data.banner.img} alt="Club der 15 %" loading="lazy" style={{ width: '100%', borderRadius: '4px' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>{data.banner.title}</h2>
                <p style={{ color: '#444', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.6rem' }}>{data.banner.text}</p>
                <p style={{ color: 'var(--blue)', fontSize: '0.9rem', fontWeight: 700 }}>{data.banner.footer}</p>
              </div>
            </div>
          </div>
        </section>
      )}

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
              maxWidth: section.img ? undefined : '860px',
            }} className="content-grid">
              <div style={{ direction: 'ltr' }}>
                {section.heading && (
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: section.small ? '1.3rem' : 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map(p => (
                  <p key={p} style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '0.9rem', fontWeight: ['Erstklassige Motoryachtvermietung', 'Einzigartige Urlaubsstimmung', 'Willkommen bei Ihrem Luxury Yachting Partner!', 'Hoch die Gläser und ab ins Abenteuer!', 'Jetzt Familien-Segeltörn planen und einzigartige Erinnerungen schaffen!'].includes(p) ? 700 : 400 }}>
                    {p}
                  </p>
                ))}
                {section.listTitle && (
                  <p style={{ color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, margin: '1rem 0 0.6rem' }}>{section.listTitle}</p>
                )}
                {section.list && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    {section.list.map(item => {
                      const ci = item.indexOf(':')
                      return (
                        <li key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>✔</span>
                          {ci > 0 && ci < 30
                            ? <span><strong style={{ color: 'var(--navy)' }}>{item.slice(0, ci + 1)}</strong>{item.slice(ci + 1)}</span>
                            : item}
                        </li>
                      )
                    })}
                  </ul>
                )}
                {section.afterList?.map(p => (
                  <p key={p} style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '0.9rem' }}>{p}</p>
                ))}
              </div>
              {section.img && (
                <div style={{ direction: 'ltr', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                  <img
                    src={section.img}
                    alt={section.imgAlt || ''}
                    loading="lazy"
                    style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ (Einsteiger) */}
      {data.faq && (
        <section className="section" style={{ background: 'var(--gray-light)' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>
              Häufige Einsteiger Fragen:
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {data.faq.map(f => (
                <div key={f.q} style={{ background: '#fff', borderRadius: '6px', padding: '1.25rem 1.5rem' }}>
                  <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>{f.q}</p>
                  <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.a}</p>
                </div>
              ))}
            </div>
            <Link to="/faq" style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '0.9rem' }}>zu den FAQs »</Link>
          </div>
        </section>
      )}

      {/* Luxury: Highlights, NIKITA, Preise, Impressionen */}
      {data.luxury && (
        <>
          <section className="section" style={{ background: 'var(--gray-light)' }}>
            <div className="container">
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '2rem', textAlign: 'center' }}>
                Die Highlights unserer Luxury-Packages
              </h2>
              <div className="luxury-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {LUXURY_HIGHLIGHTS.map(img => (
                  <div key={img} style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <img src={img} alt="Luxury Yacht NIKITA" loading="lazy" style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" style={{ background: 'var(--navy)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                «NIKITA»
              </h2>
              <p style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
                RIVA 100 CORSARO
              </p>
              <img src="/images/luxury/bilder_nikita.png" alt="NIKITA – Riva 100 Corsaro" loading="lazy"
                style={{ maxWidth: '100%', borderRadius: '6px', marginBottom: '1.5rem' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="luxury-facts" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2.5rem' }}>
                <img src="/images/luxury/NikitaFacts.png" alt="NIKITA Facts" loading="lazy" style={{ width: '100%', borderRadius: '6px' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                <img src="/images/luxury/NikitaFacts-2.png" alt="NIKITA Facts" loading="lazy" style={{ width: '100%', borderRadius: '6px' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>

              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Preise</h3>
              <div className="luxury-prices" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: '720px', margin: '0 auto' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.75rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Nebensaison / Woche</p>
                  <p style={{ color: '#fff', fontSize: '0.82rem', marginBottom: '0.75rem' }}>01.06. – 22.06. &amp; 07.09. – 21.09.</p>
                  <p style={{ color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif', fontSize: '1.8rem', fontWeight: 700 }}>€ 100 000,-</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.75rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Hauptsaison / Woche</p>
                  <p style={{ color: '#fff', fontSize: '0.82rem', marginBottom: '0.75rem' }}>22.06. – 07.09.</p>
                  <p style={{ color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif', fontSize: '1.8rem', fontWeight: 700 }}>€ 110 000,-</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section" style={{ background: '#fff' }}>
            <div className="container">
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '2rem', textAlign: 'center' }}>
                Impressionen
              </h2>
              <div className="luxury-impressionen" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {LUXURY_IMPRESSIONEN.map(img => (
                  <div key={img} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '6px', background: '#eee' }}>
                    <img src={img} alt="NIKITA Impressionen" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <p style={{ color: 'var(--gray)', fontSize: '0.95rem', marginBottom: '1rem' }}>Zur Luxury-Yachtreise Buchung</p>
                <Link to="/urlaubsplaner" className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '14px 36px' }}>
                  URLAUBSPLANUNG STARTEN
                </Link>
              </div>
            </div>
          </section>
        </>
      )}

      <style>{`
        @media (max-width: 1000px) { .teaser-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          .luxury-grid { grid-template-columns: 1fr !important; }
          .luxury-facts, .luxury-prices { grid-template-columns: 1fr !important; }
          .banner-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .teaser-grid { grid-template-columns: 1fr !important; }
          .luxury-impressionen { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
