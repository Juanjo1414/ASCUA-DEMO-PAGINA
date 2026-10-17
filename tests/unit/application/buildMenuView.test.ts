/**
 * @file buildMenuView.test.ts
 * @description Pruebas unitarias para el caso de uso buildMenuView.
 */

import { describe, it, expect } from 'vitest'
import { buildMenuView } from '@/application/use-cases/buildMenuView'
import { InMemorySoldOutStore } from './doubles'
import type { Restaurant } from '@/domain/restaurant'
import type { DeviceCapabilities } from '@/domain/ar'

describe('Caso de Uso: buildMenuView', () => {
  const deviceMobile: DeviceCapabilities = {
    isIos: false,
    isAndroid: true,
    isMobile: true,
    isSafari: false,
    isChrome: true,
    isEmbeddedBrowser: false,
    embeddedBrowserName: null,
    canQuickLook: false,
    canSceneViewer: true,
  }

  const restaurante: Restaurant = {
    schemaVersion: 1,
    slug: 'fuego-7k2p',
    estado: 'activo',
    expira: '2026-12-31',
    autorizacion: { fecha: '2026-10-06', medio: 'correo', contacto: 'Ana' },
    nombre: 'Fuego & Brasa',
    idiomas: ['es', 'en'],
    tema: { primario: '#C2410C', parTipografico: 'editorial' },
    contacto: { whatsapp: '573001234567' },
    categorias: [
      {
        id: 'cortes',
        nombre: { es: 'Cortes Nobles', en: 'Prime Cuts' },
        platos: [
          {
            id: 'picanha',
            nombre: { es: 'Picaña a la Brasa', en: 'Charred Picanha' },
            descripcion: { es: 'Corte jugoso', en: 'Juicy cut' },
            precio: 45000,
            foto: 'assets/picanha.webp',
            modelo: {
              glb: 'assets/picanha.glb',
              usdz: 'assets/picanha.usdz',
              poster: 'assets/picanha-poster.webp',
              escalaRealCm: 20,
              aprobado: true,
            },
            temperatura: 900,
            agotado: false,
          },
          {
            id: 'yuca-frita',
            nombre: { es: 'Yuca Crocante', en: 'Crispy Cassava' },
            precio: 15000,
            foto: 'assets/yuca.webp',
            modelo: null,
            agotado: false,
          },
        ],
      },
    ],
  }

  it('construye la vista en español formateando precios y detectando soporte AR', () => {
    const view = buildMenuView(restaurante, deviceMobile, undefined, 'es')

    expect(view.restaurantNombre).toBe('Fuego & Brasa')
    expect(view.totalPlatos).toBe(2)
    expect(view.totalPlatosConAr).toBe(1)

    const cat = view.categorias[0]!
    expect(cat.nombre).toBe('Cortes Nobles')

    const p1 = cat.platos[0]!
    expect(p1.nombre).toBe('Picaña a la Brasa')
    expect(p1.descripcion).toBe('Corte jugoso')
    expect(p1.precioFormateado.replace(/\u00a0/g, ' ')).toBe('$ 45.000')
    expect(p1.canViewAr).toBe(true)
    expect(p1.arLaunchMode).toBe('scene-viewer') // Android con Scene Viewer
    expect(p1.isSoldOut).toBe(false)

    const p2 = cat.platos[1]!
    expect(p2.canViewAr).toBe(false)
    expect(p2.arLaunchMode).toBe('unsupported')
  })

  it('construye la vista en inglés respetando traducciones', () => {
    const view = buildMenuView(restaurante, deviceMobile, undefined, 'en')
    const cat = view.categorias[0]!
    expect(cat.nombre).toBe('Prime Cuts')

    const p1 = cat.platos[0]!
    expect(p1.nombre).toBe('Charred Picanha')
    expect(p1.descripcion).toBe('Juicy cut')
  })

  it('sincroniza el estado de agotado con el almacén SoldOutStore', () => {
    const soldOutStore = new InMemorySoldOutStore(['fuego-7k2p:picanha'])
    const view = buildMenuView(restaurante, deviceMobile, soldOutStore, 'es')

    const p1 = view.categorias[0]!.platos[0]!
    const p2 = view.categorias[0]!.platos[1]!

    expect(p1.isSoldOut).toBe(true)
    expect(p2.isSoldOut).toBe(false)
  })
})
