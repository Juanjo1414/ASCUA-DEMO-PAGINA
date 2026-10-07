import type { ArLaunchMode } from '@/domain/ar'
import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'

/**
 * Elige el lanzador de AR correcto según el modo que decidió el dominio
 * (quick-look, scene-viewer o model-viewer-modal) y le delega el trabajo.
 * No es `async` a propósito: así la llamada al lanzador sigue ocurriendo
 * dentro del mismo toque del usuario, que es lo que exigen iOS y Android.
 */
export class CompositeArLauncher implements ArLauncher {
  constructor(
    private readonly launchers: Partial<Record<ArLaunchMode, ArLauncher>>
  ) {}

  launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult> {
    const launcher = this.launchers[mode]
    if (!launcher) {
      return Promise.resolve({
        success: false,
        mode,
        error: `No hay lanzador para el modo ${mode}`,
      })
    }
    return launcher.launch(dish, mode) // sin await: se conserva el gesto del usuario
  }
}
