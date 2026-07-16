import type { ItemGaleria } from '@/funcionalidades/galeria/tipos';

/**
 * Galeria — dados mockados.
 *
 * **Nenhum item tem imagem, e isso é deliberado.**
 *
 * O projeto de referência exibe seis fotos do Unsplash, com um comentário do
 * próprio autor no código: "Placeholder images - in production these would come
 * from an API". São imagens genéricas de banco — nenhuma é da ABRAHOF.
 *
 * Copiá-las traria conteúdo remoto, instável e de terceiros para dentro do
 * aplicativo. E não há alternativa local: os únicos assets do projeto são o selo
 * de chancela e os ícones do template. Repetir o selo em seis células seria
 * reproduzir o erro dos Patrocinadores da web, onde todo parceiro exibe o logo
 * da ABRAHOF (docs/ANALISE_PROJETO_REFERENCIA.md §10).
 *
 * Então os itens ficam sem imagem, e a grade mostra o marcador visual. As
 * legendas abaixo são o único conteúdo real da tela: são os textos `alt` da
 * referência.
 *
 * **A tela só fica pronta com fotos reais da associação** (docs/BACKLOG.md,
 * Sprints 1 e 7). Quando existirem, virão de `galeria.imagem_url` e este
 * arquivo deixa de existir.
 */
export const ITENS_GALERIA: ItemGaleria[] = [
  { id: 'ciosp-2025', titulo: 'CIOSP 2025', textoAlternativo: 'CIOSP 2025' },
  { id: 'congresso-hof', titulo: 'Congresso HOF', textoAlternativo: 'Congresso HOF' },
  { id: 'palestra', titulo: 'Palestra', textoAlternativo: 'Palestra' },
  { id: 'networking', titulo: 'Networking', textoAlternativo: 'Networking' },
  { id: 'workshops', titulo: 'Workshops', textoAlternativo: 'Workshops' },
  { id: 'apresentacao', titulo: 'Apresentação', textoAlternativo: 'Apresentação' },
];
