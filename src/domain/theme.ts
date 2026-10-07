/**
 * @file theme.ts
 * @description Configuración estética y visual de la marca del restaurante.
 *
 * Permite que cada restaurante adapte su identidad cromática y tipográfica
 * sin alterar la estructura responsive ni los componentes de la aplicación.
 */

import { z } from 'zod'
import { assetPathSchema } from './assetPath'

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
  parTipografico: z.enum(['sans', 'editorial']).default('sans'),
  /** Ruta opcional al logo del restaurante (SVG o WebP) */
  logo: assetPathSchema.optional(),
})

export type Theme = z.infer<typeof themeSchema>

/** Luminancia relativa WCAG de un color #RGB o #RRGGBB. */
export function relativeLuminance(hex: string): number {
  let hexCode = hex.replace('#', '')
  if (hexCode.length === 3) {
    hexCode = hexCode
      .split('')
      .map((c) => c + c)
      .join('')
  }
  const rgb = parseInt(hexCode, 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const process = (c: number) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  const Rs = process(r)
  const Gs = process(g)
  const Bs = process(b)
  return 0.2126 * Rs + 0.7152 * Gs + 0.0722 * Bs
}

/** Razón de contraste WCAG entre dos colores. */
export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a)
  const l2 = relativeLuminance(b)
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

/**
 * Elige el color de texto (oscuro #0e150e o blanco #ffffff) que mejor se lee
 * sobre el color primario del restaurante, y devuelve su razón de contraste.
 */
export function pickReadableTextColor(bg: string): {
  color: string
  ratio: number
} {
  const dark = '#0e150e'
  const light = '#ffffff'
  const ratioDark = contrastRatio(bg, dark)
  const ratioLight = contrastRatio(bg, light)

  if (ratioLight > ratioDark) {
    return { color: light, ratio: ratioLight }
  }
  return { color: dark, ratio: ratioDark }
}
