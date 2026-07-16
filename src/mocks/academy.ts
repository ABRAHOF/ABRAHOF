import type { ConteudoAcademy } from '@/funcionalidades/academy/tipos';

/**
 * Conteúdos da Academy — dados mockados.
 *
 * Provisórios: a tabela `academy_cursos` é uma das três que o projeto de
 * referência já consome, então estes registros são substituídos por consulta
 * real na Sprint 6 (docs/BACKLOG.md). A troca acontece no serviço; a tela não
 * muda.
 *
 * Nada aqui vem do banco antigo: sem identificadores, sem URLs, sem thumbnails.
 * Os títulos apenas representam o domínio (Harmonização Orofacial) para dar
 * volume à interface.
 */
export const CONTEUDOS_ACADEMY: ConteudoAcademy[] = [
  {
    id: 'anatomia-facial-aplicada',
    titulo: 'Anatomia facial aplicada à harmonização',
    instrutor: 'Dra. Amanda Almeida',
    cargaHoraria: '4h',
    novo: true,
    disponivel: true,
  },
  {
    id: 'toxina-botulinica-fundamentos',
    titulo: 'Toxina botulínica: fundamentos e protocolos',
    instrutor: 'Dr. Altamiro Flávio',
    cargaHoraria: '6h',
    disponivel: true,
  },
  {
    id: 'preenchedores-acido-hialuronico',
    titulo: 'Preenchedores de ácido hialurônico',
    instrutor: 'Dr. Adalberto Vasconcellos',
    cargaHoraria: '5h',
    disponivel: true,
  },
  {
    id: 'bioestimuladores-de-colageno',
    titulo: 'Bioestimuladores de colágeno',
    instrutor: 'ABRAHOF',
    cargaHoraria: '3h',
    disponivel: true,
  },
  {
    id: 'fios-de-sustentacao',
    titulo: 'Fios de sustentação na prática clínica',
    instrutor: 'Dra. Carolina Santos',
    cargaHoraria: '4h',
    disponivel: true,
  },
  {
    id: 'gestao-de-clinicas-hof',
    titulo: 'Gestão de clínicas de HOF',
    instrutor: 'ABRAHOF',
    cargaHoraria: '2h',
    disponivel: false,
  },
];
