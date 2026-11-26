import { useEffect, useId, useRef, useState } from 'react'
import { Link } from '../../router'
import type { Model } from './data'
import './yachtmodelle.css'

/** Illustration, solange es kein eigenes Foto des Modells gibt. */
export function Illu({ m }: { m: Model }) {
  const gid = useId().replace(/:/g, '')
  const cat = m.typ === 'Katamaran'
  const mx = cat ? 290 : 300
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={`${m.name}, Illustration`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f2d47" /><stop offset=".7" stopColor="#0275b2" /><stop offset="1" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect width="600" height="400" fill={`url(#${gid})`} />
      <circle cx="470" cy="110" r="38" fill="#fbbf24" opacity=".9" />
      <rect y="300" width="600" height="100" fill="#071b2f" />
      <path d="M0 318c60-8 120 8 180 0s120-8 180 0 120 8 240 0" stroke="#0ea5e9" strokeWidth="3" fill="none" opacity=".5" />
      <path d={`M${mx} 70v${cat ? 212 : 226}`} stroke="#f8fafc" strokeWidth="5" />
      <path d={`M${mx - 6} 78L${mx - 118} ${cat ? 276 : 288}h112z`} fill="#f8fafc" />
      <path d={`M${mx + 6} 92L${mx + 110} ${cat ? 272 : 286}h-104z`} fill="#e0f2fe" />
      {cat ? (
        <>
          <path d="M150 292h330l-18 16H170z" fill="#0f2d47" /><path d="M120 304h330l-20 20H142z" fill="#e8eef4" />
          <path d="M175 304l20-30h200l30 30z" fill="#f8fafc" /><path d="M215 284h150" stroke="#0f2d47" strokeWidth="6" />
        </>
      ) : (
        <>
          <path d="M140 296h320c-20 22-60 30-140 30s-150-10-180-30z" fill="#0d1e2e" /><path d="M230 296l14-14h110l14 14z" fill="#e2e8f0" />
        </>
      )}
      <text x="300" y="370" textAnchor="middle" fill="#fff" fontFamily="DM Sans,sans-serif" fontSize="22" fontWeight="700" opacity=".85">{m.name}</text>
    </svg>
  )
}

/** Bild des Modells: lokal gespeichertes Werft-Foto, sonst Illustration. Es wird bewusst NICHTS direkt von YouTube/Matterport geladen: vor dem
 *  Klick darf keine Verbindung zu Dritten entstehen. */
export function Pic({ m, variant, eager, alt }: { m: Model; variant: 'card' | 'poster'; eager?: boolean; alt?: string }) {
  const [failed, setFailed] = useState(false)
  const src = variant === 'card' ? m.card : m.poster
  if (!src || failed) return <Illu m={m} />
  const len = String(m.len).replace('.', ',')
  const text = alt ?? (variant === 'card'
    ? `${m.name} – ${m.typ} von ${m.brand}, ${len} m`
    : `${m.name} – ${m.typ} von ${m.brand} zum Chartern`)
  // WebP zuerst (rund 40 % kleiner), JPG als Fallback; das JPG bleibt auch die og:image-Datei.
  const webp = src.replace(/\.jpe?g$/i, '.webp')
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={src} alt={text} onError={() => setFailed(true)} decoding="async"
        loading={eager ? 'eager' : 'lazy'} {...(eager ? { fetchPriority: 'high' as const } : {})}
        width={variant === 'card' ? 640 : 1280} height={variant === 'card' ? 400 : 720}
      />
    </picture>
  )
}

type EmbedProps =
  | { m: Model; kind: 'video'; id: string; title: string; by: string; eager?: boolean }
  | { m: Model; kind: 'tour'; id: string; title: string; by: string; eager?: boolean }

const YT_ORIGIN = 'https://www.youtube-nocookie.com'

/** YouTube-Player-Parameter: nur Wiedergabe, Lautstaerke, Qualitaet und Vollbild.
 *  controls=1 liefert genau diese Leiste; alles andere wird abgeschaltet bzw. verhindert:
 *  rel=0 (Empfehlungen nur vom eigenen Kanal, nie fremde), iv_load_policy=3 (keine Einblendungen),
 *  disablekb=1 (keine Tastenkuerzel), cc_load_policy=0 (keine Untertitel erzwingen), fs=1 (Vollbild erlaubt),
 *  playsinline=1. enablejsapi=1 + origin: damit meldet der Player per postMessage, wann das Video zu
 *  Ende ist (siehe Embed: dann wird der Player entfernt, es erscheinen keine Vorschlaege). */
