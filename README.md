# @blingcompany/bling-ui

Sistema visual común del ecosistema Bling. Es la **fuente de verdad** del tema
(antes se copiaba desde el repo `bling` con `theme:sync`) y de los componentes
CSS que nacieron en Bling Contable.

| Pieza | Qué es |
|---|---|
| `css/tema.css` | Los 6 temas del ecosistema (corporate, light, dark, daltonico, horizon, amoled) como variables `--nc-*` / `--bling-*` sobre la clase del `<html>` |
| `css/tokens.css` | Roles derivados (rampa neutra `--rama-*`, `--color-ink/surface/line/strong…`, semánticos `--color-success-*`…), medidas (`--esp-*`, `--radio-*`, `--texto-*`) y el acento |
| `css/componentes.css` | `.tarjeta`, `.boton-*`, `.insignia-*`, `.campo`, `.selector`, `.pestana(s)`, `.cifra`, `.rotulo-mayus`, `.item-menu`, `.modal`, foco visible con teclado |
| `css/fuentes.css` + `fuentes/` | Obel Mono (cifras y rótulos), servida desde el paquete |
| `tailwind/preset.cjs` | Preset para **Tailwind 3**: roles como utilidades (`bg-surface`, `text-ink`, `border-line`, `bg-strong`…), grises y familias de color que siguen al tema, escala del sistema |
| `tailwind/v4.css` | Lo mismo para **Tailwind 4** (`@theme inline`) |
| `colors.cjs` | Paleta institucional `BlingColors` (`bling-*`, `nc-*`); antes en `internal/packages/ui` |
| `assets/logos/` | `BlingBellNoBg.png` y los logos `BlingLogoBlack/White.svg` |

## Instalación

Dependencia de git con versión fija (sin registro de paquetes):

```bash
npm install github:services-blingcompany/bling-ui#v0.1.0
```

### Tailwind 3 (dashboard, shop, internal)

```ts
// tailwind.config.ts
import blingUi from '@blingcompany/bling-ui/tailwind/preset';
export default { presets: [blingUi], content: ['./src/**/*.{ts,tsx}'] };
```

```ts
// layout raíz — ANTES que el CSS con @tailwind utilities
import '@blingcompany/bling-ui/index.css';
import '../styles/globals.css';
```

### Tailwind 4 (contable)

```css
@import "tailwindcss";
@import "@blingcompany/bling-ui/index.css";
@import "@blingcompany/bling-ui/tailwind/v4.css";
```

### Repos que no pueden sumar dependencias (contable)

```bash
node scripts/vendorizar.mjs ../contable/src/styles              # copia en src/styles/bling-ui/
node scripts/vendorizar.mjs ../contable/src/styles --comprobar  # falla si la copia quedó vieja
```

## Reglas del sistema

- Bordes de un píxel en vez de sombras; las sombras, sólo en lo que flota
  (menús, modales).
- Sin vidrio esmerilado ni degradés decorativos.
- Las paletas institucionales no se tocan; los colores se piden por rol
  (`text-ink`, `bg-surface`, `text-success-soft`), nunca con hex sueltos.
- Títulos en tipo oración; textos en castellano rioplatense.

## Versionado

Cada cambio publicado lleva un tag `vX.Y.Z` y los repos fijan esa versión.
Verificar antes de etiquetar:

```bash
npm run verificar
```
