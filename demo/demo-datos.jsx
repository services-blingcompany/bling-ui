// Gráficas, indicadores y tabla de la demo (se compila junto con demo-react.jsx).
import { createRoot } from 'react-dom/client';
import { BarraSegmentada, GraficoBarras, GraficoLineas, Tabla, TarjetaIndicador } from '../react-src/index.jsx';

function montar(id, elemento) {
  const el = document.getElementById(id);
  if (el) createRoot(el).render(elemento);
}
const pesos = (n) => `$ ${new Intl.NumberFormat('es-UY', { maximumFractionDigits: 0 }).format(n)}`;

montar(
  'r-indicadores',
  <>
    <TarjetaIndicador etiqueta="Vacantes activas" valor={1284} delta={8.4} periodo="vs. octubre" tendencia={[820, 860, 910, 900, 980, 1010, 1060, 1100, 1150, 1190, 1240, 1284]} />
    <TarjetaIndicador etiqueta="Postulaciones" valor={15902} delta={12.1} periodo="vs. octubre" tendencia={[9100, 9800, 10400, 10200, 11300, 12000, 12600, 13100, 13900, 14600, 15200, 15902]} />
    <TarjetaIndicador etiqueta="Tiempo hasta contratar" valor="18 días" delta={-6.5} periodo="vs. octubre" subirEsBueno={false} tendencia={[26, 25, 25, 24, 23, 23, 22, 21, 20, 20, 19, 18]} />
    <TarjetaIndicador etiqueta="Bajas de suscripción" valor={42} delta={3.2} periodo="vs. octubre" subirEsBueno={false} tendencia={[30, 33, 31, 35, 34, 36, 38, 37, 39, 40, 41, 42]} />
  </>
);

const SEMANAS = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12'];
montar(
  'r-lineas',
  <GraficoLineas
    titulo="Postulaciones por semana"
    tituloCategoria="Semana"
    categorias={SEMANAS}
    area
    series={[
      { nombre: 'Montevideo', valores: [320, 340, 390, 410, 380, 450, 470, 520, 540, 510, 580, 620] },
      { nombre: 'Interior', valores: [140, 150, 160, 190, 210, 200, 230, 250, 240, 270, 290, 310] },
    ]}
  />
);
montar(
  'r-barras',
  <GraficoBarras
    titulo="Vacantes por departamento"
    tituloCategoria="Departamento"
    categorias={['Montevideo', 'Canelones', 'Maldonado', 'Colonia', 'Salto', 'Paysandú']}
    series={[
      { nombre: 'Octubre', valores: [480, 160, 120, 60, 45, 38] },
      { nombre: 'Noviembre', valores: [530, 175, 150, 64, 52, 41] },
    ]}
  />
);
montar(
  'r-barras-simple',
  <GraficoBarras
    titulo="Ingresos del mes por plan"
    tituloCategoria="Plan"
    categorias={['Individual', 'Estudio', 'Equipo', 'Patrocinios']}
    series={[{ nombre: 'Ingresos', valores: [182000, 264000, 141000, 38000] }]}
    formato={pesos}
    etiquetas
  />
);

const MODALIDAD = [
  { nombre: 'Presencial', valor: 728 },
  { nombre: 'Híbrido', valor: 364 },
  { nombre: 'Remoto', valor: 176 },
  { nombre: 'Por temporada', valor: 16 },
];
montar('r-segmentada', <BarraSegmentada titulo="Vacantes por modalidad" partes={MODALIDAD} />);
montar('r-segmentada-alta', <BarraSegmentada titulo="Vacantes por modalidad" partes={MODALIDAD} alta />);

const PUESTOS = ['Contador/a junior', 'Vendedor/a', 'Recepcionista', 'Mozo/a', 'Barista', 'Mecánico/a', 'Cajero/a', 'Panadero/a', 'Óptico/a', 'Instructor/a'];
const EMPRESAS = ['Estudio Norte', 'Ferretería Sur', 'Clínica Centro', 'Hotel Rambla', 'Café Puerto', 'Taller Oeste', 'Librería Este', 'Panadería Plaza', 'Óptica Prado', 'Gimnasio Parque'];
const DEPTOS = ['Montevideo', 'Canelones', 'Montevideo', 'Maldonado', 'Montevideo', 'Salto', 'Colonia', 'Montevideo', 'Canelones', 'Maldonado'];
const POSTULACIONES = [48, 12, 31, 76, 22, 9, 15, 27, 6, 40];
const SUELDOS = [45000, 32000, 36000, 38000, 30000, 42000, 31000, 33000, 52000, 35000];
const ESTADOS = ['Activa', 'Pausada', 'Activa', 'Activa', 'Activa', 'Cerrada', 'Activa', 'Pausada', 'Activa', 'Activa'];
const FILAS = PUESTOS.map((puesto, i) => ({
  id: i + 1,
  puesto,
  empresa: EMPRESAS[i],
  departamento: DEPTOS[i],
  postulaciones: POSTULACIONES[i],
  sueldo: SUELDOS[i],
  estado: ESTADOS[i],
}));
const INSIGNIA = { Activa: 'insignia-exito', Pausada: 'insignia-alerta', Cerrada: '' };

montar(
  'r-tabla',
  <Tabla
    etiqueta="Vacantes"
    filas={FILAS}
    seleccionable
    altoMaximo={300}
    ordenInicial={{ clave: 'postulaciones', sentido: 'desc' }}
    acciones={() => (
      <>
        <button type="button" className="boton boton-secundario boton-sm">
          Pausar
        </button>
        <button type="button" className="boton boton-peligro boton-sm">
          Cerrar
        </button>
      </>
    )}
    columnas={[
      { clave: 'puesto', titulo: 'Puesto' },
      { clave: 'empresa', titulo: 'Empresa' },
      { clave: 'departamento', titulo: 'Departamento' },
      { clave: 'estado', titulo: 'Estado', render: (f) => <span className={`insignia ${INSIGNIA[f.estado]}`.trim()}>{f.estado}</span> },
      { clave: 'postulaciones', titulo: 'Postulaciones', num: true },
      { clave: 'sueldo', titulo: 'Sueldo', num: true, render: (f) => pesos(f.sueldo) },
    ]}
  />
);
