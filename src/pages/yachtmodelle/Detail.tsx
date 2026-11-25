import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import { Link } from '../../router'
import { BASE_DE } from '../../i18n'
import { sendForm } from '../../lib/sendForm'
import {
  BASE_PATH, COSTS, EQUIP, EXTRAS, MODELS, faqsFor, keyValue, modelDescription, modelPath, modelTitle,
  plural, similarModels, type Model,
} from './data'
import { Embed, EmbedNote, Icon } from './shared'

const go = (id: string) => () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}

function RequestForm({ m }: { m: Model }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', zeitraum: '', personen: '', revier: '', skipperWunsch: 'Mit Skipper', nachricht: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    const okName = form.name.trim().length > 1
    const okMail = /^\S+@\S+\.\S+$/.test(form.email.trim())
    setBadName(!okName); setBadMail(!okMail)
    setErr(!okName ? 'Bitte geben Sie Ihren Namen ein.' : !okMail ? 'Bitte geben Sie eine gültige E-Mail-Adresse ein.' : '')
    if (!okName || !okMail) return
    setStatus('sending')
    const ok = await sendForm('yachtmodell-anfrage', {
      ...form, name: form.name.trim(), email: form.email.trim(),
      modell: m.name, werft: m.brand, seite: `${BASE_DE}${modelPath(m.id)}`,
    })
    setStatus(ok ? 'ok' : 'error')
  }

  if (status === 'ok') {
    return (
      <div className="ok">
        <h3>Danke, {form.name.trim()}!</h3>
        <p>Ihre Anfrage zur {m.name} ({form.revier || 'Revier offen'}, {form.zeitraum || 'Zeitraum offen'}, {form.personen || '?'} Personen, {form.skipperWunsch}) ist bei uns. Sie hören innerhalb von 24 Stunden von uns.</p>
      </div>
    )
  }
  return (
    <form className="form" noValidate onSubmit={submit}>
      <label className="f">Name<input className="inp" name="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={badName} /></label>
      <label className="f">E-Mail<input className="inp" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={badMail} /></label>
      <label className="f">Zeitraum<input className="inp" name="zeitraum" placeholder="z. B. Juni 2027, 1 Woche" value={form.zeitraum} onChange={set('zeitraum')} /></label>
      <label className="f">Personen<input className="inp" name="personen" inputMode="numeric" placeholder="z. B. 6" value={form.personen} onChange={set('personen')} /></label>
      <label className="f">Revier<input className="inp" name="revier" placeholder="z. B. Kroatien oder noch offen" value={form.revier} onChange={set('revier')} /></label>
      <label className="f">Skipper
        <select className="inp" name="skipperWunsch" value={form.skipperWunsch} onChange={set('skipperWunsch')}>
          <option>Mit Skipper</option><option>Ohne Skipper</option><option>Weiß ich noch nicht</option>
        </select>
      </label>
      <label className="f full">Nachricht<textarea className="inp" name="nachricht" placeholder="Wünsche, Kinder an Bord, Anlass …" value={form.nachricht} onChange={set('nachricht')} /></label>
      {(err || status === 'error') && (
        <p className="err full" role="alert">
          {err || 'Das Absenden hat leider nicht geklappt. Bitte versuchen Sie es später noch einmal oder schreiben Sie uns an info@yacht-urlaub.net.'}
        </p>
      )}
      <button className="btn btn-gold full" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>
      <p className="privnote full">Mit dem Absenden verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Mehr dazu in der <Link to="/datenschutz">Datenschutzerklärung</Link>.</p>
    </form>
  )
}

