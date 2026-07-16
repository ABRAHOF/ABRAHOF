import type { Documento } from '@/funcionalidades/documentos/tipos';

/**
 * Documentos — dados mockados.
 *
 * São os cinco itens do projeto de referência: títulos e descrições vieram de
 * lá, sem alteração.
 *
 * **Nenhum arquivo existe.** Lá também não: os tamanhos são texto digitado à
 * mão ("2.4 MB") e o botão de download não tem ação. A tabela `documentos` está
 * pronta no banco e nunca foi consultada; os arquivos precisam ser enviados ao
 * Storage antes desta tela ir a produção (docs/BACKLOG.md, Sprints 1 e 7).
 *
 * Dois campos são inferência, não dado da referência:
 *
 * - **`tipoArquivo`**: a referência não informa o tipo. `pdf` é o formato
 *   natural de programação, certificado, manual, mídia kit e regulamento — mas
 *   é suposição, e o valor real virá de `tipo_arquivo`.
 * - **`tamanhoBytes`**: conversão dos textos da referência ("2.4 MB" →
 *   2.516.582). Como os originais são fictícios, estes números também são.
 */
export const DOCUMENTOS: Documento[] = [
  {
    id: 'programacao-ciosp-2026',
    titulo: 'Programação CIOSP 2026',
    descricao: 'Cronograma completo do evento com horários e palestrantes',
    tipoArquivo: 'pdf',
    tamanhoBytes: 2_516_582,
  },
  {
    id: 'certificado-de-participacao',
    titulo: 'Certificado de Participação',
    descricao: 'Modelo de certificado para participantes do congresso',
    tipoArquivo: 'pdf',
    tamanhoBytes: 1_258_291,
  },
  {
    id: 'manual-do-expositor',
    titulo: 'Manual do Expositor',
    descricao: 'Guia completo para expositores do CIOSP 2026',
    tipoArquivo: 'pdf',
    tamanhoBytes: 3_984_589,
  },
  {
    id: 'podcast-abrahof-midia-kit',
    titulo: 'Podcast ABRAHOF - Mídia Kit',
    descricao: 'Material para patrocinadores do podcast oficial',
    tipoArquivo: 'pdf',
    tamanhoBytes: 5_347_737,
  },
  {
    id: 'regulamento-do-evento',
    titulo: 'Regulamento do Evento',
    descricao: 'Normas e diretrizes para participação no congresso',
    tipoArquivo: 'pdf',
    tamanhoBytes: 911_360,
  },
];
