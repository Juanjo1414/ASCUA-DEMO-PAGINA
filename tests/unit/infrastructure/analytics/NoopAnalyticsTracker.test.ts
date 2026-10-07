import { describe, it, expect } from 'vitest'
import { NoopAnalyticsTracker } from '@/infrastructure/analytics/NoopAnalyticsTracker'
import type { AnalyticsEvent } from '@/application/ports/analyticsTracker'

describe('NoopAnalyticsTracker', () => {
  it('does not throw when tracking', () => {
    const tracker = new NoopAnalyticsTracker()
    expect(() =>
      tracker.track({
        type: 'ar-launched',
        payload: { dishId: '1', mode: 'quick-look' },
      } as unknown as AnalyticsEvent)
    ).not.toThrow()
  })
})
