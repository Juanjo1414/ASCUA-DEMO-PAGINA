/**
 * @file theme.test.ts
 * @description Pruebas unitarias para la configuración visual y cromática del restaurante.
 */

import { describe, it, expect } from 'vitest'
import { themeSchema } from '@/domain/theme'

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
    expect(tema3.parTipografico).toBe('editorial') // default
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
        parTipografico: 'comic-sans' as any,
      })
    ).toThrow()
  })
})
