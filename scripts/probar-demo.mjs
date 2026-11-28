#!/usr/bin/env node
/**
 * La demo sólo usa clases que existen: cada clase de demo/index.html y de
 * demo.js (salvo las propias de la página, `demo-*`, y la del tema en <html>)
 * tiene que estar definida en css/componentes.css o css/controles.css. Así la demo no muestra un
 * componente que el paquete ya no trae.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = ['css/componentes.css', 'css/controles.css', 'css/datos.css'].map((f) => readFileSync(join(raiz, f), 'utf8')).join('\n');
const fuentes = ['demo/index.html', 'demo/demo.js'].map((f) => readFileSync(join(raiz, f), 'utf8')).join('\n');

const TEMAS = new Set(['light', 'dark', 'amoled', 'corporate', 'horizon', 'daltonico']);
const usadas = new Set();
for (const m of fuentes.matchAll(/class(?:Name)?\s*=\s*["']([^"']+)["']/g)) {
  for (const c of m[1].split(/\s+/)) if (c) usadas.add(c);
}

const faltan = [...usadas].filter((c) => {
  if (c.startsWith('demo-') || TEMAS.has(c)) return false;
  const escapada = c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return !new RegExp(`\\.${escapada}(?![\\w-])`).test(css);
});

if (faltan.length) {
  console.error(`demo: clases que no existen en el paquete: ${faltan.join(', ')}`);
  process.exit(1);
}
console.log(`demo: ok (${usadas.size} clases)`);
