/**
 * @file uiPreferencesStore.ts
 * @description Puerto (interfaz) para recordar preferencias simples de interfaz
 * por dispositivo (qué idioma eligió el comensal, si ya vio la guía de AR).
 *
 * No es la fuente de verdad de ningún dato del restaurante ni del dominio:
 * solo evita repetirle al comensal algo que ya vio o ya eligió. Si el
 * almacenamiento del navegador no está disponible (modo privado, cuota
 * agotada), la implementación debe devolver `null`/no hacer nada en vez de
 * lanzar una excepción — eso es justamente lo que separa este puerto de
 * llamar a `localStorage` directo desde un componente.
 */

/**
 * Puerto para leer y guardar preferencias de interfaz por dispositivo.
 */
export interface UiPreferencesStore {
  /**
   * Lee una preferencia guardada.
   *
   * @param key - Clave de la preferencia.
   * @returns El valor guardado, o `null` si no existe o no se pudo leer.
   */
  get(key: string): string | null

  /**
   * Guarda una preferencia. Si no se puede guardar, no falla: la acción que
   * disparó el guardado debe poder continuar igual.
   *
   * @param key - Clave de la preferencia.
   * @param value - Valor a guardar.
   */
  set(key: string, value: string): void
}
