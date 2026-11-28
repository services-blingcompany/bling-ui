// react-src/index.jsx
import { useEffect as useEffect2, useId as useId2, useRef as useRef2, useState as useState2 } from "react";

// react-src/logoTrazos.js
var VIEWBOX = "0 0 108.42 43.42";
var LOGO_SVG = '<g id="c" data-name="a"><path fill="currentColor" d="M.02,32.33V0H12.51c3.01,0,5.28,.75,6.79,2.25,1.53,1.5,2.29,3.56,2.29,6.18,0,1.63-.28,2.96-.83,4-.55,1.04-1.46,1.93-2.72,2.65,2.08,.41,3.58,1.08,4.49,2.01,1.39,1.42,2.08,3.44,2.08,6.06s-.87,4.73-2.63,6.37c-1.97,1.86-4.81,2.79-8.52,2.79H0l.02,.02ZM8.42,12.72h1.54c1.28,0,2.26-.27,2.93-.81,.68-.54,1.02-1.32,1.02-2.35s-.33-1.81-1.01-2.35c-.67-.54-1.65-.81-2.95-.81h-1.54v6.32Zm0,13.08h1.87c1.86,0,3.24-.2,4.14-.59,.52-.24,.94-.61,1.24-1.13,.31-.51,.46-1.09,.46-1.72,0-1.31-.54-2.24-1.61-2.79-.47-.25-.98-.41-1.53-.49-.55-.07-1.5-.11-2.85-.11h-1.73v6.82h0Z"/><path fill="currentColor" d="M37.01,0V32.33h-7.76V0h7.76Z"/><path fill="currentColor" d="M50.04,12.72v19.61h-7.76V12.72h7.76Z"/><path fill="currentColor" d="M108.42,10.35V30.82c0,3-.37,5.2-1.11,6.59-1.17,2.21-2.92,3.82-5.25,4.83-1.8,.79-3.94,1.18-6.41,1.18-4.29,0-7.64-1.28-10.06-3.84-1.29-1.37-2.08-2.9-2.37-4.57h8.73c.52,1.47,1.75,2.2,3.69,2.2,1.56,0,2.79-.47,3.68-1.4s1.34-2.21,1.34-3.84v-2.08c-1.17,1.07-2.26,1.82-3.28,2.25s-2.23,.64-3.63,.64c-3.6,0-6.43-1.31-8.5-3.93-1.53-1.94-2.3-4.33-2.3-7.18,0-3.6,1.14-6.53,3.43-8.79,2.13-2.1,4.71-3.15,7.74-3.15,1.4,0,2.61,.23,3.63,.67,1.02,.45,1.98,1.2,2.9,2.24v-2.3h7.77Zm-12.4,5.93c-1.39,0-2.56,.49-3.53,1.47-.98,.98-1.47,2.14-1.47,3.48,0,1.42,.49,2.62,1.47,3.6,.96,.98,2.14,1.47,3.55,1.47s2.55-.49,3.53-1.47,1.47-2.16,1.47-3.55-.48-2.57-1.44-3.53-2.15-1.45-3.57-1.47h0Z"/><path fill="currentColor" d="M46.16,0c1.21,0,2.25,.43,3.1,1.28,.85,.85,1.28,1.88,1.28,3.08s-.43,2.25-1.28,3.1-1.88,1.28-3.08,1.28-2.26-.43-3.1-1.28c-.85-.87-1.28-1.92-1.28-3.15s.43-2.18,1.28-3.02,1.88-1.28,3.08-1.29Z"/><g transform="translate(41.209239 -5.170848) scale(0.078747)" style="fill:var(--nc-brand,#fc0)"><path d="M372.13,493.17c0,12.6-5.11,24.01-13.36,32.25-8.25,8.25-19.65,13.36-32.25,13.36s-24.01-5.11-32.25-13.36c-8.25-8.25-13.36-19.65-13.36-32.25,0-1.83,.1-3.62,.32-5.39,14.53,3.5,29.71,5.34,45.31,5.34s30.77-1.84,45.31-5.34c.22,1.77,.32,3.57,.32,5.39h-.04Z"/><path d="M277.86,149.16c-15.89,5.13-30.69,12.69-43.94,22.27-3.95,2.84-7.76,5.87-11.42,9.07-5.48,4.77-10.63,9.92-15.41,15.41-2.87,3.3-5.62,6.71-8.21,10.25-7.86,10.68-14.41,22.39-19.42,34.88-1.19,2.95-2.28,5.95-3.29,9l-33.17-10.8c.19-.58,.37-1.15,.57-1.72,5.96-17.49,14.37-33.86,24.81-48.69l2.28-3.18c11.94-16.27,26.37-30.6,42.74-42.42l4.8-3.37c13.15-8.92,27.46-16.26,42.64-21.74l6.22-2.12,10.77,33.17h.03Z"/><path d="M510,239.24l-33.17,10.78c-1-3.05-2.1-6.05-3.29-9-5.01-12.49-11.56-24.2-19.41-34.88-2.59-3.53-5.33-6.94-8.21-10.24-4.77-5.48-9.93-10.64-15.41-15.41-3.67-3.2-7.47-6.22-11.42-9.07-13.25-9.58-28.05-17.15-43.94-22.27l10.78-33.15,6.22,2.12c15.19,5.48,29.49,12.82,42.64,21.74l4.8,3.37c8.38,6.06,16.25,12.76,23.54,20.05,6.95,6.95,13.37,14.43,19.2,22.38,.78,1.06,1.54,2.12,2.3,3.21,10.43,14.82,18.82,31.18,24.78,48.66,.2,.57,.38,1.14,.57,1.72h.02Z"/><path d="M473.55,405.7v70.04H179.45v-70.04l18.44-13.38,9.2-6.68v-86.76c.1-12.85,2.25-25.22,6.11-36.81,.25-.75,.51-1.49,.77-2.23s.53-1.48,.81-2.21c.5-1.3,1.01-2.6,1.55-3.89,.16-.39,.33-.79,.51-1.18,.18-.44,.37-.88,.57-1.31,.24-.53,.49-1.08,.73-1.61,.31-.65,.62-1.3,.94-1.95,.32-.66,.65-1.31,.98-1.97h0c.37-.74,.75-1.46,1.14-2.18,.37-.7,.76-1.4,1.15-2.1l.06-.11c.37-.64,.73-1.27,1.1-1.91,.05-.07,.08-.15,.13-.22,.26-.44,.53-.89,.8-1.33,1.83-3.03,3.82-5.96,5.91-8.8,7.38-10.01,16.3-18.82,26.4-26.09,9.99-7.19,21.13-12.88,33.1-16.72,11.54-3.72,23.84-5.72,36.6-5.72s25.06,2,36.6,5.72c11.96,3.85,23.11,9.54,33.09,16.72,5.25,3.78,10.18,7.96,14.74,12.53,4.22,4.22,8.12,8.75,11.67,13.56,7.35,9.94,13.19,21.07,17.18,33.03,3.87,11.59,6.01,23.96,6.11,36.81v86.76l9.2,6.67,18.43,13.39,.02-.04h.06Z"/></g></g>';

