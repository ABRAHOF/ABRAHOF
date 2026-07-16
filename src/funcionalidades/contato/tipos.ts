import type { Ionicons } from '@expo/vector-icons';

/**
 * Informação institucional de contato.
 *
 * Não vem do banco: `contatos` guarda **mensagens recebidas**, não os dados da
 * associação. Não existe tabela para isto — é configuração, não conteúdo
 * dinâmico (docs/BANCO.md §11).
 */
export type InformacaoContato = {
  id: string;
  /** "E-mail", "Endereço". */
  rotulo: string;
  valor: string;
  icone: keyof typeof Ionicons.glyphMap;
};
