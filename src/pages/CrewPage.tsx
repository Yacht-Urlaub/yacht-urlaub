import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useLang } from '../i18n'
import { sendForm } from '../lib/sendForm'

// Crew 1:1 von yacht-urlaub.net/kontakt/crew übernommen
const skipperEn = [
  {
    name: 'Manuel Göschl',
    role: 'Founder and skipper',
    adresse: '1030 Vienna, 3970 Weitra, 51410 Opatija',
    kontakt: 'office@yacht-holiday.net',
    img: '/images/crew/Manuel.png',
    motto: 'Your journey begins where the horizon never ends.',
    bio: "For over 20 years, the sea has been my second home – a place where freedom comes alive, where the wind tells stories, and every sunset marks the start of something new.\nA yacht holiday is more than just a getaway – it's a feeling. A feeling of freedom without limits, of safety in experienced hands, and the thrill of knowing that your next adventure is just a breeze away.\nWith more than 30,000 nautical miles sailed and nearly 200 personally led voyages, I know what matters most: reliability, quality, safety – and that special touch that transforms a trip into a truly unforgettable experience.\nEvery journey, every route, every skipper is chosen with care – guided by my experience and my passion for the sea.\nWhether you dream of hidden coves, charming harbor towns, or simply drifting with the rhythm of the waves – your time at sea is in the best hands.",
  },
  {
    name: 'Toni Liebscher',
    role: 'Skipper',
    adresse: '1100 Vienna',
    kontakt: 'office@yacht-holiday.net',
    img: '/images/crew/Toni.jpg',
    bio: 'Since my childhood I have been sailing on small yawls and big yachts. I love the sea, the wind and the climate of freedom you experience while sailing. You can spend a pleasant evening in a secluded cove or enjoy the luxury and vibrant nightlife of the city harbour. This spirit makes sailing an exceptional experience to me, every time.\nA few years ago I successfully completed my training as a RYA Yachtmaster Offshore and since then I have logged more than 3000 nautical miles. Security and caution, a positive atmosphere and much relaxation provide the foundation for an enjoyable Yacht-Holiday.',
  },
  {
    name: 'Freddie Großmayer',
    role: 'Skipper',
    adresse: '1190 Vienna',
    kontakt: 'office@yacht-holiday.net',
    img: '/images/crew/Freddie.jpg',
    bio: 'Also does yacht deliveries and offers consulting for preparation and buying an owner-yacht.',
  },
  {
    name: 'Tharuka Pathirana',
    role: 'Skipper',
    adresse: '8010 Graz',
    kontakt: 'office@yacht-holiday.net',
    img: '/images/crew/Tharuka.png',
    bio: '',
  },
]

