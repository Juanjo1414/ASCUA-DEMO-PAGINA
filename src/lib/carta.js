/*
  Datos de la carta que no dependen del idioma, en el mismo orden que
  translations.menuSection.dishes (y que getAssetForDishIndex en arAssets.js).
*/

// Foto de cada plato, recortada en cuadrado por scripts/carta.mjs.
export const FOTOS = [
  '/images/carta/pescado.jpg',
  '/images/carta/filete.jpg',
  '/images/carta/tagliatelle.jpg',
  '/images/carta/vieiras.jpg',
  '/images/carta/pato.jpg',
  '/images/carta/gnocchi.jpg',
  '/images/carta/langosta.jpg',
  '/images/carta/cerdo.jpg',
]

// La zona del fuego donde se termina cada plato, en °C. Coincide con
// translations.fuego.zonas.
export const TEMPERATURAS = [450, 900, 180, 450, 900, 180, 700, 250]
