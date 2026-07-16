import type { Ionicons } from '@expo/vector-icons';
import type { Href } from 'expo-router';

export type Secao = {
  /** Nome exibido no menu. Pode ser mais longo que a rota. */
  titulo: string;
  icone: keyof typeof Ionicons.glyphMap;
  rota: Href;
};

/**
 * Seções do menu da tela inicial.
 *
 * Dados mockados: nenhuma seção tem conteúdo real ainda.
 *
 * A lista traz apenas as seções com rota existente. O menu do projeto web tem
 * 15 atalhos, dos quais 5 levam a telas que nunca foram criadas — Telemedicina,
 * Teleodontologia, Advogados Parceiros, WhatsApp e Cadastro caem em 404 lá.
 * Eles entram aqui quando as telas existirem. Ver docs/BACKLOG.md, Sprint 5.
 *
 * Os rótulos usam o nome completo da seção, ainda que a rota seja curta
 * (docs/DECISOES.md, ADR-0006).
 */
export const SECOES: Secao[] = [
  {
    titulo: 'Transmissão',
    icone: 'play-outline',
    rota: '/transmissao',
  },
  {
    titulo: 'Academy',
    icone: 'school-outline',
    rota: '/academy',
  },
  {
    titulo: 'Eventos e Parceiros',
    icone: 'calendar-outline',
    rota: '/eventos',
  },
  {
    titulo: 'Documentos',
    icone: 'document-text-outline',
    rota: '/documentos',
  },
  {
    titulo: 'Clube de Benefícios',
    icone: 'gift-outline',
    rota: '/beneficios',
  },
  {
    titulo: 'Galeria',
    icone: 'images-outline',
    rota: '/galeria',
  },
  {
    titulo: 'Contato',
    icone: 'mail-outline',
    rota: '/contato',
  },
  {
    titulo: 'Patrocinadores',
    icone: 'heart-outline',
    rota: '/patrocinadores',
  },
];
