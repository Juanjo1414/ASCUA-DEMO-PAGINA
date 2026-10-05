---
name: Ascua
description: Cocina de autor a la brasa en Medellín; una sola brasa vista de noche, cuya temperatura sigue al scroll.
colors:
  carbon: "rgb(15 12 11)"
  carbon-900: "rgb(26 21 19)"
  carbon-800: "rgb(38 31 28)"
  carbon-700: "rgb(58 48 43)"
  brasa: "rgb(238 64 28)"
  llama: "rgb(255 178 46)"
  rescoldo: "rgb(122 20 14)"
  ceniza: "rgb(178 166 154)"
  loza: "rgb(250 241 228)"
  acento: "rgb(255 178 46)"
  blanco: "rgb(255 236 200)"
  tinta: "rgb(15 12 11)"
  crema: "rgb(250 241 228)"
typography:
  display-monumental:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(4.6rem, 21vw, 19rem)"
    fontWeight: 500
    lineHeight: 0.9
    letterSpacing: "normal"
  display:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(3rem, 8.6vw, 8.2rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(2.6rem, 5.4vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.2vw, 2.8rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.015em"
  voz:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "clamp(1.75rem, 3.4vw, 3.1rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    letterSpacing: "0.22em"
    fontVariation: "'wdth' 125"
  button:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 600
    letterSpacing: "0.14em"
    fontVariation: "'wdth' 112"
  marca:
    fontFamily: "Bodoni Moda, Didot, Georgia, serif"
    fontSize: "1.2rem"
    fontWeight: 600
    letterSpacing: "0.42em"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  margen: "20px"
  margen-sm: "24px"
  margen-lg: "40px"
  seccion: "96px"
  seccion-md: "144px"
  barra: "72px"
components:
  button-primary:
    backgroundColor: "{colors.brasa}"
    textColor: "{colors.tinta}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.llama}"
    textColor: "{colors.tinta}"
  button-tinta:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.crema}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "20px 40px"
  button-tinta-hover:
    backgroundColor: "{colors.crema}"
    textColor: "{colors.tinta}"
  chip-temperatura:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.llama}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  plato:
    rounded: "{rounded.full}"
    width: "min(84vw, 440px)"
  campo-comanda:
    textColor: "{colors.loza}"
    padding: "12px 0"
    rounded: "{rounded.none}"
  barra:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.loza}"
    height: "72px"
  franja-movil:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.crema}"
    height: "56px"
---

# Design System: Ascua

## Overview

**Creative North Star: "La brasa de noche"**

Toda la página es un solo fuego visto en la oscuridad, y el scroll es su temperatura. El fondo es un canvas fijo (`Escena.jsx`) que dibuja carbón agrietado con textura de Voronoi, una cama de brasas, llamas blandas a un cuarto de resolución y chispas; su color sale de una rampa de cuerpo negro (`colorDeCalor` en `lib/calor.js`). Cada sección declara su tramo de temperatura y la escena y los campos de color lo siguen. No hay tema claro: el concepto es fuego de noche.

La tipografía es un contraste de filos: Bodoni Moda de trazo fino en mayúsculas muy abiertas para la voz grande, contra rótulos anchos de Archivo (eje de anchura al 112–125 %) para datos, controles y firmas. La densidad es baja y teatral: titulares enormes, mucho carbón entre bloques, una sola idea por pantalla. Las únicas imágenes raster son las ocho fotos cenitales de los platos, siempre en círculo; todo lo demás (brasa, llamas, papel) se dibuja en código. El hero es un horizonte de fuego: negro, A S C U A en Bodoni fina y quieta, y una sola línea delgada de fuego vivo (núcleo casi blanco, halo naranja, lenguas diminutas e irregulares) que cruza la pantalla bajo el nombre. Al bajar, la línea desciende hasta el pie, toca el carbón y prende la fogata. Las opiniones son comandas: tickets de papel crema (`.comanda`, borde de dientes por máscara, letra impresa `.comanda-impresa` en Archivo angosta) colgados de un riel, que se mecen (`mecer`). Lo que arde (la sección del fuego) muestra las tres maderas y el carbón como etiquetas de saco en papel kraft (`.etiqueta`, esquinas cortadas, `.etiqueta-nombre` en Archivo angosta pesada, `.sello` en tinta brasa) que caen sobre la mesa con el scroll: la misma familia de objetos impresos que las comandas, sin repetir los platos de la carta. La reserva ya no es un bloque con borde duro: su campo se funde arriba y abajo con la noche (`.reserva-campo`), y el contacto y el pie no tienen panel propio. `la técnica` del manifiesto usa `.en-brasa`, la textura del carbón recortada a la letra. No hay logo: la marca es la palabra ASCUA en Bodoni espaciada.

