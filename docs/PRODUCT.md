# Product

<!-- impeccable:product-schema 1 -->

> Reescrito el 2026-10-16 con una ronda de entrevista. Sustituye la versión
> anterior, que describía una landing única de Ascua (Vercel, GSAP, ocho platos
> fijos). El producto hoy es la demo multi-restaurante descrita abajo. Los
> puntos marcados _(inferido)_ vienen del repo y de `CLAUDE.md`, no de una
> respuesta directa.

## Platform

web

## Users

Dos audiencias primarias, con el mismo peso:

- **Comensal en celular.** Llega desde Instagram, WhatsApp o un QR, a menudo con
  poca familiaridad con la tecnología, casi siempre en un celular de gama media
  y a veces dentro de un navegador embebido. Quiere ver qué hay en la carta y
  decidir qué pedir. Debe entender el producto solo, sin que nadie se lo explique.
- **Dueño o gerente del restaurante.** Evalúa la demo con su propio local y decide
  si paga la suscripción. Juzga la credibilidad del conjunto: cualquier fallo
  visual o técnico le resta confianza.

## Product Purpose

Demo estática y multi-restaurante de **Ascua**, producto de la startup **PITS**
(Medellín). Cada restaurante tiene su propia landing y su carta con platos en 3D
y realidad aumentada, desde el navegador y sin instalar apps. Éxito: el dueño ve
su restaurante bien representado y quiere contratar; el comensal recorre carta →
plato → "Ver en mi mesa" → cámara sin ayuda.

## Positioning

El plato aparece en su tamaño real sobre la mesa del comensal, desde el
navegador, sin app. Una carta de PDF o de fotos no puede enseñar el tamaño ni el
volumen del plato.

## Operating Context

- Cada restaurante es una carpeta `content/restaurants/<slug>/` con
  `restaurant.json` y `assets/`. Nada de un restaurante vive en `src/`. La raíz
  `/` nunca lista restaurantes.
- Sitio estático (React 19 + Vite + TypeScript + Tailwind + `@google/model-viewer`),
  sin backend, en Cloudflare Pages. Producción es `main`; preview es la rama
  `dev/Juanjo`.
- Los modelos 3D los produce el repo hermano `ASCUA-DEMO-AR` (ARFOODS).
- Feedback por restaurante mediante un Google Form propio (ADR 0005). Reservas
  por enlace de WhatsApp prellenado.
- Idioma de la interfaz: español.

## Capabilities and Constraints

- **Mobile-first:** diseñar y probar primero a 360 × 640 px; nunca scroll
  horizontal; áreas táctiles ≥ 48 px; texto base ≥ 16 px; contraste AA; nada que
  dependa de hover; zonas seguras y `prefers-reduced-motion` respetados.
- **Lenguaje sin tecnicismos:** el botón dice "Ver en mi mesa", no "AR". Íconos
  siempre con texto. Errores en palabras simples y con una acción.
- **Todo estado tiene diseño:** cargando, error, sin conexión, agotado, sin AR.
- **AR intocable sin QA en dispositivos:** `QuickLookLauncher`,
  `SceneViewerLauncher`, `ModelViewerFallbackLauncher` y
  `BrowserEnvironmentDetector`. Escala real fija (`#allowsContentScaling=0`,
  `resizable=false`). Antes de abrir la cámara se muestra la guía de 3 pasos.
- Un plato 3D solo se publica con `aprobado: true`. Un restaurante solo se
  publica con `autorizacion` vigente; vencida, se muestra "demo finalizada".
- Presupuestos: GLB ≤ 5 MB, USDZ ≤ 8 MB, imágenes WebP ≤ 300 KB.
- Colores, tipografías y espaciados solo como tokens en `src/presentation/theme/`.
  Cada restaurante solo sobreescribe color primario (con contraste AA), un par
  tipográfico de lista cerrada y su logo. La marca PITS/Ascua va solo en un pie
  discreto.
- Sin datos personales de comensales: sin cookies, sin login, sin rastreo
  (Ley 1581 de 2012). Modelos con el disclaimer de la Ley 1480 de 2011.
- Fluido en un Android de gama media.

## Brand Commitments

- Marca del producto: **Ascua / PITS**, en un pie discreto; el protagonista es
  cada restaurante, no la marca del producto.
- La dirección visual vigente está en `docs/DESIGN.md`; no se redefine aquí.

## Evidence on Hand

- Demo `ascua-demo`: restaurante de ejemplo con logo y `heroImagen` propios
  _(inferido)_. Existe una plantilla de restaurante para onboarding
  (`docs/runbooks/nuevo-restaurante.md`).
- Modelos 3D publicados solo cuando Juan los aprueba tras probar en un iPhone y un
  Android reales.
- No hay precios, premios ni reseñas reales. Lo que no esté en `restaurant.json`
  no se muestra y no se inventa.

## Product Principles

1. El producto se entiende solo: una acción principal por pantalla, ayuda siempre
   visible.
2. El plato se ve lindo y en su tamaño real, o no se muestra.
3. Cada restaurante se siente propio; ninguno depende de otro ni se lista junto.
4. La honestidad pesa más que el efecto: nada de datos inventados ni formularios
   simulados.
5. Credibilidad ante todo: un fallo visible cuesta más que una función ausente.

## Accessibility & Inclusion

Contraste AA, texto base ≥ 16 px, áreas táctiles ≥ 48 px, `prefers-reduced-motion`
respetado y lenguaje simple para personas poco familiarizadas con la tecnología.
