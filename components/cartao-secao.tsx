import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Secao } from '@/constants/secoes';
import { Cores, Espacamentos, Raios } from '@/constants/tema';

type CartaoSecaoProps = {
  secao: Secao;
};

export function CartaoSecao({ secao }: CartaoSecaoProps) {
  return (
    <Link href={secao.rota} asChild>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={secao.titulo}
        style={({ pressed }) => [estilos.cartao, pressed && estilos.pressionado]}>
        <View style={estilos.icone}>
          <Ionicons name={secao.icone} size={22} color={Cores.primaria} />
        </View>
        <View style={estilos.textos}>
          <Text style={estilos.titulo}>{secao.titulo}</Text>
          <Text style={estilos.descricao}>{secao.descricao}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={Cores.textoSecundario} />
      </Pressable>
    </Link>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.medio,
    padding: Espacamentos.medio,
    borderRadius: Raios.medio,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
  },
  pressionado: {
    opacity: 0.7,
  },
  icone: {
    width: 44,
    height: 44,
    borderRadius: Raios.medio,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.primariaClara,
  },
  textos: {
    flex: 1,
    gap: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    color: Cores.texto,
  },
  descricao: {
    fontSize: 13,
    color: Cores.textoSecundario,
  },
});
