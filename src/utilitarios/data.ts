/**
 * Formatação de datas.
 *
 * Deliberadamente sem `Date` e sem biblioteca.
 *
 * O projeto de referência faz `new Date(evento.data_evento)` e formata com
 * date-fns. Repetir isso aqui traria um bug real: uma data ISO sem hora
 * (`"2026-01-20"`) é interpretada como meia-noite **UTC**, e em GMT-3 volta
 * para 19/01 — o cartão anunciaria o dia anterior. Fatiar a string evita o
 * problema na origem, dispensa dependência e é determinístico.
 *
 * Quando o Supabase entrar, `data_evento` chega como ISO (`timestamptz`), que
 * é o formato que estas funções já recebem. Se passar a existir necessidade de
 * fuso — evento em outro estado, contagem regressiva — aí sim vale a discussão
 * sobre `Intl` ou biblioteca.
 */

const MESES_ABREVIADOS = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
] as const;

const MESES_POR_EXTENSO = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

/** Placeholder do projeto de referência para data ausente. */
const VAZIO = '--';

type DiaMes = {
  /** Dia com dois dígitos: "20". */
  dia: string;
  /** Mês abreviado e maiúsculo, como no cartão: "JAN". */
  mes: string;
};

/** Quebra uma data ISO em dia e mês para o bloco de data do cartão. */
export function formatarDiaMes(dataIso: string): DiaMes {
  const [ano, mes, dia] = dataIso.slice(0, 10).split('-');
  const indice = Number(mes) - 1;

  if (!ano || !dia || Number.isNaN(indice) || !MESES_ABREVIADOS[indice]) {
    return { dia: VAZIO, mes: VAZIO };
  }

  return { dia, mes: MESES_ABREVIADOS[indice] };
}

/** Data por extenso, para leitores de tela: "20 de janeiro de 2026". */
export function formatarDataPorExtenso(dataIso: string): string {
  const [ano, mes, dia] = dataIso.slice(0, 10).split('-');
  const indice = Number(mes) - 1;

  if (!ano || !dia || Number.isNaN(indice) || !MESES_POR_EXTENSO[indice]) {
    return '';
  }

  return `${Number(dia)} de ${MESES_POR_EXTENSO[indice]} de ${ano}`;
}
