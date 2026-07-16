import { StyleSheet, Text, View } from 'react-native';

import type { Beneficio } from '../tipos';
import { Cartao } from '@/components/base/cartao';
import { Cores, Espacamentos, Raios, Tipografia } from '@/theme';

type CartaoBeneficioProps = {
  beneficio: Beneficio;
};

/**
 * Cartão de benefício.
 *
 * Reaproveita o `Cartao` de `components/base`: a anatomia é a mesma —
 * ícone à esquerda, metadados, título e descrição. Este componente só decide
 * *o que* mostrar; o `Cartao` decide *como* (docs/ARQUITETURA.md §6).
 *
 * **Informativo: não é pressionável.** No projeto de referência também não é, e
 * não há para onde ir: as colunas `link` e `codigo_promocional` existem no
 * banco mas não chegam à tela. Sem elas, o benefício é um anúncio — e um
 * `onPress` aqui só poderia fingir (docs/REQUISITOS.md §7).
 *
 * Recebe os dados por props e não conhece a origem deles.
 */
export function CartaoBeneficio({ beneficio }: CartaoBeneficioProps) {
  const { titulo, descricao, categoria, desconto, icone } = beneficio;

  return (
    <Cartao
      icone={icone}
      titulo={titulo}
      descricao={descricao}
      // Quatro linhas: a descrição mais longa tem 82 caracteres e, num iPhone
      // SE, o padrão de duas cortaria a condição do benefício no meio.
      linhasDescricao={4}
      meta={
        <View style={estilos.selos}>
          <Text style={[estilos.selo, estilos.categoria]}>{categoria}</Text>
          <Text style={[estilos.selo, estilos.desconto]}>{desconto}</Text>
        </View>
      }
    />
  );
}

const estilos = StyleSheet.create({
  selos: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: Espacamentos.sm,
  },
  selo: {
    ...Tipografia.legenda,
    paddingHorizontal: Espacamentos.sm,
    paddingVertical: 2,
    borderRadius: Raios.total,
    overflow: 'hidden',
  },
  categoria: {
    backgroundColor: Cores.superficieAlta,
    color: Cores.texto,
  },
  desconto: {
    backgroundColor: Cores.primaria,
    color: Cores.sobrePrimaria,
  },
});
