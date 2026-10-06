/**
 * @file doubles.ts
 * @description Dobles de prueba en memoria (fakes y mocks) para los puertos de Application.
 */

import type { Restaurant } from '@/domain/restaurant'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode, DeviceCapabilities } from '@/domain/ar'
import type { RestaurantRepository } from '@/application/ports/restaurantRepository'
import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { EnvironmentDetector } from '@/application/ports/environmentDetector'
import type { SoldOutStore } from '@/application/ports/soldOutStore'
import type {
  AnalyticsTracker,
  AnalyticsEvent,
} from '@/application/ports/analyticsTracker'

export class InMemoryRestaurantRepository implements RestaurantRepository {
  private restaurants = new Map<string, Restaurant>()

  constructor(initial: Restaurant[] = []) {
    for (const r of initial) {
      this.restaurants.set(r.slug, r)
    }
  }

  add(restaurant: Restaurant): void {
    this.restaurants.set(restaurant.slug, restaurant)
  }

  async getBySlug(slug: string): Promise<Restaurant | null> {
    return this.restaurants.get(slug) ?? null
  }
}

export class InMemorySoldOutStore implements SoldOutStore {
  private soldOutSet = new Set<string>()

  constructor(initialSoldOut: string[] = []) {
    for (const id of initialSoldOut) {
      this.soldOutSet.add(id)
    }
  }

  isSoldOut(dishId: string): boolean {
    return this.soldOutSet.has(dishId)
  }

  setSoldOut(dishId: string, soldOut: boolean): void {
    if (soldOut) {
      this.soldOutSet.add(dishId)
    } else {
      this.soldOutSet.delete(dishId)
    }
  }

  toggleSoldOut(dishId: string): boolean {
    const next = !this.isSoldOut(dishId)
    this.setSoldOut(dishId, next)
    return next
  }
}

export class MockEnvironmentDetector implements EnvironmentDetector {
  constructor(public capabilities: DeviceCapabilities) {}

  getCapabilities(): DeviceCapabilities {
    return this.capabilities
  }
}

export class MockArLauncher implements ArLauncher {
  public launchedDishes: { dish: Dish; mode: ArLaunchMode }[] = []
  public shouldFail = false
  public shouldThrow = false

  async launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult> {
    if (this.shouldThrow) {
      throw new Error('Fallo simulado al invocar motor AR nativo')
    }

    this.launchedDishes.push({ dish, mode })

    if (this.shouldFail) {
      return {
        success: false,
        mode,
        error: 'El usuario canceló la vista AR',
      }
    }

    return {
      success: true,
      mode,
    }
  }
}

export class MockAnalyticsTracker implements AnalyticsTracker {
  public events: AnalyticsEvent[] = []

  track(event: AnalyticsEvent): void {
    this.events.push(event)
  }
}
