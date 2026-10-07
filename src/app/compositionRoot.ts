import { StaticJsonRestaurantRepository } from '@/infrastructure/content/StaticJsonRestaurantRepository'
import { QuickLookLauncher } from '@/infrastructure/ar/QuickLookLauncher'
import { SceneViewerLauncher } from '@/infrastructure/ar/SceneViewerLauncher'
import { ModelViewerFallbackLauncher } from '@/infrastructure/ar/ModelViewerFallbackLauncher'
import { BrowserEnvironmentDetector } from '@/infrastructure/browser/BrowserEnvironmentDetector'
import { LocalStorageSoldOutStore } from '@/infrastructure/storage/LocalStorageSoldOutStore'
import { CloudflareAnalyticsTracker } from '@/infrastructure/analytics/CloudflareAnalyticsTracker'
import { CompositeArLauncher } from '@/infrastructure/ar/CompositeArLauncher'

import type { AppDependencies } from '@/application/dependencies'
const environmentDetector = new BrowserEnvironmentDetector()

/**
 * Raíz de composición. Instancia las implementaciones concretas (infrastructure)
 * para ser inyectadas en la aplicación (React) como dependencias.
 * Ningún componente de React debe importar de infrastructure/ directamente.
 */
export const compositionRoot: AppDependencies = {
  restaurantRepository: new StaticJsonRestaurantRepository(),
  environmentDetector,
  arLauncher: new CompositeArLauncher({
    'quick-look': new QuickLookLauncher(),
    'scene-viewer': new SceneViewerLauncher(),
    'model-viewer-modal': new ModelViewerFallbackLauncher(),
  }),
  soldOutStore: new LocalStorageSoldOutStore(),
  analyticsTracker: new CloudflareAnalyticsTracker(),
}
