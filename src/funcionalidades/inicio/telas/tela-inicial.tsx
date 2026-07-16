import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

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
 * Reproduz a estrutura da referência — selo, chamada do evento, destaque da
 * transmissão, grade de seções e selo oficial — com as diferenças registradas
 * no relatório: sem degradês, sem animação de entrada e sem os botões de menu e
 * sino, que na web não executam nada.
 */
export function TelaInicial() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const colunas = width >= LARGURA_TRES_COLUNAS ? 3 : 2;
  const larguraDisponivel = width - PADDING_TELA - ESPACO_ENTRE_CARTOES * (colunas - 1);
  const larguraCartao = Math.floor(larguraDisponivel / colunas);

  return (
    <Tela marca={EVENTO_DESTAQUE.nome} voltar={false} estiloConteudo={estilos.conteudo}>
      <View style={estilos.hero}>
        <Image
          source={require('../../../../assets/images/selo-chancela.png')}
          style={estilos.selo}
          resizeMode="contain"
          accessibilityLabel="Selo de chancela ABRAHOF 2026"
        />
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
  /**
   * O padding padrão da `Tela` (24) somava 36pt com o rodapé do cabeçalho e
   * afastava demais o selo do topo. Reduzido só aqui: as demais telas abrem com
   * título, que precisa desse respiro.
   */
  conteudo: {
    paddingTop: Espacamentos.md,
  },
  hero: {
    alignItems: 'center',
    gap: Espacamentos.sm,
  },
  selo: {
    // Largura responsiva com teto: em medida fixa o selo ocupa quase metade da
    // largura útil num iPhone SE e um terço num Pro Max — quanto menor a tela,
    // maior ele parece.
    width: '28%',
    maxWidth: 104,
    // O arquivo é quadrado (1500×1500). Definir só a largura e deixar a altura
    // sair daqui preserva a proporção sem esticar nem cortar.
    aspectRatio: 1,
    // Sem margem: o `gap` do hero já separa o selo do texto. Somar os dois é o
    // que criava espaço extra logo abaixo da imagem.
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
