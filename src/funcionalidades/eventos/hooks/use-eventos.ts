import { EVENTOS } from '@/mocks/eventos';
import type { EventoParceiro } from '../tipos';

type RetornoEventos = {
  eventos: EventoParceiro[];
};

/**
 * Eventos chancelados.
 *
 * Devolve o mock de forma síncrona: sem espera, não há `carregando` nem `erro`.
 * É aqui que os dois entram na integração com `eventos_parceiros`, sem que a
 * tela mude de forma (docs/ARQUITETURA.md §8) — e precisam ser distintos entre
 * si: no projeto de referência, falha de consulta aparece como "Nenhum evento
 * disponível" (docs/REQUISITOS.md §5).
 *
 * A lista chega ordenada por data. O filtro de eventos já encerrados fica para
 * a integração: depende da data atual, que não pertence a um mock.
 */
export function useEventos(): RetornoEventos {
  return { eventos: EVENTOS };
}
