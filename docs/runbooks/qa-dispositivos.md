# Runbook — QA manual en dispositivos reales (iPhone y Android de Juan)

> Esto lo corre **Juan**, nunca un agente de IA: ningún agente puede abrir
> una cámara real ni confirmar que un modelo se ve bien sobre una mesa de
> verdad. CLAUDE.md lo dice explícito (§5): "Para AR o contenido: además de
> las automáticas, QA manual en el iPhone y el Android de Juan sobre la URL
> de preview. Pídele a Juan que lo haga; tú no puedes."

**Cuándo correr este checklist:** antes de cualquier merge a `main` que
toque el código de AR (`src/infrastructure/ar/`, `src/infrastructure/browser/`,
`src/presentation/components/Ar*`, `src/domain/ar.ts`) o contenido de un
restaurante con modelos 3D nuevos o re-aprobados. También es el paso que
marca `aprobado: true`, `aprobadoPor` y `fechaAprobacion` en `restaurant.json`
(R-8/P-601, P-602) — eso lo marca Juan aquí, nunca el agente.

## Antes de empezar

1. Pide al agente (o pídelo tú mismo) la **URL de preview** de Cloudflare
   Pages del último push a `dev/Juanjo` (una vez X-007 esté configurado,
   GitHub Actions la deja en la salida del job `deploy`; mientras tanto,
   corre `npm run build && npm run preview` en tu máquina y usa
   `http://localhost:4173/r/<slug>`).
2. Ten a mano:
   - Un **iPhone** con iOS reciente, Safari.
   - Un **Android** con Chrome.
   - Datos móviles (no solo wifi) — para probar que el modelo carga también
     con una conexión más lenta/real.
   - Buena luz natural o de interior, y una mesa libre para probar el AR.

## Checklist — recorrido del comensal

Márcalo con ✅ / ❌ en una copia de este archivo o en el PR; si algo falla,
anota el paso exacto y el mensaje que viste.

### 1. Carta y navegación

- [ ] La carta carga en menos de ~3 segundos con datos móviles.
- [ ] El nombre y el tema (color, logo) del restaurante son correctos.
- [ ] Ningún texto se corta ni aparece scroll horizontal.
- [ ] Los botones táctiles se sienten cómodos con el pulgar (sin tener que
      apuntar con precisión).

### 2. Guía de AR (primera vez)

- [ ] Al tocar **"Ver en mi mesa"** la primera vez, aparece la guía de 3
      pasos, con el texto exacto: "Apunta a tu mesa" → "Mueve el celular
      despacio" → "Acércate o camina alrededor".
- [ ] El botón **"Entendido, abrir cámara"** es el que realmente abre la
      cámara (no hay un paso intermedio ni demora notoria).
- [ ] Al volver a tocar "Ver en mi mesa" en **otro** plato, la guía **no**
      vuelve a aparecer (ya se marcó como vista en este dispositivo).
- [ ] El botón fijo **"¿Cómo funciona?"** reabre la guía en cualquier
      momento, aunque ya se haya visto.

### 3. AR real — iPhone (Quick Look)

- [ ] El plato aparece sobre la mesa en su **tamaño real** (compáralo con el
      plato real si lo tienes, o con un objeto de medida conocida).
- [ ] El plato **no se puede agrandar ni achicar** con el gesto de pinza
      (Ley 1480 — es la protección de `#allowsContentScaling=0`).
- [ ] El modelo se ve con buen acabado (sin huecos, sin texturas rotas, sin
      piezas flotando) y apoyado sobre la mesa, no hundido ni flotando.
- [ ] Puedes caminar alrededor y verlo desde varios ángulos.
- [ ] Cerrar Quick Look regresa limpiamente a la carta (sin pantalla en
      blanco ni que haya que recargar).

### 4. AR real — Android (Scene Viewer)

- [ ] Mismo checklist que el punto 3 (tamaño real, no agrandable, buen
      acabado, cierre limpio) pero en Android.
- [ ] Si el Android no tiene la app de Google necesaria, el navegador
      regresa a la página en vez de quedar en blanco (`S.browser_fallback_url`).

### 5. Sin AR nativo — visor 3D de respaldo

- [ ] En una computadora de escritorio (sin cámara AR), al tocar "Ver en mi
      mesa" se abre el visor 3D en pantalla, con el plato centrado, a un
      ángulo de ~45° y con rotación lenta automática.
- [ ] El texto "en su tamaño real" aparece junto al visor, para que quede
      claro que, aunque aquí se vea en pantalla, en el celular se ve en su
      medida real.

### 6. Navegadores embebidos (Instagram, WhatsApp, TikTok)

- [ ] Abre el enlace de la carta **desde dentro de** Instagram, WhatsApp y,
      si puedes, TikTok (pégalo en un chat/DM y tócalo ahí, no lo copies al
      navegador).
- [ ] En cada uno, al tocar "Ver en mi mesa" aparece el aviso de "no se
      puede abrir AR aquí" con el botón de **copiar enlace**, en vez de que
      la app se congele o no pase nada.
- [ ] El botón de copiar enlace funciona (lo puedes pegar y abrir en Safari/
      Chrome normal).

### 7. Idioma, reservas y legal

- [ ] Si el restaurante tiene `idiomas: ["es", "en"]`, el botón de cambio de
      idioma aparece y cambia los textos correctamente.
- [ ] El botón de reserva abre WhatsApp con el mensaje prellenado y el
      número correcto del restaurante.
- [ ] El disclaimer de Ley 1480 ("el plato se ve a su tamaño real...") es
      visible en el visor, sin tener que buscarlo.

## Al terminar

1. Si **todo** pasó: en el `restaurant.json` del plato probado, marca
   ```json
   "aprobado": true,
   "aprobadoPor": "Juan",
   "fechaAprobacion": "AAAA-MM-DD"
   ```
   (la fecha de hoy). El validador de contenido (`npm run content:validate`)
   exige estos tres campos juntos — si falta alguno, el build falla.
2. Si algo falló: **no** marques `aprobado: true`. Anota qué paso falló (con
   capturas si puedes) y pásaselo al agente para que lo investigue como un
   hallazgo nuevo, igual que cualquier otro bug.
3. Si este QA era para un merge a `main`: adjunta este checklist marcado (o
   un resumen) en la descripción del Pull Request.
