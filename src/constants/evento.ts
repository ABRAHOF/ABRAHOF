/**
 * Evento em destaque na tela inicial.
 *
 * Dados mockados, centralizados aqui em vez de escritos na tela: no projeto web
 * essas frases estão fixas dentro do componente, então corrigir uma data exige
 * uma nova versão do aplicativo — e o texto envelhece sozinho. Passado o CIOSP
 * 2026, a tela continuará anunciando "20 a 25 de Janeiro".
 *
 * Deve vir do banco quando houver uma tabela de destaque.
 * Ver docs/REQUISITOS.md §1 e docs/BACKLOG.md, Sprint 3.
 */
export const EVENTO_DESTAQUE = {
  nome: 'ABRAHOF',
  periodo: '20 a 25 de Janeiro | CIOSP 2026',
  chamada: 'Uma celebração da excelência em Harmonização Orofacial',
} as const;

/** Selo exibido ao final da tela inicial. */
export const SELO_OFICIAL = {
  titulo: 'APLICATIVO OFICIAL',
  descricao: 'Associação Brasileira de Harmonização Orofacial',
} as const;
