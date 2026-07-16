import { ITENS_GALERIA } from '@/mocks/galeria';
import type { ItemGaleria } from '../tipos';

type RetornoGaleria = {
  itens: ItemGaleria[];
};

/**
 * Itens da galeria.
 *
 * Devolve o mock de forma síncrona: sem espera, não há `carregando` nem `erro`.
 * É aqui que os dois entram quando a tabela `galeria` for consultada, sem que a
 * tela mude de forma (docs/ARQUITETURA.md §8) — e distintos entre si, ao
 * contrário do projeto de referência, onde falha de rede vira lista vazia.
 */
export function useGaleria(): RetornoGaleria {
  return { itens: ITENS_GALERIA };
}
