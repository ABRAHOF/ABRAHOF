import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { SELO_OFICIAL } from '@/constants/evento';
import { Cores, Espacamentos, Raios, Tipografia } from '@/theme';

/** Selo de autenticidade ao final da tela inicial. Informativo, não é tocável. */
export function SeloOficial() {
  return (
    <View style={estilos.container}>
      <View style={estilos.marca}>
        <Ionicons name="checkmark" size={18} color={Cores.sobrePrimaria} />
      </View>
      <View style={estilos.textos}>
        <Text style={estilos.titulo}>{SELO_OFICIAL.titulo}</Text>
        <Text style={estilos.descricao}>{SELO_OFICIAL.descricao}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.md,
    padding: Espacamentos.lg,
    borderRadius: Raios.xl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
  },
  marca: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Raios.total,
    backgroundColor: Cores.primaria,
  },
  textos: {
    flex: 1,
    gap: Espacamentos.xs,
  },
  titulo: {
    ...Tipografia.rotulo,
    color: Cores.texto,
  },
  descricao: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
});
