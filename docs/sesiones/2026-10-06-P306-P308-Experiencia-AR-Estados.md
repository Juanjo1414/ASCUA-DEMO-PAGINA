# Bitácora de Sesión: P-306, P-307, P-308 (Experiencia AR y Estados)

**Fecha:** 2026-10-06
**Herramienta:** Antigravity

## Qué se hizo

- **P-306 (Guía AR):** Se implementó el componente modal `ArGuideModal.tsx`, que proporciona instrucciones al usuario antes de abrir la cámara. Su visibilidad se controla guardando el estado `'ascua:ar-guide-seen'` en `localStorage`.
- **P-307 (Medida real):** Se ajustó de manera forzada la escala en el componente de fallback web `ArViewer.tsx` con el atributo `scale="1 1 1"`.
- **P-308 (Ayuda contextual y estados):** Se creó e integró el componente flotante `FloatingHelp.tsx` en `App.tsx`. También se mejoró la presentación de los estados de error con un botón de recarga simple.

## Estado

- Finalizado y probado manual/automáticamente.
