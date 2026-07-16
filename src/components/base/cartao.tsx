import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import {
  Cores,
  Espacamentos,
  OPACIDADE_DESABILITADO,
  OPACIDADE_PRESSIONADO,
  Raios,
  Sombras,
  Tipografia,
} from '@/theme';

type CartaoProps = {
  titulo: string;
  descricao?: string;
  /** Ícone à esquerda, sobre fundo destacado. Ignorado quando há `imagem`. */
  icone?: keyof typeof Ionicons.glyphMap;
  /** Miniatura à esquerda, no lugar do ícone. */
  imagem?: ImageSourcePropType;
  /**
   * Conteúdo à direita: selo, contador, seta.
   *
   * Quando ausente e o cartão é pressionável, exibe a seta automaticamente.
   */
  fim?: ReactNode;
  /** Linha de metadados acima do título: data, categoria, duração. */
  meta?: ReactNode;
  onPress?: () => void;
  desabilitado?: boolean;
  estilo?: StyleProp<ViewStyle>;
};

/**
 * Cartão de conteúdo.
 *
 * O projeto web tem seis cartões (podcast, curso, benefício, documento, evento,
 * patrocinador) que repetem a mesma anatomia: bloco visual à esquerda, texto no
 * meio, ação à direita. Este componente cobre essas seis variações — e só elas.
 * Não é um contêiner capaz de representar qualquer layout: um caso que não
 * couber aqui vira componente próprio, sem forçar mais uma prop.
 *
 * Ver docs/ANALISE_PROJETO_REFERENCIA.md §3 e docs/ARQUITETURA.md §6.
 */
export function Cartao({
  titulo,
  descricao,
  icone,
  imagem,
  fim,
  meta,
  onPress,
  desabilitado,
  estilo,
}: CartaoProps) {
  const pressionavel = Boolean(onPress) && !desabilitado;

  const conteudo = (
    <>
      {imagem ? (
        <Image source={imagem} style={estilos.imagem} resizeMode="cover" />
      ) : icone ? (
        <View style={estilos.icone}>
          <Ionicons name={icone} size={22} color={Cores.sobrePrimaria} />
        </View>
      ) : null}

      <View style={estilos.textos}>
        {meta ? <View style={estilos.meta}>{meta}</View> : null}
        <Text style={estilos.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        {descricao ? (
          <Text style={estilos.descricao} numberOfLines={2}>
            {descricao}
          </Text>
        ) : null}
      </View>

      {fim ?? (pressionavel ? <Ionicons name="chevron-forward" size={20} color={Cores.textoSuave} /> : null)}
    </>
  );

  if (!onPress) {
    return <View style={[estilos.cartao, desabilitado && estilos.desabilitado, estilo]}>{conteudo}</View>;
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityHint={descricao}
      accessibilityState={{ disabled: Boolean(desabilitado) }}
      disabled={desabilitado}
      onPress={onPress}
      style={({ pressed }) => [
        estilos.cartao,
        pressed && estilos.pressionado,
        Boolean(desabilitado) && estilos.desabilitado,
        estilo,
      ]}>
      {conteudo}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.lg,
    padding: Espacamentos.lg,
    borderRadius: Raios.xxl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
    ...Sombras.cartao,
  },
  pressionado: {
    opacity: OPACIDADE_PRESSIONADO,
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
  },
  imagem: {
    width: 56,
    height: 56,
    borderRadius: Raios.md,
    backgroundColor: Cores.superficieAlta,
  },
  textos: {
    flex: 1,
    gap: Espacamentos.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.sm,
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
