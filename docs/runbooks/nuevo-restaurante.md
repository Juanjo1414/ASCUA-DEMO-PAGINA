# Runbook: Creación de un Nuevo Restaurante para la Demo

Este runbook detalla los pasos para agregar un nuevo restaurante a la demo comercial de ASCUA.
La demo utiliza una base de datos estática aislada por carpetas para asegurar portabilidad y costo cero.

## Pasos

### 1. Preparar la carpeta del restaurante

1. Copia la carpeta `content/restaurants/_plantilla/` y renómbrala al slug del nuevo restaurante.
2. El slug **debe** cumplir la regla: `nombre-kebab-case-XXXX` (donde XXXX son 4 caracteres alfanuméricos aleatorios).
   - Ejemplo: `el-cielo-9m1x`

### 2. Configurar `restaurant.json`

Edita el archivo `restaurant.json` en la nueva carpeta con los datos del restaurante:

- **`slug`**: Debe coincidir exactamente con el nombre de la carpeta.
- **`expira`**: Configura la fecha límite de la demo comercial (ej: un mes después de la creación).
- **`autorizacion`**: Rellena con la fecha y el medio por el cual el dueño autorizó la demo. **(Legalmente obligatorio)**.
- **`tema`**: Configura el color principal, tipografía (`moderna` o `editorial`) y logo.
- **`contacto`**: Ingresa el WhatsApp real al cual llegarán los pedidos.

### 3. Configurar Categorías y Platos

- Define las categorías y platos de la carta.
- **Importante**: Para cada plato, la foto debe estar en formato WebP optimizado (≤ 300 KB).
- Si el plato tiene modelo AR:
  - Genera el modelo siguiendo el [Runbook de Producción de Modelos 3D](../AR/produccion-modelo-3d.md).
  - Copia los archivos `.glb`, `.usdz` y `poster.webp` a la subcarpeta `assets/platos/<id-plato>/`.
  - Asegúrate de indicar `escalaRealCm` (el tamaño real del plato físico para que AR lo muestre exacto).
  - Marca `aprobado: true`.

### 4. Validar Localmente

Ejecuta el pipeline de validación para asegurarte de que el contenido cumple todas las reglas (esquema, aislamiento, pesos, etc.):

```bash
npm run verify
```

### 5. Pruebas y Despliegue

- Inicia el servidor de desarrollo (`npm run dev`) y navega a `/r/<slug>`.
- Prueba el botón de WhatsApp y los modelos AR.
- Una vez verificado, crea un commit (ej: `feat(P-XXX): agregar restaurante el-cielo-9m1x`) y súbelo a la rama `dev/Juanjo`.
- Cuando pases el CI y se apruebe el PR, el restaurante estará disponible automáticamente en producción.
