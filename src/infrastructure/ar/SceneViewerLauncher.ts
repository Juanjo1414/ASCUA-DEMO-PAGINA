/**
 * Lanzador de realidad aumentada para Android (Scene Viewer de Google).
 *
 * Abre el plato en la cámara de Android sobre la mesa del comensal, en su
 * tamaño real. Lo usa `CompositeArLauncher` cuando `selectArLaunchMode`
 * elige el modo `scene-viewer`.
 * No decide si el dispositivo es compatible: eso es trabajo de
 * `BrowserEnvironmentDetector`/`selectArLaunchMode`, no de este lanzador.
 */
import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

export class SceneViewerLauncher implements ArLauncher {
  /**
   * Abre Scene Viewer con el modelo .glb del plato vía un `intent://`.
   *
   * `resizable=false` evita que el comensal pueda agrandar el plato más
   * allá de su tamaño real (lo exige la Ley 1480). `S.browser_fallback_url`
   * hace que, si el dispositivo no tiene la app de Google, el navegador
   * regrese a la página en vez de quedar en blanco.
   *
   * @param dish - Plato a mostrar. Debe tener `modelo.glb`.
   * @param mode - Modo de lanzamiento solicitado; si no es `scene-viewer`, falla.
   * @returns `{ success: true }` si se pudo abrir; `{ success: false, error }` si falta el archivo o el modo no corresponde.
   */
  async launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult> {
    if (mode !== 'scene-viewer') {
      return {
        success: false,
        mode,
        error: 'SceneViewerLauncher solo admite modo scene-viewer',
      }
    }

    const asset = dish.modelo
    if (!asset || !asset.glb) {
      return { success: false, mode, error: 'El plato no tiene modelo GLB' }
    }

    try {
      const glbAbsoluteUrl = new URL(asset.glb, window.location.origin).href

      const params = new URLSearchParams({
        file: glbAbsoluteUrl,
        mode: 'ar_preferred',
        resizable: 'false',
        title: dish.nombre['es'] || 'Plato',
      })
      const fallback = encodeURIComponent(window.location.href)
      const intent =
        `intent://arvr.google.com/scene-viewer/1.0?${params.toString()}` +
        `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
        `action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`

      window.location.href = intent

      return { success: true, mode }
    } catch (e) {
      return {
        success: false,
        mode,
        error: e instanceof Error ? e.message : 'Error al lanzar Scene Viewer',
      }
    }
  }
}
