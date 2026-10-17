/**
 * Portada de la landing del restaurante: su nombre grande sobre el mantel y
 * un plato de porcelana que "llega a la mesa", con su medida real dibujada
 * alrededor como en un plano.
 *
 * Lo usa `RestaurantPage`. Lee el restaurante activo de `restaurantAtom` y no
 * pinta nada hasta que existe. Si hay un plato estrella con modelo 3D aprobado
 * (y la foto de portada es la de ese plato), el botón principal es "Ver en mi
 * mesa" y la cota muestra su tamaño; si no, el botón lleva a la carta. Nunca
 * promete realidad aumentada que el plato no tiene.
 *
 * No abre la cámara por sí mismo: avisa a `Menu` con el evento
 * `EVENTO_VER_EN_MESA`, que es quien conoce el flujo completo (guía de 3 pasos).
 */
import { ArrowDown, Scan } from 'lucide-react'
import { useAtomValue } from 'jotai'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import {
  EVENTO_VER_EN_MESA,
  type VerEnMesaDetalle,
} from '@/presentation/state/arEvents'
import { selectStarDish } from '@/domain/dish'

export default function Hero() {
  const { t, lang } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)

  if (!restaurant) return null

  const primerPlato = restaurant.categorias?.[0]?.platos?.[0]
  const estrella = selectStarDish(restaurant.categorias ?? [])
  const imagen = restaurant.heroImagen || estrella?.foto || primerPlato?.foto
  // La promesa de AR solo se hace si la foto mostrada ES la del plato estrella.
  const mostrarAr =
    estrella !== undefined &&
    (!restaurant.heroImagen || restaurant.heroImagen === estrella.foto)
  const eslogan = restaurant.eslogan?.[lang] || restaurant.eslogan?.es
  const nombreEstrella = estrella?.nombre[lang] || estrella?.nombre.es

  const verEnMesa = () => {
    if (!estrella) return
    window.dispatchEvent(
      new CustomEvent<VerEnMesaDetalle>(EVENTO_VER_EN_MESA, {
        detail: { dishId: estrella.id },
      })
    )
  }

  return (
    <section
      id="top"
      data-superficie="mantel"
      className="relative overflow-hidden bg-mantel text-on-mantel"
    >
      <div className="pagina grid min-h-[100svh] items-center gap-10 pb-14 pt-28 md:grid-cols-[1.05fr_1fr] md:gap-8 lg:pt-32">
        <div className="hero-texto flex flex-col items-start gap-6">
          <h1 className="text-display [overflow-wrap:anywhere]">
            {restaurant.nombre}
          </h1>
          {eslogan && (
            <p className="max-w-[28ch] text-lead text-on-mantel-soft">
              {eslogan}
            </p>
          )}
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            {mostrarAr && (
              <button type="button" onClick={verEnMesa} className="btn-ar">
                <Scan size={20} strokeWidth={2.25} aria-hidden="true" />
                {t.ar.viewOnTable}
              </button>
            )}
            <a
              href="#menu"
              className={mostrarAr ? 'btn-secondary' : 'btn-porcelana'}
            >
              {t.hero.cta}
              <ArrowDown size={18} strokeWidth={2.25} aria-hidden="true" />
            </a>
          </div>
        </div>

        {imagen && (
          <figure className="hero-plato relative mx-auto w-[min(84vw,25rem)] md:w-full md:max-w-[34rem] md:justify-self-end">
            <div className="plato">
              <img
                src={imagen}
                alt={mostrarAr && nombreEstrella ? nombreEstrella : ''}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            {/* Anillo de la cota: se traza solo al entrar. Decorativo. */}
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[7%] h-[114%] w-[114%] -rotate-90 text-on-mantel/70"
            >
              <circle
                cx="50"
                cy="50"
                r="48.5"
                pathLength="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.35"
                strokeLinecap="round"
                className="hero-anillo"
              />
            </svg>
            {mostrarAr && estrella?.modelo && (
              <figcaption className="cota cifras mt-7 w-full justify-center text-on-mantel-soft">
                {t.hero.sizeReal.replace(
                  '{cm}',
                  String(estrella.modelo.escalaRealCm)
                )}
              </figcaption>
            )}
          </figure>
        )}
      </div>
    </section>
  )
}
