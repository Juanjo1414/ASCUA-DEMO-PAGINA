/**
 * Lanzador de realidad aumentada para iPhone (AR Quick Look de Apple).
 *
 * Abre el plato en la cámara del iPhone sobre la mesa del comensal, en su
 * tamaño real. Lo usa `CompositeArLauncher` cuando `selectArLaunchMode`
 * elige el modo `quick-look` (Safari en iOS).
 * No decide si el dispositivo es compatible: eso es trabajo de
 * `BrowserEnvironmentDetector`/`selectArLaunchMode`, no de este lanzador.
 */
import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

export class QuickLookLauncher implements ArLauncher {
  /**
   * Abre Quick Look con el modelo .usdz del plato.
   *
   * Safari solo abre Quick Look si el enlace `<a rel="ar">` contiene una
   * `<img>` hija; sin ella, el iPhone descarga el archivo en vez de mostrar
   * el plato. El `click()` ocurre de forma sincrónica dentro del gesto del
   * usuario (sin `await` antes), porque iOS bloquea el lanzamiento si no
   * detecta que viene directo de un toque.
   *
   * @param dish - Plato a mostrar. Debe tener `modelo.usdz` y `modelo.poster`.
   * @param mode - Modo de lanzamiento solicitado; si no es `quick-look`, falla.
   * @returns `{ success: true }` si se pudo abrir; `{ success: false, error }` si falta el archivo o el modo no corresponde.
   */
  async launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult> {
    if (mode !== 'quick-look') {
      return {
        success: false,
        mode,
        error: 'QuickLookLauncher solo admite modo quick-look',
      }
    }

    const asset = dish.modelo
    if (!asset || !asset.usdz) {
      return { success: false, mode, error: 'El plato no tiene modelo USDZ' }
    }

    try {
      const anchor = document.createElement('a')
      anchor.setAttribute('rel', 'ar')
      // allowsContentScaling=0 clava el modelo a su tamano real
      anchor.href = `${asset.usdz}#allowsContentScaling=0`
      anchor.style.display = 'none'

      const img = document.createElement('img')
      img.src = asset.poster
      img.alt = ''
      anchor.appendChild(img)

      document.body.appendChild(anchor)
      anchor.click()

      setTimeout(() => anchor.remove(), 1000)

      return { success: true, mode }
    } catch (e) {
      return {
        success: false,
        mode,
        error: e instanceof Error ? e.message : 'Error al lanzar Quick Look',
      }
    }
  }
}
