import { atom } from 'jotai'
import type { Restaurant } from '@/domain/restaurant'

/**
 * Almacén global reactivo del restaurante actual.
 * Es el único punto de verdad en la UI para los datos estáticos del restaurante.
 * Inicia como `null` hasta que el enrutador o un componente contenedor
 * haga el fetch y lo inicialice.
 */
export const restaurantAtom = atom<Restaurant | null>(null)
