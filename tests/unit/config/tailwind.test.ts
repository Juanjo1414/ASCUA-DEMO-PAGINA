import { describe, it, expect } from 'vitest'
import config from '../../../tailwind.config.js'

type ColorConAlfa = (args: { opacityValue?: string }) => string

// El config está tipado por JSDoc como `Config` de Tailwind (colores = valores
// genéricos); aquí sabemos que los de marca son funciones con alfa.
const colores = config.theme?.extend?.colors as unknown as Record<
  string,
  ColorConAlfa
>

describe('tailwind.config: colores de marca con transparencia', () => {
  it('sin transparencia devuelve la variable CSS tal cual', () => {
    expect(colores['porcelana']!({ opacityValue: undefined })).toBe(
      'var(--color-porcelana)'
    )
  })

  it('con la variable de opacidad de Tailwind (colores lisos) no genera NaN', () => {
    // Regresión: bg-porcelana llega con opacityValue = 'var(--tw-bg-opacity)'
    // y un Number() ingenuo producía "NaN%", rompiendo todos los fondos lisos.
    expect(
      colores['porcelana']!({ opacityValue: 'var(--tw-bg-opacity)' })
    ).toBe('var(--color-porcelana)')
  })

  it('con transparencia mezcla la variable con color-mix (antes la clase /NN se descartaba)', () => {
    // Regresión: con 'var(--color-x)' a secas, Tailwind no generaba
    // bg-porcelana/95 y el hero, los modales y las líneas finas perdían
    // su fondo o borde sin ningún error.
    expect(colores['porcelana']!({ opacityValue: '0.95' })).toBe(
      'color-mix(in srgb, var(--color-porcelana) 95%, transparent)'
    )
    expect(colores['tinta']!({ opacityValue: '0.8' })).toBe(
      'color-mix(in srgb, var(--color-tinta) 80%, transparent)'
    )
  })

  it('todos los tokens de DESIGN.md admiten transparencia', () => {
    for (const [nombre, color] of Object.entries(colores)) {
      expect(color({ opacityValue: '0.5' }), nombre).toContain('color-mix')
    }
  })

  it('no reemplaza la escala de espaciado de Tailwind', () => {
    // Regresión: un `spacing: { 8: "8px", 16: "16px"… }` pisaba la escala por
    // defecto, así que h-8 medía 8 px en vez de 32 px y py-24 daba 24 px en
    // vez de 96 px: logo diminuto y secciones sin aire en toda la página.
    expect(config.theme?.extend).not.toHaveProperty('spacing')
  })
})
