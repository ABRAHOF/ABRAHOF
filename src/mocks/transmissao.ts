import type { Transmissao } from '@/funcionalidades/transmissao/tipos';

/**
 * Transmissões — dados mockados.
 *
 * São os cinco podcasts do projeto de referência: datas, horários, idiomas,
 * palestrantes, títulos e descrições vieram de lá, sem alteração.
 *
 * **Todos aparecem como `encerrada`, e isso é a realidade, não uma escolha
 * estética.** A programação é de 20 a 25 de janeiro de 2026 — já passou. O
 * projeto de referência a exibe como se ainda fosse acontecer, porque as datas
 * estão fixas no código e ninguém as revisita: é a dívida registrada em
 * docs/REQUISITOS.md §3, e a tela vira um arquivo morto sem sinalizar isso.
 *
 * O estado real virá de `ativo`, `data_inicio` e `data_fim`, comparados no
 * serviço. Aqui é estático de propósito: mock não consulta relógio.
 *
 * Nenhum tem capa: `thumbnail_url` está vazio e não há imagem local. Nenhum tem
 * `url_stream` — por isso os cartões são informativos e a tela leva ao canal.
 */
export const TRANSMISSOES: Transmissao[] = [
  {
    id: 'amanda-almeida-20-01',
    palestrante: 'Dra. Amanda Almeida',
    titulo: 'Harmonização Orofacial, estética brasileira, o futuro dos tratamentos',
    descricao: 'Especialista em HOF com mais de 15 anos de experiência',
    idioma: 'PT',
    status: 'encerrada',
    data: '2026-01-20',
    horario: '13:00',
  },
  {
    id: 'altamiro-flavio-20-01',
    palestrante: 'Dr. Altamiro Flávio',
    titulo: 'Harmonização Orofacial em odontologia',
    descricao: 'Inovações e técnicas avançadas no mercado internacional',
    idioma: 'EN',
    status: 'encerrada',
    data: '2026-01-20',
    horario: '15:00',
  },
  {
    id: 'adalberto-vasconcellos-21-01',
    palestrante: 'Dr. Adalberto Vasconcellos',
    titulo: 'Abordagens contemporâneas para restauração de dentes tratados',
    descricao: 'Novas perspectivas em harmonização facial e corporal',
    idioma: 'PT',
    status: 'encerrada',
    data: '2026-01-21',
    horario: '10:00',
  },
  {
    id: 'carolina-santos-21-01',
    palestrante: 'Dra. Carolina Santos',
    titulo: 'Bioestética facial: tendências e evidências científicas',
    descricao: 'A ciência por trás dos procedimentos estéticos modernos',
    idioma: 'PT',
    status: 'encerrada',
    data: '2026-01-21',
    horario: '14:00',
  },
  {
    id: 'marcus-silva-22-01',
    palestrante: 'Dr. Marcus Silva',
    titulo: 'Digital workflow in facial harmonization',
    descricao: 'Integração de tecnologia 3D nos tratamentos orofaciais',
    idioma: 'EN',
    status: 'encerrada',
    data: '2026-01-22',
    horario: '11:00',
  },
];

/**
 * Canal público da associação.
 *
 * Duplicado de `mocks/academy.ts` de propósito: importar o mock de outra
 * funcionalidade acoplaria as duas. Quando os links externos forem
 * centralizados, as duas cópias somem (docs/BACKLOG.md, Sprint 3).
 */
export const CANAL_YOUTUBE = 'https://www.youtube.com/@abrahof_oficial';
