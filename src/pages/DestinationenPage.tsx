import SEO from '../components/SEO'
import { useLang } from '../i18n'
import DestinationenOverview from '../components/DestinationenOverview'

export default function DestinationenPage() {
  const lang = useLang()
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? "Sailing areas & destinations | Yacht-Holiday" : "Segelreviere & Destinationen"}
        description="Entdecken Sie unsere Segelreviere: Kroatien, Griechenland, Balearen, Karibik-BVI, Seychellen und Thailand. Alle Infos zu Routen, Highlights und der besten Reisezeit."
        image="/images/Destinationsbilder/Header/seychelles1.jpg"
      />
      <DestinationenOverview standalone />
    </main>
  )
}
