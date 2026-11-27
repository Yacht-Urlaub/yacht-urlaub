import { useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import SEO from '../../components/SEO'
import { Link } from '../../router'
import { MAIL, useLang, type Lang } from '../../i18n'
import { sendForm } from '../../lib/sendForm'
import { faqsFor, keyValue, modelDescription, modelTitle, similarModels, type Model } from './data'
import { EQUIP_L, EXTRAS_L, UI, absUrl, basePath, modelsFor, pathFor, typLabel, typPlural, useEnglishTexts } from './lang'
import { Embed, EmbedNote, Icon } from './shared'

const go = (id: string) => () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
}

function RequestForm({ m, lang }: { m: Model; lang: Lang }) {
  const u = UI[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [err, setErr] = useState('')
  const [badName, setBadName] = useState(false)
  const [badMail, setBadMail] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', zeitraum: '', personen: '', revier: '', skipperWunsch: u.skOpts[0], nachricht: '' })
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'sending') return
    const okName = form.name.trim().length > 1
    const okMail = /^\S+@\S+\.\S+$/.test(form.email.trim())
    setBadName(!okName); setBadMail(!okMail)
    setErr(!okName ? u.errName : !okMail ? u.errMail : '')
    if (!okName || !okMail) return
    setStatus('sending')
    const ok = await sendForm('yachtmodell-anfrage', {
      ...form, name: form.name.trim(), email: form.email.trim(),
      modell: m.name, werft: m.brand, seite: absUrl(pathFor(m.id, lang), lang), sprache: lang,
    })
    setStatus(ok ? 'ok' : 'error')
  }

  if (status === 'ok') {
    return (
      <div className="ok">
        <h3>{u.thanks(form.name.trim())}</h3>
        <p>{u.thanksText(m.name, form.revier, form.zeitraum, form.personen, form.skipperWunsch)}</p>
      </div>
    )
  }
  return (
    <form className="form" noValidate onSubmit={submit}>
      <label className="f">{u.fName}<input className="inp" name="name" autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={badName} /></label>
      <label className="f">{u.fMail}<input className="inp" name="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} aria-invalid={badMail} /></label>
      <label className="f">{u.fPeriod}<input className="inp" name="zeitraum" placeholder={u.fPeriodPh} value={form.zeitraum} onChange={set('zeitraum')} /></label>
      <label className="f">{u.fPeople}<input className="inp" name="personen" inputMode="numeric" placeholder={u.fPeoplePh} value={form.personen} onChange={set('personen')} /></label>
      <label className="f">{u.fArea}<input className="inp" name="revier" placeholder={u.fAreaPh} value={form.revier} onChange={set('revier')} /></label>
      <label className="f">{u.fSkipper}
        <select className="inp" name="skipperWunsch" value={form.skipperWunsch} onChange={set('skipperWunsch')}>
          {u.skOpts.map(o => <option key={o}>{o}</option>)}
        </select>
      </label>
      <label className="f full">{u.fMsg}<textarea className="inp" name="nachricht" placeholder={u.fMsgPh} value={form.nachricht} onChange={set('nachricht')} /></label>
      {(err || status === 'error') && (
        <p className="err full" role="alert">
          {err || u.errSend(MAIL[lang])}
        </p>
      )}
      <button className="btn btn-gold full" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? u.sending : u.send}
      </button>
      <p className="privnote full">{u.formPriv1}<Link to={u.privacyPath}>{u.formPriv2}</Link>.</p>
    </form>
  )
}

