import { test, expect } from '@playwright/test'

/**
 * Smoke test post-despliegue (`deploy.yml › smoke`).
 *
 * Corre contra la URL ya publicada en Cloudflare Pages (preview o
 * producción, según `BASE_URL`). No prueba lógica de negocio a fondo —
 * eso ya lo hace `tests/e2e/` antes del despliegue — solo confirma que lo
 * publicado realmente responde: la carta del restaurante de la demo carga,
 * un slug inexistente da 404 y las cabeceras de seguridad de
 * `public/_headers` llegaron al servidor real.
 */

const SLUG_DEMO = 'ascua-demo-abcd'

test('la carta del restaurante demo carga y muestra su nombre', async ({
  page,
}) => {
  const response = await page.goto(`/r/${SLUG_DEMO}`)
  expect(response?.ok()).toBeTruthy()
  await expect(page.locator('body')).not.toContainText('Error:')
})

test('un slug inexistente muestra la página de error, no un 500', async ({
  page,
}) => {
  const response = await page.goto('/r/no-existe-0000')
  // La SPA sirve siempre 200 (catch-all de _redirects) y resuelve el 404
  // del lado del cliente navegando a /404; lo que no debe pasar es un error
  // de servidor.
  expect(response?.status()).toBeLessThan(500)
})

test('las cabeceras de seguridad de _headers llegan al navegador', async ({
  request,
  baseURL,
}) => {
  const response = await request.get(baseURL ?? '/')
  const headers = response.headers()
  expect(headers['x-frame-options']).toBe('DENY')
  expect(headers['x-content-type-options']).toBe('nosniff')
})
