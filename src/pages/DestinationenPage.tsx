import { useEffect } from 'react'
import DestinationenOverview from '../components/DestinationenOverview'

export default function DestinationenPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <main style={{ paddingTop: '72px' }}>
      <DestinationenOverview standalone />
    </main>
  )
}
