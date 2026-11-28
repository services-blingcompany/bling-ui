/**
 * Controles React de bling-ui (0.7): Select, Buscador, PaletaComandos y el
 * gancho usarAtajo. Arman las clases de css/controles.css, así que el tema y
 * la densidad (data-densidad="comoda") salen solos del CSS.
 *
 *   import { Select, Buscador, PaletaComandos, usarAtajo } from '@blingcompany/bling-ui/react';
 */
import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

const normalizar = (t) =>
  String(t ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

function Icono({ trazos, className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {trazos.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
const FLECHA = ['m6 9 6 6 6-6'];
const TILDE = ['M20 6 9 17l-5-5'];
const LUPA = ['m21 21-4.3-4.3', 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z'];

const esMac = () => typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || '');

/* ── usarAtajo ────────────────────────────────────────────────────────── */

/** Ejecuta `accion` con Ctrl+tecla (⌘+tecla en Mac). Con conModificador=false, con la tecla sola. */
export function usarAtajo(tecla, accion, { conModificador = true } = {}) {
  const ultima = useRef(accion);
  useEffect(() => {
    ultima.current = accion;
  });
  useEffect(() => {
    const alApretar = (e) => {
      if (String(e.key).toLowerCase() !== tecla.toLowerCase()) return;
      if (conModificador && !(e.metaKey || e.ctrlKey)) return;
      e.preventDefault();
      ultima.current(e);
    };
    window.addEventListener('keydown', alApretar);
    return () => window.removeEventListener('keydown', alApretar);
  }, [tecla, conModificador]);
}

/* ── Select ───────────────────────────────────────────────────────────── */

/**
 * Lista desplegable accesible: teclado (flechas, Inicio, Fin, Enter, Esc,
 * primera letra), búsqueda opcional, grupos, opciones deshabilitadas y
 * selección múltiple.
 *   opciones: [{ valor, etiqueta, detalle?, grupo?, deshabilitada? }]
 */
export function Select({
  opciones = [],
  valor,
  onCambio,
  multiple = false,
  buscable = false,
  placeholder = 'Elegí una opción',
  sinResultados = 'Sin resultados',
  deshabilitado = false,
  invalido = false,
  id,
  className = '',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}) {
  const [abierto, setAbierto] = useState(false);
  const [filtro, setFiltro] = useState('');
  const [activa, setActiva] = useState(-1);
  const [arriba, setArriba] = useState(false);
  const raiz = useRef(null);
  const disparador = useRef(null);
  const buscador = useRef(null);
  const idBase = useId();
  const idLista = `${idBase}-lista`;
  const idOpcion = (i) => `${idBase}-op-${i}`;

  const elegidos = useMemo(
    () => new Set(multiple ? valor ?? [] : valor == null ? [] : [valor]),
    [multiple, valor]
  );
  const visibles = useMemo(() => {
    const f = normalizar(filtro.trim());
    if (!f) return opciones;
    return opciones.filter((o) => normalizar(o.etiqueta).includes(f) || normalizar(o.detalle).includes(f));
  }, [opciones, filtro]);
  const primeraHabilitada = (lista) => lista.findIndex((o) => !o.deshabilitada);

  const cerrar = useCallback((devolverFoco = true) => {
    setAbierto(false);
    setFiltro('');
    if (devolverFoco) disparador.current?.focus();
  }, []);

  const abrir = () => {
    if (deshabilitado) return;
    const caja = raiz.current?.getBoundingClientRect();
    const abajo = caja ? window.innerHeight - caja.bottom : 999;
    setArriba(Boolean(caja) && abajo < 300 && caja.top > abajo);
    const i = opciones.findIndex((o) => elegidos.has(o.valor));
    setActiva(i >= 0 ? i : primeraHabilitada(opciones));
    setAbierto(true);
  };

  useEffect(() => {
    if (!abierto) return undefined;
    if (buscable) buscador.current?.focus();
    const fuera = (e) => {
      if (!raiz.current?.contains(e.target)) cerrar(false);
    };
    document.addEventListener('mousedown', fuera);
    return () => document.removeEventListener('mousedown', fuera);
  }, [abierto, buscable, cerrar]);

  useEffect(() => {
    if (abierto) setActiva(primeraHabilitada(visibles));
    // Sólo cuando cambia lo que se busca.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtro]);

  useEffect(() => {
    if (!abierto || activa < 0) return;
    document.getElementById(idOpcion(activa))?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activa, abierto]);

  const elegir = (o) => {
    if (!o || o.deshabilitada) return;
    if (!multiple) {
      onCambio?.(o.valor);
      cerrar();
      return;
    }
    const nuevos = new Set(elegidos);
    if (nuevos.has(o.valor)) nuevos.delete(o.valor);
    else nuevos.add(o.valor);
    onCambio?.(opciones.filter((x) => nuevos.has(x.valor)).map((x) => x.valor));
  };

  const mover = (paso) => {
    if (!visibles.length) return;
    let i = activa;
    for (let n = 0; n < visibles.length; n += 1) {
      i = (i + paso + visibles.length) % visibles.length;
      if (!visibles[i].deshabilitada) break;
    }
    setActiva(i);
  };

  const alApretar = (e) => {
    if (!abierto) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        abrir();
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      mover(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mover(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiva(primeraHabilitada(visibles));
    } else if (e.key === 'End') {
      e.preventDefault();
      const desdeAtras = [...visibles].reverse().findIndex((o) => !o.deshabilitada);
      setActiva(desdeAtras < 0 ? -1 : visibles.length - 1 - desdeAtras);
    } else if (e.key === 'Enter' || (e.key === ' ' && !buscable)) {
      e.preventDefault();
      elegir(visibles[activa]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cerrar();
    } else if (e.key === 'Tab') {
      cerrar(false);
    } else if (!buscable && e.key.length === 1) {
      // Saltar a la próxima opción que empieza con esa letra.
      const letra = normalizar(e.key);
      const desde = activa + 1;
      const orden = [...visibles.slice(desde), ...visibles.slice(0, desde)];
      const hallada = orden.find((o) => !o.deshabilitada && normalizar(o.etiqueta).startsWith(letra));
      if (hallada) setActiva(visibles.indexOf(hallada));
    }
  };

  const seleccion = opciones.filter((o) => elegidos.has(o.valor));
  let contenido = placeholder;
  if (seleccion.length && !multiple) contenido = seleccion[0].etiqueta;
  if (seleccion.length && multiple) {
    contenido = (
      <>
        {seleccion.slice(0, 2).map((o) => (
          <span key={String(o.valor)} className="select-etiqueta">
            {o.etiqueta}
          </span>
        ))}
        {seleccion.length > 2 && <span className="select-etiqueta">+{seleccion.length - 2}</span>}
      </>
    );
  }
  const activaId = abierto && activa >= 0 && visibles[activa] ? idOpcion(activa) : undefined;

  return (
    <div className={`select ${className}`.trim()} ref={raiz}>
      <button
        ref={disparador}
        type="button"
        id={id}
        className="select-disparador"
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-controls={abierto ? idLista : undefined}
        aria-activedescendant={buscable ? undefined : activaId}
        aria-invalid={invalido || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        disabled={deshabilitado}
        onClick={() => (abierto ? cerrar() : abrir())}
        onKeyDown={alApretar}
      >
        <span className="select-valor" data-vacio={seleccion.length ? undefined : ''}>
          {contenido}
        </span>
        <Icono className="select-flecha" trazos={FLECHA} />
      </button>
      {abierto && (
        <div className="select-lista" data-arriba={arriba ? '' : undefined}>
          {buscable && (
            <div className="select-buscar">
              <Icono trazos={LUPA} />
              <input
                ref={buscador}
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                onKeyDown={alApretar}
                placeholder="Buscar"
                aria-label="Buscar"
                role="combobox"
                aria-expanded="true"
                aria-autocomplete="list"
                aria-controls={idLista}
                aria-activedescendant={activaId}
              />
            </div>
          )}
          <div className="select-opciones" role="listbox" id={idLista} aria-multiselectable={multiple || undefined}>
            {visibles.length === 0 ? (
              <p className="select-vacio">{sinResultados}</p>
            ) : (
              visibles.map((o, i) => (
                <Fragment key={String(o.valor)}>
                  {o.grupo && o.grupo !== visibles[i - 1]?.grupo && (
                    <p className="select-grupo" role="presentation">
                      {o.grupo}
                    </p>
                  )}
                  <div
                    id={idOpcion(i)}
                    role="option"
                    className="select-opcion"
                    aria-selected={elegidos.has(o.valor)}
                    aria-disabled={o.deshabilitada || undefined}
                    data-activa={i === activa ? 'true' : undefined}
                    onMouseEnter={() => {
                      if (!o.deshabilitada) setActiva(i);
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => elegir(o)}
                  >
                    <Icono className="select-check" trazos={TILDE} />
                    <span>{o.etiqueta}</span>
                    {o.detalle && <span className="select-detalle">{o.detalle}</span>}
                  </div>
                </Fragment>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Buscador ─────────────────────────────────────────────────────────── */

/** Disparador con aspecto de campo que abre la paleta de comandos. */
export function Buscador({ onAbrir, texto = 'Buscar', atajo, className = '' }) {
  const [mac, setMac] = useState(false);
  useEffect(() => {
    setMac(esMac());
  }, []);
  const tecla = atajo === undefined ? (mac ? '⌘ K' : 'Ctrl K') : atajo;
  return (
    <button
      type="button"
      className={`buscador ${className}`.trim()}
      onClick={onAbrir}
      aria-keyshortcuts={mac ? 'Meta+K' : 'Control+K'}
    >
      <Icono trazos={LUPA} />
      <span className="buscador-texto">{texto}</span>
      {tecla && <kbd className="atajo">{tecla}</kbd>}
    </button>
  );
}

/* ── Paleta de comandos ───────────────────────────────────────────────── */

/**
 * Buscador de secciones y acciones sobre el velo.
 *   grupos: [{ titulo, items: [{ id?, etiqueta, detalle?, icono?, atajo?, palabras?, onElegir }] }]
 */
export function PaletaComandos({
  abierta,
  onCerrar,
  grupos = [],
  placeholder = 'Buscá una sección o una acción',
  sinResultados = 'No encontramos nada con eso',
}) {
  const [filtro, setFiltro] = useState('');
  const [activa, setActiva] = useState(0);
  const entrada = useRef(null);
  const anterior = useRef(null);
  const idBase = useId();
  const idItem = (i) => `${idBase}-it-${i}`;

  const lista = useMemo(() => {
    const f = normalizar(filtro.trim());
    const salida = [];
    for (const g of grupos) {
      const items = (g.items ?? []).filter(
        (it) =>
          !f ||
          normalizar(it.etiqueta).includes(f) ||
          normalizar(it.detalle).includes(f) ||
          (it.palabras ?? []).some((p) => normalizar(p).includes(f))
      );
      if (items.length) salida.push({ titulo: g.titulo, items });
    }
    return salida;
  }, [grupos, filtro]);
  const planos = useMemo(() => lista.flatMap((g) => g.items), [lista]);

  useEffect(() => {
    if (!abierta) return undefined;
    anterior.current = document.activeElement;
    setFiltro('');
    setActiva(0);
    const t = setTimeout(() => entrada.current?.focus(), 0);
    return () => {
      clearTimeout(t);
      anterior.current?.focus?.();
    };
  }, [abierta]);

  useEffect(() => {
    setActiva(0);
  }, [filtro]);

  useEffect(() => {
    if (!abierta) return;
    document.getElementById(idItem(activa))?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activa, abierta]);

  if (!abierta) return null;

  const ejecutar = (it) => {
    if (!it) return;
    onCerrar?.();
    it.onElegir?.();
  };
  const alApretar = (e) => {
    const total = planos.length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiva((i) => (total ? (i + 1) % total : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiva((i) => (total ? (i - 1 + total) % total : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      ejecutar(planos[activa]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onCerrar?.();
    }
  };

  let n = -1;
  return (
    <div
      className="velo paleta-velo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCerrar?.();
      }}
    >
      <div className="paleta" role="dialog" aria-modal="true" aria-label="Buscar">
        <div className="paleta-buscar">
          <Icono trazos={LUPA} />
          <input
            ref={entrada}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            onKeyDown={alApretar}
            placeholder={placeholder}
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={`${idBase}-lista`}
            aria-activedescendant={planos.length ? idItem(activa) : undefined}
          />
          <kbd className="atajo">Esc</kbd>
        </div>
        <div className="paleta-resultados" role="listbox" id={`${idBase}-lista`}>
          {planos.length === 0 ? (
            <p className="paleta-vacio">{sinResultados}</p>
          ) : (
            lista.map((g) => (
              <div key={g.titulo} role="group" aria-label={g.titulo}>
                <p className="paleta-grupo">{g.titulo}</p>
                {g.items.map((it) => {
                  n += 1;
                  const i = n;
                  return (
                    <div
                      key={it.id ?? it.etiqueta}
                      id={idItem(i)}
                      role="option"
                      aria-selected={i === activa}
                      className="paleta-item"
                      data-activa={i === activa ? 'true' : undefined}
                      onMouseMove={() => setActiva(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => ejecutar(it)}
                    >
                      {it.icono}
                      <span>{it.etiqueta}</span>
                      {it.detalle && <span className="paleta-item-detalle">{it.detalle}</span>}
                      {it.atajo && <kbd className="atajo">{it.atajo}</kbd>}
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="paleta-pie">
          <span>
            <kbd className="atajo">↑</kbd>
            <kbd className="atajo">↓</kbd> para moverte
          </span>
          <span>
            <kbd className="atajo">Enter</kbd> para abrir
          </span>
          <span>
            <kbd className="atajo">Esc</kbd> para cerrar
          </span>
        </div>
      </div>
    </div>
  );
}
