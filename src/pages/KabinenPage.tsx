import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useLang, MAIL } from '../i18n'
import { sendForm } from '../lib/sendForm'
import { SparklesIcon, WhatsAppIcon } from '../components/Icons'
import RecaptchaHinweis from '../components/RecaptchaHinweis'

// Angebote 1:1 von der Originalseite (yacht-urlaub.net/kabinenangebote)
// Aktuell keine gültigen Angebote — Karten bleiben im Code erhalten (Design/Struktur),
// werden aber ausgeblendet, bis wieder aktuelle Termine feststehen.
const SHOW_OFFERS = false

const angebote = [
  {
    id: 'kornaten-juni',
    title: 'Segelurlaub in die Kornaten',
    reiseOption: '06.06. - 13.06.2026 ab Zadar',
    abfahrt: 'Zadar',
    datum: '06.06. – 13.06.2026',
    preis: '€ 720,–',
    preisNote: 'pro Person, in der Doppelkabine (Einzelnutzung +50 %)',
    plaetze: '4 Plätze noch übrig!',
    plaetzeColor: '#16a34a',
    bord: false,
    desc: 'Erlebe eine unvergessliche Woche auf einer gemütlichen Einrumpf-Segelyacht! Perfekt für Meeresliebhaber.',
    img: '/images/packages/Kornaten/gallery/Telascica.webp',
  },
  {
    id: 'kornaten-august',
    title: 'Segelurlaub in die Kornaten',
    reiseOption: '22.08. - 29.08.2026 ab Zadar',
    abfahrt: 'Zadar',
    datum: '22.08. – 29.08.2026',
    preis: '€ 1.210,–',
    preisNote: 'pro Person, in der Doppelkabine (Einzelnutzung +50 %)',
    plaetze: 'Nur noch 2 Plätze übrig!',
    plaetzeColor: '#dc2626',
    bord: true,
    desc: 'Erlebe eine unvergessliche Woche auf einer gemütlichen Einrumpf-Segelyacht! Perfekt für Meeresliebhaber. Inklusive: Bord-Service (Frühstück, Mittagssnack).',
    img: '/images/packages/Kornaten/gallery/Mono Kornaten.webp',
  },
]

const reiseOptionen = [
  'Kornaten (Kroatien) – Termin auf Anfrage',
  'Sonstiges Revier / individueller Wunsch',
]

