import { Pressable, StyleSheet, Text } from 'react-native';

import { Cores, Espacamentos, Raios } from '@/constants/tema';

type BotaoProps = {
  titulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario';
};

export function Botao({ titulo, onPress, variante = 'primario' }: BotaoProps) {
  const secundario = variante === 'secundario';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        estilos.base,
        secundario ? estilos.secundario : estilos.primario,
        pressed && estilos.pressionado,
      ]}>
      <Text style={[estilos.titulo, secundario && estilos.tituloSecundario]}>{titulo}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Espacamentos.grande,
    borderRadius: Raios.medio,
  },
  primario: {
    backgroundColor: Cores.primaria,
  },
  secundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Cores.borda,
  },
  pressionado: {
    opacity: 0.7,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: Cores.contraste,
  },
  tituloSecundario: {
    color: Cores.primaria,
  },
});
