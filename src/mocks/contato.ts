import type { InformacaoContato } from '@/funcionalidades/contato/tipos';

/**
 * Informações institucionais.
 *
 * **Duas das três informações do projeto de referência não estão aqui:**
 *
 * - **Telefone** (`+55 11 99999-9999`): placeholder evidente. Publicar um
 *   número falso é pior que não exibir telefone — quem tentar ligar não chega a
 *   lugar nenhum (docs/REQUISITOS.md §9).
 * - **Redes sociais**: os quatro ícones da referência não têm um único `href`.
 *   Sem endereço, seriam quatro botões falsos.
 *
 * ⚠️ **O e-mail precisa ser confirmado antes de qualquer publicação.** A
 * referência exibe `contato@abrahof.com.br` (`.com.br`), mas o site oficial —
 * usado no menu e no CTA de adesão — é `abrahof.org.br` (`.org.br`). Os dois
 * domínios não batem, e um deles está errado.
 *
 * Nada aqui é dado pessoal: são canais institucionais públicos.
 */
export const INFORMACOES_CONTATO: InformacaoContato[] = [
  {
    id: 'email',
    rotulo: 'E-mail',
    valor: 'contato@abrahof.com.br',
    icone: 'mail-outline',
  },
  {
    id: 'endereco',
    rotulo: 'Endereço',
    valor: 'São Paulo, SP - Brasil',
    icone: 'location-outline',
  },
];
