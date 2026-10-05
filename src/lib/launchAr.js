import { isIOS } from './browserEnv'

// Abrir la RA directo, sin pasar por <model-viewer>. model-viewer necesita
// estar montado y cargado antes de poder activar nada, lo que obligaba a un
// segundo toque dentro del modal. Quick Look y Scene Viewer se pueden invocar
// con un solo gesto si se llama al mecanismo nativo de cada sistema.

/** iOS: un <a rel="ar"> con una <img> dentro es lo que dispara Quick Look. */
function launchQuickLook(usdzUrl, posterUrl, allowScaling) {
  const anchor = document.createElement('a')
  anchor.setAttribute('rel', 'ar')
  // allowsContentScaling=0 clava el modelo a su tamano real y desactiva el
  // pellizco; con 1 el usuario puede escalarlo a lo que quiera.
  anchor.href = `${usdzUrl}#allowsContentScaling=${allowScaling ? 1 : 0}`
  anchor.style.display = 'none'

  // Sin una <img> hija, Safari abre el USDZ como descarga en vez de Quick Look.
  const img = document.createElement('img')
  img.src = posterUrl
  img.alt = ''
  anchor.appendChild(img)

  document.body.appendChild(anchor)
  anchor.click()
  setTimeout(() => anchor.remove(), 1000)
}

/** Android: Scene Viewer se abre por intent:// con el GLB como parámetro. */
function launchSceneViewer(glbUrl, title, allowScaling) {
  const params = new URLSearchParams({
    file: glbUrl,
    mode: 'ar_preferred',
    // resizable=false clava el modelo a su tamaño real; true deja pellizcar
    // para agrandarlo, que es como se comporta Quick Look en iPhone.
    resizable: allowScaling ? 'true' : 'false',
    title,
  })
  const fallback = encodeURIComponent(window.location.href)
  const intent =
    `intent://arvr.google.com/scene-viewer/1.0?${params.toString()}` +
    `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
    `action=android.intent.action.VIEW;S.browser_fallback_url=${fallback};end;`
  window.location.href = intent
}

/**
 * Lanza la RA nativa. Devuelve false si el aparato no tiene ninguna de las
 * dos vías, para que quien llame muestre el aviso correspondiente.
 */
// allowScaling en false por defecto: el modelo ya viene normalizado a 0.16 m
// desde el pipeline (pipeline/normalize-scale.ts y publish-dish.mjs), que es
// el tamano real de un plato servido. Dejar que se redimensione solo permite
// alejarse de esa medida, y el punto del AR aca es que el comensal vea la
// porcion tal como se la van a traer — un plato que se puede agrandar a
// gusto deja de ser referencia de tamano.
export function launchAr({ glbUrl, usdzUrl, posterUrl, title, allowScaling = false }) {
  if (isIOS()) {
    if (!usdzUrl) return false
    launchQuickLook(usdzUrl, posterUrl, allowScaling)
    return true
  }

  const isAndroid = /Android/i.test(navigator.userAgent || '')
  if (isAndroid) {
    if (!glbUrl) return false
    launchSceneViewer(glbUrl, title, allowScaling)
    return true
  }

  return false
}
