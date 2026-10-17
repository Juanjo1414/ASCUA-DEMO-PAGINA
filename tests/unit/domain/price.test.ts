/**
 * @file price.test.ts
 * @description Pruebas unitarias para el Value Object y formateo de precios en COP.
 */

import { describe, it, expect } from 'vitest'
import { priceSchema, formatCopPrice } from '@/domain/price'

describe('Dominio: Price', () => {
  describe('priceSchema', () => {
    it('acepta enteros positivos y cero', () => {
      expect(priceSchema.parse(0)).toBe(0)
      expect(priceSchema.parse(28000)).toBe(28000)
      expect(priceSchema.parse(150000)).toBe(150000)
    })

    it('rechaza números negativos', () => {
      expect(() => priceSchema.parse(-100)).toThrow(
        'El precio no puede ser negativo'
      )
    })

    it('rechaza decimales en pesos colombianos', () => {
      expect(() => priceSchema.parse(25000.5)).toThrow(
        'El precio en COP no admite decimales'
      )
    })

    it('rechaza valores no numéricos o vacíos', () => {
      expect(() => priceSchema.parse('28000')).toThrow()
      expect(() => priceSchema.parse(null)).toThrow()
      expect(() => priceSchema.parse(undefined)).toThrow()
    })
  })

  describe('formatCopPrice', () => {
    it('formatea correctamente montos típicos de carta en Colombia', () => {
      // Usamos regex o normalización para asegurar soporte multiplataforma con espacios normales/de no separación
      const f0 = formatCopPrice(0).replace(/\u00a0/g, ' ')
      const f28k = formatCopPrice(28000).replace(/\u00a0/g, ' ')
      const f120k = formatCopPrice(120000).replace(/\u00a0/g, ' ')

      expect(f0).toBe('$ 0')
      expect(f28k).toBe('$ 28.000')
      expect(f120k).toBe('$ 120.000')
    })

    it('redondea adecuadamente si recibe decimales accidentales', () => {
      const formatted = formatCopPrice(28000.4).replace(/\u00a0/g, ' ')
      expect(formatted).toBe('$ 28.000')
    })
  })
})