function youtubeSrc(id: string) {
  const q = new URLSearchParams({
    autoplay: '1', rel: '0', iv_load_policy: '3', disablekb: '1', cc_load_policy: '0', fs: '1',
    playsinline: '1', modestbranding: '1', hl: 'de', enablejsapi: '1',
  })
  if (typeof window !== 'undefined') q.set('origin', window.location.origin)
  return `${YT_ORIGIN}/embed/${encodeURIComponent(id)}?${q.toString()}`
}

/** Video oder 3D-Rundgang: erst nach Klick wird der Anbieter geladen (YouTube im
 *  Datenschutzmodus bzw. Matterport). Das YouTube-Video laeuft in einem Sandbox-iframe ohne
 *  allow-popups: Links im Player (Titel, "Auf YouTube ansehen", Teilen, Spaeter ansehen) oeffnen
 *  nichts. Ist das Video zu Ende, wird der Player entfernt und das Vorschaubild mit Play-Knopf
 *  erscheint wieder - so zeigt YouTube nie seine Endbildschirm-Vorschlaege. */
export function Embed(p: EmbedProps) {
  const [on, setOn] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)
  const isTour = p.kind === 'tour'
  const src = isTour
    ? `https://my.matterport.com/show/?m=${encodeURIComponent(p.id)}&play=1&qs=1&brand=0`
    : youtubeSrc(p.id)

  useEffect(() => {
    if (!on || isTour) return
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YT_ORIGIN || e.source !== frame.current?.contentWindow) return
      let data: unknown = e.data
      if (typeof data === 'string') {
        try { data = JSON.parse(data) } catch { return }
      }
      const d = data as { event?: string; info?: unknown } | null
      // YT.PlayerState.ENDED === 0
      if (d && ((d.event === 'onStateChange' && d.info === 0) ||
        (d.event === 'infoDelivery' && (d.info as { playerState?: number } | undefined)?.playerState === 0))) {
        setOn(false)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [on, isTour])

  // Nach dem Laden beim Player anmelden, damit er Statusmeldungen (u. a. "Ende") schickt.
  const listen = () => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), YT_ORIGIN)
  }

  return (
    <div className="vid">
      {on ? (
        <iframe
          ref={frame}
          src={src}
          onLoad={isTour ? undefined : listen}
          title={isTour ? `3D-Rundgang: ${p.title}` : `Video: ${p.title}`}
          allow={isTour ? 'fullscreen; xr-spatial-tracking' : 'autoplay; encrypted-media; fullscreen'}
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          {...(isTour ? {} : { sandbox: 'allow-scripts allow-same-origin allow-presentation' })}
        />
      ) : (
        <>
          <Pic m={p.m} variant="poster" eager={p.eager} alt={p.eager ? undefined : ''} />
          <button className="play" type="button" onClick={() => setOn(true)}
            aria-label={isTour ? `3D-Rundgang starten: ${p.title}` : `Video abspielen: ${p.title}`}>
            <i aria-hidden="true" />
            <b>{isTour ? '3D-Rundgang starten' : p.title}</b>
            <small>{isTour ? `${p.title} · Matterport` : `${p.by} · YouTube`}</small>
          </button>
        </>
      )}
    </div>
  )
}

export function EmbedNote({ kind, dark }: { kind: 'video' | 'tour'; dark?: boolean }) {
  return (
    <p className={`privnote${dark ? ' dk' : ''}`}>
      {kind === 'tour'
        ? 'Mit dem Klick laden Sie den 3D-Rundgang von Matterport. Dabei werden Daten an Matterport übertragen. '
        : 'Mit dem Klick laden Sie das Video von YouTube (Datenschutzmodus). Dabei werden Daten an YouTube übertragen. '}
      <Link to="/datenschutz">Mehr in der Datenschutzerklärung</Link>.
    </p>
  )
}

const ICONS: Record<string, string> = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  wave: 'M3 12c3-3 6-3 9 0s6 3 9 0M3 17c3-3 6-3 9 0s6 3 9 0',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  anchor: 'M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM12 7v14M5 13a7 7 0 0 0 14 0M8 10h8',
  door: 'M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17M3 21h18M14 12h1',
  bed: 'M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11a1.5 1.5 0 1 0 0-.01',
}

export function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[name] || ICONS.wave} /></svg>
  )
}
