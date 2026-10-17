import { describe, it, expect, beforeEach } from 'vitest'
import { LocalStorageUiPreferencesStore } from '@/infrastructure/storage/LocalStorageUiPreferencesStore'

describe('LocalStorageUiPreferencesStore', () => {
  const store = new LocalStorageUiPreferencesStore()

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('devuelve null cuando no hay nada guardado', () => {
    expect(store.get('ascua-lang')).toBeNull()
  })

  it('guarda y lee una preferencia', () => {
    store.set('ascua-lang', 'en')
    expect(store.get('ascua-lang')).toBe('en')
  })

  it('sobrescribe el valor anterior', () => {
    store.set('ascua:ar-guide-seen', '1')
    store.set('ascua:ar-guide-seen', '0')
    expect(store.get('ascua:ar-guide-seen')).toBe('0')
  })
})
