import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { QrPage } from '@/presentation/pages/QrPage'
import * as useRestaurantHook from '@/presentation/hooks/useRestaurant'

vi.mock('@/presentation/hooks/useRestaurant', () => ({
  useRestaurant: vi.fn(),
}))

vi.mock('jotai', async (importOriginal) => {
  const actual = await importOriginal<typeof import('jotai')>()
  return {
    ...actual,
    useAtomValue: vi.fn(() => ({
      nombre: 'La Brasa Test',
      tema: {
        primario: '#C2410C',
        parTipografico: 'editorial',
      },
    })),
  }
})

describe('QrPage', () => {
  it('renders loading state', () => {
    vi.mocked(useRestaurantHook.useRestaurant).mockReturnValue({
      isLoading: true,
      error: null,
    })

    render(
      <MemoryRouter initialEntries={['/r/la-brasa-test/qr']}>
        <Routes>
          <Route path="/r/:slug/qr" element={<QrPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('renders restaurant qr', () => {
    vi.mocked(useRestaurantHook.useRestaurant).mockReturnValue({
      isLoading: false,
      error: null,
    })

    render(
      <MemoryRouter initialEntries={['/r/la-brasa-test/qr']}>
        <Routes>
          <Route path="/r/:slug/qr" element={<QrPage />} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText('La Brasa Test')).toBeInTheDocument()
    expect(screen.getByText('Imprimir')).toBeInTheDocument()
  })
})
