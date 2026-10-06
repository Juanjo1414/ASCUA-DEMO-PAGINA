import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Scan } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/app/store'
import { useDependencies } from '@/app/DependenciesContext'
import ArDishModal from './ArDishModal'
import ArGuideModal from './ArGuideModal'
import { launchAr } from '../lib/launchAr'

export default function Menu() {
  const { t, lang } = useLanguage()
  const raiz = useRef<HTMLDivElement>(null)
  const [activo, setActivo] = useState<{ dish: any; mode: string } | null>(null)
  const restaurant = useAtomValue(restaurantAtom)
  const { soldOutStore } = useDependencies()
  const [soldOutDict, setSoldOutDict] = useState<Record<string, boolean>>({})
  const [guideState, setGuideState] = useState({
    isOpen: false,
    dish: null,
    isReplay: false,
  })

  useEffect(() => {
    if (!restaurant) return
    const updateDict = () => {
      const dict: Record<string, boolean> = {}
      restaurant.categorias.forEach((cat: any) => {
        cat.platos.forEach((p: any) => {
          dict[p.id] = soldOutStore.isSoldOut(restaurant.slug, p.id)
        })
      })
      setSoldOutDict(dict)
    }
    updateDict()
    window.addEventListener('ascua:soldout-changed', updateDict)
    return () => window.removeEventListener('ascua:soldout-changed', updateDict)
  }, [restaurant, soldOutStore])

  const handleArClick = (plato: any, isReplay = false) => {
    if (!plato.modelo) return
    const hasSeenGuide = localStorage.getItem('ascua:ar-guide-seen') === '1'
    if (!hasSeenGuide || isReplay) {
      setGuideState({ isOpen: true, dish: plato, isReplay })
    } else {
      abrirAr(plato)
    }
  }

  const abrirAr = (plato: any) => {
    if (!plato.modelo) return
    const abierto = launchAr({
      glbUrl: plato.modelo.glb,
      usdzUrl: plato.modelo.usdz,
      posterUrl: plato.modelo.poster,
      title: plato.nombre[lang] || plato.nombre.es,
    })
    if (!abierto) setActivo({ dish: plato, mode: 'ar' })
  }

  const platos = restaurant
    ? restaurant.categorias.flatMap((cat: any) => cat.platos)
    : []
  const destacados = platos.filter((p: any) => p.modelo && p.modelo.aprobado)
  const resto = platos.filter((p: any) => !p.modelo || !p.modelo.aprobado)

  useEffect(() => {
    const el = raiz.current
    if (!el) return
    const reducido = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // We only keep fade up animations to maintain simplicity
    if (reducido) return

    const ctx = gsap.context(() => {
      el.querySelectorAll('[data-sube]').forEach((item) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: item, start: 'top 88%', once: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  if (!restaurant) return null

  return (
    <section id="menu" ref={raiz} className="split-section">
      <div className="mx-auto max-w-page px-5 sm:px-6 lg:px-10">
        <div data-sube className="max-w-2xl mb-20">
          <p className="eyebrow">{t.menuSection.title}</p>
          <h2 className="font-sweetsans text-display leading-display text-forest-shadow mb-6">
            Our Menu
          </h2>
          <p className="text-body text-forest-shadow max-w-[48ch]">
            {t.menuSection.body}
          </p>
        </div>

        {/* Destacados (Con AR) */}
        {destacados.length > 0 && (
          <div className="mb-24">
            <h3 className="font-sweetsans text-heading text-forest-shadow mb-12">
              {t.menuSection.destacado}
            </h3>

            <ul className="grid gap-x-6 gap-y-16 md:grid-cols-3">
              {destacados.map((plato: any) => {
                const isSoldOut = soldOutDict[plato.id]
                return (
                  <li
                    key={plato.id}
                    data-sube
                    className={`flex flex-col relative ${isSoldOut ? 'opacity-60 grayscale' : ''}`}
                  >
                    {isSoldOut && (
                      <span className="badge-online z-10 bg-warm-gray text-cream-canvas">
                        Agotado
                      </span>
                    )}
                    <div className="relative w-full aspect-square overflow-hidden rounded-images bg-cream-canvas">
                      <img
                        src={plato.foto}
                        alt={plato.nombre[lang] || plato.nombre.es}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="pt-6 flex flex-col flex-grow">
                      <h4 className="font-sweetsanstext font-bold text-subheading text-forest-shadow tracking-subheading">
                        {plato.nombre[lang] || plato.nombre.es}
                      </h4>
                      <p className="mt-2 font-sweetsanstext text-body text-forest-shadow leading-body flex-grow">
                        {plato.descripcion
                          ? plato.descripcion[lang] || plato.descripcion.es
                          : null}
                      </p>

                      <div className="mt-4 flex flex-col gap-3">
                        <button
                          type="button"
                          disabled={isSoldOut}
                          onClick={() => !isSoldOut && handleArClick(plato)}
                          className="btn-primary w-full sm:w-auto"
                        >
                          <Scan size={18} className="mr-2" />
                          {t.ar.viewOnTable}
                        </button>
                        <button
                          type="button"
                          disabled={isSoldOut}
                          onClick={() =>
                            !isSoldOut && setActivo({ dish: plato, mode: '3d' })
                          }
                          className="ghost-link"
                        >
                          {t.ar.view3d} <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {/* El resto de la carta */}
        <ul className="grid gap-x-6 gap-y-16 md:grid-cols-3 lg:grid-cols-4 pt-16 border-t border-deep-forest/20">
          {resto.map((plato: any) => {
            const isSoldOut = soldOutDict[plato.id]
            return (
              <li
                key={plato.id}
                data-sube
                className={`flex flex-col relative ${isSoldOut ? 'opacity-60 grayscale' : ''}`}
              >
                {isSoldOut && (
                  <span className="badge-online z-10 bg-warm-gray text-cream-canvas">
                    Agotado
                  </span>
                )}
                <div className="relative w-full aspect-square overflow-hidden rounded-images bg-cream-canvas">
                  <img
                    src={plato.foto}
                    alt={plato.nombre[lang] || plato.nombre.es}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-6 flex flex-col flex-grow">
                  <h3 className="font-sweetsanstext font-bold text-[20px] text-forest-shadow leading-tight">
                    {plato.nombre[lang] || plato.nombre.es}
                  </h3>
                  <p className="mt-2 font-sweetsanstext text-[16px] text-forest-shadow leading-body">
                    {plato.descripcion
                      ? plato.descripcion[lang] || plato.descripcion.es
                      : null}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      {activo && (
        <ArDishModal
          dish={activo.dish}
          asset={activo.dish.modelo}
          mode={activo.mode}
          onClose={() => setActivo(null)}
        />
      )}

      <ArGuideModal
        isOpen={guideState.isOpen}
        isReplay={guideState.isReplay}
        onClose={() => setGuideState({ ...guideState, isOpen: false })}
        onContinue={() => {
          const dish = guideState.dish
          setGuideState({ isOpen: false, dish: null, isReplay: false })
          if (dish) abrirAr(dish)
        }}
      />
    </section>
  )
}
