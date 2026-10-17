/**
 * @file getRestaurant.test.ts
 * @description Pruebas unitarias para el caso de uso getRestaurant.
 */

import { describe, it, expect } from 'vitest'
import { getRestaurant } from '@/application/use-cases/getRestaurant'
import { InMemoryRestaurantRepository } from './doubles'
import type { Restaurant } from '@/domain/restaurant'

describe('Caso de Uso: getRestaurant', () => {
  const restauranteActivo: Restaurant = {
    schemaVersion: 1,
    slug: 'la-brasa-7k2p',
    estado: 'activo',
    expira: '2026-12-31',
    autorizacion: {
      fecha: '2026-10-06',
      medio: 'whatsapp',
      contacto: 'Carlos',
    },
    nombre: 'La Brasa',
    idiomas: ['es', 'en'],
    tema: {
      primario: '#C2410C',
      parTipografico: 'editorial',
    },
    contacto: {
      whatsapp: '573001234567',
    },
    categorias: [
      {
        id: 'principales',
        nombre: { es: 'Principales' },
        platos: [
          {
            id: 'asado-tira',
            nombre: { es: 'Asado de Tira' },
            precio: 35000,
            foto: 'assets/asado.webp',
            modelo: null,
            agotado: false,
          },
        ],
      },
    ],
  }

  it('rechaza slugs inválidos sin consultar el repositorio por seguridad', async () => {
    const repo = new InMemoryRestaurantRepository([restauranteActivo])

    // Slug sin sufijo de 4 caracteres
    const r1 = await getRestaurant('la-brasa', repo)
    expect(r1.isFound).toBe(false)
    expect(r1.canAccess).toBe(false)
    expect(r1.errorMessage).toContain(
      'identificador del restaurante no es válido'
    )

    // Path traversal malicioso
    const r2 = await getRestaurant('../la-brasa-7k2p', repo)
    expect(r2.isFound).toBe(false)
    expect(r2.canAccess).toBe(false)
  })

  it('retorna resultado no encontrado si el slug no existe', async () => {
    const repo = new InMemoryRestaurantRepository([restauranteActivo])
    const res = await getRestaurant('no-existe-9999', repo)

    expect(res.isFound).toBe(false)
    expect(res.restaurant).toBeNull()
    expect(res.errorMessage).toBe(
      'El restaurante solicitado no fue encontrado.'
    )
  })

  it('retorna restaurante y permite acceso cuando está activo y vigente', async () => {
    const repo = new InMemoryRestaurantRepository([restauranteActivo])
    const now = new Date('2026-10-06T12:00:00Z')

    const res = await getRestaurant('la-brasa-7k2p', repo, now)

    expect(res.isFound).toBe(true)
    expect(res.isExpired).toBe(false)
    expect(res.isPaused).toBe(false)
    expect(res.canAccess).toBe(true)
    expect(res.restaurant?.nombre).toBe('La Brasa')
  })

  it('deniega acceso si la demo ha expirado', async () => {
    const repo = new InMemoryRestaurantRepository([restauranteActivo])
    const fechaFutura = new Date('2027-01-01T12:00:00Z')

    const res = await getRestaurant('la-brasa-7k2p', repo, fechaFutura)

    expect(res.isFound).toBe(true)
    expect(res.isExpired).toBe(true)
    expect(res.canAccess).toBe(false)
    expect(res.errorMessage).toContain(
      'demo comercial para este restaurante ha finalizado'
    )
  })

  it('deniega acceso si el restaurante está en estado pausado', async () => {
    const pausado: Restaurant = { ...restauranteActivo, estado: 'pausado' }
    const repo = new InMemoryRestaurantRepository([pausado])

    const res = await getRestaurant('la-brasa-7k2p', repo)

    expect(res.isFound).toBe(true)
    expect(res.isPaused).toBe(true)
    expect(res.canAccess).toBe(false)
    expect(res.errorMessage).toContain('se encuentra temporalmente en pausa')
  })
})
