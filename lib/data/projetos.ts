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
}

export const projetos: Projeto[] = [
  {
    slug: 'axis',
    titulo: 'AXIS',
    ano: 2025,
    categoria: 'App',
    cliente: 'AXIS Eventos',
    tecnologias: ['Next.js', 'React', 'Supabase', 'Framer Motion'],
    imagemPrincipal: '/images/projetos/axis/banner1.png',
    galeria: [
      '/images/projetos/axis/banner1.png',
      '/images/projetos/axis/mobile1.png',
      '/images/projetos/axis/mobile2.png',
      '/images/projetos/axis/banner3.png',
      '/images/projetos/axis/banner2.png',
    ],
    descricaoCurta:
      'Plataforma de alta performance para gestão e venda de ingressos de eventos, com foco em experiência do usuário e design imersivo.',
    descricaoCompleta:
      'A AXIS é uma plataforma completa para o ecossistema de eventos, unindo tecnologia de ponta e design premium. Desenvolvida com Next.js e Supabase, oferece uma interface fluida com animações imersivas, gestão de pré-vendas, integração com artistas e um dashboard intuitivo para produtores, elevando o padrão das experiências de entretenimento.',
    contexto:
      'O mercado de eventos na região precisava de uma solução digital que fosse além da simples venda de ingressos — que oferecesse uma experiência completa tanto para produtores quanto para o público.',
    desafios:
      'Criar uma plataforma que conciliasse gestão complexa (pré-vendas, lotes, artistas) com uma interface premium e animações imersivas sem sacrificar performance.',
    solucao:
      'Arquitetura com Next.js e Supabase para backend em tempo real, Framer Motion para animações refinadas, dashboard intuitivo para produtores e fluxo de compra otimizado para conversão.',
    resultados:
      'Plataforma lançada com interface premium, gestão completa de eventos e experiência de usuário que elevou o padrão do mercado regional de entretenimento.',
    urlExterna: 'https://axis-eventos.vercel.app/',
    destaque: true,
    grafismo: '✦',
    logoLetra: 'A',
    corCapa: 'linear-gradient(135deg, #EF4444 0%, #991B1B 50%, #1a0505 100%)',
  },

  {
    slug: 'veiculos-rj',
    titulo: 'Veículos RJ',
    ano: 2025,
    categoria: 'E-commerce',
    cliente: 'Veículos RJ',
    tecnologias: ['Next.js', 'Supabase', 'Tailwind CSS', 'AutoCerto'],
    imagemPrincipal: '/images/projetos/veiculosrj/banner1.png',
    galeria: [
      '/images/projetos/veiculosrj/banner1.png',
      '/images/projetos/veiculosrj/banner2.jpg',
      '/images/projetos/veiculosrj/mobile1.png',
      '/images/projetos/veiculosrj/mobile2.png',
      '/images/projetos/veiculosrj/banner3.png',
      '/images/projetos/veiculosrj/banner4.png',
      '/images/projetos/veiculosrj/mobile3.png',
      '/images/projetos/veiculosrj/mobile4.png',
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
  },

  {
    slug: 'gabriel-passig',
    titulo: 'Gabriel Passig',
    ano: 2024,
    categoria: 'Landing Page',
    cliente: 'Gabriel Passig Advocacia',
    tecnologias: ['WordPress', 'Responsivo', 'SEO'],
    imagemPrincipal: '/images/projetos/gabrielpassig/banner1.png',
    galeria: [
      '/images/projetos/gabrielpassig/banner1.png',
      '/images/projetos/gabrielpassig/banner2.png',
      '/images/projetos/gabrielpassig/mobile1.png',
      '/images/projetos/gabrielpassig/mobile2.png',
      '/images/projetos/gabrielpassig/banner3.png',
      '/images/projetos/gabrielpassig/banner4.png',
      '/images/projetos/gabrielpassig/mobile3.png',
      '/images/projetos/gabrielpassig/mobile4.png',
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
