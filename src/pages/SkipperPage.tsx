import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useLang } from '../i18n'
import { sendForm } from '../lib/sendForm'

// Inhalte 1:1 von yacht-urlaub.net/charter/skipper-und-bord-service
const skl = {
  de: {
    h1: 'Skipper- und Bord-Service', sub: 'Sie können bei uns auch zu Ihrer bereits bestehenden Yacht einfach Personal zubuchen.',
    offer: 'Wir bieten professionell ausgebildete:', skipper: 'Skipper', board: 'Bordservice',
    qS: 'Was macht der Skipper?', doS: 'Der Skipper wird ...', dontS: 'Der Skipper wird nicht ...',
    qB: 'Was macht das Bordservice?', doB: 'Der Bordservice macht ...', dontB: 'Der Bordservice wird nicht ...',
    staff: 'unser Stamm-Personal »', form: 'Sie suchen Personal für Ihre Yacht? Wir freuen uns auf Ihre Anfrage!',
    name: 'Name *', mail: 'E-Mail *', tel: 'Telefonnummer', msg: 'Nachricht *', send: 'Senden', sending: 'wird gesendet …',
    thanks: 'Vielen Dank! Ihre Anfrage wurde übermittelt — wir melden uns schnellstmöglich.', crewHref: '/crew',
  },
  en: {
    h1: 'Crew-Charter', sub: 'With us you can simply book staff for your existing yacht.',
    offer: 'We offer professionally trained:', skipper: 'Skipper', board: 'Boardservice',
    qS: 'What does the skipper do?', doS: 'The skipper will ...', dontS: 'The skipper will not ...',
    qB: 'What does the boardservice do?', doB: 'The boardservice will ...', dontB: 'The boardservice will not ...',
    staff: 'our crew »', form: 'You want to charter a crew? We are looking forward to your inquiry!',
    name: 'Name *', mail: 'Email *', tel: 'Telephone number', msg: 'Message *', send: 'Send', sending: 'sending …',
    thanks: 'Thank you! Your inquiry has been sent — we will get back to you shortly.', crewHref: '/en/contact/crew',
  },
}

const personalEn = [
  'Skipper',
  'Board service (cook, hostess, ...)',
  'Yoga instructors',
  'Kite instructors',
  'Moderators for your team and business events',
]
const skipperWirdEn = [
  'navigate the yacht on the route from A to B',
  'give knowledgeable information about the area',
  'clean the outside of the yacht',
  'help find restaurants',
  'help book activities on land',
  'sleep on board (in his own cabin)',
]
const skipperWirdNichtEn = [
  'clean the inside of the yacht',
  'watch over the kids',
  'prepare any meals',
  'buy groceries',
]
const serviceMachtEn = [
  'buy groceries',
  'give recommendations and book restaurants',
  'prepare breakfast, lunch and dinner',
  'wash the dishes and clean the common rooms',
  'sleep on board in a cabin',
]
const serviceMachtNichtEn = [
  'tidy up the cabins',
  'take over navigating the yacht',
  'watch over the kids',
  'clean the outside of the yacht',
]
const skipperTextEn = [
  'Our professionally trained skippers will handle everything around navigating the yacht. Of course, joining in on sailing is gladly seen, but not a must! So you can participate in the sailing experience and get started, or just sit back and enjoy the journey of discovery.',
  "For us it is important to make the adventure of a sailing holiday accessible for everyone, that's why we provide you with expert skippers who will take over navigating the yacht for you.",
  'The route for your sailing holiday and also the activities on-shore are totally up to you. But if you require any help, before your departure you will be put in contact with your skipper, so he can answer all of your questions and help you plan your individual yacht-holiday. The skippers will provide you with first-hand knowledge so you can get the most out of your holidays.',
]
const boardTextEn = [
  'Just lean back and enjoy your yacht-holiday – because the boardservice will take care of the cleaning and cooking. The boardservice will not only cook for you, but also do the grocery shopping so that you can start your journey without any worries.',
  'The skipper will manage the navigating of the yacht and in the meanwhile the boardservice will go shopping, cook and clean the common rooms. So you can just lean back and enjoy your individual and personal yacht-holiday at its most.',
  'The boardservice will prepare and serve beautifully presented local delicacies. Also the boardservice will prepare the meals according to your personal preferences and dietary needs. So if you are gluten-free, vegetarian or vegan? No problem. Just tell the boardservice beforehand, so they can plan the meals for you and buy wines and mix cocktails, which harmonize perfectly with the home-cooked meals.',
]

const personal = [
  'Skipper / Yacht-Captains',
  'Bord-Service (Koch, Hostess, ...)',
  'Yoga-Instruktoren',
  'Kite-Instruktoren',
  'Nanny/Kinderbetreuung an Bord',
  'Moderatoren für Ihre Team- und Business-Events',
]

