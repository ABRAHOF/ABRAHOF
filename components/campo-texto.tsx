import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Cores, Espacamentos, Raios } from '@/constants/tema';

type CampoTextoProps = TextInputProps & {
  rotulo: string;
};

export function CampoTexto({ rotulo, style, ...resto }: CampoTextoProps) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        accessibilityLabel={rotulo}
        placeholderTextColor={Cores.textoSecundario}
        style={[estilos.campo, style]}
        {...resto}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    gap: Espacamentos.pequeno,
  },
  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: Cores.texto,
  },
  campo: {
    minHeight: 48,
    paddingHorizontal: Espacamentos.medio,
    borderWidth: 1,
    borderColor: Cores.borda,
    borderRadius: Raios.medio,
    backgroundColor: Cores.superficie,
    color: Cores.texto,
    fontSize: 16,
  },
});
