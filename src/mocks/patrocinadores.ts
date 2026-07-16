import type { Patrocinador } from '@/funcionalidades/patrocinadores/tipos';

/**
 * Patrocinadores — dados mockados.
 *
 * São os dez apoiadores do projeto de referência, na mesma ordem. Os nomes
 * vieram de lá e nada foi acrescentado: sem descrição, sem nível, sem site —
 * nenhum desses dados existe.
 *
 * **Nenhum tem logotipo, e isso é deliberado.**
 *
 * O projeto de referência renderiza `<img src={abrahofLogo} alt={name} />` em
 * todos os cartões: a tela mostra a marca da ABRAHOF enquanto o leitor de tela
 * anuncia "MedStation". Copiar esse arquivo para repeti-lo dez vezes traria dois
 * problemas de uma vez — exibir a marca errada de quem paga patrocínio, que é
 * questão comercial e não bug, e usar um logo cujo contraste sobre o fundo
 * escuro é 1,8:1, abaixo do mínimo legível.
 *
 * Enquanto os arquivos reais não chegarem, o cartão exibe o nome
 * (docs/REQUISITOS.md §10 e docs/BACKLOG.md, Sprint 1). Quando chegarem, virão
 * de `logo_url` e este arquivo deixa de existir.
 */
export const PATROCINADORES: Patrocinador[] = [
  { id: 'medstation', nome: 'MedStation' },
  { id: 'heioben', nome: 'HEIOBEN' },
  { id: 'facop', nome: 'FACOP' },
  { id: 'apm-events', nome: 'APM EVENTS' },
  { id: 'reobote', nome: 'Reobote' },
  { id: 'oyster-dental', nome: 'OYSTER DENTAL' },
  { id: 'abrahof', nome: 'ABRAHOF' },
  { id: 'ihofg', nome: 'IHOFG' },
  { id: 'maclife', nome: 'MACLIFE' },
  { id: 'ciosp', nome: 'CIOSP' },
];
