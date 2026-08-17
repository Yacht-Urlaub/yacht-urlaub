import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useLang } from '../i18n'
import { Link } from '../router'

// Inhalte der Altseite yacht-holiday.net/yoga bzw. yacht-urlaub.net/yoga.
// Die englische Fassung trug den Text; die deutsche war dort nur ein Stummel
// und ist hier erstmals vollstaendig uebersetzt.
const yl = {
  de: {
    label: 'Yoga & Segeln',
    h1: 'Yoga-Retreat mit Yacht-Urlaub',
    sub: 'Segeln Sie über das türkisfarbene Wasser der Adria und verbinden Sie es mit Yoga, Meditation und mediterraner Küche — während Sie die Buchten, Inseln und Küsten Kroatiens erkunden.',
    introH: 'Körper, Geist und Meer',
    intro: 'Yoga und Segeln zusammen ergeben einen Urlaub, wie es ihn an Land nicht gibt. Kräftigende, zugleich sanfte Übungsfolgen, Atemarbeit und geführte Meditation lassen Sie inmitten der Natur zur Ruhe kommen. Kroatien bietet dafür den passenden Rahmen: über 1200 Inseln, Naturschutzgebiete und eine Küstenlandschaft aus Bergen und stillen Buchten.',
    hostH: 'Ihre Gastgeberin',
    host: 'Begleitet wird das Retreat von Rebecca — zertifizierte Yoga-Lehrerin und Yacht-Hostess. Die gebürtige Amerikanerin lebt heute in Kroatien, praktiziert seit 2010 Yoga und kocht seit 2017 an Bord. Sie bereitet täglich leichte Frühstücke und Mittagessen zu, hält die Yacht in Ordnung und leitet die Yoga- und Meditationseinheiten.',
    dayH: 'Ein Tag an Bord',
    day: 'Der Tag beginnt mit einer belebenden Yoga-Einheit in den frühen Morgenstunden — an Land, an ausgesuchten Plätzen mit Blick auf das Meer oder die Landschaft. Zum Auftakt eine kurze Atemübung und Meditation, danach fließende Übungsfolgen, bei denen Atem und Bewegung zusammenfinden. Anfänger sind ebenso willkommen wie Geübte: Die Haltungen werden gezeigt, angepasst und begleitet. Zum Abschluss folgt eine geführte Tiefenentspannung im Liegen.',
    foodH: 'Mediterrane Küche an Bord',
    food: 'Frühstück und Mittagessen kommen als Buffet auf den Tisch, mediterran und leicht. Vegetarisch ist die Empfehlung für die Woche, Fleisch und Geflügel servieren wir aber gerne — Unverträglichkeiten bitte vorab mitteilen. Abends geht es an Land, meist in familiengeführte Lokale mit dem Fang des Tages: Hummer, Oktopussalat, gegrillter Fisch. Unbedingt probieren sollten Sie Peka — stundenlang im gusseisernen Topf über offenem Feuer geschmort, mit Gemüse und Kräutern.',
    actH: 'Zwischen den Einheiten',
    act: 'Unterwegs empfehlen wir passende Ausflüge und Aktivitäten: Weinverkostungen, Führungen, die Blaue Grotte, Rollerverleih, Kajaktouren, Wassersport. Vor jedem Ziel erfahren Sie, was vor Ort möglich ist. Und wenn Ihnen der Sinn eher nach Ruhe steht: Schnorcheln, im Meer treiben oder einfach in der Sonne liegen geht jeden Tag.',
    routeH: 'Die Route',
    routeCap: 'Segelroute des Yoga-Retreats in Kroatien',
    pkgH: 'Die beiden Varianten',
    pkgSub: 'Preis pro Person, All-inclusive an Bord.',
    perPerson: '/Person',
    onRequest: 'auf Anfrage',
    labels: { avail: 'Verfügbarkeit', attr: 'Ausstattung', best: 'Besonders geeignet für', people: 'Personen', fuel: 'Treibstoff' },
    boat: 'Segelyacht', cat: 'Katamaran',
    boatAttr: 'All-inclusive an Bord, 2 Personen pro Kabine',
    boatBest: 'mehr Segeln',
    boatPeople: '4 – 8',
    boatFuel: 'inklusive',
    catAttr: 'All-inclusive an Bord',
    catBest: 'mehr Platz, Yoga auch an Bord',
    catPeople: '6 – 10',
    ctaH: 'Worauf warten Sie noch?',
    ctaP: 'Schreiben Sie uns — wir stellen Ihren Törn zusammen.',
    ctaBtn: 'Anfrage starten',
    ctaHref: '/kontakt',
    planner: 'Oder nutzen Sie den Urlaubsplaner »',
    plannerHref: '/urlaubsplaner',
  },
  en: {
    label: 'Yoga & sailing',
    h1: 'Yoga retreat with Yacht-Holiday',
    sub: 'Sail the turquoise waters of the Adriatic Sea and indulge in yoga, meditation and delicious Mediterranean meals — all while exploring the beautiful bays, islands and coasts of Croatia.',
    introH: 'Body, mind and sea',
    intro: 'Combining yoga and sailing allows you to take a unique holiday by sea, connecting mind, body and spirit back to nature. Through a combination of strengthening but gentle yoga poses and sequences, breathing practices and guided meditation, you can rejuvenate yourself in natural surroundings. Croatia has so much to offer — over 1200 islands, nature reserves and landscapes full of mountains and quiet bays.',
    hostH: 'Your host',
    host: 'Our yoga retreat by sea is hosted by certified yoga instructor and yacht hostess Rebecca. An American now living in Croatia, she has been practicing yoga since 2010 and preparing the best meals at sea since 2017. During your time together, Rebecca prepares light breakfasts and delicious lunches every day, keeps the yacht interior tidy and guides meditation and yoga classes immersed in nature.',
    dayH: 'A day on board',
    day: 'Every day starts with an invigorating yoga class in the early morning hours, on land at predetermined locations overlooking the sea or beautiful landscapes. The session begins with a short breathing practice for relaxation followed by meditation. Then the class flows into different poses, connecting the breath with each movement. Classes are suitable for beginners and more experienced practitioners alike — demonstration, adjustments and guidance throughout can be expected. All levels are welcome. Class closes with a lying-down guided meditation offering deep relaxation and restoration.',
    foodH: 'Mediterranean food on board',
    food: 'Breakfast and lunch are typically served buffet-style with a Mediterranean taste your tastebuds will love. A vegetarian diet is suggested for the week, but we are happy to serve meat, poultry and so on — please let us know of any dietary restrictions in advance. Dinners are on shore, mostly at family-owned restaurants serving that day’s fresh caught seafood: lobster, octopus salad, grilled fish. A must try is peka — slow cooked for hours in steel pots in a brick outdoor oven, combined with delicious seasonings and vegetables.',
    actH: 'Between the sessions',
    act: 'Throughout your trip, fun activities and tours are recommended to further take in the excitement of a new destination: wine tastings, guided tours, blue caves, scooter rentals, kayaking, water activities and excursions. Before arriving at each location you will be told what is available in the area. And each day you will have the chance to snorkel, float in the sea or simply bask in the sun.',
    routeH: 'The route',
    routeCap: 'Yoga retreat sailing route in Croatia',
    pkgH: 'The two options',
    pkgSub: 'Price per person, all inclusive on board.',
    perPerson: '/person',
    onRequest: 'on request',
    labels: { avail: 'Availability', attr: 'Attributes', best: 'Best suited for', people: 'Number of people', fuel: 'Fuel consumption' },
    boat: 'Sailing yacht', cat: 'Catamaran',
    boatAttr: 'all inclusive on board, 2 persons per cabin',
    boatBest: 'more sailing',
    boatPeople: '4 – 8',
    boatFuel: 'included',
    catAttr: 'all inclusive on board',
    catBest: 'more spacious, yoga on board as well',
    catPeople: '6 – 10',
    ctaH: 'So what are you waiting for?',
    ctaP: 'Contact us today and we will start organising your next holiday.',
    ctaBtn: 'Start a quote',
    ctaHref: '/en/contact',
    planner: 'Or use our holiday planner »',
    plannerHref: '/en/holiday-planner',
  },
} as const

