#!/usr/bin/env node
/**
 * Verificaciones de bling-ui sin dependencias:
 *  - cada CSS tiene llaves y comentarios balanceados;
 *  - cada url() de las fuentes apunta a un archivo que existe;
 *  - los @import de index.css existen;
 *  - el preset de Tailwind 3 carga y trae roles, grises y familias;
 *  - las variables --color-* que usan los componentes están definidas.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
let fallas = 0;
const comprobar = (ok, texto) => {
  console.log(`${ok ? 'OK   ' : 'FALLA'} ${texto}`);
  if (!ok) fallas++;
};

const css = ['index.css', 'tailwind/v4.css', ...readdirSync(join(raiz, 'css')).map((n) => `css/${n}`)];
for (const archivo of css) {
  const texto = readFileSync(join(raiz, archivo), 'utf8');
  const sinComentarios = texto.replace(/\/\*[\s\S]*?\*\//g, '');
  const abiertos = (texto.match(/\/\*/g) || []).length;
  const cerrados = (texto.match(/\*\//g) || []).length;
  const llaves = [...sinComentarios].reduce((n, c) => n + (c === '{') - (c === '}'), 0);
  comprobar(abiertos === cerrados && llaves === 0, `${archivo}: comentarios y llaves balanceados`);
}

const fuentes = readFileSync(join(raiz, 'css/fuentes.css'), 'utf8');
for (const [, url] of fuentes.matchAll(/url\("([^"]+)"\)/g)) {
  comprobar(existsSync(join(raiz, 'css', url)), `fuente ${url} existe`);
}
for (const [, imp] of readFileSync(join(raiz, 'index.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/@import "([^"]+)"/g)) {
  comprobar(existsSync(join(raiz, imp)), `index.css importa ${imp}`);
}

const preset = require('../tailwind/preset.cjs');
const colores = preset.theme.extend.colors;
comprobar(['surface', 'ink', 'line', 'strong', 'success-soft', 'danger-fill'].every((c) => c in colores), 'preset: roles del sistema');
comprobar(colores.gray?.[900]?.includes('--rama-900') && colores.blue?.[950], 'preset: grises y familias siguen al tema');
comprobar('bling-yellow' in colores && 'nc-surface' in colores, 'preset: paleta institucional');

const tokens = readFileSync(join(raiz, 'css/tokens.css'), 'utf8');
const componentes = readFileSync(join(raiz, 'css/componentes.css'), 'utf8');
const definidas = new Set([...tokens.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const tema = readFileSync(join(raiz, 'css/tema.css'), 'utf8');
for (const m of tema.matchAll(/(--[a-z0-9-]+)\s*:/g)) definidas.add(m[1]);
// Variables locales de un componente (p. ej. --ancho-barra en .barra-lateral).
for (const m of componentes.matchAll(/(--[a-z0-9-]+)\s*:/g)) definidas.add(m[1]);
const usadas = new Set([...componentes.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]));
const faltan = [...usadas].filter((v) => !definidas.has(v));
comprobar(faltan.length === 0, `componentes: todas las variables definidas${faltan.length ? ` (faltan ${faltan.join(', ')})` : ''}`);

console.log(fallas ? `\n${fallas} comprobación(es) fallaron` : '\nbling-ui verificado');
process.exit(fallas ? 1 : 0);
