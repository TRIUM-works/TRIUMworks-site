export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  url: string;
  tags: string[];
  color: string;
  layoutVariant: 'A' | 'B' | 'C';
  images: {
    thumbnail: string;
    desktop: string[];
    mobile: string[];
  };
}

export const projects: Project[] = [
  {
    slug: 'gabriel-passig',
    title: 'Gabriel Passig',
    subtitle: 'Advocacia Previdenciária',
    description:
      'Site profissional para escritório de advocacia, com foco em Direito Previdenciário, totalmente responsivo e gerenciado pelo painel do WordPress.',
    fullDescription:
      'Site profissional para escritório de advocacia, com foco em Direito Previdenciário, totalmente responsivo, institucional e gerenciado pelo painel do WordPress. Conta com páginas informativas, áreas de atendimento e conteúdo atualizado para auxiliar clientes em dúvidas sobre benefícios e serviços previdenciários.',
    url: 'https://gabrielpassig.com.br/',
    tags: ['WordPress', 'Responsivo', 'Institucional'],
    color: '#3B82F6',
    layoutVariant: 'A',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
      desktop: [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80',
      ],
      mobile: [
        'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80',
        'https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&q=80',
      ],
    },
  },
  {
    slug: 'portal-cidade-net',
    title: 'Portal Cidade Net',
    subtitle: 'Portal de Notícias Regional',
    description:
      'Site de notícias regional com seções dinâmicas, responsivo e atualizado via painel do WordPress.',
    fullDescription:
      'Portal de notícias regional completo, com seções dinâmicas para diversas categorias de conteúdo. Desenvolvido com foco em velocidade de carregamento e experiência de leitura otimizada. Totalmente responsivo e atualizado via painel do WordPress.',
    url: 'https://portalcidadenet.com.br/',
    tags: ['WordPress', 'Portal', 'Notícias'],
    color: '#EF4444',
    layoutVariant: 'B',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=800&q=80',
      desktop: [
        'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=1200&q=80',
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&q=80',
      ],
      mobile: [
        'https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=400&q=80',
        'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&q=80',
      ],
    },
  },
  {
    slug: 'afloralook',
    title: 'Afloralook',
    subtitle: 'Moda & Estilo',
    description:
      'Site institucional focado em moda e estilo, com identidade visual personalizada e visual responsivo.',
    fullDescription:
      'Site institucional focado em moda e estilo, com identidade visual personalizada e layout elegante. Design cuidadosamente elaborado para transmitir a essência da marca, com navegação intuitiva e visual totalmente responsivo para todas as plataformas.',
    url: 'https://afloralook.com.br/',
    tags: ['WordPress', 'E-commerce', 'Moda'],
    color: '#EC4899',
    layoutVariant: 'C',
    images: {
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
      desktop: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      ],
      mobile: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80',
      ],
    },
  },
];
