import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

type YachtCategory = {
  id: string
  label: string
  subtitle: string
  headerImg: string
  description: string
  specs: { label: string; value: string }[]
  gallery: string[]
  models: { name: string; img: string; length: string; cabins: string; persons: string }[]
}

const categories: YachtCategory[] = [
  {
    id: 'monohull',
    label: 'Segelyacht',
    subtitle: 'Monohull',
    headerImg: '/images/yachten/monohull.jpg',
    description: 'Die klassische Segelyacht — elegant, schnell und mit dem einzigartigen Gefühl des echten Segelns. Von kompakten 35-Fuß-Yachten bis hin zu komfortablen 55-Fuß-Kreuzern.',
    specs: [
      { label: 'Länge', value: '35 – 55 Fuß' },
      { label: 'Kabinen', value: '2 – 5' },
      { label: 'Personen', value: '4 – 10' },
      { label: 'Marken', value: 'Dufour, Bavaria, Hanse, Jeanneau, Elan' },
    ],
    gallery: [
      '/images/yachten/monohull.jpg',
      '/images/yachten/segelyacht.jpg',
      '/images/yachten/Dufour_41_Performance.jpg',
      '/images/yachten/41Cr.jpg',
      '/images/yachten/45Cr.jpg',
      '/images/yachten/55Cr.jpg',
      '/images/yachten/Header_Yacht.jpg',
      '/images/yachten/Dufour460GL/0712.jpeg',
      '/images/yachten/Dufour460GL/0745.jpeg',
      '/images/yachten/Dufour460GL/0752.jpeg',
      '/images/yachten/Dufour460GL/0757.jpeg',
      '/images/yachten/Dufour460GL/Grill.jpeg',
    ],
    models: [
      { name: 'Dufour 41 Performance', img: '/images/yachten/Dufour_41_Performance.jpg', length: '12.35 m', cabins: '3', persons: '6' },
      { name: 'Dufour 460 GL', img: '/images/yachten/Dufour460GL/0712.jpeg', length: '14.10 m', cabins: '4', persons: '8' },
      { name: 'Bavaria Cruiser 46', img: '/images/yachten/bavaria-cruiser46-3kab-02.jpg', length: '14.27 m', cabins: '3', persons: '8' },
      { name: 'Cruiser 55', img: '/images/yachten/55Cr.jpg', length: '16.80 m', cabins: '5', persons: '10' },
    ],
  },
  {
    id: 'katamaran',
    label: 'Segel-Katamaran',
    subtitle: 'Mehr Platz, mehr Komfort',
    headerImg: '/images/yachten/katamaran.jpg',
    description: 'Katamarane bieten maximalen Wohnkomfort, minimalen Tiefgang und ein stabiles Segelerlebnis. Ideal für Familien und Gruppen, die das Beste aus Komfort und Abenteuer wollen.',
    specs: [
      { label: 'Länge', value: '40 – 52 Fuß' },
      { label: 'Kabinen', value: '3 – 6' },
      { label: 'Personen', value: '6 – 12' },
      { label: 'Marken', value: 'Lagoon, Bali, Leopard, Fountaine Pajot' },
    ],
    gallery: [
      '/images/yachten/katamaran.jpg',
      '/images/yachten/Lagoon 380.jpg',
      '/images/yachten/Lagoon 450-4.jpg',
      '/images/yachten/Kat gallery/Lagoon 400 1.jpg',
      '/images/yachten/Kat gallery/Lagoon_450-4.jpg',
      '/images/yachten/Kat gallery/bali-4.5-2-.jpg',
      '/images/yachten/Kat gallery/bali-4.5-30-.jpg',
      '/images/yachten/Kat gallery/43/csm_Lagoon_43_Catamaran_f766fcff53.jpg',
      '/images/yachten/Kat gallery/43/csm_Lagoon_43_Catamaran_Cockpit_2_1bdf97ec08.jpg',
      '/images/yachten/Kat gallery/43/csm_Lagoon_43_Catamaran_Salon__9fb9acc7e5.jpg',
      '/images/yachten/Kat gallery/52/Lagoon 52.jpg',
      '/images/yachten/Kat gallery/52/1.jpg',
    ],
    models: [
      { name: 'Lagoon 400 S2', img: '/images/yachten/Kat gallery/Lagoon 400 1.jpg', length: '11.75 m', cabins: '4', persons: '8' },
      { name: 'Lagoon 43', img: '/images/yachten/Kat gallery/43/csm_Lagoon_43_Catamaran_f766fcff53.jpg', length: '12.84 m', cabins: '4', persons: '8' },
      { name: 'Bali 4.5', img: '/images/yachten/Kat gallery/bali-4.5-2-.jpg', length: '13.99 m', cabins: '4', persons: '10' },
      { name: 'Lagoon 52', img: '/images/yachten/Kat gallery/52/Lagoon 52.jpg', length: '15.86 m', cabins: '6', persons: '12' },
    ],
  },
  {
    id: 'motoryacht',
    label: 'Motoryacht',
    subtitle: 'Monohull',
    headerImg: '/images/yachten/motoryacht.jpg',
    description: 'Für alle, die das Meer lieber mit Motor erkunden. Unsere Motoryachten bieten luxuriösen Komfort, hohe Geschwindigkeit und stilvolles Design — perfekt für exklusive Törns.',
    specs: [
      { label: 'Länge', value: '40 – 60 Fuß' },
      { label: 'Kabinen', value: '2 – 5' },
      { label: 'Personen', value: '4 – 10' },
      { label: 'Marken', value: 'Azimut, Ferretti' },
    ],
    gallery: [
      '/images/yachten/motoryacht.jpg',
      '/images/yachten/Motoryachten/1500-2017-LD-G-down-Azimut50.jpg',
      '/images/yachten/Motoryachten/71_20170119055138_50_dining_area_mid_res.jpg',
      '/images/yachten/Motoryachten/71_20170119055140_50_galley_mid_res.jpg',
      '/images/yachten/Motoryachten/71_20170119055143_50_guest_cabin_mid_res.jpg',
      '/images/yachten/Motoryachten/71_20170119055155_50_master_cabin_2_mid_res.jpg',
      '/images/yachten/Motoryachten/71_20170119055202_50_salon_2_mid_res_-_copia.jpg',
      '/images/yachten/Motoryachten/71_20170119055511_50_flybridge_1_mid_res.jpg',
    ],
    models: [
      { name: 'Azimut 43 Fly', img: '/images/yachten/Motoryachten/big_azimut-43-fly---main12964.png.jpg', length: '13.10 m', cabins: '2', persons: '6' },
      { name: 'Azimut 50', img: '/images/yachten/Motoryachten/1500-2017-LD-G-down-Azimut50.jpg', length: '15.20 m', cabins: '3', persons: '8' },
    ],
  },
  {
    id: 'motorkat',
    label: 'Motor-Katamaran',
    subtitle: 'Power & Komfort',
    headerImg: '/images/yachten/motoryacht-katamaran.jpg',
    description: 'Das Beste aus zwei Welten: die Stabilität und den Platz eines Katamarans kombiniert mit der Motorleistung für komfortables Cruisen ohne Segel.',
    specs: [
      { label: 'Länge', value: '47 – 58 Fuß' },
      { label: 'Kabinen', value: '3 – 6' },
      { label: 'Personen', value: '6 – 12' },
      { label: 'Marken', value: 'Leopard, Fountaine Pajot' },
    ],
    gallery: [
      '/images/yachten/motoryacht-katamaran.jpg',
      '/images/yachten/Motorkat/474.jpg',
      '/images/yachten/Motorkat/474-4.jpg',
      '/images/yachten/Motorkat/474_PC_int.jpg',
      '/images/yachten/Motorkat/header.jpg',
      '/images/yachten/Motorkat/514PC_Gallery_Ext.jpg',
      '/images/yachten/Motorkat/mp_474_aft.jpg',
      '/images/yachten/Motorkat/_Y6Y6489-boatbuouy.jpg',
    ],
    models: [
      { name: 'Leopard 474 PC', img: '/images/yachten/Motorkat/474.jpg', length: '14.40 m', cabins: '4', persons: '8' },
      { name: 'Leopard 514 PC', img: '/images/yachten/Motorkat/514PC_Gallery_Ext.jpg', length: '15.68 m', cabins: '5', persons: '10' },
    ],
  },
]

