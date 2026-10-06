import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { StaticJsonRestaurantRepository } from '@/infrastructure/content/StaticJsonRestaurantRepository'

describe('StaticJsonRestaurantRepository', () => {
  let repo: StaticJsonRestaurantRepository

  beforeEach(() => {
    repo = new StaticJsonRestaurantRepository()
    vi.stubGlobal('fetch', vi.fn())
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('rechaza slugs invalidos sin hacer fetch', async () => {
    const invalidSlugs = [
      '../etc/passwd',
      'MAYUSCULAS-1234',
      'sin-sufijo',
      'a/b-1234',
    ]

    for (const slug of invalidSlugs) {
      const result = await repo.getBySlug(slug)
      expect(result).toBeNull()
    }

    expect(fetch).not.toHaveBeenCalled()
  })

  it('retorna null si la respuesta http no es ok', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({ ok: false } as Response)

    const result = await repo.getBySlug('valido-1234')

    expect(result).toBeNull()
    expect(fetch).toHaveBeenCalledWith('/data/valido-1234/restaurant.json')
  })

  it('retorna null si el json no cumple el esquema', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ slug: 'valido-1234', estado: 'invalido' }),
    } as Response)

    const result = await repo.getBySlug('valido-1234')

    expect(result).toBeNull()
    expect(console.error).toHaveBeenCalled()
  })

  it('retorna el restaurante si es valido', async () => {
    const mockData = {
      schemaVersion: 1,
      slug: 'valido-1234',
      estado: 'activo',
      expira: '2030-12-31',
      autorizacion: {
        fecha: '2026-10-10',
        medio: 'whatsapp',
        contacto: 'Juan',
      },
      nombre: 'La Brasa',
      idiomas: ['es'],
      tema: {
        primario: '#C2410C',
        parTipografico: 'editorial',
        logo: 'logo.svg',
      },
      contacto: {
        whatsapp: '573001234567',
        direccion: 'Cra 1',
        horario: [],
        mapsUrl: 'https://map',
      },
      categorias: [
        {
          id: 'cat-1',
          nombre: { es: 'Cat 1' },
          platos: [
            {
              id: 'plato-1',
              nombre: { es: 'Plato 1' },
              precio: 10000,
              foto: 'foto.webp',
              agotado: false,
            },
          ],
        },
      ],
    }

    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response)

    const result = await repo.getBySlug('valido-1234')

    expect(result).toEqual(mockData)
  })

  it('retorna null si fetch lanza un error', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const result = await repo.getBySlug('valido-1234')

    expect(result).toBeNull()
    expect(console.error).toHaveBeenCalled()
  })
})
