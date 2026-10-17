/**
 * @file restaurantRepository.ts
 * @description Puerto (interfaz) para el acceso y recuperación de datos de restaurantes.
 *
 * Desacopla la lógica de negocio de la fuente de datos (archivos JSON estáticos,
 * memoria en pruebas, o APIs remotas en el futuro).
 */

import type { Restaurant } from '@/domain/restaurant'

/**
 * Puerto para consultar información de restaurantes por su slug público.
 */
export interface RestaurantRepository {
  /**
   * Obtiene la entidad Restaurante a partir de su slug.
   *
   * @param slug - Slug no adivinable del restaurante (ej: 'la-brasa-7k2p').
   * @returns La entidad Restaurante encontrada, o null si no existe.
   */
  getBySlug(slug: string): Promise<Restaurant | null>
}
