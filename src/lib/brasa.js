/*
  La brasa: la textura del carbón encendido, compartida.

  La usa la escena del fondo (Escena.jsx) para la cama de carbón, y la usan
  las palabras encendidas del manifiesto, que se pintan con esta misma textura
  recortada a la forma de la letra (background-clip: text).
*/

// Generador pseudoaleatorio con semilla: la brasa sale igual en cada visita.
export function azar(semilla) {
  let a = semilla >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const lienzo = (w, h) => {
  const c = document.createElement('canvas')
  c.width = Math.max(1, Math.round(w))
  c.height = Math.max(1, Math.round(h))
  return c
}

/*
  La textura del carbón. Devuelve dos lienzos del mismo tamaño: `base` (el
  carbón, casi negro, con el brillo gris de cada trozo) y `grietas` (sólo la
  luz, con alfa, para sumarla encima en modo `lighter`).
*/
// `piso` es cuánto brilla una grieta "apagada" (0 a 1). En el fondo se
// quieren muchas apagadas; en las letras, casi todas vivas para que se lean.
export function generarBrasa(W, H, trozos = 12, piso = 0.12) {
  const rnd = azar(1107)
  const celda = Math.max(W, H) / trozos
  // Dos celdas de margen por lado: las coordenadas torcidas se salen un poco.
  const cols = Math.ceil(W / celda) + 4
  const filas = Math.ceil(H / celda) + 4
  const px = new Float32Array(cols * filas)
  const py = new Float32Array(cols * filas)
  const calorCelda = new Float32Array(cols * filas)
  for (let j = 0; j < filas; j++) {
    for (let i = 0; i < cols; i++) {
      const k = j * cols + i
      px[k] = (i - 2 + 0.12 + 0.76 * rnd()) * celda
      py[k] = (j - 2 + 0.12 + 0.76 * rnd()) * celda
      calorCelda[k] = rnd()
    }
  }

  const base = lienzo(W, H)
  const grietas = lienzo(W, H)
  const bctx = base.getContext('2d')
  const gctx = grietas.getContext('2d')
  const bdat = bctx.createImageData(base.width, base.height)
  const gdat = gctx.createImageData(grietas.width, grietas.height)
  const b = bdat.data
  const g = gdat.data
  const fina = celda * 0.045
  const halo = celda * 0.15
  // Las coordenadas se tuercen un poco antes de buscar la celda: así las
  // grietas no son rectas de polígono sino quebradas, como en un carbón.
  const tuerce = celda * 0.1
  const k1 = (Math.PI * 2) / (celda * 1.3)
  const k2 = (Math.PI * 2) / (celda * 0.55)
  // Cada grieta tiene su propio calor: unas arden, otras están casi apagadas.
  const calorGrieta = (a, c) => {
    const v = Math.sin(Math.min(a, c) * 12.9898 + Math.max(a, c) * 78.233) * 43758.5453
    return v - Math.floor(v)
  }

  for (let y0 = 0; y0 < base.height; y0++) {
    for (let x0 = 0; x0 < base.width; x0++) {
      const x = x0 + tuerce * (Math.sin(y0 * k1 + 1.3) + 0.45 * Math.sin((x0 + y0) * k2))
      const y = y0 + tuerce * (Math.sin(x0 * k1 + 2.1) + 0.45 * Math.sin((x0 - y0) * k2 + 0.7))
      const ci = Math.floor(x / celda) + 2
      const cj = Math.floor(y / celda) + 2
      let f1 = 1e12
      let f2 = 1e12
      let id = 0
      let id2 = 0
      for (let dj = -1; dj <= 1; dj++) {
        for (let di = -1; di <= 1; di++) {
          const k = (cj + dj) * cols + (ci + di)
          const dx = px[k] - x
          const dy = py[k] - y
          const d = dx * dx + dy * dy
          if (d < f1) {
            f2 = f1
            id2 = id
            f1 = d
            id = k
          } else if (d < f2) {
            f2 = d
            id2 = k
          }
        }
      }
      f1 = Math.sqrt(f1)
      f2 = Math.sqrt(f2)
      const borde = f2 - f1
      const grieta = Math.max(0, 1 - borde / fina)
      const brillo = Math.exp(-borde / halo)
      const h = calorCelda[id]
      const centro = Math.max(0, 1 - f1 / (celda * 0.75))
      const grano = rnd() * 7
      const vena = calorGrieta(id, id2)
      // Manchas grandes de calor: zonas enteras más vivas que otras.
      const mancha = 0.5 + 0.5 * Math.sin(x0 / (celda * 2.2) + 1.7 * Math.sin(y0 / (celda * 2.9)))

      // El carbón: más claro al centro de cada trozo, hundido en las grietas.
      const v = (12 + 22 * centro * centro + grano) * (1 - 0.75 * brillo)
      const o = (y0 * base.width + x0) * 4
      b[o] = v + 4
      b[o + 1] = v + 1
      b[o + 2] = v
      b[o + 3] = 255

      // La luz: la grieta, su halo y, en los trozos más calientes, un rescoldo
      // que asoma por la superficie.
      const viva = vena * vena * (0.3 + 0.7 * mancha)
      let luz = (grieta + brillo * 0.55) * (piso + (1 - piso) * viva)
      if (h > 0.8) luz += ((h - 0.8) / 0.2) * 0.3 * centro * mancha
      if (luz > 1) luz = 1
      const r = 190 + 65 * luz
      const gg = 34 + 170 * luz * luz
      const bb = 8 + 90 * luz * luz * luz
      g[o] = r
      g[o + 1] = gg
      g[o + 2] = bb
      g[o + 3] = luz * 255
    }
  }
  bctx.putImageData(bdat, 0, 0)
  gctx.putImageData(gdat, 0, 0)

  // Resplandor: la misma luz achicada y vuelta a estirar. Es un desenfoque
  // que funciona en cualquier navegador, sin `ctx.filter`.
  const chico = lienzo(W / 5, H / 5)
  chico.getContext('2d').drawImage(grietas, 0, 0, chico.width, chico.height)
  const minimo = lienzo(W / 16, H / 16)
  minimo.getContext('2d').drawImage(chico, 0, 0, minimo.width, minimo.height)

  return { base, grietas, chico, minimo }
}

/*
  Las texturas para el texto. Se generan una sola vez, en un lienzo chico
  (el texto más grande mide ~300 px de alto), se pasan a imagen y se publican
  como variable CSS en :root: --brasa-carbon (el carbón con sus grietas
  encendidas).
  Mientras no están, html no tiene la clase .brasa-lista y el texto se ve en
  rojo brasa liso.
*/
let pedido = null

const aUrl = (lienzoFuente) =>
  new Promise((resolver) => {
    lienzoFuente.toBlob((blob) => resolver(blob ? URL.createObjectURL(blob) : null), 'image/png')
  })

export function prepararBrasaTexto() {
  if (pedido) return pedido
  pedido = (async () => {
    const W = 1024
    const H = 512
    const brasa = generarBrasa(W, H, 11, 0.5)
    const carbon = lienzo(W, H)
    const cctx = carbon.getContext('2d')
    // El carbón un poco más claro que el del fondo: sobre negro tiene que
    // leerse la forma de la letra aunque la grieta esté apagada.
    cctx.drawImage(brasa.base, 0, 0)
    cctx.globalCompositeOperation = 'screen'
    cctx.fillStyle = 'rgb(58, 30, 20)'
    cctx.fillRect(0, 0, W, H)
    cctx.globalCompositeOperation = 'lighter'
    cctx.drawImage(brasa.grietas, 0, 0)
    cctx.drawImage(brasa.grietas, 0, 0)
    cctx.drawImage(brasa.chico, 0, 0, W, H)


    const urlCarbon = await aUrl(carbon)
    if (!urlCarbon) return
    const raiz = document.documentElement
    raiz.style.setProperty('--brasa-carbon', `url(${urlCarbon})`)
    raiz.classList.add('brasa-lista')
  })()
  return pedido
}
