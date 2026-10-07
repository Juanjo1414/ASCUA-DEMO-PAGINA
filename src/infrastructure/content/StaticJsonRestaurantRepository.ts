import type { RestaurantRepository } from '@/application/ports/restaurantRepository'
import {
  type Restaurant,
  RESTAURANT_SLUG_REGEX,
  restaurantSchema,
  resolveAssetUrls,
} from '@/domain/restaurant'

export class StaticJsonRestaurantRepository implements RestaurantRepository {
  async getBySlug(slug: string): Promise<Restaurant | null> {
    // 1. Guardia de seguridad: previene path traversal y slugs inválidos
    if (!RESTAURANT_SLUG_REGEX.test(slug)) {
      return null
    }

    try {
      // 2. Fetch de datos en ruta estática esperada: /data/<slug>/restaurant.json
      const response = await fetch(`/data/${slug}/restaurant.json`)

      if (!response.ok) {
        return null
      }

      const json = await response.json()

      // 3. Validación estricta con zod para que la UI nunca reciba datos con otra forma
      const parsed = restaurantSchema.safeParse(json)
      if (!parsed.success) {
        console.error(
          `Esquema inválido para el restaurante ${slug}:`,
          parsed.error.format()
        )
        return null
      }

      return resolveAssetUrls(parsed.data)
    } catch (e) {
      console.error(`Error al recuperar el restaurante ${slug}:`, e)
      return null
    }
  }
}
