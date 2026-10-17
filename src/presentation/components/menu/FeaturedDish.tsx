/**
 * Plato de "Lo más pedido": un círculo de porcelana grande sobre el mantel,
 * con nombre, precio y, si tiene modelo 3D aprobado, su medida real y los
 * botones "Ver en mi mesa" y "Girar en 3D".
 *
 * Lo usa `Destacados.tsx`. Es solo presentación: no decide si el plato tiene
 * AR (mira `dish.modelo.aprobado`, que marca Juan tras su QA) ni abre la
 * cámara; avisa con `onArClick` / `on3dClick`.
 */
import { ArrowRight, Scan } from 'lucide-react'
import type { Dish } from '@/domain/dish'
import { formatCopPrice } from '@/domain/price'

interface FeaturedDishProps {
  dish: Dish
  lang: 'es' | 'en'
  t: {
    ar: { viewOnTable: string; view3d: string }
    hero: { sizeReal: string }
    menuSection: { soldOut: string }
  }
  isSoldOut: boolean
  onArClick: (dish: Dish) => void
  on3dClick: (dish: Dish) => void
}

export function FeaturedDish({
  dish,
  lang,
  t,
  isSoldOut,
  onArClick,
  on3dClick,
}: FeaturedDishProps) {
  const nombre = dish.nombre[lang] || dish.nombre.es
  const tieneAr = dish.modelo?.aprobado === true

  return (
    <li
      data-reveal
      className={`flex w-[72vw] max-w-72 shrink-0 snap-start flex-col gap-5 md:w-auto md:max-w-none ${
        isSoldOut ? 'opacity-70' : ''
      }`}
    >
      <div className="plato">
        <img
          src={dish.foto}
          alt={nombre}
          loading="lazy"
          className="h-full w-full rounded-full object-cover"
        />
        {isSoldOut && (
          <span className="sello absolute left-1/2 top-4 -translate-x-1/2">
            {t.menuSection.soldOut}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-1 text-center">
        <h3 className="text-h3">{nombre}</h3>
        <p className="cifras font-bold text-on-mantel-soft">
          {formatCopPrice(dish.precio)}
        </p>
        {tieneAr && dish.modelo && (
          <p className="cota cifras mt-2 justify-center text-on-mantel-soft">
            {t.hero.sizeReal.replace('{cm}', String(dish.modelo.escalaRealCm))}
          </p>
        )}
      </div>

      {tieneAr && (
        <div className="flex flex-col items-stretch gap-1">
          <button
            type="button"
            disabled={isSoldOut}
            onClick={() => onArClick(dish)}
            className="btn-ar disabled:opacity-50"
          >
            <Scan size={20} strokeWidth={2.25} aria-hidden="true" />
            {t.ar.viewOnTable}
          </button>
          <button
            type="button"
            disabled={isSoldOut}
            onClick={() => on3dClick(dish)}
            className="enlace justify-center disabled:opacity-50"
          >
            {t.ar.view3d}
            <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
          </button>
        </div>
      )}
    </li>
  )
}
