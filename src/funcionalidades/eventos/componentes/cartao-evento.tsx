import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { EventoParceiro } from '../tipos';
import { Cores, Espacamentos, Raios, Sombras, Tipografia } from '@/theme';
import { formatarDataPorExtenso, formatarDiaMes } from '@/utilitarios/data';

type CartaoEventoProps = {
  evento: EventoParceiro;
};

/** Igual ao projeto de referência: local vazio não some, vira "A definir". */
const LOCAL_PADRAO = 'A definir';

/**
 * Cartão de evento.
 *
 * Bloco de data à esquerda, informações à direita. Não reaproveita o `Cartao`
 * de `components/base` porque aquele aceita ícone ou imagem no início, e aqui o
 * início é um bloco composto — acomodar isso lá exigiria abrir o componente
 * para conteúdo arbitrário (docs/ARQUITETURA.md §6).
 *
 * **Informativo: não é pressionável.** Na referência, o cartão traz "Inscrever"
 * quando há `link_inscricao` e "Detalhes" quando não há — este último é um
 * botão sem ação. Sem link real, qualquer um dos dois seria fingimento.
 *
 * Sem altura fixa: o cartão acompanha o texto, então descrição longa não corta
 * nem sobra espaço quando é curta.
 */
export function CartaoEvento({ evento }: CartaoEventoProps) {
  const { titulo, descricao, tipo, data, horario, local, organizador } = evento;
  const { dia, mes } = formatarDiaMes(data);
  const localExibido = local ?? LOCAL_PADRAO;

  // Um rótulo corrido: o leitor de tela anuncia o evento inteiro numa frase,
  // em vez de soletrar "20", "JAN" e os ícones soltos.
  const rotuloAcessivel = [
    titulo,
    tipo,
    formatarDataPorExtenso(data),
    horario ? `às ${horario}` : undefined,
    localExibido,
    organizador ? `Organização: ${organizador}` : undefined,
    descricao,
  ]
    .filter(Boolean)
    .join('. ');

  return (
    <View style={estilos.cartao} accessible accessibilityRole="summary" accessibilityLabel={rotuloAcessivel}>
      <View style={estilos.data} importantForAccessibility="no-hide-descendants">
        <Text style={estilos.mes}>{mes}</Text>
        <Text style={estilos.dia}>{dia}</Text>
      </View>

      <View style={estilos.textos} importantForAccessibility="no-hide-descendants">
        <View style={estilos.selos}>
          <Text style={estilos.tipo}>{tipo}</Text>
          {horario ? (
            <View style={estilos.metaItem}>
              <Ionicons name="time-outline" size={12} color={Cores.textoSuave} />
              <Text style={estilos.meta}>{horario}</Text>
            </View>
          ) : null}
        </View>

        <Text style={estilos.titulo} numberOfLines={2}>
          {titulo}
        </Text>

        <Text style={estilos.descricao} numberOfLines={3}>
          {descricao}
        </Text>

        <View style={estilos.rodape}>
          <View style={estilos.metaItem}>
            <Ionicons name="location-outline" size={12} color={Cores.textoSuave} />
            <Text style={estilos.meta} numberOfLines={1}>
              {localExibido}
            </Text>
          </View>

          {organizador ? (
            <View style={estilos.metaItem}>
              <Ionicons name="people-outline" size={12} color={Cores.textoSuave} />
              <Text style={estilos.meta} numberOfLines={1}>
                {organizador}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    gap: Espacamentos.lg,
    padding: Espacamentos.lg,
    borderRadius: Raios.xxl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
    ...Sombras.cartao,
  },
  data: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Raios.md,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficieAlta,
  },
  mes: {
    ...Tipografia.legenda,
    color: Cores.primaria,
  },
  dia: {
    ...Tipografia.subtitulo,
    color: Cores.primaria,
  },
  textos: {
    flex: 1,
    gap: Espacamentos.xs,
  },
  selos: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Espacamentos.sm,
  },
  tipo: {
    ...Tipografia.legenda,
    paddingHorizontal: Espacamentos.sm,
    paddingVertical: 2,
    borderRadius: Raios.total,
    overflow: 'hidden',
    backgroundColor: Cores.superficieAlta,
    color: Cores.texto,
  },
  titulo: {
    ...Tipografia.rotulo,
    color: Cores.texto,
  },
  descricao: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
  rodape: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Espacamentos.md,
    marginTop: Espacamentos.xs,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Espacamentos.xs,
  },
  meta: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
    flexShrink: 1,
  },
});
