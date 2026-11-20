#!/usr/bin/env node
/**
 * Genera los íconos de todas las apps desde UNA fuente: marca/marca.json +
 * marca/campana.png. Salida en marca/iconos/ (se commitea; las apps la copian
 * con scripts/instalar-marca.mjs).
 *
 *   npm run marca
 *
 * Para un rebrand: cambiá la campana o los colores en marca.json, corré esto,
 * subí la versión de bling-ui y actualizá el tag en cada app.
 *
 * Ícono: campana sobre un cuadrado oscuro redondeado (el del launcher), que se
 * lee bien en 16 px. Requiere las devDependencies (@resvg/resvg-js, png-to-ico).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import pngToIco from 'png-to-ico';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const marca = JSON.parse(readFileSync(join(raiz, 'marca', 'marca.json'), 'utf8'));
const salida = join(raiz, 'marca', 'iconos');
mkdirSync(salida, { recursive: true });

const campana = 'data:image/png;base64,' + readFileSync(join(raiz, 'marca', marca.campana)).toString('base64');

/** Cuadrado redondeado con la campana; `margen` en unidades de 64. */
const svgIcono = (margen = 7, redondeo = 14) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${redondeo}" fill="${marca.fondoIcono}"/>
  <rect x="0.5" y="0.5" width="63" height="63" rx="${redondeo - 0.5}" fill="none" stroke="#ffffff" stroke-opacity="0.08"/>
  <image href="${campana}" x="${margen}" y="${margen}" width="${64 - 2 * margen}" height="${64 - 2 * margen}"/>
</svg>`;

const png = (svg, ancho) => new Resvg(svg, { fitTo: { mode: 'width', value: ancho } }).render().asPng();

const archivos = {
  'favicon-16x16.png': png(svgIcono(5, 12), 16),
  'favicon-32x32.png': png(svgIcono(5, 12), 32),
  'favicon-96x96.png': png(svgIcono(), 96),
  'apple-touch-icon.png': png(svgIcono(), 180),
  'icon-192.png': png(svgIcono(), 192),
  'icon-512.png': png(svgIcono(), 512),
  // Ícono maskable (Android): más margen para el recorte circular.
  'icon-512-maskable.png': png(svgIcono(12, 0), 512),
};
for (const [nombre, datos] of Object.entries(archivos)) writeFileSync(join(salida, nombre), datos);

writeFileSync(join(salida, 'favicon.ico'), await pngToIco([archivos['favicon-16x16.png'], archivos['favicon-32x32.png'], png(svgIcono(), 48)]));
// SVG para navegadores modernos, con la campana reducida a 256 px (la fuente
// pesa >100 KB y el favicon no tiene por qué).
const campanaChica = 'data:image/png;base64,' + png(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><image href="${campana}" width="64" height="64"/></svg>`,
  256
).toString('base64');
writeFileSync(join(salida, 'favicon.svg'), svgIcono().replace(campana, campanaChica));

writeFileSync(
  join(salida, 'site.webmanifest'),
  JSON.stringify(
    {
      name: marca.nombre,
      short_name: marca.nombreCorto,
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        { src: '/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      ],
      theme_color: marca.colorTema,
      background_color: marca.colorTema,
      display: 'standalone',
    },
    null,
    2
  ) + '\n'
);

console.log(`Íconos de ${marca.nombre} generados en marca/iconos/ (${Object.keys(archivos).length + 3} archivos).`);

// Logo para el componente <Logo/>: las formas blancas pasan a currentColor (el
// texto del tema) y las de color de marca a var(--nc-brand).
const logo = readFileSync(join(raiz, 'marca', marca.logo), 'utf8');
const viewBox = logo.match(/viewBox="([^"]+)"/)[1];
const cuerpo = logo
  .replace(/<\?xml[^>]*>/, '')
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/<defs>[\s\S]*?<\/defs>/, '')
  .replace(/class="d"|fill="#fff(fff)?"/gi, 'fill="currentColor"')
  .replace(/class="e"|fill="#fc0"|fill="#ffcc00"/gi, 'style="fill:var(--nc-brand,#fc0)"')
  .replace(/\s*\n\s*/g, '');
writeFileSync(
  join(raiz, 'react-src', 'logoTrazos.js'),
  `// Generado por scripts/generar-marca.mjs desde marca/${marca.logo}. No editar a mano.\nexport const VIEWBOX = ${JSON.stringify(viewBox)};\nexport const LOGO_SVG = ${JSON.stringify(cuerpo)};\n`
);
console.log('Logo para React regenerado (react-src/logoTrazos.js).');
