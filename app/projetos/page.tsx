import type { Metadata } from 'next';
import ProjectsCarousel from '@/components/ProjectsCarousel';

export const metadata: Metadata = {
  title: 'Projetos — TriumTech',
  description:
    'Conheça os projetos desenvolvidos pela TriumTech. Sites de alta performance com design impactante.',
};

export default function ProjetosPage() {
  return <ProjectsCarousel />;
}
