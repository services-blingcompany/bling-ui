export type TemaOficial = 'light' | 'dark' | 'amoled' | 'corporate' | 'horizon' | 'daltonico';
export type Tema = TemaOficial | 'system';

export interface InfoTema {
  id: TemaOficial;
  nombre: string;
  detalle: string;
  claro: boolean;
  muestra: { fondo: string; superficie: string; acento: string; texto: string };
}

export declare const TEMAS: InfoTema[];
export declare const IDS_TEMAS: TemaOficial[];
export declare const CLAVE_GUARDADO: 'bling-theme';
export declare function normalizarTema(valor: string | null | undefined): Tema | null;
export declare function resolverTema(tema: Tema): TemaOficial;
export declare function esTemaClaro(tema: Tema): boolean;
export declare function aplicarTema(tema: Tema | string | null | undefined, html?: HTMLElement | null): void;
export declare function dominioCompartido(host?: string): '.bling.uy' | '';
export declare function temaGuardado(): Tema | null;
export declare function guardarTema(tema: Tema): void;
export declare function scriptTemaInicial(porDefecto?: TemaOficial): string;
