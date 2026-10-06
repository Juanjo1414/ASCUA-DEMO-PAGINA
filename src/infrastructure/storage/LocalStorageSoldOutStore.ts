import type { SoldOutStore } from '@/application/ports/soldOutStore'

/**
 * Implementación de SoldOutStore basada en localStorage.
 * Los agotados se guardan por restaurante, serializados como un arreglo JSON.
 */
export class LocalStorageSoldOutStore implements SoldOutStore {
  private getKey(slug: string): string {
    return `ascua-soldout-${slug}`
  }

  private getSoldOutSet(slug: string): Set<string> {
    try {
      const stored = window.localStorage.getItem(this.getKey(slug))
      if (!stored) return new Set()
      const array = JSON.parse(stored)
      if (Array.isArray(array)) {
        return new Set(array)
      }
      return new Set()
    } catch {
      return new Set()
    }
  }

  private saveSoldOutSet(slug: string, set: Set<string>): void {
    try {
      window.localStorage.setItem(
        this.getKey(slug),
        JSON.stringify(Array.from(set))
      )
    } catch {
      // Ignorar errores de cuota o localStorage desactivado
    }
  }

  isSoldOut(slug: string, dishId: string): boolean {
    const set = this.getSoldOutSet(slug)
    return set.has(dishId)
  }

  setSoldOut(slug: string, dishId: string, soldOut: boolean): void {
    const set = this.getSoldOutSet(slug)
    if (soldOut) {
      set.add(dishId)
    } else {
      set.delete(dishId)
    }
    this.saveSoldOutSet(slug, set)
  }

  toggleSoldOut(slug: string, dishId: string): boolean {
    const set = this.getSoldOutSet(slug)
    const isNowSoldOut = !set.has(dishId)
    if (isNowSoldOut) {
      set.add(dishId)
    } else {
      set.delete(dishId)
    }
    this.saveSoldOutSet(slug, set)
    return isNowSoldOut
  }
}
