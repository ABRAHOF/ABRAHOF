import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Cabecalho } from './cabecalho';
import { Cores, Espacamentos } from '@/theme';

type TelaProps = {
  titulo?: string;
  subtitulo?: string;
  /** Conteúdo à direita do cabeçalho. */
  acaoDireita?: ReactNode;
  /** Oculta o cabeçalho quando a tela tiver um topo próprio. */
  semCabecalho?: boolean;
  /** Conteúdo rolável. Desligar em telas de altura fixa, como formulários curtos. */
  rolavel?: boolean;
  /** Remove o padding horizontal, para conteúdo que sangra até a borda. */
  semPadding?: boolean;
  /** Ajustes pontuais do container de conteúdo. */
  estiloConteudo?: StyleProp<ViewStyle>;
  children?: ReactNode;
};

/**
 * Casca das telas: fundo, cabeçalho e Safe Area.
 *
 * A Safe Area é dividida: o `Cabecalho` trata o topo (notch, ilha dinâmica) e
 * esta tela trata a base (indicador de home, barra de gestos). Nenhuma medida é
 * fixa — os valores vêm de `useSafeAreaInsets`, então o layout responde ao
 * aparelho em vez de assumir um tamanho.
 */
export function Tela({
  titulo,
  subtitulo,
  acaoDireita,
  semCabecalho,
  rolavel = true,
  semPadding,
  estiloConteudo,
  children,
}: TelaProps) {
  const insets = useSafeAreaInsets();

  const estiloBase: StyleProp<ViewStyle> = [
    estilos.conteudo,
    semPadding && estilos.semPadding,
    { paddingBottom: insets.bottom + Espacamentos.xl },
    estiloConteudo,
  ];

  return (
    <View style={estilos.container}>
      {semCabecalho ? null : (
        <Cabecalho titulo={titulo} subtitulo={subtitulo} acaoDireita={acaoDireita} />
      )}

      {rolavel ? (
        <ScrollView
          style={estilos.rolagem}
          contentContainerStyle={estiloBase}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[estilos.rolagem, estiloBase]}>{children}</View>
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  rolagem: {
    flex: 1,
  },
  conteudo: {
    flexGrow: 1,
    padding: Espacamentos.xl,
    gap: Espacamentos.lg,
  },
  semPadding: {
    paddingHorizontal: 0,
  },
});
