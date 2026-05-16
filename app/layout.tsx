import type { Metadata } from 'next';
import { Lora, IBM_Plex_Mono, Caesar_Dressing } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import BackgroundLights from '@/components/BackgroundLights';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

const caesarDressing = Caesar_Dressing({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.triumworks.com.br'),
  title: 'TRIUM',
  description:
    'Estúdio de tecnologia e programação em Volta Redonda, RJ. Soluções digitais feitas à mão, pensadas para durar.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: 'TRIUM — Estúdio de Tecnologia & Programação',
    description:
      'Soluções digitais feitas à mão. Pensadas para durar. Volta Redonda, RJ.',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.triumworks.com.br',
    siteName: 'TRIUM',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${lora.variable} ${ibmPlexMono.variable} ${caesarDressing.variable}`}
    >
      <body>
        <SmoothScroll>
          <CustomCursor />
          <BackgroundLights />
          <div className="paper-grain" aria-hidden="true" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
