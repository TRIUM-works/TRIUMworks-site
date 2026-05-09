import type { Metadata } from 'next';
import ProjectsCarousel from '@/components/ProjectsCarousel';

export const metadata: Metadata = {
  title: 'Projetos — Sites Desenvolvidos em Volta Redonda, RJ | TriumTech',
  description:
    'Conheça os sites desenvolvidos pela TriumTech, agência de Volta Redonda, RJ. Projetos de alta performance e design impactante para o Médio Paraíba.',
};

export default function ProjetosPage() {
  return <ProjectsCarousel />;
}
