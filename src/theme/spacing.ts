/**
 * Escala de espaçamento, em múltiplos de 4.
 *
 * Derivada dos valores usados no projeto de referência (Tailwind: gap-2, p-4,
 * px-6…). Todo espaçamento do aplicativo sai daqui.
 */

export const Espacamentos = {
  /** 4 — separação mínima entre elementos colados. */
  xs: 4,
  /** 8 — entre rótulo e campo, ícone e texto. */
  sm: 8,
  /** 12 — entre itens de uma lista densa. */
  md: 12,
  /** 16 — padding interno padrão de cartões. */
  lg: 16,
  /** 24 — padding das telas. */
  xl: 24,
  /** 32 — separação entre seções. */
  xxl: 32,
} as const;

/**
 * Alvo mínimo de toque, em pontos.
 *
 * Vale para todo elemento pressionável. As diretrizes de Apple e Google pedem
 * 44 e 48 respectivamente; 44 atende às duas com `hitSlop` quando necessário.
 */
export const ALVO_TOQUE_MINIMO = 44;

/** Altura padrão de campos e botões. */
export const ALTURA_CONTROLE = 48;
