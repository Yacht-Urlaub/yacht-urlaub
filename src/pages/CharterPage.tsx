import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import { Link } from '../router'
import SEO from '../components/SEO'
import { useLang } from '../i18n'
import { AlertIcon } from '../components/Icons'

// Inhalte 1:1 von yacht-urlaub.net/charter/yacht-charter-anfragen

const warumEn = [
  { title: 'Quality you can rely on', text: "With our on-site experience, we have an in-depth knowledge of which fleets and charter bases truly offer quality. In case of any issues on-site, our long-standing connections enable us to quickly and effortlessly reach the right people. We're not just familiar with fleet operators and their booking departments at headquarters but also personally acquainted with many base managers and yacht coordinators at the location where you, as our customers, will be in contact." },
  { title: 'Tips for a stress-free arrival', text: "The vacation begins even before you arrive. We understand how a charter base operates and how the starting marinas are set up. We're often on the move and frequently visit these locations. What's the local scene like? How does provisioning work? Where can you park? We can provide great insights, offer optimal travel planning recommendations, saving you valuable time. Knowledge about on-site parking conditions or affordable transfers is the special service at Yacht-Holiday." },
  { title: 'Individual advice and best offers', text: "We tailor our services to your desires and search through the array of yachts to find the best offer for you. Of course, we also maintain a blacklist - we don't offer poorly managed charter bases with subpar yachts or service. However, should something go wrong, we're your point of contact!" },
  { title: 'Our passion for yachting – your advantage', text: "We're also happy to provide advice on destinations and routes and offer tips for your voyage - worldwide! Because yachting is not just our profession but also our passion." },
]

const warum = [
  { title: 'Qualität, auf die Sie sich verlassen können', text: 'Dank unserer langjährigen Erfahrung wissen wir genau, welche Flotten und Charter-Basen wirklich überzeugen. Sollten vor Ort Unstimmigkeiten auftreten, greifen wir auf unser breites Netzwerk zurück und lösen Probleme schnell und unkompliziert. Wir kennen die Flottenbetreiber, ihre Buchungsverantwortlichen und sogar die Basisleiter oft persönlich – genau die Menschen, mit denen Sie vor Ort in Kontakt treten.' },
  { title: 'Tipps für eine stressfreie Anreise', text: 'Ihr Urlaub beginnt schon vor der Reise. Wir kennen die Marinas, ihre Umgebung und wissen, wie Charter-Basen funktionieren. Ob Einkaufsmöglichkeiten, Parkplätze oder Transfers – wir geben Ihnen wertvolle Tipps, damit Sie entspannt starten können.' },
  { title: 'Individuelle Beratung und beste Angebote', text: 'Wir hören auf Ihre Wünsche und finden die passende Yacht für Sie – inklusive Planungshilfen für Reviere und Routen. Unser Qualitätsversprechen: Anbieter mit schlechtem Service oder schlechten Yachten kommen für uns nicht in Frage! Sollte dennoch etwas schiefgehen, stehen wir an Ihrer Seite.' },
  { title: 'Unsere Leidenschaft für Yachting – Ihr Vorteil', text: 'Yachting ist nicht nur unser Beruf, sondern unsere Passion. Profitieren Sie von unserer Expertise und lassen Sie uns Ihren perfekten Törn gestalten – weltweit!' },
]

const yachtBilder = [
  { src: '/images/charter/bavaria46-vision.jpg', caption: 'Einrumpfer/Monohull Segelyacht' },
  { src: '/images/charter/Saba-50-Katamaran.jpg', caption: 'Katamaran' },
  { src: '/images/charter/Motor-Katamaran.jpg', caption: 'Motor-Katamaran' },
]

const partnerLogos = [
  '/images/charter/partner/pitter.png', '/images/charter/partner/partner1.jpg',
  '/images/charter/partner/partner2.jpg', '/images/charter/partner/partner3.png',
  '/images/charter/partner/angelina.png', '/images/charter/partner/istion.jpg',
  '/images/charter/partner/dream.png', '/images/charter/partner/navigare.png',
]

const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' } as const
const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

