/*
  Prepara las fotos de la carta.

  Las fotos de los platos (fuentes/carta/gemini-*.jpg, fuera de public para que no se publiquen) son vistas cenitales de
  1408×768 y pesan casi 1 MB cada una. La carta las muestra en círculo, así que
  aquí se recorta el cuadrado del plato y se baja a 720 px: la misma foto, sin
  retoque de color, a una décima del peso.

  Uso: node scripts/carta.mjs
  Entrada: fuentes/carta/gemini-*.jpg   Salida: public/images/carta/
*/
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from 'ffmpeg-static'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const origen = join(raiz, 'fuentes/carta')
const destino = join(raiz, 'public/images/carta')
mkdirSync(destino, { recursive: true })

// En el mismo orden que la carta (translations.menuSection.dishes).
const PLATOS = ['pescado', 'filete', 'tagliatelle', 'vieiras', 'pato', 'gnocchi', 'langosta', 'cerdo']

for (const plato of PLATOS) {
  const entrada = join(origen, `gemini-${plato}.jpg`)
  if (!existsSync(entrada)) {
    console.log(`falta ${entrada}, se deja la salida que ya exista`)
    continue
  }
  execFileSync(ffmpeg, [
    '-y', '-loglevel', 'error',
    '-i', entrada,
    '-vf', 'crop=760:760:(iw-760)/2:(ih-760)/2,scale=720:720:flags=lanczos',
    '-q:v', '4',
    join(destino, `${plato}.jpg`),
  ])
  console.log(`gemini-${plato}.jpg -> carta/${plato}.jpg`)
}
