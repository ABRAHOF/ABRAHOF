import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';

import type { ConteudoAcademy } from '../tipos';
import {
  Cores,
  Espacamentos,
  OPACIDADE_DESABILITADO,
  Raios,
  Sombras,
  Tipografia,
} from '@/theme';

type CartaoConteudoAcademyProps = {
  conteudo: ConteudoAcademy;
  /** Largura definida pela grade, conforme o número de colunas. */
  largura: number;
};

/**
 * Cartão de curso da Academy.
 *
 * Vertical — faixa visual no topo, texto abaixo — e organizado em grade, ao
 * contrário do `Cartao` de `components/base`, que é horizontal e serve a listas
 * de uma coluna. Por isso é um componente próprio (docs/ARQUITETURA.md §6).
 *
 * **Informativo: não é pressionável.** No projeto de referência o cartão abre
 * no YouTube o vídeo da primeira aula do curso; sem dado real de vídeo, um
 * `onPress` aqui só poderia fingir. Ganha `onPress` quando houver destino.
 *
 * Recebe tudo por props e não conhece a origem dos dados.
 */
export function CartaoConteudoAcademy({ conteudo, largura }: CartaoConteudoAcademyProps) {
  const { titulo, instrutor, cargaHoraria, thumbnail, novo, disponivel } = conteudo;

  return (
    <View
      style={[estilos.cartao, { width: largura }, !disponivel && estilos.indisponivel]}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={[
        titulo,
        instrutor,
        cargaHoraria,
        novo ? 'Novo' : undefined,
        disponivel ? undefined : 'Em breve',
      ]
        .filter(Boolean)
        .join('. ')}>
      <View style={estilos.capa}>
        {thumbnail ? (
          // `cover`: a miniatura preenche a faixa. `contain` deixaria tarjas
          // laterais, já que a proporção da imagem não é conhecida.
          <Image source={{ uri: thumbnail }} style={estilos.imagem} resizeMode="cover" />
        ) : (
          <Ionicons name="play-circle-outline" size={40} color={Cores.primaria} />
        )}

        {novo ? (
          <View style={estilos.selo}>
            <Text style={estilos.seloTexto}>Novo</Text>
          </View>
        ) : null}
      </View>

      <View style={estilos.textos}>
        <Text style={estilos.titulo} numberOfLines={2}>
          {titulo}
        </Text>
        <Text style={estilos.instrutor} numberOfLines={1}>
          {instrutor}
        </Text>

        <View style={estilos.meta}>
          {cargaHoraria ? (
            <View style={estilos.metaItem}>
              <Ionicons name="time-outline" size={12} color={Cores.textoSuave} />
              <Text style={estilos.metaTexto}>{cargaHoraria}</Text>
            </View>
          ) : null}

          {/* Sem cor sozinha para indicar o estado: o texto diz o que é. */}
          {disponivel ? null : <Text style={estilos.metaTexto}>Em breve</Text>}
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    borderRadius: Raios.xxl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
    overflow: 'hidden',
    ...Sombras.cartao,
  },
  indisponivel: {
    opacity: OPACIDADE_DESABILITADO,
  },
  capa: {
    // Proporção da faixa em vez de altura fixa: acompanha a largura da coluna.
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.superficieAlta,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  selo: {
    position: 'absolute',
    top: Espacamentos.sm,
    right: Espacamentos.sm,
    paddingHorizontal: Espacamentos.sm,
    paddingVertical: 2,
    borderRadius: Raios.total,
    backgroundColor: Cores.primaria,
  },
  seloTexto: {
    ...Tipografia.legenda,
    color: Cores.sobrePrimaria,
  },
  textos: {
    padding: Espacamentos.md,
    gap: Espacamentos.xs,
  },
  titulo: {
    ...Tipografia.rotulo,
    color: Cores.texto,
  },
  instrutor: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Espacamentos.sm,
    marginTop: Espacamentos.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.xs,
  },
  metaTexto: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
});
