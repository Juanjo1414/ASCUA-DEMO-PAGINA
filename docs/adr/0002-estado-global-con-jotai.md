# ADR 0002: Estado global con Jotai

## Contexto

La aplicación necesita un mecanismo para compartir el estado global a través de múltiples componentes. Específicamente, necesitamos compartir:

1. El restaurante actual cargado (`Restaurant`), para que la interfaz se adapte.
2. El estado de "agotado" de los platos.

Inicialmente, esto podría resolverse pasando propiedades o utilizando contextos de React, pero a medida que la aplicación crece, esto puede llevar a "prop drilling" y a renderizados innecesarios de todo el árbol de componentes cuando solo cambia una parte del estado.

## Opciones consideradas

| Opción            | Complejidad                                       | Tamaño             | Riesgo                                                                             |
| :---------------- | :------------------------------------------------ | :----------------- | :--------------------------------------------------------------------------------- |
| **Jotai**         | Baja (basado en átomos, API similar a `useState`) | Muy pequeño (3 kB) | Bajo                                                                               |
| **React Context** | Media (requiere proveedores y memoización manual) | Integrado (0 kB)   | Medio (problemas de rendimiento por renderizados masivos si no se usa con cuidado) |
| **Zustand**       | Baja (store único)                                | Pequeño (1 kB)     | Bajo                                                                               |

## Decisión

Se decidió utilizar **Jotai** para la gestión del estado global (**aprobada por Juan**). Jotai proporciona una forma minimalista de declarar átomos de estado independientes que se pueden leer y escribir desde cualquier componente sin causar renderizados en componentes que no dependen de ese átomo.

## Consecuencias

- **Positivas:**
  - La interfaz de usuario es más reactiva.
  - El código de los componentes es más limpio, sin prop drilling profundo.
  - Fácil de integrar con la arquitectura por capas actual.
- **Negativas:**
  - Introduce una nueva dependencia de terceros en el proyecto.
