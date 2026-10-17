# `domain/`

Entidades, value objects, esquemas zod y reglas de negocio puras de la
demo. Es la capa más interna: **no importa nada de las otras capas**, ni
`react`, ni `window`/`document`. `dependency-cruiser` (`npm run arch:check`)
lo verifica en cada `npm run verify`.

## Qué vive aquí

- `restaurant.ts` — el esquema completo de `restaurant.json` (la entidad
  `Restaurant`, su contacto, autorización comercial, tema y categorías),
  más `RESTAURANT_SLUG_REGEX` y `isRestaurantExpired`.
- `dish.ts` — `Dish`, `Category` y los textos localizados (`es`/`en`).
- `assetPath.ts` — la regla de qué rutas de assets son seguras (sin `..`,
  sin absolutas, sin esquema de URL).
- `ar.ts` — `DeviceCapabilities`, `ArAsset`, `ArLaunchMode` y la función
  pura `selectArLaunchMode(device, asset)`: decide si un plato se muestra
  con Quick Look, Scene Viewer, el visor en pantalla, o no se puede
  mostrar en AR (`unsupported`). Esta es la regla de negocio más sensible
  del proyecto: de ella depende qué ve el comensal en su celular.
- `price.ts` — formato de precios en pesos colombianos (`formatCopPrice`).
- `theme.ts` — reglas de contraste AA para el color primario de cada
  restaurante (`pickReadableTextColor`).

## Por qué importa que esta capa no dependa de nada

Las reglas de aquí se pueden probar con pruebas unitarias puras, sin DOM
ni red, y se pueden reutilizar desde cualquier adaptador nuevo
(`infrastructure/`) sin arrastrar React. Si una regla de negocio necesita
`window` o `fetch`, no va aquí: va en `infrastructure/`, y esta capa solo
define el _contrato_ que ese adaptador debe cumplir (vía un puerto en
`application/ports/`).
