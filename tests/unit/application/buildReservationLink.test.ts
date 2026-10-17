/**
 * @file buildReservationLink.test.ts
 * @description Pruebas unitarias para el caso de uso buildReservationLink.
 */

import { describe, it, expect } from 'vitest'
import { buildReservationLink } from '@/application/use-cases/buildReservationLink'
import type { Restaurant } from '@/domain/restaurant'

describe('Caso de Uso: buildReservationLink', () => {
  const restaurante: Restaurant = {
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
    tema: { primario: '#C2410C', parTipografico: 'editorial' },
    contacto: {
      whatsapp: '+57 (300) 123-4567', // con formato no numérico para probar sanitización
    },
    categorias: [
      {
        id: 'principales',
        nombre: { es: 'Principales' },
        platos: [
          {
            id: 'asado',
            nombre: { es: 'Asado' },
            precio: 30000,
            foto: 'assets/asado.webp',
            modelo: null,
            agotado: false,
          },
        ],
      },
    ],
  }

  it('genera enlace básico en español con número limpio de teléfono', () => {
    const link = buildReservationLink({ restaurant: restaurante, lang: 'es' })

    expect(link).toContain('https://wa.me/573001234567?text=')
    expect(decodeURIComponent(link)).toBe(
      'https://wa.me/573001234567?text=Hola La Brasa, me gustaría reservar una mesa.'
    )
  })

  it('genera enlace con detalles completos de comensales, fecha, hora y comentarios', () => {
    const link = buildReservationLink({
      restaurant: restaurante,
      comensales: 4,
      fecha: '2026-10-15',
      hora: '20:00',
      comentarios: 'Mesa cerca al ventanal',
      lang: 'es',
    })

    const decoded = decodeURIComponent(link)
    expect(decoded).toContain('para 4 personas')
    expect(decoded).toContain('el 2026-10-15')
    expect(decoded).toContain('a las 20:00')
    expect(decoded).toContain('Nota: Mesa cerca al ventanal')
  })

  it('utiliza singular para 1 persona en español', () => {
    const link = buildReservationLink({
      restaurant: restaurante,
      comensales: 1,
      lang: 'es',
    })

    const decoded = decodeURIComponent(link)
    expect(decoded).toContain('para 1 persona.')
  })

  it('genera enlace estructurado en inglés con singular y plural correcto', () => {
    const link1 = buildReservationLink({
      restaurant: restaurante,
      comensales: 1,
      fecha: 'Oct 15',
      hora: '8:00 PM',
      comentarios: 'Quiet corner',
      lang: 'en',
    })
    const decoded1 = decodeURIComponent(link1)
    expect(decoded1).toContain(
      'Hello La Brasa, I would like to make a reservation for 1 person on Oct 15 at 8:00 PM. Note: Quiet corner'
    )

    const link2 = buildReservationLink({
      restaurant: restaurante,
      comensales: 3,
      lang: 'en',
    })
    const decoded2 = decodeURIComponent(link2)
    expect(decoded2).toContain('for 3 people.')
  })
})
