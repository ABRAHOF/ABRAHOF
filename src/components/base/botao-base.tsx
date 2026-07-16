import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {
  ALTURA_CONTROLE,
  Cores,
  Espacamentos,
  OPACIDADE_DESABILITADO,
  OPACIDADE_PRESSIONADO,
  Raios,
  Tipografia,
} from '@/theme';

export type BotaoProps = {
  titulo: string;
  onPress: () => void;
  /** Bloqueia o toque e exibe indicador no lugar do texto. */
  carregando?: boolean;
  desabilitado?: boolean;
  /** Ícone à esquerda do texto. */
  icone?: keyof typeof Ionicons.glyphMap;
  /** Ocupa toda a largura disponível. Padrão: acompanha o conteúdo. */
  larguraTotal?: boolean;
  estilo?: StyleProp<ViewStyle>;
};

type BotaoBaseProps = BotaoProps & {
  corTexto: string;
  estiloContainer: StyleProp<ViewStyle>;
};

/**
 * Estrutura comum dos botões.
 *
 * Interno ao módulo: as telas usam `BotaoPrimario` ou `BotaoSecundario`. Existe
 * para que altura, estados e acessibilidade fiquem em um lugar só — não é um
 * botão configurável para qualquer aparência.
 */
export function BotaoBase({
  titulo,
  onPress,
  carregando,
  desabilitado,
  icone,
  larguraTotal,
  estilo,
  corTexto,
  estiloContainer,
}: BotaoBaseProps) {
  const inativo = Boolean(desabilitado) || Boolean(carregando);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: inativo, busy: Boolean(carregando) }}
      disabled={inativo}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.base,
        estiloContainer,
        larguraTotal && estilos.larguraTotal,
        pressed && !inativo && estilos.pressionado,
        Boolean(desabilitado) && estilos.desabilitado,
        estilo,
      ]}>
      {carregando ? (
        <ActivityIndicator color={corTexto} />
      ) : (
        <View style={estilos.conteudo}>
          {icone ? <Ionicons name={icone} size={20} color={corTexto} /> : null}
          <Text style={[estilos.titulo, { color: corTexto }]} numberOfLines={1}>
            {titulo}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  base: {
    minHeight: ALTURA_CONTROLE,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Espacamentos.xl,
    borderRadius: Raios.lg,
  },
  larguraTotal: {
    alignSelf: 'stretch',
  },
  conteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.sm,
  },
  titulo: {
    ...Tipografia.botao,
  },
  pressionado: {
    opacity: OPACIDADE_PRESSIONADO,
  },
  desabilitado: {
    opacity: OPACIDADE_DESABILITADO,
  },
});

export const estilosBotao = StyleSheet.create({
  primario: {
    backgroundColor: Cores.primaria,
  },
  secundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Cores.borda,
  },
});
