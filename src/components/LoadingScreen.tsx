import { useEffect, useState } from 'react'

export default function LoadingScreen({ isReady = true }) {
  const [reducido] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [fase, setFase] = useState(reducido ? 'fuera' : 'aparece')

  useEffect(() => {
    if (reducido || !isReady) return
    const a = setTimeout(() => setFase('sube'), 900)
    const b = setTimeout(() => setFase('fuera'), 1650)
    return () => {
      clearTimeout(a)
      clearTimeout(b)
    }
  }, [reducido, isReady])

  if (fase === 'fuera') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] grid place-items-center bg-deep-forest transition-transform duration-700"
      style={{
        transform: fase === 'sube' ? 'translateY(-100%)' : 'translateY(0)',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div className="flex flex-col items-center">
        <p className="font-sweetsanstext font-bold text-xl uppercase tracking-[0.5em] text-cream-canvas">
          ascua
        </p>
      </div>
    </div>
  )
}