// marca/marca.json
var marca_default = {
  $comentario: "Fuente \xFAnica de la marca. Para un rebrand: cambi\xE1 estos valores y/o marca/campana.png, corr\xE9 `npm run marca` y public\xE1 un tag nuevo de bling-ui.",
  nombre: "Bling",
  nombreCorto: "Bling",
  colorMarca: "#ffcc00",
  fondoIcono: "#09090b",
  colorTema: "#000000",
  campana: "campana.png",
  logo: "logo.svg"
};

// react-src/controles.jsx
import { Fragment, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Fragment as Fragment2, jsx, jsxs } from "react/jsx-runtime";
var normalizar = (t) => String(t ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function Icono({ trazos, className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: trazos.map((d) => /* @__PURE__ */ jsx("path", { d }, d))
    }
  );
}
var FLECHA = ["m6 9 6 6 6-6"];
var TILDE = ["M20 6 9 17l-5-5"];
var LUPA = ["m21 21-4.3-4.3", "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"];
var esMac = () => typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent || "");
function usarAtajo(tecla, accion, { conModificador = true } = {}) {
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
    window.addEventListener("keydown", alApretar);
    return () => window.removeEventListener("keydown", alApretar);
  }, [tecla, conModificador]);
}
function Select({
  opciones = [],
  valor,
  onCambio,
  multiple = false,
  buscable = false,
  placeholder = "Eleg\xED una opci\xF3n",
  sinResultados = "Sin resultados",
  deshabilitado = false,
  invalido = false,
  id,
  className = "",
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby
}) {
  const [abierto, setAbierto] = useState(false);
  const [filtro, setFiltro] = useState("");
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
    setFiltro("");
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
    if (!abierto) return void 0;
    if (buscable) buscador.current?.focus();
    const fuera = (e) => {
      if (!raiz.current?.contains(e.target)) cerrar(false);
    };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto, buscable, cerrar]);
  useEffect(() => {
    if (abierto) setActiva(primeraHabilitada(visibles));
  }, [filtro]);
  useEffect(() => {
    if (!abierto || activa < 0) return;
    document.getElementById(idOpcion(activa))?.scrollIntoView({ block: "nearest" });
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
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        abrir();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      mover(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      mover(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiva(primeraHabilitada(visibles));
    } else if (e.key === "End") {
      e.preventDefault();
      const desdeAtras = [...visibles].reverse().findIndex((o) => !o.deshabilitada);
      setActiva(desdeAtras < 0 ? -1 : visibles.length - 1 - desdeAtras);
    } else if (e.key === "Enter" || e.key === " " && !buscable) {
      e.preventDefault();
      elegir(visibles[activa]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      cerrar();
    } else if (e.key === "Tab") {
      cerrar(false);
    } else if (!buscable && e.key.length === 1) {
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
    contenido = /* @__PURE__ */ jsxs(Fragment2, { children: [
      seleccion.slice(0, 2).map((o) => /* @__PURE__ */ jsx("span", { className: "select-etiqueta", children: o.etiqueta }, String(o.valor))),
      seleccion.length > 2 && /* @__PURE__ */ jsxs("span", { className: "select-etiqueta", children: [
        "+",
        seleccion.length - 2
      ] })
    ] });
  }
  const activaId = abierto && activa >= 0 && visibles[activa] ? idOpcion(activa) : void 0;
  return /* @__PURE__ */ jsxs("div", { className: `select ${className}`.trim(), ref: raiz, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        ref: disparador,
        type: "button",
        id,
        className: "select-disparador",
        "aria-haspopup": "listbox",
        "aria-expanded": abierto,
        "aria-controls": abierto ? idLista : void 0,
        "aria-activedescendant": buscable ? void 0 : activaId,
        "aria-invalid": invalido || void 0,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        disabled: deshabilitado,
        onClick: () => abierto ? cerrar() : abrir(),
        onKeyDown: alApretar,
        children: [
          /* @__PURE__ */ jsx("span", { className: "select-valor", "data-vacio": seleccion.length ? void 0 : "", children: contenido }),
          /* @__PURE__ */ jsx(Icono, { className: "select-flecha", trazos: FLECHA })
        ]
      }
    ),
    abierto && /* @__PURE__ */ jsxs("div", { className: "select-lista", "data-arriba": arriba ? "" : void 0, children: [
      buscable && /* @__PURE__ */ jsxs("div", { className: "select-buscar", children: [
        /* @__PURE__ */ jsx(Icono, { trazos: LUPA }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: buscador,
            value: filtro,
            onChange: (e) => setFiltro(e.target.value),
            onKeyDown: alApretar,
            placeholder: "Buscar",
            "aria-label": "Buscar",
            role: "combobox",
            "aria-expanded": "true",
            "aria-autocomplete": "list",
            "aria-controls": idLista,
            "aria-activedescendant": activaId
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "select-opciones", role: "listbox", id: idLista, "aria-multiselectable": multiple || void 0, children: visibles.length === 0 ? /* @__PURE__ */ jsx("p", { className: "select-vacio", children: sinResultados }) : visibles.map((o, i) => /* @__PURE__ */ jsxs(Fragment, { children: [
        o.grupo && o.grupo !== visibles[i - 1]?.grupo && /* @__PURE__ */ jsx("p", { className: "select-grupo", role: "presentation", children: o.grupo }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            id: idOpcion(i),
            role: "option",
            className: "select-opcion",
            "aria-selected": elegidos.has(o.valor),
            "aria-disabled": o.deshabilitada || void 0,
            "data-activa": i === activa ? "true" : void 0,
            onMouseEnter: () => {
              if (!o.deshabilitada) setActiva(i);
            },
            onMouseDown: (e) => e.preventDefault(),
            onClick: () => elegir(o),
            children: [
              /* @__PURE__ */ jsx(Icono, { className: "select-check", trazos: TILDE }),
              /* @__PURE__ */ jsx("span", { children: o.etiqueta }),
              o.detalle && /* @__PURE__ */ jsx("span", { className: "select-detalle", children: o.detalle })
            ]
          }
        )
      ] }, String(o.valor))) })
    ] })
  ] });
}
function Buscador({ onAbrir, texto = "Buscar", atajo, className = "" }) {
  const [mac, setMac] = useState(false);
  useEffect(() => {
    setMac(esMac());
  }, []);
  const tecla = atajo === void 0 ? mac ? "\u2318 K" : "Ctrl K" : atajo;
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      className: `buscador ${className}`.trim(),
      onClick: onAbrir,
      "aria-keyshortcuts": mac ? "Meta+K" : "Control+K",
      children: [
        /* @__PURE__ */ jsx(Icono, { trazos: LUPA }),
        /* @__PURE__ */ jsx("span", { className: "buscador-texto", children: texto }),
        tecla && /* @__PURE__ */ jsx("kbd", { className: "atajo", children: tecla })
      ]
    }
  );
}
function PaletaComandos({
  abierta,
  onCerrar,
  grupos = [],
  placeholder = "Busc\xE1 una secci\xF3n o una acci\xF3n",
  sinResultados = "No encontramos nada con eso"
}) {
  const [filtro, setFiltro] = useState("");
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
        (it) => !f || normalizar(it.etiqueta).includes(f) || normalizar(it.detalle).includes(f) || (it.palabras ?? []).some((p) => normalizar(p).includes(f))
      );
      if (items.length) salida.push({ titulo: g.titulo, items });
    }
    return salida;
  }, [grupos, filtro]);
  const planos = useMemo(() => lista.flatMap((g) => g.items), [lista]);
  useEffect(() => {
    if (!abierta) return void 0;
    anterior.current = document.activeElement;
    setFiltro("");
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
    document.getElementById(idItem(activa))?.scrollIntoView({ block: "nearest" });
  }, [activa, abierta]);
  if (!abierta) return null;
  const ejecutar = (it) => {
    if (!it) return;
    onCerrar?.();
    it.onElegir?.();
  };
  const alApretar = (e) => {
    const total = planos.length;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiva((i) => total ? (i + 1) % total : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiva((i) => total ? (i - 1 + total) % total : 0);
    } else if (e.key === "Enter") {
      e.preventDefault();
      ejecutar(planos[activa]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCerrar?.();
    }
  };
  let n = -1;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "velo paleta-velo",
      onMouseDown: (e) => {
        if (e.target === e.currentTarget) onCerrar?.();
      },
      children: /* @__PURE__ */ jsxs("div", { className: "paleta", role: "dialog", "aria-modal": "true", "aria-label": "Buscar", children: [
        /* @__PURE__ */ jsxs("div", { className: "paleta-buscar", children: [
          /* @__PURE__ */ jsx(Icono, { trazos: LUPA }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: entrada,
              value: filtro,
              onChange: (e) => setFiltro(e.target.value),
              onKeyDown: alApretar,
              placeholder,
              role: "combobox",
              "aria-expanded": "true",
              "aria-autocomplete": "list",
              "aria-controls": `${idBase}-lista`,
              "aria-activedescendant": planos.length ? idItem(activa) : void 0
            }
          ),
          /* @__PURE__ */ jsx("kbd", { className: "atajo", children: "Esc" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "paleta-resultados", role: "listbox", id: `${idBase}-lista`, children: planos.length === 0 ? /* @__PURE__ */ jsx("p", { className: "paleta-vacio", children: sinResultados }) : lista.map((g) => /* @__PURE__ */ jsxs("div", { role: "group", "aria-label": g.titulo, children: [
          /* @__PURE__ */ jsx("p", { className: "paleta-grupo", children: g.titulo }),
          g.items.map((it) => {
            n += 1;
            const i = n;
            return /* @__PURE__ */ jsxs(
              "div",
              {
                id: idItem(i),
                role: "option",
                "aria-selected": i === activa,
                className: "paleta-item",
                "data-activa": i === activa ? "true" : void 0,
                onMouseMove: () => setActiva(i),
                onMouseDown: (e) => e.preventDefault(),
                onClick: () => ejecutar(it),
                children: [
                  it.icono,
                  /* @__PURE__ */ jsx("span", { children: it.etiqueta }),
                  it.detalle && /* @__PURE__ */ jsx("span", { className: "paleta-item-detalle", children: it.detalle }),
                  it.atajo && /* @__PURE__ */ jsx("kbd", { className: "atajo", children: it.atajo })
                ]
              },
              it.id ?? it.etiqueta
            );
          })
        ] }, g.titulo)) }),
        /* @__PURE__ */ jsxs("div", { className: "paleta-pie", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("kbd", { className: "atajo", children: "\u2191" }),
            /* @__PURE__ */ jsx("kbd", { className: "atajo", children: "\u2193" }),
            " para moverte"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("kbd", { className: "atajo", children: "Enter" }),
            " para abrir"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("kbd", { className: "atajo", children: "Esc" }),
            " para cerrar"
          ] })
        ] })
      ] })
    }
  );
}

