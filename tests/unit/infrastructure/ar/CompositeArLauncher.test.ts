import { describe, it, expect, vi } from 'vitest'
import { CompositeArLauncher } from '@/infrastructure/ar/CompositeArLauncher'
import type { Dish } from '@/domain/dish'

describe('CompositeArLauncher', () => {
  const dishConModelo: Dish = {
    id: 'test',
    nombre: { es: 'test' },
    precio: 100,
    foto: 'foto.webp',
    agotado: false,
    modelo: {
      glb: 'modelo.glb',
      usdz: 'modelo.usdz',
      poster: 'poster.webp',
      escalaRealCm: 10,
      aprobado: true,
      aprobadoPor: 'Juan',
      fechaAprobacion: '2026-01-01',
    },
  }

  it('delega al lanzador correcto', async () => {
    const quickLookLaunch = vi
      .fn()
      .mockResolvedValue({ success: true, mode: 'quick-look' })
    const composite = new CompositeArLauncher({
      'quick-look': { launch: quickLookLaunch },
    })
    const result = await composite.launch(dishConModelo, 'quick-look')
    expect(quickLookLaunch).toHaveBeenCalledWith(dishConModelo, 'quick-look')
    expect(result.success).toBe(true)
  })

  it('devuelve success: false si no hay lanzador', async () => {
    const composite = new CompositeArLauncher({})
    const result = await composite.launch(dishConModelo, 'scene-viewer')
    expect(result.success).toBe(false)
    expect(result.error).toBe('No hay lanzador para el modo scene-viewer')
  })

  it('invoca al lanzador sin esperar (conserva el gesto del usuario)', () => {
    const launch = vi
      .fn()
      .mockResolvedValue({ success: true, mode: 'quick-look' })
    void new CompositeArLauncher({ 'quick-look': { launch } }).launch(
      dishConModelo,
      'quick-look'
    )
    expect(launch).toHaveBeenCalledTimes(1) // ya se llamó, sin haber hecho await
  })
})
