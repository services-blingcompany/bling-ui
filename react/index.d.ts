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
