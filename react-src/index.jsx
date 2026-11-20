/**
 * Componentes React de la marca Bling, iguales en todas las apps.
 * Usan las clases de css/componentes.css (.modal, .velo, .campo, .boton-*,
 * .cargador-*), así que siguen el tema activo sin configurar nada.
 *
 *   import { Logo, Cargador, PantallaDeCarga, ReportarProblema, crearClienteReportes } from '@blingcompany/bling-ui/react';
 *
 * Se compila a react/index.js con `npm run build:react` (React queda externo).
 */
import { useEffect, useId, useRef, useState } from 'react';
import { LOGO_SVG, VIEWBOX } from './logoTrazos.js';
import marca from '../marca/marca.json';

/* ── Logo ─────────────────────────────────────────────────────────────── */

/** Logo de Bling: el texto toma el color del texto y la campana el de marca. */
export function Logo({ alto = 28, titulo = marca.nombre, className, style }) {
  const [, , w, h] = VIEWBOX.split(' ').map(Number);
  return (
    <svg
      viewBox={VIEWBOX}
      height={alto}
      width={(alto * w) / h}
      role="img"
      aria-label={titulo}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: `<title>${titulo}</title>${LOGO_SVG}` }}
    />
  );
}

/* ── Cargadores ───────────────────────────────────────────────────────── */

const HIJOS = { rayas: 12, barras: 5, puntos: 3, onda: 2, anillo: 0, linea: 0 };

/** Cargador de la marca. variante: rayas | barras | puntos | anillo | onda | linea. */
export function Cargador({ variante = 'rayas', tam = 'md', deMarca = false, etiqueta = 'Cargando', className = '' }) {
  const clases = ['cargador', `cargador-${variante}`, tam === 'sm' && 'cargador-sm', tam === 'lg' && 'cargador-lg', deMarca && 'cargador-marca', className]
    .filter(Boolean)
    .join(' ');
  return (
    <span className={clases} role="status" aria-label={etiqueta}>
      {Array.from({ length: HIJOS[variante] ?? 0 }, (_, i) => (
        <i key={i} />
      ))}
    </span>
  );
}

/** Pantalla completa de espera: logo + cargador, centrados en el fondo del tema. */
export function PantallaDeCarga({ mensaje, variante = 'rayas' }) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, background: 'var(--color-bg)', color: 'var(--color-ink)' }}
    >
      <Logo alto={36} />
      <Cargador variante={variante} tam="lg" deMarca etiqueta={mensaje || 'Cargando'} />
      {mensaje ? <p style={{ fontSize: 14, color: 'var(--color-muted)', margin: 0 }}>{mensaje}</p> : null}
    </div>
  );
}

/* ── Reportes ─────────────────────────────────────────────────────────── */

const TIPOS = [
  { id: 'bug', nombre: 'Algo falla' },
  { id: 'suggestion', nombre: 'Sugerencia' },
  { id: 'other', nombre: 'Otro' },
];
const MAX_IMAGEN = 5 * 1024 * 1024;
const FORMATOS = ['image/jpeg', 'image/png', 'image/webp'];

/** Datos del entorno que ayudan a reproducir el problema (sin datos personales). */
export function metaDelEntorno(app) {
  if (typeof window === 'undefined') return { app };
  const ua = navigator.userAgent;
  const navegador = /Edg\//.test(ua) ? 'Edge' : /OPR\/|Opera/.test(ua) ? 'Opera' : /Firefox\//.test(ua) ? 'Firefox' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : 'Otro';
  const sistema = /Android/.test(ua) ? 'Android' : /iPhone|iPad/.test(ua) ? 'iOS' : /Win/.test(ua) ? 'Windows' : /Mac/.test(ua) ? 'macOS' : /Linux/.test(ua) ? 'Linux' : 'Otro';
  const html = document.documentElement;
  return {
    app,
    route: window.location.pathname,
    browser: navegador,
    os: sistema,
    resolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    theme: ['light', 'dark', 'amoled', 'corporate', 'horizon', 'daltonico'].find((t) => html.classList.contains(t)) || 'desconocido',
    language: navigator.language,
    user_agent: ua,
    timestamp: new Date().toISOString(),
  };
}

