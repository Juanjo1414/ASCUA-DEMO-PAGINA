/**
 * Pantalla de carga inicial: el nombre del restaurante y un plato que se
 * dibuja sobre el mantel con "Preparando tu plato…". Cuando el contenido está
 * listo se desliza hacia arriba.
 *
 * Lo usa `RestaurantPage` mientras `useRestaurant` resuelve el fetch. Respeta
 * `prefers-reduced-motion`: si el comensal lo activó, desaparece de inmediato
 * en vez de animarse. Se monta dentro del contenedor `.tema`, así que ya usa
 * el color del restaurante.
 */
import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { useLanguage } from '@/presentation/i18n/useLanguage'

/** @param isReady - Si ya hay datos del restaurante para mostrar la carta. */
export default function LoadingScreen({ isReady = true }) {
  const { t } = useLanguage()
  const [reducido] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [fase, setFase] = useState(reducido ? 'fuera' : 'aparece')
  const restaurant = useAtomValue(restaurantAtom)

  useEffect(() => {
    if (reducido || !isReady) return
    const a = setTimeout(() => setFase('sube'), 900)
    const b = setTimeout(() => setFase('fuera'), 1650)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [reducido, isReady])

  if (fase === 'fuera') return null

  return (
    <div
      role="status"
      data-superficie="mantel"
      className="fixed inset-0 z-[100] grid place-items-center bg-mantel text-on-mantel transition-transform duration-700"
      style={{
        transform: fase === 'sube' ? 'translateY(-100%)' : 'translateY(0)',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div className="flex flex-col items-center gap-8 px-6 text-center">
        <svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          className="h-28 w-28 -rotate-90"
        >
          <circle
            cx="50"
            cy="50"
            r="46"
            pathLength="1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="hero-anillo"
          />
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
        <div className="flex flex-col gap-2">
          {restaurant && (
            <p className="font-display text-h3 font-bold">
              {restaurant.nombre}
            </p>
          )}
          <p className="text-on-mantel-soft">{t.loading}</p>
        </div>
      </div>
    </div>
  )
}
