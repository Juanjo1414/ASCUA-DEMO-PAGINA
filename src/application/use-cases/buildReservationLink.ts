/**
 * @file buildReservationLink.ts
 * @description Caso de uso para construir el enlace directo a WhatsApp para reservas en el restaurante.
 *
 * Elimina formularios simulados y genera una URL universal de WhatsApp (wa.me) con
 * mensaje prellenado en lenguaje natural, respetando el idioma y datos del comensal.
 */

import type { Restaurant } from '@/domain/restaurant'

export interface ReservationParams {
  restaurant: Restaurant
  comensales?: number
  fecha?: string
  hora?: string
  comentarios?: string
  lang?: 'es' | 'en'
}

/**
 * Construye la URL universal de WhatsApp con el mensaje estructurado de reserva.
 *
 * @param params - Datos del restaurante y de la reserva.
 * @returns URL lista para usar en enlaces `<a>` o redirecciones.
 */
export function buildReservationLink({
  restaurant,
  comensales,
  fecha,
  hora,
  comentarios,
  lang = 'es',
}: ReservationParams): string {
  const telefono = restaurant.contacto.whatsapp.replace(/\D/g, '')

  let mensaje = ''

  if (lang === 'en') {
    mensaje = `Hello ${restaurant.nombre}, I would like to make a reservation`
    if (comensales)
      mensaje += ` for ${comensales} ${comensales === 1 ? 'person' : 'people'}`
    if (fecha) mensaje += ` on ${fecha}`
    if (hora) mensaje += ` at ${hora}`
    mensaje += '.'
    if (comentarios && comentarios.trim()) {
      mensaje += ` Note: ${comentarios.trim()}`
    }
  } else {
    mensaje = `Hola ${restaurant.nombre}, me gustaría reservar una mesa`
    if (comensales)
      mensaje += ` para ${comensales} ${comensales === 1 ? 'persona' : 'personas'}`
    if (fecha) mensaje += ` el ${fecha}`
    if (hora) mensaje += ` a las ${hora}`
    mensaje += '.'
    if (comentarios && comentarios.trim()) {
      mensaje += ` Nota: ${comentarios.trim()}`
    }
  }

  const encodedText = encodeURIComponent(mensaje)
  return `https://wa.me/${telefono}?text=${encodedText}`
}
