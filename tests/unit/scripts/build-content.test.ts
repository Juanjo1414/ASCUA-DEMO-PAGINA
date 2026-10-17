import { describe, it, expect, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildContent } from '../../../scripts/build-content'

const foldersToClean: string[] = []

afterEach(async () => {
  while (foldersToClean.length > 0) {
    const dir = foldersToClean.pop()
    if (dir) await fs.rm(dir, { recursive: true, force: true })
  }
})

/**
 * Prepara una carpeta de contenido con un restaurante y una carpeta `dist`
 * con el `index.html` base que deja `vite build`, para poder correr
 * `buildContent` igual que lo hace `npm run build` pero sobre rutas
 * temporales y sin tocar el `dist/` real.
 */
async function prepararEntorno(nombreRestaurante: string) {
  const contentDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ascua-content-'))
  const distDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ascua-dist-'))
  foldersToClean.push(contentDir, distDir)

  const slug = 'prueba-abcd'
  await fs.mkdir(path.join(contentDir, slug), { recursive: true })
  await fs.writeFile(
    path.join(contentDir, slug, 'restaurant.json'),
    JSON.stringify({ nombre: nombreRestaurante })
  )
  await fs.mkdir(path.join(contentDir, '_plantilla'), { recursive: true })
  await fs.writeFile(
    path.join(contentDir, '_plantilla', 'restaurant.json'),
    JSON.stringify({ nombre: 'Plantilla' })
  )

  await fs.writeFile(
    path.join(distDir, 'index.html'),
    '<html><head></head><body></body></html>'
  )

  return { contentDir, distDir, slug }
}

describe('buildContent', () => {
  it('escapa el nombre del restaurante al generar el HTML (evita inyección de markup)', async () => {
    const { contentDir, distDir, slug } = await prepararEntorno(
      'Restaurante "<script>alert(1)</script>"'
    )

    await buildContent(contentDir, distDir)

    const html = await fs.readFile(
      path.join(distDir, 'r', slug, 'index.html'),
      'utf-8'
    )

    expect(html).not.toContain('<script>alert(1)</script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('no genera ninguna página para la carpeta _plantilla', async () => {
    const { contentDir, distDir } = await prepararEntorno('Restaurante Normal')

    await buildContent(contentDir, distDir)

    await expect(
      fs.access(path.join(distDir, 'r', '_plantilla'))
    ).rejects.toThrow()
  })
})
