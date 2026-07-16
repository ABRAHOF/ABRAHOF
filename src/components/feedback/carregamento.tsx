import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Cores, Espacamentos, Tipografia } from '@/theme';

type CarregamentoProps = {
  /** Texto abaixo do indicador. Omitir em esperas curtas. */
  mensagem?: string;
};

/** Espera por conteúdo. */
export function Carregamento({ mensagem }: CarregamentoProps) {
  return (
    <View style={estilos.container} accessibilityRole="progressbar" accessibilityLabel="Carregando">
      <ActivityIndicator size="large" color={Cores.primaria} />
      {mensagem ? <Text style={estilos.mensagem}>{mensagem}</Text> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Espacamentos.xl,
    gap: Espacamentos.lg,
  },
  mensagem: {
    ...Tipografia.apoio,
    color: Cores.textoSuave,
    textAlign: 'center',
  },
});
