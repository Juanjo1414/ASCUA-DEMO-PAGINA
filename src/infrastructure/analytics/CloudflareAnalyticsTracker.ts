/**
 * Adaptador de analítica para Cloudflare Web Analytics / Zaraz.
 *
 * Envía eventos personalizados a Zaraz cuando está disponible en la página
 * (lo inyecta Cloudflare vía el script del CSP aprobado en el ADR 0004).
 * Si Zaraz todavía no cargó (o estamos en desarrollo local, donde no existe),
 * simplemente no hace nada: no hay backend propio que reciba estos eventos.
 */
import type {
  AnalyticsEvent,
  AnalyticsTracker,
} from '@/application/ports/analyticsTracker'

declare global {
  interface Window {
    /** Presente solo cuando Cloudflare Zaraz ya se cargó en la página. */
    zaraz?: {
      track: (eventName: string, payload: unknown) => void
    }
  }
}

export class CloudflareAnalyticsTracker implements AnalyticsTracker {
  /**
   * Reenvía un evento de analítica a Zaraz.
   *
   * @param event - Evento de dominio a registrar.
   * No hace nada si Zaraz no está disponible en `window` todavía.
   */
  track(event: AnalyticsEvent): void {
    if (typeof window.zaraz?.track === 'function') {
      window.zaraz.track(event.type, event)
    }
  }
}
