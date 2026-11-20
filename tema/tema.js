/**
 * Temas de Bling en JavaScript: la misma lista que css/tema.css y una sola
 * forma de aplicarlos y recordarlos en todas las apps.
 *
 *   import { aplicarTema, temaGuardado, guardarTema } from '@blingcompany/bling-ui/tema';
 *   aplicarTema(temaGuardado() ?? 'light');
 *
 * El tema se aplica como clase en <html> (lo que lee css/tema.css) y se guarda
 * en localStorage['bling-theme'] (compartido por las apps del mismo dominio).
 */

/** Los 6 temas oficiales, en el orden en que se muestran. */
export const TEMAS = [
  { id: 'light', nombre: 'Claro', detalle: 'Fondo blanco, ideal de día', claro: true, muestra: { fondo: '#f8f9fa', superficie: '#ffffff', acento: '#3b82f6', texto: '#0b0c0d' } },
  { id: 'dark', nombre: 'Oscuro', detalle: 'Gris oscuro, descansa la vista', claro: false, muestra: { fondo: '#0a0b0d', superficie: '#111317', acento: '#4d7fe0', texto: '#ffffff' } },
  { id: 'amoled', nombre: 'AMOLED', detalle: 'Negro puro, ahorra batería', claro: false, muestra: { fondo: '#000000', superficie: '#0a0a0a', acento: '#4d7fe0', texto: '#ffffff' } },
  { id: 'corporate', nombre: 'Corporate', detalle: 'Oscuro cálido con verde esmeralda', claro: false, muestra: { fondo: '#0c0d0f', superficie: '#151618', acento: '#10b981', texto: '#ffffff' } },
  { id: 'horizon', nombre: 'Horizon', detalle: 'El de la web de Bling', claro: false, muestra: { fondo: '#020305', superficie: '#05080f', acento: '#4a5a74', texto: '#ffffff' } },
  { id: 'daltonico', nombre: 'Daltónico', detalle: 'Colores seguros para daltonismo', claro: false, muestra: { fondo: '#0a1628', superficie: '#0f1f38', acento: '#0077bb', texto: '#ffffff' } },
];

export const IDS_TEMAS = TEMAS.map((t) => t.id);
export const CLAVE_GUARDADO = 'bling-theme';

/** Normaliza un valor guardado (incluye 'black', el nombre viejo de AMOLED). */
export function normalizarTema(valor) {
  if (!valor) return null;
  if (valor === 'black') return 'amoled';
  if (valor === 'system' || IDS_TEMAS.includes(valor)) return valor;
  return null;
}

/** 'system' → 'light' o 'dark' según el equipo. */
export function resolverTema(tema) {
  if (tema !== 'system') return tema;
  const oscuro = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  return oscuro ? 'dark' : 'light';
}

export const esTemaClaro = (tema) => TEMAS.find((t) => t.id === resolverTema(tema))?.claro ?? false;

/** Pone la clase del tema en <html> (y color-scheme para los controles nativos). */
export function aplicarTema(tema, html = typeof document !== 'undefined' ? document.documentElement : null) {
  if (!html) return;
  const resuelto = resolverTema(normalizarTema(tema) ?? 'light');
  html.classList.remove('black', ...IDS_TEMAS);
  html.classList.add(resuelto);
  html.style.colorScheme = esTemaClaro(resuelto) ? 'light' : 'dark';
}

export function temaGuardado() {
  try {
    return normalizarTema(localStorage.getItem(CLAVE_GUARDADO));
  } catch {
    return null;
  }
}

export function guardarTema(tema) {
  try {
    localStorage.setItem(CLAVE_GUARDADO, tema);
  } catch {
    /* sin almacenamiento: sólo esta pestaña */
  }
}

/**
 * Script para el <head>, ANTES de que pinte la página: aplica el tema guardado
 * y evita el destello del tema equivocado al cargar.
 *   <script dangerouslySetInnerHTML={{ __html: scriptTemaInicial('light') }} />
 */
export function scriptTemaInicial(porDefecto = 'light') {
  return `(function(){try{var t=localStorage.getItem('${CLAVE_GUARDADO}');if(t==='black')t='amoled';var ids=${JSON.stringify(IDS_TEMAS)};if(t!=='system'&&ids.indexOf(t)<0)t=null;t=t||'${porDefecto}';if(t==='system')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';var h=document.documentElement;ids.forEach(function(i){h.classList.remove(i)});h.classList.add(t);h.style.colorScheme=t==='light'?'light':'dark';}catch(e){}})();`;
}
