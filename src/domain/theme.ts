/**
 * @file theme.ts
 * @description Configuración estética y visual de la marca del restaurante.
 *
 * Permite que cada restaurante adapte su identidad cromática y tipográfica
 * sin alterar la estructura responsive ni los componentes de la aplicación.
 */

import { z } from 'zod'

/**
 * Esquema Zod para el tema visual.
 */
export const themeSchema = z.object({
  /** Color primario de marca en formato hexadecimal (ej: '#C2410C' o '#B91C1C') */
  primario: z
    .string()
    .regex(
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      'El color primario debe ser un código HEX válido'
    ),
  /** Par tipográfico configurado para la carta */
  parTipografico: z
    .enum(['editorial', 'sans', 'brasa', 'mono'])
    .default('editorial'),
  /** Ruta opcional al logo del restaurante (SVG o WebP) */
  logo: z.string().optional(),
})

export type Theme = z.infer<typeof themeSchema>
