import SEO from '../components/SEO'
import Yachten from '../components/Yachten'

export default function YachtenPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Segelyachten, Katamarane & Motoryachten"
        description="Unsere Flotte: Segelyachten (Monohull), Segel-Katamarane, Motoryachten und Motor-Katamarane von 35 bis 55 Fuß. Dufour, Bavaria, Lagoon, Bali und mehr – weltweit verfügbar."
        canonical="/yachten"
        image="/images/yachten/monohull.jpg"
      />
      <Yachten />
    </main>
  )
}
