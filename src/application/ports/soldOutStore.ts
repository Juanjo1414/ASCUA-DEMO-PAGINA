/**
 * @file soldOutStore.ts
 * @description Puerto (interfaz) para persistir y consultar el estado de platos agotados.
 *
 * Permite que los meseros o dueños del restaurante en la demo marquen platos como agotados
 * (guardado en memoria, localStorage o almacenamiento temporal) sin alterar el JSON estático.
 */

/**
 * Puerto para la gestión del estado de disponibilidad/agotado de los platos.
 */
export interface SoldOutStore {
  /**
   * Consulta si un plato específico está marcado como agotado.
   *
   * @param slug - Identificador del restaurante.
   * @param dishId - Identificador del plato (ej: 'asado-tira').
   */
  isSoldOut(slug: string, dishId: string): boolean

  /**
   * Actualiza el estado de disponibilidad de un plato.
   *
   * @param slug - Identificador del restaurante.
   * @param dishId - Identificador del plato.
   * @param soldOut - true si se agotó, false si está disponible.
   */
  setSoldOut(slug: string, dishId: string, soldOut: boolean): void

  /**
   * Alterna el estado de disponibilidad del plato y retorna el nuevo estado.
   *
   * @param slug - Identificador del restaurante.
   * @param dishId - Identificador del plato.
   * @returns El nuevo estado (true si quedó agotado, false si disponible).
   */
  toggleSoldOut(slug: string, dishId: string): boolean
}
