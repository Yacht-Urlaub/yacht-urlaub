import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import SEO from '../components/SEO'
import DestinationDetail, { destinations } from '../components/DestinationDetail'

const destMeta: Record<string, { description: string; keywords: string }> = {
  kroatien: {
    description: 'Segelurlaub Kroatien: Über 1.200 Inseln, türkisblaues Wasser und historische Städte. Törns in Dalmatien, Istrien und den Kornaten – für Einsteiger und Profis.',
    keywords: 'Kroatien segeln, Segelurlaub Kroatien, Dalmatien Törn, Kornaten, Segelyacht Kroatien',
  },
  griechenland: {
    description: 'Segelurlaub Griechenland: Ionische Inseln, Kykladen und Dodekanes. Erleben Sie Mykonos, Santorini und Korfu vom Wasser aus – mit oder ohne Skipper.',
    keywords: 'Griechenland segeln, Kykladen Törn, Ionische Inseln, Segelurlaub Griechenland',
  },
  balearen: {
    description: 'Segelurlaub Balearen: Mallorca, Ibiza, Menorca und Formentera. Mediterrane Buchten, Strandleben und Kultur – der perfekte Segeltörn im westlichen Mittelmeer.',
    keywords: 'Balearen segeln, Mallorca Yacht, Ibiza Charter, Segeln Spanien',
  },
  karibik: {
    description: 'Segelurlaub Karibik BVI: Konstante Passatwinde, weiße Sandstrände und türkisblaues Wasser. Die Britischen Jungferninseln sind das klassische Segelparadies.',
    keywords: 'Karibik segeln, BVI Törn, British Virgin Islands, Segelurlaub Karibik',
  },
  seychellen: {
    description: 'Luxury-Segelurlaub Seychellen: Granitfelsen, Palmstrände und Luxus-Katamarane. Segeln zwischen Mahé, Praslin und La Digue – das ultimative Paradieserlebnis.',
    keywords: 'Seychellen segeln, Katamaran Seychellen, Luxury Yachtreise, Mahé Praslin',
  },
  thailand: {
    description: 'Segelurlaub Thailand: Kalksteinfelsen, türkisblaue Lagunen und exotisches Flair. Segeln ab Phuket zu den Phi-Phi-Inseln und Similan-Inseln.',
    keywords: 'Thailand segeln, Phuket Charter, Phi Phi Inseln, Segeln Südostasien',
  },
}

export default function DestinationPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dest = destinations.find(d => d.id === id)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!dest) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)' }}>Destination nicht gefunden</h1>
        <button onClick={() => navigate('/destinationen')} className="btn btn-primary">← Alle Destinationen</button>
      </main>
    )
  }

  const meta = destMeta[dest.id]
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description: meta?.description,
    url: `https://www.yacht-urlaub.net/destinationen/${dest.id}`,
    image: `https://www.yacht-urlaub.net${dest.headerImg}`,
    touristType: ['Segeltourismus', 'Yachtcharter', 'Wassersport'],
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={`Segelurlaub ${dest.name}`}
        description={meta?.description ?? `Segelurlaub ${dest.name} mit Yacht-Urlaub. Entdecken Sie die schönsten Buchten und Reviere.`}
        canonical={`/destinationen/${dest.id}`}
        image={dest.headerImg}
        schema={schema}
      />
      <DestinationDetail dest={dest} onBack={() => navigate('/destinationen')} />
    </main>
  )
}
