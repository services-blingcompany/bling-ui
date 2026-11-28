// Demo de bling-ui: selector de temas y lo poco que necesita moverse.
import { TEMAS, aplicarTema, guardarTema, temaGuardado } from '../tema/tema.js';

// Temas: los seis del paquete más «según el sistema».
const contenedor = document.getElementById('temas');
const opciones = [...TEMAS.map((t) => ({ id: t.id, nombre: t.nombre })), { id: 'system', nombre: 'Sistema' }];
let actual = temaGuardado() ?? 'light';

function pintarTemas() {
  contenedor.replaceChildren(
    ...opciones.map((o) => {
      const b = document.createElement('button');
      b.className = 'pestana';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(o.id === actual));
      b.textContent = o.nombre;
      b.addEventListener('click', () => {
        actual = o.id;
        aplicarTema(o.id);
        guardarTema(o.id);
        pintarTemas();
      });
      return b;
    })
  );
}
aplicarTema(actual);
pintarTemas();

fetch('../package.json')
  .then((r) => r.json())
  .then((p) => {
    document.getElementById('version').textContent = `v${p.version}`;
  })
  .catch(() => {});

// Modal
const velo = document.getElementById('velo');
const cerrar = () => {
  velo.hidden = true;
};
document.getElementById('abrir-modal').addEventListener('click', () => {
  velo.hidden = false;
});
document.getElementById('cerrar-modal').addEventListener('click', cerrar);
velo.addEventListener('mousedown', (e) => {
  if (e.target === velo) cerrar();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrar();
});

// Barra lateral: plegar y desplegar
const lateral = document.getElementById('lateral');
document.getElementById('plegar').addEventListener('click', () => {
  lateral.dataset.compacta = lateral.dataset.compacta === 'true' ? 'false' : 'true';
});

// Pestañas y opciones de ejemplo
document.querySelectorAll('main .pestanas').forEach((grupo) => {
  grupo.addEventListener('click', (e) => {
    const b = e.target.closest('.pestana');
    if (!b) return;
    grupo.querySelectorAll('.pestana').forEach((x) => x.setAttribute('aria-selected', String(x === b)));
  });
});
document.querySelectorAll('.demo-chips').forEach((grupo) => {
  grupo.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (b) b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
  });
});
document.querySelectorAll('.demo-opciones').forEach((grupo) => {
  grupo.addEventListener('click', (e) => {
    const b = e.target.closest('.opcion');
    if (!b) return;
    grupo.querySelectorAll('.opcion').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  });
});

// Píldoras: el texto suelto va en un <span> para poder ver su caja.
const pildoras = document.getElementById('pildoras');
pildoras.querySelectorAll('.boton, .insignia').forEach((el) => {
  [...el.childNodes].forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE && n.textContent.trim()) {
      const s = document.createElement('span');
      s.textContent = n.textContent.trim();
      n.replaceWith(s);
    }
  });
});
document.getElementById('ver-cajas').addEventListener('change', (e) => {
  pildoras.classList.toggle('cajas', e.target.checked);
});

// Botón cargando durante 2 segundos
const probar = document.getElementById('probar-carga');
probar.addEventListener('click', () => {
  probar.setAttribute('aria-busy', 'true');
  setTimeout(() => probar.removeAttribute('aria-busy'), 2000);
});

// Notificación que se va sola
document.getElementById('notificar').addEventListener('click', () => {
  const n = document.createElement('div');
  n.className = 'notificacion notificacion-exito';
  n.setAttribute('role', 'status');
  n.innerHTML = '<svg><use href="#i-ok" /></svg><div><p class="aviso-titulo">Vacante publicada</p><p>Ya aparece en jobs.bling.uy.</p></div>';
  document.getElementById('notificaciones').append(n);
  setTimeout(() => n.remove(), 4000);
});
