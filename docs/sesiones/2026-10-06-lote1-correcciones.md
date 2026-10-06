# Sesión 2026-10-06: Lote 1 - Limpieza y base

- **Fecha:** 2026-10-06
- **Herramienta:** Antigravity
- **Fase:** Fase C — Correcciones (revisión 2)

## Tareas realizadas

- **C-01:** Añadidos directorios de pruebas E2E a `.gitignore`.
- **C-02:** Eliminado el código muerto de componentes y liberías antiguas no usadas.
- **C-03:** Solucionados todos los avisos de linting y ajustado el script para considerarlos errores (`oxlint --deny-warnings`).
- **C-04:** Reemplazados todos los tipos `any` con tipos de dominio e interfaces de React. Configurado el linter para denegar el uso de `any`.
- **C-05:** `index.html` ajustado para ser neutro (`<title>` y `<description>` genéricas), se modificó el `theme-color` a `#f4f3e7` y se añadió `viewport-fit=cover`.
- **C-06:** Eliminada marca de terceros en `HeroFuego.tsx`. Renombrados tokens de tipografías mecánicamente y actualizados `tailwind.config.js` y `tokens.css`. Se configuró la descarga de tipografías abiertas DM Sans y Fraunces en lugar de fuentes de terceros, y se añadió nota pertinente en `docs/DESIGN.md`.
- **C-07:** Reescrito el documento `docs/ESTADO.md` reflejando el progreso de estas correcciones.
- **C-08:** Redactados los ADR 0002 (Estado global con Jotai) y ADR 0003 (Sistema de diseño adaptable).
- **C-09:** Añadidos directorios a los criterios de cobertura en `vitest.config.js` con umbrales. Se añadieron pruebas para `LocalStorageSoldOutStore` y `ConsoleAnalyticsTracker` para alcanzar dichos umbrales.

## Siguiente paso recomendado

Comenzar con el **Lote 2** (Rutas de assets).
