export interface Projeto {
  slug: string;
  titulo: string;
  ano: number;
  categoria: 'Landing Page' | 'E-commerce' | 'App' | 'Dashboard' | 'Outro';
  cliente: string;
  tecnologias: string[];
  imagemPrincipal: string;
  galeria: string[];
  descricaoCurta: string;
  descricaoCompleta: string;
  contexto: string;
  desafios: string;
  solucao: string;
  resultados: string;
  urlExterna: string;
  destaque: boolean;
  grafismo: '✦' | '〜' | '朩';
  logoLetra: string;          // letra/símbolo placeholder no card lateral
  corCapa: string;            // gradiente CSS para fallback da capa
  imagemCard?: string;        // imagem exibida no carrossel da home
}

export const projetos: Projeto[] = [
  {
    slug: 'axis',
    titulo: 'AXIS',
    ano: 2025,
    categoria: 'App',
    cliente: 'AXIS Eventos',
    tecnologias: ['Next.js', 'React', 'Supabase'],
    imagemPrincipal: '/images/projetos/axis/banner1.webp',
    galeria: [
      '/images/projetos/axis/banner1.webp',
      '/images/projetos/axis/mobile1.webp',
      '/images/projetos/axis/mobile2.webp',
      '/images/projetos/axis/banner3.webp',
      '/images/projetos/axis/banner2.webp',
    ],
    descricaoCurta:
      'Plataforma para divulgação de eventos, pré-vendas e artistas agenciados pela AXIS — construída com design imersivo e tecnologia de alta performance para conectar público e produtores em uma experiência única.',
    descricaoCompleta:
      'A AXIS é uma plataforma completa para o ecossistema de eventos da agência, unindo tecnologia de ponta e design premium. Desenvolvida com Next.js e Supabase, centraliza a divulgação de eventos, o gerenciamento de pré-vendas por lotes e o portfólio de artistas agenciados. Oferece uma interface fluida com animações imersivas e um dashboard intuitivo para produtores, elevando o padrão das experiências de entretenimento regional.',
    contexto:
      'A AXIS Eventos precisava de uma presença digital à altura do seu posicionamento no mercado — uma plataforma que centralizasse a divulgação dos eventos, apresentasse o cast de artistas agenciados e gerenciasse pré-vendas com clareza e impacto visual, sem depender de soluções genéricas que não refletissem a identidade da marca.',
    desafios:
      'Criar uma plataforma que conciliasse múltiplas responsabilidades — divulgação de eventos, gestão de lotes de pré-venda e vitrine de artistas — com uma interface premium, animações imersivas e performance sólida, entregando uma experiência fluida tanto no mobile quanto no desktop.',
    solucao:
      'Arquitetura com Next.js e Supabase para dados em tempo real, design system próprio com animações refinadas, seções dedicadas a cada artista agenciado e um painel de gerenciamento de eventos e lotes para a equipe da AXIS — tudo dentro de uma identidade visual coesa e de alto impacto.',
    resultados:
      'Plataforma lançada com interface premium que unificou a comunicação da agência, aumentou o engajamento com os eventos divulgados e posicionou a AXIS como referência em experiência digital no mercado de entretenimento regional.',
    urlExterna: 'https://axis-eventos.vercel.app/',
    destaque: true,
    grafismo: '✦',
    logoLetra: 'A',
    corCapa: 'linear-gradient(135deg, #EF4444 0%, #991B1B 50%, #1a0505 100%)',
    imagemCard: '/images/cards/axis.webp',
  },

  {
    slug: 'veiculos-rj',
    titulo: 'Veículos RJ',
    ano: 2025,
    categoria: 'E-commerce',
    cliente: 'Veículos RJ',
    tecnologias: ['Next.js', 'Supabase', 'Tailwind CSS', 'AutoCerto'],
    imagemPrincipal: '/images/projetos/veiculosrj/banner1.webp',
    galeria: [
      '/images/projetos/veiculosrj/banner1.webp',
      '/images/projetos/veiculosrj/banner2.webp',
      '/images/projetos/veiculosrj/mobile1.webp',
      '/images/projetos/veiculosrj/mobile2.webp',
      '/images/projetos/veiculosrj/banner3.webp',
      '/images/projetos/veiculosrj/banner4.webp',
      '/images/projetos/veiculosrj/mobile3.webp',
      '/images/projetos/veiculosrj/mobile4.webp',
    ],
    descricaoCurta:
      'Marketplace automotivo multiloja para classificados de veículos com geração de leads via WhatsApp.',
    descricaoCompleta:
      'O Veículos RJ é um marketplace automotivo multiloja de alta performance, construído com Next.js, Tailwind CSS e Supabase. Focado na geração de leads direta via WhatsApp, a plataforma oferece uma experiência otimizada para lojistas e compradores, com gestão de estoque manual ou integrada via AutoCerto, garantindo rapidez e segurança nas negociações de veículos.',
    contexto:
      'Lojistas de veículos da região precisavam de uma plataforma centralizada para expor seu estoque online com geração de leads direta, sem depender de marketplaces genéricos com taxas elevadas.',
    desafios:
      'Integrar múltiplas lojas em uma plataforma única mantendo a identidade de cada lojista, além de conciliar gestão de estoque manual com importação automática via AutoCerto.',
    solucao:
      'Marketplace multiloja com Next.js para performance e SEO, Supabase para dados em tempo real, integração AutoCerto para estoque automático e geração de leads via WhatsApp direto.',
    resultados:
      'Plataforma ativa com múltiplos lojistas, geração de leads consistente via WhatsApp e gestão de estoque flexível — manual ou automatizada.',
    urlExterna: 'https://www.veiculosrj.com/',
    destaque: true,
    grafismo: '〜',
    logoLetra: 'V',
    corCapa: 'linear-gradient(135deg, #0d3b66 0%, #1a4a85 50%, #f3f3f3 100%)',
    imagemCard: '/images/cards/veiculos.png',
  },

  {
    slug: 'gabriel-passig',
    titulo: 'Gabriel Passig',
    ano: 2024,
    categoria: 'Landing Page',
    cliente: 'Gabriel Passig Advocacia',
    tecnologias: ['WordPress', 'Responsivo', 'SEO'],
    imagemPrincipal: '/images/projetos/gabrielpassig/banner1.webp',
    galeria: [
      '/images/projetos/gabrielpassig/banner1.webp',
      '/images/projetos/gabrielpassig/banner2.webp',
      '/images/projetos/gabrielpassig/mobile1.webp',
      '/images/projetos/gabrielpassig/mobile2.webp',
      '/images/projetos/gabrielpassig/banner3.webp',
      '/images/projetos/gabrielpassig/banner4.webp',
      '/images/projetos/gabrielpassig/mobile3.webp',
      '/images/projetos/gabrielpassig/mobile4.webp',
    ],
    descricaoCurta:
      'Site profissional para escritório de advocacia, com foco em Direito Previdenciário, totalmente responsivo e gerenciado pelo painel do WordPress.',
    descricaoCompleta:
      'Site profissional para escritório de advocacia, com foco em Direito Previdenciário, totalmente responsivo, institucional e gerenciado pelo painel do WordPress. Conta com páginas informativas, áreas de atendimento e conteúdo atualizado para auxiliar clientes em dúvidas sobre benefícios e serviços previdenciários.',
    contexto:
      'O escritório de advocacia precisava de uma presença digital profissional que transmitisse credibilidade e facilitasse o contato com clientes em busca de orientação previdenciária.',
    desafios:
      'Criar um site institucional que equilibrasse seriedade profissional com acessibilidade de informação, tudo gerenciável pelo próprio cliente sem conhecimento técnico.',
    solucao:
      'Site WordPress responsivo com páginas informativas sobre áreas de atuação, design profissional focado em credibilidade e painel intuitivo para atualização de conteúdo pelo próprio escritório.',
    resultados:
      'Site ativo gerando contatos orgânicos para o escritório, com conteúdo atualizado regularmente pelo cliente de forma autônoma.',
    urlExterna: 'https://gabrielpassig.com.br/',
    destaque: true,
    grafismo: '朩',
    logoLetra: 'G',
    corCapa: 'linear-gradient(135deg, #1a2980 0%, #3B82F6 50%, #93c5fd 100%)',
    imagemCard: '/images/cards/passig.webp',
  },
];

export function getProjetoBySlug(slug: string): Projeto | undefined {
  return projetos.find((p) => p.slug === slug);
}

export function getProjetoIndex(slug: string): number {
  return projetos.findIndex((p) => p.slug === slug);
}

export function getProjetoAdjacentes(slug: string) {
  const idx = projetos.findIndex((p) => p.slug === slug);
  if (idx === -1) return { anterior: null, proximo: null };
  return {
    anterior: idx > 0 ? projetos[idx - 1] : projetos[projetos.length - 1],
    proximo:
      idx < projetos.length - 1 ? projetos[idx + 1] : projetos[0],
  };
}
