import type { Metadata } from 'next';
import ContatoContent from './ContatoContent';

export const metadata: Metadata = {
  title: 'Contato — Fale com a TRIUM em Volta Redonda, RJ',
  description:
    'Entre em contato com a TRIUM via WhatsApp ou Instagram. Atendimento direto com os fundadores em Volta Redonda, RJ — atendemos o Médio Paraíba e todo o Brasil.',
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato — TRIUM, Volta Redonda, RJ',
    description:
      'Fale com a TRIUM via WhatsApp ou Instagram. Atendimento direto com os fundadores.',
    url: '/contato',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function ContatoPage() {
  return <ContatoContent />;
}
