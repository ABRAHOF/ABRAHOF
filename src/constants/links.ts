/**
 * Endereços externos usados pelo aplicativo.
 *
 * Ficam aqui, e não em `mocks/`, porque **não são dados mockados**: são canais
 * públicos e reais da associação, que continuam válidos depois da integração
 * com o Supabase. Estavam duplicados entre `mocks/academy.ts` e
 * `mocks/transmissao.ts` — a mesma URL escrita duas vezes.
 *
 * Nenhum contém token, parâmetro de rastreio ou credencial. O link da Revista
 * AOS do projeto de referência carrega parâmetros UTM feitos para o Instagram e
 * não deve ser copiado como está (docs/REQUISITOS.md §13.4).
 */

/** Canal oficial no YouTube. Usado na Academy e na Transmissão. */
export const CANAL_YOUTUBE = 'https://www.youtube.com/@abrahof_oficial';

/** Página pública de adesão. Usada no Clube de Benefícios. */
export const LINK_ADESAO = 'https://abrahof.org.br/adesao/';
