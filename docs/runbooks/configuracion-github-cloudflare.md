# Runbook — Configuración manual de GitHub y Cloudflare (X-006, X-007, X-008)

> Esto lo hace **Juan**, a mano, en los paneles de GitHub y Cloudflare. Ningún
> agente de IA tiene (ni debe tener) acceso a estas cuentas. Cuando termines
> cada sección, avísale a Claude Code para que siga con lo que depende de
> ella (ahora mismo, nada del código depende de esto para seguir
> trabajando — solo `deploy`/`smoke` quedan en espera hasta X-007).

---

## X-006 — Proteger la rama `main`

**Por qué:** que nadie (ni tú por accidente, ni una IA) pueda subir código
directo a producción sin pasar por un Pull Request con CI en verde.

1. Entra a `https://github.com/Juanjo1414/ASCUA-DEMO-PAGINA/settings/branches`.
2. En **Branch protection rules**, click **Add branch protection rule** (o
   **Add rule**, según el nombre que use GitHub en tu panel).
3. En **Branch name pattern**, escribe `main`.
4. Marca:
   - ☑ **Require a pull request before merging**.
     - Deja **Require approvals** en `0` (eres el único desarrollador y
       GitHub no te deja aprobar tu propio PR).
   - ☑ **Require status checks to pass before merging**.
     - ☑ **Require branches to be up to date before merging**.
     - En el buscador de checks, agrega (tienen que haber corrido **al
       menos una vez** en algún PR o push para que aparezcan en la lista;
       si no aparecen, haz un PR de prueba primero y vuelve después):
       - `ci / verify`
       - `ci / e2e`
       - `ci / security`
   - ☑ **Block force pushes**.
   - ☑ **Restrict deletions** (o "Do not allow deletions", según la versión
     del panel).
5. Click **Create** (o **Save changes**).
6. **Cómo confirmar que quedó bien:** intenta (desde tu terminal, sin pedirle
   a ningún agente que lo haga) `git push origin main` directo con algún
   cambio trivial. GitHub debe rechazarlo. Si tienes un PR abierto de
   `dev/Juanjo` a `main`, el botón de merge debe estar deshabilitado hasta
   que los 3 checks salgan en verde.

---

## X-007 — Cloudflare Pages (Direct Upload) + secrets en GitHub

**Por qué:** sin esto, los jobs `deploy` y `smoke` del workflow quedan en
espera para siempre (no fallan, pero tampoco hacen nada). Es lo único que
falta para que la demo salga a internet.

**Importante:** se usa el modo **Direct Upload**, _sin_ conectar el
repositorio de Git a Cloudflare. El despliegue siempre lo hace GitHub
Actions, nunca Cloudflare directamente — así nada se publica sin pasar el
CI primero.

### Paso 1 — Crear el proyecto en Cloudflare Pages

1. Entra a `https://dash.cloudflare.com/` → inicia sesión (o crea una cuenta
   gratuita si no tienes).
2. En el menú lateral, ve a **Workers & Pages** → pestaña **Pages** (o
   **Create application** → **Pages**, según la versión del panel).
