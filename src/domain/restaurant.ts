/**
 * @file restaurant.ts
 * @description Entidad principal de Restaurante y reglas de negocio para la demo multi-restaurante.
 *
 * Contiene el contrato completo de `restaurant.json`, garantizando el aislamiento
 * de cada cliente mediante slugs no adivinables con sufijo aleatorio obligatorio,
 * fechas de vigencia comercial y autorización explícita para uso de marca y modelos.
 */

import { z } from 'zod'
import { categorySchema, localizedStringSchema } from './dish'
import { themeSchema } from './theme'

/**
 * Expresión regular que exige slugs en kebab-case con un sufijo aleatorio de exactamente 4 caracteres alfanuméricos.
 * Ejemplo válido: 'la-brasa-7k2p', 'el-cielo-medellin-9m1x'
 * Inválido: 'la-brasa', 'La-Brasa-7k2p', '../hack-1234'
 */
export const RESTAURANT_SLUG_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*-[a-z0-9]{4}$/

import { assetPathSchema } from './assetPath'
export { assetPathSchema }

/**
 * Esquema Zod para la autorización comercial de la demo.
 * Registra quién y por qué medio autorizó el uso de su carta y modelos en la demo.
 */
export const restaurantAuthorizationSchema = z.object({
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (AAAA-MM-DD)'),
  medio: z.enum([
    'whatsapp',
    'correo',
    'reunion_presencial',
    'llamada',
    'contrato',
    'propio',
  ]),
  contacto: z
    .string()
    .min(1, 'El nombre del contacto autorizante es obligatorio'),
})

export type RestaurantAuthorization = z.infer<
  typeof restaurantAuthorizationSchema
>

/**
 * Esquema Zod para la información de contacto y reservas del restaurante.
 */
export const restaurantContactSchema = z.object({
  /** Número de WhatsApp en formato internacional sin signos (ej: '573001234567') */
  whatsapp: z
    .string()
    .regex(
      /^\d{10,15}$/,
      'Número de WhatsApp inválido (solo dígitos con código de país)'
    ),
  /** Dirección física del local */
  direccion: z.string().optional(),
  /** Lista de horarios de atención (ej: ['Mar - Sáb: 12:00 - 22:00', 'Dom: 12:00 - 18:00']) */
  horario: z.array(z.string()).optional(),
  /** Enlace a Google Maps para llegar al restaurante */
  mapsUrl: z.string().url('URL de Google Maps inválida').optional(),
})

export type RestaurantContact = z.infer<typeof restaurantContactSchema>

/**
 * Esquema Zod integral para la entidad Restaurante.
 */
export const restaurantSchema = z.object({
  /** Versión del esquema para migraciones futuras */
  schemaVersion: z.literal(1),
  /** Slug público no adivinable con sufijo de 4 caracteres */
  slug: z
    .string()
    .regex(
      RESTAURANT_SLUG_REGEX,
      'El slug debe terminar con un sufijo aleatorio de 4 caracteres (ej: la-brasa-7k2p)'
    ),
  /** Estado de la demo: activo para consulta pública, pausado para mantenimiento */
  estado: z.enum(['activo', 'pausado']).default('activo'),
  /** Fecha de vencimiento de la demo comercial en formato AAAA-MM-DD */
  expira: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Formato de fecha de expiración inválido (AAAA-MM-DD)'
    ),
  /** Autorización formal de uso de fotos y marca */
  autorizacion: restaurantAuthorizationSchema,
  /** Nombre comercial del restaurante */
  nombre: z.string().min(1, 'El nombre del restaurante es obligatorio'),
  /** Idiomas soportados por este restaurante */
  idiomas: z
    .array(z.enum(['es', 'en']))
    .min(1)
    .default(['es']),
  /** Eslogan o frase breve que acompaña al nombre */
  eslogan: localizedStringSchema.optional(),
  /** Ruta a la imagen principal de la portada (opcional, usa la foto del primer plato si falta) */
  heroImagen: assetPathSchema.optional(),
  /** Configuración cromática y visual */
  tema: themeSchema,
  /** Canales de reserva y ubicación */
  contacto: restaurantContactSchema,
  /** Secciones del menú con sus respectivos platos */
  categorias: z
    .array(categorySchema)
    .min(1, 'El restaurante debe tener al menos una categoría en el menú'),
})

export type Restaurant = z.infer<typeof restaurantSchema>

/**
 * Función pura que comprueba si una demo ha superado su fecha de expiración comercial.
 *
 * @param expira - Fecha en formato 'AAAA-MM-DD'.
 * @param now - Fecha de referencia (por defecto la fecha actual).
 * @returns true si la demo ya expiró, false si aún se encuentra vigente.
 */
export function isRestaurantExpired(
  expira: string,
  now: Date = new Date()
): boolean {
  // Se interpreta la fecha límite al final del día correspondiente (23:59:59.999 UTC)
  const partes = expira.split('-').map(Number)
  const year = partes[0]
  const month = partes[1]
  const day = partes[2]

  if (!year || !month || !day) return true

  const fechaLimite = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999))
  return now.getTime() > fechaLimite.getTime()
}

/**
 * Función pura que devuelve una copia del restaurante con todas las rutas
 * de assets resueltas a absolutas relativas al root web (ej. /data/<slug>/assets/x.webp)
 */
export function resolveAssetUrls(restaurant: Restaurant): Restaurant {
  const prefix = `/data/${restaurant.slug}/`

  const resolvePath = (p?: string | null) => (p ? prefix + p : p)

  return {
    ...restaurant,
    tema: {
      ...restaurant.tema,
      logo: resolvePath(restaurant.tema.logo) as string | undefined,
    },
    categorias: restaurant.categorias.map((cat) => ({
      ...cat,
      platos: cat.platos.map((plato) => ({
        ...plato,
        foto: resolvePath(plato.foto) as string,
        modelo: plato.modelo
          ? {
              ...plato.modelo,
              glb: resolvePath(plato.modelo.glb) as string,
              usdz: resolvePath(plato.modelo.usdz) as string,
              poster: resolvePath(plato.modelo.poster) as string,
            }
          : null,
      })),
    })),
  }
}
