import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { AnchorIcon } from '../components/Icons'
import { useLang } from '../i18n'

// Optionen 1:1 vom Original-Urlaubsplaner (yacht-urlaub.net/urlaubsplaner)
const yachtTypes = [
  { id: 'Gemütliche Segelyacht', label: 'Gemütliche Segelyacht', img: '/images/yachten/Header_Yacht.jpg' },
  { id: 'Geräumiger Katamaran', label: 'Geräumiger Katamaran', img: '/images/yachten/Lagoon 450-4.jpg' },
  { id: 'Luxuriöse Motoryacht', label: 'Luxuriöse Motoryacht', img: '/images/luxury/nikita-17.png' },
]

const reviere = [
  'Kroatien', 'Griechenland', 'Italien (Festland)', 'Sardinien', 'Sizilien', 'Karibik',
  'Thailand', 'Seychellen', 'Balearen (Spanien)', 'Kanaren (Spanien)', 'Azoren (Portugal)', 'Südsee',
]

const buchungsAbsichten = [
  '... so bald wie möglich buchen.',
  '... in den nächsten Wochen buchen.',
  '... derzeit noch nicht buchen. Ich erkundige mich nur.',
]

const gruppenGroessen = [
  '3 oder weniger - Bitte Link für WhatsApp-Info Gruppe zuschicken',
  '4', '5', '6', '7', '8', '9', '10', '11', '12',
  'mehr als 12, aufgeteilt auf mehrere Yachten',
]

const kommunikationsWege = ['E-Mail', 'Whatsapp', 'Facebook', 'Skype', 'Telefon/persönlich']

const erfahrenOptionen = ['Freunde und Bekannte', 'Online-Suche (Website)', 'Facebook', 'Instagram', 'Ferien-Messe', 'Sonstiges']

const steps = ['Yachtauswahl', 'Revierauswahl', 'Terminplanung', 'Crew & Kommunikation', 'Kontaktperson']

const fadeIn = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
}

type FormData = {
  yacht: string
  reviere: string[]
  revierSonstiges: string
  beginn: string
  dauer: string
  buchung: string
  anmerkung: string
  personen: string
  kommunikation: string[]
  kommunikationSonstiges: string
  vorname: string
  nachname: string
  geburtsjahr: string
  email: string
  telefon: string
  newsletter: boolean
  erfahren: string
}

const inputStyle = {
  width: '100%', padding: '11px 14px', border: '1.5px solid var(--gray-mid)', borderRadius: '4px',
  fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', boxSizing: 'border-box',
} as const
const labelStyle = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '6px' } as const

