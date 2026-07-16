import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { BotaoSecundario } from '@/components/base/botao-secundario';
import { Cartao } from '@/components/base/cartao';
import { Tela } from '@/components/layout/tela';
import { SECOES } from '@/constants/secoes';
import { Espacamentos } from '@/theme';

export default function TelaInicial() {
  const router = useRouter();

  return (
    <Tela
      titulo="Início"
      subtitulo="Estrutura inicial do aplicativo. As seções abaixo já são navegáveis, mas ainda não possuem conteúdo.">
      <View style={estilos.lista}>
        {SECOES.map((secao) => (
          <Cartao
            key={secao.titulo}
            titulo={secao.titulo}
            descricao={secao.descricao}
            icone={secao.icone}
            onPress={() => router.push(secao.rota)}
          />
        ))}
      </View>
      <BotaoSecundario titulo="Entrar" onPress={() => router.push('/login')} larguraTotal />
    </Tela>
  );
}

const estilos = StyleSheet.create({
  lista: {
    gap: Espacamentos.md,
  },
});
