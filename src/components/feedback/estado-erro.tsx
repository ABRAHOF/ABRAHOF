import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { BotaoSecundario } from '@/components/base/botao-secundario';
import { Cores, Espacamentos, Raios, Tipografia } from '@/theme';

type EstadoErroProps = {
  titulo?: string;
  descricao?: string;
  /** Ação de nova tentativa. Omitir quando não houver o que repetir. */
  onTentarNovamente?: () => void;
};

/**
 * Falha ao carregar conteúdo.
 *
 * Existe separado de `EstadoVazio` de propósito: no projeto web, erro de
 * consulta cai no estado vazio e o usuário lê "conteúdo em breve" quando o que
 * houve foi falha de rede. Erro se diz, e se oferece uma saída.
 */
export function EstadoErro({
  titulo = 'Não foi possível carregar',
  descricao = 'Verifique sua conexão e tente novamente.',
  onTentarNovamente,
}: EstadoErroProps) {
  return (
    <View style={estilos.container}>
      <View style={estilos.icone}>
        <Ionicons name="cloud-offline-outline" size={28} color={Cores.erro} />
      </View>
      <Text style={estilos.titulo} accessibilityRole="header">
        {titulo}
      </Text>
      <Text style={estilos.descricao}>{descricao}</Text>
      {onTentarNovamente ? (
        <BotaoSecundario titulo="Tentar novamente" icone="refresh" onPress={onTentarNovamente} />
      ) : null}
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
