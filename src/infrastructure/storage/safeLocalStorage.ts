/**
 * @file safeLocalStorage.ts
 * @description Acceso a `localStorage` que nunca lanza una excepción.
 *
 * Lo usan los componentes que solo necesitan recordar una preferencia simple
 * del comensal (que ya vio la guía de AR, en qué idioma quiere ver la carta).
 * No es la fuente de verdad de nada del dominio: eso lo maneja cada puerto
 * de `application/ports/` con su propio adaptador (como `SoldOutStore`).
 *
 * Por qué existe: en Safari en modo privado (muy común en iPhone, el
 * teléfono que más usan los comensales) `localStorage.getItem`/`setItem`
 * puede lanzar una excepción en vez de simplemente no guardar nada. Antes de
 * este archivo, varios componentes llamaban a `localStorage` directo sin
 * `try/catch`, así que ese modo privado podía romper justo el botón que el
 * comensal toca para ver el plato en su mesa (hallazgo R-4-H16 de
 * docs/revision/inventario.md). `LocalStorageSoldOutStore` ya protegía sus
 * llamadas; este archivo generaliza ese mismo patrón para que no se repita.
 */

/**
 * Lee una clave de `localStorage`.
 *
 * @param key - Clave a leer.
 * @returns El valor guardado, o `null` si no existe o si `localStorage` no
 * está disponible (modo privado, cuota agotada, navegador que lo desactivó).
 */
export function safeLocalStorageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Guarda una clave en `localStorage`. Si falla (modo privado, cuota
 * agotada), no hace nada: la preferencia simplemente no se recuerda para la
 * próxima visita, pero la acción que el comensal estaba haciendo (ver el
 * plato en AR, cambiar de idioma) sigue funcionando igual.
 *
 * @param key - Clave a guardar.
 * @param value - Valor a guardar.
 */
export function safeLocalStorageSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // Ignorado a propósito: ver el comentario del archivo.
  }
}
