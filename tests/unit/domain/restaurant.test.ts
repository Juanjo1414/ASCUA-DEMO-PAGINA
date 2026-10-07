/**
 * @file restaurant.test.ts
 * @description Pruebas unitarias para Restaurant, validación de slugs no adivinables y expiración.
 */

import { describe, it, expect } from 'vitest'
import {
  restaurantSchema,
  isRestaurantExpired,
  RESTAURANT_SLUG_REGEX,
  assetPathSchema,
  resolveAssetUrls,
  type Restaurant,
} from '@/domain/restaurant'

describe('Dominio: Restaurant', () => {
  const restauranteValido: Restaurant = {
    schemaVersion: 1,
    slug: 'la-brasa-7k2p',
    estado: 'activo',
    expira: '2026-12-15',
    autorizacion: {
      fecha: '2026-10-06',
      medio: 'whatsapp',
      contacto: 'Carlos Dueño',
    },
    nombre: 'La Brasa',
    idiomas: ['es', 'en'],
    tema: {
      primario: '#C2410C',
      parTipografico: 'editorial',
      logo: 'assets/logo.svg',
    },
    contacto: {
      whatsapp: '573001234567',
      direccion: 'Carrera 35 # 8A-24, El Poblado, Medellín',
      horario: ['Mar - Sáb: 12:00 - 22:00'],
      mapsUrl: 'https://maps.google.com/?q=6.2088,-75.5678',
    },
    categorias: [
      {
        id: 'principales',
        nombre: { es: 'Platos Principales', en: 'Mains' },
        platos: [
          {
            id: 'ojo-bife',
            nombre: { es: 'Ojo de Bife' },
            precio: 52000,
            foto: 'assets/platos/ojo-bife/foto.webp',
            modelo: null,
            agotado: false,
          },
        ],
      },
    ],
  }

  describe('restaurantSchema y RESTAURANT_SLUG_REGEX', () => {
    it('valida un restaurante completo y estructurado', () => {
      const parsed = restaurantSchema.parse(restauranteValido)
      expect(parsed.slug).toBe('la-brasa-7k2p')
      expect(parsed.estado).toBe('activo')
      expect(parsed.categorias[0]?.platos).toHaveLength(1)
    })

    it('exige el sufijo aleatorio de 4 caracteres en el slug para evitar enumeración', () => {
      expect(RESTAURANT_SLUG_REGEX.test('la-brasa-7k2p')).toBe(true)
      expect(RESTAURANT_SLUG_REGEX.test('el-cielo-medellin-9m1x')).toBe(true)

      // Inválidos:
      expect(RESTAURANT_SLUG_REGEX.test('la-brasa')).toBe(false)
      expect(RESTAURANT_SLUG_REGEX.test('la-brasa-123')).toBe(false) // 3 caracteres
      expect(RESTAURANT_SLUG_REGEX.test('la-brasa-12345')).toBe(false) // 5 caracteres
      expect(RESTAURANT_SLUG_REGEX.test('La-Brasa-7k2p')).toBe(false) // mayúsculas
      expect(RESTAURANT_SLUG_REGEX.test('../la-brasa-7k2p')).toBe(false) // path traversal
    })

    it('rechaza slugs que no cumplan el formato en el esquema', () => {
      expect(() =>
        restaurantSchema.parse({
          ...restauranteValido,
          slug: 'la-brasa-sin-sufijo',
        })
      ).toThrow('El slug debe terminar con un sufijo aleatorio de 4 caracteres')
    })

    it('rechaza números de WhatsApp inválidos (deben ser solo dígitos con código de país)', () => {
      expect(() =>
        restaurantSchema.parse({
          ...restauranteValido,
          contacto: {
            ...restauranteValido.contacto,
            whatsapp: '+57 300 123 4567', // con símbolos
          },
        })
      ).toThrow('Número de WhatsApp inválido')
    })
  })

  describe('assetPathSchema y resolveAssetUrls', () => {
    it('el esquema rechaza rutas de asset con path traversal, backslashes, absolutas o con esquemas', () => {
      expect(() => assetPathSchema.parse('../assets/foto.webp')).toThrow()
      expect(() => assetPathSchema.parse('assets\\foto.webp')).toThrow()
      expect(() => assetPathSchema.parse('/assets/foto.webp')).toThrow()
      expect(() => assetPathSchema.parse('//assets/foto.webp')).toThrow()
      expect(() =>
        assetPathSchema.parse('http://ejemplo.com/foto.webp')
      ).toThrow()
      expect(() => assetPathSchema.parse('javascript:alert(1)')).toThrow()
      expect(() => assetPathSchema.parse('data:image/png;base64,...')).toThrow()

      // Debe aceptar:
      expect(assetPathSchema.parse('assets/logo.svg')).toBe('assets/logo.svg')
      expect(assetPathSchema.parse('assets/platos/p/foto.webp')).toBe(
        'assets/platos/p/foto.webp'
      )
    })

    it('resolveAssetUrls devuelve una copia del restaurante con las rutas de assets ajustadas', () => {
      const restauranteConAr = {
        ...restauranteValido,
        categorias: [
          {
            ...restauranteValido.categorias[0]!,
            platos: [
              {
                ...restauranteValido.categorias[0]!.platos[0]!,
                modelo: {
                  glb: 'assets/platos/ojo-bife/modelo.glb',
                  usdz: 'assets/platos/ojo-bife/modelo.usdz',
                  poster: 'assets/platos/ojo-bife/poster.webp',
                  escalaRealCm: 30,
                  aprobado: true,
                },
              },
            ],
          },
        ],
      } as Restaurant

      const resuelto = resolveAssetUrls(restauranteConAr)

      // Debe ser una copia, no mutar el original
      expect(resuelto).not.toBe(restauranteConAr)
      expect(restauranteConAr.tema.logo).toBe('assets/logo.svg')

      // Rutas resueltas
      expect(resuelto.tema.logo).toBe('/data/la-brasa-7k2p/assets/logo.svg')
      const plato = resuelto.categorias[0]!.platos[0]!
      expect(plato.foto).toBe(
        '/data/la-brasa-7k2p/assets/platos/ojo-bife/foto.webp'
      )
      expect(plato.modelo?.glb).toBe(
        '/data/la-brasa-7k2p/assets/platos/ojo-bife/modelo.glb'
      )
      expect(plato.modelo?.usdz).toBe(
        '/data/la-brasa-7k2p/assets/platos/ojo-bife/modelo.usdz'
      )
      expect(plato.modelo?.poster).toBe(
        '/data/la-brasa-7k2p/assets/platos/ojo-bife/poster.webp'
      )
    })
  })

  describe('isRestaurantExpired', () => {
    it('determina vigencia correctamente comparando con la fecha actual', () => {
      // Fecha en el pasado:
      const pasado = new Date('2026-10-07T12:00:00Z')
      expect(isRestaurantExpired('2026-10-06', pasado)).toBe(true)

      // Fecha en el futuro:
      const futuro = new Date('2026-10-01T12:00:00Z')
      expect(isRestaurantExpired('2026-10-06', futuro)).toBe(false)
    })

    it('permite acceso durante todo el día de expiración (hasta 23:59:59.999 UTC)', () => {
      const medioDia = new Date(Date.UTC(2026, 9, 6, 15, 0, 0)) // 6 oct a las 15:00 UTC
      expect(isRestaurantExpired('2026-10-06', medioDia)).toBe(false)

      const justoDespues = new Date(Date.UTC(2026, 9, 7, 0, 0, 1)) // 7 oct a las 00:00:01 UTC
      expect(isRestaurantExpired('2026-10-06', justoDespues)).toBe(true)
    })

    it('trata fechas corruptas como expiradas por seguridad', () => {
      expect(isRestaurantExpired('invalido')).toBe(true)
    })
  })
})
