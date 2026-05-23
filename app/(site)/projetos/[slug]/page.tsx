import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  getProjetoBySlug,
  getProjetoAdjacentes,
  projetos,
  type Projeto,
} from '@/lib/data/projetos';
import { TreatedImage } from '@/components/ui/TreatedImage';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { RevealText } from '@/components/animations/RevealText';
import { AnimatedBorder } from '@/components/ui/AnimatedBorder';
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
// qualquer outro nome é paisagem. Em vez de medir dimensões em runtime,
// classificamos pelo nome — barato e estável.
function isPortrait(src: string): boolean {
  return /mobile/i.test(src);
}

interface TextSection {
  title: string;
  body: string;
}

type BentoCell =
  | {
      kind: 'image';
      orient: 'landscape' | 'portrait';
      src: string;
      cols: 2 | 3 | 4 | 6;
    }
  | { kind: 'text'; section: TextSection; cols: 2 | 3 | 4 | 6 }
  | { kind: 'intro'; cols: 2 | 3 | 4 | 6 };

// Monta o Bento numa sequência de "linhas" lógicas de 6 colunas. Cada
// linha tenta misturar texto com imagens; se acabar texto/retrato/
// paisagem antes do que combina, cai num fallback que preenche os 6
// cols com o que sobrar. As sobras finais viram duos (retratos) ou
// banners (paisagens) — garantia de usar TODAS as imagens.
function planBento(
  sections: TextSection[],
  portraits: string[],
  landscapes: string[]
): BentoCell[] {
  const cells: BentoCell[] = [];
  let pi = 0;
  let li = 0;
  let si = 0;

  // Linha 1: paisagem grande (4) + intro (2)
  if (li < landscapes.length) {
    cells.push({
      kind: 'image',
      orient: 'landscape',
      src: landscapes[li++],
      cols: 4,
    });
    cells.push({ kind: 'intro', cols: 2 });
  } else {
    cells.push({ kind: 'intro', cols: 6 });
  }

  // Linha 2: texto + 2 retratos
  if (si < sections.length && pi + 1 < portraits.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 2 });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
  } else if (si < sections.length && pi < portraits.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 4 });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
  } else if (si < sections.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 6 });
  }

  // Linha 3: paisagem full-bleed pra quebrar o ritmo
  if (li < landscapes.length) {
    cells.push({
      kind: 'image',
      orient: 'landscape',
      src: landscapes[li++],
      cols: 6,
    });
  }

  // Linha 4: 2 textos + retrato (ou fallback)
  if (si + 1 < sections.length && pi < portraits.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 2 });
    cells.push({ kind: 'text', section: sections[si++], cols: 2 });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
  } else if (si + 1 < sections.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 3 });
    cells.push({ kind: 'text', section: sections[si++], cols: 3 });
  } else if (si < sections.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 6 });
  }

  // Linha 5: 2 retratos + texto (ou fallback)
  if (si < sections.length && pi + 1 < portraits.length) {
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
    cells.push({ kind: 'text', section: sections[si++], cols: 2 });
  } else if (si < sections.length && pi < portraits.length) {
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
    cells.push({ kind: 'text', section: sections[si++], cols: 4 });
  } else if (si < sections.length) {
    cells.push({ kind: 'text', section: sections[si++], cols: 6 });
  }

  // Sobras de retratos: trios (2/2/2), depois pares (3/3), depois solo
  while (pi + 2 < portraits.length) {
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 2,
    });
  }
  while (pi + 1 < portraits.length) {
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 3,
    });
    cells.push({
      kind: 'image',
      orient: 'portrait',
      src: portraits[pi++],
      cols: 3,
    });
  }
  if (pi < portraits.length) {
    if (li < landscapes.length) {
      cells.push({
        kind: 'image',
        orient: 'portrait',
        src: portraits[pi++],
        cols: 2,
      });
      cells.push({
        kind: 'image',
        orient: 'landscape',
        src: landscapes[li++],
        cols: 4,
      });
    } else {
      cells.push({
        kind: 'image',
        orient: 'portrait',
        src: portraits[pi++],
        cols: 3,
      });
    }
  }

  // Sobras de paisagens: pares (3/3) e depois full (6)
  while (li + 1 < landscapes.length) {
    cells.push({
      kind: 'image',
      orient: 'landscape',
      src: landscapes[li++],
      cols: 3,
    });
    cells.push({
      kind: 'image',
      orient: 'landscape',
      src: landscapes[li++],
      cols: 3,
    });
  }
  while (li < landscapes.length) {
    cells.push({
      kind: 'image',
      orient: 'landscape',
      src: landscapes[li++],
      cols: 6,
    });
  }

  return cells;
}

// Tailwind precisa ver classes literais no source pro JIT — daí o map
// estático em vez de `md:col-span-${n}` interpolado.
const COL_SPAN: Record<2 | 3 | 4 | 6, string> = {
  2: 'md:col-span-2',
  3: 'md:col-span-3',
  4: 'md:col-span-4',
  6: 'md:col-span-6',
};

