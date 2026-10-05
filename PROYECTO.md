# Ascua — landing de "cocina de autor"

Landing page de una sola página (SPA sin routing) para un restaurante ficticio/real llamado
**Ascua**, con menú visual y una función diferencial: ver los platos en 3D y en Realidad
Aumentada (RA) desde el navegador, sin instalar ninguna app.

Este documento describe cómo está construido el proyecto tal como existe en el repo hoy:
stack, arquitectura, integraciones externas, seguridad y huecos conocidos. Sirve como mapa
para cualquiera que vaya a tocar el código.

---

## 1. Qué es (y qué no es)

- **Es**: un sitio estático de marketing/menú, 100% frontend, sin servidor propio.
- **No es**: una aplicación con backend propio, base de datos propia, autenticación, ni
  sistema de reservas/pagos real. El formulario de contacto y el botón "Reservar" no llegan
  a ningún servidor (ver sección 6).
- La única pieza "dinámica" real es la Realidad Aumentada: consulta datos de un proyecto
  **Supabase externo** (de otro producto, ARFOODS) para obtener los modelos 3D de los platos.

## 2. Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework UI | React 19 | Sin router — página única, navegación por anclas `#id` |
| Build tool | Vite 8 (`@vitejs/plugin-react`) | Config default, sin plugins extra |
| Estilos | Tailwind CSS 3.4 + PostCSS/autoprefixer | Paleta custom vía CSS variables (dark/light) |
| Animación de scroll | GSAP 3 + `ScrollTrigger` | Hero con video "scrubbed" por scroll |
| Micro-interacciones | `motion` (Framer Motion, paquete `motion/react`) | Tilt de tarjetas, efecto magnético en botones |
| Iconos | `lucide-react` | — |
| Tipografías | `@fontsource/*` (Work Sans, Newsreader, JetBrains Mono) | Self-hosted, sin Google Fonts CDN |
| Visor 3D | `@google/model-viewer` (web component) | Carga perezosa (`import()` dinámico) |
| RA nativa | Sin librería — invocación directa de Quick Look (iOS) / Scene Viewer (Android) | Ver sección 5 |
| Lint | `oxlint` (motor Oxc, Rust) | `npm run lint` |
| Datos de modelos 3D | Supabase (REST + Storage) de **otro proyecto** (ARFOODS) | Cliente directo desde el navegador con anon key |

No hay TypeScript (JS + JSX puro, aunque sí están instalados `@types/react` para el editor).
No hay testing framework configurado (no hay `*.test.*` en el repo).

## 3. Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Navegador del usuario                     │
│                                                                 │
│  React SPA (Vite build estático)                               │
│   ├─ ThemeProvider   (dark/light → localStorage "ascua-theme") │
│   ├─ LanguageProvider(es/en → localStorage "ascua-lang")       │
│   └─ App                                                        │
│       ├─ Nav, ScrollVideoHero, FoodMarquee, StatsStrip          │
│       ├─ FeatureFuego, Menu, FeatureCocina, FeatureEquipo       │
│       ├─ DetailGallery, Testimonial, CTASection                 │
│       ├─ ContactSection (form solo-cliente, sin backend)        │
│       └─ Footer, BackToTop                                      │
│                                                                 │
│  Menu → click "Ver en RA" ──▶ launchAr()                       │
│              │  iOS  → <a rel="ar"> (Quick Look, usa .usdz)    │
│              │  And. → intent:// Scene Viewer (usa .glb)       │
│              └  otro → abre ArDishModal con <model-viewer>     │
└───────────────────────────┬────────────────────────────────────┘
                             │ fetch REST (anon key) / URLs públicas
                             ▼
        ┌───────────────────────────────────────────┐
        │   Proyecto Supabase de ARFOODS (externo)   │
        │   - tabla dish_assets (glb_url, usdz_url,  │
        │     poster_url, is_active)                 │
        │   - bucket público "dish-assets" (Storage)  │
        └───────────────────────────────────────────┘
