# `application/`

Casos de uso y puertos (interfaces) de la aplicación. Importa solo
`domain/`; nunca `infrastructure/` ni `presentation/`, ni nada del
navegador directamente.

## `ports/` — los contratos que implementa `infrastructure/`

Cada puerto es pequeño y tiene una sola responsabilidad (segregación de
interfaces): `RestaurantRepository` solo lee restaurantes,
`SoldOutStore` solo marca/consulta agotados, etc. Nadie implementa un
método que no usa.

- `restaurantRepository.ts`, `arLauncher.ts`, `environmentDetector.ts`,
  `soldOutStore.ts`, `analyticsTracker.ts`, `uiPreferencesStore.ts`.

## `use-cases/` — lo que hace la aplicación, independiente de React

- `getRestaurant.ts` — carga un restaurante por slug y calcula si se puede
  acceder (expirado, pausado) antes de que la UI decida qué pantalla
  mostrar.
- `launchDishAr.ts` — orquesta el lanzamiento de AR de un plato: detecta
  capacidades, llama a `selectArLaunchMode` (dominio), registra analítica
  y delega al `ArLauncher` concreto. No sabe si el dispositivo es un
  iPhone o un Android: eso lo decide el dominio a partir de lo que
  reporta el puerto `EnvironmentDetector`.
- `buildMenuView.ts` — prepara los datos del menú para la UI.
- `buildReservationLink.ts` — arma el enlace de WhatsApp prellenado (sin
  backend, sin simular un envío de formulario).
- `toggleSoldOut.ts` — marca/desmarca un plato como agotado.

## `dependencies.ts`

El contrato `AppDependencies`: agrupa todos los puertos que
`presentation/` puede pedir vía `useDependencies()`. Lo implementa
`app/compositionRoot.ts` con los adaptadores reales; las pruebas lo
implementan con dobles en memoria (`tests/unit/application/doubles.ts`).

## Cómo se prueba

Con dobles en memoria inyectados por constructor/parámetro — nunca con
`window`, `fetch` o `localStorage` reales. Ver los ejemplos en
`tests/unit/application/`.
