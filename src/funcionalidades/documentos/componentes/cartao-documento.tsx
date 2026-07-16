import type { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { Documento, TipoArquivo } from '../tipos';
import { Cartao } from '@/components/base/cartao';
import { Cores, Espacamentos, Raios, Tipografia } from '@/theme';
import { formatarTamanho } from '@/utilitarios/arquivo';

type CartaoDocumentoProps = {
  documento: Documento;
};

type ApresentacaoTipo = {
  icone: keyof typeof Ionicons.glyphMap;
  /** Texto exibido no selo e lido pelo leitor de tela. */
  rotulo: string;
};

/**
 * Ícone e rótulo por formato.
 *
 * O rótulo textual acompanha o ícone de propósito: ícone sozinho não distingue
 * confiavelmente um PDF de um documento de texto, e cor nenhuma comunica
 * formato.
 */
const APRESENTACAO: Record<TipoArquivo, ApresentacaoTipo> = {
  pdf: { icone: 'document-text-outline', rotulo: 'PDF' },
  doc: { icone: 'document-outline', rotulo: 'DOC' },
  docx: { icone: 'document-outline', rotulo: 'DOCX' },
  xls: { icone: 'grid-outline', rotulo: 'XLS' },
  xlsx: { icone: 'grid-outline', rotulo: 'XLSX' },
  imagem: { icone: 'image-outline', rotulo: 'Imagem' },
  outro: { icone: 'document-attach-outline', rotulo: 'Arquivo' },
};

/**
 * Item da lista de documentos.
 *
 * Reaproveita o `Cartao` de `components/base`: a anatomia é a mesma — ícone à
 * esquerda, metadados, título e descrição. Este componente decide *o que*
 * mostrar; o `Cartao` decide *como* (docs/ARQUITETURA.md §6).
 *
 * **Informativo: sem botão de download.** No projeto de referência o botão
 * existe e não faz nada — não há `arquivo_url`, não há arquivo no Storage, e os
 * tamanhos exibidos são inventados. Um botão aqui prometeria o que o projeto
 * não tem (docs/REQUISITOS.md §6). Ele volta quando os arquivos existirem.
 */
export function CartaoDocumento({ documento }: CartaoDocumentoProps) {
  const { titulo, descricao, tipoArquivo, tamanhoBytes } = documento;
  const { icone, rotulo } = APRESENTACAO[tipoArquivo];
  const tamanho = tamanhoBytes ? formatarTamanho(tamanhoBytes) : undefined;

  return (
    <Cartao
      icone={icone}
      titulo={titulo}
      descricao={descricao}
      // Três linhas: a descrição mais longa tem 57 caracteres e, num aparelho
      // estreito, o padrão de duas cortaria o final.
      linhasDescricao={3}
      meta={
        <View style={estilos.meta}>
          <Text style={estilos.selo}>{rotulo}</Text>
          {tamanho ? <Text style={estilos.tamanho}>{tamanho}</Text> : null}
        </View>
      }
    />
  );
}

const estilos = StyleSheet.create({
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Espacamentos.sm,
  },
  selo: {
    ...Tipografia.legenda,
    paddingHorizontal: Espacamentos.sm,
    paddingVertical: 2,
    borderRadius: Raios.total,
    overflow: 'hidden',
    backgroundColor: Cores.superficieAlta,
    color: Cores.texto,
  },
  tamanho: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
});
