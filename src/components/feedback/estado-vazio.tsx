import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { BotaoSecundario } from '@/components/base/botao-secundario';
import { Cores, Espacamentos, Raios, Tipografia } from '@/theme';

type EstadoVazioProps = {
  titulo: string;
  descricao?: string;
  icone?: keyof typeof Ionicons.glyphMap;
  acao?: { titulo: string; onPress: () => void };
};

/**
 * Ausência de conteúdo — a consulta funcionou e não há o que mostrar.
 *
 * Não confundir com `EstadoErro`. O projeto web exibe "conteúdo em breve"
 * quando a consulta ao Supabase falha, o que é mentira: rede caída vira lista
 * vazia. Os dois estados são distintos e existem separados por isso. Ver
 * docs/REQUISITOS.md §4.
 */
export function EstadoVazio({ titulo, descricao, icone = 'file-tray-outline', acao }: EstadoVazioProps) {
  return (
    <View style={estilos.container}>
      <View style={estilos.icone}>
        <Ionicons name={icone} size={28} color={Cores.textoSuave} />
      </View>
      <Text style={estilos.titulo} accessibilityRole="header">
        {titulo}
      </Text>
      {descricao ? <Text style={estilos.descricao}>{descricao}</Text> : null}
      {acao ? <BotaoSecundario titulo={acao.titulo} onPress={acao.onPress} /> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: Espacamentos.xl,
    gap: Espacamentos.md,
  },
  icone: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Raios.total,
    backgroundColor: Cores.superficieAlta,
    marginBottom: Espacamentos.xs,
  },
  titulo: {
    ...Tipografia.subtitulo,
    color: Cores.texto,
    textAlign: 'center',
  },
  descricao: {
    ...Tipografia.apoio,
    color: Cores.textoSuave,
    textAlign: 'center',
  },
});