```

Es una arquitectura de **sitio estático desplegable en cualquier CDN/hosting estático**
(Netlify, Vercel, GitHub Pages, S3+CloudFront...): `npm run build` genera `dist/`, sin
servidor Node en producción.

### Gestión de estado

No hay Redux/Zustand/Context genérico de datos: solo dos Context de React, ambos triviales
y persistidos en `localStorage`:

- `ThemeContext` (`src/theme/ThemeContext.jsx`): tema claro/oscuro, aplicado con
  `document.documentElement.classList.toggle('light', ...)`. Los colores reales viven en
  variables CSS (`--c-charcoal-*`, `--c-cream`, `--c-stone`) redefinidas en `.light`
  (`src/index.css`), consumidas por Tailwind vía `rgb(var(--c-x) / <alpha-value>)`.
- `LanguageContext` (`src/i18n/LanguageContext.jsx`): es/en, detecta idioma del navegador
  como default, diccionario plano en `src/i18n/translations.js` (266 líneas, ES/EN paralelos).

El resto del estado es local a cada componente (`useState` para modales, validación de
formulario, índice de panel activo en el hero, etc.).

## 4. Base de datos / backend

**No hay base de datos ni backend propios en este repo.** El único punto que toca una base
de datos es de solo lectura, hacia un proyecto externo:

- **Supabase del proyecto ARFOODS** (`src/lib/arAssets.js`): se consulta
  `dish_assets` vía REST (`/rest/v1/dish_assets?select=glb_url,usdz_url,poster_url&dish_id=eq.<id>&is_active=eq.true`)
  usando la **anon key pública** hardcodeada en el archivo fuente.
  - Esto es intencional y documentado en un comentario del código: la landing es estática y
    no tiene su propio backend, así que la consulta se hace directo desde el navegador. La
    seguridad de esa tabla depende enteramente de las políticas RLS del lado de Supabase
    (a las que este repo no tiene visibilidad).
  - Si la consulta falla o no hay fila activa, se usa un **fallback hardcodeado**
    (`PUBLISHED_ASSETS`) con URLs ya publicadas en el bucket público `dish-assets`, para dos
    platos (`Lubina a la plancha` y `Filete a la parrilla`). Solo esos dos platos del menú
    muestran los botones de "Ver en 3D" / "Ver en RA"; el resto del menú es solo imagen.
  - `fetchActiveAsset(dishId)` existe en el código pero **no se usa en ningún componente
    actualmente** — `getAssetForDishIndex()` (que sí se usa desde `Menu.jsx`) resuelve
    directo contra el mapa `PUBLISHED_ASSETS`, sin pasar por el fetch. Es decir: hoy la app
    no hace ninguna llamada de red a Supabase en tiempo de ejecución; todo sale de las URLs
    hardcodeadas. `fetchActiveAsset` parece pensado para una futura integración más dinámica.

No hay `.env`, ni `import.meta.env`, ni variables de entorno en todo el proyecto — las
credenciales de Supabase están en texto plano en `src/lib/arAssets.js`.

## 5. La función de IA / 3D / RA

No hay modelos de IA corriendo en este repo (ni LLMs, ni inferencia, nada server-side). Lo
que sí hay es una pipeline de **contenido generado por IA + visualización 3D/RA**:

- Las fotos de platos en `public/images/gemini-*.jpg` sugieren que las imágenes del menú
  fueron generadas con Gemini (Nano Banana / Imagen), aunque la generación en sí no ocurre en
  este repo — son assets estáticos ya generados.
- Los modelos 3D (`.glb` para Android/web, `.usdz` para iOS) tampoco se generan acá: se
  consumen ya hechos desde el bucket de Supabase del proyecto hermano ARFOODS.
- La pieza de ingeniería propia de este repo es **cómo se lanza la RA nativa con un solo
  toque** (`src/lib/launchAr.js`):
  - **iOS**: crea un `<a rel="ar">` con una `<img>` adentro (si no hay `<img>` hija, Safari
    descarga el `.usdz` en vez de abrir Quick Look) y le hace `click()` programático.
  - **Android**: redirige a un URI `intent://` que abre Google Scene Viewer directo, con
    fallback a la URL actual si Scene Viewer no está disponible.
  - **Desktop / sin soporte nativo**: cae a `ArDishModal`, que monta `<model-viewer>` para
    mostrar el modelo 3D interactivo en la página (sin RA real).
  - Detecta navegadores embebidos (WhatsApp, Instagram, TikTok, etc. — `browserEnv.js`)
    porque esos webviews no exponen Quick Look/Scene Viewer al sistema; en ese caso el modal
    muestra un aviso pidiendo abrir el link en el navegador nativo, con botón de "copiar
    enlace".
  - Incluye un disclaimer legal fijo ("Ley 1480 de 2011") aclarando que el modelo 3D es
    publicidad, no la presentación exacta del plato — cumplimiento de protección al
    consumidor en Colombia.

## 6. Formulario de contacto — importante

`ContactSection.jsx` valida nombre/email/mensaje en el cliente (regex simple de email,
mínimo 10 caracteres de mensaje) pero el "envío" es **simulado**:

```js
window.setTimeout(() => {
  setStatus('success')
  ...
}, 900)
```

No hay `fetch`, ni endpoint, ni integración con email/CRM. Si se necesita que el formulario
funcione de verdad, hace falta agregar un backend (function serverless, Formspree, Resend,
etc.) — hoy no existe.

El mapa de ubicación es un `<iframe>` embebido de Google Maps (`output=embed`), sin API key
propia — no cuenta como integración con Google Maps Platform (no hay JS API, ni facturación).

## 7. Seguridad

- **No hay superficie de ataque de backend propio** (no hay servidor, no hay inputs que
  lleguen a una base de datos propia) — el riesgo principal está fuera de este repo.
