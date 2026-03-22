import { Helmet } from 'react-helmet-async'

type Props = {
  title: string
  description: string
  canonical?: string
  image?: string
  schema?: object
}

const BASE_URL = 'https://www.yacht-urlaub.net'
const DEFAULT_IMAGE = '/images/Destinationsbilder/Header/seychelles1.jpg'

export default function SEO({ title, description, canonical, image, schema }: Props) {
  const fullTitle = title.includes('Yacht-Urlaub') ? title : `${title} | Yacht-Urlaub`
  const fullCanonical = `${BASE_URL}${canonical ?? ''}`
  const fullImage = image ?? DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
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
