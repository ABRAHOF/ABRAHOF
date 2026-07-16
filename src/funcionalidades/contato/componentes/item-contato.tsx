import { StyleSheet, Text } from 'react-native';

import type { InformacaoContato } from '../tipos';
import { Cartao } from '@/components/base/cartao';
import { Cores, Tipografia } from '@/theme';

type ItemContatoProps = {
  informacao: InformacaoContato;
};

/**
 * Bloco de informação institucional.
 *
 * Reaproveita o `Cartao` de `components/base`: ícone à esquerda, rótulo acima e
 * valor em destaque. Este componente decide *o que* mostrar; o `Cartao` decide
 * *como* (docs/ARQUITETURA.md §6).
 *
 * **Informativo: não é pressionável.** Abrir e-mail ou mapa não faz parte desta
 * etapa, e o projeto de referência também não torna esses blocos clicáveis.
 * Parecer tocável sem responder ao toque é pior que ser claramente estático.
 */
export function ItemContato({ informacao }: ItemContatoProps) {
  const { rotulo, valor, icone } = informacao;

  return (
    <Cartao
      icone={icone}
      titulo={valor}
      meta={<Text style={estilos.rotulo}>{rotulo}</Text>}
    />
  );
}

const estilos = StyleSheet.create({
  rotulo: {
    ...Tipografia.legenda,
    color: Cores.textoSuave,
  },
});
