import type { Ionicons } from '@expo/vector-icons';

/**
 * Benefício do Clube de Benefícios.
 *
 * **Atenção ao conflito entre modelo e tela.** A tabela `clube_beneficios` tem
 * a coluna `parceiro` (NOT NULL), que espera uma empresa nomeada — "MedStation".
 * A tela do projeto de referência lista *categorias de vantagem* — "Congressos
 * e Eventos", "Equipamentos Estéticos". São modelos diferentes de negócio, e a
 * resposta muda a tela inteira (docs/BANCO.md §9, Decisão 3 pendente).
 *
 * Este tipo segue a tela, que é o único dado concreto que existe. Por isso não
 * há campo `parceiro`: inventar empresas seria criar informação que ninguém
 * validou.
 *
 * Campos previstos no banco e ausentes aqui por ainda não existirem em lugar
 * nenhum: `codigo_promocional`, `link` e `logo_url` — justamente os que tornam
 * o benefício resgatável (docs/REQUISITOS.md §7).
 */
export type Beneficio = {
  id: string;
  titulo: string;
  descricao: string;
  /** Agrupamento exibido como selo. Ex.: "Laboratórios". */
  categoria: string;
  /**
   * Texto livre, como no banco: "20% OFF", "Até 30% OFF".
   *
   * Não é comparável nem somável — é por isso que a estatística "40% desconto
   * máx." da referência é fixa no código, e está errada (há um benefício de
   * 50%). Deveria ser valor + tipo (docs/BANCO.md §9).
   */
  desconto: string;
  icone: keyof typeof Ionicons.glyphMap;
};