3. Click **Create a project** → elige **Direct Upload** (no "Connect to
   Git").
4. Nombre del proyecto: usa algo corto y memorable, por ejemplo
   `ascua-demo-pagina`. **Anota este nombre exacto** — es el valor que vas a
   poner en la variable `CF_PAGES_PROJECT` más abajo.
5. En la primera pantalla te va a pedir subir un archivo/carpeta ya armada.
   Sube cualquier cosa mínima por ahora (o la carpeta `dist/` si ya corriste
   `npm run build` localmente) — el primer despliegue real lo hace GitHub
   Actions en el siguiente push; este primer upload manual solo sirve para
   que el proyecto quede creado.

### Paso 2 — Crear el token de API (permiso mínimo)

1. En Cloudflare, click en tu ícono de usuario (arriba a la derecha) →
   **My Profile** → pestaña **API Tokens**.
2. Click **Create Token** → busca la plantilla **Edit Cloudflare Workers**
   o, si no aparece esa, usa **Create Custom Token** con:
   - **Permissions:** `Account` → `Cloudflare Pages` → `Edit`.
   - **Account Resources:** `Include` → tu cuenta.
   - No le das permisos de zona (`Zone`) ni de ningún otro servicio — el
     principio es el mínimo permiso necesario.
3. Click **Continue to summary** → **Create Token**.
4. Copia el token que te muestra **una sola vez** (si lo pierdes, tienes que
   crear uno nuevo). Guárdalo en un gestor de contraseñas, no en ningún
   archivo del repo.

### Paso 3 — Anotar tu Account ID

1. En el dashboard de Cloudflare, en la página de cualquier dominio o en
   **Workers & Pages**, el **Account ID** aparece en la barra lateral
   derecha (o en la URL del dashboard, después de `/accounts/`).
2. Cópialo también.

### Paso 4 — Poner los secrets y variables en GitHub

1. Ve a `https://github.com/Juanjo1414/ASCUA-DEMO-PAGINA/settings/secrets/actions`.
2. Pestaña **Secrets** → **New repository secret**, dos veces:
   | Nombre                  | Valor                    |
   | ----------------------- | ------------------------ |
   | `CLOUDFLARE_API_TOKEN`  | el token del Paso 2      |
   | `CLOUDFLARE_ACCOUNT_ID` | el Account ID del Paso 3 |
3. Pestaña **Variables** → **New repository variable**, dos veces (estas
   **no** son secretas, por eso van en "Variables" y no en "Secrets"):

   | Nombre             | Valor                                                                                                                     |
   | ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
   | `CF_PAGES_PROJECT` | el nombre exacto del proyecto que creaste en el Paso 1 (`ascua-demo-pagina`, o el que hayas elegido)                      |
   | `PROD_URL`         | la URL pública del dominio de producción (ej. `https://ascua-demo-pagina.pages.dev`, o tu dominio propio si conectas uno) |

   Estos 4 nombres son exactamente los que usa `.github/workflows/deploy.yml`
   (`secrets.CLOUDFLARE_API_TOKEN`, `secrets.CLOUDFLARE_ACCOUNT_ID`,
   `vars.CF_PAGES_PROJECT`, `vars.PROD_URL`) — si los escribes distinto, el
   workflow no los va a encontrar.

### Paso 5 — Confirmar que funcionó

1. Haz cualquier push pequeño a `dev/Juanjo` (o pídele a Claude Code que lo
   haga como parte de una tarea).
2. En `https://github.com/Juanjo1414/ASCUA-DEMO-PAGINA/actions`, abre el run
   más reciente de **Deploy**. Ahora el job `deploy` debería ejecutarse (ya
   no decir "skipped") y el job `smoke` debería correr contra la URL de
   preview que te dio Cloudflare Pages.
3. Si `deploy` falla, lee el error — casi siempre es un nombre de secret/
   variable mal escrito o el token sin el permiso correcto.

### Paso 6 (opcional, recomendado) — Dominio propio

Si más adelante quieres un dominio propio (ej. `demo.ascua.co`) en vez del
`*.pages.dev` que da Cloudflare gratis:

1. El dominio tiene que estar administrado por Cloudflare (DNS apuntando a
   sus nameservers).
2. En el proyecto de Pages → pestaña **Custom domains** → **Set up a custom
   domain** → sigue el asistente.
3. Actualiza la variable `PROD_URL` en GitHub con la nueva URL.

---

## X-008 — CodeQL y Dependabot

**División del trabajo:** fijar las acciones de GitHub por SHA
(`upload-artifact`, `download-artifact`, `gitleaks-action`,
`wrangler-action`) y escribir `.github/dependabot.yml` **lo hace Claude
Code** directamente en el código — no necesita nada de ti. Lo único que
**sí** necesita tu intervención manual es habilitar CodeQL, porque es una
opción del panel de GitHub, no un archivo del repo.

### Habilitar CodeQL (manual, una sola vez)

1. Ve a `https://github.com/Juanjo1414/ASCUA-DEMO-PAGINA/settings/security_analysis`.
2. Busca la sección **Code scanning** → **CodeQL analysis**.
3. Click **Set up** → **Default** (el modo "Default" deja que GitHub
   detecte el lenguaje y configure todo solo; no hace falta escribir un
   workflow a mano).
4. Confirma. GitHub va a correr CodeQL automáticamente en cada push y PR a
   `main`, y en una corrida semanal.
5. **Cómo confirmar:** después del primer análisis (puede tardar unos
   minutos), revisa `https://github.com/Juanjo1414/ASCUA-DEMO-PAGINA/security/code-scanning`
   — debe aparecer al menos un análisis completado, con 0 o más alertas.

### Dependabot

No necesitas hacer nada manual aquí: cuando Claude Code agregue
`.github/dependabot.yml`, Dependabot se activa solo con el archivo (no hay
que habilitarlo en el panel, a menos que quieras además las "Dependabot
alerts" de seguridad, que están en la misma página de
`settings/security_analysis` bajo **Dependabot alerts** — recomendado
dejarlas activadas si no lo están ya).

---

## Resumen — qué avisar cuando termines

Cuando completes cada sección, dile a Claude Code cuál terminaste (X-006,
X-007 o X-008) para que:

- Actualice `docs/ESTADO.md` quitando ese bloqueo de la lista.
- Confirme con `gh run watch` que `deploy`/`smoke` ya corren (solo aplica a
  X-007).
- Siga con las tareas de código que no dependen de nada de esto (pruebas de
  contrato AR, `docs/ARQUITECTURA.md`, README por capa, etc. — ver
  `docs/ESTADO.md` § "Siguiente paso exacto").
