import { Platform, type ViewStyle } from 'react-native';

/**
 * Sombras.
 *
 * Discretas, como pede um tema claro: sobre fundo branco, sombra pesada suja a
 * tela em vez de dar profundidade. Todas usam preto com opacidade baixa — a
 * sombra colorida da paleta anterior (ciano a 40%) não faz sentido aqui.
 *
 * A tradução de CSS para React Native não é direta:
 *
 * - iOS usa `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius`.
 * - Android usa `elevation`, que **não aceita cor** nas versões suportadas.
 *   Como agora todas as sombras são pretas, a diferença entre plataformas
 *   praticamente desaparece — no tema escuro, a sombra ciano do destaque saía
 *   acinzentada no Android.
 */

export const Sombras = {
  /** Destaque: botões e ícones primários. */
  destaque: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.14,
      shadowRadius: 8,
    },
    android: { elevation: 3 },
    default: {},
  }),

  /** Cartões. Sutil: a borda e a superfície já os separam do fundo. */
  cartao: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
    },
    android: { elevation: 2 },
    default: {},
  }),

  /** Elementos flutuantes sobre o conteúdo. */
  elevada: Platform.select<ViewStyle>({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.16,
      shadowRadius: 16,
    },
    android: { elevation: 8 },
    default: {},
  }),
} as const;
