# Estado del proyecto — ASCUA-DEMO-PAGINA

> Documento vivo. Se actualiza al **cerrar cada sesión**, con Claude Code o Antigravity.

**Última actualización:** 2026-10-05 · **Por:** Claude (chat de planeación) · **Rama:** `dev/Juanjo`

## Fase actual
Fase 0 — Fundaciones.

## Tarea actual
X-001 — Crear rama `dev/Juanjo`. **Estado:** pendiente.

## Último paso completado
Plan de implementación, CLAUDE.md, AGENTS.md y workflows de CI/CD redactados (aún no copiados al repo).

## Siguiente paso exacto
1. `git checkout main; git pull; git checkout -b dev/Juanjo; git push -u origin dev/Juanjo` (PowerShell).
2. Copiar los entregables al repo (X-002) y hacer commit: `chore(X-002): agrega reglas de agentes, plan y CI/CD`.
3. Continuar con X-003 (graphify).

## Línea base verificada (2026-10-05)
- `npm ci` ✅ · `npm run lint` ✅ (1 warning) · `npm run build` ✅ (chunk > 500 kB) · pruebas: **0**.
- Dependencia de un Supabase de terceros en `arAssets.js`, `.env.example` y `vercel.json` (tarea X-009).

## Bloqueos
- Ninguno. `docs/DESIGN.md` pendiente de que Juan lo cargue (necesario para Fase P-4, no antes).

## Pendientes detectados (fuera de alcance de la tarea actual)
- Todos los modelos se normalizan hoy a 16 cm sin importar el plato → se corrige con A-204 (repo AR) y P-307.

## Comandos para verificar
```powershell
npm ci
npm run verify   # disponible desde P-101; antes: npm run lint; npm run build
```