const HERO = '/images/yoga/Yoga_in_der_Bucht.jpg'

const gallery = [
  { src: '/images/yoga/Yoga_im_Schatten.jpg', de: 'Yoga im Schatten am Meer', en: 'Yoga in the shade by the sea' },
  { src: '/images/yoga/Yoga_vor_Kirche.jpg', de: 'Yoga-Einheit vor alter Kirche', en: 'Yoga session in front of an old church' },
  { src: '/images/yoga/Yoga_in_der_Bucht2.jpg', de: 'Yoga-Einheit in einer Bucht', en: 'Yoga session in a bay' },
  { src: '/images/yoga/Lonely_Paradise.jpg', de: 'Einsame Bucht in Kroatien', en: 'Lonely bay in Croatia' },
]

const foodImgs = [
  { src: '/images/yoga/Brettljause.jpg', de: 'Typische Jause an Bord', en: 'Typical lunch snack' },
  { src: '/images/yoga/Fisch_auf_Eis.jpg', de: 'Fangfrischer Fisch', en: 'Fresh local fish on ice' },
  { src: '/images/yoga/Peka_am_Grill.jpg', de: 'Peka über offenem Feuer', en: 'Peka on the grill' },
  { src: '/images/yoga/Zitrusfruechte.jpg', de: 'Frische Früchte', en: 'Fresh fruits' },
]

const sectionTitle: React.CSSProperties = {
  fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.35rem, 2.6vw, 1.9rem)',
  color: 'var(--navy)', marginBottom: '1rem',
}
const bodyText: React.CSSProperties = { color: '#444', fontSize: '0.97rem', lineHeight: 1.85 }

