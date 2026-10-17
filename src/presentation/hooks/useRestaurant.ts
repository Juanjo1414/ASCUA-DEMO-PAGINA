/**
 * Hook que carga el restaurante activo a partir del slug de la URL.
 *
 * Lo usa `RestaurantPage` al montarse. Llama al caso de uso `getRestaurant`,
 * guarda el resultado en `restaurantAtom` (el único punto de verdad de la UI
 * para los datos del restaurante) y redirige según lo que responda:
 * `/404` si el slug no existe, `/expirado` si ya venció su autorización.
 */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { useDependencies } from '@/presentation/state/DependenciesContext'
import { getRestaurant } from '@/application/use-cases/getRestaurant'

/**
 * @param slug - Slug del restaurante tomado de la ruta `/r/:slug`.
 * @returns `isLoading` mientras se resuelve, y `error` si el caso de uso lanzó una excepción inesperada.
 */
export function useRestaurant(slug: string | undefined) {
  const navigate = useNavigate()
  const setRestaurant = useSetAtom(restaurantAtom)
  const { restaurantRepository } = useDependencies()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) {
      navigate('/')
      return
    }

    let isMounted = true

    async function fetchRestaurant() {
      setIsLoading(true)
      try {
        const result = await getRestaurant(slug!, restaurantRepository)

        if (!isMounted) return

        if (!result.isFound) {
          navigate('/404', { replace: true })
          return
        }

        if (!result.canAccess) {
          navigate('/expirado', { replace: true })
          return
        }

        if (result.restaurant) {
          setRestaurant(result.restaurant)
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchRestaurant()

    return () => {
      isMounted = false
    }
  }, [slug, restaurantRepository, navigate, setRestaurant])

  return { isLoading, error }
}
