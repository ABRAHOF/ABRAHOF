/**
 * Tema do aplicativo.
 *
 * Ponto único de acesso aos valores visuais. Componentes importam daqui:
 *
 *   import { Cores, Espacamentos } from '@/theme';
 *
 * Nenhum valor visual — cor, espaçamento, raio, sombra, tamanho de texto —
 * deve ser escrito diretamente em um componente.
 */

export { Cores, Degrades, OPACIDADE_DESABILITADO, OPACIDADE_PRESSIONADO } from './colors';
export { ALTURA_CONTROLE, ALVO_TOQUE_MINIMO, Espacamentos } from './spacing';
export { Raios } from './radius';
export { Sombras } from './shadows';
export { Pesos, Tamanhos, Tipografia, type Peso, type VarianteTipografia } from './typography';
