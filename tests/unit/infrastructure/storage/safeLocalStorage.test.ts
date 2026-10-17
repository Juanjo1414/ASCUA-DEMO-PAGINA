import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  safeLocalStorageGet,
  safeLocalStorageSet,
} from '@/infrastructure/storage/safeLocalStorage'

describe('safeLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('guarda y lee un valor normalmente', () => {
    safeLocalStorageSet('clave', 'valor')
    expect(safeLocalStorageGet('clave')).toBe('valor')
  })

  it('devuelve null si la clave no existe', () => {
    expect(safeLocalStorageGet('no-existe')).toBeNull()
  })

  it('no lanza y devuelve null si localStorage.getItem falla (modo privado)', () => {
    const spy = vi
      .spyOn(window.localStorage, 'getItem')
      .mockImplementation(() => {
        throw new DOMException('SecurityError')
      })
    expect(() => safeLocalStorageGet('clave')).not.toThrow()
    expect(safeLocalStorageGet('clave')).toBeNull()
    spy.mockRestore()
  })

  it('no lanza si localStorage.setItem falla (cuota agotada)', () => {
    const spy = vi
      .spyOn(window.localStorage, 'setItem')
      .mockImplementation(() => {
        throw new DOMException('QuotaExceededError')
      })
    expect(() => safeLocalStorageSet('clave', 'valor')).not.toThrow()
    spy.mockRestore()
  })
})
