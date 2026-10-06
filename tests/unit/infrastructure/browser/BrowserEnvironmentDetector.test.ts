import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserEnvironmentDetector } from '@/infrastructure/browser/BrowserEnvironmentDetector'

describe('BrowserEnvironmentDetector', () => {
  let detector: BrowserEnvironmentDetector

  beforeEach(() => {
    detector = new BrowserEnvironmentDetector()
    vi.stubGlobal('window', {})
  })

  it('detects iOS environment', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)',
    })
    const caps = detector.getCapabilities()

    expect(caps.isIos).toBe(true)
    expect(caps.isAndroid).toBe(false)
    expect(caps.canQuickLook).toBe(true)
  })

  it('detects iPadOS environment (Macintosh with touch)', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      maxTouchPoints: 5,
    })
    const caps = detector.getCapabilities()

    expect(caps.isIos).toBe(true)
  })

  it('detects Android environment', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-S918B)',
    })
    const caps = detector.getCapabilities()

    expect(caps.isAndroid).toBe(true)
    expect(caps.isIos).toBe(false)
    expect(caps.canSceneViewer).toBe(true)
  })

  it('detects embedded browsers (Instagram)', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0) Instagram 281.0.0',
    })
    const caps = detector.getCapabilities()

    expect(caps.isEmbeddedBrowser).toBe(true)
  })

  it('detects embedded browsers (WhatsApp)', () => {
    vi.stubGlobal('navigator', {
      userAgent: 'Mozilla/5.0 (Linux; Android 10) WhatsApp/2.21.19.21',
    })
    const caps = detector.getCapabilities()

    expect(caps.isEmbeddedBrowser).toBe(true)
  })

  it('returns default capabilities if window is undefined', () => {
    vi.stubGlobal('window', undefined)
    vi.stubGlobal('navigator', undefined)

    const caps = detector.getCapabilities()

    expect(caps.isIos).toBe(false)
    expect(caps.isAndroid).toBe(false)
    expect(caps.isEmbeddedBrowser).toBe(false)
  })
})
