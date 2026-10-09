import { useEffect } from 'react'
import { X } from 'lucide-react'
import { InAppBrowserNotice } from './ar/InAppBrowserNotice'
import ArViewer from './ArViewer'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { useDependencies } from '@/presentation/state/DependenciesContext'

interface Dish {
  name: string
  description: string
}

interface Asset {
  glbUrl: string
  posterUrl: string
}

interface ArDishModalProps {
  dish: Dish
  asset: Asset
  mode: string
  onClose: () => void
}

export default function ArDishModal({
  dish,
  asset,
  mode,
  onClose,
}: ArDishModalProps) {
  const { t } = useLanguage()
  const arUnavailable = mode === 'ar'
  const { environmentDetector } = useDependencies()
  const inAppName = environmentDetector.getCapabilities().embeddedBrowserName

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dish.name}
      onClick={onClose}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-forest-shadow/90 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-warm-gray/30 bg-forest-shadow p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t.ar.close}
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-warm-gray/30 bg-deep-forest/80 text-cream-canvas transition-colors hover:bg-lime-glow hover:text-forest-shadow"
        >
          <X size={18} strokeWidth={2} />
        </button>

        <ArViewer glb={asset.glbUrl} poster={asset.posterUrl} alt={dish.name} />

        <div className="mt-5">
          <p className="font-display text-lg font-semibold tracking-tight text-cream-canvas">
            {dish.name}
          </p>
          <p className="mt-1 text-sm text-warm-gray">{dish.description}</p>
          {arUnavailable && <InAppBrowserNotice inAppName={inAppName} t={t} />}
          <p className="mt-3 text-xs text-warm-gray/70">{t.ar.disclaimer}</p>
        </div>
      </div>
    </div>
  )
}
