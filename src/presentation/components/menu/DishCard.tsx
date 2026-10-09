/**
 * Tarjeta de un plato en la carta: foto, nombre, descripción, precio y,
 * si tiene modelo 3D aprobado, los botones "Ver en mi mesa" (AR) y
 * "Ver en 3D". Lo usa `Menu.tsx` para cada plato.
 * No decide si el plato tiene AR: solo muestra los botones si
 * `dish.modelo.aprobado` ya es `true` (lo marca Juan tras su QA).
 */
import type { Dish } from '@/domain/dish'
import { formatCopPrice } from '@/domain/price'
import { ArrowRight, Scan } from 'lucide-react'

interface DishCardProps {
  dish: Dish
  lang: 'es' | 'en'
  t: { ar: { viewOnTable: string; view3d: string } }
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
      data-sube
      className={`flex flex-col relative ${isSoldOut ? 'opacity-60 grayscale' : ''}`}
    >
      {isSoldOut && (
        <span className="badge-online z-10 bg-warm-gray text-cream-canvas">
          Agotado
        </span>
      )}
      <div className="relative w-full aspect-square overflow-hidden rounded-images bg-cream-canvas">
        <img
          src={dish.foto}
          alt={nombre}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="pt-6 flex flex-col flex-grow">
        <h4 className="font-body font-bold text-[20px] text-forest-shadow leading-tight">
          {nombre}
        </h4>
        <p className="mt-2 font-body text-[16px] text-forest-shadow leading-body flex-grow">
          {descripcion}
        </p>
        <p className="mt-3 font-body font-bold text-forest-shadow">
          {formatCopPrice(dish.precio)}
        </p>

        {showArButtons && (
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => !isSoldOut && onArClick && onArClick(dish)}
              className="btn-primary w-full sm:w-auto"
            >
              <Scan size={18} className="mr-2" />
              {t.ar.viewOnTable}
            </button>
            <button
              type="button"
              disabled={isSoldOut}
              onClick={() => !isSoldOut && on3dClick && on3dClick(dish)}
              className="ghost-link"
            >
              {t.ar.view3d} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}
