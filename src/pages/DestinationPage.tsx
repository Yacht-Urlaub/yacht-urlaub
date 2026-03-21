import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import DestinationDetail, { destinations } from '../components/DestinationDetail'

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

  return (
    <main style={{ paddingTop: '72px' }}>
      <DestinationDetail dest={dest} onBack={() => navigate('/destinationen')} />
    </main>
  )
}
