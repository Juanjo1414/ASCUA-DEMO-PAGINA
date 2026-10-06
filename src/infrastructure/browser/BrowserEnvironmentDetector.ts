import type { EnvironmentDetector } from '@/application/ports/environmentDetector'
import type { DeviceCapabilities } from '@/domain/ar'

const IN_APP_MARKERS: [string, string][] = [
  ['WhatsApp', 'WhatsApp'],
  ['Instagram', 'Instagram'],
  ['FBAN', 'Facebook'],
  ['FBAV', 'Facebook'],
  ['FB_IAB', 'Facebook'],
  ['Messenger', 'Messenger'],
  ['Line/', 'LINE'],
  ['TikTok', 'TikTok'],
  ['Twitter', 'X'],
  ['LinkedInApp', 'LinkedIn'],
  ['Telegram', 'Telegram'],
]

export class BrowserEnvironmentDetector implements EnvironmentDetector {
  getCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return {
        isIos: false,
        isAndroid: false,
        isMobile: false,
        isSafari: false,
        isChrome: false,
        isEmbeddedBrowser: false,
        canQuickLook: false,
        canSceneViewer: false,
      }
    }

    const ua = navigator.userAgent || ''

    // iPadOS 13+ se anuncia como Macintosh; el touch lo delata.
    const isIos =
      /iPad|iPhone|iPod/.test(ua) ||
      (ua.includes('Macintosh') && navigator.maxTouchPoints > 1)

    const isAndroid = /Android/i.test(ua)

    const isMobile = isIos || isAndroid || /Mobi|Android/i.test(ua)

    const isSafari = /^((?!chrome|android).)*safari/i.test(ua)
    const isChrome = /Chrome/.test(ua) && /Google Inc/.test(navigator.vendor)

    const isEmbeddedBrowser = IN_APP_MARKERS.some(([marker]) =>
      ua.includes(marker)
    )

    const canQuickLook = isIos
    const canSceneViewer = isAndroid

    return {
      isIos,
      isAndroid,
      isMobile,
      isSafari,
      isChrome,
      isEmbeddedBrowser,
      canQuickLook,
      canSceneViewer,
    }
  }
}
