import type { ImageSourcePropType } from 'react-native';

/**
 * Empresa apoiadora.
 *
 * Campos do banco ausentes aqui por não existir um único valor em lugar nenhum:
 *
 * - `categoria`: seria o nível de patrocínio (master, ouro, prata). A coluna
 *   existe, está vazia, e o projeto de referência trata os dez apoiadores como
 *   iguais. Inventar níveis criaria hierarquia comercial que ninguém contratou
 *   (docs/BANCO.md §12).
 * - `site_url`: nenhum endereço é conhecido.
 * - `descricao`: idem.
 * - `ordem` e `ativo`: pertencem ao serviço, não à tela — a lista chega pronta
 *   (docs/ARQUITETURA.md §7).
 */
export type Patrocinador = {
  id: string;
  /** Também é o rótulo lido por leitores de tela. */
  nome: string;
  /**
   * Logotipo da empresa.
   *
   * `ImageSourcePropType` aceita `require()` local e `{ uri }` remoto — é o que
   * `logo_url` vai alimentar, sem abstração própria.
   *
   * Opcional porque **nenhum logotipo real existe**. No projeto de referência
   * todos os cartões exibem o logo da ABRAHOF, inclusive o de empresas
   * terceiras. Sem arquivo, o cartão mostra o nome — mais honesto que a marca
   * errada (docs/REQUISITOS.md §10).
   */
  logotipo?: ImageSourcePropType;
};
