/**
 * @file environmentDetector.ts
 * @description Puerto (interfaz) para la detección de capacidades del dispositivo y navegador.
 *
 * Desacopla la inspección de User-Agent, pantalla y soporte de WebXR del caso de uso.
 */

import type { DeviceCapabilities } from '@/domain/ar'

/**
 * Puerto para obtener las capacidades técnicas del dispositivo del usuario.
 */
export interface EnvironmentDetector {
  /**
   * Inspecciona el entorno y retorna las capacidades del dispositivo.
   */
  getCapabilities(): DeviceCapabilities
}
