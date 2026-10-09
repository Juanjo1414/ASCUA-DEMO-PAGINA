# Runbook — Credenciales del pipeline de modelos 3D (preparación para R-8 / P-601)

> Esto lo haces **tú**, en tu propia cuenta y tu propia terminal. Ningún
> agente de IA debe ver, leer ni pedirte que pegues el token en el chat.
> CLAUDE.md lo prohíbe explícitamente (sección 6, "Seguridad"): "Nunca leas
> ni imprimas archivos `.env*` reales, llaves o tokens."

## Contexto (para que sepas por qué este token y no otro)

El repo `MENU AR - AR` genera modelos 3D con **InstantMesh**, un modelo
público y gratuito (Apache 2.0) que corre como un _Space_ de Hugging Face
(`TencentARC/InstantMesh`). El código (`apps/worker/src/generators/instantmesh.ts`)
solo necesita un `HF_TOKEN` de **lectura** para evitar el límite de llamadas
anónimas por IP de Hugging Face — no es obligatorio técnicamente, pero sin
él el pipeline puede fallar o ir muy lento si Hugging Face limita tu IP.

**No necesitas** `MESHY_API_KEY` ni `SUPABASE_*`: no vamos a usar Meshy (es
de pago) ni el worker con colas de Supabase — el plan de revisión ya decidió
llamar las funciones del pipeline (`normalize-scale`, `optimize`, `usdz`,
`poster`) directamente desde un script nuevo, sin pasar por Supabase.

## Paso 1 — Crear tu propia cuenta de Hugging Face (gratis)

1. Entra a `https://huggingface.co/join`.
2. Crea una cuenta con tu correo (no la de tu amigo, no la compartida — una
   cuenta tuya, para que el token quede bajo tu control).
3. Confirma el correo si te lo pide.

## Paso 2 — Crear el token de acceso

1. Ya con sesión iniciada, ve a `https://huggingface.co/settings/tokens`.
2. Click **New token** (o **Create new token**).
3. Nombre: algo que te ayude a identificarlo después, ej.
   `ascua-pipeline-local`.
4. **Tipo de permiso: `Read`** (no `Write`, no `Fine-grained` con permisos
   extra). Read es lo único que este pipeline necesita — pedir solo lo
   necesario es la misma regla de mínimo privilegio que usamos con el token
   de Cloudflare.
5. Click **Generate a token** (o **Create token**).
6. Copia el token (empieza con `hf_...`). Hugging Face te lo muestra
   completo solo esta vez.

## Paso 3 — Dónde poner el token (y dónde NO)

**Nunca:**

- ❌ En ningún archivo del repo `ASCUA-DEMO-PAGINA` ni `MENU AR - AR`.
- ❌ Pegado en un mensaje de chat a Claude Code, Antigravity o cualquier IA.
- ❌ En un `.env` que subas a GitHub (aunque esté en `.gitignore`, es mejor
  hábito no arriesgarse).

**Recomendado — variable de la sesión de PowerShell (no deja rastro en disco):**

Cuando llegue el momento de correr el script de generación de modelos
(fase R-8, todavía no existe — Claude Code te va a avisar cuándo está
listo), abre PowerShell y antes de correr el comando, escribe:

```powershell
$env:HF_TOKEN = "hf_tu_token_aqui"
```

Esto solo dura mientras esa ventana de PowerShell esté abierta; al cerrarla,
desaparece. No queda guardado en ningún archivo. Después, en la **misma**
ventana, corres el script que te indique Claude Code (algo como
`npx tsx scripts/tools/generar-modelos-demo.ts`). El script lee
`process.env.HF_TOKEN` igual que lo hace hoy `instantmesh.ts` en el repo AR
— nunca se lo pasamos como texto a ningún agente.

**Alternativa si prefieres no repetir el comando cada vez** (algo menos
estricto, pero sigue siendo solo tuyo y gitignored):

1. Dentro de `MENU AR - AR/apps/worker/`, copia `.env.example` a `.env`.
2. Abre ese `.env` **tú mismo** (con el Notepad o VS Code) y pon
   `HF_TOKEN=hf_tu_token_aqui`.
3. Ese archivo ya está en `.gitignore` del repo AR (`.env*`), así que nunca
   se sube a GitHub.
4. Cuando Claude Code escriba el script de orquestación de R-8, le va a
   pedir que lo diseñe para leer ese `.env` con la bandera nativa de Node
   22 (`node --env-file=.env ...`), sin que ningún agente necesite abrir o
   leer ese archivo para que funcione.

Cualquiera de las dos opciones sirve. La de la variable de sesión es más
simple de razonar ("no existe en ningún archivo"), así que es la que
recomiendo si no te importa escribir una línea extra cada vez que retomes
el trabajo.

## Paso 4 — Docker (para la conversión a `.usdz`, sin credenciales)

La conversión a `.usdz` usa un binario (`usd_from_gltf`) que corre dentro
de la imagen Docker de `MENU AR - AR/apps/worker/Dockerfile`. Esto no
necesita ninguna cuenta ni token — solo que tengas **Docker Desktop
instalado y corriendo** en tu máquina antes de que lleguemos a esa parte
del pipeline. Si no lo tienes:

1. Descárgalo de `https://www.docker.com/products/docker-desktop/`.
2. Instálalo y ábrelo una vez para que termine de configurarse (en Windows
   puede pedirte activar WSL2 — sigue el asistente que te muestra).
3. Confirma que quedó funcionando con `docker --version` en PowerShell.

## Paso 5 — Avisar que está listo

Cuando tengas el token de Hugging Face creado (aunque todavía no lo hayas
usado) y Docker Desktop instalado y corriendo, dile a Claude Code algo como
"ya tengo el token de Hugging Face y Docker listo" — con eso, cuando
lleguemos a R-8, puede escribir el script de orquestación sabiendo que solo
le falta que tú pongas la variable de entorno en tu sesión antes de
correrlo. No hace falta que le digas el valor del token, solo que ya existe.
