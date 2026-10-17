# ADR 0004: Cloudflare Web Analytics como único dominio de terceros en el CSP

## Contexto

CLAUDE.md exige que el `Content-Security-Policy` de `public/_headers` no incluya dominios de terceros salvo los que un ADR apruebe explícitamente. Desde P-701/P-304, `public/_headers` ya permite `static.cloudflareinsights.com` (carga del script) y `cloudflareinsights.com` (envío de las métricas) para que `CloudflareAnalyticsTracker.ts` pueda medir visitas sin que un agente lo hubiera documentado (hallazgo R-7-H8 de `docs/revision/inventario.md`). Esta decisión cierra ese hueco: documenta por qué ese dominio concreto está permitido, en vez de quitarlo o dejarlo sin ADR.

## Decisión

Se aprueba `static.cloudflareinsights.com` y `cloudflareinsights.com` como los **únicos** dominios de terceros del CSP, exclusivamente para analítica de visitas.

- **Por qué Cloudflare Web Analytics y no otra herramienta:** el sitio ya se despliega en Cloudflare Pages (ADR 0001), así que no hace falta una cuenta ni una llave aparte — el script se activa por dominio desde el panel de Cloudflare.
- **Por qué cumple la regla de "sin datos personales de comensales" (CLAUDE.md §6, Ley 1581 de 2012):** Cloudflare Web Analytics no usa cookies ni huellas de dispositivo (`fingerprinting`); no hay ningún campo de analítica en `restaurant.json` ni en el código que identifique a una persona.
- **Alcance exacto en `public/_headers`:**
  - `script-src`: `static.cloudflareinsights.com` (carga el script `beacon.min.js`).
  - `connect-src`: `cloudflareinsights.com` (el script envía ahí los eventos).
- Ningún otro dominio de terceros se agrega sin pasar por un ADR nuevo.

## Consecuencias

- **Positivas:**
  - Analítica de visitas sin cookies y sin costo adicional, coherente con el hosting ya elegido.
  - El CSP queda con una sola excepción documentada en vez de un hueco sin explicar.
- **Negativas:**
  - Si el día de mañana se cambia de proveedor de hosting o de analítica, hay que revisar este ADR y el CSP juntos.
  - `script-src` sigue necesitando `'unsafe-inline' 'unsafe-eval'` por cómo cargan Vite/React y `@google/model-viewer` en producción; ese punto queda anotado como deuda técnica en `docs/ESTADO.md`, no resuelto por este ADR.