const cl = {
  de: {
    h1: 'Yacht-Charter', sub: 'Sie wollen eine Yacht chartern? Gerne nehmen wir Ihre Anfrage für Yacht-Charter (nur Yacht ohne Skipper/Bord-Service) entgegen!',
    warn: 'Wichtiger Hinweis für Charter-Kunden: Warum Preisvergleiche oft täuschen –', warnLink: 'hier unbedingt nachlesen »',
    start: 'Anfrage starten', typ: 'Yacht-Typ *', kab: 'Anzahl Kabinen *', revier: 'Revier / Wunschhäfen *',
    revierPh: '(z.B. Dalmatien / Split / ACI Split) Mehrfachnennungen möglich!', alter: 'Alter der Yacht *',
    sd: 'Startdatum (Check-In Tag)', ed: 'Enddatum (Check-Out Tag)', kontakt: 'Kontaktdaten',
    name: 'Vor- und Nachname *', tel: 'Telefonnummer für Rückfragen *', notes: 'Anmerkungen/Wünsche',
    notesPh: 'Länge/Ausstattung/sonstiges Wissenswertes', send: 'Anfrage senden', sending: 'wird gesendet …',
    thanks: 'Vielen Dank!', thanksSub: 'Ihre Charter-Anfrage wurde übermittelt. Wir melden uns schnellstmöglich!',
    sidebar: 'Ihre Charter-Anfrage – einfach und persönlich!', sidebarSub: 'Schreiben Sie uns direkt an:',
    why: 'Warum bei uns chartern?', partner: 'Eine Auswahl unserer Partner', more: 'und viele mehr....',
    now: 'Jetzt Anfragen:', wahl: 'Bitte wählen …', faq: '/faq',
    typen: ['Einrumpf-Segler', 'Katamaran', 'Motoryacht', 'Katamaran-Motoryacht', 'Trabakul'],
    kabinen: ['1 Kabine', '2 Kabinen', '3 Kabinen', '4 Kabinen', '5 Kabinen', '6 Kabinen'],
    altersStufen: ['0-2 Jahre', '3-5 Jahre', '5-8 Jahre', 'älter', 'egal'],
  },
  en: {
    h1: 'Yacht Charter', sub: "Do you plan to charter a yacht? Give us a call! We can chat about what you're looking for and help you find the perfect yacht and deals.",
    warn: 'Important note for charter customers: Why price comparisons can be misleading –', warnLink: 'make sure to read this »',
    start: 'Get a quote', typ: 'Yacht type *', kab: 'Number of cabins *', revier: 'Region you want to travel *',
    revierPh: '(e.g. Dalmatia / Split / ACI Split) Multiple entries possible!', alter: 'Age of the yacht *',
    sd: 'Start date (check-in day)', ed: 'End date (check-out day)', kontakt: 'Contact details',
    name: 'First and last name *', tel: 'Telephone number *', notes: 'Notes',
    notesPh: 'Length/equipment/other useful information', send: 'Send request', sending: 'sending …',
    thanks: 'Thank you!', thanksSub: 'Your charter request has been sent. We will get back to you as soon as possible!',
    sidebar: 'Your charter request – simple and personal!', sidebarSub: 'Write to us directly:',
    why: 'Why choose us for your charter?', partner: 'A selection of our partners', more: 'and many more....',
    now: 'Get a quote now:', wahl: 'Please choose …', faq: '/en/faq',
    typen: ['Monohull', 'Catamaran', 'Motoryacht', 'Motor catamaran', 'Trabakul'],
    kabinen: ['1 cabin', '2 cabins', '3 cabins', '4 cabins', '5 cabins', '6 cabins'],
    altersStufen: ['0-2 years', '3-5 years', '5-8 years', 'older', 'not important'],
  },
}

