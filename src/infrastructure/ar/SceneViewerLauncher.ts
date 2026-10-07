import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

export class SceneViewerLauncher implements ArLauncher {
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
