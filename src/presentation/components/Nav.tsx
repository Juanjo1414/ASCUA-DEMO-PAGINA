/**
 * Barra superior fija de la landing: logo (o nombre) del restaurante, enlaces
 * a las secciones, cambio de idioma y el botón de reservar.
 *
 * Lo usa `RestaurantPage`. Sobre la portada es transparente y, al bajar, toma
 * el color del mantel para que el texto siempre se lea. El cambio de idioma
 * solo aparece si el restaurante ofrece más de uno (`restaurant.idiomas`): no
 * se muestra una opción que no hace nada.
 *
 * En celular no hay menú de hamburguesa a propósito: la página es un solo
 * recorrido y cada sección ya tiene su botón. Solo quedan lo esencial
 * (idioma y reservar). Los enlaces a secciones aparecen desde 768 px.
 */
import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import type { Lang } from '@/presentation/i18n/LanguageContext'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { hasArDishes } from '@/domain/dish'

const ENLACES = [
  { id: 'menu', clave: 'menu' },
  // Solo se muestra si el restaurante tiene algún plato con modelo AR
  // aprobado: la sección que señala (ComoFunciona.tsx) usa esta misma
  // condición para ocultarse, y sin ella el enlace apunta a un ancla que
  // no existe en la página (no hace nada al tocarlo).
  { id: 'como-funciona', clave: 'comoFunciona', requiereAr: true },
  { id: 'contacto', clave: 'contacto' },
] as const

export default function Nav() {
  const { lang, setLang, t } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)
  const [solido, setSolido] = useState(false)

  useEffect(() => {
    const alBajar = () => setSolido(window.scrollY > 24)
    alBajar()
    window.addEventListener('scroll', alBajar, { passive: true })
    return () => window.removeEventListener('scroll', alBajar)
  }, [])

  const otroIdioma =
    restaurant && restaurant.idiomas.length > 1
      ? (restaurant.idiomas.find((l) => l !== lang) ?? null)
      : null

  const tieneAr = restaurant ? hasArDishes(restaurant.categorias) : false
  const enlaces = ENLACES.filter(
    (enlace) => !('requiereAr' in enlace) || tieneAr
  )

  return (
    <header
      data-superficie="mantel"
      className={`fixed inset-x-0 top-0 z-50 text-on-mantel transition-colors duration-300 ${
        solido ? 'bg-mantel shadow-hoja' : 'bg-transparent'
      }`}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <nav
        aria-label={restaurant?.nombre}
        className="pagina flex h-16 items-center justify-between gap-3"
      >
        <a
          href="#top"
          aria-label={`${restaurant?.nombre ?? 'Ascua'}, ${t.nav.home}`}
          className="flex min-h-12 min-w-0 items-center"
        >
          {restaurant?.tema?.logo ? (
            <span className="flex items-center rounded-chip bg-porcelana px-4 py-1.5">
              <img
                src={restaurant.tema.logo}
                alt={restaurant.nombre}
                className="h-7 w-auto max-w-[9rem] object-contain"
              />
            </span>
          ) : (
            <span className="truncate font-display text-h3 font-bold">
              {restaurant?.nombre ?? 'Ascua'}
            </span>
          )}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {enlaces.map(({ id, clave }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex min-h-12 items-center rounded-chip px-4 font-bold hover:bg-on-mantel/10"
              >
                {t.nav[clave]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          {otroIdioma && (
            <button
              type="button"
              onClick={() => setLang(otroIdioma as Lang)}
              aria-label={
                otroIdioma === 'en' ? 'Switch to English' : 'Cambiar a español'
              }
              className="inline-flex h-12 min-w-12 items-center justify-center rounded-chip px-3 font-bold uppercase tracking-wider hover:bg-on-mantel/10"
            >
              {otroIdioma}
            </button>
          )}
          <a href="#reservar" className="btn-porcelana px-5">
            {t.nav.reservar}
          </a>
        </div>
      </nav>
    </header>
  )
}
