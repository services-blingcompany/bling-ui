#!/usr/bin/env node
// Compila la parte React de la demo (demo/demo-react.jsx → demo/demo-react.js) con React adentro.
// Con la API de esbuild y no por consola, así el define no depende de las comillas de cada shell.
import { build } from 'esbuild';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
await build({
  entryPoints: [join(raiz, 'demo/demo-react.jsx')],
  outfile: join(raiz, 'demo/demo-react.js'),
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'warning',
});
console.log('demo/demo-react.js listo');
