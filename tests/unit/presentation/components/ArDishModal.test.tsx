import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ArDishModal from '@/presentation/components/ArDishModal'

// El <model-viewer> real registra un custom element con lógica de cámara
// que no funciona en jsdom. Estas pruebas no verifican el visor 3D en sí
// (eso lo cubre el QA manual de Juan en dispositivos reales).
vi.mock('@google/model-viewer', () => ({}))
import { MockEnvironmentDetector } from '../../application/doubles'
import { renderWithProviders } from '../renderWithProviders'

const baseProps = {
  dish: { name: 'Plato de prueba', description: 'Una descripción breve.' },
  asset: { glbUrl: '/modelo.glb', posterUrl: '/poster.webp' },
}

describe('ArDishModal', () => {
  it('muestra el nombre, la descripción y el disclaimer de escala real', () => {
    const onClose = vi.fn()
    renderWithProviders(
      <ArDishModal {...baseProps} mode="3d" onClose={onClose} />
    )

    expect(screen.getByText('Plato de prueba')).toBeInTheDocument()
    expect(screen.getByText('Una descripción breve.')).toBeInTheDocument()
    expect(screen.getByText(/tamaño real/i)).toBeInTheDocument()
  })

  it('se cierra con la tecla Escape', () => {
    const onClose = vi.fn()
    renderWithProviders(
      <ArDishModal {...baseProps} mode="3d" onClose={onClose} />
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('el botón de cerrar llama a onClose', () => {
    const onClose = vi.fn()
    renderWithProviders(
      <ArDishModal {...baseProps} mode="3d" onClose={onClose} />
    )

    fireEvent.click(screen.getByRole('button', { name: /cerrar/i }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('en modo "ar" (AR cayó al visor de respaldo), muestra el aviso de navegador embebido si aplica', () => {
    const environmentDetector = new MockEnvironmentDetector({
      isIos: true,
      isAndroid: false,
      isMobile: true,
      isSafari: true,
      isChrome: false,
      isEmbeddedBrowser: true,
      embeddedBrowserName: 'Instagram',
      canQuickLook: true,
      canSceneViewer: false,
    })

    renderWithProviders(
      <ArDishModal {...baseProps} mode="ar" onClose={() => {}} />,
      { dependencies: { environmentDetector } }
    )

    expect(screen.getByText(/Instagram/)).toBeInTheDocument()
  })

  it('en modo "3d" (el comensal pidió el visor a propósito), no muestra el aviso de navegador embebido', () => {
    const environmentDetector = new MockEnvironmentDetector({
      isIos: true,
      isAndroid: false,
      isMobile: true,
      isSafari: true,
      isChrome: false,
      isEmbeddedBrowser: true,
      embeddedBrowserName: 'Instagram',
      canQuickLook: true,
      canSceneViewer: false,
    })

    renderWithProviders(
      <ArDishModal {...baseProps} mode="3d" onClose={() => {}} />,
      { dependencies: { environmentDetector } }
    )

    expect(screen.queryByText(/Instagram/)).not.toBeInTheDocument()
  })
})
