/**
 * @file toggleSoldOut.test.ts
 * @description Pruebas unitarias para el caso de uso toggleSoldOut.
 */

import { describe, it, expect } from 'vitest'
import { toggleSoldOut } from '@/application/use-cases/toggleSoldOut'
import { InMemorySoldOutStore } from './doubles'

describe('Caso de Uso: toggleSoldOut', () => {
  it('alterna el estado de disponibilidad del plato', () => {
    const store = new InMemorySoldOutStore()

    // Inicialmente no está agotado
    expect(store.isSoldOut('asado-tira')).toBe(false)

    // Primer toggle: pasa a agotado
    const r1 = toggleSoldOut('asado-tira', store)
    expect(r1).toBe(true)
    expect(store.isSoldOut('asado-tira')).toBe(true)

    // Segundo toggle: vuelve a estar disponible
    const r2 = toggleSoldOut('asado-tira', store)
    expect(r2).toBe(false)
    expect(store.isSoldOut('asado-tira')).toBe(false)
  })

  it('rechaza identificadores de plato vacíos', () => {
    const store = new InMemorySoldOutStore()

    expect(() => toggleSoldOut('', store)).toThrow(
      'El identificador del plato es obligatorio'
    )
    expect(() => toggleSoldOut('   ', store)).toThrow(
      'El identificador del plato es obligatorio'
    )
  })
})
