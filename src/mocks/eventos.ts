import type { EventoParceiro } from '@/funcionalidades/eventos/tipos';

/**
 * Eventos — dados mockados para demonstração visual.
 *
 * Diferente de Benefícios e Transmissão, o projeto de referência **não tem
 * eventos fixos no código**: a lista vem de `eventos_parceiros`, e o banco a
 * que temos acesso não foi consultado. Só um evento é conhecido e público — o
 * CIOSP 2026, citado na tela inicial da referência (20 a 25 de janeiro).
 *
 * Os demais existem apenas para dar volume à interface: os tipos vêm das
 * pílulas de filtro da referência (Congresso, Simpósio, Workshop, Curso) e os
 * temas, do domínio da associação. **Nenhum é real** — nada aqui deve ser
 * tratado como agenda, nem chegar a produção.
 *
 * As datas são fixas, em ISO, como `data_evento` devolve. A lista já vem
 * ordenada por data crescente, que é o critério do projeto de referência.
 */
export const EVENTOS: EventoParceiro[] = [
  {
    id: 'ciosp-2026',
    titulo: 'CIOSP 2026',
    descricao:
      'Congresso Internacional de Odontologia de São Paulo, com transmissões e podcasts da ABRAHOF.',
    tipo: 'Congresso',
    data: '2026-01-20',
    horario: '09:00',
    local: 'São Paulo, SP',
    organizador: 'ABRAHOF',
  },
  {
    id: 'simposio-harmonizacao-orofacial',
    titulo: 'Simpósio de Harmonização Orofacial',
    descricao: 'Encontro sobre técnicas e evidências científicas em HOF.',
    tipo: 'Simpósio',
    data: '2026-03-14',
    horario: '08:30',
    local: 'Belo Horizonte, MG',
    organizador: 'ABRAHOF',
  },
  {
    id: 'workshop-preenchedores',
    titulo: 'Workshop de Preenchedores Faciais',
    descricao: 'Prática supervisionada com ácido hialurônico.',
    tipo: 'Workshop',
    data: '2026-05-09',
    local: 'Curitiba, PR',
  },
  {
    id: 'curso-bioestimuladores',
    titulo: 'Curso de Bioestimuladores de Colágeno',
    descricao: 'Protocolos, indicações e manejo de complicações.',
    tipo: 'Curso',
    data: '2026-07-25',
    horario: '14:00',
    organizador: 'ABRAHOF',
  },
  {
    id: 'encontro-nacional-associados',
    titulo: 'Encontro Nacional de Associados',
    descricao: 'Assembleia anual e apresentação das ações da associação.',
    tipo: 'Evento',
    data: '2026-11-07',
    local: 'Rio de Janeiro, RJ',
    organizador: 'ABRAHOF',
  },
];
