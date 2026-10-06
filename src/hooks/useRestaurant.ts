import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSetAtom } from 'jotai'
import { restaurantAtom } from '@/app/store'
import { useDependencies } from '@/app/DependenciesContext'
import { getRestaurant } from '@/application/use-cases/getRestaurant'

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
