import { test, expect } from '@playwright/test'

test.describe('Aislamiento Multi-restaurante', () => {
  test('rest-a-1234 carga correctamente y no llama a rest-b', async ({
    page,
  }) => {
    const requests: string[] = []
    page.on('request', (request) => requests.push(request.url()))

    await page.goto('/r/rest-a-1234')

    // Esperar a que la SPA haga fetch del JSON
    await page.waitForResponse((res) =>
      res.url().includes('/data/rest-a-1234/restaurant.json')
    )

    // Debería haber hecho fetch a data/rest-a-1234/restaurant.json
    const calledA = requests.some((url) =>
      url.includes('/data/rest-a-1234/restaurant.json')
    )
    expect(calledA).toBe(true)

    // NO debería haber hecho fetch a data/rest-b-5678
    const calledB = requests.some((url) => url.includes('/data/rest-b-5678'))
    expect(calledB).toBe(false)
  })

  test('slug inexistente muestra error 404', async ({ page }) => {
    await page.goto('/r/no-existe-0000')

    // Aquí validamos que el componente muestre el mensaje de error de no encontrado.
    // Depende de cómo esté implementado en la UI (asumo que dirá algo como "No encontrado" o "404")
    await expect(page.locator('body')).toContainText(/no encontrad|404/i)
  })

  test('restaurante expirado muestra mensaje de demo finalizada', async ({
    page,
  }) => {
    await page.goto('/r/rest-b-5678')

    // rest-b-5678 está configurado para estar expirado en los fixtures
    await expect(page.locator('body')).toContainText(/demo finalizada|expirad/i)
  })
})
