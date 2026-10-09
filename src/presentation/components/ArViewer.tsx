import { useEffect, useRef, useState } from 'react'
import * as React from 'react'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      // Solo se usa con `ref` y `class`; los demás atributos se aplican con setAttribute.
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { class?: string }
    }
  }
}

const VIEWER_ATTRS = {
  'camera-controls': '',
  'touch-action': 'pan-y',
  'shadow-intensity': '1',
  scale: '1 1 1',
}

interface ArViewerProps {
  glb: string
  poster?: string
  alt?: string
}

export default function ArViewer({ glb, poster, alt }: ArViewerProps) {
  const viewerRef = useRef<HTMLElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    import('@google/model-viewer').then(() => {
      if (!cancelled) setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const viewer = viewerRef.current
    if (!viewer) return

    for (const [name, value] of Object.entries(VIEWER_ATTRS)) {
      viewer.setAttribute(name, value)
    }
    viewer.setAttribute('src', glb)
    if (poster) viewer.setAttribute('poster', poster)
    if (alt) viewer.setAttribute('alt', alt)
  }, [ready, glb, poster, alt])

  if (!ready) {
    return (
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-deep-forest">
        <img
          src={poster}
          alt={alt}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime-glow"
                style={{ animationDelay: `${i * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <model-viewer
      ref={viewerRef}
      class="aspect-square w-full rounded-2xl bg-deep-forest"
    />
  )
}
