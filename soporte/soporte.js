/**
 * Lógica común del soporte del lado del usuario (dashboard, launcher y lo que
 * venga). Sin React ni red: cada app pone su diseño y su forma de hablar con
 * el backend; acá vive lo que tiene que ser igual en todos lados.
 *
 * Estados de un ticket (los deriva el backend del chat):
 *   open → in_progress → resolved (se puede reabrir) → closed (definitivo).
 */

/** Tope de capturas por mensaje (lo valida el backend). */
export const MAX_CAPTURAS = 4;

/** Correo de soporte (support@ es un alias de hello@). */
export const CORREO_SOPORTE = 'support@bling.uy';

/** Textos de cada estado para el usuario. */
export const ESTADOS = {
  open: { texto: 'Abierto', tono: 'info' },
  in_progress: { texto: 'En curso', tono: 'alerta' },
  resolved: { texto: 'Resuelto', tono: 'exito' },
  closed: { texto: 'Cerrado', tono: 'neutro' },
};

export function estado(valor) {
  return ESTADOS[valor] ?? ESTADOS.open;
}

/**
 * Qué puede hacer el usuario con su ticket. Un ticket resuelto se reabre; uno
 * cerrado ya no (el backend responde 403), así que no se ofrece.
 */
export function acciones(valor) {
  const abierto = valor === 'open' || valor === 'in_progress' || !ESTADOS[valor];
  return {
    responder: abierto,
    cerrar: abierto,
    reabrir: valor === 'resolved',
  };
}

/** Marca del mensaje con el que el staff pide la información del sistema. */
export const TIPO_PEDIDO_DIAGNOSTICO = 'application/x-bling-pedido-diagnostico';

/** Texto del mensaje que publica el backend cuando el usuario la manda. */
export const TEXTO_DIAGNOSTICO_ENVIADO = 'Envié la información del sistema.';

export function esPedidoDiagnostico(adjunto) {
  if (!adjunto || typeof adjunto !== 'object') return false;
  return adjunto.type === TIPO_PEDIDO_DIAGNOSTICO || adjunto.metadata?.tipo === 'pedido_diagnostico';
}

/** Adjuntos que se muestran como archivo o imagen (sin el pedido, que es una marca). */
export function adjuntosVisibles(mensaje) {
  return (mensaje?.attachments ?? []).filter((a) => a && !esPedidoDiagnostico(a) && typeof a.url === 'string');
}

/** El mensaje trae el pedido de información del sistema. */
export function traePedido(mensaje) {
  return (mensaje?.attachments ?? []).some(esPedidoDiagnostico);
}

/**
 * Hay un pedido de información del sistema sin contestar: el último pedido
 * llegó después de la última vez que el usuario la mandó.
 */
export function pedidoPendiente(mensajes, miId) {
  let ultimoPedido = -1;
  let ultimoEnvio = -1;
  (mensajes ?? []).forEach((m, i) => {
    if (traePedido(m)) ultimoPedido = i;
    if (m.sender_id === miId && (m.content ?? '').trim() === TEXTO_DIAGNOSTICO_ENVIADO) ultimoEnvio = i;
  });
  return ultimoPedido > ultimoEnvio;
}

/** Mensajes en orden de llegada, sin borrados ni vacíos. */
export function ordenarMensajes(mensajes) {
  return [...(mensajes ?? [])]
    .filter((m) => m && !m.is_deleted && ((m.content ?? '').trim() || (m.attachments ?? []).length > 0))
    .sort((a, b) => String(a.created_at).localeCompare(String(b.created_at)));
}

/** Datos del sistema que manda el usuario cuando se los piden (sin datos personales). */
export function datosDiagnostico({ aplicacion, sistema, navegador, idioma, zonaHoraria, pantalla, url, errores } = {}) {
  const datos = {};
  const poner = (clave, valor) => {
    if (valor === undefined || valor === null || valor === '') return;
    datos[clave] = typeof valor === 'string' ? valor.slice(0, 500) : valor;
  };
  poner('Aplicación', aplicacion);
  poner('Sistema', sistema);
  poner('Navegador', navegador);
  poner('Idioma', idioma);
  poner('Zona horaria', zonaHoraria);
  poner('Pantalla', pantalla);
  poner('Página', url);
  if (Array.isArray(errores) && errores.length) {
    poner('Últimos errores', errores.slice(-10).map((e) => String(e).slice(0, 300)));
  }
  return datos;
}

/** Datos del navegador (dashboard y apps web). */
export function datosDelNavegador(aplicacion, errores) {
  if (typeof window === 'undefined') return datosDiagnostico({ aplicacion, errores });
  let zonaHoraria = '';
  try {
    zonaHoraria = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    zonaHoraria = '';
  }
  return datosDiagnostico({
    aplicacion,
    navegador: navigator.userAgent,
    idioma: navigator.language,
    zonaHoraria,
    pantalla: `${window.screen?.width ?? '?'}×${window.screen?.height ?? '?'}`,
    url: `${location.origin}${location.pathname}`,
    errores,
  });
}