export default function CharterPage() {
  const lang = useLang()
  const s = cl[lang]
  const [form, setForm] = useState({
    yachtTyp: '', kabinen: '', revier: '', alter: '', start: '', ende: '',
    name: '', email: '', telefon: '', anmerkungen: '',
  })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    const body = new URLSearchParams({ 'form-name': 'charter-anfrage', ...form })
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      setSent(true)
    } finally { setSending(false) }
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? "Yacht charter – bareboat charter worldwide | Yacht-Holiday" : "Yacht-Charter anfragen – Bareboat-Charter weltweit | Yacht-Urlaub"}
        description="Sie wollen eine Yacht chartern? Gerne nehmen wir Ihre Anfrage für Yacht-Charter (nur Yacht ohne Skipper/Bord-Service) entgegen – weltweit, persönlich und mit Qualitätsversprechen."
        image="/images/charter/header.png"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="/images/charter/header.png" alt="Yacht-Charter" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '0.75rem' }}>
            {s.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.8 }}>
            {s.sub}
          </motion.p>
        </div>
      </div>

      {/* Hinweis */}
      <section style={{ background: '#fff8e6', borderBottom: '1px solid #f0e0b0', padding: '1rem 0' }}>
        <div className="container">
          <p style={{ color: '#7a5c00', fontSize: '0.88rem' }}>
            <AlertIcon size={15} style={{ verticalAlign: '-3px', marginRight: '6px' }} />{s.warn} <Link to={s.faq} style={{ color: 'var(--blue)', fontWeight: 700 }}>{s.warnLink}</Link>
          </p>
        </div>
      </section>

      {/* Formular + Sidebar */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          <div className="charter-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '3rem' }}>
            <div>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>{s.start}</h2>
              {sent ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
                  <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', marginBottom: '0.5rem' }}>{s.thanks}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>{s.thanksSub}</p>
                </div>
              ) : (
                <form name="charter-anfrage" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}
                  style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
                  <input type="hidden" name="form-name" value="charter-anfrage" />
                  <p style={{ display: 'none' }}><input name="bot-field" /></p>

                  <div className="charter-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>{s.typ}</label>
                      <select required name="yachtTyp" value={form.yachtTyp} onChange={e => set('yachtTyp', e.target.value)} style={inputStyle}>
                        <option value="">{s.wahl}</option>
                        {s.typen.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{s.kab}</label>
                      <select required name="kabinen" value={form.kabinen} onChange={e => set('kabinen', e.target.value)} style={inputStyle}>
                        <option value="">{s.wahl}</option>
                        {s.kabinen.map(k => <option key={k} value={k}>{k}</option>)}
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>{s.revier}</label>
                    <input required name="revier" value={form.revier} onChange={e => set('revier', e.target.value)}
                      placeholder={s.revierPh} style={inputStyle} />
                  </div>

                  <div className="charter-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>{s.alter}</label>
                      <select required name="alter" value={form.alter} onChange={e => set('alter', e.target.value)} style={inputStyle}>
                        <option value="">{s.wahl}</option>
                        {s.altersStufen.map(a => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{s.sd}</label>
                      <input type="date" name="start" value={form.start} onChange={e => set('start', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{s.ed}</label>
                      <input type="date" name="ende" value={form.ende} onChange={e => set('ende', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, margin: '1.5rem 0 1rem' }}>{s.kontakt}</h3>

                  <div className="charter-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>{s.name}</label>
                      <input required name="name" value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>E-Mail *</label>
                      <input required type="email" name="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>{s.tel}</label>
                    <input required type="tel" name="telefon" value={form.telefon} onChange={e => set('telefon', e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>{s.notes}</label>
                    <textarea name="anmerkungen" rows={4} value={form.anmerkungen} onChange={e => set('anmerkungen', e.target.value)}
                      placeholder={s.notesPh} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>

                  <button type="submit" disabled={sending} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '13px 36px', opacity: sending ? 0.6 : 1 }}>
                    {sending ? s.sending : s.send}
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar: Yacht-Bilder + Direktkontakt */}
            <div>
              {yachtBilder.map(b => (
                <figure key={b.src} style={{ marginBottom: '1.25rem' }}>
                  <img src={b.src} alt={b.caption} loading="lazy" style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  <figcaption style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.4rem' }}>{b.caption}</figcaption>
                </figure>
              ))}
              <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '6px', padding: '1.5rem', textAlign: 'center' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', marginBottom: '0.5rem' }}>{s.sidebar}</h3>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>
                  {s.sidebarSub}<br />
                  <a href="mailto:charter@yacht-urlaub.net" style={{ color: 'var(--gold)', fontWeight: 700 }}>charter@yacht-urlaub.net</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warum bei uns chartern */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '2rem' }}>
            {s.why}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {(lang === 'en' ? warumEn : warum).map((w, i) => (
              <div key={w.title}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--blue)', fontSize: '1.02rem', fontWeight: 700, marginBottom: '0.4rem' }}>
                  {i + 1}. {w.title}
                </h3>
                <p style={{ color: '#444', fontSize: '0.93rem', lineHeight: 1.8 }}>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner */}
      <section style={{ background: 'var(--gray-light)', padding: '3.5rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '2rem' }}>
            {s.partner}
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {partnerLogos.map(logo => (
              <img key={logo} src={logo} alt="Charter-Partner" loading="lazy"
                style={{ height: '44px', objectFit: 'contain', filter: 'grayscale(1) opacity(0.6)', transition: 'filter 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0) opacity(1)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1) opacity(0.6)')}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            ))}
          </div>
          <p style={{ color: 'var(--gray)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>{s.more}</p>
          <p style={{ color: '#444', fontSize: '0.95rem' }}>
            {s.now} <a href="mailto:charter@yacht-urlaub.net" style={{ color: 'var(--blue)', fontWeight: 700 }}>charter@yacht-urlaub.net</a>
          </p>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .charter-grid { grid-template-columns: 1fr !important; }
          .charter-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
