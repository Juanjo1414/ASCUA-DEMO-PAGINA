/**
 * Implementación vacía de `AnalyticsTracker`.
 *
 * La usan las pruebas y el composition root cuando no hace falta enviar
 * analítica real (por ejemplo, en desarrollo local sin Cloudflare). No
 * registra ni guarda nada: cumple el contrato del puerto sin ningún efecto.
 */
import type {
  AnalyticsEvent,
  AnalyticsTracker,
} from '@/application/ports/analyticsTracker'

export class NoopAnalyticsTracker implements AnalyticsTracker {
  /** No hace nada: implementación vacía del puerto. */
  track(_event: AnalyticsEvent): void {
    // No-op for tests
  }
}
