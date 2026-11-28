// Demo de bling-ui: selector de temas y lo poco que necesita moverse.
import { TEMAS, aplicarTema, guardarTema, temaGuardado } from '../tema/tema.js';

// Temas: los seis del paquete más «según el sistema».
const contenedor = document.getElementById('temas');
const opciones = [...TEMAS.map((t) => ({ id: t.id, nombre: t.nombre })), { id: 'system', nombre: 'Sistema' }];
let actual = temaGuardado() ?? 'light';

function elegirTema(id) {
  actual = id;
  aplicarTema(id);
  guardarTema(id);
  pintarTemas();
}
function pintarTemas() {
  contenedor.replaceChildren(
    ...opciones.map((o) => {
      const b = document.createElement('button');
      b.className = 'pestana';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(o.id === actual));
      b.textContent = o.nombre;
      b.addEventListener('click', () => elegirTema(o.id));
      return b;
    })
  );
}
aplicarTema(actual);
pintarTemas();
window.addEventListener('demo-tema', (e) => elegirTema(e.detail));

// Densidad: compacta (por defecto) o cómoda, recordada en este navegador.
const densidades = document.getElementById('densidades');
function elegirDensidad(d) {
  if (d === 'comoda') document.documentElement.dataset.densidad = 'comoda';
  else delete document.documentElement.dataset.densidad;
  densidades.querySelectorAll('.pestana').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.densidad === d)));
  try {
    localStorage.setItem('bling-ui-demo-densidad', d);
  } catch {
    /* sin almacenamiento */
  }
}
densidades.addEventListener('click', (e) => {
  const b = e.target.closest('.pestana');
  if (b) elegirDensidad(b.dataset.densidad);
});
window.addEventListener('demo-densidad', (e) => elegirDensidad(e.detail));
try {
  elegirDensidad(localStorage.getItem('bling-ui-demo-densidad') || 'compacta');
} catch {
  elegirDensidad('compacta');
}

// Sección activa en la barra lateral mientras se desplaza.
const enlaces = new Map([...document.querySelectorAll('.demo-nav a.barra-lateral-item')].map((a) => [a.getAttribute('href').slice(1), a]));
const observador = new IntersectionObserver(
  (entradas) => {
    const visible = entradas.filter((x) => x.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    const enlace = enlaces.get(visible.target.id);
    if (!enlace) return;
    enlaces.forEach((a) => a.removeAttribute('aria-current'));
    enlace.setAttribute('aria-current', 'page');
  },
  { root: document.querySelector('.demo-contenido'), rootMargin: '-90px 0px -60% 0px' }
);
enlaces.forEach((_, id) => {
  const seccion = document.getElementById(id);
  if (seccion) observador.observe(seccion);
});

// Campo compuesto: ver la contraseña y sumar o restar días.
const clave = document.getElementById('clave');
document.getElementById('ver-clave').addEventListener('click', (e) => {
  const ver = clave.type === 'password';
  clave.type = ver ? 'text' : 'password';
  e.currentTarget.setAttribute('aria-label', ver ? 'Ocultar la contraseña' : 'Ver la contraseña');
});
const dias = document.getElementById('dias');
document.querySelectorAll('[data-paso]').forEach((b) => {
  b.addEventListener('click', () => {
    dias.value = String(Math.min(90, Math.max(1, (Number(dias.value) || 0) + Number(b.dataset.paso))));
  });
});

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
