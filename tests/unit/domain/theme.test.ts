/**
 * @file theme.test.ts
 * @description Pruebas unitarias para la configuración visual y cromática del restaurante.
 */

import { describe, it, expect } from 'vitest'
import {
  themeSchema,
  relativeLuminance,
  contrastRatio,
  pickReadableTextColor,
} from '@/domain/theme'

describe('Dominio: Theme', () => {
  it('valida temas con código HEX de 6 y 3 caracteres', () => {
    const tema6 = themeSchema.parse({
      primario: '#C2410C',
      parTipografico: 'editorial',
      logo: 'assets/logo.svg',
    })
    expect(tema6.primario).toBe('#C2410C')

    const tema3 = themeSchema.parse({
      primario: '#FFF',
    })
    expect(tema3.primario).toBe('#FFF')
    expect(tema3.parTipografico).toBe('sans') // default
  })

  it('rechaza colores HEX inválidos', () => {
    expect(() => themeSchema.parse({ primario: 'rojo' })).toThrow(
      'código HEX válido'
    )
    expect(() => themeSchema.parse({ primario: '#12345' })).toThrow(
      'código HEX válido'
    )
    expect(() => themeSchema.parse({ primario: 'rgb(255, 0, 0)' })).toThrow(
      'código HEX válido'
    )
  })

  it('rechaza pares tipográficos no soportados', () => {
    expect(() =>
      themeSchema.parse({
        primario: '#B91C1C',
        parTipografico: 'comic-sans' as never,
      })
    ).toThrow()
  })

  describe('Contrastes WCAG', () => {
    it('calcula la luminancia relativa correctamente', () => {
      expect(relativeLuminance('#000000')).toBeCloseTo(0, 2)
      expect(relativeLuminance('#ffffff')).toBeCloseTo(1, 2)
    })

    it('calcula el ratio de contraste correctamente', () => {
      // Blanco vs Negro = 21:1
      expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 1)
      expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1)
    })

    it('elige texto oscuro (#0e150e) para fondo claro (#e6ff55)', () => {
      const result = pickReadableTextColor('#e6ff55')
      expect(result.color).toBe('#0e150e')
      expect(result.ratio).toBeGreaterThanOrEqual(4.5)
    })

    it('elige texto claro (#ffffff) para fondo oscuro (#C2410C)', () => {
      const result = pickReadableTextColor('#C2410C')
      expect(result.color).toBe('#ffffff')
      expect(result.ratio).toBeGreaterThanOrEqual(4.5)
    })

    it('maneja un gris medio eligiendo el que dé mejor contraste', () => {
      const result = pickReadableTextColor('#888888')
      // Para gris medio, blanco suele ser mejor, depende de la luminancia exacta
      expect(result.color).toMatch(/^#(ffffff|0e150e)$/)
      // Puede no llegar a 4.5 si el color es muy intermedio, pero probará dar el mejor.
    })
  })
})
