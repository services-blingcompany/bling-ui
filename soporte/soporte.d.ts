export type EstadoTicket = 'open' | 'in_progress' | 'resolved' | 'closed';
export type Tono = 'info' | 'alerta' | 'exito' | 'neutro';

export interface AdjuntoSoporte {
  url: string;
  filename?: string;
  type?: string;
  size?: number;
  metadata?: Record<string, unknown> | null;
}

export interface MensajeSoporte {
  id?: number;
  content?: string | null;
  sender_id?: number | null;
  attachments?: AdjuntoSoporte[] | null;
  created_at: string;
  is_deleted?: boolean;
  is_edited?: boolean;
  edited_at?: string | null;
}

export const MAX_CAPTURAS: number;
export const CORREO_SOPORTE: string;
export const ESTADOS: Record<EstadoTicket, { texto: string; tono: Tono }>;
export function estado(valor: string): { texto: string; tono: Tono };
export function acciones(valor: string): { responder: boolean; cerrar: boolean; reabrir: boolean };

export const TIPO_PEDIDO_DIAGNOSTICO: string;
export const TEXTO_DIAGNOSTICO_ENVIADO: string;
export function esPedidoDiagnostico(adjunto: unknown): boolean;
export function adjuntosVisibles<A extends AdjuntoSoporte>(mensaje: { attachments?: A[] | null } | null | undefined): A[];
export function traePedido(mensaje: { attachments?: AdjuntoSoporte[] | null } | null | undefined): boolean;
export function pedidoPendiente(mensajes: MensajeSoporte[] | null | undefined, miId: number | null): boolean;
export function puedeEditar(mensaje: MensajeSoporte | null | undefined, miId: number | null | undefined, estadoTicket: string): boolean;
export function textoEditado(mensaje: MensajeSoporte | null | undefined, ahora?: Date): string;
export function ordenarMensajes<M extends MensajeSoporte>(mensajes: M[] | null | undefined): M[];

export interface EntradaDiagnostico {
  aplicacion?: string;
  sistema?: string;
  navegador?: string;
  idioma?: string;
  zonaHoraria?: string;
  pantalla?: string;
  url?: string;
  errores?: unknown[];
}
export function datosDiagnostico(entrada?: EntradaDiagnostico): Record<string, unknown>;
export function datosDelNavegador(aplicacion: string, errores?: unknown[]): Record<string, unknown>;
