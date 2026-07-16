import { PATROCINADORES } from '@/mocks/patrocinadores';
import type { Patrocinador } from '../tipos';

type RetornoPatrocinadores = {
  patrocinadores: Patrocinador[];
};

/**
 * Empresas apoiadoras.
 *
 * Devolve o mock de forma síncrona: sem espera, não há `carregando` nem `erro`.
 * É aqui que os dois entram quando a tabela `patrocinadores` for consultada, sem
 * que a tela mude de forma (docs/ARQUITETURA.md §8) — e distintos entre si, ao
 * contrário do projeto de referência, onde falha de rede vira lista vazia.
 *
 * A lista chega ordenada; a coluna `ordem` do banco resolve isso no serviço.
 */
export function usePatrocinadores(): RetornoPatrocinadores {
  return { patrocinadores: PATROCINADORES };
}
