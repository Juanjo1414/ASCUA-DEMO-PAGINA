import { screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Contacto from '@/presentation/components/Contacto'
import type { Restaurant } from '@/domain/restaurant'
import {
  renderWithProviders,
  baseRestaurantFixture,
} from '../renderWithProviders'

const restaurantConWhatsapp = {
  ...baseRestaurantFixture,
  contacto: { whatsapp: '573001234567' },
} as Restaurant

describe('Contacto', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('muestra errores en español simple si se envía el formulario vacío', () => {
    renderWithProviders(<Contacto />, { restaurant: restaurantConWhatsapp })

    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(screen.getByText('Escribe tu nombre.')).toBeInTheDocument()
    expect(
      screen.getByText('Cuéntanos algo (mínimo 10 caracteres).')
    ).toBeInTheDocument()
  })

  it('abre WhatsApp con el mensaje armado cuando el formulario es válido', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    renderWithProviders(<Contacto />, { restaurant: restaurantConWhatsapp })

    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Ana' },
    })
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: 'Quiero reservar para el sábado a las 8.' },
    })
    fireEvent.click(screen.getByRole('button', { name: /enviar/i }))

    expect(openSpy).toHaveBeenCalledTimes(1)
    const [url] = openSpy.mock.calls[0]!
    expect(url).toContain('wa.me/573001234567')
  })

  it('al disparar el evento ascua:reservar, precarga el mensaje de reserva', () => {
    renderWithProviders(<Contacto />, { restaurant: restaurantConWhatsapp })

    act(() => {
      window.dispatchEvent(new CustomEvent('ascua:reservar'))
    })

    expect(screen.getByLabelText(/mensaje/i)).toHaveValue(
      'Quiero reservar una mesa para __ personas el __ a las __.'
    )
  })
})
