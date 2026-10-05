# Product

<!-- impeccable:product-schema 1 -->

> Escrito sin ronda de entrevista, a partir de lo que el titular pidió por
> escrito. Ascua es una marca inventada (lo confirmó el titular): la historia,
> las zonas del fuego y las temperaturas de cada plato son parte del concepto,
> no datos de un local real.

## Platform

web

## Users

- Comensales de Medellín buscando dónde cenar una noche especial, casi siempre
  desde el celular y muchas veces dentro del navegador de Instagram o WhatsApp
  *(inferido: el sitio ya detecta navegadores embebidos para la RA)*.
- El titular del proyecto usa la página como pieza de portafolio de "webs
  premium": tiene que verse al nivel de un estudio, no de una plantilla.

## Product Purpose

Landing de una sola página del restaurante **Ascua**: cocina de autor a la brasa,
cocina abierta. Tiene que dar ganas de reservar y mostrar la carta. Éxito: el
visitante entiende qué es Ascua en segundos, mira la carta y toca "Reservar".

## Positioning

La carta se puede ver en 3D y en realidad aumentada desde el navegador, sin
instalar nada: el plato aparece sobre la mesa del comensal. Ningún restaurante
vecino lo ofrece.

## Operating Context

- Sitio estático (React 19 + Vite + Tailwind + GSAP), desplegado en Vercel.
- Bilingüe es/en (persistido en localStorage). Sin tema claro: la experiencia es
  fuego de noche, decidido en el rediseño "termómetro + brasa".
- Abre martes a domingo, 7 p.m. – 11 p.m. Reserva con un día de anticipación.
- Dirección: Calle 10 #45-20, local 3, Medellín.

## Capabilities and Constraints

- **Intocable:** la lógica de RA/3D (`lib/launchAr.js`, `lib/arAssets.js`,
  `lib/browserEnv.js`, `ArDishModal.jsx`, `ArViewer.jsx`) y los ocho platos de la
  carta con sus fotos. `Menu.jsx` se puede rediseñar (lo autorizó el titular)
  siempre que llame igual a `getAssetForDishIndex`, `launchAr` y el modal. Sólo
  los platos 0 (lubina) y 1 (filete) tienen modelo publicado.
- Sin fotos fuera de la carta: el titular pidió despedirse de todas las
  imágenes del sitio anterior. El fuego se dibuja en código.
- Sin logo: sólo la palabra ASCUA.
- El formulario de contacto no envía nada: la respuesta es simulada.
- Sin video controlado por scroll: se trababa en Android de gama media.
- Tiene que correr fluido en Android de gama media.

## Brand Commitments

- Nombre: **Ascua** (se mantiene). Sin logo: la marca es la palabra en Bodoni
  espaciada.
- Dirección visual aprobada por el titular: una experiencia completa de scroll,
  como COTA, contada como la vida de una brasa con un termómetro (de 420 °C en
  el hero a 1100 °C en la reserva, y la sobremesa que se enfría). El hero (disco
  que se abre, A S C U A enorme) se mantiene; sin platos flotantes.
- Voz de la copia actual: frases cortas, concretas, sobre fuego y oficio.

## Evidence on Hand

- Ocho fotos cenitales de platos (generadas), en círculo. Nada más en raster.
- Dos modelos 3D publicados (lubina, filete).
- Tres testimonios en `translations.js`. No hay prensa, premios ni precios: no
  se inventan.
- Horario, dirección y los tres testimonios vienen del sitio original.

## Product Principles

1. La RA es la prueba, no un adorno: todo el recorrido empuja hacia la carta.
2. Reservar tiene que estar siempre a un toque.
3. Fluido en un Android de gama media o no sale.
4. Lo inventado es concepto (la historia del fuego, las temperaturas), nunca
   premios ni precios.
