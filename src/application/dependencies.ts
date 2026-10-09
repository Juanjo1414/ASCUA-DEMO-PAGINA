/**
 * Contrato único de todas las dependencias inyectables de la aplicación.
 *
 * Lo implementa `compositionRoot.ts` (con los adaptadores reales) y lo
 * consume `DependenciesProvider`/`useDependencies()` para pasarlas a React
 * vía contexto. No contiene ninguna implementación: solo agrupa los puertos
 * que `presentation/` puede usar sin importar nunca `infrastructure/`
 * directamente.
 */
import type { RestaurantRepository } from '@/application/ports/restaurantRepository'
import type { EnvironmentDetector } from '@/application/ports/environmentDetector'
import type { ArLauncher } from '@/application/ports/arLauncher'
import type { SoldOutStore } from '@/application/ports/soldOutStore'
import type { AnalyticsTracker } from '@/application/ports/analyticsTracker'
import type { UiPreferencesStore } from '@/application/ports/uiPreferencesStore'

export interface AppDependencies {
  restaurantRepository: RestaurantRepository
  environmentDetector: EnvironmentDetector
  arLauncher: ArLauncher
  soldOutStore: SoldOutStore
  analyticsTracker: AnalyticsTracker
  uiPreferencesStore: UiPreferencesStore
}
