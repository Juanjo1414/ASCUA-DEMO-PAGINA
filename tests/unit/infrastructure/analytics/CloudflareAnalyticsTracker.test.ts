import { describe, it, expect, afterEach, vi } from 'vitest'
import { CloudflareAnalyticsTracker } from '@/infrastructure/analytics/CloudflareAnalyticsTracker'
import type { AnalyticsEvent } from '@/application/ports/analyticsTracker'

describe('CloudflareAnalyticsTracker', () => {
  afterEach(() => {
    delete window.zaraz
  })

  it('does not throw when Zaraz no está disponible todavía', () => {
    const tracker = new CloudflareAnalyticsTracker()
    expect(() =>
      tracker.track({
        type: 'ar-launched',
        payload: { dishId: '1', mode: 'quick-look' },
      } as unknown as AnalyticsEvent)
    ).not.toThrow()
  })

  it('reenvía el evento a Zaraz cuando ya cargó en la página', () => {
    const track = vi.fn()
    window.zaraz = { track }
    const tracker = new CloudflareAnalyticsTracker()
    const event = {
      type: 'ar-launched',
      payload: { dishId: '1', mode: 'quick-look' },
    } as unknown as AnalyticsEvent

    tracker.track(event)

    expect(track).toHaveBeenCalledWith('ar-launched', event)
  })
})
