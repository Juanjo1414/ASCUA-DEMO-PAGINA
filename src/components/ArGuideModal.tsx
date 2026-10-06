import { useEffect, useState } from 'react'
import { X, ArrowRight, Lightbulb, Grid3x3, Move } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

interface ArGuideModalProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
  isReplay?: boolean
}

export default function ArGuideModal({
  isOpen,
  onClose,
  onContinue,
  isReplay = false,
}: ArGuideModalProps) {
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setMounted(true)
      document.body.style.overflow = 'hidden'
    } else {
      setTimeout(() => setMounted(false), 300)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen && !mounted) return null

  // Fallback texts if translations are not available
  const texts = t.arGuide || {
    title: '¿Cómo funciona?',
    steps: [
      {
        title: 'Busca un espacio iluminado',
        desc: 'Evita sombras muy oscuras para que la cámara vea bien tu mesa.',
      },
      {
        title: 'Apunta a una superficie plana',
        desc: 'Busca un lugar despejado en la mesa.',
      },
      {
        title: 'Mueve el celular despacio',
        desc: 'Haz círculos pequeños hasta que aparezca el plato.',
      },
    ],
    gotIt: 'Entendido, abrir cámara',
  }

  const icons = [Lightbulb, Grid3x3, Move]

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-fondo/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        className={`relative w-full max-w-md overflow-hidden bg-fondo p-6 shadow-2xl transition-transform duration-300 border border-loza/10 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        }`}
      >
        <div className="flex items-center justify-between border-b border-loza/10 pb-4">
          <h2 id="guide-title" className="font-display text-2xl font-medium">
            {texts.title}
          </h2>
          <button
            onClick={onClose}
            aria-label={t.ar?.close || 'Cerrar'}
            className="p-2 transition-colors hover:text-llama"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <ul className="mt-8 space-y-8">
          {texts.steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <li key={i} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-loza/5 text-llama">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-ceniza">{step.desc}</p>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="mt-10">
          <button
            onClick={() => {
              // Si no es un "replay" (el botón fijo), marcamos que ya lo vio
              if (!isReplay) {
                localStorage.setItem('ascua:ar-guide-seen', '1')
              }
              onContinue()
            }}
            className="boton w-full"
          >
            {texts.gotIt}
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
