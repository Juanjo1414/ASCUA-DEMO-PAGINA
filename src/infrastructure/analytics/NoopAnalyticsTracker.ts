import type {
  AnalyticsEvent,
  AnalyticsTracker,
} from '@/application/ports/analyticsTracker'

export class NoopAnalyticsTracker implements AnalyticsTracker {
  track(_event: AnalyticsEvent): void {
    // No-op for tests
  }
}
