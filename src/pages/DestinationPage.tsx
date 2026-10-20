import { useParams } from 'react-router-dom'
import { useNavigate } from '../navigate'
import SEO from '../components/SEO'
import DestinationDetail, { destinations } from '../components/DestinationDetail'
import { destinationsEn } from '../data/destinationenEn'
import { useLang, enDestSlugs, isEnHost, BASE_DE, BASE_EN } from '../i18n'

const enDestPath: Record<string, string> = Object.fromEntries(Object.entries(enDestSlugs).map(([slug, id]) => [id, slug]))

const destMeta: Record<string, { de: string; en: string }> = {
  kroatien: {
    de: 'Segelurlaub Kroatien: Über 1.200 Inseln, türkisblaues Wasser und historische Städte. Törns in Dalmatien, Istrien und den Kornaten – für Einsteiger und Profis.',
    en: 'Sailing holiday in Croatia: over 1,200 islands, turquoise water and historic towns. Cruises in Dalmatia, Istria and the Kornati Islands – for beginners and experts alike.',
  },
  griechenland: {
    de: 'Segelurlaub Griechenland: Ionische Inseln, Kykladen und Dodekanes. Erleben Sie Mykonos, Santorini und Korfu vom Wasser aus – mit oder ohne Skipper.',
    en: 'Sailing holiday in Greece: the Ionian Islands, the Cyclades and the Dodecanese. Experience Mykonos, Santorini and Corfu from the water – with or without a skipper.',
  },
  balearen: {
    de: 'Segelurlaub Balearen: Mallorca, Ibiza, Menorca und Formentera. Mediterrane Buchten, Strandleben und Kultur – der perfekte Segeltörn im westlichen Mittelmeer.',
    en: 'Sailing holiday in the Balearic Islands: Mallorca, Ibiza, Menorca and Formentera. Mediterranean bays, beach life and culture – the perfect cruise in the western Mediterranean.',
  },
  kanaren: {
    de: 'Segelurlaub Kanaren: Ganzjähriges Segelrevier im Atlantik. Teneriffa, Gran Canaria, Lanzarote und La Gomera – Passatwinde und Vulkanlandschaften.',
    en: 'Sailing holiday in the Canary Islands: a year-round sailing area in the Atlantic. Tenerife, Gran Canaria, Lanzarote and La Gomera – trade winds and volcanic landscapes.',
  },
  'karibik-bvi': {
    de: 'Segelurlaub Karibik BVI: Konstante Passatwinde, weiße Sandstrände und türkisblaues Wasser. Die Britischen Jungferninseln sind das klassische Segelparadies.',
    en: 'Sailing holiday in the Caribbean BVI: steady trade winds, white sandy beaches and turquoise water. The British Virgin Islands are the classic sailing paradise.',
  },
  'karibik-windward-islands': {
    de: 'Segelurlaub Windward Islands: Von Grenada über St. Vincent und die Grenadinen bis Martinique – die Inseln über dem Winde sind das Traumrevier der südlichen Karibik.',
    en: 'Sailing holiday in the Windward Islands: from Grenada via St. Vincent and the Grenadines to Martinique – the dream cruising area of the southern Caribbean.',
  },
  seychellen: {
    de: 'Luxury-Segelurlaub Seychellen: Granitfelsen, Palmstrände und Luxus-Katamarane. Segeln zwischen Mahé, Praslin und La Digue – das ultimative Paradieserlebnis.',
    en: 'Luxury sailing holiday in the Seychelles: granite boulders, palm-fringed beaches and luxury catamarans. Sail between Mahé, Praslin and La Digue – the ultimate paradise experience.',
  },
  thailand: {
    de: 'Segelurlaub Thailand: Kalksteinfelsen, türkisblaue Lagunen und exotisches Flair. Segeln ab Phuket zu den Phi-Phi-Inseln und Similan-Inseln.',
    en: 'Sailing holiday in Thailand: limestone karsts, turquoise lagoons and an exotic atmosphere. Sail from Phuket to the Phi Phi Islands and the Similan Islands.',
  },
}

export default function DestinationPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const lang = useLang()
  // Alte URL /destinationen/karibik → karibik-bvi; EN-Slugs auflösen
  const resolvedId = lang === 'en' ? (enDestSlugs[id ?? ''] ?? id) : (id === 'karibik' ? 'karibik-bvi' : id)
  const list = lang === 'en' ? destinationsEn : destinations
  const dest = list.find(d => d.id === resolvedId)

  if (!dest) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <h1 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)' }}>{lang === 'en' ? 'Destination not found' : 'Destination nicht gefunden'}</h1>
        <button onClick={() => navigate('/destinationen')} className="btn btn-primary">{lang === 'en' ? '← All destinations' : '← Alle Destinationen'}</button>
      </main>
    )
  }

  const meta = destMeta[dest.id]
  const description = meta?.[lang] ?? (lang === 'en'
    ? `Sailing holiday ${dest.name} with Yacht-Holiday. Discover the most beautiful bays and cruising areas.`
    : `Segelurlaub ${dest.name} mit Yacht-Urlaub. Entdecken Sie die schönsten Buchten und Reviere.`)
  const base = isEnHost() ? BASE_EN : BASE_DE
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name: dest.name,
    description,
    url: lang === 'en' ? `${base}/en/destinations/${enDestPath[dest.id] ?? dest.id}` : `${base}/destinationen/${dest.id}`,
    image: `${base}${dest.headerImg}`,
    touristType: lang === 'en' ? ['Sailing tourism', 'Yacht charter', 'Water sports'] : ['Segeltourismus', 'Yachtcharter', 'Wassersport'],
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? `Sailing holiday ${dest.name}` : `Segelurlaub ${dest.name}`}
        description={description}
        image={dest.headerImg}
        schema={schema}
      />
      <DestinationDetail dest={dest} onBack={() => navigate(lang === 'en' ? '/en/destinations' : '/destinationen')} />
    </main>
  )
}
