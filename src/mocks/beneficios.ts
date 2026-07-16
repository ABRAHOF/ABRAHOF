import type { Beneficio } from '@/funcionalidades/beneficios/tipos';

/**
 * Benefícios — dados mockados.
 *
 * São os dez itens do projeto de referência, mantidos como estão: títulos,
 * descrições, categorias e descontos não foram inventados nem ajustados. A
 * tabela `clube_beneficios` existe no banco e nunca foi consultada, então lá os
 * dados também vivem dentro do componente (docs/BANCO.md §9).
 *
 * Os ícones são o equivalente em Ionicons dos usados na referência.
 */
export const BENEFICIOS: Beneficio[] = [
  {
    id: 'congressos-e-eventos',
    titulo: 'Congressos e Eventos',
    descricao:
      'Descontos exclusivos em congressos nacionais e internacionais da área de HOF',
    categoria: 'Congressos',
    desconto: 'Até 30% OFF',
    icone: 'gift-outline',
  },
  {
    id: 'equipamentos-esteticos',
    titulo: 'Equipamentos Estéticos',
    descricao:
      'Parceria com as principais marcas de equipamentos estéticos e lasers do mercado',
    categoria: 'Equipamentos',
    desconto: 'Até 40% OFF',
    icone: 'star-outline',
  },
  {
    id: 'laboratorios-de-analises',
    titulo: 'Laboratórios de Análises',
    descricao:
      'Condições especiais em laboratórios de análises clínicas e exames complementares',
    categoria: 'Laboratórios',
    desconto: '20% OFF',
    icone: 'pricetag-outline',
  },
  {
    id: 'laboratorios-de-protese',
    titulo: 'Laboratórios de Prótese',
    descricao: 'Descontos em laboratórios de prótese dentária e materiais protéticos',
    categoria: 'Laboratórios',
    desconto: '15% OFF',
    icone: 'pricetag-outline',
  },
  {
    id: 'gestao-de-clinicas',
    titulo: 'Gestão de Clínicas',
    descricao:
      'Softwares de gestão, agendamento e controle financeiro para clínicas e consultórios',
    categoria: 'Gestão',
    desconto: '50% OFF',
    icone: 'card-outline',
  },
  {
    id: 'materiais-de-consumo',
    titulo: 'Materiais de Consumo',
    descricao:
      'Ácido hialurônico, toxina botulínica, fios de sustentação e bioestimuladores',
    categoria: 'Materiais',
    desconto: '15% OFF',
    icone: 'star-outline',
  },
  {
    id: 'cursos-e-capacitacoes',
    titulo: 'Cursos e Capacitações',
    descricao:
      'Descontos em cursos de atualização e especialização oferecidos pela ABRAHOF',
    categoria: 'Educação',
    desconto: '30% OFF',
    icone: 'gift-outline',
  },
  {
    id: 'plano-de-saude',
    titulo: 'Plano de Saúde',
    descricao: 'Condições especiais em planos de saúde para você e sua família',
    categoria: 'Saúde',
    desconto: '20% OFF',
    icone: 'card-outline',
  },
  {
    id: 'assessoria-juridica',
    titulo: 'Assessoria Jurídica',
    descricao:
      'Consultoria e assessoria jurídica especializada para profissionais da área',
    categoria: 'Jurídico',
    desconto: '25% OFF',
    icone: 'star-outline',
  },
  {
    id: 'marketing-digital',
    titulo: 'Marketing Digital',
    descricao:
      'Agências parceiras para criação de sites, redes sociais e branding profissional',
    categoria: 'Marketing',
    desconto: '20% OFF',
    icone: 'pricetag-outline',
  },
];
