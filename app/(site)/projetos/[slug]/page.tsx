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
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { cn } from '@/lib/utils';

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

// Convenção do projeto: arquivos "mobile*" são screenshots verticais;
// qualquer outro nome é paisagem.
function isPortrait(src: string): boolean {
  return /mobile/i.test(src);
}

interface TextSection {
  title: string;
  body: string;
}

export default function ProjetoPage({ params }: Params) {
  const projeto = getProjetoBySlug(params.slug);
  if (!projeto) notFound();

  const { anterior, proximo } = getProjetoAdjacentes(projeto.slug);

  // Imagens deduplicadas — imagemPrincipal já aparece em galeria nos dados.
  // A primeira (imagemPrincipal) vira o banner; o resto vai pra galeria.
  const allImages = Array.from(
    new Set([projeto.imagemPrincipal, ...projeto.galeria])
  );
  const galeria = allImages.slice(1);

  const sections: TextSection[] = [
    { title: 'Contexto', body: projeto.contexto },
    { title: 'Desafios', body: projeto.desafios },
    { title: 'Solução', body: projeto.solucao },
    { title: 'Resultados', body: projeto.resultados },
  ];

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
    <article className="relative min-h-screen overflow-hidden bg-carbon pb-md pt-28 md:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      <GrainOverlay intensity={0.05} />

      {/* Breadcrumb */}
      <div className="relative z-10 mx-auto mb-8 max-w-6xl px-6 md:px-12">
        <nav
          aria-label="Caminho"
          className="font-mono text-tiny uppercase tracking-[0.2em] text-stone"
        >
          <Link href="/" data-cursor="hover" className="hover:text-teal">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#projetos" data-cursor="hover" className="hover:text-teal">
            Projetos
          </Link>
          <span className="mx-2">/</span>
          <span className="text-teal">{projeto.titulo}</span>
        </nav>
      </div>

      {/* Cabeçalho editorial */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">
        <div className="font-mono text-tiny uppercase tracking-[0.3em] text-teal">
          {projeto.categoria} · {projeto.ano}
        </div>
        <h1
          data-cursor="hover"
          className="mt-4 font-trickster text-display leading-[0.9] text-cream"
        >
          {projeto.titulo}
        </h1>
        <p className="mt-6 max-w-2xl font-lora italic text-body-lg text-cream/85">
          {projeto.descricaoCurta}
        </p>

        {/* Meta row */}
        <div className="mt-10 grid gap-6 border-y border-blue-deep/50 py-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
          <div>
            <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-stone">
              Cliente
            </div>
            <div className="mt-1.5 font-lora text-body text-cream">
              {projeto.cliente}
            </div>
          </div>
          <div>
            <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.35em] text-stone">
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {projeto.tecnologias.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          {projeto.urlExterna && (
            <Button
              as="a"
              href={projeto.urlExterna}
              external
              variant="outline"
              className="group justify-self-start md:justify-self-end"
            >
              Visitar site
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Button>
          )}
        </div>
      </header>

      {/* Banner principal */}
      <div className="relative z-10 mx-auto mt-10 max-w-6xl px-6 md:px-12">
        <ImageReveal className="relative overflow-hidden rounded-lg border border-blue-deep/40 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
          <div
            className="relative aspect-[16/10] w-full md:aspect-[16/8]"
            style={{ background: projeto.corCapa }}
          >
            <TreatedImage
              src={projeto.imagemPrincipal}
              alt={projeto.titulo}
              fill
              treated={false}
              priority
              sizes="(min-width: 768px) 1152px, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </ImageReveal>
      </div>

      {/* Seções de texto — lista editorial numerada */}
      <section className="relative z-10 mx-auto mt-md max-w-6xl px-6 md:px-12">
        {sections.map((s, i) => (
          <div
            key={s.title}
            className="grid gap-4 border-t border-blue-deep/40 py-8 md:grid-cols-[0.4fr_1fr] md:gap-12 md:py-10"
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-tiny tracking-[0.2em] text-teal">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="font-trickster text-h2 leading-none text-teal">
                {s.title}
              </h2>
            </div>
            <RevealText className="max-w-2xl font-lora text-body-lg text-cream/90">
              {s.body}
            </RevealText>
          </div>
        ))}
      </section>

      {/* Galeria */}
      {galeria.length > 0 && (
        <section className="relative z-10 mx-auto mt-md max-w-6xl px-6 md:px-12">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-teal/70">
              ✦
            </span>
            <h2 className="font-mono text-tiny uppercase tracking-[0.3em] text-stone">
              Galeria
            </h2>
            <div className="h-px flex-1 bg-blue-deep/40" />
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {galeria.map((src, i) => {
              const portrait = isPortrait(src);
              return (
                <ImageReveal
                  key={src}
                  delay={i * 0.05}
                  className={cn(
                    'group relative overflow-hidden rounded-lg border border-blue-deep/40 bg-blue-deep/20 transition-[border-color,box-shadow] duration-500 hover:border-teal/50 hover:shadow-[0_10px_40px_rgba(9,194,167,0.15)]',
                    portrait
                      ? 'aspect-[9/16]'
                      : 'col-span-2 aspect-video md:col-span-3 md:aspect-[16/7]'
                  )}
                >
                  <TreatedImage
                    src={src}
                    alt={`${projeto.titulo} — imagem ${i + 1}`}
                    fill
                    treated={false}
                    sizes={
                      portrait
                        ? '(min-width: 768px) 33vw, 50vw'
                        : '(min-width: 768px) 1152px, 100vw'
                    }
                    className="h-full w-full object-cover transition-transform duration-700 ease-artisan group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/30"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </ImageReveal>
              );
            })}
          </div>
        </section>
      )}

      {/* Navegação anterior/próximo */}
      <nav className="relative z-10 mx-auto mt-md max-w-6xl px-6 md:px-12">
        <div className="flex flex-col items-stretch justify-between gap-6 border-t border-blue-deep/50 pt-8 md:flex-row md:items-center">
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
                <div className="font-trickster text-h3">{anterior.titulo}</div>
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
                <div className="font-trickster text-h3">{proximo.titulo}</div>
              </div>
              <span className="md:order-2">
                <ArrowSvg dir="right" />
              </span>
            </Link>
          )}
        </div>

        <div className="mt-sm">
          <Button as="a" href="/#projetos" variant="ghost">
            <ArrowSvg dir="left" />
            Voltar aos projetos
          </Button>
        </div>
      </nav>
    </article>
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
      style={{ transform: dir === 'left' ? 'scaleX(-1)' : 'none' }}
    >
      <path d="M2 7 Q 14 6 26 7 L 22 3 M26 7 L 22 11" />
    </svg>
  );
}
