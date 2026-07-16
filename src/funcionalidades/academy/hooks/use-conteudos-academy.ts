import { CONTEUDOS_ACADEMY } from '@/mocks/academy';
import type { ConteudoAcademy } from '../tipos';

type RetornoConteudosAcademy = {
  conteudos: ConteudoAcademy[];
};

/**
 * Conteúdos da Academy.
 *
 * Devolve o mock de forma síncrona — não há espera, então não há `carregando`
 * nem `erro`: exibir estado de carregamento sobre um array local seria fingir
 * trabalho que não existe.
 *
 * É aqui que os dois estados entram quando o Supabase for integrado, sem que a
 * tela precise mudar de forma: a tela já consome um hook, não um array
 * (docs/ARQUITETURA.md §8). E os dois precisam ser **distintos** — no projeto
 * de referência a falha de consulta cai no estado vazio, e o usuário lê "cursos
 * em breve" quando o que houve foi rede caída (docs/REQUISITOS.md §4).
 */
export function useConteudosAcademy(): RetornoConteudosAcademy {
  return { conteudos: CONTEUDOS_ACADEMY };
}
