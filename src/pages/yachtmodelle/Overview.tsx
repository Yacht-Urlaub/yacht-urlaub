import { useState } from 'react'
import SEO from '../../components/SEO'
import { Link } from '../../router'
import { useLang } from '../../i18n'
import { type Model } from './data'
import { BRANDS_L, UI, absUrl, basePath, modelsFor, pathFor, typLabel, typPlural, useEnglishTexts } from './lang'
import { Pic } from './shared'

type Typ = 'alle' | Model['typ']

function Card({ m }: { m: Model }) {
  const lang = useLang()
  const u = UI[lang]
  return (
    <Link to={pathFor(m.id, lang)} className="card">
      <div className="ph">
        <Pic m={m} variant="card" />
        {m.badges[0] && <span className="badge">{m.badges[0]}</span>}
        <span className="tp">{typLabel(m.typ, lang)}</span>
        {m.tours.length > 0 && <span className="d3">{u.badge3d}</span>}
      </div>
      <div className="cb">
        <h3>{m.name}</h3>
        <span className="yr">{m.year}</span>
        <p className="tg">{m.tagline}</p>
        <div className="kfs">
          {m.key.slice(0, 3).map(x => <span key={x[1]}><b>{x[0]}</b> {x[1]}</span>)}
        </div>
        <span className="go">{u.viewModel}</span>
      </div>
    </Link>
  )
}

export default function YachtModelleOverviewPage() {
  const lang = useLang()
  useEnglishTexts(lang)
  const u = UI[lang]
  const MODELS = modelsFor(lang)
  const BRANDS = BRANDS_L[lang]
  const root = basePath(lang)
  const [typ, setTyp] = useState<Typ>('alle')
  const [brand, setBrand] = useState('alle')
  const [q, setQ] = useState('')
  const [only3d, setOnly3d] = useState(false)

  const brandHas = (b: string, t: Typ) => MODELS.some(m => m.brand === b && (t === 'alle' || m.typ === t))
  // Werften ohne Modelle des gewaehlten Typs ausblenden (Lagoon/Bali bauen nur Katamarane)
  const activeBrand = brand !== 'alle' && !brandHas(brand, typ) ? 'alle' : brand

  // Kein useMemo: der React Compiler memoisiert selbst (Modellliste je Sprache wird in lang.ts gecacht)
  const needle = q.trim().toLowerCase()
  const selected = MODELS.filter(m =>
    (typ === 'alle' || m.typ === typ) &&
    (activeBrand === 'alle' || m.brand === activeBrand) &&
    (!needle || `${m.name} ${m.brand}`.toLowerCase().includes(needle)) &&
    (!only3d || m.tours.length > 0))

  const byBrand: Record<string, Model[]> = {}
  selected.forEach(m => { (byBrand[m.brand] = byBrand[m.brand] || []).push(m) })

  const one = selected.length === 1
  const count = `${selected.length} ${typ === 'alle' ? u.model[one ? 0 : 1] : (one ? typLabel(typ, lang) : typPlural(typ, lang))}`
  const tours = MODELS.filter(m => m.tours.length).length
  const reset = () => { setTyp('alle'); setBrand('alle'); setQ(''); setOnly3d(false) }

  return (
    <main className="ym">
      <SEO
        title={u.ovTitle}
        description={u.ovDesc(MODELS.length)}
        image="/images/yachtmodelle/lagoon-42.jpg"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: u.crumbRoot, item: absUrl(root, lang) }] },
            {
              '@type': 'CollectionPage',
              '@id': `${absUrl(root, lang)}#seite`,
              url: absUrl(root, lang),
              name: u.ovTitle,
              inLanguage: u.lang,
              isPartOf: { '@type': 'WebSite', name: u.site, url: absUrl('/', lang) },
              mainEntity: {
                '@type': 'ItemList',
                numberOfItems: MODELS.length,
                itemListElement: MODELS.map((m, i) => ({ '@type': 'ListItem', position: i + 1, name: m.name, url: absUrl(pathFor(m.id, lang), lang) })),
              },
            },
          ],
        }}
      />
      <section className="oh"><div className="wrap">
        <p className="eyebrow">{u.crumbRoot}</p>
        <h1>{u.ovH1}</h1>
        <p className="lead">{u.ovLead(MODELS.length)}</p>
      </div></section>

      <div className="filt"><div className="wrap">
        <div className="seg" role="group" aria-label={u.type}>
          {(['alle', 'Katamaran', 'Segelyacht'] as Typ[]).map(t => (
            <button key={t} type="button" aria-pressed={typ === t} onClick={() => setTyp(t)}>
              {t === 'alle' ? u.all : typPlural(t, lang)}
            </button>
          ))}
        </div>
        <div className="chipsel" role="group" aria-label={u.yard}>
          {['alle', ...Object.keys(BRANDS)].filter(b => b === 'alle' || brandHas(b, typ)).map(b => (
            <button key={b} type="button" aria-pressed={activeBrand === b} onClick={() => setBrand(b)}>
              {b === 'alle' ? u.allYards : b}
            </button>
          ))}
        </div>
        {tours > 0 && (
          <div className="chipsel">
            <button className="t3d" type="button" aria-pressed={only3d} onClick={() => setOnly3d(v => !v)}>
              {u.only3d(tours)}
            </button>
          </div>
        )}
        <input className="srch" type="search" placeholder={u.search} aria-label={u.search} value={q}
          onChange={e => setQ(e.target.value)} />
        <span className="cnt" aria-live="polite">{count}</span>
      </div></div>

      <div className="wrap">
        {selected.length === 0 ? (
          <p className="empty">{u.empty} <a href="#modelle" onClick={e => { e.preventDefault(); reset() }}>{u.reset}</a></p>
        ) : (
          Object.keys(BRANDS).filter(b => byBrand[b]).map(b => (
            <section className="brand" key={b}>
              <h2>{b} <small>{byBrand[b].length} {u.model[byBrand[b].length === 1 ? 0 : 1]}</small></h2>
              <p className="bd">{BRANDS[b]}</p>
              <div className="grid">
                {[...byBrand[b]].sort((a, c) => a.len - c.len).map(m => <Card key={m.id} m={m} />)}
              </div>
            </section>
          ))
        )}
        <div style={{ height: 56 }} />
      </div>
    </main>
  )
}
