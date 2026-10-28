/**
 * Zugriff auf Planyo aus dem Browser.
 *
 * Läuft immer über die Netlify-Function `planyo` (netlify/functions/planyo.mjs),
 * die den API-Key hält und nur freigegebene, lesende Methoden durchlässt.
 * Grundlage für das kommende Buchungsmodul.
 */
import type { Lang } from '../i18n'

export type PlanyoMethod =
  | 'api_test'
  | 'list_resources'
  | 'get_resource_info'
  | 'resource_search'
  | 'get_rental_price'
  | 'get_resource_usage'

export class PlanyoError extends Error {}

export async function planyo<T = unknown>(
  method: PlanyoMethod,
  params: Record<string, string | number> = {},
  lang: Lang = 'de',
): Promise<T> {
  const qs = new URLSearchParams({ method, lang })
  for (const [k, v] of Object.entries(params)) qs.set(k, String(v))

  let body: { ok: boolean; data?: T; error?: string }
  try {
    const res = await fetch(`/.netlify/functions/planyo?${qs}`)
    body = await res.json()
  } catch {
    throw new PlanyoError('Planyo nicht erreichbar')
  }
  if (!body.ok) throw new PlanyoError(body.error || 'Planyo-Fehler')
  return body.data as T
}
