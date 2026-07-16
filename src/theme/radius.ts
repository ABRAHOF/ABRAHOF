/**
 * Raios de borda.
 *
 * O projeto de referência define `--radius: 1rem` (16) e deriva os demais
 * valores dele: sm = raio − 4, md = raio − 2, xl = raio + 4, 2xl = raio + 8.
 */

const BASE = 16;

export const Raios = {
  /** 12 — selos e chips. */
  sm: BASE - 4,
  /** 14 — ícones pequenos. */
  md: BASE - 2,
  /** 16 — botões e campos. */
  lg: BASE,
  /** 20 — blocos de destaque. */
  xl: BASE + 4,
  /** 24 — cartões. */
  xxl: BASE + 8,
  /** Pílulas e elementos circulares. */
  total: 999,
} as const;
