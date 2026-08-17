import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { sendForm } from '../lib/sendForm'
import RecaptchaHinweis from '../components/RecaptchaHinweis'

// Inhalte 1:1 von yacht-urlaub.net/sailaway
const fakten = [
  {
    title: 'Die Unterkunft',
    items: [
      'Moderne Segelyacht mit 3-5 Kabinen (je nach Gruppengröße)',
      '3-4 Badezimmer/WC mit Duschen',
      'Badeplattform',
      'Chillzone an Deck',
      'USB-Lademöglichkeiten an Bord',
      'WIFI-WLAN',
      'Bluetooth für die bootseigene Soundanlage',
    ],
  },
  {
    title: 'Essen und Trinken',
    items: [
      'Eigenversorgung inkl. Start-Food-Package für Frühstück und Lunchsnack an Bord',
      'BBQ an Bord',
      'Start-Package an alkoholischen Getränken eurer Wahl',
      'Start-Package an anti-alkoholischen Getränken',
    ],
  },
  {
    title: 'Party',
    items: [
      'VIP-Eintritte - Kein Anstehen bei unseren Partner-Clubs',
      'Welcome Drinks inklusive!',
      'Party an Bord in unseren Ankernächten in den Buchten',
    ],
  },
  {
    title: 'Aktivitäten',
    items: [
      'Jeden Tag eine andere Stadt, Bucht oder Insel',
      'Schnorcheln, Tauchen, Klippenspringen, SUP fahren',
      'Stadtbesichtigungen und Rundgänge',
      'Dinghy-Contest, Fenderreiten',
      'Wassersport (Wakeboarding, Wasserski, ...)',
    ],
  },
]

const imPreis = [
  'Unterbringung auf der Yacht',
  'Professioneller deutschsprachiger Skipper',
  'Endreinigung',
  'Videocrew und Fotocrew',
  'VIP-Eintritte in die Clubs',
  'Start-Food Package',
  'Soft-Drink Package',
  'Getränke-Package nach Wahl (Wein oder Bier)',
]
const eigenleistung = [
  'Anreise',
  'Bordkassa ca. €100,- / Person',
  'Verpflegung und Getränke außerhalb der Packages',
  'Kurtaxe €1,35/Tag',
  'evtl. Reiseversicherungen nach Bedarf',
]

const gallery = [
  '/images/sailaway/party1.jpeg', '/images/sailaway/sailing.jpg', '/images/sailaway/party2.jpeg',
  '/images/sailaway/party3.jpeg', '/images/sailaway/party4.jpeg', '/images/sailaway/party5.jpeg',
  '/images/sailaway/segeln.jpg', '/images/sailaway/party6.jpeg', '/images/sailaway/party7.jpeg',
  '/images/sailaway/party8.jpeg', '/images/sailaway/party9.jpeg', '/images/sailaway/party10.jpeg',
  '/images/sailaway/party11.jpeg', '/images/sailaway/party12.jpeg',
]
const yachtImgs = [
  '/images/sailaway/c46-7.jpg', '/images/sailaway/badeplattform.jpg',
  '/images/sailaway/45Cr.jpg', '/images/sailaway/CR50-inside.jpg',
]