export default function YogaPage() {
  const lang = useLang()
  const s = yl[lang]
  const cap = (o: { de: string; en: string }) => (lang === 'en' ? o.en : o.de)

  const pakete = [
    { name: s.boat, img: '/images/yoga/segelyacht.jpg', preis: '€ 1.850,–',
      attr: s.boatAttr, best: s.boatBest, people: s.boatPeople, fuel: s.boatFuel },
    { name: s.cat, img: '/images/yoga/katamaran.jpg', preis: '€ 2.950,–',
      attr: s.catAttr, best: s.catBest, people: s.catPeople, fuel: s.boatFuel },
  ]

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO
        title={lang === 'en' ? 'Yoga retreat with Yacht-Holiday' : 'Yoga-Retreat mit Yacht-Urlaub'}
        description={s.sub}
        image={HERO}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img src={HERO} alt={s.h1} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.9) 0%, rgba(7,27,47,0.45) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.75rem' }}>
            {s.label}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            {s.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', maxWidth: '560px', lineHeight: 1.8 }}>
            {s.sub}
          </motion.p>
        </div>
      </div>

      {/* Einleitung */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={sectionTitle}>{s.introH}</h2>
          <p style={bodyText}>{s.intro}</p>
        </div>
      </section>

      {/* Gastgeberin */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div className="yoga-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={sectionTitle}>{s.hostH}</h2>
              <p style={bodyText}>{s.host}</p>
            </div>
            <img src="/images/yoga/Instructor_Rebecca.jpg" alt={lang === 'en' ? 'Yoga instructor Rebecca' : 'Yoga-Lehrerin Rebecca'}
              style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }} />
          </div>
        </div>
      </section>

      {/* Tagesablauf */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={sectionTitle}>{s.dayH}</h2>
          <p style={bodyText}>{s.day}</p>
        </div>
        <div className="container" style={{ marginTop: '2rem' }}>
          <div className="yoga-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {gallery.map(g => (
              <figure key={g.src} style={{ margin: 0 }}>
                <img src={g.src} alt={cap(g)} loading="lazy"
                  style={{ width: '100%', height: '190px', objectFit: 'cover', borderRadius: '6px' }} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Kulinarik */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={sectionTitle}>{s.foodH}</h2>
          <p style={bodyText}>{s.food}</p>
        </div>
        <div className="container" style={{ marginTop: '2rem' }}>
          <div className="yoga-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
            {foodImgs.map(g => (
              <figure key={g.src} style={{ margin: 0 }}>
                <img src={g.src} alt={cap(g)} loading="lazy"
                  style={{ width: '100%', height: '190px', objectFit: 'cover', borderRadius: '6px' }} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Aktivitäten */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <h2 style={sectionTitle}>{s.actH}</h2>
          <p style={bodyText}>{s.act}</p>
        </div>
      </section>

      {/* Route */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <h2 style={sectionTitle}>{s.routeH}</h2>
          <img src="/images/yoga/Yoga_Map_v1.1.png" alt={s.routeCap} loading="lazy"
            style={{ width: '100%', maxWidth: '720px', borderRadius: '8px', background: '#fff' }} />
        </div>
      </section>

      {/* Pakete */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <h2 style={{ ...sectionTitle, textAlign: 'center' }}>{s.pkgH}</h2>
          <p style={{ ...bodyText, textAlign: 'center', marginBottom: '2.5rem' }}>{s.pkgSub}</p>
          <div className="yoga-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {pakete.map(p => (
              <div key={p.name} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden', background: '#fff' }}>
                <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                <div style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.15rem', color: 'var(--navy)', marginBottom: '0.35rem' }}>{p.name}</h3>
                  <p style={{ color: 'var(--gold)', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                    {p.preis}<span style={{ fontSize: '0.85rem', color: 'var(--gray)', fontWeight: 500 }}>{s.perPerson}</span>
                  </p>
                  <dl style={{ margin: 0, fontSize: '0.88rem', lineHeight: 1.7 }}>
                    {[[s.labels.avail, s.onRequest], [s.labels.attr, p.attr], [s.labels.best, p.best],
                      [s.labels.people, p.people], [s.labels.fuel, p.fuel]].map(([k, v]) => (
                      <div key={k} style={{ display: 'flex', gap: '0.5rem', padding: '0.3rem 0', borderTop: '1px solid #f1f5f9' }}>
                        <dt style={{ color: 'var(--navy)', fontWeight: 600, minWidth: '150px' }}>{k}</dt>
                        <dd style={{ margin: 0, color: '#555' }}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Abschluss */}
      <section className="section" style={{ background: 'var(--navy)', color: '#fff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>{s.ctaH}</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: '2rem' }}>{s.ctaP}</p>
          <Link to={s.ctaHref} className="btn btn-primary" style={{ fontSize: '0.82rem' }}>{s.ctaBtn}</Link>
          <p style={{ marginTop: '1.25rem' }}>
            <Link to={s.plannerHref} style={{ color: 'var(--blue-light)', fontSize: '0.85rem' }}>{s.planner}</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
