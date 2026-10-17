/**
 * Lanzador de respaldo cuando el dispositivo no tiene Quick Look ni Scene
 * Viewer (desktop, navegadores embebidos sin soporte AR, etc.).
 *
 * No abre ninguna cámara: solo confirma que el plato tiene modelo .glb y
 * delega la presentación al visor 3D en pantalla (`ArViewer`/
 * `@google/model-viewer`), que es quien realmente dibuja el modelo cuando
 * `CompositeArLauncher` elige el modo `model-viewer-modal`. `ArViewer` no usa
 * el botón de AR nativo de model-viewer (solo gira el plato en pantalla), así
 * que la escala fija de la Ley 1480 la garantizan QuickLookLauncher y
 * SceneViewerLauncher, no este lanzador de respaldo.
 */
import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

export class ModelViewerFallbackLauncher implements ArLauncher {
  /**
   * Valida que el plato tenga modelo .glb para el visor en pantalla.
   *
   * @param dish - Plato a mostrar. Debe tener `modelo.glb`.
   * @param mode - Modo de lanzamiento solicitado; si no es `model-viewer-modal`, falla.
   * @returns `{ success: true }` si hay modelo; `{ success: false, error }` si falta o el modo no corresponde.
   */
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