export default function YachtModellDetailPage() {
  const { id } = useParams<{ id: string }>()
  const m = MODELS.find(x => x.id === id)
  if (!m) return <Navigate to={BASE_PATH} replace />

  const v0 = m.videos[0]
  const vMore = m.videos.slice(1)
  const sib = MODELS.filter(x => x.brand === m.brand && x !== m).sort((a, b) => a.len - b.len)
  const sim = similarModels(m)
  const layImgs = m.layouts.filter(l => l.img)
  const faqs = faqsFor(m)
  const skipper = m.typ === 'Katamaran'
    ? 'Auf vielen Katamaranen gibt es dafür eine Bugkabine mit eigenem Zugang vom Deck – ob sie vorhanden ist, hängt von der Yacht ab. Wir sagen Ihnen im Angebot genau, wie viele Kabinen für Ihre Gäste frei bleiben.'
    : 'Auf Segelyachten belegt der Skipper meist eine Kabine oder schläft im Salon. Planen Sie dafür eine Kabine ein – wir beraten Sie gern, welche Version zu Ihrer Gruppe passt.'
  const cmpRows: [string, (x: Model) => string][] = [
    ['Werft', x => x.brand],
    ['Länge', x => keyValue(x, ['Länge'])],
    ['Kabinen', x => keyValue(x, ['Kabinen'])],
    ['Gäste', x => keyValue(x, ['Gäste', 'Kojen'])],
    ['Ideal, wenn Sie …', x => x.fitYes[0] || '–'],
  ]

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Yachtmodelle', item: `${BASE_DE}${BASE_PATH}` },
          { '@type': 'ListItem', position: 2, name: m.brand, item: `${BASE_DE}${BASE_PATH}` },
          { '@type': 'ListItem', position: 3, name: m.name, item: `${BASE_DE}${modelPath(m.id)}` },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
      },
    ],
  }

  return (
    <main className="ym">
      <SEO
        title={modelTitle(m)}
        description={modelDescription(m)}
        image={m.poster ?? m.images[0]?.src}
        schema={schema}
      />

      <section className="mh"><div className="wrap">
        <div className="top">
          <div>
            <p className="crumbs"><Link to={BASE_PATH}>Yachtmodelle</Link> › {m.brand} › {m.name}</p>
            <div className="badges">
              {m.badges.map(b => <span className="badge" key={b}>{b}</span>)}
              <span className="badge dk">{m.typ}</span><span className="badge dk">{m.year}</span>
            </div>
            <p className="werft">{m.brand}</p>
            <h1>{m.name}</h1>
            <p className="lead">{m.tagline}</p>
          </div>
          <div>
            <div className="kf">{m.key.map(k => <div key={k[1]}><b>{k[0]}</b><span>{k[1]}</span></div>)}</div>
            <div className="ctas">
              <button className="btn btn-gold" type="button" onClick={go('anfrage')}>Verfügbarkeit anfragen →</button>
              {m.tours.length
                ? <button className="btn btn-outline" type="button" onClick={go('rundgang3d')}>3D-Rundgang</button>
                : <button className="btn btn-outline" type="button" onClick={go('kabinen')}>Kabinen ansehen</button>}
            </div>
          </div>
        </div>
        {v0
          ? <><Embed m={m} kind="video" id={v0.id} title={v0.title} by={v0.by} eager /><EmbedNote kind="video" /></>
          : <div className="novid">Ein Video zur {m.name} folgt. Bis dahin zeigen wir Ihnen gerne Bilder und Grundrisse persönlich.</div>}
      </div></section>

      <nav className="subnav" aria-label="Auf dieser Seite"><div className="wrap">
        <button type="button" className="l" onClick={go('leben')}>Leben an Bord</button>
        <button type="button" className="l" onClick={go('kabinen')}>Kabinen</button>
        {m.tours.length > 0 && <button type="button" className="l" onClick={go('rundgang3d')}>3D</button>}
        <button type="button" className="l" onClick={go('kosten')}>Kosten</button>
        <button type="button" className="l" onClick={go('faq')}>FAQ</button>
        <Link to={BASE_PATH} className="l">Alle Modelle</Link>
        <button type="button" className="btn btn-gold push" style={{ padding: '8px 18px', minHeight: 40 }} onClick={go('anfrage')}>Anfragen</button>
      </div></nav>

      <div className="trust"><div className="wrap">
        <span>Persönliche Beratung</span><span>5 Sterne auf Google</span><span>Trusted Shops zertifiziert</span><span>Antwort innerhalb von 24 Stunden</span>
      </div></div>

      <section className="band" id="ueberblick"><div className="wrap two">
        <div>
          <p className="kick">Auf einen Blick</p>
          <h2>Die {m.name} für Ihren Segelurlaub</h2>
          <div className="intro">{m.glance.map(p => <p key={p}>{p}</p>)}</div>
          <div className="pc">
            <div className="y"><h3>Das werden Sie lieben</h3><ul>{m.plus.map(x => <li key={x}>{x}</li>)}</ul></div>
            <div className="n"><h3>Gut zu wissen</h3><ul>{m.minus.map(x => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </div>
        <aside className="side" aria-label="Steckbrief">
          <h3>Steckbrief</h3>
          <table><tbody>{m.facts.map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table>
          <p className="from">Preis pro Woche<b>auf Anfrage</b></p>
          <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 16 }} onClick={go('anfrage')}>Jetzt anfragen</button>
        </aside>
      </div></section>

      {m.images.length > 0 && (
        <section className="band" id="bilder"><div className="wrap">
          <p className="kick">Bilder</p><h2>Eindrücke von Bord</h2>
          <div className="gal" tabIndex={0} aria-label="Bildergalerie">
            {m.images.map(im => (
              <figure key={im.src}><img src={im.src} alt={im.alt} loading="lazy" /><figcaption>{im.alt}</figcaption></figure>
            ))}
          </div>
        </div></section>
      )}

      <section className="band" id="leben"><div className="wrap">
        <p className="kick">Leben an Bord</p>
        <h2>So fühlt sich eine Woche auf der {m.name} an</h2>
        <div className="life">
          {m.life.map(h => <div key={h[0]}><Icon name={h[2]} /><span><h3>{h[0]}</h3><p>{h[1]}</p></span></div>)}
        </div>
      </div></section>

      <section className="band" id="kabinen"><div className="wrap">
        <p className="kick">Kabinen &amp; Grundrisse</p>
        <h2>Diese Versionen gibt es</h2>
        <p className="intro">Die Werft baut die {m.name} in {m.layouts.length === 1 ? 'dieser Version' : `${m.layouts.length} Versionen`}. Welche Version eine bestimmte Charteryacht hat, steht in unserem Angebot.</p>
        <div className="scroll"><table className="t">
          <thead><tr><th>Version</th><th>Kabinen</th><th>Bäder</th><th>Passt zu</th><th>Hinweis</th></tr></thead>
          <tbody>{m.layouts.map(l => (
            <tr key={l.v}><td>{l.v}</td><td className="n">{l.cab}</td><td className="n">{l.bath}</td><td>{l.fit}</td><td>{l.note || '–'}</td></tr>
          ))}</tbody>
        </table></div>
        {layImgs.length > 0 && (
          <div className="lays">
            {layImgs.map(l => (
              <figure className="lay" style={{ margin: 0 }} key={l.v}><img src={l.img} alt={`Grundriss ${m.name}, ${l.v}`} loading="lazy" /><p>{l.v}</p></figure>
            ))}
          </div>
        )}
        <div className="orig">
          <div><b>Original-Grundrisse der Werft</b>
            <p>{layImgs.length ? 'Alle Versionen im Detail finden Sie auch auf der Modellseite der Werft.' : 'Alle Versionen finden Sie auf der Modellseite der Werft.'}</p></div>
          <a className="btn ym-line" href={m.src} target="_blank" rel="noopener">Grundrisse bei {m.brand} ↗</a>
        </div>
        <p className="skip"><b>Mit Skipper unterwegs?</b> {skipper}</p>
      </div></section>

      {m.tours.length > 0 && (
        <section className="band" id="rundgang3d"><div className="wrap">
          <p className="kick">3D-Rundgang</p><h2>Gehen Sie selbst an Bord</h2>
          {m.tours.map((t, i) => (
            <div className="tour" style={i ? { marginTop: 28 } : undefined} key={t.id}>
              <Embed m={m} kind="tour" id={t.id} title={t.title} by={t.by} />
              <div>
                <h3 style={{ fontSize: 19, marginBottom: 6 }}>{t.title}</h3>
                <p>Laufen Sie durch Salon, Kabinen und Bäder einer echten {m.name} – so, als wären Sie schon an Bord.</p>
                <ul>
                  <li>Mit der Puppenhaus-Ansicht sehen Sie die ganze Raumaufteilung auf einen Blick.</li>
                  <li>Auf dem Handy einfach mit dem Finger drehen und weitergehen.</li>
                  <li>Die Ausstattung einzelner Charteryachten kann abweichen.</li>
                </ul>
                <p className="by">Rundgang: {t.by}</p>
              </div>
            </div>
          ))}
          <EmbedNote kind="tour" dark />
        </div></section>
      )}

      {vMore.length > 0 && (
        <section className="band" id="rundgang"><div className="wrap">
          <p className="kick">Rundgang</p><h2>Kommen Sie mit an Bord</h2>
          <div style={{ maxWidth: 900 }}>
            {vMore.map(v => <div key={v.id} style={{ marginBottom: 18 }}><Embed m={m} kind="video" id={v.id} title={v.title} by={v.by} /></div>)}
            <EmbedNote kind="video" dark />
          </div>
        </div></section>
      )}

      <section className="band" id="ausstattung"><div className="wrap">
        <p className="kick">Ausstattung</p><h2>Was Sie an Bord erwartet</h2>
        <p className="intro">Typische Ausstattung von Charteryachten dieser Art. Die genaue Liste hängt von der Yacht ab, Sie bekommen sie mit dem Angebot.</p>
        <div className="eq">
          {Object.entries(EQUIP[m.typ]).map(([g, l]) => <div key={g}><h3>{g}</h3><ul>{l.map(x => <li key={x}>{x}</li>)}</ul></div>)}
          <div className="opt"><h3>Je nach Yacht oder als Extra</h3><ul>{(m.extras.length ? m.extras : EXTRAS).map(x => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div></section>

      <section className="band" id="reviere"><div className="wrap">
        <p className="kick">Reviere</p><h2>Wo Sie die {m.name} segeln</h2>
        <p className="intro">{m.reviereText || `Für Ihren Wunschtermin prüfen wir, in welchen Revieren eine ${m.name} frei ist – vom Mittelmeer bis in die Karibik.`}</p>
        {m.reviere.length > 0 && <div className="chips">{m.reviere.map(r => <span key={r}>{r}</span>)}</div>}
      </div></section>

      <section className="band" id="kosten"><div className="wrap">
        <p className="kick">Kosten</p><h2>Was im Preis steckt – und was dazukommt</h2>
        <p className="intro">Der Wochenpreis hängt von Revier, Saison und Baujahr ab. In unserem Angebot stehen alle Posten, damit Sie vorher wissen, was die Woche kostet.</p>
        <div className="cost">
          <div className="inc"><h3>Im Preis enthalten</h3><ul>{COSTS.inc.map(x => <li key={x}>{x}</li>)}</ul></div>
          <div><h3>Kommt dazu, je nach Revier und Wunsch</h3><ul>{COSTS.add.map(x => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div></section>

      <section className="band" id="vergleich"><div className="wrap">
        <p className="kick">Vergleich</p><h2>Ähnliche {plural(m.typ)} im Vergleich</h2>
        <div className="scroll"><table className="cmp">
          <thead><tr><th />{sim.map(x => (
            <th key={x.id} className={x === m ? 'cur' : ''}>{x === m ? x.name : <Link to={modelPath(x.id)}>{x.name}</Link>}</th>
          ))}</tr></thead>
          <tbody>{cmpRows.map(([l, f]) => (
            <tr key={l}><th>{l}</th>{sim.map(x => <td key={x.id} className={x === m ? 'cur' : ''}>{f(x)}</td>)}</tr>
          ))}</tbody>
        </table></div>
        {sib.length > 0 && (
          <>
            <h3 style={{ margin: '28px 0 10px', fontSize: 18 }}>Weitere {m.brand}-Modelle</h3>
            <div className="chips">{sib.map(x => <Link key={x.id} to={modelPath(x.id)}>{x.name}</Link>)}</div>
          </>
        )}
      </div></section>

      <section className="band" id="fazit"><div className="wrap">
        <p className="kick">Fazit</p><h2>Ist die {m.name} das Richtige für Sie?</h2>
        <div className="fit">
          <div><h3>Ja, wenn Sie …</h3><ul>{m.fitYes.map(x => <li key={x}>{x}</li>)}</ul></div>
          <div className="no"><h3>Eher nicht, wenn Sie …</h3><ul>{m.fitNo.map(x => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div></section>

      <section className="band" id="faq"><div className="wrap" style={{ maxWidth: 900 }}>
        <p className="kick">Häufige Fragen</p><h2>Fragen zur {m.name}</h2>
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <details className="tech"><summary>Technische Daten für Interessierte</summary>
          <dl>{m.tech.map(r => <div key={r[0]}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>)}</dl>
        </details>
      </div></section>

      <section className="band" id="anfrage"><div className="wrap"><div className="cta">
        <div>
          <p className="kick" style={{ color: 'var(--gold2)' }}>Anfrage</p>
          <h2>{m.name} anfragen</h2>
          <p>Sagen Sie uns, wann und wo Sie segeln möchten und wie viele Sie sind. Wir suchen die passende Yacht und melden uns innerhalb von 24 Stunden mit einem Angebot.</p>
        </div>
        <RequestForm m={m} />
      </div></div></section>

      <div className="wrap" style={{ padding: '0 24px 32px' }}>
        <p className="privnote dk" style={{ textAlign: 'center' }}>Angaben nach Werft- und Händlerdaten, ohne Gewähr. Ausstattung je nach Yacht verschieden.</p>
      </div>
    </main>
  )
}