- **Credencial expuesta en el bundle**: la Supabase anon key de ARFOODS queda en el JS
  público servido al navegador. Es el comportamiento esperado de una anon key de Supabase
  (está diseñada para ser pública) *siempre que* las Row Level Security policies de esa tabla
  estén bien configuradas del lado de Supabase — algo que este repo no controla ni puede
  verificar. Vale la pena confirmarlo del lado de ARFOODS antes de depender más de esta
  integración.
- **Sin sanitización de input relevante**: el único formulario no envía nada a ningún lado,
  así que no hay XSS/inyección real vía ese input hoy. Si se conecta un backend real,
  hay que agregar validación server-side (la validación actual es solo de cliente).
- **Content Security Policy**: no hay CSP declarada (`index.html` no tiene meta CSP, ni hay
  configuración de headers en el hosting). Al ser un sitio estático, se recomendaría
  agregarla en la config del hosting de destino si se busca endurecer esto.
- **Dependencias**: no hay lockfile de auditoría corrido en esta sesión; `package-lock.json`
  sí está versionado, lo cual es correcto para builds reproducibles.

## 8. Accesibilidad y rendimiento — decisiones notables

- Respeta `prefers-reduced-motion` en el video-scrub del hero, en `TiltCard`/`Magnetic`, y
  globalmente en `index.css` (desactiva casi todas las transiciones/animaciones).
- El scroll-scrubbing del video del hero (`useScrollScrubVideo.js`) usa `requestAnimationFrame`
  con un "presupuesto" de seek adaptativo por dispositivo (mide cuánto tarda cada `seeked` y
  promedia) para no saturar el decodificador de video en Android de gama media — comentado
  explícitamente en el código como solución a un problema real de traba en Android.
- El visor 3D (`ArViewer.jsx`) hace `import('@google/model-viewer')` de forma perezosa, y
  usa `setAttribute` en vez de props JSX a propósito, porque React 19 asigna a custom
  elements por propiedad y eso rompe atributos booleanos vacíos (`camera-controls=""`).
- Navegación con `IntersectionObserver` para resaltar el link activo del menú y decidir el
  estilo transparente/opaco del header, en vez de listeners de scroll con cálculo manual.
- Foco visible custom (`:focus-visible` con ring), `aria-modal`, `aria-label`, cierre con
  `Escape` en el modal de RA.

## 9. Estructura del repo

```
index.html                  Entry HTML (Vite), <html class="dark"> por defecto
src/
  main.jsx                  Bootstrap de React
  App.jsx                   Composición de secciones de la página (sin router)
  index.css                 Tailwind + fuentes + variables de tema + reduced-motion
  components/                Un componente por sección/pieza de UI
  hooks/
    useReveal.js             Animaciones de entrada por scroll (GSAP, no leído en detalle)
    useCountUp.js             Contador animado (StatsStrip)
    useScrollScrubVideo.js    Motor del hero con video controlado por scroll
  i18n/
    LanguageContext.jsx       Provider es/en
    translations.js           Diccionario plano ES/EN
  theme/
    ThemeContext.jsx           Provider dark/light
  lib/
    gsap.js                   Registro de plugin ScrollTrigger
    browserEnv.js              Detección de iOS y de navegadores embebidos (in-app browsers)
    launchAr.js                 Lanzador nativo de RA (Quick Look / Scene Viewer)
    arAssets.js                  Integración con Supabase externo (ARFOODS) + fallback estático
public/
  images/, video/            Assets estáticos servidos tal cual
IMAGENES AR/                 Fuentes originales de las fotos de platos (no se sirven directo)
ANIMACION RESTAURANTE.mp4    Video fuente (no confundir con public/video/restaurant-reveal.mp4)
```

## 10. Cómo correr esto

```bash
npm install
npm run dev       # servidor de desarrollo Vite con HMR
npm run lint       # oxlint
npm run build       # genera dist/ para producción (estático)
npm run preview      # sirve dist/ localmente para probar el build
```

No hace falta ningún `.env`: todas las credenciales usadas (la anon key de Supabase) están
en el código fuente, y no hay ninguna otra integración con clave.

## 11. Huecos conocidos / próximos pasos razonables

- El formulario de contacto no envía nada de verdad — falta decidir e implementar un backend
  (serverless function, servicio tipo Formspree/Resend, o conectar a un Supabase propio).
- Solo 2 de los platos del menú tienen modelo 3D/RA; el resto no muestra los botones — para
  agregar más, hay que sumar entradas a `PUBLISHED_ASSETS` y `DISH_INDEX_TO_ASSET_FOLDER` en
  `src/lib/arAssets.js`.
- `fetchActiveAsset()` está escrito pero no conectado a la UI — si se quiere que la landing
  refleje cambios de contenido sin rebuild (activar/desactivar un modelo desde ARFOODS), hay
  que cablear `Menu.jsx` para usarlo en vez del mapa estático.
- No hay tests automatizados ni CI configurado en este repo.
- No hay analítica ni tracking de conversiones (no hay GA/Plausible/etc. instalado).
