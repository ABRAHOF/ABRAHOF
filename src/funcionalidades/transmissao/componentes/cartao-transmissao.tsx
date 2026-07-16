import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';

import type { StatusTransmissao, Transmissao } from '../tipos';
import { Cores, Espacamentos, Raios, Sombras, Tipografia } from '@/theme';
import { formatarDataCurta, formatarDataPorExtenso } from '@/utilitarios/data';

type CartaoTransmissaoProps = {
  transmissao: Transmissao;
};

/** Rótulo de cada situação. É o texto exibido e o lido por leitores de tela. */
const ROTULO_STATUS: Record<StatusTransmissao, string> = {
  'ao-vivo': 'Ao vivo',
  agendada: 'Agendada',
  encerrada: 'Encerrada',
  indisponivel: 'Indisponível',
};

/**
 * Cartão de uma transmissão da programação.
 *
 * **Sem player e sem toque.** Não há `url_stream`, e esta etapa não reproduz
 * vídeo: quem assiste vai ao canal, pelo botão ao final da tela.
 *
 * O marcador da área de mídia usa ícone de câmera, **não de play**. No projeto
 * de referência há um botão de play grande em cada cartão que não reproduz nada
 * — promessa vazia que não vale reproduzir (docs/REQUISITOS.md §3).
 *
 * O status aparece como texto, nunca como cor sozinha: um selo colorido não
 * diz nada a quem não distingue as cores nem a quem usa leitor de tela.
 */
export function CartaoTransmissao({ transmissao }: CartaoTransmissaoProps) {
  const { titulo, descricao, palestrante, idioma, status, data, horario, capa } = transmissao;

  const rotuloStatus = ROTULO_STATUS[status];
  const dataCurta = data ? formatarDataCurta(data) : undefined;

  // Frase corrida para o leitor de tela, em vez de campos soltos e ícones.
  const rotuloAcessivel = [
    palestrante,
    titulo,
    rotuloStatus,
    data ? formatarDataPorExtenso(data) : undefined,
    horario ? `às ${horario}` : undefined,
    idioma === 'PT' ? 'Em português' : 'Em inglês',
    descricao,
  ]
    .filter(Boolean)
    .join('. ');

  return (
    <View style={estilos.cartao} accessible accessibilityRole="summary" accessibilityLabel={rotuloAcessivel}>
      <View style={estilos.midia} importantForAccessibility="no-hide-descendants">
        {capa ? (
          <Image source={capa} style={estilos.capa} contentFit="cover" transition={200} />
        ) : (
          <Ionicons name="videocam-outline" size={32} color={Cores.textoSuave} />
        )}

        <View style={estilos.status}>
          <Text style={estilos.statusTexto}>{rotuloStatus}</Text>
        </View>
      </View>

      <View style={estilos.textos} importantForAccessibility="no-hide-descendants">
        <View style={estilos.meta}>
          {dataCurta ? (
            <Text style={estilos.metaTexto}>
              {dataCurta}
              {horario ? ` · ${horario}` : ''}
            </Text>
          ) : null}
          <Text style={estilos.idioma}>{idioma}</Text>
        </View>

        <Text style={estilos.palestrante} numberOfLines={1}>
          {palestrante}
        </Text>

        <Text style={estilos.titulo} numberOfLines={2}>
          {titulo}
        </Text>

        {descricao ? (
          <Text style={estilos.descricao} numberOfLines={2}>
            {descricao}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  cartao: {
    borderRadius: Raios.xxl,
    borderWidth: 1,
    borderColor: Cores.borda,
    backgroundColor: Cores.superficie,
    overflow: 'hidden',
    ...Sombras.cartao,
  },
  midia: {
    // Proporção derivada da largura, sem altura fixa: a área acompanha a tela
    // e não estoura em aparelho estreito nem sobra em tablet.
    aspectRatio: 16 / 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Cores.superficieAlta,
  },
  capa: {
    width: '100%',
    height: '100%',
  },
  status: {
    position: 'absolute',
    top: Espacamentos.md,
    left: Espacamentos.md,
    paddingHorizontal: Espacamentos.sm,
    paddingVertical: 2,
    borderRadius: Raios.total,
    backgroundColor: Cores.fundo,
    borderWidth: 1,
    borderColor: Cores.borda,
  },
  statusTexto: {
    ...Tipografia.legenda,
    color: Cores.texto,
  },
  textos: {
    padding: Espacamentos.lg,
    gap: Espacamentos.xs,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Espacamentos.sm,
  },
  metaTexto: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
  idioma: {
    ...Tipografia.legenda,
    paddingHorizontal: Espacamentos.sm,
    paddingVertical: 2,
    borderRadius: Raios.total,
    overflow: 'hidden',
    backgroundColor: Cores.superficieAlta,
    color: Cores.texto,
  },
  palestrante: {
    ...Tipografia.rotulo,
    color: Cores.primaria,
  },
  titulo: {
    ...Tipografia.corpoForte,
    color: Cores.texto,
  },
  descricao: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
});
