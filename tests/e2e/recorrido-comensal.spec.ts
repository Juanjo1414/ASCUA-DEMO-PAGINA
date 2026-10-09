import { test, expect } from '@playwright/test'

/**
 * Recorrido completo del comensal: carta → plato → "Ver en mi mesa" → guía de
 * AR → visor. Completa el Lote 6 (C-33), que hasta la revisión del
 * 2026-10-09 solo tenía la prueba de aislamiento (`isolation.spec.ts`) pese a
 * que el paso de CI decía cubrir "accesibilidad + aislamiento".
 *
 * Usa el restaurante de prueba `rest-c-9012` (tests/fixtures/restaurants),
 * con un plato que tiene modelo aprobado y otro sin modelo, para probar
 * también que el botón de AR no aparece cuando no hay modelo aprobado.
 *
 * Importante sobre los proyectos Mobile Chrome / Mobile Safari: en esos
 * dispositivos, `selectArLaunchMode` elige Scene Viewer o Quick Look
 * (lanzamiento nativo del sistema operativo), no el visor en pantalla. Un
 * navegador de prueba no puede completar ese lanzamiento nativo (no hay un
 * Android/iOS real detrás), así que las aserciones que dependen de que el
 * visor en pantalla se abra solo corren en Desktop Chrome, donde
 * `selectArLaunchMode` cae al visor `model-viewer-modal`. El lanzamiento
 * nativo en sí se prueba con pruebas de contrato (`tests/unit/infrastructure/ar/`)
 * y con el QA manual de Juan en sus celulares (`docs/runbooks/qa-dispositivos.md`).
 */

test.describe('Recorrido del comensal', () => {
  test('el botón de AR solo aparece en el plato con modelo aprobado', async ({
    page,
  }) => {
    await page.goto('/r/rest-c-9012')

    const tarjetaConAr = page.locator('li', { hasText: 'Plato con AR' })
    await expect(
      tarjetaConAr.getByRole('button', { name: 'Ver en mi mesa' })
    ).toBeVisible()

    const tarjetaSinAr = page.locator('li', { hasText: 'Plato sin AR' })
    await expect(
      tarjetaSinAr.getByRole('button', { name: 'Ver en mi mesa' })
    ).toHaveCount(0)
  })

  test('primera vez: toca "Ver en mi mesa" y aparece la guía de 3 pasos', async ({
    page,
  }) => {
    await page.goto('/r/rest-c-9012')
    await page
      .locator('li', { hasText: 'Plato con AR' })
      .getByRole('button', { name: 'Ver en mi mesa' })
      .click()

    const guia = page.getByRole('dialog', { name: '¿Cómo funciona?' })
    await expect(guia).toBeVisible()
    await expect(guia).toContainText('Apunta a tu mesa')
    await expect(guia).toContainText('Mueve el celular despacio')
    await expect(guia).toContainText('Acércate o camina alrededor')
    await expect(
      guia.getByRole('button', { name: 'Entendido, abrir cámara' })
    ).toBeVisible()
  })

  test('el botón flotante "¿Cómo funciona?" reabre la guía en cualquier momento', async ({
    page,
  }) => {
    await page.goto('/r/rest-c-9012')
    await page.getByRole('button', { name: '¿Cómo funciona?' }).click()
    await expect(
      page.getByRole('dialog', { name: '¿Cómo funciona?' })
    ).toBeVisible()
  })

  test('Desktop (sin AR nativo): tras la guía se abre el visor en pantalla, en su tamaño real', async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== 'chromium',
      'En Android/iOS este gesto abre Scene Viewer/Quick Look nativo (no un modal en la página); ver el comentario del archivo.'
    )

    await page.goto('/r/rest-c-9012')
    const botonVerEnMiMesa = page
      .locator('li', { hasText: 'Plato con AR' })
      .getByRole('button', { name: 'Ver en mi mesa' })

    await botonVerEnMiMesa.click()
    await page
      .getByRole('dialog', { name: '¿Cómo funciona?' })
      .getByRole('button', { name: 'Entendido, abrir cámara' })
      .click()

    const visor = page.getByRole('dialog', { name: 'Plato con AR' })
    await expect(visor).toBeVisible()
    await expect(visor).toContainText('tamaño real')

    // Se puede cerrar con Escape (el modal escucha keydown y llama a onClose).
    await page.keyboard.press('Escape')
    await expect(visor).toHaveCount(0)

    // Tras ver la guía una vez, el siguiente toque abre el visor directo.
    await botonVerEnMiMesa.click()
    await expect(
      page.getByRole('dialog', { name: '¿Cómo funciona?' })
    ).toHaveCount(0)
    await expect(visor).toBeVisible()
  })
})
