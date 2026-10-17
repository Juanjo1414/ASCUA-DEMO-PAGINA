import { defineConfig, devices } from '@playwright/test'

/**
 * Configuración de Playwright para el "smoke test" de `deploy.yml`.
 *
 * A diferencia de `playwright.config.ts` (que construye su propio `dist-e2e`
 * con restaurantes de prueba), este smoke test corre DESPUÉS de un despliegue
 * real contra la URL pública (preview o producción de Cloudflare Pages) que
 * llega en la variable de entorno `BASE_URL`. No levanta ningún servidor
 * propio: solo verifica que lo que ya está publicado responde.
 */
export default defineConfig({
  testDir: './tests/smoke',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4173',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
