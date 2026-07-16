import { Alert, FlatList, Linking, StyleSheet, useWindowDimensions, View } from 'react-native';

import { CartaoConteudoAcademy } from '../componentes/cartao-conteudo-academy';
import { useConteudosAcademy } from '../hooks/use-conteudos-academy';
import type { ConteudoAcademy } from '../tipos';
import { BotaoSecundario } from '@/components/base/botao-secundario';
import { TituloSecao } from '@/components/base/titulo-secao';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { CANAL_YOUTUBE } from '@/constants/links';
import { Espacamentos } from '@/theme';

/** Padding horizontal aplicado pela `Tela`, dos dois lados. */
const PADDING_TELA = Espacamentos.xl * 2;
const ESPACO_ENTRE_CARTOES = Espacamentos.md;
const COLUNAS = 2;

/**
 * Academy: catálogo de cursos.
 *
 * Usa `FlatList` em vez de `.map()` num `ScrollView` porque a lista virá do
 * Supabase e cresce sem limite conhecido — o `.map()` renderiza todos os itens
 * de uma vez, custo que o projeto de referência paga na web sem consequência,
 * mas que no mobile aparece na rolagem. Por isso a `Tela` entra com
 * `rolavel={false}`: aninhar a lista dentro do `ScrollView` dela quebraria a
 * virtualização.
 */
export function TelaAcademy() {
  const { conteudos } = useConteudosAcademy();
  const { width } = useWindowDimensions();

  const larguraDisponivel = width - PADDING_TELA - ESPACO_ENTRE_CARTOES * (COLUNAS - 1);
  const larguraCartao = Math.floor(larguraDisponivel / COLUNAS);

  /**
   * Abre o canal público da associação.
   *
   * Mesmo tratamento das telas de Benefícios e Transmissão: sem `canOpenURL` e
   * sem `catch`, uma falha de abertura vira rejeição não tratada e o toque
   * simplesmente não faz nada. O `Alert` informa um erro real, não simula
   * funcionalidade.
   */
  async function abrirCanal() {
    try {
      const suportado = await Linking.canOpenURL(CANAL_YOUTUBE);
      if (!suportado) {
        throw new Error('URL não suportada');
      }
      await Linking.openURL(CANAL_YOUTUBE);
    } catch {
      Alert.alert('Não foi possível abrir o link', 'Acesse o canal ABRAHOF pelo YouTube.');
    }
  }

  function renderizarItem({ item }: { item: ConteudoAcademy }) {
    return <CartaoConteudoAcademy conteudo={item} largura={larguraCartao} />;
  }

  return (
    <Tela
      titulo="Academy"
      subtitulo="Cursos exclusivos para profissionais de HOF"
      rolavel={false}>
      <FlatList
        data={conteudos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        numColumns={COLUNAS}
        columnWrapperStyle={estilos.coluna}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<TituloSecao titulo="Cursos Disponíveis" />}
        ListEmptyComponent={
          <EstadoVazio
            icone="school-outline"
            titulo="Cursos em breve disponíveis"
            descricao="Novos conteúdos serão adicionados em breve."
          />
        }
        ListFooterComponent={
          <View style={estilos.rodape}>
            <TituloSecao
              titulo="Canal ABRAHOF"
              descricao="Acesse nossos conteúdos no YouTube"
            />
            <BotaoSecundario
              titulo="Acessar canal no YouTube"
              icone="logo-youtube"
              onPress={abrirCanal}
              larguraTotal
            />
          </View>
        }
      />
    </Tela>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: ESPACO_ENTRE_CARTOES,
    paddingBottom: Espacamentos.md,
  },
  coluna: {
    gap: ESPACO_ENTRE_CARTOES,
  },
  rodape: {
    gap: Espacamentos.md,
    marginTop: Espacamentos.lg,
  },
});
