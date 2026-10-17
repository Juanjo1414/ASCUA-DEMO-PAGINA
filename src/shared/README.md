# `shared/`

Constantes compartidas que no son secretas ni dependen de un restaurante
en particular (si dependieran de un restaurante, irían en su propio
`restaurant.json`, no aquí). Hoy solo tiene `config.ts`
(`FEEDBACK_URL`, el enlace externo donde Juan recibe feedback).

No es una capa de la arquitectura por capas (no tiene reglas de
dependencia propias en `dependency-cruiser`); es un cajón pequeño para
evitar que una constante así termine quemada dentro de un componente.
