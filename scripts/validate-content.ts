import fs from 'node:fs/promises'
import path from 'node:path'
import crypto from 'node:crypto'
import { restaurantSchema, isRestaurantExpired } from '../src/domain/restaurant'
import { pickReadableTextColor } from '../src/domain/theme'

const CONTENT_DIR =
  process.env.CONTENT_DIR || path.join(process.cwd(), 'content', 'restaurants')
const MAX_SIZES = {
  glb: 5 * 1024 * 1024, // 5 MB
  usdz: 8 * 1024 * 1024, // 8 MB
  webp: 300 * 1024, // 300 KB
  svg: 300 * 1024, // 300 KB
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function hashFile(filePath: string) {
  const content = await fs.readFile(filePath)
  return crypto.createHash('sha256').update(content).digest('hex')
}

/**
 * Valida el contenido de todos los restaurantes.
 *
 * @param contentDir - Carpeta raíz de restaurantes a validar. Por defecto,
 * `CONTENT_DIR` (controlado por la variable de entorno del mismo nombre,
 * usada por el build real). Recibirlo como parámetro permite que las
 * pruebas unitarias apunten a carpetas de prueba sin depender de variables
 * de entorno globales.
 */
export async function validateContent(contentDir: string = CONTENT_DIR) {
  const dirs = await fs.readdir(contentDir, { withFileTypes: true })
  let hasErrors = false
  let hasWarnings = false
  const globalHashes = new Map<string, string>() // hash -> path

  for (const dirent of dirs) {
    if (!dirent.isDirectory()) continue

    const folderName = dirent.name
    const isTemplate = folderName === '_plantilla'
    const restaurantDir = path.join(contentDir, folderName)
    const jsonPath = path.join(restaurantDir, 'restaurant.json')

    if (!(await fileExists(jsonPath))) {
      console.error(`❌ [${folderName}] Faltante: restaurant.json`)
      hasErrors = true
      continue
    }

    try {
      const rawJson = JSON.parse(await fs.readFile(jsonPath, 'utf8'))
      const parsed = restaurantSchema.safeParse(rawJson)

      if (!parsed.success) {
        console.error(
          `❌ [${folderName}] Esquema inválido:\n`,
          parsed.error.issues
        )
        hasErrors = true
        continue
      }

      const data = parsed.data

      // Validación de contraste AA (4.5:1)
      const { ratio } = pickReadableTextColor(data.tema.primario)

      if (ratio < 4.5) {
        console.error(
          `❌ [${folderName}] El color primario (${data.tema.primario}) no tiene contraste AA suficiente con texto claro/oscuro. Ratio máximo posible: ${ratio.toFixed(2)}:1 (mínimo 4.5:1)`
        )
        hasErrors = true
      }

      // Validación de slug vs carpeta
      if (!isTemplate && data.slug !== folderName) {
        console.error(
          `❌ [${folderName}] El slug en JSON (${data.slug}) no coincide con la carpeta.`
        )
        hasErrors = true
      }

      // Validación de expiración
      if (isRestaurantExpired(data.expira)) {
        console.warn(
          `⚠️ [${folderName}] Restaurante expirado (fecha: ${data.expira})`
        )
        hasWarnings = true
      }

      // Validar paths de assets y evitar path traversal
      const checkAsset = async (assetPath: string, _expectedExt: string) => {
        if (path.isAbsolute(assetPath) || assetPath.includes('..')) {
          console.error(
            `❌ [${folderName}] Ruta inválida o path traversal: ${assetPath}`
          )
          hasErrors = true
          return
        }

        const fullPath = path.join(restaurantDir, assetPath)
        if (!(await fileExists(fullPath))) {
          if (!isTemplate) {
            console.error(`❌ [${folderName}] Asset faltante: ${assetPath}`)
            hasErrors = true
          }
          return
        }

        const stat = await fs.stat(fullPath)
        const ext = path
          .extname(assetPath)
          .substring(1) as keyof typeof MAX_SIZES

        if (ext && MAX_SIZES[ext]) {
          if (stat.size > MAX_SIZES[ext]) {
            console.error(
              `❌ [${folderName}] Asset excede peso (${assetPath}): ${(
                stat.size /
                1024 /
                1024
              ).toFixed(
                2
              )} MB > ${(MAX_SIZES[ext] / 1024 / 1024).toFixed(2)} MB`
            )
            hasErrors = true
          }
        }

        // Hash para detectar duplicados
        const hash = await hashFile(fullPath)
        if (globalHashes.has(hash)) {
          console.warn(
            `⚠️ [${folderName}] Asset duplicado detectado: ${assetPath} es igual a ${globalHashes.get(
              hash
            )}`
          )
          hasWarnings = true
        } else {
          globalHashes.set(hash, `${folderName}/${assetPath}`)
        }
      }

      // Revisar logo y heroImagen
      if (data.tema.logo) await checkAsset(data.tema.logo, 'svg')
      if (data.heroImagen) await checkAsset(data.heroImagen, 'webp')

      // Revisar modelos de platos
      for (const cat of data.categorias) {
        for (const plato of cat.platos) {
          await checkAsset(plato.foto, 'webp')

          if (plato.modelo) {
            if (!plato.modelo.aprobado && !isTemplate) {
              console.error(
                `❌ [${folderName}] Plato '${plato.id}' tiene un modelo no aprobado.`
              )
              hasErrors = true
            }

            // Un modelo aprobado sin quién lo aprobó ni cuándo no cumple la
            // regla de CLAUDE.md §0.2: la aprobación la marca Juan después de
            // probar en sus celulares, y debe quedar trazada, no solo el
            // booleano. Sin esto sería imposible auditar quién publicó qué.
            if (plato.modelo.aprobado && !isTemplate) {
              if (!plato.modelo.aprobadoPor) {
                console.error(
                  `❌ [${folderName}] Plato '${plato.id}' está aprobado pero no tiene 'aprobadoPor'.`
                )
                hasErrors = true
              }
              if (!plato.modelo.fechaAprobacion) {
                console.error(
                  `❌ [${folderName}] Plato '${plato.id}' está aprobado pero no tiene 'fechaAprobacion'.`
                )
                hasErrors = true
              }
            }

            await checkAsset(plato.modelo.glb, 'glb')
            await checkAsset(plato.modelo.usdz, 'usdz')
            await checkAsset(plato.modelo.poster, 'webp')
          }
        }
      }
    } catch (e) {
      console.error(`❌ [${folderName}] Error procesando JSON:`, e)
      hasErrors = true
    }
  }

  if (hasErrors) {
    console.error('❌ Validación fallida con errores críticos.')
    process.exit(1)
  }

  console.log(
    `✅ Validación de contenido terminada.${
      hasWarnings ? ' (Con advertencias)' : ''
    }`
  )
}

// Permitir correr directo desde npm scripts
if (process.argv[1] && process.argv[1].endsWith('validate-content.ts')) {
  validateContent()
}
