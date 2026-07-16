import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Cores, Espacamentos } from '@/constants/tema';

type TelaBaseProps = {
  titulo: string;
  descricao?: string;
  /** Quando falso, o conteúdo não rola (útil em formulários curtos). */
  rolavel?: boolean;
  children?: ReactNode;
};

/**
 * Estrutura comum das telas: fundo, título e respeito à Safe Area inferior.
 * O topo é tratado pelo header da Stack.
 */
export function TelaBase({ titulo, descricao, rolavel = true, children }: TelaBaseProps) {
  const insets = useSafeAreaInsets();
  const conteudo = (
    <>
      <Text style={estilos.titulo}>{titulo}</Text>
      {descricao ? <Text style={estilos.descricao}>{descricao}</Text> : null}
      {children}
    </>
  );

  const preenchimento = [
    estilos.conteudo,
    { paddingBottom: insets.bottom + Espacamentos.grande },
  ];

  if (!rolavel) {
    return <View style={[estilos.container, preenchimento]}>{conteudo}</View>;
  }

  return (
    <ScrollView style={estilos.container} contentContainerStyle={preenchimento}>
      {conteudo}
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Cores.fundo,
  },
  conteudo: {
    padding: Espacamentos.grande,
    gap: Espacamentos.medio,
  },
  titulo: {
    fontSize: 28,
    fontWeight: '700',
    color: Cores.texto,
  },
  descricao: {
    fontSize: 15,
    lineHeight: 22,
    color: Cores.textoSecundario,
  },
});
