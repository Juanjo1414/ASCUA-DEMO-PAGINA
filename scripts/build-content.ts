/**
 * Script de build que convierte `content/restaurants/<slug>/` en el `dist/`
 * estático que se publica: copia los assets de cada restaurante y genera un
 * `index.html` con metaetiquetas SEO propias por restaurante.
 *
 * Lo corre `npm run build` (real, sobre `dist/`) y `npm run build:e2e`
 * (sobre `dist-e2e/`, con restaurantes de prueba) después de `vite build`,
 * que es quien genera el `index.html` base que este script personaliza.
 * No valida el contenido: eso ya lo hizo `validate-content.ts` antes.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const CONTENT_DIR =
  process.env.CONTENT_DIR || path.join(process.cwd(), 'content', 'restaurants')
// DIST_DIR es configurable para que las pruebas E2E (que usan restaurantes de
// prueba vía CONTENT_DIR) construyan en una carpeta aparte (`dist-e2e/`) y
// nunca pisen el `dist/` real que ya pasó por `npm run verify` y que mide
// Lighthouse CI. Ver docs/PLAN-REVISION.md, hallazgo R-1-H1.
const DIST_DIR = process.env.DIST_DIR
  ? path.resolve(process.env.DIST_DIR)
  : path.join(process.cwd(), 'dist')

/**
 * Escapa texto para insertarlo dentro de HTML o de un atributo (`content="..."`).
 *
 * `restaurant.json` lo llena el restaurante al darse de alta (P-602); si su
 * nombre o eslogan trae comillas o `<`, sin este escape rompería el HTML
 * generado o inyectaría markup en la página de todos los visitantes.
 */
function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

/**
 * Copia el contenido de cada restaurante a `dist/data/<slug>/` y genera un
 * `index.html` con metaetiquetas SEO propias en `dist/r/<slug>/`.
 *
 * @param contentDir - Carpeta raíz de restaurantes. Por defecto, `CONTENT_DIR`.
 * @param distDir - Carpeta de salida del build. Por defecto, `DIST_DIR`.
 * Recibirlos como parámetros (en vez de leer solo las variables de entorno)
 * permite que las pruebas unitarias usen carpetas temporales sin depender
 * de variables globales, igual que `validateContent`.
 */
export async function buildContent(
  contentDir: string = CONTENT_DIR,
  distDir: string = DIST_DIR
) {
  const distDataDir = path.join(distDir, 'data')
  const distRDir = path.join(distDir, 'r')

  console.log('Construyendo contenido estático para restaurantes...')

  // 1. Preparar directorios base
  await fs.mkdir(distDataDir, { recursive: true })
  await fs.mkdir(distRDir, { recursive: true })

  // 2. Leer la plantilla index.html generada por Vite
  const baseHtmlPath = path.join(distDir, 'index.html')
  let baseHtml = ''
  try {
    baseHtml = await fs.readFile(baseHtmlPath, 'utf-8')
  } catch {
    console.error(
      '❌ No se encontró dist/index.html. Ejecuta vite build primero.'
    )
    process.exit(1)
  }

  // 3. Procesar cada restaurante
  const dirs = await fs.readdir(contentDir, { withFileTypes: true })
  for (const dirent of dirs) {
    if (!dirent.isDirectory() || dirent.name === '_plantilla') continue

    const slug = dirent.name
    const restaurantSrcDir = path.join(contentDir, slug)
    const jsonPath = path.join(restaurantSrcDir, 'restaurant.json')

    try {
      const data = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
      const restaurantName = escapeHtml(data.nombre || 'Restaurante')
      const description = escapeHtml(
        data.eslogan?.es || `Menú en realidad aumentada de ${restaurantName}.`
      )

      // A. Copiar assets a dist/data/<slug>/
      const restaurantDestDataDir = path.join(distDataDir, slug)
      await copyDir(restaurantSrcDir, restaurantDestDataDir)

      // B. Generar index.html para SEO en dist/r/<slug>/index.html
      const restaurantDestRDir = path.join(distRDir, slug)
      await fs.mkdir(restaurantDestRDir, { recursive: true })

      // Inyectar tags SEO básicos y prevenir indexación (noindex) como indica la decisión
      const headTags = `
    <title>${restaurantName} - Menú 3D</title>
    <meta name="description" content="${description}">
    <meta property="og:title" content="${restaurantName} - Menú 3D">
    <meta property="og:description" content="${description}">
    <meta name="robots" content="noindex, nofollow">
  `
      const customizedHtml = baseHtml.replace('</head>', `${headTags}</head>`)
      await fs.writeFile(
        path.join(restaurantDestRDir, 'index.html'),
        customizedHtml
      )
      console.log(`✅ Construido HTML y copiado de datos para: ${slug}`)
    } catch (e) {
      console.error(`❌ Error procesando el restaurante ${slug}:`, e)
    }
  }

  // 4. Escribir _redirects para Cloudflare Pages
  const redirectsContent = '/* /index.html 200\n'
  await fs.writeFile(path.join(distDir, '_redirects'), redirectsContent)
  console.log('✅ Generado archivo _redirects')

  console.log('Build de contenido finalizado.')
}

// Permitir correr directo desde npm scripts, igual que validate-content.ts
if (process.argv[1] && process.argv[1].endsWith('build-content.ts')) {
  buildContent().catch(console.error)
}