export default function YachtModellDetailPage() {
  const lang = useLang()
  useEnglishTexts(lang)
  const u = UI[lang]
  const MODELS = modelsFor(lang)
  const root = basePath(lang)
  const { id } = useParams<{ id: string }>()
  const m = MODELS.find(x => x.id === id)
  if (!m) return <Navigate to={root} replace />

  const typ = typLabel(m.typ, lang)
  const v0 = m.videos[0]
  const vMore = m.videos.slice(1)
  const sib = MODELS.filter(x => x.brand === m.brand && x !== m).sort((a, b) => a.len - b.len)
  const sim = similarModels(m, MODELS)
  const plans = m.plans ?? []
  const faqs = faqsFor(m, lang)
  const skipper = m.typ === 'Katamaran' ? u.skipperCat : u.skipperMono
  const cmpRows: [string, (x: Model) => string][] = [
    [u.cmpYard, x => x.brand],
    [u.cmpLen, x => keyValue(x, ['Länge'])],
    [u.cmpCab, x => keyValue(x, ['Kabinen'])],
    [u.cmpGuests, x => keyValue(x, ['Gäste', 'Kojen'])],
    [u.cmpIdeal, x => x.fitYes[0] || '–'],
  ]

  const page = absUrl(pathFor(m.id, lang), lang)
  const poster = m.poster ? absUrl(m.poster, lang) : undefined
  const title = modelTitle(m, lang)
  const description = modelDescription(m, lang)
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: u.crumbRoot, item: absUrl(root, lang) },
          { '@type': 'ListItem', position: 2, name: m.name, item: page },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${page}#seite`,
        url: page,
        name: title,
        description,
        inLanguage: u.lang,
        isPartOf: { '@type': 'WebSite', name: u.site, url: absUrl('/', lang) },
        ...(poster ? { primaryImageOfPage: { '@type': 'ImageObject', url: poster, width: 1280, height: 720 } } : {}),
        // Das Boot selbst als Entitaet, mit Verweis auf die Werftseite (sameAs): hilft Such- und KI-Systemen,
        // das Modell eindeutig zuzuordnen. Bewusst kein Product/Offer: es gibt keinen Preis auf der Seite.
        about: {
          '@type': 'Thing',
          name: m.name,
          description: m.tagline,
          url: m.src,
          sameAs: m.src,
          ...(poster ? { image: poster } : {}),
        },
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
        title={title}
        description={description}
        image={m.poster ?? m.images[0]?.src}
        schema={schema}
      />

      <section className="mh"><div className="wrap">
        <div className="top">
          <div>
            <p className="crumbs"><Link to={root}>{u.crumbRoot}</Link> › {m.brand} › {m.name}</p>
            <div className="badges">
              {m.badges.map(b => <span className="badge" key={b}>{b}</span>)}
              <span className="badge dk">{typ}</span><span className="badge dk">{m.year}</span>
            </div>
            <p className="werft">{lang === 'en' ? `${typ} by ${m.brand}` : `${typ} von ${m.brand}`}</p>
            <h1>{m.name}</h1>
            <p className="lead">{m.tagline}</p>
          </div>
          <div>
            <div className="kf">{m.key.map(k => <div key={k[1]}><b>{k[0]}</b><span>{k[1]}</span></div>)}</div>
            <div className="ctas">
              <button className="btn btn-gold" type="button" onClick={go('anfrage')}>{u.ctaAvail}</button>
              {m.tours.length
                ? <button className="btn btn-outline" type="button" onClick={go('rundgang3d')}>{u.cta3d}</button>
                : <button className="btn btn-outline" type="button" onClick={go('kabinen')}>{u.ctaCabins}</button>}
            </div>
          </div>
        </div>
        {v0
          ? <><Embed m={m} kind="video" id={v0.id} title={v0.title} by={v0.by} eager /><EmbedNote kind="video" /></>
          : <div className="novid">{u.noVideo(m.name)}</div>}
      </div></section>

      <nav className="subnav" aria-label={u.subnavAria}><div className="wrap">
        <button type="button" className="l" onClick={go('leben')}>{u.sLife}</button>
        <button type="button" className="l" onClick={go('kabinen')}>{u.sPlans}</button>
        {m.tours.length > 0 && <button type="button" className="l" onClick={go('rundgang3d')}>{u.s3d}</button>}
        <button type="button" className="l" onClick={go('faq')}>{u.sFaq}</button>
        <Link to={root} className="l">{u.sAll}</Link>
        <button type="button" className="btn btn-gold push" style={{ padding: '8px 18px', minHeight: 40 }} onClick={go('anfrage')}>{u.sAsk}</button>
      </div></nav>

      <div className="trust"><div className="wrap">
        {u.trust.map(t => <span key={t}>{t}</span>)}
      </div></div>

      <section className="band" id="ueberblick"><div className="wrap two">
        <div>
          <p className="kick">{u.kickGlance}</p>
          <h2>{u.h2Overview(m.name)}</h2>
          <div className="intro">{m.glance.map(p => <p key={p}>{p}</p>)}</div>
          <div className="pc">
            <div className="y"><h3>{u.love}</h3><ul>{m.plus.map(x => <li key={x}>{x}</li>)}</ul></div>
            <div className="n"><h3>{u.know}</h3><ul>{m.minus.map(x => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </div>
        <aside className="side" aria-label={u.factsH}>
          <h3>{u.factsH}</h3>
          <table><tbody>{m.facts.map(r => <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td></tr>)}</tbody></table>
          <p className="from">{u.pricePerWeek}<b>{u.onRequest}</b></p>
          <button className="btn btn-gold" type="button" style={{ width: '100%', marginTop: 16 }} onClick={go('anfrage')}>{u.askNow}</button>
        </aside>
      </div></section>

      {m.images.length > 0 && (
        <section className="band" id="bilder"><div className="wrap">
          <p className="kick">{u.kickPics}</p><h2>{u.h2Pics}</h2>
          <div className="gal" tabIndex={0} aria-label={u.galAria}>
            {m.images.map(im => (
              <figure key={im.src}><img src={im.src} alt={im.alt} loading="lazy" decoding="async" {...(im.w && im.h ? { width: im.w, height: im.h } : {})} /><figcaption>{im.alt}</figcaption></figure>
            ))}
          </div>
        </div></section>
      )}

      <section className="band" id="leben"><div className="wrap">
        <p className="kick">{u.kickLife}</p>
        <h2>{u.h2Life(m.name)}</h2>
        <div className="life">
          {m.life.map(h => <div key={h[0]}><Icon name={h[2]} /><span><h3>{h[0]}</h3><p>{h[1]}</p></span></div>)}
        </div>
      </div></section>

      <section className="band" id="kabinen"><div className="wrap">
        <p className="kick">{u.kickPlans}</p>
        <h2>{u.h2Plans(m.name)}</h2>
        <p className="intro">{u.plansIntro(m.name, m.layouts.length)}</p>
        {plans.length > 0 ? (
          <div className="lays">
            {plans.map(p => (
              <figure className="lay" key={p.img}>
                <img src={p.img} alt={u.planAlt(m.name, p.caption)} loading="lazy" decoding="async" {...(p.w && p.h ? { width: p.w, height: p.h } : {})} />
                <figcaption><b>{p.caption}</b></figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className="skip"><b>{u.plansSoon}</b>{u.plansSoonText}</p>
        )}
        <div className="scroll"><table className="t">
          <thead><tr><th>{u.thVersion}</th><th>{u.thCabins}</th><th>{u.thBaths}</th><th>{u.thFits}</th><th>{u.thNote}</th></tr></thead>
          <tbody>{m.layouts.map(l => (
            <tr key={l.v}><td>{l.v}</td><td className="n">{l.cab}</td><td className="n">{l.bath}</td><td>{l.fit}</td><td>{l.note || '–'}</td></tr>
          ))}</tbody>
        </table></div>
        <p className="skip"><b>{u.skipperQ}</b> {skipper}</p>
      </div></section>

      {m.tours.length > 0 && (
        <section className="band" id="rundgang3d"><div className="wrap">
          <p className="kick">{u.kick3d}</p><h2>{u.h23d}</h2>
          {m.tours.map((t, i) => (
            <div className="tour" style={i ? { marginTop: 28 } : undefined} key={t.id}>
              <Embed m={m} kind="tour" id={t.id} title={t.title} by={t.by} />
              <div>
                <h3 style={{ fontSize: 19, marginBottom: 6 }}>{t.title}</h3>
                <p>{u.tourText(m.name)}</p>
                <ul>
                  {u.tourBul.map(b => <li key={b}>{b}</li>)}
                </ul>
                <p className="by">{u.tourBy}{t.by}</p>
              </div>
            </div>
          ))}
          <EmbedNote kind="tour" dark />
        </div></section>
      )}

      {vMore.length > 0 && (
        <section className="band" id="rundgang"><div className="wrap">
          <p className="kick">{u.kickVid}</p><h2>{u.h2Vid}</h2>
          <div style={{ maxWidth: 900 }}>
            {vMore.map(v => <div key={v.id} style={{ marginBottom: 18 }}><Embed m={m} kind="video" id={v.id} title={v.title} by={v.by} /></div>)}
            <EmbedNote kind="video" dark />
          </div>
        </div></section>
      )}

      <section className="band" id="ausstattung"><div className="wrap">
        <p className="kick">{u.kickEq}</p><h2>{u.h2Eq}</h2>
        <p className="intro">{u.eqIntro}</p>
        <div className="eq">
          {Object.entries(EQUIP_L[lang][m.typ]).map(([g, l]) => <div key={g}><h3>{g}</h3><ul>{l.map(x => <li key={x}>{x}</li>)}</ul></div>)}
          <div className="opt"><h3>{u.eqOpt}</h3><ul>{(m.extras.length ? m.extras : EXTRAS_L[lang]).map(x => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div></section>

      <section className="band" id="reviere"><div className="wrap">
        <p className="kick">{u.kickAreas}</p><h2>{u.h2Areas(m.name)}</h2>
        <p className="intro">{m.reviereText || u.areasDefault(m.name)}</p>
        {m.reviere.length > 0 && <div className="chips">{m.reviere.map(r => <span key={r}>{r}</span>)}</div>}
      </div></section>

      <section className="band" id="vergleich"><div className="wrap">
        <p className="kick">{u.kickCmp}</p><h2>{u.h2Cmp(typPlural(m.typ, lang))}</h2>
        <div className="scroll"><table className="cmp">
          <thead><tr><th />{sim.map(x => (
            <th key={x.id} className={x === m ? 'cur' : ''}>{x === m ? x.name : <Link to={pathFor(x.id, lang)}>{x.name}</Link>}</th>
          ))}</tr></thead>
          <tbody>{cmpRows.map(([l, f]) => (
            <tr key={l}><th>{l}</th>{sim.map(x => <td key={x.id} className={x === m ? 'cur' : ''}>{f(x)}</td>)}</tr>
          ))}</tbody>
        </table></div>
        {sib.length > 0 && (
          <>
            <h3 style={{ margin: '28px 0 10px', fontSize: 18 }}>{u.moreOf(m.brand)}</h3>
            <div className="chips">{sib.map(x => <Link key={x.id} to={pathFor(x.id, lang)}>{x.name}</Link>)}</div>
          </>
        )}
      </div></section>

      <section className="band" id="fazit"><div className="wrap">
        <p className="kick">{u.kickFit}</p><h2>{u.h2Fit(m.name)}</h2>
        <div className="fit">
          <div><h3>{u.fitYesH}</h3><ul>{m.fitYes.map(x => <li key={x}>{x}</li>)}</ul></div>
          <div className="no"><h3>{u.fitNoH}</h3><ul>{m.fitNo.map(x => <li key={x}>{x}</li>)}</ul></div>
        </div>
      </div></section>

      <section className="band" id="faq"><div className="wrap" style={{ maxWidth: 900 }}>
        <p className="kick">{u.kickFaq}</p><h2>{u.h2Faq(m.name)}</h2>
        {faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        <details className="tech"><summary>{u.techH}</summary>
          <dl>{m.tech.map(r => <div key={r[0]}><dt>{r[0]}</dt><dd>{r[1]}</dd></div>)}</dl>
        </details>
      </div></section>

      <section className="band" id="anfrage"><div className="wrap"><div className="cta">
        <div>
          <p className="kick" style={{ color: 'var(--gold2)' }}>{u.kickAsk}</p>
          <h2>{u.h2Ask(m.name)}</h2>
          <p>{u.askText}</p>
        </div>
        <RequestForm m={m} lang={lang} />
      </div></div></section>

      <div className="wrap" style={{ padding: '0 24px 32px' }}>
        <p className="privnote dk" style={{ textAlign: 'center' }}>{u.disclaimer}</p>
      </div>
    </main>
  )
}