const kl = {
  de: { tag: 'Für Alleinreisende & kleine Gruppen', h1: 'Kabinen Angebote',
    sub: 'Buchen Sie eine einzelne Kabine auf einer Gemeinschaftsyacht — und teilen Sie sich die Yacht mit einer netten Crew.',
    current: 'Aktuelle Termine', avail: 'Verfügbare Kabinen-Angebote', dep: 'Abfahrt', book: 'JETZT BUCHEN →',
    formH: 'Buchungsformular', choose: 'Wählen Sie Ihre Reise *', pax: 'Personen *', contact: 'Kontaktdaten',
    vn: 'Vorname *', nn: 'Nachname *', adr: 'Adresse *', plz: 'PLZ *', ort: 'Ort *',
    tel: 'Telefon/Handy *', telHint: '(+43, +49, ..)', mail: 'E-Mail *', notes: 'Anmerkungen',
    pay: 'Zahlungsart *', trans: 'Überweisung', cc: 'Kreditkarte',
    bind: 'gelesen und buche verbindlich zu oben angegebenen Wunschdaten!', agb: 'AGB', agbPre: 'Ich habe die',
    ask: 'Ich frage nur an und benötige mehr Infos', send: 'Senden', sending: 'wird gesendet …',
    thanks: 'Vielen Dank!', interest: 'Interesse an einem Kabinentörn?',
    interestSub: 'Fragen Sie uns einfach — wir finden das passende Angebot für Sie.', start: 'Anfrage starten →',
    wahl: 'Bitte wählen …',
    noOffers: 'Gerade keine offenen Kabinenplätze',
    noOffersText: 'Unsere Kabinentörns sind derzeit ausgebucht bzw. es stehen noch keine neuen Termine fest. Werfen Sie in der Zwischenzeit gerne einen Blick auf unsere Packages — dort finden Sie garantiert die passende Segelreise für sich, buchbar für Ihre eigene Crew oder Freunde!',
    noOffersCta: 'Zu unseren Packages →', packagesHref: '/buchen',
    thaiTitle: 'Community-Törn Thailand (Februar \'27)',
    thaiText: 'Kein fixes Package, sondern ein informeller Segeltörn unter Gleichgesinnten — organisiert über eine WhatsApp-Gruppe. Schreiben Sie uns kurz, dann schicken wir Ihnen den Einladungslink.',
    thaiCta: 'Auf WhatsApp schreiben',
    thaiMsg: "Hallo! Ich interessiere mich für den Community-Törn Thailand im Februar '27 und würde gerne der WhatsApp-Gruppe beitreten." },
  en: { tag: 'For solo travellers & small groups', h1: 'Cabin offers',
    sub: 'Book a single cabin on a shared yacht — and share the yacht with a lovely crew.',
    current: 'Current dates', avail: 'Available cabin offers', dep: 'Departure', book: 'BOOK NOW →',
    formH: 'Booking form', choose: 'Choose date *', pax: 'Pax *', contact: 'Contact details',
    vn: 'First name *', nn: 'Last name *', adr: 'Address *', plz: 'Postal code *', ort: 'City *',
    tel: 'Phone/mobile *', telHint: '(+43, +49, ..)', mail: 'Email *', notes: 'Notes',
    pay: 'Payment method *', trans: 'Bank transfer', cc: 'Credit card',
    bind: 'and book bindingly for the requested dates above!', agb: 'terms & conditions', agbPre: 'I have read the',
    ask: 'I am only inquiring and need more information', send: 'Send', sending: 'sending …',
    thanks: 'Thank you!', interest: 'Interested in a cabin cruise?',
    interestSub: 'Just ask us — we will find the right offer for you.', start: 'Get a quote →',
    wahl: 'Please choose …',
    noOffers: 'No open cabin spots right now',
    noOffersText: "Our cabin cruises are fully booked at the moment, or new dates haven't been set yet. In the meantime, take a look at our packages — you're sure to find the right sailing trip, bookable for your own crew or a group of friends!",
    noOffersCta: 'Browse our packages →', packagesHref: '/en/book-now',
    thaiTitle: 'Community Trip Thailand (February \'27)',
    thaiText: "Not a fixed package, but an informal sailing trip among like-minded sailors — organised through a WhatsApp group. Drop us a quick message and we'll send you the invite link.",
    thaiCta: 'Message us on WhatsApp',
    thaiMsg: "Hi! I'm interested in the Thailand community trip in February '27 and would love to join the WhatsApp group." },
}

const angeboteEn = [
  {
    id: 'kornaten-august',
    title: 'Sailing Holiday to the Kornati Islands',
    reiseOption: '22.08. - 29.08.2026 from Zadar',
    abfahrt: 'Zadar',
    datum: '22.08. – 29.08.2026',
    preis: '€ 1,210.–',
    preisNote: 'per person, in a double cabin (single use +50 %)',
    plaetze: 'Only 2 spots left!',
    plaetzeColor: '#dc2626',
    bord: true,
    desc: 'Experience an unforgettable week on a sporty monohull sailing yacht! Perfect for ocean lovers. Included: On-board service (breakfast, lunch snack).',
    img: '/images/packages/Kornaten/gallery/Mono Kornaten.webp',
  },
]
const reiseOptionenEn = [
  'Kornati Islands (Croatia) – date on request',
  'Other region / custom request',
]

