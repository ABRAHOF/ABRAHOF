import { BotaoBase, estilosBotao, type BotaoProps } from './botao-base';
import { Cores } from '@/theme';

/** Ação de apoio: acompanha um `BotaoPrimario` ou aparece isolada em contexto neutro. */
export function BotaoSecundario(props: BotaoProps) {
  return (
    <BotaoBase {...props} corTexto={Cores.primaria} estiloContainer={estilosBotao.secundario} />
  );
}
