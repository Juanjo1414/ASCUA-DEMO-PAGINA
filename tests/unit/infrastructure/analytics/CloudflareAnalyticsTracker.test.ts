import { describe, it, expect } from 'vitest'
import { CloudflareAnalyticsTracker } from '@/infrastructure/analytics/CloudflareAnalyticsTracker'
import type { AnalyticsEvent } from '@/application/ports/analyticsTracker'

describe('CloudflareAnalyticsTracker', () => {
  it('does not throw when tracking', () => {
    const tracker = new CloudflareAnalyticsTracker()
    expect(() =>
      tracker.track({
        type: 'ar-launched',
        payload: { dishId: '1', mode: 'quick-look' },
      } as unknown as AnalyticsEvent)
    ).not.toThrow()
  })
})