async function errorDeRespuesta(res, porDefecto) {
  if (res.status === 429) return 'Enviaste varios reportes seguidos. Esperá un minuto y probá de nuevo.';
  try {
    const cuerpo = await res.json();
    if (typeof cuerpo.detail === 'string') return cuerpo.detail;
  } catch {
    /* sin cuerpo JSON */
  }
  return porDefecto;
}

/**
 * Cliente de la API de reportes. `apiBase` es el origen del backend o '' si la
 * app lo expone en /api por proxy. Manda la cookie de sesión si la hay.
 */
export function crearClienteReportes(apiBase = '') {
  const base = apiBase.replace(/\/$/, '');
  return {
    async subirImagen(archivo) {
      const datos = new FormData();
      datos.append('file', archivo);
      const res = await fetch(`${base}/api/v1/reports/upload-image`, { method: 'POST', body: datos, credentials: 'include' });
      if (!res.ok) throw new Error(await errorDeRespuesta(res, 'No pudimos subir la imagen.'));
      return (await res.json()).url;
    },
    async enviar(reporte) {
      const res = await fetch(`${base}/api/v1/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reporte),
        credentials: 'include',
      });
      if (!res.ok) throw new Error(await errorDeRespuesta(res, 'No pudimos enviar el reporte. Probá de nuevo en un rato.'));
      return res.json().catch(() => ({}));
    },
  };
}

/**
 * Modal para reportar un problema o mandar una sugerencia, el mismo en todas
 * las apps. Mínimo: <ReportarProblema abierto={a} onCerrar={c} app="dashboard" cliente={crearClienteReportes(API)} />
 * `pedirEmail` muestra el campo de correo (para quien no inició sesión).
 */
export function ReportarProblema({ abierto, onCerrar, app, cliente, tipoInicial = 'bug', pedirEmail = false, emailInicial = '' }) {
  const id = useId();
  const [tipo, setTipo] = useState(tipoInicial);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [email, setEmail] = useState(emailInicial);
  const [imagen, setImagen] = useState(null);
  const [vista, setVista] = useState(null);
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const archivoRef = useRef(null);
  const primerCampo = useRef(null);

  useEffect(() => {
    if (!abierto) return undefined;
    const alTeclear = (e) => e.key === 'Escape' && !enviando && cerrar();
    document.addEventListener('keydown', alTeclear);
    const t = setTimeout(() => primerCampo.current?.focus(), 30);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      clearTimeout(t);
    };
  });

  useEffect(() => () => vista && URL.revokeObjectURL(vista), [vista]);

  if (!abierto) return null;

  function reiniciar() {
    setTipo(tipoInicial);
    setTitulo('');
    setDescripcion('');
    setImagen(null);
    setVista(null);
    setError('');
    setEnviado(false);
  }

  function cerrar() {
    reiniciar();
    onCerrar();
  }

  function elegirImagen(e) {
    const archivo = e.target.files?.[0];
    e.target.value = '';
    if (!archivo) return;
    if (!FORMATOS.includes(archivo.type)) return setError('La imagen tiene que ser JPG, PNG o WebP.');
    if (archivo.size > MAX_IMAGEN) return setError('La imagen no puede pasar de 5 MB.');
    setError('');
    setImagen(archivo);
    setVista(URL.createObjectURL(archivo));
  }

  const tituloOk = titulo.trim().length >= 5;
  const descripcionOk = descripcion.trim().length >= 10;
  const emailOk = !pedirEmail || !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const listo = tituloOk && descripcionOk && emailOk && !enviando;

  async function enviar(e) {
    e.preventDefault();
    if (!listo) return;
    setEnviando(true);
    setError('');
    try {
      const evidencias = imagen ? [await cliente.subirImagen(imagen)] : undefined;
      await cliente.enviar({
        type: tipo,
        title: titulo.trim(),
        description: descripcion.trim(),
        email: pedirEmail && email.trim() ? email.trim() : undefined,
        evidence_urls: evidencias,
        meta: metaDelEntorno(app),
      });
      setEnviado(true);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : 'No pudimos enviar el reporte.');
    } finally {
      setEnviando(false);
    }
  }

  const etiqueta = { display: 'block', fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--color-ink)' };
  const ayuda = { fontSize: 12, color: 'var(--color-muted)', marginTop: 4 };

  return (
    <div
      className="velo"
      style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onMouseDown={(e) => e.target === e.currentTarget && !enviando && cerrar()}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-t`}
        style={{ boxSizing: 'border-box', width: '100%', maxWidth: 480, maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto', padding: 20, color: 'var(--color-ink)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
          <h2 id={`${id}-t`} style={{ margin: 0, fontSize: 17, fontWeight: 600 }}>
            {enviado ? '¡Gracias!' : 'Reportar un problema'}
          </h2>
          <button type="button" className="boton boton-fantasma boton-icono boton-compacto" onClick={cerrar} disabled={enviando} aria-label="Cerrar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {enviado ? (
          <div>
            <p style={{ margin: '0 0 16px', fontSize: 14 }}>
              Recibimos tu reporte. Lo revisa el equipo y, si dejaste un correo o tenés sesión iniciada, te escribimos cuando haya novedades.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" className="boton boton-secundario" onClick={reiniciar}>
                Enviar otro
              </button>
              <button type="button" className="boton boton-primario" onClick={cerrar}>
                Listo
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <div role="radiogroup" aria-label="Tipo de reporte" style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={tipo === t.id}
                  className={`boton boton-compacto ${tipo === t.id ? 'boton-primario' : 'boton-secundario'}`}
                  style={{ flex: 1 }}
                  onClick={() => setTipo(t.id)}
                >
                  {t.nombre}
                </button>
              ))}
            </div>

            <div style={{ marginBottom: 12 }}>
              <label htmlFor={`${id}-titulo`} style={etiqueta}>
                Título
              </label>
              <input
                ref={primerCampo}
                id={`${id}-titulo`}
                className="campo"
                style={{ width: '100%', boxSizing: 'border-box' }}
                value={titulo}
                maxLength={100}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder={tipo === 'suggestion' ? 'Ej.: poder exportar a Excel' : 'Ej.: no me llega el código de verificación'}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label htmlFor={`${id}-desc`} style={etiqueta}>
                Detalle
              </label>
              <textarea
                id={`${id}-desc`}
                className="campo"
                style={{ width: '100%', boxSizing: 'border-box', minHeight: 110, resize: 'vertical', fontFamily: 'inherit' }}
                value={descripcion}
                maxLength={1000}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder={tipo === 'suggestion' ? 'Qué te gustaría y para qué lo usarías' : 'Qué hiciste, qué esperabas y qué pasó'}
              />
              <p style={ayuda}>{descripcion.length}/1000</p>
            </div>

            <div style={{ marginBottom: 12 }}>
              <span style={etiqueta}>Captura (opcional)</span>
              {vista ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={vista} alt="Captura adjunta" style={{ width: 64, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid var(--nc-line)' }} />
                  <span style={{ fontSize: 13, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{imagen?.name}</span>
                  <button
                    type="button"
                    className="boton boton-fantasma boton-compacto"
                    onClick={() => {
                      setImagen(null);
                      setVista(null);
                    }}
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <button type="button" className="boton boton-secundario boton-compacto" onClick={() => archivoRef.current?.click()}>
                  Adjuntar imagen
                </button>
              )}
              <input ref={archivoRef} type="file" accept={FORMATOS.join(',')} hidden onChange={elegirImagen} />
              <p style={ayuda}>JPG, PNG o WebP, hasta 5 MB.</p>
            </div>

            {pedirEmail ? (
              <div style={{ marginBottom: 12 }}>
                <label htmlFor={`${id}-email`} style={etiqueta}>
                  Correo para responderte (opcional)
                </label>
                <input id={`${id}-email`} type="email" className="campo" style={{ width: '100%', boxSizing: 'border-box' }} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@correo.com" />
              </div>
            ) : null}

            {error ? (
              <p role="alert" style={{ fontSize: 13, margin: '0 0 12px', padding: '8px 10px', borderRadius: 8, color: 'var(--bling-danger)', background: 'var(--bling-danger-bg)', border: '1px solid var(--bling-danger-border)' }}>
                {error}
              </p>
            ) : null}

            <p style={{ ...ayuda, marginBottom: 14 }}>Mandamos también la página, el navegador y el tema que usás, para poder reproducirlo.</p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" className="boton boton-secundario" onClick={cerrar} disabled={enviando}>
                Cancelar
              </button>
              <button type="submit" className="boton boton-primario" disabled={!listo}>
                {enviando ? <Cargador variante="anillo" tam="sm" etiqueta="Enviando" /> : null}
                {enviando ? 'Enviando…' : 'Enviar'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
