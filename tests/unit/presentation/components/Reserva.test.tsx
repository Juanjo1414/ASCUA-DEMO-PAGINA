import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Reserva from '@/presentation/components/Reserva'
import { renderWithProviders } from '../renderWithProviders'

describe('Reserva', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('el botón dispara el evento ascua:reservar que escucha Contacto', () => {
    const listener = vi.fn()
    window.addEventListener('ascua:reservar', listener)

    renderWithProviders(<Reserva />)
    fireEvent.click(screen.getByRole('link', { name: /reservar/i }))

    expect(listener).toHaveBeenCalledTimes(1)

    window.removeEventListener('ascua:reservar', listener)
  })
})
