/**
 * Constantes compartidas que no son secretas ni dependen del restaurante
 * (si dependieran de un restaurante, irían en su `restaurant.json`, no aquí).
 * La usan componentes de `presentation/` para enlaces o textos fijos de
 * toda la demo, como el formulario externo donde Juan recibe feedback de
 * los restaurantes que la prueban.
 */
export const FEEDBACK_URL = 'https://tally.so/r/n0q1L7'

/**
 * Slug de la demo genérica de Ascua que enlaza la landing (`/`). Es la demo
 * propia de PITS, no un restaurante de un cliente: la regla de "nunca listar
 * restaurantes en `/`" sigue en pie porque solo se enlaza esta.
 */
export const DEMO_RESTAURANT_SLUG = 'ascua-demo-abcd'
