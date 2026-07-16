import { BENEFICIOS } from '@/mocks/beneficios';
import type { Beneficio } from '../tipos';

type RetornoBeneficios = {
  beneficios: Beneficio[];
};

/**
 * Benefícios do clube.
 *
 * Devolve o mock de forma síncrona: sem espera, não há `carregando` nem `erro`
 * — exibir carregamento sobre um array local seria fingir trabalho.
 *
 * É aqui que os dois estados entram quando `clube_beneficios` for consultada,
 * sem que a tela mude de forma (docs/ARQUITETURA.md §8). E precisam ser
 * distintos entre si: no projeto de referência, falha de rede aparece como
 * lista vazia (docs/REQUISITOS.md §4).
 */
export function useBeneficios(): RetornoBeneficios {
  return { beneficios: BENEFICIOS };
}
