/**
 * @blingcompany/bling-ui — Preset para Tailwind 3.
 *
 *   // tailwind.config.ts
 *   import blingUi from '@blingcompany/bling-ui/tailwind/preset';
 *   export default { presets: [blingUi], content: [...] };
 *
 * Cada color apunta a una variable que sigue al tema del <html> (ver
 * css/tokens.css); `color-mix` conserva los modificadores de opacidad
 * (`bg-gray-900/50`).
 *   · Grises (slate, gray, zinc, stone, neutral) → la rampa neutra del tema.
 *   · Familias de color de Tailwind → los tonos del tema.
 *   · Roles: bg, surface, ink, muted, line, strong, success/warning/danger/info…
 *   · Paleta institucional: bling-* y nc-* (colors.cjs).
 */
const { BlingColors } = require('../colors.cjs');

const delTema = (variable) =>
  `color-mix(in srgb, var(${variable}) calc(<alpha-value> * 100%), transparent)`;

const PASOS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const rampa = (prefijo, pasos) =>
  Object.fromEntries(
    [...pasos, 950].map((paso) => [
      paso,
      delTema(`--${prefijo}-${pasos.includes(paso) ? paso : pasos[pasos.length - 1]}`),
    ]),
  );

const grises = Object.fromEntries(
  ['slate', 'gray', 'zinc', 'stone', 'neutral'].map((g) => [g, rampa('rama', [...PASOS, 950])]),
);
const familias = Object.fromEntries(
  ['amber', 'blue', 'cyan', 'emerald', 'fuchsia', 'green', 'indigo', 'lime', 'orange', 'pink',
    'purple', 'red', 'rose', 'sky', 'teal', 'violet', 'yellow'].map((f) => [f, rampa(`color-${f}`, PASOS)]),
);
const roles = Object.fromEntries(
  ['bg', 'bg-soft', 'ink', 'ink-soft', 'muted', 'placeholder', 'surface', 'surface-2', 'line',
    'strong', 'strong-hover', 'strong-soft', 'strong-line', 'on-strong', 'on-strong-muted',
    'brand', 'brand-hover', 'brand-line', 'on-brand', 'primary', 'primary-hover', 'primary-soft',
    'primary-line', 'acento', 'acento-texto', 'acento-bg', 'lienzo', 'punto',
    ...['success', 'warning', 'danger', 'info', 'tips'].flatMap((s) =>
      [s, `${s}-bg`, `${s}-soft`, `${s}-line`, `${s}-fill`]),
  ].map((r) => [r, delTema(`--color-${r}`)]),
);

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: { ...BlingColors, ...grises, ...familias, ...roles },
      borderRadius: {
        control: 'var(--radio-control)',
        panel: 'var(--radio-panel)',
      },
      fontSize: {
        rotulo: ['var(--texto-rotulo)', 'var(--interlineado-rotulo)'],
        cuerpo: ['var(--texto-base)', 'var(--interlineado-base)'],
        titulo: ['var(--texto-titulo)', 'var(--interlineado-titulo)'],
        cifra: ['var(--texto-cifra)', 'var(--interlineado-cifra)'],
      },
      // Sólo la mono (Obel Mono, servida por el paquete). La sans la carga cada
      // app a su manera (next/font la registra con otro nombre interno).
      fontFamily: {
        mono: ['var(--font-mono)'],
      },
    },
  },
};
