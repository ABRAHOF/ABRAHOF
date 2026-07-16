import { Platform, type ViewStyle } from 'react-native';

import { Cores } from './colors';

/**
 * Sombras.
 *
 * O projeto de referência define as sombras em CSS (`box-shadow`). A tradução
 * para React Native não é direta:
 *
 * - iOS usa `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius`. O raio
 *   do iOS equivale a cerca de metade do blur do CSS, então `blur: 20` vira
 *   `shadowRadius: 10`.
 * - Android usa `elevation`, que **não aceita cor** nas versões que o
 *   aplicativo suporta. A sombra ciano do destaque aparece acinzentada no
 *   Android — diferença aceita e registrada, não um defeito.
 *
 * O CSS ainda aplica spread negativo (`-4px`), que não existe em nenhuma das
 * duas plataformas; o efeito é aproximado reduzindo a opacidade.
 */

export const Sombras = {
  /** Destaque: botões e ícones primários. CSS: 0 4px 20px -4px ciano/40%. */
  destaque: Platform.select<ViewStyle>({
    ios: {
      shadowColor: Cores.primaria,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.4,
      shadowRadius: 10,
    },
    android: { elevation: 6 },
    default: {},
  }),

  /** Cartões. CSS: 0 8px 32px -8px preto/40%. */
  cartao: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.4,
      shadowRadius: 16,
    },
    android: { elevation: 4 },
    default: {},
  }),

  /** Elementos flutuantes sobre o conteúdo. CSS: 0 20px 40px -12px preto/50%. */
  elevada: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 20 },
      shadowOpacity: 0.5,
      shadowRadius: 20,
    },
    android: { elevation: 12 },
    default: {},
  }),
} as const;
