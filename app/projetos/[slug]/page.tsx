import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import ProjetoContent from './ProjetoContent';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Projeto não encontrado — TRIUM',
    };
  }

  const title = `${project.title} — Projeto desenvolvido pela TRIUM`;
  const description = project.description;
  const url = `/projetos/${project.slug}`;
  const image = project.images.thumbnail;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      locale: 'pt_BR',
      images: image ? [{ url: image }] : undefined,
    },
  };
}

export default function ProjetoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProjetoContent params={params} />;
}
