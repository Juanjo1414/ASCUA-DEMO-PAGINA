/**
 * Fila de un plato en la carta: foto redonda, nombre, descripción, precio y,
 * si tiene modelo 3D aprobado, su medida real y los botones "Ver en mi mesa"
 * (AR) y "Girar en 3D". Lo usa `Menu.tsx` para cada plato de la carta.
 *
 * No decide si el plato tiene AR: solo muestra los botones si
 * `dish.modelo.aprobado` ya es `true` (lo marca Juan tras su QA). Es una
 * fila (no una tarjeta) para que en celular se lean muchos platos seguidos
 * sin perder la foto.
 */
import { ArrowRight, Scan } from 'lucide-react'
import type { Dish } from '@/domain/dish'
import { formatCopPrice } from '@/domain/price'

interface DishCardProps {
  dish: Dish
  lang: 'es' | 'en'
  t: {
    ar: { viewOnTable: string; view3d: string }
    hero?: { sizeReal: string }
    menuSection?: { soldOut: string }
  }
  isSoldOut: boolean
  onArClick?: (dish: Dish) => void
  on3dClick?: (dish: Dish) => void
}

export function DishCard({
  dish,
  lang,
  t,
  isSoldOut,
  onArClick,
  on3dClick,
}: DishCardProps) {
  const nombre = dish.nombre[lang] || dish.nombre.es
  const descripcion = dish.descripcion
    ? dish.descripcion[lang] || dish.descripcion.es
    : null
  const showArButtons = dish.modelo && dish.modelo.aprobado

  return (
    <li
      data-reveal
      className={`flex gap-4 border-b border-linea py-6 sm:gap-6 ${
        isSoldOut ? 'opacity-60' : ''
      }`}
    >
      <img
        src={dish.foto}
        alt={nombre}
        loading="lazy"
        className="h-24 w-24 shrink-0 rounded-full bg-porcelana-dim object-cover shadow-hoja sm:h-32 sm:w-32"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-display text-xl font-bold leading-tight">
            {nombre}
          </h4>
          <p className="cifras shrink-0 font-bold">
            {formatCopPrice(dish.precio)}
          </p>
        </div>

        {descripcion && <p className="text-tinta-soft">{descripcion}</p>}

        {isSoldOut && (
          <span className="sello self-start">
            {t.menuSection?.soldOut ?? 'Agotado'}
          </span>
        )}

        {showArButtons && dish.modelo && (
          <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1">
            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => !isSoldOut && onArClick && onArClick(dish)}
              className="btn-ar disabled:opacity-50"
            >
              <Scan size={18} strokeWidth={2.25} aria-hidden="true" />
              {t.ar.viewOnTable}
            </button>
            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => !isSoldOut && on3dClick && on3dClick(dish)}
              className="enlace disabled:opacity-50"
            >
              {t.ar.view3d}
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </button>
            {t.hero && (
              <span className="cota cifras text-tinta-soft">
                {t.hero.sizeReal.replace(
                  '{cm}',
                  String(dish.modelo.escalaRealCm)
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </li>
  )
}
