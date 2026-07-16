/**
 * Paleta do aplicativo.
 *
 * Os valores são os do CSS do projeto de referência, mantidos em HSL — o React
 * Native aceita `hsl()` como cor, então não há conversão e nem arredondamento
 * entre a origem e o app.
 *
 * Os tokens são nomeados pelo papel que cumprem, nunca pela cor. O projeto de
 * referência chamava de `gold` e `forest` classes que produzem ciano e
 * azul-marinho — nomes herdados de um tema anterior. Ver docs/DECISOES.md
 * (ADR-0005).
 *
 * O aplicativo é escuro. Não há modo claro.
 */

export const Cores = {
  /** Fundo das telas. */
  fundo: 'hsl(210, 50%, 12%)',
  /** Superfície elevada: cartões, campos, caixas. */
  superficie: 'hsl(210, 45%, 16%)',
  /** Superfície de elementos secundários: botões neutros, chips. */
  superficieAlta: 'hsl(210, 40%, 22%)',

  /** Cor de marca. Ações principais, ícones ativos, destaques. */
  primaria: 'hsl(195, 85%, 50%)',
  /** Variação escura da primária: fim do degradê de destaque. */
  primariaEscura: 'hsl(195, 80%, 40%)',
  /** Variação clara da primária: fim do degradê de texto. */
  primariaClara: 'hsl(195, 90%, 60%)',
  /** Conteúdo sobre a primária. */
  sobrePrimaria: 'hsl(210, 50%, 10%)',

  /** Texto principal. */
  texto: 'hsl(200, 20%, 95%)',
  /** Texto de apoio: descrições, legendas, rótulos. */
  textoSuave: 'hsl(210, 20%, 55%)',

  /** Bordas e divisores. */
  borda: 'hsl(210, 35%, 24%)',

  /** Erro e ações destrutivas. */
  erro: 'hsl(0, 72%, 51%)',
  /** Conteúdo sobre a cor de erro. */
  sobreErro: 'hsl(0, 0%, 100%)',
} as const;

/**
 * Degradês do projeto de referência.
 *
 * Registrados como pares de cores porque ainda não são aplicados: renderizar
 * degradê exige `expo-linear-gradient`, dependência que não se justifica nesta
 * etapa. Até lá as superfícies usam cor sólida. Ver docs/BACKLOG.md.
 */
export const Degrades = {
  /** Botões e ícones de destaque. Diagonal, 135°. */
  destaque: [Cores.primaria, Cores.primariaEscura],
  /** Fundo das telas. Vertical. */
  fundo: ['hsl(210, 50%, 14%)', 'hsl(210, 55%, 8%)'],
  /** Títulos em degradê. Diagonal, 135°. */
  texto: [Cores.primaria, Cores.primariaClara],
} as const;

/** Opacidade aplicada a elementos desabilitados. */
export const OPACIDADE_DESABILITADO = 0.4;

/** Opacidade aplicada durante o toque. */
export const OPACIDADE_PRESSIONADO = 0.7;
