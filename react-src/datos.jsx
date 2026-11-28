/**
 * Datos en React (0.8): GraficoLineas, GraficoBarras, Sparkline,
 * BarraSegmentada, TarjetaIndicador y Tabla. SVG propio, sin dependencias.
 * Siguen la guía de visualización: series en orden fijo (nunca recicladas),
 * un solo eje, marcas finas, leyenda con dos o más series, pista con el
 * puntero y con las flechas del teclado, y la tabla «Ver los datos».
 */
import { useEffect, useMemo, useRef, useState } from 'react';

const MAX_SERIES = 8;
/** Color de la serie i (0 en adelante). Más allá de la octava va el gris de «Otros». */
export const colorSerie = (i) => (i < MAX_SERIES ? `var(--grafica-${i + 1})` : 'var(--grafica-apagada)');

const fmt = new Intl.NumberFormat('es-UY', { maximumFractionDigits: 2 });
const fmtCompacto = new Intl.NumberFormat('es-UY', { notation: 'compact', maximumFractionDigits: 1 });
/** Número con separadores de Uruguay (1.284,5). */
export const formatoNumero = (n) => (Number.isFinite(n) ? fmt.format(n) : '—');
const formatoEje = (n, tope) => (Math.abs(tope) >= 10000 ? fmtCompacto.format(n) : fmt.format(n));
const conSigno = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${fmt.format(Math.abs(n))}`;

function pasoLindo(rango, marcas = 4) {
  const bruto = rango / marcas || 1;
  const magnitud = 10 ** Math.floor(Math.log10(bruto));
  const r = bruto / magnitud;
  const paso = r <= 1 ? 1 : r <= 2 ? 2 : r <= 2.5 ? 2.5 : r <= 5 ? 5 : 10;
  return paso * magnitud;
}
function escala(maximo, minimo = 0) {
  const piso0 = Math.min(0, minimo);
  const techo0 = maximo > piso0 ? maximo : piso0 + 1;
  const paso = pasoLindo(techo0 - piso0);
  const piso = Math.floor(piso0 / paso) * paso;
  const tope = Math.ceil(techo0 / paso) * paso;
  const marcas = [];
  for (let v = piso; v <= tope + paso / 2; v += paso) marcas.push(Number(v.toFixed(10)));
  return { piso, tope, marcas };
}

function usarAncho() {
  const ref = useRef(null);
  const [ancho, setAncho] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    setAncho(el.clientWidth);
    const obs = new ResizeObserver(([e]) => setAncho(Math.round(e.contentRect.width)));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, ancho];
}

/** Qué rótulos del eje x se muestran para que no se pisen (siempre el primero y el último). */
function indicesVisibles(categorias, espacio) {
  const n = categorias.length;
  if (!n) return [];
  const largo = Math.max(...categorias.map((c) => String(c).length)) * 6.5 + 12;
  const cada = Math.max(1, Math.ceil(largo / Math.max(espacio, 1)));
  const idx = [];
  for (let i = 0; i < n; i += cada) idx.push(i);
  if (idx[idx.length - 1] !== n - 1) {
    if (n - 1 - idx[idx.length - 1] < cada * 0.7) idx.pop();
    idx.push(n - 1);
  }
  return idx;
}

function Flecha({ abajo = false }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={abajo ? 'M12 5v14M19 12l-7 7-7-7' : 'M12 19V5M5 12l7-7 7 7'} />
    </svg>
  );
}

function Leyenda({ series, linea = false }) {
  if (series.length < 2) return null;
  return (
    <ul className="grafica-leyenda">
      {series.map((s, i) => (
        <li key={s.nombre}>
          <span className={`grafica-muestra${linea ? ' grafica-muestra-linea' : ''}`} style={{ background: colorSerie(i) }} />
          {s.nombre}
        </li>
      ))}
    </ul>
  );
}

function VerDatos({ categorias, series, formato, tituloCategoria }) {
  return (
    <details className="grafica-datos">
      <summary>Ver los datos</summary>
      <div className="tabla-contenedor">
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>{tituloCategoria}</th>
              {series.map((s) => (
                <th key={s.nombre} className="num">
                  {s.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categorias.map((c, i) => (
              <tr key={String(c)}>
                <td>{c}</td>
                {series.map((s) => (
                  <td key={s.nombre} className="num cifra">
                    {formato(s.valores[i])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

function Pista({ x, y, ancho, titulo, filas, formato, linea }) {
  const aLaDerecha = x < ancho * 0.62;
  const estilo = { top: Math.max(0, y), left: aLaDerecha ? x + 14 : undefined, right: aLaDerecha ? undefined : ancho - x + 14 };
  return (
    <div className="grafica-pista" style={estilo} role="status">
      <div className="grafica-pista-titulo">{titulo}</div>
      {filas.map((f) => (
        <div className="grafica-pista-fila" key={f.nombre}>
          <span className={`grafica-muestra${linea ? ' grafica-muestra-linea' : ''}`} style={{ background: f.color }} />
          <span>{f.nombre}</span>
          <span className="grafica-pista-valor">{formato(f.valor)}</span>
        </div>
      ))}
    </div>
  );
}

/** Mover el punto activo con el teclado (flechas, Inicio, Fin). */
function teclasActivo(e, activo, setActivo, n) {
  const mapa = { ArrowRight: 1, ArrowLeft: -1 };
  if (e.key in mapa) {
    e.preventDefault();
    setActivo(Math.min(n - 1, Math.max(0, (activo ?? (mapa[e.key] > 0 ? -1 : n)) + mapa[e.key])));
  } else if (e.key === 'Home') {
    e.preventDefault();
    setActivo(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    setActivo(n - 1);
  } else if (e.key === 'Escape') {
    setActivo(null);
  }
}

function resumen(series, categorias, formato) {
  if (!categorias.length) return 'Sin datos';
  return series
    .map((s) => `${s.nombre}: de ${formato(s.valores[0])} en ${categorias[0]} a ${formato(s.valores[s.valores.length - 1])} en ${categorias[categorias.length - 1]}`)
    .join('. ');
}

/* ── Líneas (y área) ──────────────────────────────────────────────────── */

/**
 * Evolución en el tiempo. series: [{ nombre, valores: number[] }] (un valor por categoría).
 * Con `area`, cada serie lleva un lavado del 10 %.
 */
export function GraficoLineas({
  categorias = [],
  series = [],
  alto = 220,
  area = false,
  desdeCero = true,
  formato = formatoNumero,
  titulo = 'Gráfico de líneas',
  tituloCategoria = 'Período',
  className = '',
}) {
  const [lienzo, ancho] = usarAncho();
  const [activo, setActivo] = useState(null);
  const svg = useRef(null);
  const n = categorias.length;
  const valores = series.flatMap((s) => s.valores).filter(Number.isFinite);
  const { piso, tope, marcas } = escala(valores.length ? Math.max(...valores) : 1, desdeCero || !valores.length ? 0 : Math.min(...valores));
  const izquierda = Math.max(...marcas.map((m) => formatoEje(m, tope).length)) * 6.2 + 12;
  const m = { arriba: 8, derecha: 12, abajo: 26, izquierda };
  const w = Math.max(1, ancho - m.izquierda - m.derecha);
  const h = alto - m.arriba - m.abajo;
  const x = (i) => m.izquierda + (n <= 1 ? w / 2 : (i * w) / (n - 1));
  const y = (v) => m.arriba + h - ((v - piso) / (tope - piso || 1)) * h;
  const camino = (vals) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const visibles = indicesVisibles(categorias, n > 1 ? w / (n - 1) : w);

  const alMover = (e) => {
    if (n < 1) return;
    const caja = svg.current.getBoundingClientRect();
    const i = Math.round(((e.clientX - caja.left - m.izquierda) / w) * (n - 1));
    setActivo(Math.min(n - 1, Math.max(0, i)));
  };

  return (
    <div className={`grafica ${className}`.trim()}>
      <div className="grafica-lienzo" ref={lienzo} style={{ height: alto }}>
        {ancho > 0 && (
          <svg
            ref={svg}
            width={ancho}
            height={alto}
            role="img"
            tabIndex={0}
            aria-label={`${titulo}. ${resumen(series, categorias, formato)}. Usá las flechas para recorrer los valores.`}
            onPointerMove={alMover}
            onPointerLeave={() => setActivo(null)}
            onBlur={() => setActivo(null)}
            onKeyDown={(e) => teclasActivo(e, activo, setActivo, n)}
          >
            {marcas.map((t) => (
              <g key={t}>
                <line className={t === 0 ? 'grafica-base' : 'grafica-cuadricula'} x1={m.izquierda} x2={ancho - m.derecha} y1={Math.round(y(t)) + 0.5} y2={Math.round(y(t)) + 0.5} />
                <text className="grafica-texto-eje" x={m.izquierda - 8} y={y(t)} dy="0.32em" textAnchor="end">
                  {formatoEje(t, tope)}
                </text>
              </g>
            ))}
            {visibles.map((i) => (
              <text key={i} className="grafica-texto-categoria" x={x(i)} y={alto - 6} textAnchor={n > 1 && i === 0 ? 'start' : n > 1 && i === n - 1 ? 'end' : 'middle'}>
                {categorias[i]}
              </text>
            ))}
            {area &&
              series.map((s, k) => (
                <path key={`a-${s.nombre}`} d={`${camino(s.valores)}L${x(n - 1)},${y(Math.max(piso, 0))}L${x(0)},${y(Math.max(piso, 0))}Z`} fill={colorSerie(k)} opacity={0.1} />
              ))}
            {series.map((s, k) => (
              <path key={s.nombre} d={camino(s.valores)} fill="none" stroke={colorSerie(k)} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            ))}
            {activo != null && (
              <>
                <line className="grafica-cursor" x1={Math.round(x(activo)) + 0.5} x2={Math.round(x(activo)) + 0.5} y1={m.arriba} y2={m.arriba + h} />
                {series.map((s, k) =>
                  Number.isFinite(s.valores[activo]) ? (
                    <circle key={s.nombre} cx={x(activo)} cy={y(s.valores[activo])} r={4} fill={colorSerie(k)} stroke="var(--nc-surface)" strokeWidth={2} />
                  ) : null
                )}
              </>
            )}
          </svg>
        )}
        {activo != null && ancho > 0 && (
          <Pista
            x={x(activo)}
            y={Math.min(...series.map((s) => y(s.valores[activo] ?? piso))) - 8}
            ancho={ancho}
            titulo={categorias[activo]}
            filas={series.map((s, k) => ({ nombre: s.nombre, color: colorSerie(k), valor: s.valores[activo] }))}
            formato={formato}
            linea
          />
        )}
      </div>
      <Leyenda series={series} linea />
      <VerDatos categorias={categorias} series={series} formato={formato} tituloCategoria={tituloCategoria} />
    </div>
  );
}

/* ── Barras (columnas) ────────────────────────────────────────────────── */

/**
 * Comparar cantidades entre categorías. Barras de hasta 24 px, punta
 * redondeada y base recta, 2 px entre barras de un mismo grupo.
 * Con `etiquetas` (una sola serie), el valor va arriba de cada barra.
 */
export function GraficoBarras({
  categorias = [],
  series = [],
  alto = 220,
  etiquetas = false,
  formato = formatoNumero,
  titulo = 'Gráfico de barras',
  tituloCategoria = 'Categoría',
  className = '',
}) {
  const [lienzo, ancho] = usarAncho();
  const [activo, setActivo] = useState(null);
  const n = categorias.length;
  const k = Math.max(1, series.length);
  const valores = series.flatMap((s) => s.valores).filter(Number.isFinite);
  const { piso, tope, marcas } = escala(valores.length ? Math.max(...valores) : 1, 0);
  const izquierda = Math.max(...marcas.map((t) => formatoEje(t, tope).length)) * 6.2 + 12;
  const m = { arriba: etiquetas ? 18 : 8, derecha: 4, abajo: 26, izquierda };
  const w = Math.max(1, ancho - m.izquierda - m.derecha);
  const h = alto - m.arriba - m.abajo;
  const banda = w / Math.max(1, n);
  const anchoBarra = Math.min(24, Math.max(3, (banda * 0.72 - (k - 1) * 2) / k));
  const anchoGrupo = k * anchoBarra + (k - 1) * 2;
  const y = (v) => m.arriba + h - ((v - piso) / (tope - piso || 1)) * h;
  const base = y(0);
  const xBarra = (i, j) => m.izquierda + i * banda + (banda - anchoGrupo) / 2 + j * (anchoBarra + 2);
  const barra = (x0, t, ancho0) => {
    const alto0 = Math.max(0, base - t);
    const r = Math.min(4, ancho0 / 2, alto0);
    return `M${x0},${base}V${t + r}A${r},${r} 0 0 1 ${x0 + r},${t}H${x0 + ancho0 - r}A${r},${r} 0 0 1 ${x0 + ancho0},${t + r}V${base}Z`;
  };
  const visibles = indicesVisibles(categorias, banda);

  return (
    <div className={`grafica ${className}`.trim()}>
      <div className="grafica-lienzo" ref={lienzo} style={{ height: alto }}>
        {ancho > 0 && (
          <svg
            width={ancho}
            height={alto}
            role="img"
            tabIndex={0}
            aria-label={`${titulo}. ${resumen(series, categorias, formato)}. Usá las flechas para recorrer las categorías.`}
            onPointerLeave={() => setActivo(null)}
            onBlur={() => setActivo(null)}
            onKeyDown={(e) => teclasActivo(e, activo, setActivo, n)}
          >
            {marcas.map((t) => (
              <g key={t}>
                <line className={t === 0 ? 'grafica-base' : 'grafica-cuadricula'} x1={m.izquierda} x2={ancho - m.derecha} y1={Math.round(y(t)) + 0.5} y2={Math.round(y(t)) + 0.5} />
                <text className="grafica-texto-eje" x={m.izquierda - 8} y={y(t)} dy="0.32em" textAnchor="end">
                  {formatoEje(t, tope)}
                </text>
              </g>
            ))}
            {activo != null && <rect x={m.izquierda + activo * banda} y={m.arriba} width={banda} height={h} fill="var(--color-surface-2)" opacity={0.7} />}
            {categorias.map((c, i) =>
              series.map((s, j) =>
                Number.isFinite(s.valores[i]) ? (
                  <path key={`${c}-${s.nombre}`} d={barra(xBarra(i, j), y(s.valores[i]), anchoBarra)} fill={colorSerie(j)} />
                ) : null
              )
            )}
            {etiquetas &&
              series.length === 1 &&
              categorias.map((c, i) =>
                Number.isFinite(series[0].valores[i]) ? (
                  <text key={`e-${c}`} className="grafica-texto-eje" x={xBarra(i, 0) + anchoBarra / 2} y={y(series[0].valores[i]) - 5} textAnchor="middle">
                    {formatoEje(series[0].valores[i], tope)}
                  </text>
                ) : null
              )}
            {visibles.map((i) => (
              <text key={`c-${i}`} className="grafica-texto-categoria" x={m.izquierda + i * banda + banda / 2} y={alto - 6} textAnchor="middle">
                {categorias[i]}
              </text>
            ))}
            {/* Zona de puntero: toda la banda, más grande que la barra. */}
            {categorias.map((c, i) => (
              <rect key={`z-${c}`} x={m.izquierda + i * banda} y={m.arriba} width={banda} height={h} fill="transparent" onPointerEnter={() => setActivo(i)} />
            ))}
          </svg>
        )}
        {activo != null && ancho > 0 && (
          <Pista
            x={m.izquierda + activo * banda + banda / 2}
            y={Math.min(...series.map((s) => y(s.valores[activo] ?? 0))) - 8}
            ancho={ancho}
            titulo={categorias[activo]}
            filas={series.map((s, j) => ({ nombre: s.nombre, color: colorSerie(j), valor: s.valores[activo] }))}
            formato={formato}
          />
        )}
      </div>
      <Leyenda series={series} />
      <VerDatos categorias={categorias} series={series} formato={formato} tituloCategoria={tituloCategoria} />
    </div>
  );
}

/* ── Sparkline ────────────────────────────────────────────────────────── */

/** Tendencia chica: la serie en gris y el último tramo y punto con el color 1. */
export function Sparkline({ valores = [], alto = 28, etiqueta, className = '' }) {
  const [ref, ancho] = usarAncho();
  const n = valores.length;
  const min = Math.min(...valores);
  const max = Math.max(...valores);
  const pad = 4;
  const x = (i) => pad + (n <= 1 ? 0 : (i * (ancho - pad * 2)) / (n - 1));
  const y = (v) => pad + (alto - pad * 2) * (1 - (v - min) / (max - min || 1));
  const camino = (desde, hasta) =>
    valores
      .slice(desde, hasta)
      .map((v, i) => `${i ? 'L' : 'M'}${x(i + desde).toFixed(1)},${y(v).toFixed(1)}`)
      .join('');
  const texto = etiqueta ?? (n ? `Tendencia: de ${formatoNumero(valores[0])} a ${formatoNumero(valores[n - 1])}` : 'Sin datos');
  return (
    <div ref={ref} className={`sparkline ${className}`.trim()} style={{ height: alto }}>
      {ancho > 0 && n > 1 && (
        <svg width={ancho} height={alto} role="img" aria-label={texto}>
          <path d={camino(0, n - 1)} fill="none" stroke="var(--grafica-apagada)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
          <path d={camino(n - 2, n)} fill="none" stroke="var(--grafica-1)" strokeWidth={2} strokeLinecap="round" />
          <circle cx={x(n - 1)} cy={y(valores[n - 1])} r={3} fill="var(--grafica-1)" stroke="var(--nc-surface)" strokeWidth={1.5} />
        </svg>
      )}
    </div>
  );
}

/* ── Barra segmentada ─────────────────────────────────────────────────── */

/**
 * Partes de un total. partes: [{ nombre, valor }]. Fina (8 px, sin texto) o
 * `alta` (28 px, con el porcentaje adentro si entra; si no, va en la leyenda).
 */
export function BarraSegmentada({ partes = [], alta = false, formato = formatoNumero, titulo = 'Distribución', className = '' }) {
  const [ref, ancho] = usarAncho();
  const total = partes.reduce((a, p) => a + Math.max(0, p.valor || 0), 0) || 1;
  const porcentaje = (v) => Math.round((Math.max(0, v) / total) * 100);
  const entra = (p) => {
    const anchoParte = (Math.max(0, p.valor) / total) * ancho - 2;
    return alta && ancho > 0 && `${porcentaje(p.valor)} %`.length * 6.5 + 12 <= anchoParte;
  };
  return (
    <div className={`grafica ${className}`.trim()}>
      <div ref={ref} className={`barra-segmentada${alta ? ' barra-segmentada-alta' : ''}`} role="img" aria-label={`${titulo}: ${partes.map((p) => `${p.nombre} ${porcentaje(p.valor)} %`).join(', ')}`}>
        {partes.map((p, i) =>
          p.valor > 0 ? (
            <span key={p.nombre} data-serie={i + 1} style={{ flex: `${p.valor} 1 0`, background: colorSerie(i) }} title={`${p.nombre}: ${formato(p.valor)} (${porcentaje(p.valor)} %)`}>
              {entra(p) ? `${porcentaje(p.valor)} %` : null}
            </span>
          ) : null
        )}
      </div>
      <ul className="grafica-leyenda">
        {partes.map((p, i) => (
          <li key={p.nombre}>
            <span className="grafica-muestra" style={{ background: colorSerie(i) }} />
            {p.nombre}
            {!entra(p) && <span className="cifra"> {porcentaje(p.valor)} %</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Tarjeta de indicador ─────────────────────────────────────────────── */

/**
 * Un número con su variación y su tendencia. `delta` en %, contra `periodo`;
 * el color sale de la dirección y de si subir es bueno (subirEsBueno).
 */
export function TarjetaIndicador({
  etiqueta,
  valor,
  formato,
  delta,
  periodo = 'vs. el período anterior',
  subirEsBueno = true,
  tendencia,
  className = '',
}) {
  const texto =
    typeof valor === 'number' ? (formato ? formato(valor) : Math.abs(valor) >= 10000 ? fmtCompacto.format(valor) : fmt.format(valor)) : valor;
  const sentido = delta == null || delta === 0 ? 'neutro' : delta > 0 === subirEsBueno ? 'bueno' : 'malo';
  return (
    <div className={`indicador ${className}`.trim()}>
      <span className="indicador-etiqueta">{etiqueta}</span>
      <div className="indicador-fila">
        <div>
          <div className="indicador-valor">{texto}</div>
          {delta != null && (
            <div className="indicador-delta" data-sentido={sentido}>
              <span className="indicador-cambio">
                {delta !== 0 && <Flecha abajo={delta < 0} />}
                {conSigno(delta)} %
              </span>
              <span>{periodo}</span>
            </div>
          )}
        </div>
        {tendencia?.length > 1 && <Sparkline className="indicador-tendencia" valores={tendencia} etiqueta={`Tendencia de ${etiqueta}`} />}
      </div>
    </div>
  );
}

/* ── Tabla ────────────────────────────────────────────────────────────── */

/**
 * Tabla con orden por columna, selección de filas y encabezado fijo (altoMaximo).
 *   columnas: [{ clave, titulo, num?, ordenable?, ancho?, render?(fila), valorOrden?(fila) }]
 */
export function Tabla({
  columnas = [],
  filas = [],
  clave = 'id',
  seleccionable = false,
  seleccion,
  onSeleccion,
  ordenInicial = null,
  altoMaximo,
  vacio = 'No hay datos para mostrar',
  etiqueta,
  acciones,
  className = '',
}) {
  const [orden, setOrden] = useState(ordenInicial);
  const [internos, setInternos] = useState([]);
  const todosRef = useRef(null);
  const elegidos = useMemo(() => new Set(seleccion ?? internos), [seleccion, internos]);
  const cambiar = (ids) => {
    if (seleccion === undefined) setInternos(ids);
    onSeleccion?.(ids);
  };

  const ordenadas = useMemo(() => {
    if (!orden) return filas;
    const col = columnas.find((c) => c.clave === orden.clave);
    const valor = col?.valorOrden ?? ((f) => f[orden.clave]);
    const s = orden.sentido === 'asc' ? 1 : -1;
    return [...filas].sort((a, b) => {
      const va = valor(a);
      const vb = valor(b);
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * s;
      return String(va ?? '').localeCompare(String(vb ?? ''), 'es', { numeric: true }) * s;
    });
  }, [filas, orden, columnas]);

  const todos = filas.length > 0 && filas.every((f) => elegidos.has(f[clave]));
  const algunos = !todos && filas.some((f) => elegidos.has(f[clave]));
  useEffect(() => {
    if (todosRef.current) todosRef.current.indeterminate = algunos;
  }, [algunos]);

  const ordenar = (c) =>
    setOrden((o) => (o?.clave === c.clave ? { clave: c.clave, sentido: o.sentido === 'asc' ? 'desc' : 'asc' } : { clave: c.clave, sentido: c.num ? 'desc' : 'asc' }));
  const columnasTotal = columnas.length + (seleccionable ? 1 : 0);

  return (
    <div className={`tabla-contenedor ${className}`.trim()} style={altoMaximo ? { maxHeight: altoMaximo } : undefined}>
      {seleccionable && acciones && elegidos.size > 0 && (
        <div className="tabla-acciones">
          <span className="cifra">{elegidos.size}</span> {elegidos.size === 1 ? 'elegida' : 'elegidas'}
          {acciones([...elegidos])}
        </div>
      )}
      <table className="tabla-datos" aria-label={etiqueta}>
        <thead>
          <tr>
            {seleccionable && (
              <th className="tabla-check">
                <input
                  ref={todosRef}
                  type="checkbox"
                  className="casilla"
                  checked={todos}
                  onChange={() => cambiar(todos ? [] : filas.map((f) => f[clave]))}
                  aria-label="Elegir todas las filas"
                />
              </th>
            )}
            {columnas.map((c) => {
              const sentido = orden?.clave === c.clave ? (orden.sentido === 'asc' ? 'ascending' : 'descending') : 'none';
              return (
                <th key={c.clave} className={c.num ? 'num' : undefined} aria-sort={c.ordenable === false ? undefined : sentido} style={c.ancho ? { width: c.ancho } : undefined}>
                  {c.ordenable === false ? (
                    c.titulo
                  ) : (
                    <button type="button" className="tabla-orden" onClick={() => ordenar(c)}>
                      {c.titulo}
                      <Flecha />
                    </button>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ordenadas.length === 0 ? (
            <tr>
              <td className="tabla-vacia" colSpan={columnasTotal}>
                {vacio}
              </td>
            </tr>
          ) : (
            ordenadas.map((f) => {
              const id = f[clave];
              const elegida = elegidos.has(id);
              return (
                <tr key={id} aria-selected={seleccionable ? elegida : undefined}>
                  {seleccionable && (
                    <td className="tabla-check">
                      <input
                        type="checkbox"
                        className="casilla"
                        checked={elegida}
                        onChange={() => cambiar(elegida ? [...elegidos].filter((x) => x !== id) : [...elegidos, id])}
                        aria-label={`Elegir ${f[columnas[0]?.clave] ?? id}`}
                      />
                    </td>
                  )}
                  {columnas.map((c) => (
                    <td key={c.clave} className={c.num ? 'num cifra' : undefined}>
                      {c.render ? c.render(f) : f[c.clave]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
