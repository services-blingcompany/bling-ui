#!/usr/bin/env node
/** Pruebas de soporte/soporte.js (node scripts/probar-soporte.mjs). */
import assert from 'node:assert/strict';
import {
  acciones,
  adjuntosVisibles,
  datosDiagnostico,
  estado,
  ordenarMensajes,
  pedidoPendiente,
  TEXTO_DIAGNOSTICO_ENVIADO,
  TIPO_PEDIDO_DIAGNOSTICO,
  puedeEditar,
  textoEditado,
} from '../soporte/soporte.js';

// Resuelto se reabre; cerrado es definitivo.
assert.deepEqual(acciones('open'), { responder: true, cerrar: true, reabrir: false });
assert.deepEqual(acciones('in_progress'), { responder: true, cerrar: true, reabrir: false });
assert.deepEqual(acciones('resolved'), { responder: false, cerrar: false, reabrir: true });
assert.deepEqual(acciones('closed'), { responder: false, cerrar: false, reabrir: false });
assert.equal(estado('raro').texto, 'Abierto');

const pedido = { url: 'bling:pedido_diagnostico', type: TIPO_PEDIDO_DIAGNOSTICO };
const foto = { url: '/uploads/a.avif', type: 'image/avif' };
assert.deepEqual(adjuntosVisibles({ attachments: [pedido, foto] }), [foto]);

const msgs = [
  { sender_id: 1, content: 'No anda', created_at: '2026-01-01T10:00:00Z' },
  { sender_id: 9, content: 'Mandanos la info', attachments: [pedido], created_at: '2026-01-01T10:05:00Z' },
];
assert.equal(pedidoPendiente(msgs, 1), true);
assert.equal(pedidoPendiente([...msgs, { sender_id: 1, content: TEXTO_DIAGNOSTICO_ENVIADO, created_at: '2026-01-01T10:06:00Z' }], 1), false);
assert.equal(pedidoPendiente([msgs[0]], 1), false);

assert.deepEqual(
  ordenarMensajes([{ content: 'b', created_at: '2' }, { content: '', created_at: '0' }, { content: 'a', created_at: '1' }]).map((m) => m.content),
  ['a', 'b'],
);

const d = datosDiagnostico({ aplicacion: 'X 1.0', sistema: '', errores: ['e1'] });
assert.deepEqual(d, { Aplicación: 'X 1.0', 'Últimos errores': ['e1'] });

// Editar: sólo lo propio, con el ticket abierto, y nunca el aviso automático.
const mio = { sender_id: 1, content: 'Hola', created_at: '2026-01-01T10:00:00Z' };
assert.equal(puedeEditar(mio, 1, 'open'), true);
assert.equal(puedeEditar(mio, 2, 'open'), false);
assert.equal(puedeEditar(mio, 1, 'resolved'), false);
assert.equal(puedeEditar({ ...mio, content: TEXTO_DIAGNOSTICO_ENVIADO }, 1, 'open'), false);
const ahora = new Date('2026-01-01T15:00:00');
assert.equal(textoEditado(mio, ahora), '');
assert.match(textoEditado({ ...mio, is_edited: true, edited_at: '2026-01-01T14:32:00' }, ahora), /^editado \d{2}:\d{2}$/);
assert.match(textoEditado({ ...mio, is_edited: true, edited_at: '2025-12-30T09:05:00' }, ahora), /^editado 30\/12 \d{2}:\d{2}$/);

console.log('soporte: ok');
