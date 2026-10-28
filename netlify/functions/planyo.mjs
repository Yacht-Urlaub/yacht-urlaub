// Netlify Function: Brücke zwischen Website und Planyo-REST-API
//
// Der Browser spricht nie direkt mit Planyo, sondern nur mit dieser
// Function. So bleibt der API-Key auf dem Server, und es sind nur die
// Methoden und Parameter erreichbar, die hier freigegeben sind (bisher nur
// lesende — Buchungen anlegen kommt erst, wenn das Modul steht).
//
// Aufruf:  GET /.netlify/functions/planyo?method=<methode>&<parameter>&lang=de|en
// Antwort: { ok: true, data } bzw. { ok: false, error } — "data" ist das
//          unveränderte data-Feld der Planyo-Antwort.
//
// Umgebung (Netlify → Site configuration → Environment variables):
//   PLANYO_API_KEY   Pflicht. REST-API-Key aus Planyo (Integrationen → API),
//                    NICHT der MCP-Key — das sind zwei verschiedene Schlüssel.
//   PLANYO_HASH_KEY  Nur nötig, wenn in Planyo "Hash-Key verwenden" an ist.
//   PLANYO_SITE_ID   Vorgabe 46954.
//   PLANYO_SANDBOX   "1" = gegen sandbox.planyo.com statt www.planyo.com.
//                    Dann auch PLANYO_API_KEY (und ggf. PLANYO_SITE_ID) der
//                    Sandbox eintragen. In Netlify am besten nur für den
//                    Kontext "Deploy Previews" setzen, nie für Production.
//
// Doku der API-Methoden: https://www.planyo.com/api.php

import { createHash } from 'node:crypto'


const DATUM = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}(:\d{2})?)?$/
const ZAHL = /^\d{1,10}$/
const MENGE = (v) => ZAHL.test(v) && Number(v) >= 1 && Number(v) <= 50

// Freigegebene Methoden und je Methode die erlaubten Parameter mit Prüfung.
// Alles, was hier nicht steht, wird abgewiesen.
const METHODEN = {
  api_test: {},
  list_resources: { detail_level: ZAHL },
  get_resource_info: { resource_id: ZAHL },
  resource_search: { start_time: DATUM, end_time: DATUM, quantity: MENGE },
  get_rental_price: { resource_id: ZAHL, start_time: DATUM, end_time: DATUM, quantity: MENGE },
  get_resource_usage: { resource_id: ZAHL, start_time: DATUM, end_time: DATUM },
}

// Methoden, denen die Site-ID mitgegeben wird
const MIT_SITE_ID = new Set(['list_resources', 'resource_search'])

function pruefe(regel, wert) {
  return typeof regel === 'function' ? regel(wert) : regel.test(wert)
}

export default async (req) => {
  const json = (obj, status = 200, cache = 'no-store') =>
    new Response(JSON.stringify(obj), {
      status,
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache },
    })

  if (req.method !== 'GET') return json({ ok: false, error: 'Nur GET erlaubt' }, 405)

  const apiKey = process.env.PLANYO_API_KEY
  if (!apiKey) {
    console.error('planyo: PLANYO_API_KEY fehlt')
    return json({ ok: false, error: 'Planyo ist nicht konfiguriert' }, 500)
  }

  const endpoint = process.env.PLANYO_SANDBOX === '1'
    ? 'https://sandbox.planyo.com/rest/'
    : 'https://www.planyo.com/rest/'

  const url = new URL(req.url)
  const method = url.searchParams.get('method') || ''
  const erlaubt = METHODEN[method]
  if (!erlaubt) return json({ ok: false, error: 'Methode nicht erlaubt' }, 400)

  const params = new URLSearchParams({ method, api_key: apiKey })
  params.set('language', url.searchParams.get('lang') === 'en' ? 'EN' : 'DE')
  if (MIT_SITE_ID.has(method)) params.set('site_id', process.env.PLANYO_SITE_ID || '46954')

  for (const [name, wert] of url.searchParams) {
    if (name === 'method' || name === 'lang') continue
    const regel = erlaubt[name]
    if (!regel) return json({ ok: false, error: `Parameter nicht erlaubt: ${name}` }, 400)
    if (!pruefe(regel, wert)) return json({ ok: false, error: `Ungültiger Wert für ${name}` }, 400)
    params.set(name, wert)
  }

  const hashKey = process.env.PLANYO_HASH_KEY
  if (hashKey) {
    const ts = String(Math.floor(Date.now() / 1000))
    params.set('hash_timestamp', ts)
    params.set('hash_key', createHash('md5').update(hashKey + ts + method).digest('hex'))
  }

  let antwort
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: params,
      signal: AbortSignal.timeout(15000),
    })
    antwort = await res.json()
  } catch (err) {
    console.error('planyo: Anfrage fehlgeschlagen', method, err)
    return json({ ok: false, error: 'Planyo nicht erreichbar' }, 502)
  }

  // Planyo meldet Erfolg mit response_code 0
  if (antwort?.response_code !== 0) {
    console.error('planyo: Fehler', method, antwort?.response_code, antwort?.response_message)
    return json({ ok: false, error: antwort?.response_message || 'Planyo-Fehler' }, 502)
  }

  // Kurz im Netlify-CDN zwischenspeichern: Verfügbarkeiten ändern sich nicht
  // im Sekundentakt, und so geht nicht jeder Seitenaufruf bis zu Planyo.
  return json({ ok: true, data: antwort.data }, 200, 'public, max-age=0, s-maxage=300')
}
