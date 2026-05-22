import type { Metadata } from 'next';
import { Lora, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { SnapController } from '@/components/layout/SnapController';
import { RouteTransition } from '@/components/layout/RouteTransition';
import { Header } from '@/components/layout/Header';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { BackToTop } from '@/components/ui/BackToTop';
import { GrainOverlay } from '@/components/ui/GrainOverlay';

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono',
});

const SITE_URL = 'https://www.triumworks.com.br';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || SITE_URL
  ),
  title: {
    default:
      'TRIUM — Criação de Sites em Volta Redonda, RJ | Landing Pages, E-commerce e IA',
    template: '%s | TRIUM — Criação de Sites em Volta Redonda',
  },
  description:
    'Estúdio de criação de sites em Volta Redonda, RJ. Landing pages de alta conversão, e-commerces, marketplaces e sites com IA e automações para empresas de todo o Brasil.',
  keywords: [
    'criação de sites Volta Redonda',
    'agência de sites Volta Redonda RJ',
    'desenvolvimento de sites Sul Fluminense',
    'site para empresa Volta Redonda',
    'landing page de alta conversão',
    'e-commerce personalizado',
    'marketplace sob medida',
    'sites com IA',
    'site com inteligência artificial',
    'automação para sites',
    'chatbot para empresa',
    'TRIUM',
    'TRIUM Tech',
    'TRIUM Volta Redonda',
    'agência digital RJ',
    'criação de sites Barra Mansa',
    'criação de sites Resende',
  ],
  authors: [{ name: 'TRIUM', url: SITE_URL }],
  creator: 'TRIUM',
  publisher: 'TRIUM',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title:
      'TRIUM — Criação de Sites em Volta Redonda, RJ | Landing Pages, E-commerce e IA',
    description:
      'Estúdio de tecnologia em Volta Redonda. Criamos sites profissionais, landing pages, e-commerces e plataformas com IA para empresas do Brasil inteiro.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'TRIUM — Estúdio de criação de sites em Volta Redonda, RJ' }],
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'TRIUM',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TRIUM — Criação de Sites em Volta Redonda, RJ',
    description:
      'Sites profissionais, landing pages, e-commerces e plataformas com IA. Volta Redonda, RJ — atendendo o Brasil.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${lora.variable} ${plexMono.variable}`}>
      <head>
        <link
          rel="preload"
          href="/fonts/trickster-master.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': ['Organization', 'ProfessionalService'],
                  '@id': `${SITE_URL}/#business`,
                  name: 'TRIUM',
                  alternateName: ['TRIUM Tech', 'TRIUM Works'],
                  description:
                    'Estúdio de tecnologia e programação em Volta Redonda, RJ. Criação de sites profissionais, landing pages de alta conversão, e-commerces, marketplaces e plataformas com IA para empresas de todo o Brasil.',
                  url: SITE_URL,
                  image: `${SITE_URL}/logo.png`,
                  logo: `${SITE_URL}/logo.png`,
                  telephone: '+55 85 98125-4006',
                  email: 'contato@triumtech.com.br',
                  priceRange: '$$',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Volta Redonda',
                    addressRegion: 'RJ',
                    addressCountry: 'BR',
                  },
                  areaServed: [
                    { '@type': 'City', name: 'Volta Redonda' },
                    { '@type': 'City', name: 'Barra Mansa' },
                    { '@type': 'City', name: 'Resende' },
                    { '@type': 'AdministrativeArea', name: 'Sul Fluminense' },
                    { '@type': 'State', name: 'Rio de Janeiro' },
                    { '@type': 'Country', name: 'Brasil' },
                  ],
                  knowsAbout: [
                    'Criação de sites',
                    'Desenvolvimento web',
                    'Next.js',
                    'React',
                    'Landing pages',
                    'E-commerce',
                    'Marketplaces',
                    'Inteligência Artificial aplicada a sites',
                    'Automação',
                    'SEO',
                    'Design UI/UX',
                  ],
                  sameAs: [
                    'https://www.instagram.com/triumtech_/',
                  ],
                  openingHoursSpecification: [
                    {
                      '@type': 'OpeningHoursSpecification',
                      dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                      ],
                      opens: '09:00',
                      closes: '18:00',
                    },
                  ],
                  hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Serviços TRIUM',
                    itemListElement: [
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Criação de sites profissionais em Volta Redonda',
                          description:
                            'Sites institucionais, modernos, rápidos e otimizados para SEO. Foco em empresas de Volta Redonda, Sul Fluminense e todo o Brasil.',
                          areaServed: 'BR',
                          serviceType: 'Desenvolvimento de site institucional',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Landing pages de alta conversão',
                          description:
                            'Páginas de venda construídas para gerar leads e converter — copy estratégica, design persuasivo e performance impecável.',
                          areaServed: 'BR',
                          serviceType: 'Landing page de conversão',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'E-commerce e marketplaces sob medida',
                          description:
                            'Lojas virtuais e marketplaces multi-vendedor com gestão de estoque, integrações e geração de leads via WhatsApp.',
                          areaServed: 'BR',
                          serviceType: 'Desenvolvimento de e-commerce',
                        },
                      },
                      {
                        '@type': 'Offer',
                        itemOffered: {
                          '@type': 'Service',
                          name: 'Sites com Inteligência Artificial e automações',
                          description:
                            'Integração de IA em sites: chatbots de atendimento, automação de leads, geração de conteúdo, busca semântica e fluxos inteligentes.',
                          areaServed: 'BR',
                          serviceType: 'Integração de IA em sites',
                        },
                      },
                    ],
                  },
                },
                {
                  '@type': 'WebSite',
                  '@id': `${SITE_URL}/#website`,
                  url: SITE_URL,
                  name: 'TRIUM',
                  description:
                    'Estúdio de criação de sites em Volta Redonda, RJ. Landing pages, e-commerces e sites com IA para empresas do Brasil inteiro.',
                  inLanguage: 'pt-BR',
                  publisher: { '@id': `${SITE_URL}/#business` },
                },
                {
                  '@type': 'FAQPage',
                  '@id': `${SITE_URL}/#faq`,
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'Onde fica a TRIUM e a empresa atende fora de Volta Redonda?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'A TRIUM é um estúdio de tecnologia baseado em Volta Redonda, RJ. Atendemos clientes de toda a região Sul Fluminense (Volta Redonda, Barra Mansa, Resende, Barra do Piraí) e de todo o Brasil de forma remota — você fala direto com quem projeta e desenvolve o seu site.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Que tipos de site a TRIUM cria?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Criamos sites institucionais, landing pages de alta conversão, e-commerces, marketplaces multi-vendedor e plataformas web sob medida. Todos os projetos são feitos com tecnologias modernas como Next.js, React e Supabase, com foco em performance, SEO e design premium.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'A TRIUM integra inteligência artificial nos sites?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Sim. Integramos IA em sites de várias formas: chatbots de atendimento 24/7, automação de captura e qualificação de leads, geração de conteúdo, busca semântica em catálogos e fluxos inteligentes de pré-vendas. A IA é usada de forma estratégica, sempre conectada ao objetivo do negócio.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Quanto tempo demora para entregar um site?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'O prazo depende do escopo. Landing pages costumam ficar prontas em 2 a 3 semanas. Sites institucionais completos levam de 3 a 6 semanas. E-commerces e plataformas com IA têm cronograma definido junto ao cliente após a análise inicial.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'Como funciona o orçamento?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'É só mandar uma mensagem no WhatsApp contando o que você quer construir. Respondemos em até 24 horas com uma proposta personalizada para o seu projeto.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'A TRIUM faz manutenção e SEO depois que o site fica no ar?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Sim. Oferecemos planos de manutenção contínua, atualizações de conteúdo, monitoramento de performance e otimização de SEO para garantir que o site continue rápido, seguro e bem posicionado no Google.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-carbon focus:text-teal focus:p-3 focus:font-mono"
        >
          Pular para o conteúdo
        </a>
        <SmoothScrollProvider>
          <SnapController>
            <CustomCursor />
            <Header />
            <RouteTransition>{children}</RouteTransition>
            <BackToTop />
            {/* Grain global — camada fixa por cima de tudo (exceto cursor).
                Escondida em telas pequenas porque mix-blend-overlay em
                fullscreen mata a performance GPU no celular. */}
            <GrainOverlay
              intensity={0.06}
              className="hidden md:block fixed z-[100]"
            />
          </SnapController>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