export default function KabinenPage() {
  const lang = useLang()
  const s = kl[lang]
  const list = lang === 'en' ? angeboteEn : angebote
  const optionen = lang === 'en' ? reiseOptionenEn : reiseOptionen
  const [form, setForm] = useState({
    reise: '', personen: '1',
    vorname: '', nachname: '', adresse: '', plz: '', ort: '',
    telefon: '', email: '', anmerkungen: '',
    zahlungsart: 'Überweisung', modus: 'buchen',
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
    const ok = await sendForm('kabinen-buchung', form)
    setSending(false)
    if (ok) setSent(true)
    else setFailed(true)
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '4px',
    border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff',
  } as const
  const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? "Cabin offers – book a single cabin | Yacht-Holiday" : "Kabinen-Angebote – Einzelne Kabine buchen"}
        description="Buchen Sie eine einzelne Kabine auf einer Gemeinschaftsyacht. Aktuelle Kabinen-Angebote für Kroatien (Kornaten) und Thailand. Ideal für Alleinreisende und Paare."
        image="/images/packages/Kornaten/gallery/Telascica.webp"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="/images/packages/Kornaten/gallery/Telascica.webp" alt="Kabinen-Angebote"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/katamaran.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {s.tag}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem', fontWeight: 700 }}>
            {s.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.8 }}>
            {s.sub}
          </motion.p>
        </div>
      </div>

      {/* Angebote */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          {SHOW_OFFERS && (
          <>
            <p style={{ color: 'var(--blue)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', textAlign: 'center' }}>
              {s.current}
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: 'var(--navy)', marginBottom: '3rem', textAlign: 'center', fontWeight: 700 }}>
              {s.avail}
            </h2>
          </>
          )}

          {!SHOW_OFFERS && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '620px', margin: '0 auto', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2.75rem 2.25rem', textAlign: 'center' }}
            >
              <SparklesIcon size={26} style={{ color: 'var(--gold)', marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                {s.noOffers}
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
                {s.noOffersText}
              </p>
              <a href={s.packagesHref} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '12px 26px' }}>
                {s.noOffersCta}
              </a>
            </motion.div>
          )}

          {!SHOW_OFFERS && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ maxWidth: '620px', margin: '1.5rem auto 0', background: '#e9fbf1', border: '1px solid #bdf0d6', borderRadius: '8px', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}
            >
              <WhatsAppIcon size={30} />
              <div style={{ flex: 1, minWidth: '220px' }}>
                <h4 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '0.98rem', fontWeight: 700, marginBottom: '0.3rem' }}>
                  {s.thaiTitle}
                </h4>
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.6 }}>
                  {s.thaiText}
                </p>
              </div>
              <a
                href={`https://wa.me/436602652481?text=${encodeURIComponent(s.thaiMsg)}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, padding: '10px 18px', whiteSpace: 'nowrap', borderRadius: '4px', background: '#25d366', color: '#fff', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}
              >
                {s.thaiCta}
              </a>
            </motion.div>
          )}

          {SHOW_OFFERS && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            {list.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img src={a.img} alt={a.title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/katamaran.jpg' }} />
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--navy)', color: '#fff', padding: '6px 14px', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                    {a.datum}
                  </div>
                  {a.bord && (
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: 'var(--gold)', color: 'var(--navy)', padding: '5px 12px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      <SparklesIcon size={11} style={{ verticalAlign: '-1px', marginRight: '4px' }} />Mit Bord-Service
                    </div>
                  )}
                </div>

                <div style={{ padding: '1.75rem' }}>
                  <p style={{ color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {s.dep}: {a.abfahrt}
                  </p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.2rem', marginBottom: '0.75rem', fontWeight: 700 }}>{a.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{a.desc}</p>

                  {/* Price + Availability */}
                  <div style={{ borderTop: '1px solid var(--gray-mid)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                      <p style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.1 }}>{a.preis}</p>
                      <p style={{ fontSize: '0.72rem', color: 'var(--gray)', marginTop: '4px' }}>{a.preisNote}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '0.78rem', fontWeight: 700, color: a.plaetzeColor, marginBottom: '0.5rem' }}>{a.plaetze}</p>
                      <a href="#buchungsformular" className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '10px 20px' }}
                        onClick={() => set('reise', a.reiseOption)}>
                        {s.book}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Buchungsformular (wie auf der Originalseite) */}
      <section id="buchungsformular" style={{ background: '#fff', padding: '4.5rem 0' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', color: 'var(--navy)', marginBottom: '2rem', fontWeight: 700 }}>
            {s.formH}
          </h2>

          {sent ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', marginBottom: '0.5rem' }}>{s.thanks}</h3>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>
                Ihre {form.modus === 'buchen' ? 'Buchung' : 'Anfrage'} wurde erfolgreich übermittelt. Wir melden uns schnellstmöglich bei Ihnen.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Reise + Personen */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>{s.choose}</label>
                  <select required name="reise" value={form.reise} onChange={e => set('reise', e.target.value)} style={inputStyle}>
                    <option value="">{s.wahl}</option>
                    {optionen.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{s.pax}</label>
                  <select required name="personen" value={form.personen} onChange={e => set('personen', e.target.value)} style={inputStyle}>
                    {['1', '2', '3', '4'].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, margin: '1.5rem 0 1rem' }}>{s.contact}</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>{s.vn}</label>
                  <input required name="vorname" value={form.vorname} onChange={e => set('vorname', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{s.nn}</label>
                  <input required name="nachname" value={form.nachname} onChange={e => set('nachname', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{s.adr}</label>
                <input required name="adresse" value={form.adresse} onChange={e => set('adresse', e.target.value)} style={inputStyle} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>{s.plz}</label>
                  <input required name="plz" value={form.plz} onChange={e => set('plz', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{s.ort}</label>
                  <input required name="ort" value={form.ort} onChange={e => set('ort', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>{s.tel} <span style={{ fontWeight: 400, color: 'var(--gray)' }}>{s.telHint}</span></label>
                  <input required type="tel" name="telefon" value={form.telefon} onChange={e => set('telefon', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{s.mail}</label>
                  <input required type="email" name="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>{s.notes}</label>
                <textarea name="anmerkungen" rows={4} value={form.anmerkungen} onChange={e => set('anmerkungen', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={labelStyle}>{s.pay}</label>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  {[s.trans, s.cc].map(z => (
                    <label key={z} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.9rem', color: '#444', cursor: 'pointer' }}>
                      <input type="radio" name="zahlungsart" value={z} checked={form.zahlungsart === z} onChange={e => set('zahlungsart', e.target.value)} />
                      {z}
                    </label>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.87rem', color: '#444', cursor: 'pointer', lineHeight: 1.5 }}>
                  <input type="radio" name="modus" value="buchen" checked={form.modus === 'buchen'} onChange={e => set('modus', e.target.value)} style={{ marginTop: '3px' }} />
                  <span>{s.agbPre} <a href={lang === 'en' ? '/en/terms' : '/agb'} style={{ color: 'var(--blue)', fontWeight: 600 }}>{s.agb}</a> {s.bind}</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.55rem', fontSize: '0.87rem', color: '#444', cursor: 'pointer', lineHeight: 1.5 }}>
                  <input type="radio" name="modus" value="anfrage" checked={form.modus === 'anfrage'} onChange={e => set('modus', e.target.value)} style={{ marginTop: '3px' }} />
                  <span>{s.ask}</span>
                </label>
              </div>

              {failed && (

                <p style={{ fontSize: '0.82rem', color: '#e53e3e', marginBottom: '0.75rem', lineHeight: 1.5 }}>

                  {lang === 'en'

                    ? `Your request could not be sent. Please try again or email us at ${MAIL.en}.`

                    : 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@yacht-urlaub.net.'}

                </p>

              )}

              <button type="submit" disabled={sending} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '14px 40px', opacity: sending ? 0.6 : 1 }}>
                {sending ? s.sending : s.send}
              </button>
              <RecaptchaHinweis align="center" />
            </form>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem', fontWeight: 700 }}>
              {s.interest}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              {s.interestSub}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-outline">+43 1 997 15 82</a>
              <a href="#buchungsformular" className="btn btn-primary">{s.start}</a>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          #buchungsformular form > div[style*="grid"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
