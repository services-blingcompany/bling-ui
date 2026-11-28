# Precisión gráfica en bling-ui

Para cuando mejoremos un componente. Es la guía larga
(`BLING-UI-PERFECCION-GRAFICA.md`) llevada a los tokens y las reglas de este
paquete: lo que ya existe se usa, no se duplica.

## Reglas

1. **Se corrige en bling-ui** (`css/componentes.css`, `css/tokens.css`), nunca en cada app.
2. **Sólo tokens existentes**: espaciado `--esp-*`, texto `--texto-*` e `--interlineado-*`, radios `--radio-control` / `--radio-panel` / `--radio-pildora`, alturas `--alto-control*` y colores por rol. No sumar escalas nuevas (`--space-*`, `--radius-*`, `--font-*`).
3. **Colores en pares**: un fondo `strong*` lleva texto `on-strong*`; `surface` lleva `ink` o `muted`. Caso real: los íconos del dashboard en `text-ink` sobre `bg-strong-soft` no se veían en el tema claro.
4. **Bordes de 1 px antes que sombras**; sombras sólo en lo que flota (menús, modales).
5. **Una corrección óptica necesita**: un problema que se vea, su causa, un fallback y una captura antes/después en el tema claro y en uno oscuro.
6. **Clases en castellano** (`.boton`, `.insignia`), como el resto del paquete.

## Mejoras candidatas

### Píldoras: compensar los extremos curvos

Sirve para lo que usa `--radio-pildora`: `.insignia` (20 px de alto) y los botones `rounded-full` de Jobs. En `.boton` no hace falta: con radio de 8 px en 32 px de alto la corrección da menos de 1 px.

```css
.pildora {
  --py: 0.5em;
  --px: 0.9em;
  --r: calc(var(--py) + 0.5lh);            /* mitad del alto */
  --borde-optico: calc(var(--r) * 0.2146); /* 1 - π/4: lo que la curva le quita al rectángulo */
  border-radius: var(--r);
  padding: var(--py) calc(var(--px) + var(--borde-optico));
}
/* Ícono al inicio: queda concéntrico con la curva. */
.pildora:has(> svg:first-child) { padding-inline-start: var(--py); }
.pildora > svg:first-child { inline-size: 1lh; block-size: 1lh; }
```

Hay que compensar los dos extremos (el `padding`), no sólo el primer hijo: si no, el contenido queda corrido hacia un lado.

### Centrado vertical del texto

`.boton` usa `line-height: 1` en 32 px de alto. Probar `text-box: trim-both cap alphabetic` dentro de `@supports`, y revisarlo con Montserrat y con palabras que tengan g, j, p, q o y.

### Íconos

Son de Lucide (viewBox de 24, trazo 2): 14 px dentro de `.boton` y entre 16 y 18 px sueltos. Si uno se ve corrido, se corrige el SVG, no con `translate` en cada pantalla.

### Táctil

Los controles de 32 px (28 el compacto) son densos a propósito, porque las apps son de gestión. Si en el celular cuesta tocarlos, subir `--alto-control` a 40 px sólo con `@media (pointer: coarse)`, sin cambiar el escritorio.

## Lo que ya está (no duplicar)

- Foco visible para todo lo que se recorre con Tab, con `--nc-border-focus` (al final de `componentes.css`, fuera de las capas).
- Movimiento reducido: los cargadores se frenan en vez de apagarse. No sumar un reset global con `*` y `!important`.
- Cifras: `.cifra` con Obel Mono y `tabular-nums`.
- Transiciones de 120 ms enumerando propiedades (nunca `transition: all`).

## Lo de la guía larga que no encaja tal cual

| La guía propone | bling-ui tiene | Qué hacer |
|---|---|---|
| `line-height` sin unidad y tamaños en `rem` | px fijos con interlineado propio (11, 12, 14 y 20 px) | Respetar los tokens |
| Controles de 40 a 44 px | 32 px | Subir sólo en táctil |
| `--border-subtle` con un gris en rgb | Colores por rol (`border-line`) | Usar el rol |
| Cinco radios | Control, panel y píldora | No sumar radios |
| Transiciones de 140 ms | 120 ms | Usar 120 ms |
| Clases en inglés (`.button--pill`) | Castellano | Nombrar en castellano |

## Al terminar un cambio

`npm test` y `node scripts/verificar.mjs`, subir la versión en `package.json`, crear el tag `vX.Y.Z`, pushear main y el tag (con OK), y actualizar la URL del tag en cada app.
