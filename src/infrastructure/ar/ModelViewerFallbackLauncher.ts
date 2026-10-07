import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

export class ModelViewerFallbackLauncher implements ArLauncher {
  async launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult> {
    if (mode !== 'model-viewer-modal') {
      return {
        success: false,
        mode,
        error:
          'ModelViewerFallbackLauncher solo admite modo model-viewer-modal',
      }
    }

    const asset = dish.modelo
    if (!asset || !asset.glb) {
      return { success: false, mode, error: 'El plato no tiene modelo GLB' }
    }

    return { success: true, mode }
  }
}
