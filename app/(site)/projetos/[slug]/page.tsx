import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  getProjetoBySlug,
  getProjetoAdjacentes,
  projetos,
} from '@/lib/data/projetos';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { ImageReveal } from '@/components/animations/ImageReveal';
import { RevealText } from '@/components/animations/RevealText';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { BrowserFrame, PhoneFrame } from '@/components/ui/DeviceFrame';
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

// Convenção do projeto: arquivos "mobile*" são screenshots verticais.
function isPortrait(src: string): boolean {
  return /mobile/i.test(src);
}

function domainFrom(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/.*$/, '');
  }
}

interface TextSection {
  title: string;
  body: string;
}

type Media = { type: 'browser' | 'phone'; src: string };

export default function ProjetoPage({ params }: Params) {
  const projeto = getProjetoBySlug(params.slug);
  if (!projeto) notFound();

  const { anterior, proximo } = getProjetoAdjacentes(projeto.slug);
  const domain = domainFrom(projeto.urlExterna);

  // Imagens deduplicadas, separadas por orientação.
  const allImages = Array.from(
    new Set([projeto.imagemPrincipal, ...projeto.galeria])
  );
  const desktops = allImages.filter((s) => !isPortrait(s));
  const phones = allImages.filter(isPortrait);

  const heroDesktop = desktops[0] ?? projeto.imagemPrincipal;
  const heroPhone = phones[0];

  // Pool de mídia restante, intercalando desktop/phone para variar o ritmo.
  const restDesktops = desktops.slice(heroDesktop === desktops[0] ? 1 : 0);
  const restPhones = phones.slice(heroPhone ? 1 : 0);
  const mediaQueue: Media[] = [];
  const maxLen = Math.max(restDesktops.length, restPhones.length);
  for (let i = 0; i < maxLen; i++) {
    if (restDesktops[i]) mediaQueue.push({ type: 'browser', src: restDesktops[i] });
    if (restPhones[i]) mediaQueue.push({ type: 'phone', src: restPhones[i] });
  }

  const sections: TextSection[] = [
    { title: 'Contexto', body: projeto.contexto },
    { title: 'Desafios', body: projeto.desafios },
    { title: 'Solução', body: projeto.solucao },
    { title: 'Resultados', body: projeto.resultados },
  ];
  const sectionMedia = mediaQueue.slice(0, sections.length);
  const galleryMedia = mediaQueue.slice(sections.length);

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

      {/* Showcase principal — browser + celular sobreposto */}
      <div className="relative z-10 mx-auto mt-12 max-w-6xl px-6 md:mt-16 md:px-12">
        <ImageReveal className="relative">
          <BrowserFrame url={domain}>
            <div
              className="relative aspect-[16/9] w-full"
              style={{ background: projeto.corCapa }}
            >
              <Image
                src={heroDesktop}
                alt={`${projeto.titulo} — visão desktop`}
                fill
                priority
                sizes="(min-width: 768px) 1100px, 100vw"
                className="object-cover object-top"
              />
              <GrainOverlay intensity={0.06} />
            </div>
          </BrowserFrame>

          {heroPhone && (
            <div className="absolute -bottom-10 right-2 hidden w-[130px] md:block lg:right-6 lg:w-[160px]">
              <PhoneFrame>
                <div
                  className="relative aspect-[9/19] w-full"
                  style={{ background: projeto.corCapa }}
                >
                  <Image
                    src={heroPhone}
                    alt={`${projeto.titulo} — visão mobile`}
                    fill
                    sizes="160px"
                    className="object-cover object-top"
                  />
                </div>
              </PhoneFrame>
            </div>
          )}
        </ImageReveal>
      </div>

      {/* Storytelling — texto + dispositivo, lados alternados */}
      <section className="relative z-10 mx-auto mt-md max-w-6xl px-6 md:px-12">
        {sections.map((s, i) => {
          const media = sectionMedia[i];
          const reverse = i % 2 === 1;
          return (
            <div
              key={s.title}
              className="grid items-center gap-8 border-t border-blue-deep/40 py-10 md:grid-cols-2 md:gap-14 md:py-14"
            >
              <div className={cn('min-w-0', reverse && 'md:order-2')}>
                <div className="flex items-start gap-4">
                  <span className="font-mono text-tiny tracking-[0.2em] text-teal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-trickster text-h2 leading-none text-teal">
                    {s.title}
                  </h2>
                </div>
                <RevealText className="mt-5 max-w-xl font-lora text-body-lg text-cream/90">
                  {s.body}
                </RevealText>
              </div>

              <div className={cn('min-w-0', reverse && 'md:order-1')}>
                <MediaSlot
                  media={media}
                  domain={domain}
                  delay={i * 0.05}
                  titulo={projeto.titulo}
                  corCapa={projeto.corCapa}
                  initial={projeto.logoLetra}
                />
              </div>
            </div>
          );
        })}
      </section>

      {/* Galeria de telas restantes */}
      {galleryMedia.length > 0 && (
        <section className="relative z-10 mx-auto mt-md max-w-6xl px-6 md:px-12">
          <div className="mb-8 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-teal/70">
              ✦
            </span>
            <h2 className="font-mono text-tiny uppercase tracking-[0.3em] text-stone">
              Mais telas
            </h2>
            <div className="h-px flex-1 bg-blue-deep/40" />
          </div>

          <div className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
            {galleryMedia.map((m, i) => (
              <div
                key={m.src}
                className={cn(m.type === 'phone' && 'flex justify-center')}
              >
                <MediaSlot
                  media={m}
                  domain={domain}
                  delay={i * 0.05}
                  titulo={projeto.titulo}
                  corCapa={projeto.corCapa}
                  initial={projeto.logoLetra}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA visitar */}
      {projeto.urlExterna && (
        <section className="relative z-10 mx-auto mt-md max-w-6xl px-6 text-center md:px-12">
          <div className="rounded-2xl border border-blue-deep/40 bg-blue-deep/10 px-6 py-12">
            <div className="font-mono text-tiny uppercase tracking-[0.3em] text-stone">
              Veja funcionando
            </div>
            <p className="mx-auto mt-4 max-w-md font-lora text-body-lg text-cream">
              O jeito mais honesto de conhecer um projeto é navegando por ele.
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                as="a"
                href={projeto.urlExterna}
                external
                variant="filled"
                className="group"
              >
                Abrir {domain ?? 'o site'}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Button>
            </div>
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

function MediaSlot({
  media,
  domain,
  delay,
  titulo,
  corCapa,
  initial,
}: {
  media?: Media;
  domain?: string;
  delay: number;
  titulo: string;
  corCapa: string;
  initial: string;
}) {
  // Sem mídia disponível: painel decorativo com a inicial do projeto.
  if (!media) {
    return (
      <ImageReveal
        delay={delay}
        className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-blue-deep/40"
      >
        <div className="absolute inset-0" style={{ background: corCapa }} />
        <div className="absolute inset-0 bg-carbon/40" />
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-trickster text-[120px] leading-none text-cream/15"
        >
          {initial}
        </span>
        <GrainOverlay intensity={0.1} />
      </ImageReveal>
    );
  }

  if (media.type === 'phone') {
    return (
      <ImageReveal delay={delay} className="w-[210px] sm:w-[240px]">
        <PhoneFrame>
          <div
            className="relative aspect-[9/19] w-full"
            style={{ background: corCapa }}
          >
            <Image
              src={media.src}
              alt={`${titulo} — tela mobile`}
              fill
              sizes="240px"
              className="object-cover object-top"
            />
          </div>
        </PhoneFrame>
      </ImageReveal>
    );
  }

  return (
    <ImageReveal delay={delay}>
      <BrowserFrame url={domain}>
        <div
          className="relative aspect-[16/10] w-full"
          style={{ background: corCapa }}
        >
          <Image
            src={media.src}
            alt={`${titulo} — tela desktop`}
            fill
            sizes="(min-width: 768px) 540px, 100vw"
            className="object-cover object-top"
          />
          <GrainOverlay intensity={0.06} />
        </div>
      </BrowserFrame>
    </ImageReveal>
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
