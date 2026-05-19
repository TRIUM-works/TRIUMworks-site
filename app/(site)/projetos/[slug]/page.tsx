import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getProjetoBySlug,
  getProjetoAdjacentes,
  projetos,
} from '@/lib/data/projetos';
import { TreatedImage } from '@/components/ui/TreatedImage';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { RevealText } from '@/components/animations/RevealText';

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const p = getProjetoBySlug(params.slug);
  if (!p) return { title: 'Projeto não encontrado' };
  const title = `${p.titulo} — ${p.categoria} feito pela TRIUM em Volta Redonda`;
  const description = `${p.descricaoCurta} Projeto desenvolvido pela TRIUM, estúdio de criação de sites em Volta Redonda, RJ.`;
  return {
    title,
    description,
    alternates: { canonical: `/projetos/${p.slug}` },
    keywords: [
      p.titulo,
      p.cliente,
      p.categoria,
      ...p.tecnologias,
      'TRIUM',
      'criação de sites Volta Redonda',
      'portfólio TRIUM',
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/projetos/${p.slug}`,
      images: [{ url: p.imagemPrincipal, alt: p.titulo }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [p.imagemPrincipal],
    },
  };
}

const SITE_URL = 'https://www.triumworks.com.br';

export default function ProjetoPage({ params }: Params) {
  const projeto = getProjetoBySlug(params.slug);
  if (!projeto) notFound();

  const { anterior, proximo } = getProjetoAdjacentes(projeto.slug);

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${SITE_URL}/projetos/${projeto.slug}#project`,
    name: projeto.titulo,
    headline: `${projeto.titulo} — ${projeto.categoria}`,
    description: projeto.descricaoCompleta,
    inLanguage: 'pt-BR',
    url: `${SITE_URL}/projetos/${projeto.slug}`,
    image: `${SITE_URL}${projeto.imagemPrincipal}`,
    dateCreated: String(projeto.ano),
    creator: { '@id': `${SITE_URL}/#business` },
    author: { '@id': `${SITE_URL}/#business` },
    keywords: [projeto.categoria, ...projeto.tecnologias].join(', '),
    about: projeto.cliente,
  };

  return (
    <article className="relative min-h-screen bg-carbon pb-md pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-6">
        <nav
          aria-label="Caminho"
          className="mb-8 font-mono text-tiny uppercase tracking-[0.2em] text-stone"
        >
          <Link href="/" data-cursor="hover" className="hover:text-teal">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/#projetos"
            data-cursor="hover"
            className="hover:text-teal"
          >
            Projetos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-teal">{projeto.titulo}</span>
        </nav>

        <header className="mb-md">
          <div className="font-mono text-tiny uppercase tracking-[0.3em] text-stone">
            {projeto.categoria} · {projeto.ano}
          </div>
          <h1 data-cursor="hover" className="mt-4 font-trickster text-display text-cream">
            {projeto.titulo}
          </h1>
          <p className="mt-4 font-lora italic text-body-lg text-stone max-w-xl">
            {projeto.descricaoCurta}
          </p>
        </header>

        <ImageReveal className="mb-md">
          <TreatedImage
            src={projeto.imagemPrincipal}
            alt={projeto.titulo}
            width={2000}
            height={1125}
            priority
            treated={false}
            className="aspect-video w-full"
          />
        </ImageReveal>

        <div className="grid gap-md md:grid-cols-2">
          <Section title="Contexto" body={projeto.contexto} />
          <Section title="Desafios" body={projeto.desafios} />
          <Section title="Solução" body={projeto.solucao} />
          <Section title="Resultados" body={projeto.resultados} />
        </div>

        {projeto.galeria.length > 0 && (
          <div className="mt-md">
            <h2 className="mb-6 font-trickster text-h2 text-teal">Galeria</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {projeto.galeria.map((src, i) => (
                <ImageReveal key={src} delay={i * 0.1}>
                  <TreatedImage
                    src={src}
                    alt={`${projeto.titulo} — imagem ${i + 1}`}
                    width={1200}
                    height={800}
                    treated={false}
                    className="aspect-[3/2] w-full"
                  />
                </ImageReveal>
              ))}
            </div>
          </div>
        )}

        <div className="mt-md">
          <div className="mb-3 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
            ✦ Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {projeto.tecnologias.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        <div className="mt-md flex flex-col items-stretch justify-between gap-6 border-t border-blue-deep/50 pt-8 md:flex-row md:items-center">
          {anterior && (
            <Link
              href={`/projetos/${anterior.slug}`}
              data-cursor="hover"
              className="group flex items-center gap-3 text-cream transition-colors hover:text-teal"
            >
              <ArrowSvg dir="left" />
              <div>
                <div className="font-mono text-tiny uppercase tracking-[0.2em] text-stone">
                  Anterior
                </div>
                <div className="font-lora text-h3">{anterior.titulo}</div>
              </div>
            </Link>
          )}
          {proximo && (
            <Link
              href={`/projetos/${proximo.slug}`}
              data-cursor="hover"
              className="group flex items-center gap-3 text-cream transition-colors hover:text-teal md:text-right"
            >
              <div className="md:order-1">
                <div className="font-mono text-tiny uppercase tracking-[0.2em] text-stone">
                  Próximo
                </div>
                <div className="font-lora text-h3">{proximo.titulo}</div>
              </div>
              <span className="md:order-2">
                <ArrowSvg dir="right" />
              </span>
            </Link>
          )}
        </div>

        <div className="mt-md">
          <Button as="a" href="/#projetos" variant="ghost">
            <ArrowSvg dir="left" />
            Voltar aos projetos
          </Button>
        </div>
      </div>
    </article>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="mb-3 font-trickster text-h2 text-teal">{title}</h2>
      <RevealText className="font-lora text-body-lg text-cream">
        {body}
      </RevealText>
    </div>
  );
}

function ArrowSvg({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg
      width="32"
      height="14"
      viewBox="0 0 32 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        transform: dir === 'left' ? 'scaleX(-1)' : 'none',
      }}
    >
      <path d="M2 7 Q 14 6 26 7 L 22 3 M26 7 L 22 11" />
    </svg>
  );
}
