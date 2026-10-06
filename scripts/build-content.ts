import fs from 'node:fs/promises'
import path from 'node:path'

const CONTENT_DIR =
  process.env.CONTENT_DIR || path.join(process.cwd(), 'content', 'restaurants')
const DIST_DIR = path.join(process.cwd(), 'dist')
const DIST_DATA_DIR = path.join(DIST_DIR, 'data')
const DIST_R_DIR = path.join(DIST_DIR, 'r')

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

async function buildContent() {
  console.log('Construyendo contenido estático para restaurantes...')

  // 1. Preparar directorios base
  await fs.mkdir(DIST_DATA_DIR, { recursive: true })
  await fs.mkdir(DIST_R_DIR, { recursive: true })

  // 2. Leer la plantilla index.html generada por Vite
  const baseHtmlPath = path.join(DIST_DIR, 'index.html')
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
  const dirs = await fs.readdir(CONTENT_DIR, { withFileTypes: true })
  for (const dirent of dirs) {
    if (!dirent.isDirectory() || dirent.name === '_plantilla') continue

    const slug = dirent.name
    const restaurantSrcDir = path.join(CONTENT_DIR, slug)
    const jsonPath = path.join(restaurantSrcDir, 'restaurant.json')

    try {
      const data = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
      const restaurantName = data.nombre || 'Restaurante'
      const description = `Menú en realidad aumentada de ${restaurantName}.`

      // A. Copiar assets a dist/data/<slug>/
      const restaurantDestDataDir = path.join(DIST_DATA_DIR, slug)
      await copyDir(restaurantSrcDir, restaurantDestDataDir)

      // B. Generar index.html para SEO en dist/r/<slug>/index.html
      const restaurantDestRDir = path.join(DIST_R_DIR, slug)
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
  await fs.writeFile(path.join(DIST_DIR, '_redirects'), redirectsContent)
  console.log('✅ Generado archivo _redirects')

  console.log('Build de contenido finalizado.')
}

buildContent().catch(console.error)
