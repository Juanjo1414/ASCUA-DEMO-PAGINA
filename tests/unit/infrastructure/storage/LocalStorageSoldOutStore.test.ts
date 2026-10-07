import { describe, it, expect, beforeEach } from 'vitest'
import { LocalStorageSoldOutStore } from '@/infrastructure/storage/LocalStorageSoldOutStore'

describe('LocalStorageSoldOutStore', () => {
  const store = new LocalStorageSoldOutStore()

  beforeEach(() => {
    window.localStorage.clear()
  })

  it('starts with nothing sold out', () => {
    expect(store.isSoldOut('test-rest', 'dish-1')).toBe(false)
  })

  it('can set and get sold out status', () => {
    store.setSoldOut('test-rest', 'dish-1', true)
    expect(store.isSoldOut('test-rest', 'dish-1')).toBe(true)

    store.setSoldOut('test-rest', 'dish-1', false)
    expect(store.isSoldOut('test-rest', 'dish-1')).toBe(false)
  })

  it('can toggle sold out status', () => {
    expect(store.toggleSoldOut('test-rest', 'dish-2')).toBe(true)
    expect(store.isSoldOut('test-rest', 'dish-2')).toBe(true)

    expect(store.toggleSoldOut('test-rest', 'dish-2')).toBe(false)
    expect(store.isSoldOut('test-rest', 'dish-2')).toBe(false)
  })

  it('handles invalid json safely', () => {
    window.localStorage.setItem('ascua-soldout-test-rest', '{invalid')
    expect(store.isSoldOut('test-rest', 'dish-1')).toBe(false)
  })
})
