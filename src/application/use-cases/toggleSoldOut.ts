/**
 * @file toggleSoldOut.ts
 * @description Caso de uso para alternar el estado de agotado de un plato en cocina.
 */

import type { SoldOutStore } from '../ports/soldOutStore'

/**
 * Alterna el estado de disponibilidad del plato en el almacén de agotados.
 *
 * @param dishId - Identificador del plato (ej: 'asado-tira').
 * @param store - Almacén de estado de agotados.
 * @returns El nuevo estado de disponibilidad (true si agotado, false si disponible).
 */
export function toggleSoldOut(dishId: string, store: SoldOutStore): boolean {
  if (!dishId || !dishId.trim()) {
    throw new Error('El identificador del plato es obligatorio')
  }

  return store.toggleSoldOut(dishId)
}