const pl = {
  de: {
    tag: 'Anfrage starten – mit dem YACHT-URLAUBsplaner', h1: 'Urlaubsplaner',
    sub: 'In 5 kurzen Schritten klären wir die wichtigsten Fragen zu Ihrem Urlaub ab. Danach können Sie sich gemütlich zurücklehnen – den Rest der Organisation übernehmen wir! Alles natürlich unverbindlich und kostenlos!',
    steps: ['Yachtauswahl', 'Revierauswahl', 'Terminplanung', 'Crew & Kommunikation', 'Kontaktperson'],
    s1h: 'Yachtauswahl', s1sub: "Zuerst einmal zu Ihrem Schiffstyp: Was darf's denn sein?",
    yachts: ['Gemütliche Segelyacht', 'Geräumiger Katamaran', 'Luxuriöse Motoryacht'],
    s2h: 'Wo wollen Sie den Urlaub verbringen?',
    s2sub: 'Haben Sie und Ihre Crew sich schon Gedanken über eine Urlaubsdestination gemacht? Es gibt viele schöne Yacht-Urlaubsreviere auf dieser Welt. Wenn Ihre Wunschdestination nicht dabei ist, einfach Ihre Gedanken unter Sonstiges eintragen.',
    multi: '(Mehrfachauswahl möglich)', other: 'Sonstiges:', otherPh: 'Ihre Wunschdestination oder Gedanken dazu …',
    s3h: 'Terminplanung',
    s3sub: 'Wann wollen Sie mit Ihrer Crew auf Urlaub fahren? Bitte Ihren Wunsch-Anreisetag bekanntgeben. Ohne konkreten Termin gerne einen beliebigen Tag des Wunschmonats eintragen und Gedanken im Feld „Anmerkung/Wünsche" mitteilen!',
    begin: 'Beginn Ihres Urlaubs *',
    beginHint: 'In der Hauptsaison Juni–Sept. gilt in Europa grundsätzlich Samstag oder Mittwoch Anreise, Mindestdauer 7 Tage. Kurztrips nur in den Monaten März bis Mai bzw. Oktober möglich.',
    dauer: 'Und die Dauer in Tagen *', wish: 'Ich möchte meine Reise ... *',
    wishes: ['... so bald wie möglich buchen.', '... in den nächsten Wochen buchen.', '... derzeit noch nicht buchen. Ich erkundige mich nur.'],
    notes: 'Anmerkung/Wünsche', notesPh: 'Besondere Wünsche, alternative Termine, Erfahrung, Budget …',
    s4h: 'Crew & Kommunikation',
    s4sub: 'Es gibt viele verschiedene Kommunikationsmöglichkeiten für die Planung. Welche Plattform verwenden Sie zur Kommunikation mit den Leuten Ihrer Crew am ehesten?',
    group: 'Wieviele Personen umfasst Ihre Gruppe? *',
    komm: 'Wie bzw. wo soll die Planung Ihres Urlaubs stattfinden? (Mehrauswahl möglich)',
    s5h: 'Kontaktperson',
    s5sub: 'Sehr gut, Sie haben es fast geschafft! Last, but not least, wollen wir natürlich wissen, wer Sie sind. Sie sind unsere Referenzperson für die erste Kontaktaufnahme – natürlich alles unverbindlich und kostenlos.',
    yacht: 'Yacht', revier: 'Revier', termin: 'Termin', gruppe: 'Gruppe', tage: 'Tage',
    vn: 'Vorname *', nn: 'Nachname *', geb: 'Geburtsjahr *', gebPh: 'z.B. 1984', mail: 'E-Mail *',
    tel: 'Telefonnummer *', telPh: 'mit Ländervorwahl bitte (+49/+43/+41)', nl: 'Zum Newsletter anmelden',
    privacy: 'Yacht-Urlaub wird die Informationen, die Sie in diesem Formular angeben, dazu verwenden, mit Ihnen in Kontakt zu bleiben und Ihnen Updates und Marketing-Informationen per E-Mail zu übermitteln. Wir werden Ihre Informationen mit Sorgfalt und Respekt behandeln. Weitere Informationen zu unseren Datenschutzpraktiken finden Sie auf unserer',
    website: 'Website', found: 'Wie haben Sie von uns erfahren?', wahl: 'Bitte wählen …',
    submit: 'Abschicken — kostenlos & unverbindlich →', nospam: 'Wir melden uns persönlich. Kein Spam.',
    thanks: (n: string) => `Vielen Dank, ${n}!`,
    thanksSub: 'Wir haben Ihre Anfrage erhalten und melden uns schnellstmöglich bei Ihnen — persönlich, ohne automatische Antwort.',
    back: '← Zurück', home: 'Zurück zur Startseite', homeHref: '/',
    nav: ['weiter zur Revierauswahl', 'Weiter zur Terminplanung', 'Vorletzter Schritt: Kommunikation & Crew', 'Letzter Schritt: Ihre Kontaktdaten'],
    altText: 'Urlaubsplaner zu langwierig? Sie können gerne alternativ unser', altForm: 'kurzes Anfrage-Formular', altUse: 'verwenden!',
    bareboat: 'Für BAREBOAT-CHARTER Anfragen (nur Yacht ohne Skipper) bitte', bareboatForm: 'dieses Formular', bareboatUse: 'verwenden.',
    fixe: 'FIXE ROUTE BUCHEN', nurYacht: '„Nur Yacht"-Anfrage', buchHref: '/buchen', charterHref: '/charter',
    datenschutzHref: '/datenschutz',
  },
  en: {
    tag: 'Get a quote – with the YACHT-HOLIDAY planner', h1: 'Holiday planner',
    sub: 'In 5 short steps we clarify the most important questions about your holiday. Then you can sit back and relax – we take care of the rest of the organisation! All non-binding and free of charge!',
    steps: ['Choice of yacht', 'Sailing area', 'Schedule', 'Crew & communication', 'Contact person'],
    s1h: 'Choice of yacht', s1sub: 'First of all, your type of boat: what shall it be?',
    yachts: ['Comfortable sailing yacht', 'Spacious catamaran', 'Luxurious motor yacht'],
    s2h: 'Where do you want to spend your holiday?',
    s2sub: 'Have you and your crew already thought about a destination? There are many beautiful yacht sailing areas in this world. If your dream destination is not listed, just enter your thoughts under Other.',
    multi: '(multiple selection possible)', other: 'Other:', otherPh: 'Your dream destination or thoughts …',
    s3h: 'Schedule',
    s3sub: 'When do you want to go on holiday with your crew? Please state your preferred arrival day. Without a fixed date, simply enter any day of the desired month and share your thoughts in the "Notes" field!',
    begin: 'Start of your holiday *',
    beginHint: 'In high season June–Sept. in Europe arrival is generally Saturday or Wednesday, minimum duration 7 days. Short trips only possible March to May and October.',
    dauer: 'And the duration in days *', wish: 'I would like to book my trip ... *',
    wishes: ['... as soon as possible.', '... within the next weeks.', '... not yet. I am just inquiring.'],
    notes: 'Notes', notesPh: 'Special wishes, alternative dates, experience, budget …',
    s4h: 'Crew & communication',
    s4sub: 'There are many different ways to communicate for planning. Which platform do you most likely use to communicate with your crew?',
    group: 'How many people are in your group? *',
    komm: 'How or where should the planning of your holiday take place? (multiple selection possible)',
    s5h: 'Contact person',
    s5sub: 'Very good, you have almost made it! Last but not least, we would like to know who you are. You are our reference person for the first contact – all non-binding and free of charge, of course.',
    yacht: 'Yacht', revier: 'Area', termin: 'Date', gruppe: 'Group', tage: 'days',
    vn: 'First name *', nn: 'Last name *', geb: 'Year of birth *', gebPh: 'e.g. 1984', mail: 'Email *',
    tel: 'Telephone number *', telPh: 'with country code please (+49/+43/+41)', nl: 'Subscribe to the newsletter',
    privacy: 'Yacht-Holiday will use the information you provide on this form to stay in touch with you and to send you updates and marketing information by email. We will treat your information with care and respect. For more information about our privacy practices please visit our',
    website: 'website', found: 'How did you hear about us?', wahl: 'Please choose …',
    submit: 'Submit — free & non-binding →', nospam: 'We will reply personally. No spam.',
    thanks: (n: string) => `Thank you, ${n}!`,
    thanksSub: 'We have received your request and will get back to you as soon as possible — personally, without an automatic reply.',
    back: '← Back', home: 'Back to homepage', homeHref: '/en',
    nav: ['continue to sailing area', 'Continue to schedule', 'Second to last step: communication & crew', 'Last step: your contact details'],
    altText: 'Holiday planner too lengthy? You are welcome to use our', altForm: 'short inquiry form', altUse: 'instead!',
    bareboat: 'For BAREBOAT charter requests (yacht only, without skipper) please use', bareboatForm: 'this form', bareboatUse: '.',
    fixe: 'BOOK A FIXED ROUTE', nurYacht: '"Yacht only" request', buchHref: '/en/book-now', charterHref: '/en/charter/yacht-charter',
    datenschutzHref: '/en/data-privacy',
  },
}

