import { Alert, FlatList, Linking, StyleSheet, View } from 'react-native';

import { CartaoBeneficio } from '../componentes/cartao-beneficio';
import { useBeneficios } from '../hooks/use-beneficios';
import type { Beneficio } from '../tipos';
import { BotaoPrimario } from '@/components/base/botao-primario';
import { TituloSecao } from '@/components/base/titulo-secao';
import { EstadoVazio } from '@/components/feedback/estado-vazio';
import { Tela } from '@/components/layout/tela';
import { LINK_ADESAO } from '@/constants/links';
import { Espacamentos } from '@/theme';

/**
 * Clube de Benefícios.
 *
 * Uma coluna, como no projeto de referência: as descrições chegam a 82
 * caracteres e, somadas aos dois selos, ficariam ilegíveis em duas colunas num
 * aparelho estreito.
 *
 * `FlatList` em vez de `.map()` num `ScrollView` porque a lista virá de
 * `clube_beneficios` e cresce sem limite conhecido. Por isso a `Tela` entra com
 * `rolavel={false}`: aninhar a lista no `ScrollView` dela quebraria a
 * virtualização.
 *
 * **As três estatísticas do topo da referência ("50+ Parceiros", "40% Desconto
 * máx.", "∞ Uso ilimitado") foram omitidas.** São texto fixo que os próprios
 * dados desmentem: a tela lista 10 itens, não 50+, e anuncia teto de 40%
 * enquanto exibe um benefício de 50% logo abaixo. Voltam quando forem
 * calculadas (docs/REQUISITOS.md §7).
 */
export function TelaBeneficios() {
  const { beneficios } = useBeneficios();

  /**
   * Abre a página pública de adesão.
   *
   * Único elemento pressionável da tela: é o comportamento real da referência e
   * o destino é público, sem parâmetros nem credenciais. A falha de abertura é
   * tratada — o `Alert` aqui informa um erro real, não simula funcionalidade.
   */
  async function abrirAdesao() {
    try {
      const suportado = await Linking.canOpenURL(LINK_ADESAO);
      if (!suportado) {
        throw new Error('URL não suportada');
      }
      await Linking.openURL(LINK_ADESAO);
    } catch {
      Alert.alert(
        'Não foi possível abrir o link',
        'Acesse abrahof.org.br/adesao pelo navegador.',
      );
    }
  }

  function renderizarItem({ item }: { item: Beneficio }) {
    return <CartaoBeneficio beneficio={item} />;
  }

  return (
    <Tela
      titulo="Clube de Benefícios"
      subtitulo="Vantagens exclusivas para associados ABRAHOF"
      rolavel={false}>
      <FlatList
        data={beneficios}
        keyExtractor={(item) => item.id}
        renderItem={renderizarItem}
        contentContainerStyle={estilos.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EstadoVazio
            icone="gift-outline"
            titulo="Nenhum benefício disponível"
            descricao="Novas vantagens serão adicionadas em breve."
          />
        }
        ListFooterComponent={
          <View style={estilos.rodape}>
            <TituloSecao
              titulo="Ainda não é associado?"
              descricao="Torne-se membro e aproveite todos os benefícios exclusivos"
            />
            <BotaoPrimario titulo="Quero ser Associado" onPress={abrirAdesao} larguraTotal />
          </View>
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
  rodape: {
    gap: Espacamentos.md,
    marginTop: Espacamentos.xl,
  },
});
