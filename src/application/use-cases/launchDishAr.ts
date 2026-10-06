/**
 * @file launchDishAr.ts
 * @description Caso de uso para orquestar la apertura del modelo 3D o Realidad Aumentada de un plato.
 *
 * Integra la detección de capacidades, la política de selección de modo, la emisión de eventos
 * analíticos y la invocación del lanzador concreto.
 */

import { selectArLaunchMode } from '@/domain/ar'
import type { Dish } from '@/domain/dish'
import type { EnvironmentDetector } from '../ports/environmentDetector'
import type { ArLauncher, ArLauncherResult } from '../ports/arLauncher'
import type { AnalyticsTracker } from '../ports/analyticsTracker'

export interface LaunchDishArParams {
  dish: Dish
  restaurantSlug: string
  detector: EnvironmentDetector
  launcher: ArLauncher
  analytics?: AnalyticsTracker
}

/**
 * Orquesta el proceso de visualización AR de un plato gastronómico.
 *
 * @param params - Dependencias e información requerida para el lanzamiento.
 */
export async function launchDishAr({
  dish,
  restaurantSlug,
  detector,
  launcher,
  analytics,
}: LaunchDishArParams): Promise<ArLauncherResult> {
  const capabilities = detector.getCapabilities()
  const mode = selectArLaunchMode(capabilities, dish.modelo)

  // 1. Si no tiene soporte ni modelo apto
  if (mode === 'unsupported') {
    const errorMsg =
      'El plato no cuenta con un modelo 3D disponible o aprobado para visualización.'
    analytics?.track({
      type: 'launch_ar_error',
      dishId: dish.id,
      mode: 'unsupported',
      reason: errorMsg,
      restaurantSlug,
    })

    return {
      success: false,
      mode: 'unsupported',
      error: errorMsg,
    }
  }

  // 2. Registro del intento de lanzamiento
  analytics?.track({
    type: 'launch_ar_attempt',
    dishId: dish.id,
    mode,
    restaurantSlug,
  })

  try {
    // 3. Invocación del adaptador correspondiente
    const result = await launcher.launch(dish, mode)

    if (result.success) {
      analytics?.track({
        type: 'launch_ar_success',
        dishId: dish.id,
        mode,
        restaurantSlug,
      })
    } else {
      analytics?.track({
        type: 'launch_ar_error',
        dishId: dish.id,
        mode,
        reason: result.error ?? 'Fallo desconocido al abrir visor AR',
        restaurantSlug,
      })
    }

    return result
  } catch (err) {
    const errorMsg =
      err instanceof Error
        ? err.message
        : 'Error inesperado al abrir la experiencia AR'
    analytics?.track({
      type: 'launch_ar_error',
      dishId: dish.id,
      mode,
      reason: errorMsg,
      restaurantSlug,
    })

    return {
      success: false,
      mode,
      error: errorMsg,
    }
  }
}
