import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { Botao } from '@/components/botao';
import { CartaoSecao } from '@/components/cartao-secao';
import { TelaBase } from '@/components/tela-base';
import { SECOES } from '@/constants/secoes';
import { Espacamentos } from '@/constants/tema';

export default function TelaInicial() {
  const router = useRouter();

  return (
    <TelaBase
      titulo="Início"
      descricao="Estrutura inicial do aplicativo. As seções abaixo já são navegáveis, mas ainda não possuem conteúdo.">
      <View style={estilos.lista}>
        {SECOES.map((secao) => (
          <CartaoSecao key={secao.titulo} secao={secao} />
        ))}
      </View>
      <Botao titulo="Entrar" variante="secundario" onPress={() => router.push('/login')} />
    </TelaBase>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: Espacamentos.medio,
  },
});
