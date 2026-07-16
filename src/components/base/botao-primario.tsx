import { BotaoBase, estilosBotao, type BotaoProps } from './botao-base';
import { Cores, Sombras } from '@/theme';

/**
 * Ação principal da tela.
 *
 * No projeto web o fundo é um degradê ciano. Aqui é cor sólida: renderizar
 * degradê exigiria `expo-linear-gradient`, dependência sem justificativa nesta
 * etapa. Os tokens do degradê estão em `Degrades.destaque`. Ver docs/BACKLOG.md.
 */
export function BotaoPrimario(props: BotaoProps) {
  return (
    <BotaoBase
      {...props}
      corTexto={Cores.sobrePrimaria}
      estiloContainer={[estilosBotao.primario, Sombras.destaque]}
    />
  );
}
