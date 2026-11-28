// Parte React de la demo: selects, buscador y paleta de comandos.
// Se compila con `npm run build:demo` a demo/demo-react.js (con React adentro).
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { Buscador, PaletaComandos, Select, usarAtajo } from '../react-src/index.jsx';
import { TEMAS } from '../tema/tema.js';
import './demo-datos.jsx';

const METRO = ['Montevideo', 'Canelones', 'San José'];
const DEPARTAMENTOS = [
  'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida', 'Lavalleja', 'Maldonado',
  'Montevideo', 'Paysandú', 'Río Negro', 'Rivera', 'Rocha', 'Salto', 'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres',
]
  .map((d) => ({ valor: d, etiqueta: d, grupo: METRO.includes(d) ? 'Área metropolitana' : 'Interior' }))
  .sort((a, b) => (a.grupo === b.grupo ? a.etiqueta.localeCompare(b.etiqueta, 'es') : a.grupo === 'Área metropolitana' ? -1 : 1));

const MODALIDADES = [
  { valor: 'presencial', etiqueta: 'Presencial', detalle: '128' },
  { valor: 'hibrido', etiqueta: 'Híbrido', detalle: '64' },
  { valor: 'remoto', etiqueta: 'Remoto', detalle: '31' },
  { valor: 'temporada', etiqueta: 'Por temporada', detalle: '0', deshabilitada: true },
];
const IDIOMAS = ['Español', 'Inglés', 'Portugués', 'Francés', 'Italiano', 'Alemán'].map((i) => ({ valor: i, etiqueta: i }));

function SelectDemo({ inicial, ...props }) {
  const [valor, setValor] = useState(inicial);
  return <Select {...props} valor={valor} onCambio={setValor} />;
}

function montar(id, elemento) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(elemento);
}

montar('r-select-simple', <SelectDemo aria-label="Modalidad" opciones={MODALIDADES} inicial="hibrido" />);
montar('r-select-buscable', <SelectDemo aria-label="Departamento" opciones={DEPARTAMENTOS} buscable placeholder="Elegí un departamento" />);
montar('r-select-multiple', <SelectDemo aria-label="Idiomas" opciones={IDIOMAS} multiple inicial={['Español', 'Inglés', 'Portugués']} />);
montar('r-select-invalido', <SelectDemo aria-label="Jornada" opciones={MODALIDADES} invalido placeholder="Falta elegir la jornada" />);
montar('r-select-deshabilitado', <SelectDemo aria-label="Moneda" opciones={[{ valor: 'UYU', etiqueta: 'Pesos uruguayos' }]} inicial="UYU" deshabilitado />);

// Buscador (en la barra lateral y en su sección) y paleta: una sola app con portales.
function Paleta() {
  const [abierta, setAbierta] = useState(false);
  usarAtajo('k', () => setAbierta((a) => !a));

  const secciones = [...document.querySelectorAll('.demo-nav a.barra-lateral-item')].map((a) => ({
    id: a.getAttribute('href'),
    etiqueta: a.querySelector('.barra-lateral-texto')?.textContent ?? a.textContent,
    detalle: a.closest('details')?.querySelector('summary')?.textContent ?? '',
    onElegir: () => document.querySelector(a.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  }));
  const temas = TEMAS.map((t) => ({
    id: `tema-${t.id}`,
    etiqueta: `Tema ${t.nombre.toLowerCase()}`,
    detalle: t.detalle,
    palabras: ['tema', 'color', t.id],
    onElegir: () => window.dispatchEvent(new CustomEvent('demo-tema', { detail: t.id })),
  }));
  const densidades = [
    { id: 'densidad-compacta', etiqueta: 'Densidad compacta', detalle: '32 px', palabras: ['densidad', 'tamaño'], onElegir: () => window.dispatchEvent(new CustomEvent('demo-densidad', { detail: 'compacta' })) },
    { id: 'densidad-comoda', etiqueta: 'Densidad cómoda', detalle: '40 px', palabras: ['densidad', 'tamaño'], onElegir: () => window.dispatchEvent(new CustomEvent('demo-densidad', { detail: 'comoda' })) },
  ];
  const grupos = [
    { titulo: 'Secciones', items: secciones },
    { titulo: 'Densidad', items: densidades },
    { titulo: 'Tema', items: temas },
  ];
  const abrir = () => setAbierta(true);

  return (
    <>
      {[...document.querySelectorAll('[data-buscador]')].map((el) =>
        createPortal(<Buscador onAbrir={abrir} texto={el.dataset.buscador} />, el, el.id)
      )}
      <PaletaComandos abierta={abierta} onCerrar={() => setAbierta(false)} grupos={grupos} />
    </>
  );
}
montar('r-paleta', <Paleta />);

