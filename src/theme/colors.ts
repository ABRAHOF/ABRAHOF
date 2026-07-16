/**
 * Paleta do aplicativo.
 *
 * Identidade clara e institucional: branco de fundo, azul de destaque, cinza
 * claro nas bordas e azul-escuro nos textos. Substitui a paleta escura herdada
 * do projeto de referência (ciano sobre azul-marinho) — ver docs/DECISOES.md
 * (ADR-0009, que substitui a ADR-0005).
 *
 * Os tokens são nomeados pelo papel que cumprem, nunca pela cor: um `azul4`
 * espalhado pelo código envelhece na primeira troca de identidade. Foi
 * justamente essa disciplina que permitiu trocar a paleta inteira mexendo só
 * neste arquivo, sem tocar em nenhum componente.
 *
 * Todos os pares em uso foram medidos (WCAG 2.1). Os valores estão anotados
 * abaixo — contraste se calcula, não se estima.
 *
 * O aplicativo é claro. Não há modo escuro.
 */

export const Cores = {
  /** Fundo das telas. */
  fundo: '#FFFFFF',
  /** Superfície elevada: cartões, campos, caixas. Distingue-se do branco. */
  superficie: '#F8FAFC',
  /** Superfície de apoio: molduras, selos neutros, marcador de imagem ausente. */
  superficieAlta: '#E8EDF1',

  /**
   * Cor de marca. Ações principais, ícones ativos, destaques.
   *
   * 4,55:1 sobre o fundo branco — passa em AA para texto e para elemento
   * gráfico.
   */
  primaria: '#147DB3',
  /** Variação escura: fim do degradê de destaque, estados ativos. */
  primariaEscura: '#0F6690',
  /**
   * Azul claro de acento.
   *
   * **Só como fundo ou detalhe decorativo.** Rende 2,55:1 sobre branco, abaixo
   * do mínimo de 3:1 — não serve para ícone, texto nem borda que precise ser
   * percebida.
   */
  primariaClara: '#18AEE5',
  /** Conteúdo sobre a primária. Branco: 4,55:1 sobre #147DB3. */
  sobrePrimaria: '#FFFFFF',

  /** Texto principal. Azul-escuro: 13,3:1 sobre branco. */
  texto: '#123247',
  /** Texto de apoio: descrições, legendas, rótulos. 4,75:1 sobre branco. */
  textoSuave: '#667580',

  /**
   * Bordas e divisores.
   *
   * 1,3:1 — sutil de propósito. Só é aceitável porque nunca é o único
   * indicador: cartão tem também superfície própria e sombra.
   */
  borda: '#DCE3E8',

  /**
   * Fundo do estado pressionado.
   *
   * Num tema claro, reduzir a opacidade de um cartão quase branco sobre fundo
   * branco quase não muda nada — o toque fica sem retorno. Por isso as
   * superfícies pressionadas trocam de cor em vez de esmaecer.
   */
  pressionado: '#E8F5FB',

  /** Erro e ações destrutivas. 5,6:1 sobre branco. */
  erro: '#C62828',
  /** Conteúdo sobre a cor de erro. */
  sobreErro: '#FFFFFF',
} as const;

/**
 * Degradês.
 *
 * Registrados como pares porque ainda não são aplicados: renderizar degradê
 * exige `expo-linear-gradient`, dependência sem justificativa nesta etapa.
 */
export const Degrades = {
  /** Botões e ícones de destaque. */
  destaque: [Cores.primaria, Cores.primariaEscura],
  /** Fundo das telas. */
  fundo: [Cores.fundo, '#F5F7FA'],
  /** Títulos em degradê. */
  texto: [Cores.primaria, Cores.primariaClara],
} as const;

/** Opacidade aplicada a elementos desabilitados. */
export const OPACIDADE_DESABILITADO = 0.4;

/**
 * Opacidade do toque.
 *
 * Vale para elementos com cor sólida forte — botão primário, ícone. Superfícies
 * claras usam `Cores.pressionado`, que é visível onde a opacidade não seria.
 */
export const OPACIDADE_PRESSIONADO = 0.7;
