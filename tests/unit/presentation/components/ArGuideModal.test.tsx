import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ArGuideModal from '@/presentation/components/ArGuideModal'
import { InMemoryUiPreferencesStore } from '../../application/doubles'
import { renderWithProviders } from '../renderWithProviders'

describe('ArGuideModal', () => {
  it('no muestra nada si isOpen es false', () => {
    const { container } = renderWithProviders(
      <ArGuideModal isOpen={false} onClose={() => {}} onContinue={() => {}} />
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('muestra los 3 pasos exactos de CLAUDE.md cuando está abierta', () => {
    renderWithProviders(
      <ArGuideModal isOpen={true} onClose={() => {}} onContinue={() => {}} />
    )

    expect(screen.getByText('Apunta a tu mesa')).toBeInTheDocument()
    expect(screen.getByText('Mueve el celular despacio')).toBeInTheDocument()
    expect(screen.getByText('Acércate o camina alrededor')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /entendido, abrir cámara/i })
    ).toBeInTheDocument()
  })

  it('primera vez (no replay): al continuar, marca la guía como vista y llama onContinue', () => {
    const uiPreferencesStore = new InMemoryUiPreferencesStore()
    const onContinue = vi.fn()

    renderWithProviders(
      <ArGuideModal isOpen={true} onClose={() => {}} onContinue={onContinue} />,
      { dependencies: { uiPreferencesStore } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /entendido, abrir cámara/i })
    )

    expect(onContinue).toHaveBeenCalledTimes(1)
    expect(uiPreferencesStore.get('ascua:ar-guide-seen')).toBe('1')
  })

  it('en modo replay (botón "¿Cómo funciona?"), no vuelve a marcar la guía como vista', () => {
    const uiPreferencesStore = new InMemoryUiPreferencesStore()
    const onContinue = vi.fn()

    renderWithProviders(
      <ArGuideModal
        isOpen={true}
        isReplay={true}
        onClose={() => {}}
        onContinue={onContinue}
      />,
      { dependencies: { uiPreferencesStore } }
    )

    fireEvent.click(
      screen.getByRole('button', { name: /entendido, abrir cámara/i })
    )

    expect(onContinue).toHaveBeenCalledTimes(1)
    expect(uiPreferencesStore.get('ascua:ar-guide-seen')).toBeNull()
  })

  it('el botón de cerrar llama a onClose', () => {
    const onClose = vi.fn()
    renderWithProviders(
      <ArGuideModal isOpen={true} onClose={onClose} onContinue={() => {}} />
    )

    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
