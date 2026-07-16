import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import {
  Cores,
  Espacamentos,
  OPACIDADE_DESABILITADO,
  OPACIDADE_PRESSIONADO,
  Raios,
  Sombras,
  Tipografia,
} from '@/theme';

type CartaoMenuProps = {
  titulo: string;
  icone: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  desabilitado?: boolean;
  /** Largura calculada pela grade, conforme o número de colunas. */
  largura: number;
};

/**
 * Atalho do menu da tela inicial.
 *
 * É vertical — ícone sobre rótulo, centralizado — e não tem descrição, como no
 * projeto de referência. Por isso não reaproveita o `Cartao` de
 * `components/base`, que é horizontal e serve às listas de conteúdo das outras
 * telas: acomodar as duas anatomias no mesmo componente o transformaria num
 * contêiner capaz de qualquer layout, que é justamente o que a arquitetura
 * evita (docs/ARQUITETURA.md §6).
 *
 * Vive em `funcionalidades/inicio` porque só a tela inicial o usa. Sobe para
 * `components/base` se uma segunda funcionalidade precisar dele.
 */
export function CartaoMenu({ titulo, icone, onPress, desabilitado, largura }: CartaoMenuProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityHint={`Abre a seção ${titulo}`}
      accessibilityState={{ disabled: Boolean(desabilitado) }}
      disabled={desabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.cartao,
        { width: largura },
        pressed && estilos.pressionado,
        Boolean(desabilitado) && estilos.desabilitado,
      ]}>
      <View style={estilos.icone}>
        <Ionicons name={icone} size={24} color={Cores.sobrePrimaria} />
      </View>
      <Text style={estilos.titulo} numberOfLines={2}>
        {titulo}
      </Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    minHeight: 124,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espacamentos.md,
    paddingVertical: Espacamentos.lg,
    paddingHorizontal: Espacamentos.sm,
    borderRadius: Raios.xxl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
    ...Sombras.cartao,
  },
  pressionado: {
    opacity: OPACIDADE_PRESSIONADO,
    // O toque também reduz a escala levemente, para não depender só da opacidade.
    transform: [{ scale: 0.97 }],
  },
  desabilitado: {
    opacity: OPACIDADE_DESABILITADO,
  },
  icone: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Raios.md,
    backgroundColor: Cores.primaria,
    ...Sombras.destaque,
  },
  titulo: {
    ...Tipografia.rotulo,
    color: Cores.texto,
    textAlign: 'center',
  },
});
