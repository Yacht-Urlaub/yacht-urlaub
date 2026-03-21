import { useEffect } from 'react'
import Yachten from '../components/Yachten'

export default function YachtenPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <main style={{ paddingTop: '72px' }}>
      <Yachten />
    </main>
  )
}
