import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'

export default function Hero() {
  const { t, lang } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)

  if (!restaurant) return null

  const bgImage =
    restaurant.heroImagen || restaurant.categorias?.[0]?.platos?.[0]?.foto
  const eslogan =
    restaurant.eslogan?.[lang as 'es' | 'en'] || restaurant.eslogan?.['es']

  return (
    <section
      id="top"
      className="relative h-[100svh] min-h-[600px] w-full bg-deep-forest"
    >
      {/* Full-Bleed Background Image or Solid Color */}
      {bgImage && (
        <img
          src={bgImage}
          alt={restaurant.nombre}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Text Overlay Panel */}
      <div className="absolute bottom-0 left-0 sm:left-10 sm:bottom-10 w-full sm:w-auto sm:max-w-xl bg-cream-canvas/95 p-[40px]">
        {eslogan && <p className="eyebrow">{eslogan}</p>}
        <h1 className="font-display text-display-lg leading-display-lg text-forest-shadow mb-[24px]">
          {restaurant.nombre}
        </h1>

        <a href="#menu" className="btn-primary w-full sm:w-auto">
          {t.hero?.cta || 'Ver Menú'}
          <ArrowRight size={16} strokeWidth={2} />
        </a>
      </div>
    </section>
  )
}
