import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Cores, Espacamentos, Tipografia } from '@/theme';

type TituloSecaoProps = {
  titulo: string;
  descricao?: string;
  /** Ação à direita: "ver todos", contador. */
  acao?: ReactNode;
};

/** Cabeçalho de um bloco dentro da tela. */
export function TituloSecao({ titulo, descricao, acao }: TituloSecaoProps) {
  return (
    <View style={estilos.container}>
      <View style={estilos.textos}>
        <Text style={estilos.titulo} accessibilityRole="header">
          {titulo}
        </Text>
        {descricao ? <Text style={estilos.descricao}>{descricao}</Text> : null}
      </View>
      {acao}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Espacamentos.md,
  },
  textos: {
    flex: 1,
    gap: Espacamentos.xs,
  },
  titulo: {
    ...Tipografia.titulo,
    color: Cores.texto,
  },
  descricao: {
    ...Tipografia.apoio,
    color: Cores.textoSuave,
  },
});