No hay indicador de scroll: el avance se lee en el fuego mismo, que crece y se enfría con la página. En el celular, una franja fina al pie (`FranjaReserva`) deja la reserva a un toque, con el horario corto.

La RA es lo que se vende. El hero la anuncia con un enlace (`Mira la carta sobre tu mesa, en RA`) y en la carta los platos con modelo entran como los coloca la realidad aumentada: aparece la retícula del visor (aro punteado y cuatro esquinas en llama), el plato baja flotando y se asienta en el aro, y las esquinas se cierran sobre él.

**Key Characteristics:**
- La temperatura es la columna vertebral: `data-calor`, `data-etapa` y `data-llama` por sección.
- Fondo de carbón casi negro; el calor lo ponen los campos de color planos y la luz del canvas, nunca un negro teñido.
- Bodoni de filo fino contra rótulos anchos y espaciados de Archivo.
- Bloques rectos (0 px de radio); el círculo es exclusivo de los platos y de los puntos de lectura.
- Sin fotos fuera de la carta, sin logo, sin tema claro.

### La escala de temperatura

| Sección | `data-calor` | `data-etapa` | `data-llama` |
|---|---|---|---|
| HeroFuego | 20,420 | rescoldo | 0 |
| Manifiesto | 420,700 | aviva | 0.35 |
| LoQueArde | 700,950 | llama | 1 |
| Menu | 950,950 | pase | 0 |
| Voces | 950,1000 | viva | 0.12 |
| Reserva | 1000,1100 | blanco | 0.4 |
| Contacto | 1100,300 | sobremesa | 0 |
| Pie | 300,180 | sobremesa | 0 |

La temperatura es la interpolación (con `smoothstep`) del tramo de la sección que ocupa el centro de la pantalla; `data-llama` se acerca de a poco (factor 0.06 por frame), nunca salta.

**The Temperature Spine Rule.** Toda sección nueva declara su tramo con `data-calor="desde,hasta"` y su `data-etapa`, y encaja en la curva: sube de 20 °C en el hero a 1100 °C en la reserva y baja a 180 °C en la sobremesa. Una sección sin tramo no existe para la escena.

**The Flame Budget Rule.** `data-llama` (0 a 1) dice cuánta llama se ve detrás del texto. 0 es sólo brasa: se usa donde hay que leer o mirar platos (hero, carta). 1 sólo en el tramo del fuego, sin párrafos largos encima. Detrás de texto corrido, no más de 0.4.

## Colors

La paleta es la de un fuego a distintas temperaturas sobre carbón: tres colores de llama, un carbón casi negro y dos claros cálidos para escribir. Los valores viven en `src/index.css` como tripletes (`--c-x: r g b`) y se usan como `rgb(var(--c-x))` o, en Tailwind, con alfa (`text-crema/80`).

### Primary
- **Brasa** (`brasa`): rojo-naranja de llama viva. Fondo del botón principal, la cinta del manifiesto y el menú móvil (`.campo-brasa`), el subrayado activo de la barra, el caret de los campos, el pulgar de la barra de scroll y la palabra ASCUA del pie. Primer campo de la reserva.

### Secondary
- **Llama** (`llama`): el amarillo del núcleo. Relleno que sube en el hover del botón, énfasis en cursiva dentro de titulares, las cifras de grados de las zonas, el chip de temperatura, las comillas de las voces, `::selection` y el anillo de foco. Segundo campo de la reserva.
- **Acento** (`acento`): alias de llama para texto sobre carbón (enlace activo, hover de controles, mensajes del formulario).

### Tertiary
- **Rescoldo** (`rescoldo`): rojo hondo del carbón que se apaga. Base del mercurio en ElFuego y del resplandor bajo los platos destacados; bordes del modal de RA.
- **Blanco caliente** (`blanco`): el fuego por encima de los mil grados. Sólo existe como tercer campo de la reserva, el clímax.

