import type {
  AnalyticsEvent,
  AnalyticsTracker,
} from '@/application/ports/analyticsTracker'

export class CloudflareAnalyticsTracker implements AnalyticsTracker {
  track(event: AnalyticsEvent): void {
    // We only push custom events if __cf_beacon or zaraz is available.
    // Web Analytics automatically tracks route changes if the script is in the HTML.
    // For custom events, you would normally use Zaraz or a custom beacon here.
    // @ts-ignore
    if (window.zaraz && typeof window.zaraz.track === 'function') {
      // @ts-ignore
      window.zaraz.track(event.type, event)
    } else {
      // If we are in dev or the script hasn't loaded yet.
      // console.log('[Analytics]', event)
    }
  }
}
