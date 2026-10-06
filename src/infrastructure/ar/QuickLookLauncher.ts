import type {
  ArLauncher,
  ArLauncherResult,
} from '@/application/ports/arLauncher'
import type { Dish } from '@/domain/dish'
import type { ArLaunchMode } from '@/domain/ar'

export class QuickLookLauncher implements ArLauncher {
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
