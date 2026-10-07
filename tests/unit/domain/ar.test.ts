/**
 * @file ar.test.ts
 * @description Pruebas unitarias para activos 3D, capacidades y política selectArLaunchMode.
 */

import { describe, it, expect } from 'vitest'
import {
  arAssetSchema,
  deviceCapabilitiesSchema,
  selectArLaunchMode,
  type ArAsset,
  type DeviceCapabilities,
} from '@/domain/ar'

describe('Dominio: AR y 3D', () => {
  const assetValido: ArAsset = {
    glb: 'assets/platos/asado-tira/modelo.glb',
    usdz: 'assets/platos/asado-tira/modelo.usdz',
    poster: 'assets/platos/asado-tira/poster.webp',
    escalaRealCm: 22,
    aprobado: true,
    aprobadoPor: 'Juan',
    fechaAprobacion: '2026-10-06',
  }

  const deviceBase: DeviceCapabilities = {
    isIos: false,
    isAndroid: false,
    isMobile: true,
    isSafari: false,
    isChrome: true,
    isEmbeddedBrowser: false,
    embeddedBrowserName: null,
    canQuickLook: false,
    canSceneViewer: false,
  }

  describe('arAssetSchema', () => {
    it('valida un asset completo y aprobado', () => {
      const parsed = arAssetSchema.parse(assetValido)
      expect(parsed.glb).toBe(assetValido.glb)
      expect(parsed.escalaRealCm).toBe(22)
    })

    it('rechaza escala menor o igual a cero', () => {
      expect(() =>
        arAssetSchema.parse({ ...assetValido, escalaRealCm: 0 })
      ).toThrow('La escala en centímetros debe ser un número positivo')
      expect(() =>
        arAssetSchema.parse({ ...assetValido, escalaRealCm: -5 })
      ).toThrow()
    })

    it('rechaza fechas con formato diferente a AAAA-MM-DD', () => {
      expect(() =>
        arAssetSchema.parse({ ...assetValido, fechaAprobacion: '06-10-2026' })
      ).toThrow('Formato de fecha inválido')
    })
  })

  describe('deviceCapabilitiesSchema', () => {
    it('valida una estructura de capacidades de dispositivo', () => {
      const parsed = deviceCapabilitiesSchema.parse(deviceBase)
      expect(parsed.isMobile).toBe(true)
      expect(parsed.isEmbeddedBrowser).toBe(false)
    })
  })

  describe('selectArLaunchMode', () => {
    it('retorna "unsupported" cuando no hay asset o es nulo', () => {
      expect(selectArLaunchMode(deviceBase, null)).toBe('unsupported')
      expect(selectArLaunchMode(deviceBase, undefined)).toBe('unsupported')
    })

    it('retorna "unsupported" cuando el asset no ha sido aprobado por calidad', () => {
      const assetNoAprobado = { ...assetValido, aprobado: false }
      expect(selectArLaunchMode(deviceBase, assetNoAprobado)).toBe(
        'unsupported'
      )
    })

    it('retorna "model-viewer-modal" si el usuario está en un navegador embebido (Instagram/WhatsApp)', () => {
      const deviceInApp: DeviceCapabilities = {
        ...deviceBase,
        isIos: true,
        canQuickLook: true,
        isEmbeddedBrowser: true,
        embeddedBrowserName: 'Instagram',
      }
      expect(selectArLaunchMode(deviceInApp, assetValido)).toBe(
        'model-viewer-modal'
      )
    })

    it('retorna "unsupported" en navegador embebido si el asset no tiene GLB', () => {
      const deviceInApp: DeviceCapabilities = {
        ...deviceBase,
        isEmbeddedBrowser: true,
        embeddedBrowserName: 'WhatsApp',
      }
      const assetSinGlb = { ...assetValido, glb: '' }
      expect(selectArLaunchMode(deviceInApp, assetSinGlb)).toBe('unsupported')
    })

    it('selecciona "quick-look" en iOS con Quick Look habilitado y archivo USDZ', () => {
      const deviceIos: DeviceCapabilities = {
        ...deviceBase,
        isIos: true,
        canQuickLook: true,
      }
      expect(selectArLaunchMode(deviceIos, assetValido)).toBe('quick-look')
    })

    it('selecciona "model-viewer-modal" en iOS si el asset carece de archivo USDZ', () => {
      const deviceIos: DeviceCapabilities = {
        ...deviceBase,
        isIos: true,
        canQuickLook: true,
      }
      const assetSinUsdz = { ...assetValido, usdz: '' }
      expect(selectArLaunchMode(deviceIos, assetSinUsdz)).toBe(
        'model-viewer-modal'
      )
    })

    it('selecciona "scene-viewer" en Android con Scene Viewer y archivo GLB', () => {
      const deviceAndroid: DeviceCapabilities = {
        ...deviceBase,
        isAndroid: true,
        canSceneViewer: true,
      }
      expect(selectArLaunchMode(deviceAndroid, assetValido)).toBe(
        'scene-viewer'
      )
    })

    it('selecciona "model-viewer-modal" en Android si carece de Scene Viewer', () => {
      const deviceAndroidSinSv: DeviceCapabilities = {
        ...deviceBase,
        isAndroid: true,
        canSceneViewer: false,
      }
      expect(selectArLaunchMode(deviceAndroidSinSv, assetValido)).toBe(
        'model-viewer-modal'
      )
    })

    it('selecciona "model-viewer-modal" en escritorio moderno para ver el modelo 3D en pantalla', () => {
      const deviceEscritorio: DeviceCapabilities = {
        ...deviceBase,
        isMobile: false,
      }
      expect(selectArLaunchMode(deviceEscritorio, assetValido)).toBe(
        'model-viewer-modal'
      )
    })

    it('retorna "unsupported" si el asset no tiene GLB ni modos nativos', () => {
      const deviceEscritorio: DeviceCapabilities = {
        ...deviceBase,
        isMobile: false,
      }
      const assetVacio = { ...assetValido, glb: '', usdz: '' }
      expect(selectArLaunchMode(deviceEscritorio, assetVacio)).toBe(
        'unsupported'
      )
    })
  })
})
