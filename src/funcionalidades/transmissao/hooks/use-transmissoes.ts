import { TRANSMISSOES } from '@/mocks/transmissao';
import type { Transmissao } from '../tipos';

type RetornoTransmissoes = {
  transmissoes: Transmissao[];
};

/**
 * Programação de transmissões.
 *
 * Devolve o mock de forma síncrona: sem espera, não há `carregando` nem `erro`.
 * É aqui que os dois entram quando a tabela `transmissoes` for consultada, sem
 * que a tela mude de forma (docs/ARQUITETURA.md §8).
 *
 * Também é aqui que o **status** passará a ser derivado — de `ativo`,
 * `data_inicio` e `data_fim` — em vez de vir pronto do mock. A comparação com o
 * horário atual pertence a esta camada, nunca à tela.
 */
export function useTransmissoes(): RetornoTransmissoes {
  return { transmissoes: TRANSMISSOES };
}
