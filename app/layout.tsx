import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import BackgroundLights from '@/components/BackgroundLights';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.triumworks.com.br'),
  title: 'TRIUM',
  description:
    'Agência de criação de sites em Volta Redonda, RJ. Desenvolvemos sites profissionais, rápidos e estratégicos para empresas de Volta Redonda e de todo o Brasil.',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: 'TRIUM',
    description:
      'Criação e desenvolvimento de sites em Volta Redonda, RJ. Sites profissionais para empresas de Volta Redonda e de todo o Brasil.',
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
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <div className="noise-overlay" />
          <BackgroundLights />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
