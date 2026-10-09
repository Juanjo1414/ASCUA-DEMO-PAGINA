/**
 * Accesibilidad automática (C-32 de docs/Correcciones antes de continuar.md).
 *
 * Corre axe-core (reglas WCAG 2.1 A/AA) sobre la carta del restaurante de
 * prueba y sobre la guía de 3 pasos de AR abierta. No reemplaza el QA
 * manual de Juan en sus celulares: detecta problemas estructurales
 * (contraste, roles ARIA, labels) que un recorrido visual puede pasar por
 * alto, pero no mide gestos táctiles reales ni el lanzamiento nativo de AR.
 */
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accesibilidad (axe-core, WCAG 2.1 A/AA)', () => {
  test('la carta del restaurante no tiene violaciones serias ni críticas', async ({
    page,
  }) => {
    await page.goto('/r/rest-a-1234')
    await page.waitForResponse((res) =>
      res.url().includes('/data/rest-a-1234/restaurant.json')
    )
    // Deja que termine la animación de carga antes de escanear.
    await page.waitForTimeout(1000)

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriasOCriticas = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    )

    expect(seriasOCriticas, JSON.stringify(seriasOCriticas, null, 2)).toEqual(
      []
    )
  })

  test('la guía de 3 pasos de AR no tiene violaciones serias ni críticas', async ({
    page,
  }) => {
    await page.goto('/r/rest-c-9012')
    await page.waitForResponse((res) =>
      res.url().includes('/data/rest-c-9012/restaurant.json')
    )
    await page.getByRole('button', { name: 'Ver en mi mesa' }).first().click()
    await expect(page.getByRole('dialog')).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()

    const seriasOCriticas = results.violations.filter(
      (v) => v.impact === 'serious' || v.impact === 'critical'
    )

    expect(seriasOCriticas, JSON.stringify(seriasOCriticas, null, 2)).toEqual(
      []
    )
  })
})
