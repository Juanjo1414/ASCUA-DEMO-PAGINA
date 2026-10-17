/**
 * Zona de platos de la landing: "Lo más pedido", un espacio para contenido
 * intermedio (`children`, p. ej. "Cómo funciona") y la carta completa por
 * categorías. Además es dueña del flujo completo de "Ver en mi mesa": guía de
 * 3 pasos → lanzamiento → visor en pantalla si no hay AR nativo.
 *
 * Lo usa `RestaurantPage`. Decide si mostrar la guía de AR (primera vez por
 * dispositivo, vía `UiPreferencesStore`) o lanzar directo si el comensal ya
 * la vio. No decide qué lanzador de AR usar: eso es trabajo del caso de uso
 * `launchDishAr` y del dominio (`selectArLaunchMode`). También escucha el
 * evento `EVENTO_VER_EN_MESA` para que la portada pueda abrir el mismo flujo.
 */
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useRevealOnScroll } from '@/presentation/hooks/useRevealOnScroll'
import { useLanguage } from '@/presentation/i18n/useLanguage'
import { useAtomValue } from 'jotai'
import { restaurantAtom } from '@/presentation/state/restaurantStore'
import { useDependencies } from '@/presentation/state/DependenciesContext'
import {
  EVENTO_VER_EN_MESA,
  type VerEnMesaDetalle,
} from '@/presentation/state/arEvents'
import ArDishModal from './ArDishModal'
import ArGuideModal from './ArGuideModal'
import Destacados from './Destacados'
import { DishCard } from './menu/DishCard'
import { launchDishAr } from '@/application/use-cases/launchDishAr'
import { selectFeaturedDishes, type Dish } from '@/domain/dish'

