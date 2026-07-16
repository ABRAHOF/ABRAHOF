import type { ImageSourcePropType } from 'react-native';

/**
 * Situação de uma transmissão.
 *
 * União de strings em vez de enum: a verificação acontece em tempo de
 * compilação e nada é gerado em tempo de execução.
 *
 * O banco não tem esta coluna. O estado sai de `ativo`, `data_inicio` e
 * `data_fim` — comparação que pertence ao serviço, quando houver dados reais.
 * A tela recebe o estado pronto e não calcula nada a partir do relógio.
 */
export type StatusTransmissao = 'ao-vivo' | 'agendada' | 'encerrada' | 'indisponivel';

/** Idiomas usados pelo projeto de referência nos selos dos podcasts. */
export type IdiomaTransmissao = 'PT' | 'EN';

/**
 * Transmissão da programação.
 *
 * **`palestrante` e `idioma` não existem na tabela `transmissoes`** — mas a tela
 * do projeto de referência exibe os dois. Lá os dados são fixos no código, e o
 * problema não aparece; na migração, aparece. As colunas precisam ser criadas
 * antes, sob pena de repetir o erro de `eventos_parceiros`, onde `descricao`
 * acabou guardando o tipo do evento (docs/BANCO.md §1).
 */
export type Transmissao = {
  id: string;
  titulo: string;
  descricao?: string;
  palestrante: string;
  idioma: IdiomaTransmissao;
  status: StatusTransmissao;
  /** Data ISO (`AAAA-MM-DD`), como `data_inicio` devolve. Formatada na exibição. */
  data?: string;
  /** Horário já pronto para exibição: "13:00". */
  horario?: string;
  /**
   * Imagem de capa.
   *
   * `ImageSourcePropType` aceita `require()` local e `{ uri }` remoto — é o que
   * `thumbnail_url` vai alimentar. Opcional porque nenhuma capa existe hoje:
   * sem ela, o cartão mostra um marcador visual.
   */
  capa?: ImageSourcePropType;
};
