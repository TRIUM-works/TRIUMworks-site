import type { Metadata } from 'next';
import { Lora, IBM_Plex_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { SnapController } from '@/components/layout/SnapController';
import { RouteTransition } from '@/components/layout/RouteTransition';
import { Header } from '@/components/layout/Header';
import { CustomCursor } from '@/components/layout/CustomCursor';
import { BackToTop } from '@/components/ui/BackToTop';
import { AmbientAudio } from '@/components/ui/AmbientAudio';
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
    default: 'TRIUM — Estúdio de Tecnologia e Programação',
    template: '%s | TRIUM',
  },
  description:
    'Estúdio de tecnologia e programação em Volta Redonda, RJ. Soluções digitais feitas à mão, pensadas para durar.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'TRIUM — Estúdio de Tecnologia & Programação',
    description:
      'Soluções digitais feitas à mão. Pensadas para durar. Volta Redonda, RJ.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: 'TRIUM',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.svg',
  },
  robots: { index: true, follow: true },
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
              '@type': 'ProfessionalService',
              '@id': `${SITE_URL}/#business`,
              name: 'TRIUM',
              description:
                'Estúdio criativo de Volta Redonda, RJ. Criação de sites profissionais, rápidos e estratégicos para empresas de Volta Redonda e de todo o Brasil.',
              url: SITE_URL,
              image: `${SITE_URL}/logo.png`,
              logo: `${SITE_URL}/logo.png`,
              telephone: '+55 85 98125-4006',
              email: 'contato@triumtech.com.br',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Volta Redonda',
                addressRegion: 'RJ',
                addressCountry: 'BR',
              },
              areaServed: [
                { '@type': 'City', name: 'Volta Redonda' },
                { '@type': 'Country', name: 'Brasil' },
              ],
              sameAs: ['https://www.instagram.com/triumtech_/'],
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
            <AmbientAudio />
            {/* Grain global — camada fixa por cima de tudo (exceto cursor) */}
            <GrainOverlay
              intensity={0.06}
              className="fixed z-[100]"
            />
          </SnapController>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
