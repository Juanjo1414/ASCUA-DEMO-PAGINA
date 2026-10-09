/**
 * Panel flotante para que Juan marque platos como agotados en vivo mientras
 * le muestra la demo a un restaurante (no es una función para el comensal
 * final, sino una herramienta de presentación).
 *
 * Lo usa `RestaurantPage`. Guarda el estado con `SoldOutStore` (localStorage
 * por restaurante) y avisa a `Menu`/`DishCard` del cambio con el evento
 * `ascua:soldout-changed`, en vez de forzar un recargo de toda la página.
 */
import { useState } from 'react'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { useDependencies } from '@/presentation/state/DependenciesContext'
import { toggleSoldOut } from '@/application/use-cases/toggleSoldOut'

export default function DemoPanel() {
  const restaurant = useAtomValue(restaurantAtom)
  const { soldOutStore } = useDependencies()
  const [isOpen, setIsOpen] = useState(false)
  // Solo guardamos lo que el usuario cambia con los botones. El valor base de cada
  // plato se lee del store al renderizar: así no hace falta un efecto que llame
  // a setState (provoca renders en cascada) para copiar el store al estado.
  const [cambios, setCambios] = useState<Record<string, boolean>>({})

  if (!restaurant) return null

  const estaAgotado = (dishId: string): boolean =>
    cambios[dishId] ?? soldOutStore.isSoldOut(restaurant.slug, dishId)

  const handleToggle = (dishId: string) => {
    const isNowSoldOut = toggleSoldOut(restaurant.slug, dishId, soldOutStore)
    setCambios((prev) => ({ ...prev, [dishId]: isNowSoldOut }))
    // Despachamos un evento para que el Menu u otros componentes se actualicen si es necesario.
    window.dispatchEvent(
      new CustomEvent('ascua:soldout-changed', {
        detail: { dishId, isNowSoldOut },
      })
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 text-forest-shadow">
      {isOpen && (
        <div className="bg-cream-canvas p-4 shadow-xl max-h-[60vh] overflow-y-auto w-80 text-sm">
          <h3 className="font-bold mb-4 uppercase tracking-wider text-xs">
            Modo Presentación: Agotados
          </h3>
          {restaurant.categorias.map((cat) => (
            <div key={cat.id} className="mb-4">
              <h4 className="font-medium text-slate-gray mb-2">
                {cat.nombre.es || cat.nombre.en}
              </h4>
              <ul className="space-y-2">
                {cat.platos.map((plato) => (
                  <li
                    key={plato.id}
                    className="flex justify-between items-center border-b border-warm-gray/20 pb-1"
                  >
                    <span className="truncate pr-2">
                      {plato.nombre.es || plato.nombre.en}
                    </span>
                    <button
                      onClick={() => handleToggle(plato.id)}
                      className={`px-2 py-1 text-xs transition-colors ${
                        estaAgotado(plato.id)
                          ? 'bg-deep-forest text-cream-canvas'
                          : 'bg-warm-sand text-forest-shadow'
                      }`}
                    >
                      {estaAgotado(plato.id) ? 'Agotado' : 'Disponible'}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-deep-forest text-cream-canvas px-4 py-2 font-medium shadow-lg hover:bg-lime-glow hover:text-forest-shadow transition-colors"
      >
        {isOpen ? 'Cerrar Panel' : 'Panel Demo'}
      </button>
    </div>
  )
}
