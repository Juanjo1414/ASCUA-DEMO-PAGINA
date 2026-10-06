import type {
  AnalyticsEvent,
  AnalyticsTracker,
} from '@/application/ports/analyticsTracker'

export class NoopAnalyticsTracker implements AnalyticsTracker {
  track(event: AnalyticsEvent): void {
    // No-op for tests
  }
}
