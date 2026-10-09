/**
 * Detector de capacidades del dispositivo a partir del user-agent real del
 * navegador. Lo usa `selectArLaunchMode` (vía el puerto `EnvironmentDetector`)
 * para decidir si abrir Quick Look, Scene Viewer o el visor en pantalla, y
 * para mostrar el aviso de navegador embebido (`InAppBrowserNotice`).
 * No decide nada por sí mismo: solo reporta lo que detecta; la regla de
 * negocio de qué modo de AR usar vive en el dominio (`selectArLaunchMode`).
 */
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
  /**
   * Lee `navigator.userAgent` y devuelve qué puede hacer este dispositivo.
   *
   * @returns Capacidades detectadas (iOS/Android, Safari/Chrome, si está
   * dentro de una app como WhatsApp o Instagram, y si puede usar Quick Look
   * o Scene Viewer). Si se llama fuera del navegador (SSR, pruebas sin DOM),
   * devuelve todo en `false`/`null` en vez de lanzar un error.
   */
  getCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') {
      return {
        isIos: false,
        isAndroid: false,
        isMobile: false,
        isSafari: false,
        isChrome: false,
        isEmbeddedBrowser: false,
        embeddedBrowserName: null,
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

    const embeddedMarker = IN_APP_MARKERS.find(([marker]) =>
      ua.includes(marker)
    )
    const embeddedBrowserName = embeddedMarker ? embeddedMarker[1] : null
    const isEmbeddedBrowser = embeddedBrowserName !== null

    const canQuickLook = isIos
    const canSceneViewer = isAndroid

    return {
      isIos,
      isAndroid,
      isMobile,
      isSafari,
      isChrome,
      isEmbeddedBrowser,
      embeddedBrowserName,
      canQuickLook,
      canSceneViewer,
    }
  }
}
