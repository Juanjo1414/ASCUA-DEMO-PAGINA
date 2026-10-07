import type { RestaurantRepository } from '@/application/ports/restaurantRepository'
import type { EnvironmentDetector } from '@/application/ports/environmentDetector'
import type { ArLauncher } from '@/application/ports/arLauncher'
import type { SoldOutStore } from '@/application/ports/soldOutStore'
import type { AnalyticsTracker } from '@/application/ports/analyticsTracker'

export interface AppDependencies {
  restaurantRepository: RestaurantRepository
  environmentDetector: EnvironmentDetector
  arLauncher: ArLauncher
  soldOutStore: SoldOutStore
  analyticsTracker: AnalyticsTracker
}