const skipper = [
  {
    name: 'Manuel Göschl',
    role: 'Gründer, Inhaber und Skipper',
    adresse: '1020 Wien, 3970 Weitra, 51410 Opatija',
    kontakt: 'skipper@yacht-urlaub.net',
    img: '/images/crew/Manuel.png',
    motto: 'Ihre Reise beginnt dort, wo der Horizont kein Ende kennt.',
    bio: 'Seit über 20 Jahren zieht es mich hinaus aufs Meer – dorthin, wo Freiheit spürbar wird, wo der Wind Geschichten erzählt und jeder Sonnenuntergang ein neues Kapitel beginnt.\nYachturlaub ist nicht nur Urlaub – es ist ein Gefühl. Ein Gefühl von grenzenloser Freiheit, von Sicherheit in erfahrenen Händen und der Gewissheit, dass das nächste Abenteuer nur eine Wende entfernt liegt.\nMit über 30.000 Seemeilen Erfahrung und fast 200 persönlich begleiteten Törns weiß ich, worauf es ankommt: Verlässlichkeit, Qualität, Sicherheit – und das gewisse Etwas, das aus einer Reise ein unvergessliches Erlebnis macht.\nJeder Törn, jede Route und jede Crew trägt meine Handschrift – mit höchstem Anspruch an Professionalität und einem offenen Herzen für die Schönheit der Weltmeere. Ob Sie einsame Buchten entdecken, charmante Hafenstädtchen erkunden oder einfach den Rhythmus der Wellen genießen möchten – Ihre Auszeit auf See ist bei uns in den besten Händen.',
  },
  {
    name: 'Toni Liebscher',
    role: 'Skipper',
    adresse: '1100 Wien',
    kontakt: 'skipper@yacht-urlaub.net',
    img: '/images/crew/Toni.jpg',
    bio: 'Ich segle seit meiner Kindheit auf kleinen Jollen und großen Yachten. Ich liebe das Meer, den Wind und die entspannte Freiheit die man beim Segeln erleben kann. Einen Abend in einer ruhigen, abgelegenen Bucht zu verbringen um am nächsten Abend den Luxus und das Nachtleben in einem großen Stadthafen zu genießen, macht das Fahrtensegeln für mich zu einem besonderen Erlebnis und das jedesmal aufs Neue.\nVor einigen Jahren habe ich eine Ausbildung zum RYA Yachtmaster Offshore abgeschlossen und allein seitdem über 3000 Seemeilen geloggt. Für mich sind die Sicherheit, eine positive Atmosphäre und viel Entspannung die Grundlagen für einen angenehmen Yacht-Urlaub.',
  },
  {
    name: 'Freddie Großmayer',
    role: 'Skipper & Ausbilder',
    adresse: '1190 Wien',
    kontakt: 'skipper@yacht-urlaub.net',
    img: '/images/crew/Freddie.jpg',
    bio: 'Unser erfahrenster im Team ist mit allen Wassern gewaschen und ist nach wie vor begeisterter Segler und Nautiker. Wer ihn kennt, weiß: der nächste Lacher ist nicht weit entfernt, behält immer einen kühlen Kopf und hat meist immer die richtige Antwort parat, auch wenn es mal etwas schwieriger wird. Freddie ist nicht müde auch immer wieder neue Reviere, Yachten und Technologien zu nutzen, führt auch Yacht-Überstellungen durch und berät bei Kauf von Eigner-Yachten und Vorbereitung dergleichen.',
  },
  {
    name: 'Tharuka Pathirana',
    role: 'Skipper & Ausbilder',
    adresse: '8010 Graz',
    kontakt: 'skipper@yacht-urlaub.net',
    img: '/images/crew/Tharuka.png',
    bio: 'Ich bin in Graz geboren und aufgewachsen. Bereits als Teenager sammelte ich meine ersten Segel-Erfahrungen auf einem österreichischen See und verliebte mich sofort in das Segeln. Seit 2015 bin ich professioneller Skipper mit mittlerweile über 25.000sm Erfahrung.\nIch verbringe so viel Zeit wie möglich auf dem Wasser (hauptsächlich in der kroatischen Adria, in Griechenland aber auch in den italienischen und spanischen Gewässern und am Atlantik). Ebenfalls arbeite ich ehrenamtlich für das weltweit größte Segelprojekt für sozial benachteiligte junge Menschen, die Mirno More, welche auch tatkräftig von Yacht-Urlaub unterstützt wird, und nehme, wann immer möglich, auch an Regatten teil. Ich spreche Deutsch, Englisch, ein bisschen Französisch und Spanisch, und lerne gerade Kroatisch.',
  },
]

const personal = [
  {
    name: 'Rebecca Mistretta',
    role: 'Bord-Service und Yoga-Trainerin',
    adresse: '10000 Zagreb',
    kontakt: 'info@yacht-urlaub.net',
    img: '/images/crew/Rebecca.jpg',
    bio: '',
  },
]

const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' } as const
const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

