/**
 * Sección "Tu plato, en tu mesa": explica en 3 pasos ilustrados cómo ver un
 * plato en realidad aumentada. Es la misma guía que se muestra antes de abrir
 * la cámara (`t.arGuide.steps`), pero visible en la página para que el
 * comensal entienda el producto sin que nadie se lo explique.
 *
 * Lo usa `RestaurantPage`. No se muestra si el restaurante todavía no tiene
 * ningún plato con modelo 3D aprobado (no se explica algo que no existe).
 * Las ilustraciones son dibujos propios en un solo trazo, no íconos genéricos.
 */
import { useAtomValue } from 'jotai'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { hasArDishes } from '@/domain/dish'

/** Trazo común de las tres ilustraciones. */
const TRAZO = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

/** Paso 1: la mesa vista desde arriba, con el visor apuntando al centro. */
const PasoMesa = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true" className="h-full w-full">
    <rect x="14" y="26" width="92" height="68" rx="10" {...TRAZO} />
    <circle cx="60" cy="60" r="17" strokeDasharray="4 6" {...TRAZO} />
    <path d="M30 40v-6h6M90 40v-6h-6M30 80v6h6M90 80v6h-6" {...TRAZO} />
  </svg>
)

/** Paso 2: el celular dibujando círculos pequeños sobre la mesa. */
const PasoCelular = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true" className="h-full w-full">
    <rect x="42" y="14" width="36" height="62" rx="8" {...TRAZO} />
    <path d="M56 22h8" {...TRAZO} />
    <path d="M24 98c10-12 62-12 72 0" strokeDasharray="1 7" {...TRAZO} />
    <path d="M90 90l6 8-9 3" {...TRAZO} />
  </svg>
)

/** Paso 3: el plato en su sitio y alguien rodeándolo para verlo entero. */
const PasoPlato = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true" className="h-full w-full">
    <circle cx="60" cy="60" r="24" {...TRAZO} />
    <circle cx="60" cy="60" r="12" {...TRAZO} />
    <circle cx="60" cy="60" r="44" strokeDasharray="2 8" {...TRAZO} />
    <circle cx="104" cy="60" r="5" fill="currentColor" />
  </svg>
)

const ILUSTRACIONES = [PasoMesa, PasoCelular, PasoPlato]

export default function ComoFunciona() {
  const { t } = useLanguage()
  const restaurant = useAtomValue(restaurantAtom)

  if (!restaurant || !hasArDishes(restaurant.categorias)) return null

  return (
    <section id="como-funciona" className="seccion bg-porcelana-dim text-tinta">
      <div className="pagina">
        <div className="mb-12 flex max-w-2xl flex-col gap-3 md:mb-16">
          <h2 className="text-h2">{t.howItWorks.heading}</h2>
          <p className="text-lead text-tinta-soft">{t.howItWorks.lead}</p>
        </div>

        <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
          {t.arGuide.steps.map((paso, i) => {
            const Ilustracion = ILUSTRACIONES[i]
            return (
              <li
                key={paso.title}
                data-reveal
                className="flex gap-5 md:flex-col md:gap-6"
              >
                <div className="h-24 w-24 shrink-0 text-tinta md:h-36 md:w-36">
                  {Ilustracion && <Ilustracion />}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3">
                    <span className="cifras text-tinta-soft">{i + 1}. </span>
                    {paso.title}
                  </h3>
                  <p className="text-tinta-soft">{paso.desc}</p>
                </div>
              </li>
            )
          })}
        </ol>

        <p className="cota mt-12 text-tinta-soft">{t.howItWorks.note}</p>
      </div>
    </section>
  )
}
