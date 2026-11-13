# @blingcompany/bling-ui

Sistema visual común del ecosistema Bling. Es la **fuente de verdad** del tema
(antes se copiaba desde el repo `bling` con `theme:sync`) y de los componentes
CSS que nacieron en Bling Contable.

| Pieza | Qué es |
|---|---|
| `css/tema.css` | Los 6 temas del ecosistema (corporate, light, dark, daltonico, horizon, amoled) como variables `--nc-*` / `--bling-*` sobre la clase del `<html>` |
| `css/tokens.css` | Roles derivados (rampa neutra `--rama-*`, `--color-ink/surface/line/strong…`, semánticos `--color-success-*`…), medidas (`--esp-*`, `--radio-*`, `--texto-*`) y el acento |
| `css/componentes.css` | `.tarjeta`, `.boton-*`, `.insignia-*`, `.campo`, `.selector`, `.pestana(s)`, `.cifra`, `.rotulo-mayus`, `.item-menu`, `.modal`, `.barra-lateral` y `.menu-flotante`, foco visible con teclado |
| `css/fuentes.css` + `fuentes/` | Obel Mono (cifras y rótulos), servida desde el paquete |
| `tailwind/preset.cjs` | Preset para **Tailwind 3**: roles como utilidades (`bg-surface`, `text-ink`, `border-line`, `bg-strong`…), grises y familias de color que siguen al tema, escala del sistema |
| `tailwind/v4.css` | Lo mismo para **Tailwind 4** (`@theme inline`) |
| `colors.cjs` | Paleta institucional `BlingColors` (`bling-*`, `nc-*`); antes en `internal/packages/ui` |
| `assets/logos/` | `BlingBellNoBg.png` y los logos `BlingLogoBlack/White.svg` |

## Instalación

Repo público. Se instala como tarball del tag (sin git ni token, anda igual en
los builds de Cloudflare):

```bash
npm install "@blingcompany/bling-ui@https://codeload.github.com/services-blingcompany/bling-ui/tar.gz/refs/tags/v0.2.0"
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

## Barra lateral

La navegación de las apps del ecosistema. Clases CSS, así sirve igual en
React, en HTML o en cualquier framework; cada app pone sus enlaces:

```html
<aside class="barra-lateral" data-compacta="false">
  <div class="barra-lateral-marca"><!-- logo y botón para plegar --></div>
  <nav class="barra-lateral-nav sidebar-scroll">
    <div class="barra-lateral-grupo">
      <p class="barra-lateral-titulo">Cuenta</p>
      <a class="barra-lateral-item" href="/perfil" aria-current="page">
        <svg><!-- ícono de 16 px --></svg>
        <span class="barra-lateral-texto">Mi perfil</span>
      </a>
    </div>
  </nav>
  <div class="barra-lateral-pie">
    <button class="barra-lateral-cuenta" aria-haspopup="menu"><!-- avatar, nombre, email --></button>
  </div>
</aside>
```

- `aria-current="page"` marca la sección activa.
- `data-compacta="true"` la pliega a 64 px: quedan los íconos y se ocultan
  `.barra-lateral-texto`, `.barra-lateral-titulo` y `.barra-lateral-ocultable`,
  así que cada ítem lleva `title` o `aria-label`.
- El menú de la cuenta va en `.menu-flotante` con filas `.item-menu`.
- Fondo blanco en el tema claro (`--nc-bg-100`); el alto lo da el contenedor.

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
