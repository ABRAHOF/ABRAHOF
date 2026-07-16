import { FlatList, StyleSheet } from 'react-native';

import { CartaoDocumento } from '../componentes/cartao-documento';
import { useDocumentos } from '../hooks/use-documentos';
import type { Documento } from '../tipos';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { Espacamentos } from '@/theme';

/**
 * Documentos institucionais.
 *
 * Uma coluna: título, descrição, formato e tamanho não sobrevivem a meia tela
 * num aparelho estreito — e formato e tamanho são justamente o que não pode
 * ser cortado.
 *
 * `FlatList` em vez de `.map()` num `ScrollView` porque a lista virá da tabela
 * `documentos` e cresce sem limite conhecido. Por isso a `Tela` entra com
 * `rolavel={false}`: aninhar a lista no `ScrollView` dela quebraria a
 * virtualização.
 *
 * Dois elementos do projeto de referência ficaram de fora, ambos sem
 * comportamento por lá: o **botão de download** de cada item e o link **"Ver
 * mais documentos"** (`href="#"`). Nenhum tem destino — não existe arquivo
 * algum, e os tamanhos exibidos lá são digitados à mão.
 */
export function TelaDocumentos() {
  const { documentos } = useDocumentos();

  function renderizarItem({ item }: { item: Documento }) {
    return <CartaoDocumento documento={item} />;
  }

  return (
    <Tela
      titulo="Documentos"
      subtitulo="Materiais e arquivos importantes"
      rolavel={false}>
      <FlatList
        data={documentos}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EstadoVazio
            icone="document-text-outline"
            titulo="Nenhum documento disponível"
            descricao="Novos materiais serão publicados em breve."
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
