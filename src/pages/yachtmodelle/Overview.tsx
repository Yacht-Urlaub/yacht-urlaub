import { useMemo, useState } from 'react'
import SEO from '../../components/SEO'
import { Link } from '../../router'
import { BRANDS, MODELS, modelPath, plural, type Model } from './data'
import { Pic } from './shared'

type Typ = 'alle' | Model['typ']

function Card({ m }: { m: Model }) {
  return (
    <Link to={modelPath(m.id)} className="card">
      <div className="ph">
        <Pic m={m} alt={m.images[0]?.alt ?? ''} />
        {m.badges[0] && <span className="badge">{m.badges[0]}</span>}
        <span className="tp">{m.typ}</span>
        {m.tours.length > 0 && <span className="d3">3D-Rundgang</span>}
      </div>
      <div className="cb">
        <h3>{m.name}</h3>
        <span className="yr">{m.year}</span>
        <p className="tg">{m.tagline}</p>
        <div className="kfs">
          {m.key.slice(0, 3).map(x => <span key={x[1]}><b>{x[0]}</b> {x[1]}</span>)}
        </div>
        <span className="go">Modell ansehen →</span>
      </div>
    </Link>
  )
}

export default function YachtModelleOverviewPage() {
  const [typ, setTyp] = useState<Typ>('alle')
  const [brand, setBrand] = useState('alle')
  const [q, setQ] = useState('')
  const [only3d, setOnly3d] = useState(false)

  const brandHas = (b: string, t: Typ) => MODELS.some(m => m.brand === b && (t === 'alle' || m.typ === t))
  // Werften ohne Modelle des gewaehlten Typs ausblenden (Lagoon/Bali bauen nur Katamarane)
  const activeBrand = brand !== 'alle' && !brandHas(brand, typ) ? 'alle' : brand

  const selected = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return MODELS.filter(m =>
      (typ === 'alle' || m.typ === typ) &&
      (activeBrand === 'alle' || m.brand === activeBrand) &&
      (!needle || `${m.name} ${m.brand}`.toLowerCase().includes(needle)) &&
      (!only3d || m.tours.length > 0))
  }, [typ, activeBrand, q, only3d])

  const byBrand = useMemo(() => {
    const out: Record<string, Model[]> = {}
    selected.forEach(m => { (out[m.brand] = out[m.brand] || []).push(m) })
    return out
  }, [selected])

  const count = `${selected.length} ${typ === 'alle' ? (selected.length === 1 ? 'Modell' : 'Modelle') : (selected.length === 1 ? typ : plural(typ))}`
  const tours = MODELS.filter(m => m.tours.length).length
  const reset = () => { setTyp('alle'); setBrand('alle'); setQ(''); setOnly3d(false) }

  return (
    <main className="ym">
      <SEO
        title="Yachtmodelle: Katamarane & Segelyachten im Überblick"
        description={`${MODELS.length} Charteryachten im Überblick: Katamarane von Lagoon und Bali, Segelyachten von Jeanneau, Beneteau, Bavaria und Hanse.`}
      />
      <section className="oh"><div className="wrap">
        <p className="eyebrow">Yachtmodelle</p>
        <h1>Finden Sie die Yacht, die zu Ihrer Crew passt</h1>
        <p className="lead">Katamarane und Segelyachten der beliebtesten Werften – mit Videos, Kabinenversionen und allem, was für Ihre Woche an Bord zählt.</p>
      </div></section>

      <div className="filt"><div className="wrap">
        <div className="seg" role="group" aria-label="Typ">
          {(['alle', 'Katamaran', 'Segelyacht'] as Typ[]).map(t => (
            <button key={t} type="button" aria-pressed={typ === t} onClick={() => setTyp(t)}>
              {t === 'alle' ? 'Alle' : plural(t)}
            </button>
          ))}
        </div>
        <div className="chipsel" role="group" aria-label="Werft">
          {['alle', ...Object.keys(BRANDS)].filter(b => b === 'alle' || brandHas(b, typ)).map(b => (
            <button key={b} type="button" aria-pressed={activeBrand === b} onClick={() => setBrand(b)}>
              {b === 'alle' ? 'Alle Werften' : b}
            </button>
          ))}
        </div>
        <div className="chipsel">
          <button className="t3d" type="button" aria-pressed={only3d} onClick={() => setOnly3d(v => !v)}>
            Mit 3D-Rundgang ({tours})
          </button>
        </div>
        <input className="srch" type="search" placeholder="Modell suchen" aria-label="Modell suchen" value={q}
          onChange={e => setQ(e.target.value)} />
        <span className="cnt" aria-live="polite">{count}</span>
      </div></div>

      <div className="wrap">
        {selected.length === 0 ? (
          <p className="empty">Kein Modell passt zu Ihrer Auswahl. <a href="#modelle" onClick={e => { e.preventDefault(); reset() }}>Filter zurücksetzen</a></p>
        ) : (
          Object.keys(BRANDS).filter(b => byBrand[b]).map(b => (
            <section className="brand" key={b}>
              <h2>{b} <small>{byBrand[b].length} {byBrand[b].length === 1 ? 'Modell' : 'Modelle'}</small></h2>
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
