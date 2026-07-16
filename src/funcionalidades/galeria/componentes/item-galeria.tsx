import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { ItemGaleria as TipoItemGaleria } from '../tipos';
import { Cores, Espacamentos, Raios, Tipografia } from '@/theme';

type ItemGaleriaProps = {
  item: TipoItemGaleria;
  /** Largura definida pela grade, conforme o número de colunas. */
  largura: number;
};

/**
 * Célula da grade da galeria.
 *
 * **Sem interação.** O projeto de referência abre um lightbox ao tocar; aqui
 * não há visualização ampliada, então o item não é `Pressable` nem se anuncia
 * como botão — parecer tocável sem responder ao toque é pior que ser
 * claramente estático.
 *
 * Usa `expo-image` em vez do `Image` do React Native: quando as fotos vierem do
 * Storage, ele traz cache em disco e transição de carregamento sem código
 * extra. A dependência já estava no projeto, instalada pelo template e sem uso
 * até aqui (docs/ARQUITETURA.md §3).
 *
 * Recebe os dados por props e não conhece a origem deles.
 */
export function ItemGaleria({ item, largura }: ItemGaleriaProps) {
  const { titulo, textoAlternativo, imagem } = item;

  return (
    <View style={[estilos.item, { width: largura }]} accessible accessibilityLabel={textoAlternativo}>
      <View style={estilos.moldura}>
        {imagem ? (
          <Image
            source={imagem}
            style={estilos.imagem}
            // `cover`: a miniatura preenche a célula. Foto de evento tolera
            // corte; `contain` deixaria tarjas e quebraria o ritmo da grade.
            contentFit="cover"
            transition={200}
            accessibilityLabel={textoAlternativo}
          />
        ) : (
          // Marcador para imagem ausente — hoje, todos os itens. Também é o que
          // aparece se a foto real falhar ao carregar, em vez de um vão branco.
          <Ionicons name="image-outline" size={28} color={Cores.textoSuave} />
        )}
      </View>

      {titulo ? (
        <Text style={estilos.titulo} numberOfLines={2}>
          {titulo}
        </Text>
      ) : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  item: {
    gap: Espacamentos.sm,
  },
  moldura: {
    // Proporção da referência (4:3), derivada da largura em vez de altura fixa.
    aspectRatio: 4 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Raios.xl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficieAlta,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  titulo: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
    textAlign: 'center',
  },
});
