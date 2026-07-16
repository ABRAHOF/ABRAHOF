import { Alert, FlatList, Linking, StyleSheet, View } from 'react-native';

import { CartaoTransmissao } from '../componentes/cartao-transmissao';
import { useTransmissoes } from '../hooks/use-transmissoes';
import type { Transmissao } from '../tipos';
import { BotaoSecundario } from '@/components/base/botao-secundario';
import { TituloSecao } from '@/components/base/titulo-secao';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { CANAL_YOUTUBE } from '@/mocks/transmissao';
import { Espacamentos } from '@/theme';

/**
 * Transmissão: programação dos podcasts.
 *
 * O projeto de referência é uma **grade de programação**, não um player: os
 * cartões não são clicáveis e quem assiste vai ao canal do YouTube. Esta tela
 * mantém esse desenho — a decisão entre player embutido e link externo segue
 * pendente (docs/ARQUITETURA.md §17.4), e a tabela `transmissoes` prevê
 * `url_stream` para o dia em que for tomada.
 *
 * Cada transmissão tem sua própria área 16:9, com capa quando houver e marcador
 * quando não. É onde a `thumbnail_url` entra sem mexer no layout.
 *
 * Uma coluna: a área de mídia em proporção de vídeo, mais palestrante, título e
 * descrição, não sobrevive a meia tela num aparelho estreito.
 *
 * `FlatList` em vez de `.map()` num `ScrollView` porque a programação virá do
 * banco e cresce a cada evento. Por isso a `Tela` entra com `rolavel={false}`:
 * aninhar a lista no `ScrollView` dela quebraria a virtualização.
 */
export function TelaTransmissao() {
  const { transmissoes } = useTransmissoes();

  /**
   * Abre o canal público da associação.
   *
   * Única ação da tela: é o comportamento real da referência e o destino é
   * público, sem token nem credencial. A falha de abertura é tratada — o
   * `Alert` informa um erro real, não simula funcionalidade.
   */
  async function abrirCanal() {
    try {
      const suportado = await Linking.canOpenURL(CANAL_YOUTUBE);
      if (!suportado) {
        throw new Error('URL não suportada');
      }
      await Linking.openURL(CANAL_YOUTUBE);
    } catch {
      Alert.alert(
        'Não foi possível abrir o link',
        'Acesse o canal ABRAHOF pelo YouTube.',
      );
    }
  }

  function renderizarItem({ item }: { item: Transmissao }) {
    return <CartaoTransmissao transmissao={item} />;
  }

  return (
    <Tela
      titulo="Transmissão"
      subtitulo="Podcasts ao vivo durante o CIOSP 2026"
      rolavel={false}>
      <FlatList
        data={transmissoes}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EstadoVazio
            icone="videocam-outline"
            titulo="Nenhuma transmissão disponível"
            descricao="A próxima programação será anunciada em breve."
          />
        }
        ListFooterComponent={
          <View style={estilos.rodape}>
            <TituloSecao
              titulo="Canal ABRAHOF"
              descricao="Assista às transmissões no YouTube"
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
    gap: Espacamentos.md,
    paddingBottom: Espacamentos.md,
  },
  rodape: {
    gap: Espacamentos.md,
    marginTop: Espacamentos.xl,
  },
});
