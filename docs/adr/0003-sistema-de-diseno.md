# ADR 0003: Sistema de diseño adaptable

## Contexto

El proyecto requiere una interfaz que sea estéticamente premium y a la vez lo suficientemente neutral para funcionar como una plataforma multi-restaurante. Originalmente, el diseño hacía uso de tipografías y marcas propietarias, lo que limitaba su capacidad para escalar a múltiples clientes sin incurrir en problemas de licencias o de identidad de marca cruzada.

## Decisión

Se adoptó un sistema de diseño inspirado en una referencia externa de alta calidad (Sweetgreen), pero **extrayendo únicamente principios, proporciones y estructura**.

- Se han establecido **tokens neutros** (`cream-canvas`, `forest-shadow`, `lime-glow`) que definen el lenguaje visual.
- Se ha eliminado cualquier rastro de marcas o textos de terceros.
- Se utilizan **tipografías abiertas con licencia libre** (DM Sans y Fraunces), alojadas localmente para no depender de servicios externos ni comprometer el rendimiento y la privacidad.
- La aplicación se estructura de modo que cada restaurante solo necesita sobrescribir su **color primario, su par tipográfico y su logo** para hacer suya la página.

## Consecuencias

- **Positivas:**
  - Permite escalar la solución a múltiples restaurantes ("multi-tenant") sin riesgo legal.
  - Las fuentes libres aseguran compatibilidad sin costo.
  - Se mantiene una apariencia premium.
- **Negativas:**
  - Requiere un mantenimiento estricto de los tokens CSS para asegurar que no se filtren estilos específicos de un cliente hacia el tema base.