export default function SailAwayPage() {
  const [form, setForm] = useState({
    vorname: '', nachname: '', plz: '', ort: '', email: '',
    gruppe: '', getraenke: 'Bier', anmerkungen: '',
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    setFailed(false)
    // Ging frueher an Netlify Forms — dort kam nichts an, weil die Formulare
    // erst zur Laufzeit entstehen. Jetzt ueber dieselbe Function wie das
    // Kontaktformular.
    const ok = await sendForm('sailaway-anfrage', form)
    setSending(false)
    if (ok) setSent(true)
    else setFailed(true)
  }

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff' } as const
  const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="sail away – die Party-Flottille für alle zw. 21 und 35 | Yacht-Urlaub"
        description="7 Tage – du und deine Freunde – auf eurer Yacht. Mit Gleichgesinnten Urlaub und Party in einer Flottille: Kroatien-Route ab Split mit Hvar, Brač und Makarska."
        image="/images/sailaway/header.jpg"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
        <img src="/images/sailaway/header.jpg" alt="sail away Party-Flottille"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700 }}>
            7 Tage – du und deine Freunde – auf eurer Yacht
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', color: '#fff', marginBottom: '1rem', maxWidth: '700px', lineHeight: 1.2 }}>
            sail away – die Party-Flottille für alle zw. 21 und 35
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <a href="#anfrage" className="btn btn-gold">Jetzt anfragen</a>
          </motion.div>
        </div>
      </div>

      {/* Intro */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '1.5rem' }}>
            mit Gleichgesinnten Urlaub und Party in einer Flottille
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Genieße mit deinen Freunden und der Partyflotte von Sail Away deinen individuellen Segeltörn und das Gefühl von grenzenloser Freiheit. Gemeinsam mit eurem persönlichen Skipper erkundet ihr die schönsten Buchten, umgeben von kristallklarem Wasser. Und jeden Abend könnt ihr in einer anderen Stadt in den angesagten Clubs feiern.
          </p>
          <p style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Wir fahren als Flottillie, sprich mehrere Segelyachten und Katamarane die gemeinsam segeln und somit für viel Action und Unterhaltung sorgen. Insgesamt verbringst du 7 Tage auf einer komfortablen Yacht mit deinen Freunden und mit Gleichgesinnten umgeben. Übernachtung an Bord, in euren eigenen Doppelbettkabinen inklusive Badezimmer mit Dusche und WC. Die Yacht besitzt im inneren auch einen Gemeinschaftsbereich, sowie eine Küche mit Kühlschranken, Kaffeemaschine und WIFI an Bord. Die vielen Sitz- und Liegemöglichkeiten an Deck sind eure Chillzones. Freunde von anderen Yachten sind natürlich herzlich willkommen - so macht das Segeln in der Flotte erst richtig Spass!
          </p>
          <p style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Unsere Skipper sorgen dabei für eure Sicherheit an Bord und zeigen euch die schönsten Plätze zum Baden, Sonnen und Entspannen. Du hast Lust auch mit anzupacken? Ohne Probleme kannst du deinem Skipper dabei helfen die Yacht zu navigieren und auch gerne mal das Steuer übernehmen! ;)
          </p>
          <p style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85 }}>
            Jeden Tag erkundet ihr ein anderes Segelrevier und abends könnt ihr euch in den zahlreichen Bars und Clubs entlang der Route die Nächte um die Ohren schlagen. Tagsüber gibt es für euch die verschiedensten Aktivitäten wie Wakeboarden, Wasserskifahren, Volleyball am Strand, Ausflüge mit dem Motor-Bike oder Quad und vieles mehr. Damit euch diese Segelwoche für immer in Erinnerung bleibt, ist eine eigene Video- und Fotocrew mit dabei, um die coolsten Momente festzuhalten.
          </p>
        </div>
      </section>

      {/* Galerie */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          <div className="sa-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {gallery.map(img => (
              <div key={img} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '6px', background: '#eee' }}>
                <img src={img} alt="sail away" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fakten */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '2.5rem', textAlign: 'center' }}>
            Alle Fakten im Überblick
          </h2>
          <div className="sa-facts" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {fakten.map(f => (
              <div key={f.title} style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>{f.title}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {f.items.map(item => (
                    <li key={item} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#444', fontSize: '0.84rem', lineHeight: 1.55 }}>
                      <span style={{ color: 'var(--blue)', flexShrink: 0 }}>✔</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section className="section" style={{ background: 'var(--navy)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#fff', marginBottom: '0.5rem', textAlign: 'center' }}>
            Leistungen
          </h2>
          <p style={{ color: 'var(--gold)', fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: '2.5rem', fontFamily: 'DM Sans, sans-serif' }}>
            Preis: € 690,- / Person <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 400 }}>· Termine auf Anfrage</span>
          </p>
          <div className="sa-leistungen" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', maxWidth: '860px', margin: '0 auto' }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Im Preis enthalten:</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {imPreis.map(i => (
                  <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'rgba(255,255,255,0.85)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                    <span style={{ color: 'var(--gold)', flexShrink: 0 }}>✔</span> {i}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.75rem' }}>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>Eigenleistung:</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {eigenleistung.map(i => (
                  <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'rgba(255,255,255,0.85)', fontSize: '0.86rem', lineHeight: 1.55 }}>
                    <span style={{ color: 'rgba(255,255,255,0.4)', flexShrink: 0 }}>•</span> {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Eure Yacht */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '2rem', textAlign: 'center' }}>
            Eure Yacht
          </h2>
          <div className="sa-yacht" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            {yachtImgs.map(img => (
              <div key={img} style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.1)' }}>
                <img src={img} alt="Eure Yacht" loading="lazy" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Route */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '1rem' }}>
            Die Route
          </h2>
          <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--blue)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Die Kroatien-Route
          </h3>
          <p style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85 }}>
            Unsere Tour startet im Raum Split (Anreise per Auto, Bus, Zug (Nightjet) oder Flugzeug möglich) und führt zu der berühmten Partyinsel Hvar - das "Ibiza Kroatiens", vorbei an dem spektakulären Strand auf Brac und nach Makarska, wo die Cave Bar "Deep" auf Dich und deine Freunde wartet. Während unserer Route machen wir immer wieder Halt in schönen Badebuchten und zeigen euch die schönsten Schwimm- und Schnorchelspots.
          </p>
        </div>
      </section>

      {/* Buchungsanfrage */}
      <section id="anfrage" className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--navy)', marginBottom: '2rem', fontWeight: 700 }}>
            Buchungsanfrage senden
          </h2>

          {sent ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', marginBottom: '0.5rem' }}>Vielen Dank!</h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>Deine Anfrage wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Vorname *</label>
                  <input required name="vorname" value={form.vorname} onChange={e => set('vorname', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Nachname *</label>
                  <input required name="nachname" value={form.nachname} onChange={e => set('nachname', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>PLZ *</label>
                  <input required name="plz" value={form.plz} onChange={e => set('plz', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Ort *</label>
                  <input required name="ort" value={form.ort} onChange={e => set('ort', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>E-Mail *</label>
                <input required type="email" name="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Gruppengröße *</label>
                  <select required name="gruppe" value={form.gruppe} onChange={e => set('gruppe', e.target.value)} style={inputStyle}>
                    <option value="">Wieviele Personen sind in deiner Gruppe?</option>
                    {['1 Person', '2 Personen', '3 Personen', '4 Personen', '5 Personen', '6 Personen', '7 Personen', '8 Personen', 'mehr (siehe Anmerkungen)'].map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Getränke-Package</label>
                  <select name="getraenke" value={form.getraenke} onChange={e => set('getraenke', e.target.value)} style={inputStyle}>
                    <option value="Bier">Bier</option>
                    <option value="Wein">Wein</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Anmerkungen</label>
                <textarea name="anmerkungen" rows={4} value={form.anmerkungen} onChange={e => set('anmerkungen', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              {failed && (
                <p style={{ fontSize: '0.82rem', color: '#e53e3e', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@yacht-urlaub.net.
                </p>
              )}
              <button type="submit" disabled={sending} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '14px 40px', opacity: sending ? 0.6 : 1 }}>
                {sending ? 'wird gesendet …' : 'Anfrage senden'}
              </button>
              <RecaptchaHinweis align="center" />
            </form>
          )}

          <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--gray)', fontSize: '0.9rem' }}>
            <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.4rem' }}>Kontaktiere uns:</p>
            <p><a href="tel:+43199715820" style={{ color: 'var(--blue)', fontWeight: 600 }}>+43 1 997 15 82</a> · Instagram: <a href="https://www.instagram.com/sailaway.crew" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600 }}>sailaway.crew</a></p>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1000px) { .sa-facts { grid-template-columns: 1fr 1fr !important; } .sa-yacht { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 640px) {
          .sa-facts, .sa-yacht, .sa-leistungen { grid-template-columns: 1fr !important; }
          .sa-gallery { grid-template-columns: 1fr 1fr !important; }
          #anfrage form > div[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
