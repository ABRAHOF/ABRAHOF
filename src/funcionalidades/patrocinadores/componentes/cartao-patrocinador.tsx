import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { Patrocinador } from '../tipos';
import { Cores, Espacamentos, Raios, Sombras, Tipografia } from '@/theme';

type CartaoPatrocinadorProps = {
  patrocinador: Patrocinador;
  /** Largura definida pela grade, conforme o número de colunas. */
  largura: number;
};

/**
 * Cartão de patrocinador.
 *
 * **Sem interação.** Não há `site_url` para abrir, e o projeto de referência
 * também não torna o cartão clicável. Por isso não é `Pressable` nem se anuncia
 * como botão.
 *
 * Quando não há logotipo — hoje, todos —, o nome ocupa o lugar dele em
 * tipografia de destaque. É a recomendação de docs/REQUISITOS.md §10: o nome
 * legível diz a verdade; o logo de outra empresa, não.
 *
 * Com logotipo, `contain` preserva a proporção do arquivo e acomoda tanto marca
 * horizontal quanto quadrada dentro da mesma moldura, sem esticar nem cortar.
 *
 * Vertical e em grade, ao contrário do `Cartao` de `components/base`, que é
 * horizontal — daí ser um componente próprio (docs/ARQUITETURA.md §6).
 */
export function CartaoPatrocinador({ patrocinador, largura }: CartaoPatrocinadorProps) {
  const { nome, logotipo } = patrocinador;

  return (
    <View style={[estilos.cartao, { width: largura }]} accessible accessibilityLabel={nome}>
      <View style={estilos.moldura}>
        {logotipo ? (
          <Image
            source={logotipo}
            style={estilos.logotipo}
            contentFit="contain"
            accessibilityLabel={nome}
          />
        ) : (
          <Text style={estilos.marca} numberOfLines={2}>
            {nome}
          </Text>
        )}
      </View>

      {logotipo ? (
        <Text style={estilos.nome} numberOfLines={2}>
          {nome}
        </Text>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Espacamentos.sm,
    paddingVertical: Espacamentos.lg,
    paddingHorizontal: Espacamentos.md,
    borderRadius: Raios.xxl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
    ...Sombras.cartao,
  },
  moldura: {
    width: '100%',
    // Proporção em vez de altura fixa: a moldura acompanha a coluna e não cria
    // vão vertical em aparelho estreito.
    aspectRatio: 5 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logotipo: {
    width: '100%',
    height: '100%',
  },
  /** Nome no lugar do logotipo, enquanto os arquivos reais não existem. */
  marca: {
    ...Tipografia.corpoForte,
    color: Cores.texto,
    textAlign: 'center',
  },
  /** Nome abaixo do logotipo, quando houver imagem. */
  nome: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
    textAlign: 'center',
  },
});
