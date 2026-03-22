import { useEffect } from 'react'
import SEO from '../components/SEO'
import DestinationenOverview from '../components/DestinationenOverview'

export default function DestinationenPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Segelreviere & Destinationen"
        description="Entdecken Sie unsere Segelreviere: Kroatien, Griechenland, Balearen, Karibik-BVI, Seychellen und Thailand. Alle Infos zu Routen, Highlights und der besten Reisezeit."
        canonical="/destinationen"
        image="/images/Destinationsbilder/Header/seychelles1.jpg"
      />
      <DestinationenOverview standalone />
    </main>
  )
}
