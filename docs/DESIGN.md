# Ascua — Sistema visual "La mesa"

> Reemplaza la referencia anterior (crema, verde bosque y lima, inspirada en un tercero). Registrado el 2026-10-16 desde lo construido (R-5-bis). Los valores viven en `src/presentation/theme/tokens.css`; este documento explica el porqué.

**Idea.** La landing de cada restaurante es la mesa vista desde arriba. El color del restaurante es el **mantel**, cada plato es un círculo de **porcelana** y el texto es **tinta**. Eso es justo lo que Ascua promete: tu plato, en tu mesa, a su tamaño real.

## Color

Toda la paleta se **deriva** de un solo valor por restaurante, `tema.primario`. RestaurantPage lo escribe en el contenedor `.tema` y los demás colores se recalculan ahí con `color-mix`.

| Token                           | Rol                                                                                                                                                                    |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mantel` / `on-mantel`          | Superficie principal (portada, "Lo más pedido", reserva, pie) y su texto. `on-mantel` es blanco o casi negro, el que mejor contraste dé (AA).                          |
| `on-mantel-soft`                | Texto secundario sobre mantel. Es el mismo color que `on-mantel`: una mezcla bajaba el contraste de colores de marca de tono medio. La jerarquía la dan tamaño y peso. |
| `porcelana`, `porcelana-dim`    | Hojas de papel y platos sobre el mantel (carta, contacto); la variante `dim` es la banda alterna. Llevan un susurro del primario.                                      |
| `tinta`, `tinta-soft`, `linea`  | Texto, texto secundario y líneas finas sobre porcelana.                                                                                                                |
| `brasa` (`#ff6b2c`), `on-brasa` | El único color fijo de Ascua. **Siempre** marca "Ver en mi mesa", para que se reconozca en cualquier restaurante.                                                      |
| `error`, `focus`                | Mensajes de error y anillo de foco (sobre el mantel el foco usa `on-mantel`).                                                                                          |

Estrategia: **drenched** en las superficies de mantel, alternadas con bandas de porcelana. Sin gradientes, sin texto con degradado.

## Tipografía

Fuentes alojadas en el sitio (`scripts/fuentes.mjs`, la CSP no admite terceros).

- **Display:** Bricolage Grotesque (variable). Titulares y nombres de plato.
- **Cuerpo:** Hanken Grotesk (variable).
- **Par "editorial":** el titular pasa a Young Serif. Es la lista cerrada de pares tipográficos que puede elegir un restaurante (`sans` | `editorial`).
- Escala fluida con `clamp()`: `display` (hasta 6 rem), `h2`, `h3`, `lead`, `body` (16 px), `small` (14 px). Cifras de ancho fijo (`.cifras`) en precios y medidas.

## Componentes y formas

- **Plato** (`.plato`): círculo de porcelana con sombra de apoyo (desplazada y difusa). Es la unidad del sistema.
- **Cota** (`.cota`): la medida real del plato ("26 cm · tamaño real"), con líneas a los lados como en un plano. Solo aparece si el plato tiene modelo 3D aprobado.
- **Botones** (todos ≥ 48 px, pastilla): `btn-ar` (brasa, la acción de AR), `btn-primary` (color del restaurante, sobre porcelana), `btn-porcelana` (sobre el mantel), `btn-secondary` (contorno).
- Carta en **filas** (foto redonda + texto), no tarjetas; "Lo más pedido" en círculos grandes.

## Estructura de la landing (mobile-first)

1. **Portada** (mantel): nombre grande, eslogan, botón principal, plato que llega a la mesa con su anillo de cota.
2. **Lo más pedido** (mantel): solo platos con `destacado: true`. En celular, fila que se desliza con el siguiente plato asomando; desde 768 px, cuadrícula.
3. **Cómo funciona** (porcelana dim): los 3 pasos de AR con ilustraciones propias. Solo si hay algún plato con modelo aprobado.
4. **Carta** (porcelana): por categorías; chips fijos en celular, índice lateral desde 1024 px.
5. **Reservar** y **Contacto**: WhatsApp prellenado, dirección y horario reales.
6. **Pie** (mantel): encuesta de opinión (Google Form), crédito discreto de PITS/Ascua.

Anchos de diseño: 360 (base), 390, 430, 768, 1024, 1280. Nunca scroll horizontal; solo la fila de "Lo más pedido" se desliza dentro de su contenedor.

## Movimiento

Un solo momento: los platos "se sirven". La portada entra con el plato desde abajo y el anillo de cota se traza; el resto aparece al hacer scroll (`useRevealOnScroll`). Solo CSS e `IntersectionObserver`; el contenido es visible por defecto y `prefers-reduced-motion` lo desactiva.

## Reglas

- Ningún hex ni fuente suelta en componentes: todo sale de los tokens.
- Un restaurante solo sobreescribe color primario (con contraste AA), par tipográfico y logo. El logo va dentro de una pastilla de porcelana para conservar sus colores.
- La marca PITS/Ascua solo en el pie. No se inventan datos: lo que no está en `restaurant.json` no se muestra.
