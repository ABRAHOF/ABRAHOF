import { FlatList, StyleSheet, useWindowDimensions } from 'react-native';

import { ItemGaleria } from '../componentes/item-galeria';
import { useGaleria } from '../hooks/use-galeria';
import type { ItemGaleria as TipoItemGaleria } from '../tipos';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { Espacamentos } from '@/theme';

/** Padding horizontal aplicado pela `Tela`, dos dois lados. */
const PADDING_TELA = Espacamentos.xl * 2;
const ESPACO_ENTRE_ITENS = Espacamentos.md;
const COLUNAS = 2;

/**
 * Galeria de fotos.
 *
 * Duas colunas em 4:3, como no projeto de referência: as legendas são curtas
 * ("Palestra", "Networking") e não sofrem com a largura de meia tela. A largura
 * do item vem de `useWindowDimensions`, então acompanha o aparelho.
 *
 * `FlatList` em vez de `.map()` num `ScrollView` porque a galeria virá da
 * tabela `galeria` e cresce sem limite conhecido — é a tela com maior chance de
 * lista longa do aplicativo. Por isso a `Tela` entra com `rolavel={false}`:
 * aninhar a lista no `ScrollView` dela quebraria a virtualização.
 *
 * Duas diferenças em relação à referência:
 *
 * - **Sem lightbox**: a visualização ampliada não faz parte desta etapa, então
 *   os itens não são tocáveis.
 * - **Com legenda visível**: lá o texto existe apenas no `alt`. Sem foto real,
 *   o marcador sozinho não comunicaria nada — e mesmo com foto, a legenda ajuda
 *   quem não enxerga a imagem.
 */
export function TelaGaleria() {
  const { itens } = useGaleria();
  const { width } = useWindowDimensions();

  const larguraDisponivel = width - PADDING_TELA - ESPACO_ENTRE_ITENS * (COLUNAS - 1);
  const larguraItem = Math.floor(larguraDisponivel / COLUNAS);

  function renderizarItem({ item }: { item: TipoItemGaleria }) {
    return <ItemGaleria item={item} largura={larguraItem} />;
  }

  return (
    <Tela
      titulo="Galeria"
      subtitulo="Momentos marcantes dos nossos eventos"
      rolavel={false}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        numColumns={COLUNAS}
        columnWrapperStyle={estilos.coluna}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EstadoVazio
            icone="images-outline"
            titulo="Nenhuma foto disponível"
            descricao="Novos registros serão publicados em breve."
          />
        }
      />
    </Tela>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: ESPACO_ENTRE_ITENS,
    paddingBottom: Espacamentos.md,
  },
  coluna: {
    gap: ESPACO_ENTRE_ITENS,
  },
});
