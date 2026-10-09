import { useEffect, useState } from 'react'
import { X, ArrowRight, Lightbulb, Grid3x3, Move } from 'lucide-react'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { useDependencies } from '@/presentation/state/DependenciesContext'

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
  const { uiPreferencesStore } = useDependencies()
  const [mounted, setMounted] = useState(isOpen)

  // Al abrir, marcamos el modal como montado durante el render (patrón de React para
  // estado derivado de props). Hacerlo dentro del efecto provocaba un render extra.
  if (isOpen && !mounted) setMounted(true)

  useEffect(() => {
    if (isOpen) {
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

  // Alternativa por si la traducción no está disponible (nunca debería pasar,
  // porque translations.ts siempre define arGuide para es/en, pero evita que
  // la guía se quede sin texto si algún día se agrega un idioma incompleto).
  // El texto coincide exactamente con el de `t.arGuide` para que nunca queden
  // dos versiones distintas de la guía de AR dando vueltas por el código.
  const texts = t.arGuide || {
    title: '¿Cómo funciona?',
    steps: [
      {
        title: 'Apunta a tu mesa',
        desc: 'Busca un lugar con buena luz y encuadra la mesa donde quieres ver el plato.',
      },
      {
        title: 'Mueve el celular despacio',
        desc: 'Haz círculos pequeños hasta que aparezca el plato, en su tamaño real.',
      },
      {
        title: 'Acércate o camina alrededor',
        desc: 'Camina alrededor de la mesa para verlo desde todos los ángulos.',
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
        className="absolute inset-0 bg-forest-shadow/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guide-title"
        className={`relative w-full max-w-md overflow-hidden bg-cream-canvas p-6 shadow-2xl transition-transform duration-300 border border-warm-gray/10 ${
          isOpen ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'
        }`}
      >
        <div className="flex items-center justify-between border-b border-warm-gray/10 pb-4">
          <h2 id="guide-title" className="font-display text-2xl font-medium">
            {texts.title}
          </h2>
          <button
            onClick={onClose}
            aria-label={t.ar?.close || 'Cerrar'}
            className="p-2 transition-colors hover:text-deep-forest"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <ul className="mt-8 space-y-8">
          {texts.steps.map((step, i) => {
            const Icon = icons[i]
            if (!Icon) return null
            return (
              <li key={i} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-forest/5 text-deep-forest">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-medium">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-gray">{step.desc}</p>
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
                uiPreferencesStore.set('ascua:ar-guide-seen', '1')
              }
              onContinue()
            }}
            className="btn-primary w-full"
          >
            {texts.gotIt}
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}
