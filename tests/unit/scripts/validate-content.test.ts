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

describe('validateContent — formulario de feedback propio (P-701-bis)', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('avisa (sin fallar) si un restaurante real no tiene feedbackFormUrl', async () => {
    const root = await crearRestauranteDePrueba({
      aprobadoPor: 'Juan',
      fechaAprobacion: '2026-10-12',
    })
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit no debía llamarse')
    })

    await expect(validateContent(root)).resolves.toBeUndefined()

    expect(exitSpy).not.toHaveBeenCalled()
    expect(
      warnSpy.mock.calls.some((call) =>
        String(call[0]).includes('Sin feedbackFormUrl')
      )
    ).toBe(true)

    await fs.rm(root, { recursive: true, force: true })
  })
})

describe('validateContent — hashes duplicados solo entre restaurantes distintos', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('no avisa si el mismo restaurante reutiliza su propia foto (ej. heroImagen = foto de un plato)', async () => {
    const root = await crearRestauranteDePrueba({
      aprobadoPor: 'Juan',
      fechaAprobacion: '2026-10-12',
    })
    // La demo real hace justo esto: heroImagen apunta a la misma foto que
    // ya usa un plato destacado.
    const restaurantJsonPath = path.join(root, 'prueba-abcd', 'restaurant.json')
    const data = JSON.parse(await fs.readFile(restaurantJsonPath, 'utf8'))
    data.heroImagen = 'assets/foto.webp'
    await fs.writeFile(restaurantJsonPath, JSON.stringify(data, null, 2))

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await validateContent(root)

    expect(
      warnSpy.mock.calls.some((call) =>
        String(call[0]).includes('Asset duplicado')
      )
    ).toBe(false)

    await fs.rm(root, { recursive: true, force: true })
  })

  it('sí avisa si dos restaurantes distintos comparten el mismo archivo (posible copia)', async () => {
    const rootA = await crearRestauranteDePrueba({
      aprobadoPor: 'Juan',
      fechaAprobacion: '2026-10-12',
    })
    const rootB = await fs.mkdtemp(path.join(os.tmpdir(), 'ascua-validate-b-'))
    const dirB = path.join(rootB, 'otro-restau-xyz1')
    await fs.cp(path.join(rootA, 'prueba-abcd'), dirB, { recursive: true })
    const jsonB = path.join(dirB, 'restaurant.json')
    const dataB = JSON.parse(await fs.readFile(jsonB, 'utf8'))
    dataB.slug = 'otro-restau-xyz1'
    dataB.nombre = 'Otro restaurante'
    await fs.writeFile(jsonB, JSON.stringify(dataB, null, 2))
    // Combinar las dos carpetas en un mismo content/ para que el validador
    // las compare entre sí (es como corre en CI, sobre content/restaurants/).
    await fs.cp(
      path.join(rootA, 'prueba-abcd'),
      path.join(rootB, 'prueba-abcd'),
      {
        recursive: true,
      }
    )

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await validateContent(rootB)

    expect(
      warnSpy.mock.calls.some((call) =>
        String(call[0]).includes('Asset duplicado')
      )
    ).toBe(true)

    await fs.rm(rootA, { recursive: true, force: true })
    await fs.rm(rootB, { recursive: true, force: true })
  })
})
