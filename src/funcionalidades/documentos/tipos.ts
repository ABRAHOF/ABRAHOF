/**
 * Formato do arquivo.
 *
 * União de strings em vez de enum: os valores vêm de `documentos.tipo_arquivo`,
 * que é texto livre no banco, e uma união já dá a verificação em tempo de
 * compilação sem gerar código em tempo de execução.
 *
 * A coluna aceita qualquer texto hoje — padronizá-la é uma das melhorias
 * previstas (docs/BANCO.md §8). `outro` é a saída para o que não couber.
 */
export type TipoArquivo = 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx' | 'imagem' | 'outro';

/**
 * Documento institucional.
 *
 * Campos do banco ausentes aqui por não existir um único valor em lugar nenhum:
 *
 * - `categoria`: a coluna existe e a tela do projeto de referência não a usa.
 *   Preencher agora seria inventar agrupamentos que ninguém definiu.
 * - `created_at`: é data de cadastro, não do documento.
 *
 * `url` também está ausente: `arquivo_url` é NOT NULL no banco — documento sem
 * arquivo não deveria existir — mas **nenhum arquivo real existe**, nem no
 * projeto de referência (docs/REQUISITOS.md §6). Sem ela, o item é apenas
 * informativo.
 */
export type Documento = {
  id: string;
  titulo: string;
  descricao?: string;
  tipoArquivo: TipoArquivo;
  /** Tamanho em bytes, como `tamanho_bytes`. Formatado só na exibição. */
  tamanhoBytes?: number;
};
