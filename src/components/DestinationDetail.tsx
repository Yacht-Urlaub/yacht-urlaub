import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export type Destination = {
  id: string
  name: string
  country: string
  headerImg: string
  mapImg: string
  intro: string
  highlights: string[]
  bestTime: string
  difficulty: string
  distance: string
  gallery: string[]
  regions: { name: string; desc: string }[]
}

export const destinations: Destination[] = [
  {
    id: 'kroatien',
    name: 'Kroatien',
    country: '🇭🇷',
    headerImg: '/images/Destinationsbilder/Header/Header_TB_Dalmatien.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-kroatiens.jpg',
    intro: 'Kroatien ist das klassische Segelrevier für Einsteiger und Profis gleichermaßen. Über 1.200 Inseln, klares türkisblaues Wasser, historische Städte und traumhafte Buchten machen dieses Mittelmeerparadies zum beliebtesten Segelziel Europas.',
    highlights: ['1.200+ Inseln und Inselchen', 'Historische Städte (Dubrovnik, Split, Hvar)', 'Klares türkisblaues Wasser', 'Ausgezeichnete Marina-Infrastruktur', 'Köstliche dalmatinische Küche'],
    bestTime: 'Mai – Oktober',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ca. 1.200 km Küstenlinie',
    gallery: [
      '/images/Destinationsbilder/blick-auf-den-hafen-von-hvar-bei-yacht-urlaub.png',
      '/images/Destinationsbilder/dubrovnik-aus-der-himmelsperspektive-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/Dubrovnik.jpg',
      '/images/Destinationsbilder/Hvar.webp',
      '/images/Destinationsbilder/enge-gasse-mit-blick-aufs-meer-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/Header/Header_TB_Dubrovnik.jpg',
      '/images/Destinationsbilder/Header/Header_TB_Kornaten.jpg',
      '/images/Destinationsbilder/Header/Kroatien Bucht.webp',
    ],
    regions: [
      { name: 'Dalmatien', desc: 'Die bekannteste Region mit Städten wie Split und Dubrovnik sowie den Kornaten.' },
      { name: 'Istrien', desc: 'Die nordwestliche Halbinsel mit venezianischem Flair und ruhigeren Revieren.' },
      { name: 'Kornaten', desc: 'Einzigartiger Nationalpark mit über 140 unbewohnten Inseln — ein Paradies für Naturliebhaber.' },
    ],
  },
  {
    id: 'griechenland',
    name: 'Griechenland',
    country: '🇬🇷',
    headerImg: '/images/Destinationsbilder/Header/header_greece.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-griechenlands.jpg',
    intro: 'Griechenland bietet mit seinen unzähligen Inseln und mythologischen Stätten ein unvergessliches Segelerlebnis. Von den Ionischen Inseln im Westen bis zu den Kykladen und der Ägäis — jedes Revier hat seinen eigenen Charakter.',
    highlights: ['6.000+ Inseln und Inselchen', 'Antike Tempel und Stätten', 'Berühmte Meltemi-Winde', 'Authentische griechische Tavernas', 'Kristallklares Ägäis-Wasser'],
    bestTime: 'April – Oktober',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ionisches Meer bis Ägäis',
    gallery: [
      '/images/Destinationsbilder/akropolis-von-rhodos-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/Akropolis1.webp',
      '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/korfu.jpg',
      '/images/Destinationsbilder/Header/header_greece.jpg',
    ],
    regions: [
      { name: 'Ionische Inseln', desc: 'Korfu, Kefalonia, Lefkada — grüne Inseln mit ruhigem Segeln, ideal für Familien.' },
      { name: 'Kykladen', desc: 'Mykonos, Santorini, Paros — das ikonische Griechenland mit weißen Häusern und blauem Meer.' },
      { name: 'Dodekanes', desc: 'Rhodos, Kos, Patmos — beeindruckende Geschichte und schöne Buchten.' },
    ],
  },
  {
    id: 'balearen',
    name: 'Balearen',
    country: '🇪🇸',
    headerImg: '/images/Destinationsbilder/Header/Header_TB_Mallorca.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-der-balearen.jpg',
    intro: 'Mallorca, Ibiza, Menorca und Formentera — die Balearen verbinden lebhaftes mediterranes Leben mit versteckten Traumstränden. Segelrevier für alle, die Kultur, Natur und Nightlife in einem Urlaub erleben möchten.',
    highlights: ['Traumstrände und Calas', 'Lebhaftes Nachtleben auf Ibiza', 'Ruhige Natur auf Menorca', 'Ausgezeichnete Marinas', 'Kulinarische Vielfalt'],
    bestTime: 'April – Oktober',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ca. 400 km zwischen den Inseln',
    gallery: [
      '/images/Destinationsbilder/blick-auf-palma-de-mallorca.jpg',
      '/images/Destinationsbilder/alcúdia-bucht.jpg',
      '/images/Destinationsbilder/bucht-auf-ibiza.jpg',
      '/images/Destinationsbilder/espalmador-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/cabrera-bei-yacht-urlaub (2).jpg',
      '/images/Destinationsbilder/Header/Header_TB_Mallorca.jpg',
    ],
    regions: [
      { name: 'Mallorca', desc: 'Die größte Insel mit Palma, der Sierra de Tramuntana und unzähligen Calas.' },
      { name: 'Ibiza & Formentera', desc: 'Party-Insel trifft Naturparadies — Formentera hat die schönsten Strände Europas.' },
      { name: 'Menorca', desc: 'UNESCO-Biosphärenreservat mit unberührter Natur und ruhigen Buchten.' },
    ],
  },
  {
    id: 'karibik',
    name: 'Karibik-BVI',
    country: '🏝️',
    headerImg: '/images/Destinationsbilder/Header/caribbean.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-der-britischen-jungferninseln.jpg',
    intro: 'Die Britischen Jungferninseln sind das Segelparadies schlechthin. Konstante Passatwinde, türkisblaues Wasser, weiße Sandstrände und entspannte Strandbar-Kultur machen die BVIs zum Traum jedes Seglers.',
    highlights: ['Konstante Passatwinde', 'Legendäre Soggy Dollar Bar', 'Traumhafte Strände auf Jost Van Dyke', 'The Baths auf Virgin Gorda', 'Einfaches Segeln zwischen den Inseln'],
    bestTime: 'November – April',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ca. 60 Seemeilen Hauptrevier',
    gallery: [
      '/images/Destinationsbilder/entertainment-in-den-bvis-bei-yacht-urlaub.png',
      '/images/Destinationsbilder/cocktails-auf-der-yacht-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/grill-am-strand-bei-yacht-urlaub.png',
      '/images/Destinationsbilder/Header/karibik_header.webp',
    ],
    regions: [
      { name: 'Tortola', desc: 'Die Hauptinsel der BVI mit dem größten Yachthafen Road Town.' },
      { name: 'Virgin Gorda', desc: 'Heimat der legendären The Baths — bizarre Felsformationen am Strand.' },
      { name: 'Jost Van Dyke', desc: 'Klein, entspannt und mit der berühmtesten Strandbar der Karibik.' },
    ],
  },
  {
    id: 'seychellen',
    name: 'Seychellen',
    country: '🏝️',
    headerImg: '/images/Destinationsbilder/Header/seychelles1.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-kroatiens.jpg',
    intro: 'Die Seychellen sind das ultimative Luxus-Segelziel. Zwischen Mahé, Praslin und La Digue warten Granitfelsen, palmgesäumte Strände und eine einzigartige Unterwasserwelt auf Entdecker, die das Paradies suchen.',
    highlights: ['Einzigartige Granitfelsen', 'Schildkröten und Riesenmeeresschildkröten', 'Anse Lazio — einer der schönsten Strände der Welt', 'Vallée de Mai auf Praslin', 'Coco de Mer — die größte Nuss der Welt'],
    bestTime: 'April – Mai & Oktober – November',
    difficulty: 'Fortgeschrittene',
    distance: 'Ca. 100 Seemeilen Hauptrevier',
    gallery: [
      '/images/Destinationsbilder/Header/seychelles1.jpg',
      '/images/Destinationsbilder/DSC_0009.JPG',
    ],
    regions: [
      { name: 'Mahé', desc: 'Die Hauptinsel mit dem internationalen Flughafen — perfekter Ausgangspunkt.' },
      { name: 'Praslin', desc: 'Heimat des Vallée de Mai und des wunderschönen Anse Lazio.' },
      { name: 'La Digue', desc: 'Fast autofreie Insel mit dem ikonischen Anse Source d\'Argent.' },
    ],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: '🇹🇭',
    headerImg: '/images/Destinationsbilder/Header/thailand-header.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-von-thailand.gif',
    intro: 'Thailand bietet ein einzigartiges Segelerlebnis in Südostasien. Zwischen Phuket, Phi Phi und den Similan-Inseln warten Kalksteinfelsen, türkisblaue Lagunen und exotisches Flair auf Abenteurer.',
    highlights: ['Dramatische Kalksteinfelsen', 'Phi Phi Inseln', 'Similan-Inseln Nationalpark', 'Exotische Küche', 'Entspannte Thai-Kultur'],
    bestTime: 'November – April',
    difficulty: 'Fortgeschrittene',
    distance: 'Andamanensee und Phuket-Revier',
    gallery: [
      '/images/Destinationsbilder/katamaran-in-thailand.jpg',
      '/images/Destinationsbilder/Header/thailand-header.jpg',
    ],
    regions: [
      { name: 'Phuket', desc: 'Ausgangspunkt für die meisten Törns mit Marinas und Services.' },
      { name: 'Phi Phi', desc: 'Legendäre Inseln mit türkisblauen Lagunen und Felswänden.' },
      { name: 'Similan-Inseln', desc: 'Nationalpark mit dem besten Schnorcheln und Tauchen Südostasiens.' },
    ],
  },
]

