import type { TextStyle } from 'react-native';

/**
 * Tipografia.
 *
 * O projeto de referência usa **Poppins** (400–800), carregada via Google Fonts
 * — caminho que não existe no React Native: a fonte precisa ser empacotada como
 * arquivo e registrada com `expo-font`.
 *
 * Os arquivos da Poppins ainda não estão disponíveis, então o aplicativo usa a
 * fonte do sistema. A troca acontece em um único ponto: preencher `FAMILIAS`,
 * carregar as fontes no layout raiz e virar `POPPINS_DISPONIVEL` para `true`.
 * Nenhum componente muda.
 *
 * A escala reproduz a do projeto de referência (Tailwind: text-xs a text-2xl).
 */

/** Vira `true` quando os arquivos da Poppins forem adicionados e carregados. */
const POPPINS_DISPONIVEL = false;

export const Pesos = {
  regular: '400',
  medio: '500',
  semibold: '600',
  bold: '700',
} as const;

export type Peso = keyof typeof Pesos;

/**
 * Nome da família por peso.
 *
 * Vazio enquanto a Poppins não existir: sem `fontFamily`, o React Native usa a
 * fonte do sistema (San Francisco no iOS, Roboto no Android) e respeita
 * `fontWeight`.
 *
 * Ao adicionar a Poppins, mapear cada peso para o arquivo correspondente
 * (`Poppins-Regular`, `Poppins-Medium`, `Poppins-SemiBold`, `Poppins-Bold`) —
 * famílias com peso embutido ignoram `fontWeight` no Android, por isso o nome
 * precisa ser explícito por peso.
 */
const FAMILIAS: Partial<Record<Peso, string>> = {};

/** Monta família e peso de forma consistente entre as duas plataformas. */
function fonte(peso: Peso): Pick<TextStyle, 'fontFamily' | 'fontWeight'> {
  return {
    fontFamily: POPPINS_DISPONIVEL ? FAMILIAS[peso] : undefined,
    fontWeight: Pesos[peso],
  };
}

/** Tamanho e altura de linha, em pontos. */
export const Tamanhos = {
  legenda: { fontSize: 12, lineHeight: 16 },
  apoio: { fontSize: 14, lineHeight: 20 },
  corpo: { fontSize: 16, lineHeight: 24 },
  subtitulo: { fontSize: 18, lineHeight: 28 },
  titulo: { fontSize: 20, lineHeight: 28 },
  tituloGrande: { fontSize: 24, lineHeight: 32 },
} as const;

/**
 * Variantes prontas. Todo texto do aplicativo usa uma delas — nenhum
 * componente declara `fontSize` ou `fontWeight` diretamente.
 *
 * Não incluem cor: quem define cor é o componente, conforme o papel do texto.
 */
export const Tipografia = {
  /** Título de tela. */
  tituloGrande: { ...Tamanhos.tituloGrande, ...fonte('bold') },
  /** Título de seção. */
  titulo: { ...Tamanhos.titulo, ...fonte('semibold') },
  /** Subtítulo e cabeçalho de bloco. */
  subtitulo: { ...Tamanhos.subtitulo, ...fonte('semibold') },
  /** Texto corrido. */
  corpo: { ...Tamanhos.corpo, ...fonte('regular') },
  /** Texto corrido com ênfase. */
  corpoForte: { ...Tamanhos.corpo, ...fonte('semibold') },
  /** Rótulo de campo, título de cartão. */
  rotulo: { ...Tamanhos.apoio, ...fonte('semibold') },
  /** Texto de apoio: descrições. */
  apoio: { ...Tamanhos.apoio, ...fonte('regular') },
  /** Legenda, selo, metadado. */
  legenda: { ...Tamanhos.legenda, ...fonte('medio') },
  /** Texto de botão. */
  botao: { ...Tamanhos.corpo, ...fonte('semibold') },
} as const satisfies Record<string, TextStyle>;

export type VarianteTipografia = keyof typeof Tipografia;
