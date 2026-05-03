export type ImageFormat = 'desktop' | 'mobile';

export interface ProjectImage {
  url: string;
  format: ImageFormat;
}

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
    gallery: ProjectImage[];
  };
}

export const projects: Project[] = [
  {
    slug: 'axis',
    title: 'AXIS',
    subtitle: 'Premium Events Platform',
    description:
      'Plataforma de alta performance para gestão e venda de ingressos de eventos, com foco em experiência do usuário e design imersivo.',
    fullDescription:
      'A AXIS é uma plataforma completa para o ecossistema de eventos, unindo tecnologia de ponta e design premium. Desenvolvida com Next.js e Supabase, oferece uma interface fluida com animações imersivas, gestão de pré-vendas, integração com artistas e um dashboard intuitivo para produtores, elevando o padrão das experiências de entretenimento.',
    url: 'https://axis-eventos.vercel.app/',
    tags: ['Next.js', 'React', 'Supabase', 'Premium'],
    color: '#EF4444',
    layoutVariant: 'A',
    images: {
      thumbnail: '/images/projects/axis/banner1.png',
      gallery: [
        { format: 'desktop', url: '/images/projects/axis/banner1.png' },
        { format: 'mobile', url: '/images/projects/axis/mobile1.png' },
        { format: 'mobile', url: '/images/projects/axis/mobile2.png' },
        { format: 'desktop', url: '/images/projects/axis/banner3.png' },
        { format: 'desktop', url: '/images/projects/axis/banner2.png' },
      ],
    },
  },

  {
    slug: 'veiculos-rj',
    title: 'Veículos RJ',
    subtitle: 'Marketplace Automotivo',
    description:
      'Marketplace automotivo multiloja para classificados de veículos com geração de leads via WhatsApp.',
    fullDescription:
      'O Veículos RJ é um marketplace automotivo multiloja de alta performance, construído com Next.js, Tailwind CSS e Supabase. Focado na geração de leads direta via WhatsApp, a plataforma oferece uma experiência otimizada para lojistas e compradores, com gestão de estoque manual ou integrada via AutoCerto, garantindo rapidez e segurança nas negociações de veículos.',
    url: 'https://www.veiculosrj.com/',
    tags: ['Next.js', 'Supabase', 'Marketplace', 'Automotivo'],
    color: '#f3f3f3ff',
    layoutVariant: 'B',
    images: {
      thumbnail: '/images/projects/veiculosrj/banner1.png',
      gallery: [
        { format: 'desktop', url: '/images/projects/veiculosrj/banner1.png' },
        { format: 'desktop', url: '/images/projects/veiculosrj/banner2.jpg' },
        { format: 'mobile', url: '/images/projects/veiculosrj/mobile1.png' },
        { format: 'mobile', url: '/images/projects/veiculosrj/mobile2.png' },
        { format: 'desktop', url: '/images/projects/veiculosrj/banner3.png' },
        { format: 'desktop', url: '/images/projects/veiculosrj/banner4.png' },
        { format: 'mobile', url: '/images/projects/veiculosrj/mobile3.png' },
        { format: 'mobile', url: '/images/projects/veiculosrj/mobile4.png' },
      ],
    },
  },

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
    layoutVariant: 'C',
    images: {
      thumbnail: '/images/projects/gabrielpassig/banner1.png',
      gallery: [
        { format: 'desktop', url: '/images/projects/gabrielpassig/banner1.png' },
        { format: 'desktop', url: '/images/projects/gabrielpassig/banner2.png' },
        { format: 'mobile', url: '/images/projects/gabrielpassig/mobile1.png' },
        { format: 'mobile', url: '/images/projects/gabrielpassig/mobile2.png' },
        { format: 'desktop', url: '/images/projects/gabrielpassig/banner3.png' },
        { format: 'desktop', url: '/images/projects/gabrielpassig/banner4.png' },
        { format: 'mobile', url: '/images/projects/gabrielpassig/mobile3.png' },
        { format: 'mobile', url: '/images/projects/gabrielpassig/mobile4.png' },
       
      ],
    },
  },
  
  
];
