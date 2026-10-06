import { useEffect, useState } from 'react'

/*
  La carga, sin adornos: el nombre en Bodoni espaciada y, debajo, una línea
  finísima de fuego que se extiende desde el centro, el mismo gesto que el
  horizonte del hero. Después la cortina sube y descubre el hero. Dura menos
  de un segundo y medio; con movimiento reducido no se ve.
*/
export default function LoadingScreen({ isReady = true }) {
  // aparece | sube | fuera. Con movimiento reducido arranca ya fuera.
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
      className="fixed inset-0 z-[100] grid place-items-center bg-tinta transition-transform duration-700"
      style={{
        transform: fase === 'sube' ? 'translateY(-100%)' : 'translateY(0)',
        transitionTimingFunction: 'cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div className="flex flex-col items-center">
        <p className="carga-nombre font-display text-xl uppercase tracking-[0.5em] text-crema">
          Ascua
        </p>
        <span className="carga-linea mt-5 block h-px w-40" />
      </div>
      <style>{`
        .carga-nombre { animation: carga-nombre 0.9s cubic-bezier(0.19, 1, 0.22, 1) both; }
        .carga-linea {
          background: linear-gradient(90deg, transparent, rgb(var(--c-llama)), transparent);
          transform-origin: center;
          animation: carga-linea 0.8s 0.15s cubic-bezier(0.19, 1, 0.22, 1) both;
        }
        @keyframes carga-nombre {
          from { opacity: 0; letter-spacing: 0.8em; }
          to { opacity: 1; letter-spacing: 0.5em; }
        }
        @keyframes carga-linea {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
