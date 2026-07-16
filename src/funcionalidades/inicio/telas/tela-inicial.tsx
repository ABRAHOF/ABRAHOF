import { useRouter } from 'expo-router';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import { CartaoMenu } from '../componentes/cartao-menu';
import { SeloOficial } from '../componentes/selo-oficial';
import { BotaoPrimario } from '@/components/base/botao-primario';
import { BotaoSecundario } from '@/components/base/botao-secundario';
import { Tela } from '@/components/layout/tela';
import { EVENTO_DESTAQUE } from '@/constants/evento';
import { SECOES } from '@/constants/secoes';
import { Cores, Espacamentos, Tipografia } from '@/theme';

/** Padding horizontal aplicado pela `Tela`, dos dois lados. */
const PADDING_TELA = Espacamentos.xl * 2;
const ESPACO_ENTRE_CARTOES = Espacamentos.md;

/** A partir desta largura cabem três colunas sem espremer os rótulos. */
const LARGURA_TRES_COLUNAS = 600;

/**
 * Tela inicial: hub de navegação do aplicativo.
 *
 * Reproduz a estrutura da referência — chamada do evento, destaque da
 * transmissão, grade de seções e selo oficial — com as diferenças registradas
 * no relatório: sem degradês, sem animação de entrada e sem os botões de menu e
 * sino, que na web não executam nada.
 *
 * O selo de chancela do topo foi removido **temporariamente**, aqui e na tela
 * de Eventos. O arquivo continua em `assets/images/selo-chancela.png`, hoje sem
 * uso no código.
 */
export function TelaInicial() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const colunas = width >= LARGURA_TRES_COLUNAS ? 3 : 2;
  const larguraDisponivel = width - PADDING_TELA - ESPACO_ENTRE_CARTOES * (colunas - 1);
  const larguraCartao = Math.floor(larguraDisponivel / colunas);

  return (
    <Tela marca={EVENTO_DESTAQUE.nome} voltar={false}>
      <View style={estilos.hero}>
        <Text style={estilos.periodo}>{EVENTO_DESTAQUE.periodo}</Text>
        <Text style={estilos.chamada}>{EVENTO_DESTAQUE.chamada}</Text>
      </View>

      <BotaoPrimario
        titulo="Transmissão"
        icone="play"
        onPress={() => router.push('/transmissao')}
        larguraTotal
      />

      <View style={estilos.grade}>
        {SECOES.map((secao) => (
          <CartaoMenu
            key={secao.titulo}
            titulo={secao.titulo}
            icone={secao.icone}
            largura={larguraCartao}
            onPress={() => router.push(secao.rota)}
          />
        ))}
      </View>

      <BotaoSecundario
        titulo="Área Restrita"
        icone="lock-closed-outline"
        onPress={() => router.push('/login')}
        larguraTotal
      />

      <SeloOficial />
    </Tela>
  );
}

const estilos = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: Espacamentos.sm,
  },
  periodo: {
    ...Tipografia.corpoForte,
    color: Cores.primaria,
    textAlign: 'center',
  },
  chamada: {
    ...Tipografia.apoio,
    color: Cores.textoSuave,
    textAlign: 'center',
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ESPACO_ENTRE_CARTOES,
  },
});
