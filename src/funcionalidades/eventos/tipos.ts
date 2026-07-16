/**
 * Evento chancelado pela ABRAHOF.
 *
 * **`tipo` e `descricao` são campos separados aqui, e no banco não são.**
 *
 * A tabela `eventos_parceiros` não tem coluna `tipo`: o projeto de referência
 * usa `descricao` para guardar "Congresso", "Workshop"… e exibe esse valor como
 * selo. É por isso que as pílulas de filtro da tela nunca puderam funcionar —
 * não existe campo por onde filtrar (docs/BANCO.md §4).
 *
 * Este tipo já reflete o modelo corrigido. A coluna `tipo` precisa ser criada
 * antes da migração; depois, `descricao` volta a ser descrição.
 *
 * Campos do banco ausentes aqui porque a referência não os exibe:
 * `imagem_url` e `organizador` — este último aparece como `organizador`
 * opcional, já que o dado existe e é útil.
 */
export type EventoParceiro = {
  id: string;
  titulo: string;
  descricao: string;
  /** Congresso, Simpósio, Workshop, Curso, Evento. Exibido como selo. */
  tipo: string;
  /** Data ISO (`AAAA-MM-DD`), como o banco devolve. Formatada na exibição. */
  data: string;
  /** Horário já pronto para exibição: "09:00". */
  horario?: string;
  /** Vazio no banco vira "A definir", como no projeto de referência. */
  local?: string;
  organizador?: string;
};
