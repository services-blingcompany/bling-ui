const m = await import('../tema/tema.js');

function correr(cookie, ls) {
  const cls = new Set();
  globalThis.document = { cookie, documentElement: { classList: { remove: (...a) => a.forEach((x) => cls.delete(x)), add: (x) => cls.add(x) }, style: {} } };
  globalThis.localStorage = { getItem: () => ls };
  globalThis.matchMedia = () => ({ matches: false });
  new Function(m.scriptTemaInicial('light'))();
  return [...cls].join(',');
}

const casos = [
  ['a=1; bling-theme=corporate', 'light', 'corporate'],
  ['bling-theme=amoled', null, 'amoled'],
  ['', 'dark', 'dark'],
  ['', null, 'light'],
  ['bling-theme=raro', 'amoled', 'light'],
  ['xbling-theme=dark', null, 'light'],
];
let mal = 0;
for (const [c, l, esperado] of casos) {
  const r = correr(c, l);
  if (r !== esperado) { mal++; console.log('MAL', c, l, r, esperado); }
}

// temaGuardado: cookie primero
globalThis.document = { cookie: 'x=1; bling-theme=horizon' };
globalThis.localStorage = { getItem: () => 'light' };
if (m.temaGuardado() !== 'horizon') { mal++; console.log('MAL temaGuardado', m.temaGuardado()); }
globalThis.document = { cookie: '' };
if (m.temaGuardado() !== 'light') { mal++; console.log('MAL respaldo'); }

console.log(mal ? `${mal} fallas` : 'tema: ok');
process.exit(mal ? 1 : 0);
