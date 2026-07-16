import { FlatList, StyleSheet } from 'react-native';

import { CartaoEvento } from '../componentes/cartao-evento';
import { useEventos } from '../hooks/use-eventos';
import type { EventoParceiro } from '../tipos';
import { TituloSecao } from '@/components/base/titulo-secao';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { Espacamentos } from '@/theme';

/**
 * Eventos e Parceiros.
 *
 * Uma coluna: bloco de data, selo de tipo, título, descrição e local não
 * sobrevivem à largura de meia tela num aparelho estreito — e data e local são
 * justamente o que não pode ser cortado.
 *
 * `FlatList` em vez de `.map()` num `ScrollView` porque a lista virá de
 * `eventos_parceiros` e cresce sem limite conhecido. Por isso a `Tela` entra
 * com `rolavel={false}`: aninhar a lista no `ScrollView` dela quebraria a
 * virtualização.
 *
 * Elementos do projeto de referência que ficaram de fora — os três primeiros
 * por não terem comportamento por lá:
 *
 * - **Pílulas de filtro** (Todos, Congresso, Simpósio…): decorativas — não
 *   existe coluna `tipo` no banco por onde filtrar (docs/BANCO.md §4).
 * - **Estatísticas** ("25+ eventos/ano", "15 parceiros", "27 estados"): texto
 *   fixo. "27 estados" sequer é calculável, com `local` em texto livre.
 * - **"Ver calendário" e "Solicitar Chancela"**: botões sem ação, e sem destino
 *   para onde apontar.
 * - **Selo de chancela** no topo da lista: removido **temporariamente**, como
 *   na tela inicial. O arquivo continua em `assets/images/selo-chancela.png`.
 */
export function TelaEventos() {
  const { eventos } = useEventos();

  function renderizarItem({ item }: { item: EventoParceiro }) {
    return <CartaoEvento evento={item} />;
  }

  return (
    <Tela
      titulo="Eventos e Parceiros"
      subtitulo="Eventos chancelados pela ABRAHOF"
      rolavel={false}>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<TituloSecao titulo="Próximos Eventos" />}
        ListEmptyComponent={
          <EstadoVazio
            icone="calendar-outline"
            titulo="Nenhum evento disponível"
            descricao="Novos eventos chancelados serão anunciados em breve."
          />
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
});
