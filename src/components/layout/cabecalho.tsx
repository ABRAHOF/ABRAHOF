import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { ReactNode } from 'react';
import { Image, Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ALVO_TOQUE_MINIMO,
  Cores,
  Espacamentos,
  OPACIDADE_PRESSIONADO,
  Raios,
  Tipografia,
} from '@/theme';

type CabecalhoProps = {
  titulo?: string;
  subtitulo?: string;
  /**
   * Logo exibido acima do título.
   *
   * Recebe a fonte da imagem em vez de embutir um arquivo: o logo da ABRAHOF
   * ainda não existe neste projeto — `assets/images/icon.png` é o ícone padrão
   * do template Expo. Ver docs/BACKLOG.md, Sprint 1.
   */
  logo?: ImageSourcePropType;
  /** Botão de voltar. Padrão: exibido quando há tela anterior na pilha. */
  voltar?: boolean;
  /** Elemento à direita: ação da tela. */
  acaoDireita?: ReactNode;
};

/**
 * Cabeçalho das telas.
 *
 * Substitui o header nativo da Stack, desligado em `_layout` — o nativo não
 * acomoda logo e subtítulo. Como consequência, este componente é responsável
 * pela Safe Area **superior**; a `Tela` cuida da inferior.
 *
 * Não reproduz o botão de menu nem o sino de notificações do projeto web: os
 * dois existiam sem ação em todas as telas. O sino volta quando houver
 * contagem real por trás. Ver docs/REQUISITOS.md §12.1.
 */
export function Cabecalho({ titulo, subtitulo, logo, voltar, acaoDireita }: CabecalhoProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const exibirVoltar = voltar ?? router.canGoBack();
  const temLinhaSuperior = exibirVoltar || Boolean(logo) || Boolean(acaoDireita);

  return (
    <View style={[estilos.container, { paddingTop: insets.top + Espacamentos.sm }]}>
      {temLinhaSuperior ? (
        <View style={estilos.linha}>
          <View style={estilos.lateral}>
            {exibirVoltar ? (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Voltar"
                onPress={() => router.back()}
                style={({ pressed }) => [estilos.botaoIcone, pressed && estilos.pressionado]}>
                <Ionicons name="chevron-back" size={24} color={Cores.texto} />
              </Pressable>
            ) : null}
          </View>

          <View style={estilos.centro}>
            {logo ? (
              <Image
                source={logo}
                style={estilos.logo}
                resizeMode="contain"
                accessibilityLabel="ABRAHOF"
              />
            ) : null}
          </View>

          <View style={[estilos.lateral, estilos.lateralDireita]}>{acaoDireita}</View>
        </View>
      ) : null}

      {titulo ? (
        <View style={[estilos.textos, temLinhaSuperior && estilos.textosComLinha]}>
          <Text style={estilos.titulo} accessibilityRole="header">
            {titulo}
          </Text>
          {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    paddingHorizontal: Espacamentos.lg,
    paddingBottom: Espacamentos.md,
    backgroundColor: Cores.fundo,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Cores.borda,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ALVO_TOQUE_MINIMO,
  },
  lateral: {
    minWidth: ALVO_TOQUE_MINIMO,
    justifyContent: 'center',
  },
  lateralDireita: {
    alignItems: 'flex-end',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoIcone: {
    width: ALVO_TOQUE_MINIMO,
    height: ALVO_TOQUE_MINIMO,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Raios.total,
    marginLeft: -Espacamentos.md,
  },
  pressionado: {
    opacity: OPACIDADE_PRESSIONADO,
  },
  logo: {
    height: 36,
    width: 120,
  },
  textos: {
    gap: Espacamentos.xs,
  },
  textosComLinha: {
    marginTop: Espacamentos.sm,
  },
  titulo: {
    ...Tipografia.tituloGrande,
    color: Cores.texto,
  },
  subtitulo: {
    ...Tipografia.apoio,
    color: Cores.textoSuave,
  },
});
