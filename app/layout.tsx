import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'TriumTech — Criação de Sites Profissionais',
  description:
    'Design minimalista e performance excepcional. Criamos sites profissionais que transformam negócios e conquistam clientes.',
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: 'TriumTech — Criação de Sites Profissionais',
    description:
      'Design minimalista e performance excepcional. Criamos sites profissionais que transformam negócios.',
    type: 'website',
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
        <CustomCursor />
        <div className="noise-overlay" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
