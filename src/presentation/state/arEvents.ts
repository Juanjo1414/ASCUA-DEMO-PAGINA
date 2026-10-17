/**
 * Nombre del evento con el que un componente le pide a `Menu` abrir el flujo
 * de "Ver en mi mesa" para un plato (por ejemplo, el botón de la portada).
 *
 * Por qué un evento y no props: `Menu` es dueño del flujo completo (guía de 3
 * pasos, lanzamiento, visor) y la portada está en otra rama del árbol. Es el
 * mismo patrón que ya usa `ascua:reservar`. El `detail` lleva `{ dishId }`.
 */
export const EVENTO_VER_EN_MESA = 'ascua:ver-en-mesa'

/** Datos que viajan en el evento `EVENTO_VER_EN_MESA`. */
export interface VerEnMesaDetalle {
  dishId: string
}
