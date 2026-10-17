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

    it('fija resizable=false, mode=ar_preferred y un browser_fallback_url en el intent (R-4)', async () => {
      const launcher = new SceneViewerLauncher()
      vi.stubGlobal('window', {
        location: {
          href: 'https://example.com/r/demo-abcd',
          origin: 'https://example.com',
        },
      })

      await launcher.launch(mockDish, 'scene-viewer')

      const intentHref = window.location.href
      // resizable=false (no agrandable, Ley 1480) va en la query string del intent.
      expect(intentHref).toContain('resizable=false')
      expect(intentHref).toContain('mode=ar_preferred')
      // Si el dispositivo no tiene la app de Google, debe volver a la página actual.
      expect(intentHref).toContain(
        `S.browser_fallback_url=${encodeURIComponent('https://example.com/r/demo-abcd')}`
      )
      expect(intentHref).toMatch(/^intent:\/\//)
    })
  })

  describe('QuickLookLauncher specific behavior (R-4)', () => {
    it('crea un <a rel="ar"> con una <img> hija y la escala fijada en el href', async () => {
      const launcher = new QuickLookLauncher()
      let anchor: Record<string, unknown> | undefined
      let img: Record<string, unknown> | undefined

      vi.stubGlobal('document', {
        createElement: vi.fn((tag: string) => {
          const el: Record<string, unknown> = {
            setAttribute: vi.fn(),
            appendChild: vi.fn(),
            click: vi.fn(),
            remove: vi.fn(),
            style: {},
          }
          if (tag === 'a') anchor = el
          if (tag === 'img') img = el
          return el
        }),
        body: { appendChild: vi.fn() },
      })

      const result = await launcher.launch(mockDish, 'quick-look')

      expect(result.success).toBe(true)
      // Safari solo abre Quick Look si el <a> tiene rel="ar" Y una <img> hija;
      // sin la <img>, el iPhone descarga el .usdz en vez de mostrarlo.
      expect(anchor?.setAttribute).toHaveBeenCalledWith('rel', 'ar')
      expect(anchor?.href).toBe(
        `${mockDish.modelo!.usdz}#allowsContentScaling=0`
      )
      expect(anchor?.appendChild).toHaveBeenCalledWith(img)
      expect(img?.src).toBe(mockDish.modelo!.poster)
    })
  })
})
