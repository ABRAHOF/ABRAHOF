import type { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';

export type Secao = {
  titulo: string;
  descricao: string;
  icone: keyof typeof Ionicons.glyphMap;
  rota: Href;
};

/** Dados mockados: as seções ainda não possuem conteúdo real. */
export const SECOES: Secao[] = [
  {
    titulo: 'Academy',
    descricao: 'Trilhas e conteúdos de formação',
    icone: 'school-outline',
    rota: '/academy',
  },
  {
    titulo: 'Benefícios',
    descricao: 'Vantagens para associados',
    icone: 'gift-outline',
    rota: '/beneficios',
  },
  {
    titulo: 'Contato',
    descricao: 'Fale com a Abrahof',
    icone: 'mail-outline',
    rota: '/contato',
  },
  {
    titulo: 'Documentos',
    descricao: 'Arquivos e publicações',
    icone: 'document-text-outline',
    rota: '/documentos',
  },
  {
    titulo: 'Eventos',
    descricao: 'Agenda e inscrições',
    icone: 'calendar-outline',
    rota: '/eventos',
  },
  {
    titulo: 'Galeria',
    descricao: 'Fotos e registros',
    icone: 'images-outline',
    rota: '/galeria',
  },
  {
    titulo: 'Patrocinadores',
    descricao: 'Parceiros da associação',
    icone: 'ribbon-outline',
    rota: '/patrocinadores',
  },
  {
    titulo: 'Transmissão',
    descricao: 'Conteúdo ao vivo',
    icone: 'videocam-outline',
    rota: '/transmissao',
  },
];
