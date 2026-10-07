import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { QuickLookLauncher } from '@/infrastructure/ar/QuickLookLauncher'
import { SceneViewerLauncher } from '@/infrastructure/ar/SceneViewerLauncher'
import { ModelViewerFallbackLauncher } from '@/infrastructure/ar/ModelViewerFallbackLauncher'
import type { ArLauncher } from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

const mockDish: Dish = {
  id: 'test-dish',
  nombre: { es: 'Plato Test' },
  descripcion: { es: 'Test desc' },
  precio: 10000,
  foto: 'foto.webp',
  agotado: false,
  modelo: {
    glb: 'modelo.glb',
    usdz: 'modelo.usdz',
    poster: 'poster.webp',
    escalaRealCm: 16,
    aprobado: true,
  },
}

const mockDishWithoutAssets: Dish = {
  ...mockDish,
  modelo: undefined,
}

describe('ArLauncher Contract Tests', () => {
  const launchers: Array<{
    name: string
    instance: ArLauncher
    validMode: ArLaunchMode
    requiresProp: keyof NonNullable<Dish['modelo']>
  }> = [
    {
      name: 'QuickLookLauncher',
      instance: new QuickLookLauncher(),
      validMode: 'quick-look',
      requiresProp: 'usdz',
    },
    {
      name: 'SceneViewerLauncher',
      instance: new SceneViewerLauncher(),
      validMode: 'scene-viewer',
      requiresProp: 'glb',
    },
    {
      name: 'ModelViewerFallbackLauncher',
      instance: new ModelViewerFallbackLauncher(),
      validMode: 'model-viewer-modal',
      requiresProp: 'glb',
    },
  ]

  beforeEach(() => {
    vi.stubGlobal('window', {
      location: { href: 'http://localhost', origin: 'http://localhost' },
      dispatchEvent: vi.fn(),
    })
    vi.stubGlobal('document', {
      createElement: vi.fn((tag) => {
        if (tag === 'a')
          return {
            setAttribute: vi.fn(),
            appendChild: vi.fn(),
            click: vi.fn(),
            remove: vi.fn(),
            style: {},
          }
        if (tag === 'img') return {}
        return {}
      }),
      body: { appendChild: vi.fn() },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe.each(launchers)('$name', ({ instance, validMode }) => {
    it(`fails if mode is not ${validMode}`, async () => {
      const invalidMode: ArLaunchMode =
        validMode === 'quick-look' ? 'scene-viewer' : 'quick-look'
      const result = await instance.launch(mockDish, invalidMode)

      expect(result.success).toBe(false)
      expect(result.mode).toBe(invalidMode)
      expect(result.error).toMatch(new RegExp(validMode))
    })

    it('fails if dish has no 3d asset', async () => {
      const result = await instance.launch(mockDishWithoutAssets, validMode)

      expect(result.success).toBe(false)
      expect(result.mode).toBe(validMode)
      expect(result.error).toMatch(/El plato no tiene modelo/)
    })

    it('succeeds with valid dish and valid mode', async () => {
      const result = await instance.launch(mockDish, validMode)

      expect(result.success).toBe(true)
      expect(result.mode).toBe(validMode)
      expect(result.error).toBeUndefined()
    })
  })

  describe('SceneViewerLauncher specific behavior', () => {
    it('converts glb path to absolute URL before passing it to intent', async () => {
      const launcher = new SceneViewerLauncher()
      vi.stubGlobal('window', {
        location: { href: 'http://localhost', origin: 'https://example.com' },
      })

      const testDish = {
        ...mockDish,
        modelo: { ...mockDish.modelo, glb: '/data/slug/assets/modelo.glb' },
      } as Dish

      await launcher.launch(testDish, 'scene-viewer')

      const intentHref = window.location.href
      expect(intentHref).toContain(
        encodeURIComponent('https://example.com/data/slug/assets/modelo.glb')
      )
    })
  })
})