function LightboxDest({ imgs, index, onClose, onPrev, onNext }: { imgs: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button onClick={e => { e.stopPropagation(); onPrev() }} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>‹</button>
      <motion.img key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} src={imgs[index]} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '2px' }} />
      <button onClick={e => { e.stopPropagation(); onNext() }} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>›</button>
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
    </motion.div>
  )
}

export default function DestinationDetail({ dest, onBack }: { dest: Destination; onBack: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img src={dest.headerImg} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18,43,64,0.4) 0%, rgba(18,43,64,0.7) 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '1rem', textAlign: 'left', fontFamily: 'DM Sans, sans-serif' }}>
            ← Alle Destinationen
          </button>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
            {dest.country} Destination
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>{dest.name}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem' }}>
          {/* Main content */}
          <div>
            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.9, marginBottom: '2.5rem' }}>{dest.intro}</p>

            {/* Highlights */}
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Highlights</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {dest.highlights.map(h => (
                <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#444' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '1rem' }}>✓</span> {h}
                </li>
              ))}
            </ul>

            {/* Regionen */}
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Regionen</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {dest.regions.map(r => (
                <div key={r.name} style={{ padding: '1.25rem', background: 'var(--gray-light)', borderLeft: '3px solid var(--blue)', borderRadius: '0 4px 4px 0' }}>
                  <h3 style={{ fontSize: '0.95rem', color: 'var(--navy)', fontWeight: 700, marginBottom: '0.4rem' }}>{r.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Gallery */}
            {dest.gallery.length > 0 && (
              <>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Fotogalerie</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {dest.gallery.map((img, i) => (
                    <div key={img} onClick={() => setLightbox(i)} style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', borderRadius: '3px', background: '#eee' }}>
                      <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '4px', padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Reisedaten</h3>
              {[
                { icon: '📅', label: 'Beste Reisezeit', val: dest.bestTime },
                { icon: '⚓', label: 'Schwierigkeit', val: dest.difficulty },
                { icon: '🗺️', label: 'Revier', val: dest.distance },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                    <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{s.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {dest.mapImg && (
              <img src={dest.mapImg} alt={`Karte ${dest.name}`} loading="lazy" style={{ width: '100%', borderRadius: '4px', marginBottom: '1.5rem' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            )}

            <a href="#kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Törn nach {dest.name} anfragen →
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <LightboxDest imgs={dest.gallery} index={lightbox} onClose={() => setLightbox(null)}
            onPrev={() => setLightbox(i => (i! - 1 + dest.gallery.length) % dest.gallery.length)}
            onNext={() => setLightbox(i => (i! + 1) % dest.gallery.length)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .dest-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