### Neutral
- **Carbón** (`carbon`, con `carbon-900`, `carbon-800`, `carbon-700`): fondo de la página, de la barra pasado el hero y, al 85 %, de contacto y pie. Los tonos 900/800 son las superficies del modal de RA.
- **Tinta** (`tinta`): el mismo casi-negro, como tinta fija para escribir sobre campos de color (brasa, llama, blanco) y para el chip de temperatura y la franja móvil.
- **Crema** (`crema`) y **Loza** (`loza`): el mismo claro cálido. Crema es la tinta de texto sobre el fuego; loza es el texto base del `body` y de los campos.
- **Ceniza** (`ceniza`): texto secundario sobre carbón (etiquetas de formulario, dirección, copyright, placeholders al 70 %).

**The Locked Names Rule.** `carbon`, `brasa`, `llama`, `rescoldo`, `ceniza` y `loza` los leen los archivos bloqueados de RA/3D (`lib/launchAr.js`, `lib/arAssets.js`, `lib/browserEnv.js`, `ArDishModal.jsx`, `ArViewer.jsx`). Sus valores pueden cambiar; sus nombres, nunca.

**The Ink On Field Rule.** Sobre un campo de color sólido se escribe en `tinta`; sobre el carbón y el fuego, en `crema`/`loza`. Nunca texto claro sobre llama o blanco.

**The Black Body Rule.** Todo color que represente temperatura (la luz del canvas) sale de `colorDeCalor(t)`, no de un token.

## Typography

**Display Font:** Bodoni Moda (con Didot, Georgia, serif)
**Body Font:** Archivo, fuente variable con eje de anchura 62–125 (con system-ui, sans-serif)

**Character:** el remate fino de Bodoni corta como un filo y, en mayúsculas espaciadas, tiene la nobleza de un grabado; Archivo ancho y espaciado es la etiqueta de fosforera que acompaña datos y controles. Ambas llegan por Google Fonts.

### Hierarchy
- **Display monumental** (500, clamp(4.6rem, 21vw, 19rem), 0.9): las cinco letras A S C U A del hero, repartidas a todo el ancho. En la reserva, el titular llega a clamp(3.6rem, 17vw, 13.5rem) con interlínea 0.86 y tracking −0.03em; en el pie, ASCUA en mayúsculas a 25vw cortado por el borde inferior.
- **Display** (500, clamp(3rem, 8.6vw, 8.2rem), 0.95): el manifiesto, máx. 14ch, con la última frase en cursiva `llama`.
- **Headline** (500, clamp(2.4–2.6rem, ~5vw, 4.4–5rem), 1.02, −0.015em): el h2 de cada sección. `text-wrap: balance`.
- **Title** (500, clamp(1.9rem, 3.2vw, 2.8rem)): nombres de platos destacados; en la rejilla, 1.25–1.5rem. Las zonas del fuego van en cursiva a 1.5rem.
- **Voz** (400 cursiva, clamp(1.75rem, 3.4vw, 3.1rem), 1.1): testimonios y frases de la cinta, sin tarjeta.
- **Body** (400, 1.125rem, 1.625): párrafos en `crema/80`, máx. 40–48ch. Texto de apoyo a 0.875rem. `text-wrap: pretty`.
- **Label** (600, 0.7rem, 0.22em, mayúsculas, anchura 125 %): la clase `.rotulo`. Navegación, firmas, etiquetas de formulario, etapa del termómetro, chip de temperatura, horario.
- **Button** (600, 0.8rem, 0.14em, mayúsculas, anchura 112 %): sólo dentro de `.boton`.
- **Marca** (Bodoni 600, 1.2rem, 0.42em, mayúsculas): la palabra ASCUA en la barra y la carga.

**The Two Blades Rule.** Bodoni habla (titulares, voces, nombres); Archivo ancho rotula (datos, controles, firmas). No hay una tercera voz en pantalla.

**The Italic Heat Rule.** El énfasis dentro de un titular es cursiva de Bodoni en `llama`, nunca negrita ni otro color.

**The Tabular Reading Rule.** Toda cifra que cambia en vivo (grados) va en `tabular-nums` para que no salte.

## Layout

Una sola columna narrativa de ancho máximo 1400 px (`max-w-content`), con márgenes de 20 px en móvil, 24 px desde `sm` y 40 px desde `lg`. Rejilla de 12 columnas en las secciones con dos lados (voces, contacto, pie). Ritmo vertical de sección: 96 px en móvil, 144 px desde `md`. La barra mide 72 px y todas las anclas llevan `scroll-margin-top: 72px`.

