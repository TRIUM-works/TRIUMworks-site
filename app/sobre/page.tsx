import type { Metadata } from 'next';
import SobreContent from './SobreContent';

export const metadata: Metadata = {
  title: 'Sobre a TRIUM — Estúdio de Criação de Sites em Volta Redonda',
  description:
    'Conheça a TRIUM, estúdio criativo de Volta Redonda, RJ. Atendimento direto com os fundadores, sem templates, com foco em performance, design e estratégia.',
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre a TRIUM — Estúdio de Criação de Sites em Volta Redonda',
    description:
      'Estúdio criativo de Volta Redonda, RJ. Atendimento direto com os fundadores, sem templates, com foco em performance e design.',
    url: '/sobre',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function SobrePage() {
  return <SobreContent />;
}
