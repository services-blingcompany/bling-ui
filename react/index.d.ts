import type { CSSProperties, JSX } from 'react';

export interface LogoProps {
  /** Alto en px (el ancho sale de la proporción del logo). */
  alto?: number;
  titulo?: string;
  className?: string;
  style?: CSSProperties;
}
export declare function Logo(props: LogoProps): JSX.Element;

export type VarianteCargador = 'rayas' | 'barras' | 'puntos' | 'anillo' | 'onda' | 'linea';
export interface CargadorProps {
  variante?: VarianteCargador;
  tam?: 'sm' | 'md' | 'lg';
  /** Usa el color de marca en vez del color del texto. */
  deMarca?: boolean;
  etiqueta?: string;
  className?: string;
}
export declare function Cargador(props: CargadorProps): JSX.Element;
export declare function PantallaDeCarga(props: { mensaje?: string; variante?: VarianteCargador }): JSX.Element;

export type TipoReporte = 'bug' | 'suggestion' | 'other';
export interface Reporte {
  type: TipoReporte;
  title: string;
  description: string;
  email?: string;
  evidence_urls?: string[];
  meta: Record<string, string>;
}
export interface ClienteReportes {
  subirImagen(archivo: File): Promise<string>;
  enviar(reporte: Reporte): Promise<unknown>;
}
/** Cliente de /api/v1/reports. apiBase: origen del backend, o '' si la app lo expone en /api. */
export declare function crearClienteReportes(apiBase?: string): ClienteReportes;
export declare function metaDelEntorno(app: string): Record<string, string>;

export interface ReportarProblemaProps {
  abierto: boolean;
  onCerrar: () => void;
  /** Nombre de la app que reporta (auth, dashboard, jobs…): llega en meta.app. */
  app: string;
  cliente: ClienteReportes;
  tipoInicial?: TipoReporte;
  /** Muestra el campo de correo (para quien no inició sesión). */
  pedirEmail?: boolean;
  emailInicial?: string;
}
export declare function ReportarProblema(props: ReportarProblemaProps): JSX.Element | null;

/* ── Controles (0.7) ─────────────────────────────────────────────────── */

export interface OpcionSelect<V = string> {
  valor: V;
  etiqueta: string;
  /** Texto chico a la derecha (p. ej. un código o una cantidad). */
  detalle?: string;
  /** Las opciones con el mismo grupo seguidas se muestran bajo ese título. */
  grupo?: string;
  deshabilitada?: boolean;
}
interface SelectBase<V> {
  opciones: OpcionSelect<V>[];
  /** Agrega un buscador arriba de la lista. */
  buscable?: boolean;
  placeholder?: string;
  sinResultados?: string;
  deshabilitado?: boolean;
  invalido?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}
export interface SelectSimpleProps<V = string> extends SelectBase<V> {
  multiple?: false;
  valor?: V | null;
  onCambio?: (valor: V) => void;
}
export interface SelectMultipleProps<V = string> extends SelectBase<V> {
  multiple: true;
  valor?: V[];
  onCambio?: (valores: V[]) => void;
}
export declare function Select<V = string>(props: SelectSimpleProps<V> | SelectMultipleProps<V>): JSX.Element;

export interface BuscadorProps {
  onAbrir?: () => void;
  texto?: string;
  /** Texto del atajo; por defecto «Ctrl K» (o «⌘ K» en Mac). null lo oculta. */
  atajo?: string | null;
  className?: string;
}
export declare function Buscador(props: BuscadorProps): JSX.Element;

export interface ItemPaleta {
  id?: string;
  etiqueta: string;
  detalle?: string;
  icono?: import('react').ReactNode;
  atajo?: string;
  /** Otras palabras con las que se encuentra. */
  palabras?: string[];
  onElegir?: () => void;
}
export interface PaletaComandosProps {
  abierta: boolean;
  onCerrar?: () => void;
  grupos: { titulo: string; items: ItemPaleta[] }[];
  placeholder?: string;
  sinResultados?: string;
}
export declare function PaletaComandos(props: PaletaComandosProps): JSX.Element | null;

/** Ejecuta la acción con Ctrl+tecla (⌘+tecla en Mac); con conModificador=false, con la tecla sola. */
export declare function usarAtajo(tecla: string, accion: (e: KeyboardEvent) => void, opciones?: { conModificador?: boolean }): void;
