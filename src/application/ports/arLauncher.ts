/**
 * @file arLauncher.ts
 * @description Puerto (interfaz) para el lanzamiento y apertura de experiencias AR y 3D.
 *
 * Desacopla la invocación de Quick Look (iOS), Scene Viewer (Android) o el visor en pantalla
 * de la lógica de aplicación.
 */

import type { ArLaunchMode } from '@/domain/ar'
import type { Dish } from '@/domain/dish'

/**
 * Resultado de la ejecución del lanzamiento de Realidad Aumentada.
 */
export interface ArLauncherResult {
  /** Indica si la invocación o apertura se inició con éxito */
  success: boolean
  /** Modo de lanzamiento ejecutado */
  mode: ArLaunchMode
  /** Mensaje de error amigable en caso de falla */
  error?: string
}

/**
 * Puerto para lanzar la experiencia AR del plato.
 */
export interface ArLauncher {
  /**
   * Ejecuta el lanzamiento del visor o experiencia nativa correspondiente.
   *
   * @param dish - Entidad del plato seleccionado.
   * @param mode - Modo de lanzamiento seleccionado por la política de dominio.
   */
  launch(dish: Dish, mode: ArLaunchMode): Promise<ArLauncherResult>
}