function CrewCard({ p, i }: { p: typeof skipper[number] & { motto?: string }; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
      style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column' }}
    >
      {/* Runder Avatar — Gesicht bleibt immer im Bild */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '1.5rem' }}>
        <div style={{
          width: '170px', height: '170px', borderRadius: '50%', overflow: 'hidden',
          border: '4px solid var(--navy)', boxShadow: '0 8px 26px rgba(7,27,47,0.18)',
          background: 'var(--gray-light)', marginBottom: '1.25rem', flexShrink: 0,
        }}>
          <img src={p.img} alt={p.name} loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 18%' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
        </div>
        <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{p.name}</h3>
        <p style={{ color: 'var(--blue)', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.65rem' }}>{p.role}</p>
        <p style={{ color: 'var(--gray)', fontSize: '0.78rem' }}>Adresse: {p.adresse}</p>
        <p style={{ color: 'var(--gray)', fontSize: '0.78rem' }}>
          Kontakt: <a href={`mailto:${p.kontakt}`} style={{ color: 'var(--blue)', fontWeight: 600 }}>{p.kontakt}</a>
        </p>
      </div>
      {(p.motto || p.bio) && <div style={{ borderTop: '1px solid var(--gray-mid)', paddingTop: '1.25rem' }}>
        {p.motto && <p style={{ color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, fontStyle: 'italic', marginBottom: '0.75rem' }}>{p.motto}</p>}
        {p.bio && <p style={{ color: '#444', fontSize: '0.87rem', lineHeight: 1.75, whiteSpace: 'pre-line' }}>{p.bio}</p>}
      </div>}
    </motion.div>
  )
}

const crl = {
  de: { sub: 'Die Crew von Yacht-Urlaub besteht dieses Jahr aus 7 Stamm-Skippern + weiteren Profis, die uns vor allem in der Hochsaison unterstützen. Das sind unter anderem ...',
    h2: 'Unsere Stamm-Skipper', apply: 'Als Profi-Skipper bewerben »', staff: 'Unser Stamm-Personal',
    need: 'Personal gesucht?', needSub: 'Sie haben bereits eine Yacht und suchen einen Skipper oder anderweitiges Personal? Wir freuen uns auf Ihre Anfrage!',
    name: 'Name *', mail: 'E-Mail *', tel: 'Telefonnummer', msg: 'Nachricht *', send: 'Senden', sending: 'wird gesendet …',
    thanks: 'Vielen Dank! Ihre Anfrage wurde übermittelt.' },
  en: { sub: 'The crew of Yacht-Holiday consists of 7 regular skippers + further professionals who support us especially in peak season. Among them ...',
    h2: 'Your skipper', apply: 'Apply as professional skipper »', staff: 'Our crew',
    need: 'Need a skipper?', needSub: 'You have a yacht and you need a skipper? We welcome your inquiries!',
    name: 'Name *', mail: 'Email *', tel: 'Telephone number', msg: 'Message *', send: 'Send', sending: 'sending …',
    thanks: 'Thank you! Your inquiry has been sent.' },
}

export default function CrewPage() {
  const lang = useLang()
  const s = crl[lang]
  const team = lang === 'en' ? skipperEn : skipper
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
    const ok = await sendForm('crew-anfrage', form)
    setSending(false)
    if (ok) setSent(true)
    else setFailed(true)
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? "Crew – our skippers & staff | Yacht-Holiday" : "Crew – Unsere Stamm-Skipper & unser Personal | Yacht-Urlaub"}
        description="Die Crew von Yacht-Urlaub: 7 Stamm-Skipper und weitere Profis. Lernen Sie Manuel, Toni, Freddie, Tharuka und unser Bord-Personal kennen."
        image="/images/crew/Team Ferien-Messe.jpg"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '400px', overflow: 'hidden' }}>
        <img src="/images/crew/Team Ferien-Messe.jpg" alt="Die Crew von Yacht-Urlaub" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,27,47,0.9) 0%, rgba(7,27,47,0.35) 60%, rgba(7,27,47,0.25) 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '2.5rem' }}>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '0.75rem' }}>
            Crew
          </motion.h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.97rem', maxWidth: '620px', lineHeight: 1.7 }}>
            {s.sub}
          </p>
        </div>
      </div>

      {/* Stamm-Skipper */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '2rem' }}>
            {s.h2}
          </h2>
          <div className="crew-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
            {team.map((p, i) => <CrewCard key={p.name} p={p} i={i} />)}
          </div>
          <p>
            <a href="mailto:skipper@yacht-urlaub.net?subject=Bewerbung als Profi-Skipper" style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '0.95rem' }}>
              {s.apply}
            </a>
          </p>
        </div>
      </section>

      {/* Stamm-Personal */}
      <section style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.4rem, 2.8vw, 1.9rem)', marginBottom: '2rem' }}>
            {s.staff}
          </h2>
          <div className="crew-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {personal.map((p, i) => <CrewCard key={p.name} p={p} i={i} />)}
          </div>
        </div>
      </section>

      {/* Personal gesucht? */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '0.75rem' }}>{s.need}</h2>
          <p style={{ color: '#444', fontSize: '0.93rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
            {s.needSub}
          </p>
          {sent ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
              <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>{s.thanks}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="crew-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
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
        @media (max-width: 800px) {
          .crew-grid, .crew-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
