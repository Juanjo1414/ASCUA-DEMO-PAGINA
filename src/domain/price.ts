/**
 * @file price.ts
 * @description Value Object y validación de precios en pesos colombianos (COP).
 *
 * En la gastronomía colombiana los precios se manejan en pesos enteros sin centavos
 * (por ejemplo $ 28.000 COP). Este módulo encapsula la validación de valores no negativos
 * y el formateo estándar legible para comensales.
 */

import { z } from 'zod'

/**
 * Esquema Zod para validar montos monetarios en COP.
 * Exige número entero mayor o igual a cero.
 */
export const priceSchema = z
  .number({
    message: 'El precio debe ser un número entero',
  })
  .int('El precio en COP no admite decimales')
  .nonnegative('El precio no puede ser negativo')

export type Price = z.infer<typeof priceSchema>

/**
 * Formatea un valor numérico a representación monetaria estándar en pesos colombianos (COP).
 *
 * @example
 * formatCopPrice(28000) // "$ 28.000"
 * formatCopPrice(0)     // "$ 0"
 *
 * @param amount - Monto en pesos enteros.
 * @returns Cadena formateada con signo peso y separadores de miles con punto.
 */
export function formatCopPrice(amount: number): string {
  const rounded = Math.round(amount)
  // Usamos es-CO para garantizar formato con puntos como separador de miles.
  const formatted = new Intl.NumberFormat('es-CO', {
    maximumFractionDigits: 0,
  }).format(rounded)

  return `$ ${formatted}`
}