// react-src/index.jsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function Logo({ alto = 28, titulo = marca_default.nombre, className, style }) {
  const [, , w, h] = VIEWBOX.split(" ").map(Number);
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      viewBox: VIEWBOX,
      height: alto,
      width: alto * w / h,
      role: "img",
      "aria-label": titulo,
      className,
      style,
      dangerouslySetInnerHTML: { __html: `<title>${titulo}</title>${LOGO_SVG}` }
    }
  );
}
var HIJOS = { rayas: 12, barras: 5, puntos: 3, onda: 2, anillo: 0, linea: 0 };
function Cargador({ variante = "rayas", tam = "md", deMarca = false, etiqueta = "Cargando", className = "" }) {
  const clases = ["cargador", `cargador-${variante}`, tam === "sm" && "cargador-sm", tam === "lg" && "cargador-lg", deMarca && "cargador-marca", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx2("span", { className: clases, role: "status", "aria-label": etiqueta, children: Array.from({ length: HIJOS[variante] ?? 0 }, (_, i) => /* @__PURE__ */ jsx2("i", {}, i)) });
}
function PantallaDeCarga({ mensaje, variante = "rayas" }) {
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      style: { minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, background: "var(--color-bg)", color: "var(--color-ink)" },
      children: [
        /* @__PURE__ */ jsx2(Logo, { alto: 36 }),
        /* @__PURE__ */ jsx2(Cargador, { variante, tam: "lg", deMarca: true, etiqueta: mensaje || "Cargando" }),
        mensaje ? /* @__PURE__ */ jsx2("p", { style: { fontSize: 14, color: "var(--color-muted)", margin: 0 }, children: mensaje }) : null
      ]
    }
  );
}
var TIPOS = [
  { id: "bug", nombre: "Algo falla" },
  { id: "suggestion", nombre: "Sugerencia" },
  { id: "other", nombre: "Otro" }
];
var MAX_IMAGEN = 5 * 1024 * 1024;
var FORMATOS = ["image/jpeg", "image/png", "image/webp"];
function metaDelEntorno(app) {
  if (typeof window === "undefined") return { app };
  const ua = navigator.userAgent;
  const navegador = /Edg\//.test(ua) ? "Edge" : /OPR\/|Opera/.test(ua) ? "Opera" : /Firefox\//.test(ua) ? "Firefox" : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "Otro";
  const sistema = /Android/.test(ua) ? "Android" : /iPhone|iPad/.test(ua) ? "iOS" : /Win/.test(ua) ? "Windows" : /Mac/.test(ua) ? "macOS" : /Linux/.test(ua) ? "Linux" : "Otro";
  const html = document.documentElement;
  return {
    app,
    route: window.location.pathname,
    browser: navegador,
    os: sistema,
    resolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    theme: ["light", "dark", "amoled", "corporate", "horizon", "daltonico"].find((t) => html.classList.contains(t)) || "desconocido",
    language: navigator.language,
    user_agent: ua,
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function errorDeRespuesta(res, porDefecto) {
  if (res.status === 429) return "Enviaste varios reportes seguidos. Esper\xE1 un minuto y prob\xE1 de nuevo.";
  try {
    const cuerpo = await res.json();
    if (typeof cuerpo.detail === "string") return cuerpo.detail;
  } catch {
  }
  return porDefecto;
}
function crearClienteReportes(apiBase = "") {
  const base = apiBase.replace(/\/$/, "");
  return {
    async subirImagen(archivo) {
      const datos = new FormData();
      datos.append("file", archivo);
      const res = await fetch(`${base}/api/v1/reports/upload-image`, { method: "POST", body: datos, credentials: "include" });
      if (!res.ok) throw new Error(await errorDeRespuesta(res, "No pudimos subir la imagen."));
      return (await res.json()).url;
    },
    async enviar(reporte) {
      const res = await fetch(`${base}/api/v1/reports`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reporte),
        credentials: "include"
      });
      if (!res.ok) throw new Error(await errorDeRespuesta(res, "No pudimos enviar el reporte. Prob\xE1 de nuevo en un rato."));
      return res.json().catch(() => ({}));
    }
  };
}
function ReportarProblema({ abierto, onCerrar, app, cliente, tipoInicial = "bug", pedirEmail = false, emailInicial = "" }) {
  const id = useId2();
  const [tipo, setTipo] = useState2(tipoInicial);
  const [titulo, setTitulo] = useState2("");
  const [descripcion, setDescripcion] = useState2("");
  const [email, setEmail] = useState2(emailInicial);
  const [imagen, setImagen] = useState2(null);
  const [vista, setVista] = useState2(null);
  const [error, setError] = useState2("");
  const [enviando, setEnviando] = useState2(false);
  const [enviado, setEnviado] = useState2(false);
  const archivoRef = useRef2(null);
  const primerCampo = useRef2(null);
  useEffect2(() => {
    if (!abierto) return void 0;
    const alTeclear = (e) => e.key === "Escape" && !enviando && cerrar();
    document.addEventListener("keydown", alTeclear);
    const t = setTimeout(() => primerCampo.current?.focus(), 30);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      clearTimeout(t);
    };
  });
  useEffect2(() => () => vista && URL.revokeObjectURL(vista), [vista]);
  if (!abierto) return null;
  function reiniciar() {
    setTipo(tipoInicial);
    setTitulo("");
    setDescripcion("");
    setImagen(null);
    setVista(null);
    setError("");
    setEnviado(false);
  }
  function cerrar() {
    reiniciar();
    onCerrar();
  }
  function elegirImagen(e) {
    const archivo = e.target.files?.[0];
    e.target.value = "";
    if (!archivo) return;
    if (!FORMATOS.includes(archivo.type)) return setError("La imagen tiene que ser JPG, PNG o WebP.");
    if (archivo.size > MAX_IMAGEN) return setError("La imagen no puede pasar de 5 MB.");
    setError("");
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
    setError("");
    try {
      const evidencias = imagen ? [await cliente.subirImagen(imagen)] : void 0;
      await cliente.enviar({
        type: tipo,
        title: titulo.trim(),
        description: descripcion.trim(),
        email: pedirEmail && email.trim() ? email.trim() : void 0,
        evidence_urls: evidencias,
        meta: metaDelEntorno(app)
      });
      setEnviado(true);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "No pudimos enviar el reporte.");
    } finally {
      setEnviando(false);
    }
  }
  const etiqueta = { display: "block", fontSize: 13, fontWeight: 500, marginBottom: 6, color: "var(--color-ink)" };
  const ayuda = { fontSize: 12, color: "var(--color-muted)", marginTop: 4 };
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: "velo",
      style: { position: "fixed", inset: 0, zIndex: 1e3, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
      onMouseDown: (e) => e.target === e.currentTarget && !enviando && cerrar(),
      children: /* @__PURE__ */ jsxs2(
        "div",
        {
          className: "modal",
          role: "dialog",
          "aria-modal": "true",
          "aria-labelledby": `${id}-t`,
          style: { boxSizing: "border-box", width: "100%", maxWidth: 480, maxHeight: "calc(100dvh - 32px)", overflowY: "auto", padding: 20, color: "var(--color-ink)" },
          children: [
            /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 16 }, children: [
              /* @__PURE__ */ jsx2("h2", { id: `${id}-t`, style: { margin: 0, fontSize: 17, fontWeight: 600 }, children: enviado ? "\xA1Gracias!" : "Reportar un problema" }),
              /* @__PURE__ */ jsx2("button", { type: "button", className: "boton boton-fantasma boton-icono boton-compacto", onClick: cerrar, disabled: enviando, "aria-label": "Cerrar", children: /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": "true", children: /* @__PURE__ */ jsx2("path", { d: "M18 6 6 18M6 6l12 12" }) }) })
            ] }),
            enviado ? /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("p", { style: { margin: "0 0 16px", fontSize: 14 }, children: "Recibimos tu reporte. Lo revisa el equipo y, si dejaste un correo o ten\xE9s sesi\xF3n iniciada, te escribimos cuando haya novedades." }),
              /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8 }, children: [
                /* @__PURE__ */ jsx2("button", { type: "button", className: "boton boton-secundario", onClick: reiniciar, children: "Enviar otro" }),
                /* @__PURE__ */ jsx2("button", { type: "button", className: "boton boton-primario", onClick: cerrar, children: "Listo" })
              ] })
            ] }) : /* @__PURE__ */ jsxs2("form", { onSubmit: enviar, noValidate: true, children: [
              /* @__PURE__ */ jsx2("div", { role: "radiogroup", "aria-label": "Tipo de reporte", style: { display: "flex", gap: 6, marginBottom: 14 }, children: TIPOS.map((t) => /* @__PURE__ */ jsx2(
                "button",
                {
                  type: "button",
                  role: "radio",
                  "aria-checked": tipo === t.id,
                  className: `boton boton-compacto ${tipo === t.id ? "boton-primario" : "boton-secundario"}`,
                  style: { flex: 1 },
                  onClick: () => setTipo(t.id),
                  children: t.nombre
                },
                t.id
              )) }),
              /* @__PURE__ */ jsxs2("div", { style: { marginBottom: 12 }, children: [
                /* @__PURE__ */ jsx2("label", { htmlFor: `${id}-titulo`, style: etiqueta, children: "T\xEDtulo" }),
                /* @__PURE__ */ jsx2(
                  "input",
                  {
                    ref: primerCampo,
                    id: `${id}-titulo`,
                    className: "campo",
                    style: { width: "100%", boxSizing: "border-box" },
                    value: titulo,
                    maxLength: 100,
                    onChange: (e) => setTitulo(e.target.value),
                    placeholder: tipo === "suggestion" ? "Ej.: poder exportar a Excel" : "Ej.: no me llega el c\xF3digo de verificaci\xF3n"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs2("div", { style: { marginBottom: 12 }, children: [
                /* @__PURE__ */ jsx2("label", { htmlFor: `${id}-desc`, style: etiqueta, children: "Detalle" }),
                /* @__PURE__ */ jsx2(
                  "textarea",
                  {
                    id: `${id}-desc`,
                    className: "campo",
                    style: { width: "100%", boxSizing: "border-box", minHeight: 110, resize: "vertical", fontFamily: "inherit" },
                    value: descripcion,
                    maxLength: 1e3,
                    onChange: (e) => setDescripcion(e.target.value),
                    placeholder: tipo === "suggestion" ? "Qu\xE9 te gustar\xEDa y para qu\xE9 lo usar\xEDas" : "Qu\xE9 hiciste, qu\xE9 esperabas y qu\xE9 pas\xF3"
                  }
                ),
                /* @__PURE__ */ jsxs2("p", { style: ayuda, children: [
                  descripcion.length,
                  "/1000"
                ] })
              ] }),
              /* @__PURE__ */ jsxs2("div", { style: { marginBottom: 12 }, children: [
                /* @__PURE__ */ jsx2("span", { style: etiqueta, children: "Captura (opcional)" }),
                vista ? /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                  /* @__PURE__ */ jsx2("img", { src: vista, alt: "Captura adjunta", style: { width: 64, height: 48, objectFit: "cover", borderRadius: 6, border: "1px solid var(--nc-line)" } }),
                  /* @__PURE__ */ jsx2("span", { style: { fontSize: 13, flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: imagen?.name }),
                  /* @__PURE__ */ jsx2(
                    "button",
                    {
                      type: "button",
                      className: "boton boton-fantasma boton-compacto",
                      onClick: () => {
                        setImagen(null);
                        setVista(null);
                      },
                      children: "Quitar"
                    }
                  )
                ] }) : /* @__PURE__ */ jsx2("button", { type: "button", className: "boton boton-secundario boton-compacto", onClick: () => archivoRef.current?.click(), children: "Adjuntar imagen" }),
                /* @__PURE__ */ jsx2("input", { ref: archivoRef, type: "file", accept: FORMATOS.join(","), hidden: true, onChange: elegirImagen }),
                /* @__PURE__ */ jsx2("p", { style: ayuda, children: "JPG, PNG o WebP, hasta 5 MB." })
              ] }),
              pedirEmail ? /* @__PURE__ */ jsxs2("div", { style: { marginBottom: 12 }, children: [
                /* @__PURE__ */ jsx2("label", { htmlFor: `${id}-email`, style: etiqueta, children: "Correo para responderte (opcional)" }),
                /* @__PURE__ */ jsx2("input", { id: `${id}-email`, type: "email", className: "campo", style: { width: "100%", boxSizing: "border-box" }, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "tu@correo.com" })
              ] }) : null,
              error ? /* @__PURE__ */ jsx2("p", { role: "alert", style: { fontSize: 13, margin: "0 0 12px", padding: "8px 10px", borderRadius: 8, color: "var(--bling-danger)", background: "var(--bling-danger-bg)", border: "1px solid var(--bling-danger-border)" }, children: error }) : null,
              /* @__PURE__ */ jsx2("p", { style: { ...ayuda, marginBottom: 14 }, children: "Mandamos tambi\xE9n la p\xE1gina, el navegador y el tema que us\xE1s, para poder reproducirlo." }),
              /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "flex-end", gap: 8 }, children: [
                /* @__PURE__ */ jsx2("button", { type: "button", className: "boton boton-secundario", onClick: cerrar, disabled: enviando, children: "Cancelar" }),
                /* @__PURE__ */ jsxs2("button", { type: "submit", className: "boton boton-primario", disabled: !listo, children: [
                  enviando ? /* @__PURE__ */ jsx2(Cargador, { variante: "anillo", tam: "sm", etiqueta: "Enviando" }) : null,
                  enviando ? "Enviando\u2026" : "Enviar"
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
export {
  Buscador,
  Cargador,
  Logo,
  PaletaComandos,
  PantallaDeCarga,
  ReportarProblema,
  Select,
  crearClienteReportes,
  metaDelEntorno,
  usarAtajo
};
