import { describe, it, expect, vi, afterEach } from 'vitest'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { validateContent } from '../../../scripts/validate-content'

/**
 * Construye en una carpeta temporal un restaurante mínimo válido (esquema,
 * contraste AA, slug igual a la carpeta) con un plato que tiene modelo 3D,
 * para poder variar solo el dato bajo prueba (`aprobado`, `aprobadoPor`,
 * `fechaAprobacion`) sin repetir todo el JSON en cada caso.
 */
async function crearRestauranteDePrueba(
  overridesModelo: Record<string, unknown> = {}
) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ascua-validate-'))
  const slug = 'prueba-abcd'
  const dir = path.join(root, slug)
  const assetsDir = path.join(dir, 'assets')
  await fs.mkdir(assetsDir, { recursive: true })

  // Contenido real mínimo; la extensión es lo único que importa para el
  // chequeo de pesos y tipo, igual que en content/restaurants/_plantilla.
  await fs.writeFile(path.join(assetsDir, 'logo.svg'), '<svg></svg>')
  await fs.writeFile(path.join(assetsDir, 'foto.webp'), 'foto')
  await fs.writeFile(path.join(assetsDir, 'modelo.glb'), 'glb')
  await fs.writeFile(path.join(assetsDir, 'modelo.usdz'), 'usdz')
  await fs.writeFile(path.join(assetsDir, 'poster.webp'), 'poster')

  const restaurant = {
    schemaVersion: 1,
    slug,
    estado: 'activo',
    expira: '2030-12-15',
    autorizacion: { fecha: '2026-10-10', medio: 'whatsapp', contacto: 'Dueño' },
    nombre: 'Restaurante de prueba',
    idiomas: ['es'],
    tema: {
      primario: '#00473c',
      parTipografico: 'editorial',
      logo: 'assets/logo.svg',
    },
    contacto: { whatsapp: '573000000000' },
    categorias: [
      {
        id: 'fuertes',
        nombre: { es: 'Fuertes' },
        platos: [
          {
            id: 'plato-1',
            nombre: { es: 'Plato de prueba' },
            precio: 20000,
            foto: 'assets/foto.webp',
            modelo: {
              glb: 'assets/modelo.glb',
              usdz: 'assets/modelo.usdz',
              poster: 'assets/poster.webp',
              escalaRealCm: 18,
              aprobado: true,
              ...overridesModelo,
            },
          },
        ],
      },
    ],
  }

  await fs.writeFile(
    path.join(dir, 'restaurant.json'),
    JSON.stringify(restaurant, null, 2)
  )

  return root
}

describe('validateContent — aprobación trazable de modelos (R-3-H11)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('pasa cuando un modelo aprobado trae aprobadoPor y fechaAprobacion', async () => {
    const root = await crearRestauranteDePrueba({
      aprobadoPor: 'Juan',
      fechaAprobacion: '2026-10-12',
    })
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit no debía llamarse')
    })

    await expect(validateContent(root)).resolves.toBeUndefined()
    expect(exitSpy).not.toHaveBeenCalled()

    await fs.rm(root, { recursive: true, force: true })
  })

  it('falla si el modelo está aprobado pero falta aprobadoPor', async () => {
    const root = await crearRestauranteDePrueba({
      fechaAprobacion: '2026-10-12',
      // aprobadoPor ausente a propósito
    })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)

    await validateContent(root)

    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(
      errorSpy.mock.calls.some((call) =>
        String(call[0]).includes("no tiene 'aprobadoPor'")
      )
    ).toBe(true)

    await fs.rm(root, { recursive: true, force: true })
  })

  it('falla si el modelo está aprobado pero falta fechaAprobacion', async () => {
    const root = await crearRestauranteDePrueba({
      aprobadoPor: 'Juan',
      // fechaAprobacion ausente a propósito
    })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const exitSpy = vi
      .spyOn(process, 'exit')
      .mockImplementation(() => undefined as never)

    await validateContent(root)

    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(
      errorSpy.mock.calls.some((call) =>
        String(call[0]).includes("no tiene 'fechaAprobacion'")
      )
    ).toBe(true)

    await fs.rm(root, { recursive: true, force: true })
  })
})
