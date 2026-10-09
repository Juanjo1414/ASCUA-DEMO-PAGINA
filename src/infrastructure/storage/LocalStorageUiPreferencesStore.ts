import type { UiPreferencesStore } from '@/application/ports/uiPreferencesStore'
import { safeLocalStorageGet, safeLocalStorageSet } from './safeLocalStorage'

/**
 * Implementación de `UiPreferencesStore` sobre `localStorage`.
 *
 * Usa `safeLocalStorage` (en vez de llamar a `window.localStorage` directo)
 * para que un navegador en modo privado, sin soporte de almacenamiento o con
 * la cuota agotada nunca rompa la interfaz: simplemente no recuerda la
 * preferencia para la próxima visita.
 */
export class LocalStorageUiPreferencesStore implements UiPreferencesStore {
  get(key: string): string | null {
    return safeLocalStorageGet(key)
  }

  set(key: string, value: string): void {
    safeLocalStorageSet(key, value)
  }
}