export default function ProjetoPage({ params }: Params) {
  const projeto = getProjetoBySlug(params.slug);
  if (!projeto) notFound();

  const { anterior, proximo } = getProjetoAdjacentes(projeto.slug);

  // Imagens deduplicadas — imagemPrincipal já aparece em galeria nos
  // dados; sem dedupe ela apareceria duas vezes no Bento.
  const allImages = Array.from(
    new Set([projeto.imagemPrincipal, ...projeto.galeria])
  );
  const portraits = allImages.filter(isPortrait);
  const landscapes = allImages.filter((src) => !isPortrait(src));

  const sections: TextSection[] = [
    { title: 'Contexto', body: projeto.contexto },
    { title: 'Desafios', body: projeto.desafios },
    { title: 'Solução', body: projeto.solucao },
    { title: 'Resultados', body: projeto.resultados },
  ];

  const cells = planBento(sections, portraits, landscapes);

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
    <article className="relative min-h-screen bg-carbon pb-md pt-28 md:pt-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />

      <div className="mx-auto mb-6 max-w-6xl px-6">
        <nav
          aria-label="Caminho"
          className="font-mono text-tiny uppercase tracking-[0.2em] text-stone"
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
      </div>

      {/* Bento — items-start impede que CSS Grid estique imagens
          além do aspect-ratio (preserva orientação). Cells de texto
          continuam stretching pra alinhar com o vizinho mais alto da
          linha — combinado com justify-center no conteúdo, o texto
          fica vertically centered no espaço disponível. */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-6 md:gap-4">
          {(() => {
            let imgCount = 0;
            return cells.map((cell, i) => {
              const imageRank = cell.kind === 'image' ? ++imgCount : 0;
              return (
                <BentoCellRenderer
                  key={i}
                  cell={cell}
                  projeto={projeto}
                  index={i}
                  imageRank={imageRank}
                />
              );
            });
          })()}
        </div>
      </div>

      <div className="mx-auto mt-md max-w-6xl px-6">
        <div className="border-t border-blue-deep/50 pt-sm">
          <div className="mb-3 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
            ✦ Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {projeto.tecnologias.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </div>

        {projeto.urlExterna && (
          <div className="mt-sm">
            <Button
              as="a"
              href={projeto.urlExterna}
              external
              variant="outline"
              className="group"
            >
              Visitar site
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Button>
          </div>
        )}

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

        <div className="mt-sm">
          <Button as="a" href="/#projetos" variant="ghost">
            <ArrowSvg dir="left" />
            Voltar aos projetos
          </Button>
        </div>
      </div>
    </article>
  );
}

function BentoCellRenderer({
  cell,
  projeto,
  index,
  imageRank,
}: {
  cell: BentoCell;
  projeto: Projeto;
  index: number;
  imageRank: number;
}) {
  const span = COL_SPAN[cell.cols];

  if (cell.kind === 'image') {
    const aspect =
      cell.orient === 'landscape'
        ? cell.cols >= 6
          ? 'aspect-[21/9]'
          : 'aspect-video'
        : 'aspect-[9/16]';

    return (
      <ImageReveal
        delay={index * 0.04}
        className={cn(
          'group relative rounded-2xl border border-blue-deep/40 bg-blue-deep/30 transition-all duration-500 hover:border-teal/50 hover:shadow-[0_10px_40px_rgba(9,194,167,0.15)]',
          span,
          aspect
        )}
      >
        <TreatedImage
          src={cell.src}
          alt={projeto.titulo}
          fill
          treated={false}
          sizes={
            cell.orient === 'portrait'
              ? '(min-width: 768px) 33vw, 100vw'
              : cell.cols >= 6
                ? '(min-width: 768px) 1152px, 100vw'
                : '(min-width: 768px) 50vw, 100vw'
          }
          className="h-full w-full object-cover transition-transform duration-700 ease-artisan group-hover:scale-[1.03]"
        />
        {/* Número de índice — #23 */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/25 select-none"
        >
          {String(imageRank).padStart(2, '0')}
        </span>

      </ImageReveal>
    );
  }

  if (cell.kind === 'text') {
    const initial = cell.section.title.charAt(0);
    return (
      <div
        data-cursor="hover"
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border border-blue-deep/40 bg-carbon/60 p-6 transition-colors duration-500 hover:border-teal/30 md:p-8',
          span
        )}
      >
        {/* Borda esquerda animada — #22 */}
        <AnimatedBorder delay={index * 0.06} />
        {/* Letra decorativa de fundo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-4 -right-2 select-none font-trickster text-[120px] leading-none text-blue-deep/[0.18]"
        >
          {initial}
        </span>

        {/* Linha decorativa superior */}
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-teal/60">✦</span>
          <div className="h-px flex-1 bg-blue-deep/50" />
        </div>

        {/* Conteúdo principal */}
        <div className="relative flex-1">
          <h2 className="mb-3 font-trickster text-h3 text-teal">
            {cell.section.title}
          </h2>
          <RevealText className="font-lora text-body text-cream/90">
            {cell.section.body}
          </RevealText>
        </div>

        {/* Linha decorativa inferior */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-blue-deep/50" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-stone/60">✦</span>
        </div>
      </div>
    );
  }

  if (cell.kind === 'intro') {
    return (
      <div
        data-cursor="hover"
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border border-blue-deep/40 bg-gradient-to-br from-blue-deep/40 via-carbon to-carbon p-6 transition-colors duration-500 hover:border-teal/40 md:p-8',
          span
        )}
      >
        {/* Grade decorativa de pontos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #09c2a7 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Linha teal no topo */}
        <div className="relative mb-auto flex items-center gap-3">
          <div className="h-px w-8 bg-teal/50" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-teal/60">
            Projeto
          </span>
        </div>

        {/* Conteúdo principal na base */}
        <div className="relative mt-8">
          <div className="font-mono text-tiny uppercase tracking-[0.3em] text-teal">
            {projeto.categoria} · {projeto.ano}
          </div>
          <h1 className="mt-3 font-trickster text-h2 text-cream md:text-h1">
            {projeto.titulo}
          </h1>
          <p className="mt-4 font-lora italic text-body text-cream/80">
            {projeto.descricaoCurta}
          </p>
          {/* Cliente destacado */}
          <div className="mt-6 flex items-center gap-3 border-t border-blue-deep/50 pt-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-stone">
              Cliente
            </span>
            <div className="h-px flex-1 bg-blue-deep/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cream/70">
              {projeto.cliente}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return null;
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
