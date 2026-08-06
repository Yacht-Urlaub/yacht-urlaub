/**
 * Navigation fuer den Zwei-Domain-Betrieb.
 *
 * Gegenstueck zu router.tsx: dort die Komponenten (Link, Navigate), hier der
 * Hook. Getrennt, weil eine Datei entweder Komponenten oder sonstige Werte
 * exportieren sollte — sonst greift Fast Refresh im Dev-Server nicht mehr.
 */
import { useNavigate as useRouterNavigate, type NavigateOptions, type To } from 'react-router-dom'
import { toHref } from './i18n'

export function useNavigate() {
  const navigate = useRouterNavigate()
  return (to: To | number, options?: NavigateOptions) => {
    if (typeof to === 'number') return navigate(to)
    return navigate(typeof to === 'string' ? toHref(to) : to, options)
  }
}