const brands = [
  { name: 'Bavaria', img: '/images/yachten/yachtbauer/Bavaria-Yachtbau-Logo.png' },
  { name: 'Dufour', img: '/images/yachten/yachtbauer/DUFOUR-YACHTS-NB.jpg' },
  { name: 'Hanse', img: '/images/yachten/yachtbauer/hanse.png' },
  { name: 'Jeanneau', img: '/images/yachten/yachtbauer/logo-jeanneau-yachts.jpg' },
  { name: 'Lagoon', img: '/images/yachten/yachtbauer/lagoon-logo.jpg' },
  { name: 'Bali', img: '/images/yachten/yachtbauer/bali-catamarans-2018.jpg' },
  { name: 'Azimut', img: '/images/yachten/yachtbauer/azimut.jpg' },
  { name: 'Leopard', img: '/images/yachten/yachtbauer/leopard-catamarans-logo.jpg' },
]

function Lightbox({ imgs, index, onClose, onPrev, onNext }: { imgs: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.95)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <button onClick={e => { e.stopPropagation(); onPrev() }} style={navBtn('left')}>‹</button>
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        src={imgs[index]}
        alt=""
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '2px' }}
        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      <button onClick={e => { e.stopPropagation(); onNext() }} style={navBtn('right')}>›</button>
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
      <p style={{ position: 'absolute', bottom: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{index + 1} / {imgs.length}</p>
    </motion.div>
  )
}

