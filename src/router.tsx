/**
 * Router-Huelle fuer den Zwei-Domain-Betrieb.
 *
 * Im Code stehen ueberall die internen Pfade mit /en-Praefix
 * (z. B. "/en/cruises"). Auf der englischen Domain muss in der Adresszeile
 * aber "/cruises" stehen. Diese Huelle rechnet das an genau einer Stelle um,
 * damit die rund 160 fest verdrahteten /en-Adressen im Code unveraendert
 * bleiben koennen.
 *
 * Verwendung: Link und Navigate NICHT direkt aus react-router-dom
 * importieren, sondern von hier. Der passende useNavigate-Hook liegt
 * aus Fast-Refresh-Gruenden in navigate.ts.
 */
import {
  Link as RouterLink,
  Navigate as RouterNavigate,
  type LinkProps,
  type NavigateProps,
  type To,
} from 'react-router-dom'
import { toHref } from './i18n'

function translate(to: To): To {
  return typeof to === 'string' ? toHref(to) : to
}

export function Link({ to, ...rest }: LinkProps) {
  return <RouterLink to={translate(to)} {...rest} />
}

export function Navigate({ to, ...rest }: NavigateProps) {
  return <RouterNavigate to={translate(to)} {...rest} />
}

