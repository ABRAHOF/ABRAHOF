/**
 * Conteúdo da Academy.
 *
 * Os campos espelham o que a interface exibe, não a tabela: `academy_cursos`
 * tem `descricao`, `ordem` e `ativo`, que a tela nunca mostra — ordenação e
 * filtro são responsabilidade do serviço, e a tela recebe a lista pronta
 * (docs/ARQUITETURA.md §7).
 */
export type ConteudoAcademy = {
  id: string;
  titulo: string;
  /** Vazio no banco vira "ABRAHOF", como no projeto de referência. */
  instrutor: string;
  /**
   * Texto livre, como no banco (`carga_horaria`). Deveria ser número em
   * minutos: como texto não ordena, não soma e não filtra (docs/BANCO.md §2).
   */
  cargaHoraria?: string;
  /** Miniatura do curso. Virá de `thumbnail_url`. */
  thumbnail?: string;
  /**
   * Destaque de novidade.
   *
   * No projeto de referência o selo "Novo" é dado a quem está na primeira
   * posição da lista (`index === 0`) — regra posicional, não um campo. Mude a
   * ordenação e o selo pula de curso. Aqui é um dado do próprio conteúdo.
   */
  novo?: boolean;
  /**
   * Curso já publicado e assistível.
   *
   * Na referência o equivalente é ter uma aula com `video_url`: sem isso o
   * cartão fica esmaecido e não clicável.
   */
  disponivel: boolean;
};
