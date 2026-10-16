/**
 * Captura de pantallas de revisión visual (C-31 de la revisión).
 *
 * Abre la landing y la página de un restaurante en los 5 anchos que exige
 * CLAUDE.md (360, 390, 430, 768 y 1280 px) y guarda un PNG de página
 * completa por cada combinación (y un PNG por sección de la página del
 * restaurante, para verlas a tamaño real) en `.impeccable/review/<etiqueta>/`,
 * carpeta ignorada por git. Sirve para comparar "antes / después" de un cambio de
 * diseño y para detectar scroll horizontal (avisa si el contenido es más
 * ancho que la ventana).
 *
 * Uso: `npx tsx scripts/capturar-pantallas.ts <etiqueta> [slug]`
 * Requiere un servidor ya levantado en `BASE_URL` (por defecto
 * http://localhost:4173, el de `npm run preview`). No modifica nada del sitio.
 */
import { chromium, type Page } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const ANCHOS = [
  { ancho: 360, alto: 640 },
  { ancho: 390, alto: 844 },
  { ancho: 430, alto: 932 },
  { ancho: 768, alto: 1024 },
  { ancho: 1280, alto: 800 },
]

const SECCIONES = ['#top', '#menu', '#reservar', '#contacto', 'footer']

/** Recorre la página para que las imágenes con carga diferida se descarguen. */
async function cargarTodo(page: Page) {
  await page.evaluate(async () => {
    const paso = Math.max(window.innerHeight / 2, 200)
    for (let y = 0; y < document.body.scrollHeight; y += paso) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForLoadState('networkidle')
}

async function main() {
  const etiqueta = process.argv[2] ?? 'sin-etiqueta'
  const slug = process.argv[3] ?? 'ascua-demo-abcd'
  const baseUrl = process.env.BASE_URL ?? 'http://localhost:4173'
  const salida = path.join(process.cwd(), '.impeccable', 'review', etiqueta)
  await fs.mkdir(salida, { recursive: true })

  const rutas = [
    { nombre: 'landing', ruta: '/' },
    { nombre: 'restaurante', ruta: `/r/${slug}` },
  ]

  const browser = await chromium.launch()
  for (const { ancho, alto } of ANCHOS) {
    const context = await browser.newContext({
      viewport: { width: ancho, height: alto },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
    })
    for (const { nombre, ruta } of rutas) {
      const page = await context.newPage()
      await page.goto(`${baseUrl}${ruta}`, { waitUntil: 'networkidle' })
      await page.waitForTimeout(800)
      const desborde = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth
      )
      if (desborde > 0) {
        console.warn(
          `⚠️ ${nombre} a ${ancho}px: scroll horizontal de ${desborde}px`
        )
      }
      await cargarTodo(page)
      await page.screenshot({
        path: path.join(salida, `${nombre}-${ancho}.png`),
        fullPage: true,
      })
      if (nombre === 'restaurante') {
        for (const seccion of SECCIONES) {
          const el = page.locator(seccion).first()
          if ((await el.count()) === 0) continue
          await el.screenshot({
            path: path.join(
              salida,
              `${nombre}-${seccion.replace('#', '')}-${ancho}.png`
            ),
          })
        }
      }
      await page.close()
    }
    await context.close()
  }
  await browser.close()
  console.log(`✅ Capturas guardadas en ${salida}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
