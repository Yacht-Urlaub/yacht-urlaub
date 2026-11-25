import { useLang, isEnHost, toInternal, stripEn, langPair, BASE_DE, BASE_EN } from '../i18n'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { trackPageView } from '../analytics'

type Props = {
  title: string
  description: string
  image?: string
  schema?: object
}

// Meta (Facebook/Instagram) Domain-Bestaetigung. Der Tag muss je Domain im
// statischen HTML stehen (Meta-Crawler fuehrt kein JS aus) -> er kommt ueber
// SEO.tsx und damit in die Prerender-Snapshots (EN-Seiten werden auf der
// EN-Domain gerendert, siehe scripts/prerender.cjs).
const META_DOMAIN_VERIFICATION = {
  de: 'sldowotg2xe7kom3os9688ag2vfyie', // yacht-urlaub.net
  en: 'gdfk400poxutd1yu7411x8kv7wxsn6', // yacht-holiday.net
}

const DEFAULT_IMAGE = '/images/Destinationsbilder/Header/seychelles1.jpg'

export default function SEO({ title, description, image, schema }: Props) {
  const lang = useLang()
  const { pathname } = useLocation()
  const base = isEnHost() ? BASE_EN : BASE_DE

  const brand = lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub'
  const fullTitle = title.includes('Yacht-Urlaub') || title.includes('Yacht-Holiday') ? title : `${title} | ${brand}`

  // Canonical aus der aufgerufenen Seite ableiten, nicht aus einem festen Wert.
  // Frueher trug jede englische Seite die deutsche Adresse als Canonical und
  // forderte Suchmaschinen damit auf, die englische Fassung nicht zu fuehren.
  // Ohne Query-String, damit z. B. /yachten?tab=katamaran auf /yachten zeigt.
  const path = pathname.replace(/\/+$/, '') || '/'
  const fullCanonical = `${base}${path}`

  // GA4-Seitenaufruf pro Seitenwechsel (nur mit Einwilligung, sonst no-op)
  useEffect(() => { trackPageView(fullTitle) }, [path, fullTitle])

  // hreflang: nur setzen, wenn es fuer diese Seite wirklich ein Gegenstueck gibt
  const pair = langPair(toInternal(pathname))

  // WhatsApp, iMessage und einige aeltere Social-Crawler zeigen WebP-
  // Vorschaubilder oft gar nicht an. og:image/twitter:image deshalb immer
  // auf ein gleichnamiges .jpg umbiegen — das muss als Datei existieren
  // (bei jedem neuen .webp-Bild, das als `image`-Prop verwendet wird, eine
  // .jpg-Fassung danebenlegen, z. B. per Pillow). Die Seite selbst darf
  // weiterhin ganz normal .webp anzeigen, nur dieser eine Verweis nicht.
  const rawImage = image ?? DEFAULT_IMAGE
  const ogSafeImage = rawImage.replace(/\.webp$/i, '.jpg')
  const fullImage = ogSafeImage.startsWith('http') ? ogSafeImage : `${base}${ogSafeImage}`

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />
      <meta name="facebook-domain-verification" content={META_DOMAIN_VERIFICATION[isEnHost() ? 'en' : 'de']} />

      {/* Sprachzuordnung ueber die beiden Domains hinweg */}
      {pair && <link rel="alternate" hrefLang="de" href={`${BASE_DE}${pair.de}`} />}
      {pair && <link rel="alternate" hrefLang="en" href={`${BASE_EN}${stripEn(pair.en)}`} />}
      {pair && <link rel="alternate" hrefLang="x-default" href={`${BASE_DE}${pair.de}`} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={lang === 'en' ? 'en_GB' : 'de_DE'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Structured data */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  )
}
