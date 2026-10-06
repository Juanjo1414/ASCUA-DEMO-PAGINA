/**
 * Pruebas unitarias para la configuración estática de la carta.
 *
 * Valida que los datos que alimentan el menú visual mantengan consistencia
 * en cantidad de elementos y rangos térmicos antes de la migración por capas.
 */
import { describe, it, expect } from 'vitest'
import { FOTOS, TEMPERATURAS } from '@/lib/carta'

describe('Carta estática', () => {
  it('contiene exactamente 8 platos con sus fotos correspondientes', () => {
    expect(FOTOS).toHaveLength(8)
    for (const ruta of FOTOS) {
      expect(ruta).toMatch(/^\/images\/carta\/[a-z]+\.jpg$/)
    }
  })

  it('asigna una temperatura válida en grados Celsius a cada plato', () => {
    expect(TEMPERATURAS).toHaveLength(8)
    for (const temp of TEMPERATURAS) {
      // Las temperaturas de la brasa oscilan entre calor suave (180 °C) y calor extremo (900 °C)
      expect(temp).toBeGreaterThanOrEqual(180)
      expect(temp).toBeLessThanOrEqual(1100)
    }
  })
})