export default function UrlaubsplanerPage() {
  const lang = useLang()
  const s = pl[lang]
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState<FormData>({
    yacht: '', reviere: [], revierSonstiges: '',
    beginn: '', dauer: '7', buchung: '', anmerkung: '',
    personen: '', kommunikation: [], kommunikationSonstiges: '',
    vorname: '', nachname: '', geburtsjahr: '', email: '', telefon: '',
    newsletter: false, erfahren: '',
  })

  const update = <K extends keyof FormData>(key: K, val: FormData[K]) => setForm(prev => ({ ...prev, [key]: val }))

  const toggleArr = (key: 'reviere' | 'kommunikation', val: string) =>
    setForm(prev => ({
      ...prev,
      [key]: prev[key].includes(val) ? prev[key].filter(v => v !== val) : [...prev[key], val],
    }))

  const canNext = () => {
    if (step === 0) return !!form.yacht
    if (step === 1) return form.reviere.length > 0 || !!form.revierSonstiges
    if (step === 2) return !!form.beginn && !!form.dauer && !!form.buchung
    if (step === 3) return !!form.personen
    return !!form.vorname && !!form.nachname && !!form.geburtsjahr && !!form.email && !!form.telefon
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = new URLSearchParams({
      'form-name': 'urlaubsplaner',
      yacht: form.yacht,
      reviere: [...form.reviere, form.revierSonstiges && `sonstiges: ${form.revierSonstiges}`].filter(Boolean).join(', '),
      beginn: form.beginn,
      dauer: form.dauer,
      buchung: form.buchung,
      anmerkung: form.anmerkung,
      personen: form.personen,
      kommunikation: [...form.kommunikation, form.kommunikationSonstiges && `sonstiges: ${form.kommunikationSonstiges}`].filter(Boolean).join(', '),
      vorname: form.vorname,
      nachname: form.nachname,
      geburtsjahr: form.geburtsjahr,
      email: form.email,
      telefon: form.telefon,
      newsletter: form.newsletter ? 'ja' : 'nein',
      erfahren: form.erfahren,
    })
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
    } catch {
      // continue regardless
    }
    setSent(true)
  }

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-light)' }}>
      <SEO
        title={lang === 'en' ? "Holiday planner – get a quote | Yacht-Holiday" : "Urlaubsplaner – Anfrage starten | Yacht-Urlaub"}
        description="In 5 kurzen Schritten klären wir die wichtigsten Fragen zu Ihrem Urlaub ab. Danach können Sie sich gemütlich zurücklehnen – den Rest der Organisation übernehmen wir!"
        canonical="/urlaubsplaner"
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3.5rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {s.tag}
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '0.75rem' }}>
            {s.h1}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto' }}>
            {s.sub}
          </p>
        </div>
      </div>

      {sent ? (
        <div className="container" style={{ maxWidth: '640px', padding: '5rem 1.5rem', textAlign: 'center' }}>
          <div style={{ marginBottom: '1.5rem', color: 'var(--blue)', display: 'flex', justifyContent: 'center' }}><AnchorIcon size={56} /></div>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '2rem', marginBottom: '1rem' }}>
            {s.thanks(form.vorname)}
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
            {s.thanksSub}
          </p>
          <a href={s.homeHref} className="btn btn-primary">{s.home}</a>
        </div>
      ) : (
        <div className="container" style={{ maxWidth: '860px', padding: '3rem 1.5rem 5rem' }}>

          {/* Progress */}
          <div className="planer-stepper" style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: '3rem' }}>
            {s.steps.map((st, i) => (
              <div key={st} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: i < step ? 'pointer' : 'default' }}
                  onClick={() => i < step && setStep(i)}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: i < step ? 'var(--blue)' : i === step ? 'var(--navy)' : 'var(--gray-mid)',
                    color: i <= step ? '#fff' : 'var(--gray)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.85rem',
                    transition: 'all 0.3s',
                    boxShadow: i === step ? '0 0 0 3px rgba(2,132,199,0.25)' : 'none',
                  }}>
                    {i < step ? '✓' : i + 1}
                  </div>
                  <span className="planer-step-label" style={{ fontSize: '0.66rem', marginTop: '4px', color: i === step ? 'var(--navy)' : 'var(--gray)', fontWeight: i === step ? 700 : 400, whiteSpace: 'nowrap' }}>
                    {st}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="planer-connector" style={{ width: '44px', height: '2px', background: i < step ? 'var(--blue)' : 'var(--gray-mid)', margin: '0 4px', marginBottom: '18px', transition: 'background 0.3s' }} />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">

            {/* Schritt 1: Yachtauswahl */}
            {step === 0 && (
              <motion.div key="step0" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {s.s1h}
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
                  {s.s1sub}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }} className="planer-dest-grid">
                  {yachtTypes.map(y => (
                    <button
                      key={y.id}
                      onClick={() => update('yacht', y.id)}
                      style={{
                        position: 'relative', overflow: 'hidden', border: '3px solid',
                        borderColor: form.yacht === y.id ? 'var(--blue)' : 'transparent',
                        borderRadius: '6px', cursor: 'pointer', background: 'none', padding: 0,
                        outline: 'none', aspectRatio: '4/3',
                        boxShadow: form.yacht === y.id ? '0 0 0 2px var(--blue)' : '0 2px 12px rgba(0,0,0,0.1)',
                        transition: 'all 0.2s',
                      }}
                    >
                      <img src={y.img} alt={y.label} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }} />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: form.yacht === y.id
                          ? 'linear-gradient(to top, rgba(2,132,199,0.85) 0%, rgba(2,132,199,0.4) 50%, transparent 100%)'
                          : 'linear-gradient(to top, rgba(7,27,47,0.85) 0%, rgba(7,27,47,0.3) 60%, transparent 100%)',
                        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1rem',
                        transition: 'background 0.2s',
                      }}>
                        <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', textAlign: 'left', lineHeight: 1.2 }}>{s.yachts[yachtTypes.indexOf(y)]}</span>
                        {form.yacht === y.id && (
                          <span style={{ position: 'absolute', top: '8px', right: '8px', background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700 }}>✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Schritt 2: Revierauswahl */}
            {step === 1 && (
              <motion.div key="step1" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {s.s2h}
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {s.s2sub} <strong>{s.multi}</strong>
                </p>
                <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '1.5rem' }} className="planer-revier-grid">
                    {reviere.map(r => (
                      <button key={r} onClick={() => toggleArr('reviere', r)} style={{
                        padding: '11px 10px', borderRadius: '4px', border: '2px solid',
                        borderColor: form.reviere.includes(r) ? 'var(--blue)' : 'var(--gray-mid)',
                        background: form.reviere.includes(r) ? 'var(--blue-pale)' : '#fff',
                        color: form.reviere.includes(r) ? 'var(--blue)' : 'var(--text)',
                        fontSize: '0.85rem', fontWeight: form.reviere.includes(r) ? 700 : 400,
                        cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
                        transition: 'all 0.15s',
                      }}>
                        {form.reviere.includes(r) ? '✓ ' : ''}{r}
                      </button>
                    ))}
                  </div>
                  <label style={labelStyle}>{s.other}</label>
                  <input type="text" value={form.revierSonstiges} onChange={e => update('revierSonstiges', e.target.value)}
                    placeholder={s.otherPh} style={inputStyle} />
                </div>
              </motion.div>
            )}

            {/* Schritt 3: Terminplanung */}
            {step === 2 && (
              <motion.div key="step2" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {s.s3h}
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {s.s3sub}
                </p>

                <div style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', maxWidth: '560px', margin: '0 auto' }}>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>{s.begin}</label>
                    <input type="date" required value={form.beginn} onChange={e => update('beginn', e.target.value)} style={inputStyle} />
                    <p style={{ color: 'var(--gray)', fontSize: '0.74rem', marginTop: '5px', lineHeight: 1.5 }}>
                      {s.beginHint}
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>{s.dauer}</label>
                    <input type="number" min={3} max={42} required value={form.dauer} onChange={e => update('dauer', e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>{s.wish}</label>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {(lang === 'en' ? s.wishes : buchungsAbsichten).map(b => (
                        <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#444', cursor: 'pointer' }}>
                          <input type="radio" name="buchung" checked={form.buchung === b} onChange={() => update('buchung', b)} />
                          {b}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>{s.notes}</label>
                    <textarea rows={4} value={form.anmerkung} onChange={e => update('anmerkung', e.target.value)}
                      placeholder={s.notesPh}
                      style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Schritt 4: Crew & Kommunikation */}
            {step === 3 && (
              <motion.div key="step3" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {s.s4h}
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {s.s4sub}
                </p>

                <div style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', maxWidth: '560px', margin: '0 auto' }}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>{s.group}</label>
                    <select required value={form.personen} onChange={e => update('personen', e.target.value)} style={inputStyle}>
                      <option value="">{s.wahl}</option>
                      {gruppenGroessen.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>{s.komm}</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      {kommunikationsWege.map(k => (
                        <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', color: '#444', cursor: 'pointer' }}>
                          <input type="checkbox" checked={form.kommunikation.includes(k)} onChange={() => toggleArr('kommunikation', k)} />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>

                  <label style={labelStyle}>{s.other}</label>
                  <input type="text" value={form.kommunikationSonstiges} onChange={e => update('kommunikationSonstiges', e.target.value)} style={inputStyle} />
                </div>
              </motion.div>
            )}

            {/* Schritt 5: Kontaktperson */}
            {step === 4 && (
              <motion.div key="step4" {...fadeIn}>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.6rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                  {s.s5h}
                </h2>
                <p style={{ color: 'var(--gray)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
                  {s.s5sub}
                </p>

                {/* Zusammenfassung */}
                <div style={{ background: 'var(--navy)', borderRadius: '6px', padding: '1.25rem 1.75rem', marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
                  <div>
                    <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.yacht}</span>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{form.yacht}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.revier}</span>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>
                      {[...form.reviere, form.revierSonstiges].filter(Boolean).join(', ')}
                    </p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.termin}</span>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{form.beginn} · {form.dauer} {s.tage}</p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--gold)', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{s.gruppe}</span>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', marginTop: '2px' }}>{form.personen}</p>
                  </div>
                </div>

                <form
                  name="urlaubsplaner"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  style={{ background: '#fff', borderRadius: '8px', padding: '2.5rem', boxShadow: '0 2px 20px rgba(0,0,0,0.07)', maxWidth: '560px', margin: '0 auto' }}
                >
                  <input type="hidden" name="form-name" value="urlaubsplaner" />
                  <p style={{ display: 'none' }}><label>Nicht ausfüllen: <input name="bot-field" /></label></p>

                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>{s.vn}</label>
                      <input type="text" name="vorname" required value={form.vorname} onChange={e => update('vorname', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{s.nn}</label>
                      <input type="text" name="nachname" required value={form.nachname} onChange={e => update('nachname', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>{s.geb}</label>
                      <input type="number" name="geburtsjahr" required min={1920} max={2010} placeholder={s.gebPh} value={form.geburtsjahr} onChange={e => update('geburtsjahr', e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{s.mail}</label>
                      <input type="email" name="email" required value={form.email} onChange={e => update('email', e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>{s.tel}</label>
                    <input type="tel" name="telefon" required placeholder={s.telPh} value={form.telefon} onChange={e => update('telefon', e.target.value)} style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: '#444', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form.newsletter} onChange={e => update('newsletter', e.target.checked)} style={{ marginTop: '3px' }} />
                      {s.nl}
                    </label>
                    <p style={{ color: 'var(--gray)', fontSize: '0.7rem', lineHeight: 1.5, marginTop: '0.4rem' }}>
                      {s.privacy} <a href={s.datenschutzHref} style={{ color: 'var(--blue)' }}>{s.website}</a>.
                    </p>
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <label style={labelStyle}>{s.found}</label>
                    <select value={form.erfahren} onChange={e => update('erfahren', e.target.value)} style={inputStyle}>
                      <option value="">{s.wahl}</option>
                      {erfahrenOptionen.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!canNext()}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem', padding: '14px', opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed' }}
                  >
                    {s.submit}
                  </button>
                  <p style={{ color: 'var(--gray)', fontSize: '0.75rem', marginTop: '0.75rem', textAlign: 'center' }}>
                    {s.nospam}
                  </p>
                </form>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Nav Buttons */}
          {step < 4 && (
            <div className="planer-nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', maxWidth: '860px', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setStep(s => Math.max(0, s - 1))}
                disabled={step === 0}
                style={{
                  background: 'none', border: '1.5px solid var(--gray-mid)', color: 'var(--gray)',
                  padding: '11px 24px', borderRadius: '4px', cursor: step === 0 ? 'not-allowed' : 'pointer',
                  opacity: step === 0 ? 0.4 : 1, fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
              >
                {s.back}
              </button>
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={!canNext()}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '11px 32px', opacity: canNext() ? 1 : 0.5, cursor: canNext() ? 'pointer' : 'not-allowed' }}
              >
                {s.nav[step]} →
              </button>
            </div>
          )}
          {step === 4 && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem', maxWidth: '560px', margin: '1rem auto 0' }}>
              <button
                onClick={() => setStep(3)}
                style={{
                  background: 'none', border: '1.5px solid var(--gray-mid)', color: 'var(--gray)',
                  padding: '11px 24px', borderRadius: '4px', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem',
                }}
              >
                {s.back}
              </button>
            </div>
          )}

        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .planer-dest-grid { grid-template-columns: 1fr !important; }
          .planer-revier-grid { grid-template-columns: 1fr 1fr !important; }
          .planer-connector { width: 20px !important; }
          .planer-step-label { display: none !important; }
        }
        @media (max-width: 480px) {
          .planer-revier-grid { grid-template-columns: 1fr !important; }
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .planer-connector { width: 14px !important; }
          .planer-stepper { margin-bottom: 2rem !important; }
          .planer-nav .btn { white-space: normal !important; text-align: center; }
        }
      `}</style>
    </main>
  )
}
