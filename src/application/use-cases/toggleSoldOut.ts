/**
 * @file toggleSoldOut.ts
 * @description Caso de uso para alternar el estado de agotado de un plato en cocina.
 */

import type { SoldOutStore } from '../ports/soldOutStore'

/**
 * Alterna el estado de disponibilidad del plato en el almacén de agotados.
 *
 * @param slug - Identificador del restaurante.
 * @param dishId - Identificador del plato (ej: 'asado-tira').
 * @param store - Almacén de estado de agotados.
 * @returns El nuevo estado de disponibilidad (true si agotado, false si disponible).
 */
export function toggleSoldOut(
  slug: string,
  dishId: string,
  store: SoldOutStore
): boolean {
  if (!slug || !slug.trim()) {
    throw new Error('El slug del restaurante es obligatorio')
  }
  if (!dishId || !dishId.trim()) {
    throw new Error('El identificador del plato es obligatorio')
  }

  return store.toggleSoldOut(slug, dishId)
}
