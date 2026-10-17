/**
 * Sección "Lo más pedido": los platos que el restaurante marcó como
 * favoritos, grandes y sobre el mantel, con la acción de verlos en la mesa.
 *
 * Lo usa `Menu.tsx`, que es dueño del flujo de realidad aumentada y le pasa
 * las funciones para abrirlo. En celular es una fila que se desliza hacia el
 * lado (con un asomo del siguiente plato para que se note que hay más); desde
 * 768 px pasa a una cuadrícula. No se muestra si no hay platos destacados.
 */
import { ArrowRight } from 'lucide-react'
import type { Dish } from '@/domain/dish'
import type { translations } from '@/presentation/i18n/translations'
import { FeaturedDish } from './menu/FeaturedDish'

type Textos = (typeof translations)['es']

interface DestacadosProps {
  dishes: Dish[]
  lang: 'es' | 'en'
  t: Textos
  soldOut: Record<string, boolean>
  onArClick: (dish: Dish) => void
  on3dClick: (dish: Dish) => void
}

export default function Destacados({
  dishes,
  lang,
  t,
  soldOut,
  onArClick,
  on3dClick,
}: DestacadosProps) {
  if (dishes.length === 0) return null

  return (
    <section
      id="destacados"
      data-superficie="mantel"
      className="seccion bg-mantel text-on-mantel"
    >
      <div className="pagina">
        <div className="mb-10 flex max-w-2xl flex-col gap-3 md:mb-14">
          <h2 className="text-h2">{t.featured.heading}</h2>
          <p className="text-lead text-on-mantel-soft">{t.featured.lead}</p>
          {dishes.length > 1 && (
            <p className="mt-1 flex items-center gap-2 text-small font-bold text-on-mantel-soft md:hidden">
              {t.featured.hint}
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </p>
          )}
        </div>

        <ul className="no-scrollbar -mx-[var(--page-gutter)] flex scroll-px-[var(--page-gutter)] snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--page-gutter)] pb-6 md:mx-0 md:grid md:snap-none md:grid-cols-[repeat(auto-fit,minmax(15rem,19rem))] md:gap-x-8 md:gap-y-14 md:overflow-visible md:px-0 md:pb-0">
          {dishes.map((dish) => (
            <FeaturedDish
              key={dish.id}
              dish={dish}
              lang={lang}
              t={t}
              isSoldOut={!!soldOut[dish.id]}
              onArClick={onArClick}
              on3dClick={on3dClick}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
