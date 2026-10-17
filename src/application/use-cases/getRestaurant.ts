/**
 * @file getRestaurant.ts
 * @description Caso de uso para obtener y verificar el estado comercial de un restaurante por su slug.
 *
 * Aplica la regla de seguridad y aislamiento: los slugs inválidos o con posible
 * path traversal son rechazados antes de consultar el repositorio. Además calcula si la
 * demo ya venció o se encuentra pausada.
 */

import {
  RESTAURANT_SLUG_REGEX,
  isRestaurantExpired,
  type Restaurant,
} from '@/domain/restaurant'
import type { RestaurantRepository } from '../ports/restaurantRepository'

export interface GetRestaurantResult {
  restaurant: Restaurant | null
  isFound: boolean
  isExpired: boolean
  isPaused: boolean
  canAccess: boolean
  errorMessage?: string
}

/**
 * Consulta un restaurante y evalúa sus reglas de acceso comercial.
 *
 * @param slug - Slug del restaurante a consultar.
 * @param repo - Repositorio de datos del restaurante.
 * @param now - Fecha de referencia para expiración (por defecto fecha actual).
 */
export async function getRestaurant(
  slug: string,
  repo: RestaurantRepository,
  now: Date = new Date()
): Promise<GetRestaurantResult> {
  // 1. Guardia de seguridad: rechaza slugs que no cumplan el formato estricto
  if (!RESTAURANT_SLUG_REGEX.test(slug)) {
    return {
      restaurant: null,
      isFound: false,
      isExpired: false,
      isPaused: false,
      canAccess: false,
      errorMessage:
        'El identificador del restaurante no es válido o carece del sufijo de seguridad.',
    }
  }

  // 2. Consulta en el repositorio
  const restaurant = await repo.getBySlug(slug)

  if (!restaurant) {
    return {
      restaurant: null,
      isFound: false,
      isExpired: false,
      isPaused: false,
      canAccess: false,
      errorMessage: 'El restaurante solicitado no fue encontrado.',
    }
  }

  // 3. Verificación de reglas comerciales de la demo
  const isExpired = isRestaurantExpired(restaurant.expira, now)
  const isPaused = restaurant.estado === 'pausado'
  const canAccess = !isExpired && !isPaused

  return {
    restaurant,
    isFound: true,
    isExpired,
    isPaused,
    canAccess,
    errorMessage: isExpired
      ? 'La demo comercial para este restaurante ha finalizado.'
      : isPaused
        ? 'La carta de este restaurante se encuentra temporalmente en pausa.'
        : undefined,
  }
}
