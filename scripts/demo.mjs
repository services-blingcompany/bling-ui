#!/usr/bin/env node
/**
 * Demo local de bling-ui: sirve la raíz del paquete y abre demo/index.html.
 *
 *   npm run demo          → http://localhost:4173/demo/
 *   PUERTO=5000 npm run demo
 *
 * Sin dependencias: sólo Node. Escucha en 127.0.0.1 (no se ve desde la red).
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = resolve(fileURLToPath(new URL('..', import.meta.url)));
const PUERTO = Number(process.env.PUERTO || 4173);
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

createServer(async (req, res) => {
  let ruta = decodeURIComponent(new URL(req.url, 'http://local').pathname);
  if (ruta === '/') {
    res.writeHead(302, { Location: '/demo/' });
    return res.end();
  }
  if (ruta.endsWith('/')) ruta += 'index.html';
  const archivo = resolve(join(raiz, normalize(ruta)));
  if (!archivo.startsWith(raiz + sep)) {
    res.writeHead(403);
    return res.end();
  }
  try {
    const datos = await readFile(archivo);
    res.writeHead(200, { 'Content-Type': TIPOS[extname(archivo)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(datos);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('No existe');
  }
}).listen(PUERTO, '127.0.0.1', () => {
  console.log(`Demo de bling-ui en http://localhost:${PUERTO}/demo/`);
});
