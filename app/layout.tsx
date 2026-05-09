import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import BackgroundLights from '@/components/BackgroundLights';

export const metadata: Metadata = {
  title: 'TriumTech — Criação de Sites em Volta Redonda, RJ',
  description:
    'Agência de criação de sites em Volta Redonda, RJ. Desenvolvemos sites profissionais, rápidos e estratégicos para empresas do Médio Paraíba e Sul Fluminense.',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: 'TriumTech — Criação de Sites em Volta Redonda, RJ',
    description:
      'Criação e desenvolvimento de sites em Volta Redonda, RJ. Sites profissionais para empresas do Médio Paraíba e de todo o Brasil.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
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
