/*
  Descarga las tipografías (Bodoni Moda y Archivo, variables) y las deja
  alojadas en el propio sitio: public/fonts/*.woff2 y src/fuentes.css.

  Por qué: la política de seguridad de Vercel (vercel.json) sólo permite
  fuentes del mismo sitio; servidas desde Google se bloquearían en producción.
  Además cargan más rápido desde el mismo dominio.

  Sólo se guardan los subconjuntos latinos (latin y latin-ext): cubren el
  español y el inglés de la página.

  Uso: node scripts/fuentes.mjs
*/
import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..')
const destino = join(raiz, 'public/fonts')
mkdirSync(destino, { recursive: true })

const URL_CSS =
  'https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&display=swap'
// Un navegador moderno, para que Google devuelva woff2 variables.
const NAVEGADOR =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

const css = execFileSync('curl', ['-s', '--max-time', '30', '-A', NAVEGADOR, URL_CSS], { encoding: 'utf8' })

const bloques = css.split('/* ').slice(1)
const salida = []
for (const bloque of bloques) {
  const subconjunto = bloque.slice(0, bloque.indexOf(' */'))
  if (subconjunto !== 'latin' && subconjunto !== 'latin-ext') continue
  const familia = bloque.match(/font-family: '([^']+)'/)[1]
  const estilo = bloque.match(/font-style: (\w+)/)[1]
  const url = bloque.match(/url\((https:[^)]+)\)/)[1]
  const nombre = `${familia.toLowerCase().replace(/\s+/g, '-')}-${estilo}-${subconjunto}.woff2`
  execFileSync('curl', ['-s', '--max-time', '60', '-o', join(destino, nombre), url])
  salida.push('/* ' + bloque.replace(url, `/fonts/${nombre}`).trim())
  console.log(`${familia} ${estilo} ${subconjunto} -> public/fonts/${nombre}`)
}

writeFileSync(
  join(raiz, 'src/fuentes.css'),
  `/* Generado por scripts/fuentes.mjs: Bodoni Moda y Archivo, alojadas en el sitio. */\n\n${salida.join('\n\n')}\n`,
)
