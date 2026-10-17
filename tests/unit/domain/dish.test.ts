/**
 * @file dish.test.ts
 * @description Pruebas unitarias para platos y categorías del menú gastronómico.
 */

import { describe, it, expect } from 'vitest'
import {
  dishSchema,
  categorySchema,
  selectFeaturedDishes,
  selectStarDish,
  MAX_FEATURED_DISHES,
  type Dish,
  type Category,
} from '@/domain/dish'

describe('Dominio: Dish y Category', () => {
  const platoBase: Dish = {
    id: 'asado-tira',
    nombre: {
      es: 'Asado de Tira',
      en: 'Short Ribs',
    },
    descripcion: {
      es: 'Corte madurado 30 días, brasa de quebracho a 850 °C',
      en: '30-day aged cut, wood embers at 850 °C',
    },
    precio: 42000,
    foto: 'assets/platos/asado-tira/foto.webp',
    modelo: {
      glb: 'assets/platos/asado-tira/modelo.glb',
      usdz: 'assets/platos/asado-tira/modelo.usdz',
      poster: 'assets/platos/asado-tira/poster.webp',
      escalaRealCm: 25,
      aprobado: true,
    },
    temperatura: 850,
    agotado: false,
  }

  describe('dishSchema', () => {
    it('valida un plato completo con modelo 3D y temperatura', () => {
      const parsed = dishSchema.parse(platoBase)
      expect(parsed.id).toBe('asado-tira')
      expect(parsed.precio).toBe(42000)
      expect(parsed.agotado).toBe(false)
    })

    it('valida un plato sin modelo 3D ni descripción en inglés', () => {
      const platoSimple = {
        id: 'papas-rusticas',
        nombre: { es: 'Papas Rústicas' },
        precio: 16000,
        foto: 'assets/platos/papas/foto.webp',
        modelo: null,
      }
      const parsed = dishSchema.parse(platoSimple)
      expect(parsed.id).toBe('papas-rusticas')
      expect(parsed.agotado).toBe(false) // default
    })

    it('rechaza un ID que no esté en formato kebab-case', () => {
      expect(() =>
        dishSchema.parse({ ...platoBase, id: 'Asado Tira' })
      ).toThrow('El ID debe ser un kebab-case válido')
      expect(() =>
        dishSchema.parse({ ...platoBase, id: 'asado_tira' })
      ).toThrow()
    })

    it('rechaza si falta el nombre en español', () => {
      expect(() =>
        dishSchema.parse({
          ...platoBase,
          nombre: { es: '', en: 'Short Ribs' },
        })
      ).toThrow()
    })
  })

  describe('categorySchema', () => {
    it('valida una categoría con al menos un plato', () => {
      const categoria: Category = {
        id: 'cortes-fuertes',
        nombre: { es: 'Cortes Fuertes', en: 'Main Cuts' },
        platos: [platoBase],
      }
      const parsed = categorySchema.parse(categoria)
      expect(parsed.platos).toHaveLength(1)
    })

    it('rechaza una categoría sin platos', () => {
      const categoriaVacia = {
        id: 'entradas',
        nombre: { es: 'Entradas' },
        platos: [],
      }
      expect(() => categorySchema.parse(categoriaVacia)).toThrow(
        'Cada categoría debe tener al menos un plato'
      )
    })

    it('rechaza una categoría con ID inválido', () => {
      const categoriaInvalida = {
        id: 'Entradas Principales',
        nombre: { es: 'Entradas' },
        platos: [platoBase],
      }
      expect(() => categorySchema.parse(categoriaInvalida)).toThrow(
        'El ID debe ser kebab-case'
      )
    })
  })
  describe('selectFeaturedDishes', () => {
    const plato = (id: string, destacado?: boolean) =>
      dishSchema.parse({ ...platoBase, id, destacado })

    it('devuelve solo los platos marcados, en el orden de la carta', () => {
      const categorias = [
        {
          id: 'a',
          nombre: { es: 'A' },
          platos: [plato('uno'), plato('dos', true)],
        },
        { id: 'b', nombre: { es: 'B' }, platos: [plato('tres', true)] },
      ]
      expect(selectFeaturedDishes(categorias).map((p) => p.id)).toEqual([
        'dos',
        'tres',
      ])
    })

    it('no inventa destacados: sin marcas devuelve una lista vacía', () => {
      const categorias = [
        { id: 'a', nombre: { es: 'A' }, platos: [plato('uno'), plato('dos')] },
      ]
      expect(selectFeaturedDishes(categorias)).toEqual([])
    })

    it('limita la lista para que quepa con aire', () => {
      const muchos = Array.from({ length: 9 }, (_, i) => plato(`p${i}`, true))
      const categorias = [{ id: 'a', nombre: { es: 'A' }, platos: muchos }]
      expect(selectFeaturedDishes(categorias)).toHaveLength(MAX_FEATURED_DISHES)
    })
  })
  describe('selectStarDish', () => {
    const modelo = (aprobado: boolean) => ({
      glb: 'a.glb',
      usdz: 'a.usdz',
      poster: 'a.webp',
      escalaRealCm: 24,
      aprobado,
    })
    const plato = (id: string, extra: Record<string, unknown> = {}) =>
      dishSchema.parse({ ...platoBase, id, ...extra })

    it('prefiere un destacado con modelo aprobado', () => {
      const categorias = [
        {
          id: 'a',
          nombre: { es: 'A' },
          platos: [
            plato('uno', { modelo: modelo(true) }),
            plato('dos', { modelo: modelo(true), destacado: true }),
          ],
        },
      ]
      expect(selectStarDish(categorias)?.id).toBe('dos')
    })

    it('ignora modelos sin aprobar y platos agotados', () => {
      const categorias = [
        {
          id: 'a',
          nombre: { es: 'A' },
          platos: [
            plato('uno', { modelo: modelo(false) }),
            plato('dos', { modelo: modelo(true), agotado: true }),
          ],
        },
      ]
      expect(selectStarDish(categorias)).toBeUndefined()
    })
  })
})