function navBtn(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute', [side]: '1.5rem', top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff',
    fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px',
    transition: 'background 0.2s',
  }
}

export default function Yachten() {
  const [activeTab, setActiveTab] = useState('monohull')
  const [lightboxImg, setLightboxImg] = useState<number | null>(null)
  const cat = categories.find(c => c.id === activeTab)!

  return (
    <section id="yachten" style={{ background: '#fff' }}>
      {/* Header */}
      <div style={{
        position: 'relative', height: '380px', overflow: 'hidden',
        background: 'var(--navy)',
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activeTab}
            src={cat.headerImg}
            alt={cat.label}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
          />
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(18,43,64,0.85) 0%, rgba(18,43,64,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Unsere Flotte
          </p>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '0.5rem' }}>
            {cat.label}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>{cat.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container" style={{ display: 'flex' }}>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveTab(c.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '1rem 1.5rem',
                color: activeTab === c.id ? '#fff' : 'rgba(255,255,255,0.45)',
                fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em',
                textTransform: 'uppercase', fontFamily: 'Open Sans, sans-serif',
                borderBottom: activeTab === c.id ? '3px solid var(--blue-light)' : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container" style={{ padding: '4rem 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '4rem', marginBottom: '4rem' }}>
              {/* Description */}
              <div>
                <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem' }}>{cat.description}</p>
                <a href="#kontakt" className="btn btn-primary">Jetzt anfragen →</a>
              </div>
              {/* Specs */}
              <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Technische Daten</h3>
                {cat.specs.map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #e8e8e8' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--gray)', fontWeight: 400 }}>{s.label}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--navy)', fontWeight: 600 }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modelle */}
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Unsere Modelle</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '3rem' }}>
              {cat.models.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ background: 'var(--gray-light)', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}
                  onClick={() => setLightboxImg(cat.gallery.indexOf(m.img) >= 0 ? cat.gallery.indexOf(m.img) : 0)}
                >
                  <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                    <img
                      src={m.img} alt={m.name} loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                      onError={e => { (e.target as HTMLImageElement).src = cat.headerImg }}
                    />
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 700, marginBottom: '0.5rem' }}>{m.name}</h4>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>⚓ {m.length}</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>🛏 {m.cabins} Kab.</span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>👤 {m.persons} Pers.</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Galerie */}
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Fotogalerie</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {cat.gallery.map((img, i) => (
                <motion.div
                  key={img}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setLightboxImg(i)}
                  style={{
                    aspectRatio: i % 7 === 0 ? '16/9' : '4/3',
                    gridColumn: i % 7 === 0 ? 'span 2' : 'span 1',
                    overflow: 'hidden', cursor: 'pointer', borderRadius: '3px',
                    background: '#eee',
                  }}
                >
                  <img
                    src={img} alt="" loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Hersteller-Logos */}
      <div style={{ background: 'var(--gray-light)', padding: '3rem 0', borderTop: '1px solid #e8e8e8' }}>
        <div className="container">
          <p style={{ textAlign: 'center', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: '2rem', fontWeight: 600 }}>
            Unsere Yachthersteller
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
            {brands.map(b => (
              <img
                key={b.name}
                src={b.img}
                alt={b.name}
                loading="lazy"
                title={b.name}
                style={{ height: '36px', objectFit: 'contain', filter: 'grayscale(1) opacity(0.6)', transition: 'filter 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0) opacity(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1) opacity(0.6)')}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg !== null && (
          <Lightbox
            imgs={cat.gallery}
            index={lightboxImg}
            onClose={() => setLightboxImg(null)}
            onPrev={() => setLightboxImg(i => (i! - 1 + cat.gallery.length) % cat.gallery.length)}
            onNext={() => setLightboxImg(i => (i! + 1) % cat.gallery.length)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          #yachten .container > div[style*="grid-template-columns: 1fr 340px"] { grid-template-columns: 1fr !important; }
          #yachten .container > div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          #yachten .container > div[style*="repeat(4, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
