#!/usr/bin/env node
/**
 * Copia bling-ui dentro de un repo que no puede sumar dependencias (el
 * contable lo prohíbe): css/, fuentes/ y tailwind/v4.css quedan en
 * <destino>/bling-ui/, con un archivo VERSION para saber de qué versión vino.
 *
 *   node scripts/vendorizar.mjs ../contable/src/styles
 *   node scripts/vendorizar.mjs ../contable/src/styles --comprobar
 *
 * --comprobar no escribe nada: sale con código 1 si la copia difiere de esta
 * versión de bling-ui (para usarlo en las pruebas del repo destino).
 */
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [destinoArg, ...banderas] = process.argv.slice(2);
if (!destinoArg) {
  console.error('Uso: node scripts/vendorizar.mjs <carpeta destino> [--comprobar]');
  process.exit(2);
}
const destino = join(resolve(destinoArg), 'bling-ui');
const comprobar = banderas.includes('--comprobar');
const { version } = JSON.parse(readFileSync(join(raiz, 'package.json'), 'utf8'));
const PIEZAS = ['index.css', 'css', 'fuentes', 'tailwind/v4.css'];

const listar = (ruta) =>
  statSync(ruta).isDirectory()
    ? readdirSync(ruta).flatMap((n) => listar(join(ruta, n)))
    : [ruta];

if (comprobar) {
  const diferencias = [];
  for (const pieza of PIEZAS) {
    for (const origen of listar(join(raiz, pieza))) {
      const rel = relative(raiz, origen);
      const copia = join(destino, rel);
      if (!existsSync(copia) || !readFileSync(copia).equals(readFileSync(origen))) diferencias.push(rel);
    }
  }
  const versionCopia = existsSync(join(destino, 'VERSION')) ? readFileSync(join(destino, 'VERSION'), 'utf8').trim() : '(sin copia)';
  if (diferencias.length) {
    console.error(`La copia de bling-ui (${versionCopia}) difiere de ${version}: ${diferencias.join(', ')}`);
    process.exit(1);
  }
  console.log(`bling-ui ${version}: copia al día.`);
  process.exit(0);
}

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino, { recursive: true });
for (const pieza of PIEZAS) {
  mkdirSync(dirname(join(destino, pieza)), { recursive: true });
  cpSync(join(raiz, pieza), join(destino, pieza), { recursive: true });
}
writeFileSync(join(destino, 'VERSION'), `${version}\n`);
writeFileSync(
  join(destino, 'LEEME.md'),
  `# bling-ui ${version} (copia)\n\nNo editar a mano: viene de services-blingcompany/bling-ui.\nPara actualizar: \`node scripts/vendorizar.mjs <esta carpeta>/..\` desde bling-ui.\n`,
);
console.log(`bling-ui ${version} copiado en ${destino}`);
