/**
 * @file launchDishAr.test.ts
 * @description Pruebas unitarias para el caso de uso launchDishAr.
 */

import { describe, it, expect } from 'vitest'
import { launchDishAr } from '@/application/use-cases/launchDishAr'
import {
  MockArLauncher,
  MockEnvironmentDetector,
  MockAnalyticsTracker,
} from './doubles'
import type { Dish } from '@/domain/dish'
import type { DeviceCapabilities } from '@/domain/ar'

describe('Caso de Uso: launchDishAr', () => {
  const dishConModelo: Dish = {
    id: 'asado-tira',
    nombre: { es: 'Asado de Tira' },
    precio: 38000,
    foto: 'assets/asado.webp',
    modelo: {
      glb: 'assets/asado.glb',
      usdz: 'assets/asado.usdz',
      poster: 'assets/asado-poster.webp',
      escalaRealCm: 22,
      aprobado: true,
    },
    agotado: false,
  }

  const deviceIos: DeviceCapabilities = {
    isIos: true,
    isAndroid: false,
    isMobile: true,
    isSafari: true,
    isChrome: false,
    isEmbeddedBrowser: false,
    canQuickLook: true,
    canSceneViewer: false,
  }

  it('retorna error controlado y emite analítica si el plato no tiene modelo o no está aprobado', async () => {
    const dishSinModelo: Dish = { ...dishConModelo, modelo: null }
    const detector = new MockEnvironmentDetector(deviceIos)
    const launcher = new MockArLauncher()
    const analytics = new MockAnalyticsTracker()

    const res = await launchDishAr({
      dish: dishSinModelo,
      restaurantSlug: 'la-brasa-7k2p',
      detector,
      launcher,
      analytics,
    })

    expect(res.success).toBe(false)
    expect(res.mode).toBe('unsupported')
    expect(res.error).toContain('no cuenta con un modelo 3D disponible')
    expect(launcher.launchedDishes).toHaveLength(0)

    expect(analytics.events).toHaveLength(1)
    expect(analytics.events[0]?.type).toBe('launch_ar_error')
  })

  it('orquesta el lanzamiento exitoso registrando intento y éxito en analítica', async () => {
    const detector = new MockEnvironmentDetector(deviceIos)
    const launcher = new MockArLauncher()
    const analytics = new MockAnalyticsTracker()

    const res = await launchDishAr({
      dish: dishConModelo,
      restaurantSlug: 'la-brasa-7k2p',
      detector,
      launcher,
      analytics,
    })

    expect(res.success).toBe(true)
    expect(res.mode).toBe('quick-look')
    expect(launcher.launchedDishes).toHaveLength(1)
    expect(launcher.launchedDishes[0]?.mode).toBe('quick-look')

    expect(analytics.events).toHaveLength(2)
    expect(analytics.events[0]?.type).toBe('launch_ar_attempt')
    expect(analytics.events[1]?.type).toBe('launch_ar_success')
  })

  it('emite evento de error si el launcher retorna fallo', async () => {
    const detector = new MockEnvironmentDetector(deviceIos)
    const launcher = new MockArLauncher()
    launcher.shouldFail = true
    const analytics = new MockAnalyticsTracker()

    const res = await launchDishAr({
      dish: dishConModelo,
      restaurantSlug: 'la-brasa-7k2p',
      detector,
      launcher,
      analytics,
    })

    expect(res.success).toBe(false)
    expect(res.error).toBe('El usuario canceló la vista AR')

    expect(analytics.events).toHaveLength(2)
    expect(analytics.events[0]?.type).toBe('launch_ar_attempt')
    expect(analytics.events[1]?.type).toBe('launch_ar_error')
  })

  it('captura excepciones inesperadas del launcher y emite evento de error', async () => {
    const detector = new MockEnvironmentDetector(deviceIos)
    const launcher = new MockArLauncher()
    launcher.shouldThrow = true
    const analytics = new MockAnalyticsTracker()

    const res = await launchDishAr({
      dish: dishConModelo,
      restaurantSlug: 'la-brasa-7k2p',
      detector,
      launcher,
      analytics,
    })

    expect(res.success).toBe(false)
    expect(res.error).toBe('Fallo simulado al invocar motor AR nativo')

    expect(analytics.events).toHaveLength(2)
    expect(analytics.events[1]?.type).toBe('launch_ar_error')
  })
})
