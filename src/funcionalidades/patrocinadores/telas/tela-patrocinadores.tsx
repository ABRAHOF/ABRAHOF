import { useRouter } from 'expo-router';
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import { CartaoPatrocinador } from '../componentes/cartao-patrocinador';
import { usePatrocinadores } from '../hooks/use-patrocinadores';
import type { Patrocinador } from '../tipos';
import { BotaoPrimario } from '@/components/base/botao-primario';
import { TituloSecao } from '@/components/base/titulo-secao';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { Espacamentos } from '@/theme';

/** Padding horizontal aplicado pela `Tela`, dos dois lados. */
const PADDING_TELA = Espacamentos.xl * 2;
const ESPACO_ENTRE_CARTOES = Espacamentos.md;
const COLUNAS = 2;

/**
 * Patrocinadores.
 *
 * Duas colunas, como no projeto de referência: os nomes são curtos ("FACOP",
 * "IHOFG") e cabem folgados mesmo nos 130pt de coluna de um iPhone SE. A
 * largura vem de `useWindowDimensions`, então acompanha o aparelho.
 *
 * `FlatList` em vez de `.map()` num `ScrollView` porque a lista virá da tabela
 * `patrocinadores` e cresce conforme os contratos. Por isso a `Tela` entra com
 * `rolavel={false}`: aninhar a lista no `ScrollView` dela quebraria a
 * virtualização.
 *
 * Sem separação por nível de patrocínio: a coluna `categoria` existe no banco,
 * está vazia, e a referência trata os dez como iguais. Criar níveis aqui seria
 * inventar hierarquia comercial (docs/BANCO.md §12).
 */
export function TelaPatrocinadores() {
  const { patrocinadores } = usePatrocinadores();
  const { width } = useWindowDimensions();
  const router = useRouter();

  const larguraDisponivel = width - PADDING_TELA - ESPACO_ENTRE_CARTOES * (COLUNAS - 1);
  const larguraCartao = Math.floor(larguraDisponivel / COLUNAS);

  function renderizarItem({ item }: { item: Patrocinador }) {
    return <CartaoPatrocinador patrocinador={item} largura={larguraCartao} />;
  }

  return (
    <Tela
      titulo="Patrocinadores"
      subtitulo="Empresas que apoiam a excelência em HOF"
      rolavel={false}>
      <FlatList
        data={patrocinadores}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        numColumns={COLUNAS}
        columnWrapperStyle={estilos.coluna}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EstadoVazio
            icone="heart-outline"
            titulo="Nenhum patrocinador disponível"
            descricao="Os apoiadores serão anunciados em breve."
          />
        }
        ListFooterComponent={
          <View style={estilos.rodape}>
            <TituloSecao titulo="Quer ser um patrocinador?" />
            {/*
              No projeto de referência este botão não tem ação. Aqui ele leva à
              tela de Contato, que já existe — destino natural e comportamento
              real, ainda que o conteúdo daquela tela esteja em construção.
            */}
            <BotaoPrimario
              titulo="Entre em contato"
              onPress={() => router.push('/contato')}
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
    marginTop: Espacamentos.xl,
  },
});
