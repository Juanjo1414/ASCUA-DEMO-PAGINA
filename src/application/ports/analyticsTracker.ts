/**
 * @file analyticsTracker.ts
 * @description Puerto (interfaz) para el registro de eventos analíticos y telemetría de uso.
 *
 * Diseñado respetando la privacidad del usuario (Ley 1581 de 2012): sin cookies ni datos
 * personales, únicamente métricas agregadas de interacción con la carta y el visor 3D/AR.
 */

import type { ArLaunchMode } from '@/domain/ar'

/**
 * Catálogo tipado de eventos analíticos permitidos en la demo.
 */
export type AnalyticsEvent =
  | { type: 'view_menu'; restaurantSlug: string }
  | { type: 'view_dish'; dishId: string; restaurantSlug: string }
  | {
      type: 'launch_ar_attempt'
      dishId: string
      mode: ArLaunchMode
      restaurantSlug: string
    }
  | {
      type: 'launch_ar_success'
      dishId: string
      mode: ArLaunchMode
      restaurantSlug: string
    }
  | {
      type: 'launch_ar_error'
      dishId: string
      mode: ArLaunchMode
      reason: string
      restaurantSlug: string
    }
  | {
      type: 'click_reserve'
      restaurantSlug: string
      channel: 'whatsapp'
    }

/**
 * Puerto para el emisor de eventos de analítica.
 */
export interface AnalyticsTracker {
  /**
   * Registra un evento de interacción.
   *
   * @param event - Evento analítico con sus parámetros tipados.
   */
  track(event: AnalyticsEvent): void
}
