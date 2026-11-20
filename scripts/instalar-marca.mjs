#!/usr/bin/env node
/**
 * Copia los íconos de la marca (marca/iconos/) a la carpeta pública de una app.
 * Así todas las apps usan los mismos favicons y un rebrand es: actualizar
 * bling-ui y volver a correr esto.
 *
 *   node node_modules/@blingcompany/bling-ui/scripts/instalar-marca.mjs public
 *   node node_modules/@blingcompany/bling-ui/scripts/instalar-marca.mjs public --comprobar
 *
 * --comprobar no escribe: sale con código 1 si algún ícono de la app difiere
 * de los de esta versión de bling-ui (para correrlo en las pruebas o el CI).
 *
 * Etiquetas para el <head> (Next: metadata.icons; HTML: estas líneas):
 *   <link rel="icon" href="/favicon.ico" sizes="any">
 *   <link rel="icon" href="/favicon.svg" type="image/svg+xml">
 *   <link rel="apple-touch-icon" href="/apple-touch-icon.png">
 *   <link rel="manifest" href="/site.webmanifest">
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const origen = join(dirname(fileURLToPath(import.meta.url)), '..', 'marca', 'iconos');
const [destinoArg, bandera] = process.argv.slice(2);
if (!destinoArg) {
  console.error('Uso: instalar-marca.mjs <carpeta-publica> [--comprobar]');
  process.exit(2);
}
const destino = resolve(destinoArg);
const comprobar = bandera === '--comprobar';
const archivos = readdirSync(origen);
// En Windows git puede pasar los de texto a CRLF al hacer checkout: se comparan
// sin los \r para que eso no cuente como ícono desactualizado.
const TEXTO = /\.(svg|webmanifest)$/;
const contenido = (ruta, f) => (TEXTO.test(f) ? Buffer.from(readFileSync(ruta, 'utf8').replace(/\r\n/g, '\n')) : readFileSync(ruta));

if (comprobar) {
  const distintos = archivos.filter((f) => {
    const enApp = join(destino, f);
    return !existsSync(enApp) || !contenido(enApp, f).equals(contenido(join(origen, f), f));
  });
  if (distintos.length) {
    console.error(`Íconos desactualizados en ${destinoArg}: ${distintos.join(', ')}. Corré instalar-marca.mjs ${destinoArg}.`);
    process.exit(1);
  }
  console.log(`Íconos al día en ${destinoArg}.`);
} else {
  mkdirSync(destino, { recursive: true });
  for (const f of archivos) copyFileSync(join(origen, f), join(destino, f));
  console.log(`${archivos.length} íconos copiados a ${destinoArg}.`);
}
