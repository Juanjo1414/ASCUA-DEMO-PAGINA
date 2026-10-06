/**
 * @file ar.ts
 * @description Entidades de Realidad Aumentada, capacidades de dispositivo y política de lanzamiento.
 *
 * Determina de forma pura cómo debe vivirse la experiencia 3D/AR en un dispositivo concreto:
 * Quick Look nativo en iOS, Scene Viewer nativo en Android, o visor 3D en pantalla
 * (model-viewer) si el navegador está embebido (WhatsApp, Instagram) o no soporta AR nativo.
 */

import { z } from 'zod'

/**
 * Esquema Zod para los assets 3D de un plato.
 */
export const arAssetSchema = z.object({
  /** Ruta relativa al archivo binario GLTF/GLB optimizado para web y Android */
  glb: z.string().min(1, 'La ruta al modelo GLB es obligatoria'),
  /** Ruta relativa al archivo USDZ optimizado para Apple Quick Look (iOS) */
  usdz: z.string().min(1, 'La ruta al modelo USDZ es obligatoria'),
  /** Imagen previa (póster) liviana en WebP */
  poster: z.string().min(1, 'La ruta al póster es obligatoria'),
  /** Lado más largo del plato servido en centímetros, para escala 1:1 en la mesa */
  escalaRealCm: z
    .number()
    .positive('La escala en centímetros debe ser un número positivo'),
  /** Bandera de control de calidad: solo modelos aprobados se ofrecen en AR */
  aprobado: z.boolean(),
  /** Nombre o identificador de quien aprobó el modelo */
  aprobadoPor: z.string().optional(),
  /** Fecha en formato AAAA-MM-DD en la que se dio el visto bueno */
  fechaAprobacion: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (AAAA-MM-DD)')
    .optional(),
})

export type ArAsset = z.infer<typeof arAssetSchema>

/**
 * Esquema Zod y tipo para las capacidades del dispositivo del comensal.
 * Es un modelo puro de dominio desacoplado de las APIs del navegador (window / navigator).
 */
export const deviceCapabilitiesSchema = z.object({
  isIos: z.boolean(),
  isAndroid: z.boolean(),
  isMobile: z.boolean(),
  isSafari: z.boolean(),
  isChrome: z.boolean(),
  /** Indica si se ejecuta dentro de un navegador embebido (Instagram, WhatsApp, TikTok, etc.) */
  isEmbeddedBrowser: z.boolean(),
  /** Soporta Apple Quick Look nativo */
  canQuickLook: z.boolean(),
  /** Soporta Google Scene Viewer nativo vía intent:// */
  canSceneViewer: z.boolean(),
})

export type DeviceCapabilities = z.infer<typeof deviceCapabilitiesSchema>

/**
 * Modos de visualización de un plato en 3D / Realidad Aumentada.
 */
export type ArLaunchMode =
  | 'quick-look' // AR nativo en iOS (Safari/Chrome en iPhone o iPad)
  | 'scene-viewer' // AR nativo en Android (Chrome/navegador con Google Play Services)
  | 'model-viewer-modal' // Visor interactivo 3D en pantalla dentro de la misma web
  | 'unsupported' // No hay modelo 3D disponible para este plato

/**
 * Política de dominio pura para seleccionar el modo de lanzamiento AR óptimo.
 *
 * Reglas de negocio:
 * 1. Si no hay modelo 3D o no está aprobado por el equipo de calidad, se retorna 'unsupported'.
 * 2. Si el usuario está navegando desde una app embebida (Instagram, WhatsApp, etc.), los lanzadores
 *    nativos de AR fallan o bloquean los enlaces 'intent://' y 'rel="ar"'. En ese caso se degrada
 *    amigablemente a 'model-viewer-modal' para que pueda girar el plato en pantalla.
 * 3. En iOS con soporte de Quick Look y archivo USDZ disponible, se usa 'quick-look'.
 * 4. En Android con soporte de Scene Viewer y archivo GLB disponible, se usa 'scene-viewer'.
 * 5. Si el dispositivo tiene pantalla moderna pero no soporta AR nativo (ej. escritorio o tablet
 *    sin sensores), se usa 'model-viewer-modal' con el archivo GLB.
 *
 * @param device - Capacidades detectadas del dispositivo.
 * @param asset - Asset 3D asociado al plato (o null/undefined si no tiene).
 * @returns Modo de lanzamiento correspondiente.
 */
export function selectArLaunchMode(
  device: DeviceCapabilities,
  asset?: ArAsset | null
): ArLaunchMode {
  if (!asset || !asset.aprobado) {
    return 'unsupported'
  }

  // Los navegadores dentro de apps rompen las redirecciones nativas de AR.
  if (device.isEmbeddedBrowser) {
    return asset.glb ? 'model-viewer-modal' : 'unsupported'
  }

  // iOS nativo vía Quick Look (requiere archivo USDZ)
  if (device.isIos && device.canQuickLook && asset.usdz) {
    return 'quick-look'
  }

  // Android nativo vía Scene Viewer (requiere archivo GLB)
  if (device.isAndroid && device.canSceneViewer && asset.glb) {
    return 'scene-viewer'
  }

  // Fallback con visor en pantalla (model-viewer) si hay archivo GLB disponible
  if (asset.glb) {
    return 'model-viewer-modal'
  }

  return 'unsupported'
}