Dos secciones se fijan con GSAP (`pin`): el hero (+140 %) y ElFuego en escritorio (+220 %); en el celular ElFuego es una lista normal. `html, body` usan `overflow-x: clip`, no `hidden`, para no romper los pines.

En móvil, el `main` deja 56 px libres al final (`pb-14`) para la franja fija de reserva.


## Elevation & Depth

El sistema es plano: los campos de color no llevan sombra ni brillo, y la profundidad la da la luz del canvas detrás. Las únicas sombras son de luz de fuego: sombras largas y difusas bajo los platos, como si estuvieran sobre la mesa, y un `text-shadow` oscuro para leer texto sobre las llamas. Los resplandores son degradados radiales de brasa, nunca `box-shadow` de color.

### Shadow Vocabulary
- **Plato destacado** (`box-shadow: 0 40px 70px -30px rgb(0 0 0 / 0.9)`): platos grandes de la carta.
- **Plato de rejilla** (`box-shadow: 0 30px 50px -28px rgb(0 0 0 / 0.9)`): platos pequeños.
- **Texto sobre fuego** (`text-shadow: 0 2px 14px rgb(0 0 0 / 0.75)`): el título de Lo que arde y el pie del hero; antes el termómetro usaba `0 1px 8px rgb(0 0 0 / 0.8)`.
- **Resplandor de brasa** (`radial-gradient(closest-side, rgb(var(--c-brasa) / 0.35), rgb(var(--c-rescoldo) / 0.15) 60%, transparent)`): detrás de los platos destacados y del punto de carga.

**The Flat Field Rule.** Un campo de color es plano: el clímax de la reserva es el cambio de color (brasa → llama → blanco por opacidad de tres capas quietas), no un brillo encima.

## Shapes

Dos formas y nada en medio. Todo lo construido (botones, chips, franjas, campos, la barra, el botón de volver arriba) es un bloque recto de 0 px. El círculo es la forma de la comida y de la lectura: los ocho platos, las miniaturas de 44 px en ElFuego, el punto de la aguja, el punto de la franja móvil y los separadores de la cinta. Los campos de formulario no son cajas: son una línea inferior de 1 px sobre la que se escribe, como una comanda. El mapa de Google entra en la noche con el filtro `.mapa` (invertido, casi sin color, con un poco de sepia).

**The Circle Is Food Rule.** El círculo se reserva para platos y puntos de lectura. Un control nunca es redondo ni píldora.

## Components

### Buttons
Un bloque recto con el calor por dentro.
- **Shape:** esquinas rectas (0 px).
- **Primary (`.boton`):** fondo `brasa`, texto `tinta`, 16 px × 28 px, rótulo de botón, flecha SVG opcional a la derecha.
- **Hover / Focus:** la llama sube desde abajo y llena el bloque (`::before` en `llama`, `scaleY` 0 → 1, 0.45 s `cubic-bezier(0.19, 1, 0.22, 1)`); la flecha avanza 4 px. El foco visible dispara el mismo relleno más el contorno de 2 px en `llama` a 3 px.
- **Tinta (`.boton--tinta`):** para escribir sobre un campo de color (reserva, menú móvil): fondo `tinta`, texto `crema`, se enciende en `crema`.
- **Disabled:** 60 % de opacidad y cursor de progreso.
- **Secundario textual:** un `.rotulo` con icono y flecha que pasa a `llama` en hover (Ver en 3D).

### Chips
- **Chip de temperatura:** `.rotulo` en `llama` sobre bloque `tinta`, 8 × 12 px, anclado en la esquina superior derecha del plato. Es la única forma en que una temperatura acompaña un plato.

### Cards / Containers
No hay tarjetas. Los platos flotan sobre el carbón y las voces se separan con reglas de 1 px en `crema/15`. Los contenedores son campos de color a sangre (`.campo-brasa`) o nada.

### Inputs / Fields
- **Style:** sin caja, sin fondo, sin radio; línea inferior de 1 px en `loza/25`, texto `loza` a 1.125rem, 12 px verticales, etiqueta `.rotulo` en `ceniza` encima.
- **Focus:** la línea se enciende en `brasa`; el caret también es brasa.
- **Error:** la línea pasa a `acento` y el mensaje aparece debajo en `acento` a 0.875rem, enlazado con `aria-describedby`.

