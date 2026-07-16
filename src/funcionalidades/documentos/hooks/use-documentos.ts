import { DOCUMENTOS } from '@/mocks/documentos';
import type { Documento } from '../tipos';

type RetornoDocumentos = {
  documentos: Documento[];
};

/**
 * Documentos institucionais.
 *
 * Devolve o mock de forma síncrona: sem espera, não há `carregando` nem `erro`.
 * É aqui que os dois entram quando a tabela `documentos` for consultada, sem
 * que a tela mude de forma (docs/ARQUITETURA.md §8) — e distintos entre si, ao
 * contrário do projeto de referência, onde falha de rede vira lista vazia.
 */
export function useDocumentos(): RetornoDocumentos {
  return { documentos: DOCUMENTOS };
}