const skipperWird = [
  'entlang der Route die Yacht von A nach B sicher navigieren.',
  'über die lokale Umgebung Wissenswertes bereithalten.',
  'dabei helfen Restaurants und Aktivitäten zu buchen.',
  'die Außenseite der Yacht reinigen.',
  'an Bord schlafen (in einer eigenen Kabine).',
]
const skipperWirdNicht = [
  'den Innenraum der Yacht reinigen',
  'kochen',
  'Lebensmittel einkaufen',
  'auf die Kinder aufpassen',
  'unnötige Risiken eingehen',
]
const serviceMacht = [
  'den Lebensmittel-Einkauf',
  'das Frühstück und den Mittagssnack, sowie das Abendessen nach Absprache',
  'das Geschirrspülen und wird die Küche aufräumen',
  'Empfehlungen und erledigt Restaurantbuchungen',
  '... und benötigt einen Schlafplatz an Bord',
]
const serviceMachtNicht = [
  'die Kabinen säubern',
  'das Navigieren der Yacht übernehmen',
  'die Außenseite der Yacht reinigen',
  'auf die Kinder aufpassen',
]

const bordBilder = [
  { src: '/images/charter/Tacos.jpg', caption: 'Typisches Essen an Bord - Tacos' },
  { src: '/images/charter/fruehstueck-an-bord.jpg', caption: 'Frühstück an Bord' },
  { src: '/images/charter/essen-an-bord.png', caption: 'Essen an Bord' },
  { src: '/images/charter/bordservice.jpg', caption: 'Unser Bordservice' },
  { src: '/images/charter/typisches-fruehstueck.jpg', caption: 'Typisches Frühstück an Bord' },
]

const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' } as const
const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

