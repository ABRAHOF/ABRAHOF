/**
 * Formatação de dados de arquivo.
 *
 * O projeto de referência exibe o tamanho como texto digitado à mão ("2.4 MB"),
 * embora a coluna `documentos.tamanho_bytes` seja `BIGINT`. O número é a fonte
 * correta; a formatação é responsabilidade da apresentação, não do cadastro
 * (docs/REQUISITOS.md §6).
 */

const UNIDADES = ['B', 'KB', 'MB', 'GB'] as const;
const BASE = 1024;

/**
 * Tamanho legível a partir de bytes: `2516582` vira `"2,4 MB"`.
 *
 * Usa vírgula decimal, como manda o português — a referência usa ponto, herança
 * da formatação em inglês.
 */
export function formatarTamanho(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return '';
  }

  if (bytes < BASE) {
    return `${bytes} ${UNIDADES[0]}`;
  }

  let valor = bytes;
  let unidade = 0;

  while (valor >= BASE && unidade < UNIDADES.length - 1) {
    valor /= BASE;
    unidade += 1;
  }

  // Uma casa decimal, exceto quando o valor é redondo: "1 MB", não "1,0 MB".
  const arredondado = Math.round(valor * 10) / 10;
  const texto = Number.isInteger(arredondado)
    ? String(arredondado)
    : String(arredondado).replace('.', ',');

  return `${texto} ${UNIDADES[unidade]}`;
}
