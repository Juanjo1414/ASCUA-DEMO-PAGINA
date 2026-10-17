/**
 * @file buildMenuView.ts
 * @description Caso de uso para transformar el modelo del restaurante en un modelo de vista para la UI.
 *
 * Aplica traducción de textos al idioma activo, formateo de precios en pesos colombianos,
 * resolución de disponibilidad desde el almacén de agotados y pre-cálculo del modo AR para cada plato.
 */

import {
  selectArLaunchMode,
  type ArLaunchMode,
  type DeviceCapabilities,
} from '@/domain/ar'
import { formatCopPrice } from '@/domain/price'
import type { Restaurant } from '@/domain/restaurant'
import type { Dish } from '@/domain/dish'
import type { SoldOutStore } from '../ports/soldOutStore'

export interface DishViewModel {
  id: string
  nombre: string
  descripcion?: string
  precioRaw: number
  precioFormateado: string
  foto: string
  modelo: Dish['modelo']
  temperatura?: number
  isSoldOut: boolean
  arLaunchMode: ArLaunchMode
  canViewAr: boolean
}

export interface CategoryViewModel {
  id: string
  nombre: string
  platos: DishViewModel[]
}

export interface MenuViewModel {
  restaurantNombre: string
  restaurantSlug: string
  categorias: CategoryViewModel[]
  totalPlatos: number
  totalPlatosConAr: number
}

/**
 * Transforma las categorías y platos de un restaurante para su renderizado en la presentación.
 *
 * @param restaurant - Entidad del restaurante.
 * @param device - Capacidades técnicas del dispositivo del comensal.
 * @param soldOutStore - Almacén de platos agotados (opcional; si no se provee usa el valor del JSON).
 * @param lang - Idioma seleccionado ('es' o 'en').
 */
export function buildMenuView(
  restaurant: Restaurant,
  device: DeviceCapabilities,
  soldOutStore?: SoldOutStore,
  lang: 'es' | 'en' = 'es'
): MenuViewModel {
  let totalPlatos = 0
  let totalPlatosConAr = 0

  const categorias: CategoryViewModel[] = restaurant.categorias.map(
    (categoria) => {
      const categoriaNombre =
        lang === 'en' && categoria.nombre.en
          ? categoria.nombre.en
          : categoria.nombre.es

      const platos: DishViewModel[] = categoria.platos.map((plato) => {
        totalPlatos++

        const platoNombre =
          lang === 'en' && plato.nombre.en ? plato.nombre.en : plato.nombre.es

        const platoDescripcion = plato.descripcion
          ? lang === 'en' && plato.descripcion.en
            ? plato.descripcion.en
            : plato.descripcion.es
          : undefined

        const isSoldOut = soldOutStore
          ? soldOutStore.isSoldOut(restaurant.slug, plato.id)
          : plato.agotado

        const arLaunchMode = selectArLaunchMode(device, plato.modelo)
        const canViewAr = arLaunchMode !== 'unsupported'

        if (canViewAr) {
          totalPlatosConAr++
        }

        return {
          id: plato.id,
          nombre: platoNombre,
          descripcion: platoDescripcion,
          precioRaw: plato.precio,
          precioFormateado: formatCopPrice(plato.precio),
          foto: plato.foto,
          modelo: plato.modelo,
          temperatura: plato.temperatura,
          isSoldOut,
          arLaunchMode,
          canViewAr,
        }
      })

      return {
        id: categoria.id,
        nombre: categoriaNombre,
        platos,
      }
    }
  )

  return {
    restaurantNombre: restaurant.nombre,
    restaurantSlug: restaurant.slug,
    categorias,
    totalPlatos,
    totalPlatosConAr,
  }
}