### Navigation
- **Barra:** 72 px, transparente con texto `crema` sobre el hero; `carbon` con texto `loza` pasado el hero. Marca a la izquierda, enlaces `.rotulo` al centro, idioma y Reservar a la derecha.
- **Activo:** texto `acento` y una banderita de 2 px en `brasa` que se despliega de izquierda a derecha (`scaleX`).
- **Móvil:** hamburguesa de 44 px; el menú abierto es un campo `.campo-brasa` a pantalla completa con los enlaces en Bodoni cursiva de 2.6rem y un `.boton--tinta` para reservar.

### Termómetro (componente firma)
En escritorio, una escala vertical fija al borde derecho (46svh de alto, marcas cada 200 °C de 0 a 1200), con una aguja que se mueve sólo por `translateY` y a su izquierda la lectura en grados y el nombre de la etapa en `.rotulo`. Está oculto durante el hero y aparece cuando la brasa se asienta. En móvil es una franja fija abajo de 56 px, `tinta/95`, con punto de color, grados y etapa a la izquierda y un `.boton` de reserva a la derecha: reservar siempre a un toque. Sólo toca el DOM cuando cambia el número entero.

### Plato
La foto cenital en círculo (`aspect-square`, `rounded-full`, `object-cover`), girando de ±40° a 0 con el scroll como si la acabaran de dejar en la mesa, con su chip de temperatura. Los destacados (los que tienen RA) van a `min(84vw, 440px)` sobre un resplandor de brasa; el resto en rejilla de 2/3 columnas.

### Escena
Un único canvas fijo detrás de todo: brasa de Voronoi (calculada una vez por tamaño y con semilla fija), cama de carbón, llamas y chispas. Trabaja a resolución reducida (dpr máx. 1.5, 2 en táctil; llamas a un cuarto), a 30 fps en pantallas táctiles, se detiene con la pestaña oculta y con movimiento reducido sólo redibuja al hacer scroll, sin chispas ni vaivén.

### Movimiento
Todo lo que se mueve con el scroll o en bucle anima sólo `transform` y `opacity`; los cambios de color de estado (hover) son la única excepción. Entradas: `y` 40–50 px y opacidad, 1.1–1.2 s `expo.out`, una vez. Coreografías de scroll con `scrub` 0.3–0.6. Luz de las letras de brasa: `respira`, 3.4 s, cada letra con su desfase. Hero: las letras se abren y estallan en chispas mientras la fogata crece (`calor.portal`); no hay disco. Cortina de carga: `translateY(-100%)` a 0.7 s `cubic-bezier(0.76, 0, 0.24, 1)`, menos de 1.5 s en total.

**The Reduced Motion Rule.** Cada animación tiene su camino con `prefers-reduced-motion`: el estado final se fija con `gsap.set` (o no se anima), la carga no se muestra, el canvas no corre en el tiempo, y el CSS global lleva transiciones y animaciones a 0.001 ms.

## Do's and Don'ts

### Do:
- **Do** declarar `data-calor`, `data-etapa` y `data-llama` en toda sección nueva y respetar la curva 420 → 1100 → 180 °C.
- **Do** mantener `data-llama="0"` donde se miran platos y ≤ 0.4 detrás de texto corrido.
- **Do** escribir en `tinta` sobre campos de color y en `crema`/`loza` sobre el carbón.
- **Do** mostrar la temperatura de un plato como chip `.rotulo` `llama` sobre `tinta`, encima del plato.
- **Do** dibujar en código todo lo que no sea una foto de plato; las fotos de plato van en círculo, con su procedencia en `fuentes/PROCEDENCIA.md`.
- **Do** animar sólo `transform` y `opacity`, y dar a cada animación su camino de movimiento reducido.
- **Do** mantener el canvas a resolución reducida, a 30 fps en táctil y en pausa con la pestaña oculta.

### Don't:
- **Don't** usar botones píldora ni controles redondeados: los bloques son rectos (0 px).
- **Don't** poner etiquetas (eyebrows) encima de los titulares; la temperatura va en el plato como chip.
- **Don't** usar texto con degradado.
- **Don't** crear un tema claro ni superficies claras fuera del campo `blanco` de la reserva.
- **Don't** agregar logo ni isotipo: la marca es la palabra ASCUA en Bodoni espaciada.
- **Don't** agregar imágenes raster fuera de las ocho fotos de la carta.
- **Don't** renombrar `carbon`, `brasa`, `llama`, `rescoldo`, `ceniza` ni `loza`, ni tocar la lógica de RA/3D bloqueada.
- **Don't** animar `background-color`, tamaños o posiciones con el scroll: los cambios de color de campo se hacen con capas quietas y opacidad.