function DoDont({ title, doTitle, doItems, dontTitle, dontItems }: { title: string; doTitle: string; doItems: string[]; dontTitle: string; dontItems: string[] }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1.25rem' }}>{title}</h3>
      <div className="skipper-dodont" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ background: '#ecfdf5', borderRadius: '6px', padding: '1.5rem' }}>
          <h4 style={{ fontFamily: 'DM Sans, sans-serif', color: '#067647', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>{doTitle}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {doItems.map(i => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#333', fontSize: '0.87rem', lineHeight: 1.6 }}>
                <span style={{ color: '#067647', flexShrink: 0 }}>✔</span> {i}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: '#fef2f2', borderRadius: '6px', padding: '1.5rem' }}>
          <h4 style={{ fontFamily: 'DM Sans, sans-serif', color: '#b42318', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>{dontTitle}</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {dontItems.map(i => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#333', fontSize: '0.87rem', lineHeight: 1.6 }}>
                <span style={{ color: '#b42318', flexShrink: 0 }}>✕</span> {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function SkipperPage() {
  const lang = useLang()
  const s = skl[lang]
  const en = lang === 'en'
  const [form, setForm] = useState({ name: '', email: '', telefon: '', nachricht: '' })
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
    const ok = await sendForm('skipper-anfrage', form)
    setSending(false)
    if (ok) setSent(true)
    else setFailed(true)
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? "Crew charter – skipper & board service | Yacht-Holiday" : "Skipper- und Bord-Service | Yacht-Urlaub"}
        description="Professionell ausgebildete Skipper, Bord-Service (Koch, Hostess), Yoga- und Kite-Instruktoren, Kinderbetreuung an Bord – buchen Sie Personal zu Ihrer Yacht."
        image="/images/charter/skipper.jpg"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src="/images/charter/skipper.jpg" alt="Skipper- und Bord-Service" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,27,47,0.88) 0%, rgba(7,27,47,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.9rem, 4.5vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>
            {s.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.8 }}>
            {s.sub}
          </motion.p>
        </div>
      </div>

      {/* Personal-Liste */}
      <section style={{ background: 'var(--gray-light)', padding: '3rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <p style={{ color: '#444', fontSize: '0.97rem', marginBottom: '1rem' }}>{s.offer}</p>
          <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }} className="skipper-personal">
            {(en ? personalEn : personal).map(p => (
              <li key={p} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--navy)', fontSize: '0.92rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--blue)' }}>✔</span> {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skipper */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '1.25rem' }}>{s.skipper}</h2>
          {en && skipperTextEn.map(p => (<p key={p} style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>{p}</p>))}
          {!en && <>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Unsere professionell geschulten Skipper kümmern sich um die Yacht und bieten Informationen über Ihr gewünschtes Urlaubsziel aus erster Hand.
          </p>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Unser Ziel ist es das Erlebnis eines Segelurlaubs für jedermann zugänglich zu machen. Deswegen sind unsere Skipper Profis, die die Yacht selbstständig An- und Ablegen können und sicher von A nach B navigieren. Natürlich ist auch mithelfen und mitsegeln gerne gesehen, aber kein Muss! Sie können sich am Segelerlebnis beteiligen und mit anpacken oder einfach zurücklehnen und die Entdeckungsreise genießen.
          </p>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Wir wählen unser Personal sorgfältig aus, denn Vertrauen ist uns wichtig. Der Skipper ist ein wesentlicher Faktor für Ihr Urlaubserlebnis, und wir möchten, dass Sie wieder gerne zu uns zurückkommen. Unsere Skipper werden daher von uns direkt entsandt und keinesfalls von Fremdfirmen oder Dritten zugebucht. Die Qualität vor Ort ist unsere oberste Priorität für Sie als unsere Gäste.
          </p>
          </>}
          <figure style={{ margin: '1.75rem 0' }}>
            <img src="/images/charter/skipper.jpg" alt="Professionelle Yacht-Urlaub Skipper" loading="lazy"
              style={{ width: '100%', borderRadius: '6px', boxShadow: '0 2px 16px rgba(0,0,0,0.1)' }}
              onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
            <figcaption style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.45rem', fontStyle: 'italic' }}>Professionelle Yacht-Urlaub Skipper</figcaption>
          </figure>
          {!en && <>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Bereits vor der Abreise kontaktiert Sie der Skipper, um Ihre Reise zu planen und alle Fragen zu beantworten. Ergänzend können Sie auch eine Törnbesprechung buchen, damit Sie Ihren Skipper persönlich kennenlernen und sich die Crew gemeinsam auf die Reise freuen und vorbereiten kann.
          </p>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Unsere Skipper sind nicht nur Experten auf ihrem Gebiet, sondern geben auch ihr Wissen gerne weiter, damit Sie das meiste aus Ihrem individuellen Yacht-Urlaub herausholen können.
          </p>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
            Der Skipper belegt immer eine Kabine an Bord, so bleibt der Salon für die gesamte Crew frei. Der Skipper wird nach altem seemännischen Gebrauch von der Bordkassa mitverpflegt.
          </p>
          </>}

          <DoDont title={s.qS} doTitle={s.doS} doItems={en ? skipperWirdEn : skipperWird} dontTitle={s.dontS} dontItems={en ? skipperWirdNichtEn : skipperWirdNicht} />

          <p style={{ marginBottom: '1rem' }}>
            <a href="/crew" style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '0.92rem' }}>unser Stamm-Personal »</a>
          </p>
        </div>
      </section>

      {/* Bordservice */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '1.25rem' }}>{s.board}</h2>
          {en && boardTextEn.map(p => (<p key={p} style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>{p}</p>))}
          {!en && <>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem' }}>
            Einfach zurücklehnen und entspannen – denn unser Bordservice kümmert sich um alles rund ums Kochen. Auch die Einkäufe gehören dazu, damit Sie sorgenfrei Ihre Reise beginnen können.
          </p>
          <p style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2rem' }}>
            Der Skipper kümmert sich um das Navigieren der Yacht, während der Bordservice einkaufen geht, kocht und das Reinigen der Gemeinschaftsräume übernimmt. Somit können Sie sich zurücklehnen und Ihren individuellen Yacht-Urlaub in vollen Zügen genießen.
          </p>
          </>}

          <div className="bord-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
            {bordBilder.map(b => (
              <figure key={b.src}>
                <img src={b.src} alt={b.caption} loading="lazy" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '5px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                <figcaption style={{ color: 'var(--gray)', fontSize: '0.74rem', marginTop: '0.35rem' }}>{b.caption}</figcaption>
              </figure>
            ))}
          </div>

          <DoDont title={s.qB} doTitle={s.doB} doItems={en ? serviceMachtEn : serviceMacht} dontTitle={s.dontB} dontItems={en ? serviceMachtNichtEn : serviceMachtNicht} />
        </div>
      </section>

      {/* Anfrageformular (wie Original am Seitenende) */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.75rem' }}>
            {s.form}
          </h2>
          {sent ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>{s.thanks}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="skipper-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>{s.name}</label>
                  <input required name="name" value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>{s.mail}</label>
                  <input required type="email" name="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>{s.tel}</label>
                <input type="tel" name="telefon" value={form.telefon} onChange={e => set('telefon', e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>{s.msg}</label>
                <textarea required name="nachricht" rows={5} value={form.nachricht} onChange={e => set('nachricht', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              {failed && (
                <p style={{ fontSize: '0.82rem', color: '#e53e3e', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                  {lang === 'en'
                    ? 'Your request could not be sent. Please try again or email us at info@yacht-urlaub.net.'
                    : 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie an info@yacht-urlaub.net.'}
                </p>
              )}
              <button type="submit" disabled={sending} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '13px 36px', opacity: sending ? 0.6 : 1 }}>
                {sending ? s.sending : s.send}
              </button>
            </form>
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 700px) {
          .skipper-dodont, .skipper-personal, .skipper-form-grid { grid-template-columns: 1fr !important; }
          .bord-gallery { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
