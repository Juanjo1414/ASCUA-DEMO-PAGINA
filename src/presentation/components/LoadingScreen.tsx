/**
 * Pantalla de carga inicial con el logo del restaurante, que se desliza
 * hacia arriba cuando el contenido ya está listo.
 *
 * Lo usa `RestaurantPage` mientras `useRestaurant` resuelve el fetch.
 * Respeta `prefers-reduced-motion`: si el comensal lo activó, desaparece de
 * inmediato en vez de animarse.
 */
import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'

/** @param isReady - Si ya hay datos del restaurante para mostrar la carta. */
export default function LoadingScreen({ isReady = true }) {
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
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-deep-forest transition-transform duration-700"
      style={{
        transform: fase === 'sube' ? 'translateY(-100%)' : 'translateY(0)',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div className="flex flex-col items-center">
        {restaurant?.tema?.logo ? (
          <img
            src={restaurant.tema.logo}
            alt={restaurant.nombre}
            className="h-16 w-auto object-contain"
          />
        ) : (
          <p className="font-body font-bold text-xl uppercase tracking-[0.5em] text-cream-canvas">
            {restaurant?.nombre || 'ascua'}
          </p>
        )}
      </div>
    </div>
  )
}