export default function Menu({ children }: { children?: ReactNode }) {
  const { t, lang } = useLanguage()
  const [activo, setActivo] = useState<{ dish: Dish; mode: string } | null>(
    null
  )
  const restaurant = useAtomValue(restaurantAtom)
  const {
    soldOutStore,
    environmentDetector,
    arLauncher,
    analyticsTracker,
    uiPreferencesStore,
  } = useDependencies()
  const [soldOutDict, setSoldOutDict] = useState<Record<string, boolean>>({})
  const [guideState, setGuideState] = useState<{
    isOpen: boolean
    dish: Dish | null
    isReplay: boolean
  }>({
    isOpen: false,
    dish: null,
    isReplay: false,
  })
  const [arError, setArError] = useState(false)

  useEffect(() => {
    if (!restaurant) return
    const updateDict = () => {
      const dict: Record<string, boolean> = {}
      restaurant.categorias.forEach((cat) => {
        cat.platos.forEach((p) => {
          // El JSON ("agotado") es la fuente de verdad del restaurante; el
          // store solo registra lo que Juan cambia en vivo con DemoPanel. Sin
          // este "o", un plato marcado agotado en restaurant.json se vería
          // disponible para cualquier comensal que no haya tocado el panel.
          dict[p.id] =
            soldOutStore.isSoldOut(restaurant.slug, p.id) || p.agotado
        })
      })
      setSoldOutDict(dict)
    }
    updateDict()
    window.addEventListener('ascua:soldout-changed', updateDict)
    return () => window.removeEventListener('ascua:soldout-changed', updateDict)
  }, [restaurant, soldOutStore])

  const handleArClick = (plato: Dish, isReplay = false) => {
    if (!plato.modelo) return
    const hasSeenGuide = uiPreferencesStore.get('ascua:ar-guide-seen') === '1'
    if (!hasSeenGuide || isReplay) {
      setGuideState({ isOpen: true, dish: plato, isReplay })
    } else {
      abrirAr(plato)
    }
  }

  const abrirAr = (plato: Dish) => {
    if (!plato.modelo) return
    setArError(false)
    // Se llama directo desde el toque: sin await ni setTimeout antes.
    void launchDishAr({
      dish: plato,
      restaurantSlug: restaurant!.slug,
      detector: environmentDetector,
      launcher: arLauncher,
      analytics: analyticsTracker,
      lang,
    }).then((resultado) => {
      // En computador, o dentro de Instagram/WhatsApp, se muestra el visor 3D.
      if (resultado.success && resultado.mode === 'model-viewer-modal') {
        setActivo({ dish: plato, mode: 'ar' })
      } else if (!resultado.success) {
        // Antes esto no mostraba nada: el comensal tocaba "Ver en mi mesa" y
        // no pasaba nada visible. Todo estado necesita diseño (CLAUDE.md).
        setArError(true)
      }
    })
  }

  const featured = restaurant ? selectFeaturedDishes(restaurant.categorias) : []

  // El manejador cambia en cada render (usa el estado de la guía); el evento
  // se registra una sola vez y siempre llama a la versión más reciente.
  const alVerEnMesa = useRef<(dishId: string) => void>(() => {})
  useEffect(() => {
    alVerEnMesa.current = (dishId: string) => {
      const plato = restaurant?.categorias
        .flatMap((cat) => cat.platos)
        .find((p) => p.id === dishId)
      if (plato && !soldOutDict[plato.id]) handleArClick(plato)
    }
  })
  useEffect(() => {
    const escuchar = (e: Event) =>
      alVerEnMesa.current((e as CustomEvent<VerEnMesaDetalle>).detail.dishId)
    window.addEventListener(EVENTO_VER_EN_MESA, escuchar)
    return () => window.removeEventListener(EVENTO_VER_EN_MESA, escuchar)
  }, [])

  const raiz = useRef<HTMLDivElement>(null)
  useRevealOnScroll(raiz, `${restaurant?.slug ?? ''}-${lang}`)

  if (!restaurant) return null

  const hayVariasCategorias = restaurant.categorias.length > 1

  return (
    <div ref={raiz}>
      <Destacados
        dishes={featured}
        lang={lang}
        t={t}
        soldOut={soldOutDict}
        onArClick={handleArClick}
        on3dClick={(d) => setActivo({ dish: d, mode: '3d' })}
      />

      {children}

      <section id="menu" className="seccion bg-porcelana text-tinta">
        <div className="pagina grid gap-8 lg:grid-cols-[15rem_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-h2">{t.menuSection.heading}</h2>
            {hayVariasCategorias && (
              <nav
                aria-label={t.menuSection.categories}
                className="no-scrollbar sticky top-16 z-20 -mx-[var(--page-gutter)] mt-6 flex gap-2 overflow-x-auto bg-porcelana px-[var(--page-gutter)] py-3 lg:static lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
              >
                {restaurant.categorias.map((cat) => (
                  <a key={cat.id} href={`#cat-${cat.id}`} className="chip">
                    {cat.nombre[lang] || cat.nombre.es}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <div className="flex flex-col gap-14">
            {restaurant.categorias.map((cat) => (
              <div key={cat.id} id={`cat-${cat.id}`} className="scroll-mt-32">
                {hayVariasCategorias && (
                  <h3 className="text-h3">
                    {cat.nombre[lang] || cat.nombre.es}
                  </h3>
                )}
                <ul className="mt-2">
                  {cat.platos.map((plato) => (
                    <DishCard
                      key={plato.id}
                      dish={plato}
                      lang={lang}
                      t={t}
                      isSoldOut={!!soldOutDict[plato.id]}
                      onArClick={handleArClick}
                      on3dClick={(d) => setActivo({ dish: d, mode: '3d' })}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activo && activo.dish.modelo && (
        <ArDishModal
          // ArDishModal espera nombre/descripción ya localizados y las rutas como
          // glbUrl/posterUrl; el dominio las llama nombre/descripcion y glb/poster.
          dish={{
            name: activo.dish.nombre[lang] || activo.dish.nombre.es,
            description: activo.dish.descripcion
              ? activo.dish.descripcion[lang] || activo.dish.descripcion.es
              : '',
          }}
          asset={{
            glbUrl: activo.dish.modelo.glb,
            posterUrl: activo.dish.modelo.poster,
          }}
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

      {arError && (
        <div
          role="alert"
          className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-xl bg-porcelana px-4 py-3 text-tinta shadow-plato"
        >
          <p className="text-body text-tinta-soft">{t.ar.arUnavailable}</p>
          <button
            type="button"
            onClick={() => setArError(false)}
            className="mt-3 inline-flex min-h-12 items-center rounded-chip border-2 border-tinta px-4 text-body font-bold text-tinta transition-colors hover:bg-brasa hover:border-brasa"
          >
            {t.ar.close}
          </button>
        </div>
      )}
    </div>
  )
}
