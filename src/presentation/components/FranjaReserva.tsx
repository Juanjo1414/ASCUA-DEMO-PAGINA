/**
 * Barra fija inferior en móvil con el horario del restaurante y un botón
 * directo a "Reservar". Aparece al hacer scroll y se oculta de nuevo cerca
 * del pie de página (para no tapar el pie con una barra redundante).
 *
 * Lo usa `RestaurantPage`. El horario mostrado es el real de
 * `restaurant.contacto.horario`, nunca un texto inventado.
 */
import { useEffect, useState } from 'react'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'

export default function FranjaReserva() {
  const { t } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const pie = document.querySelector('footer')
    const onScroll = () => {
      const enPie = pie
        ? pie.getBoundingClientRect().top < window.innerHeight
        : false
      setVisible(window.scrollY > 200 && !enPie)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-between gap-3 border-t border-deep-forest/10 bg-cream-canvas/95 backdrop-blur-md px-4 transition-[transform,opacity] duration-300 lg:hidden ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {restaurant?.contacto?.horario?.[0] && (
        <p className="eyebrow text-deep-forest hidden min-[440px]:block">
          {restaurant.contacto.horario[0]}
        </p>
      )}
      <a
        href="#reservar"
        className="btn-primary flex-1 min-[440px]:flex-none text-center"
      >
        {t.nav.reservar}
      </a>
    </div>
  )
}
