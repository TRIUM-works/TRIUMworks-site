'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { projetos, type Projeto } from '@/lib/data/projetos';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSnap } from '@/components/layout/SnapController';
import { TreatedImage } from '@/components/ui/TreatedImage';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { cn } from '@/lib/utils';

export function ProjetosIndividuais() {
  const isMobile = useMobile();
  const snap = useSnap();
  const [snapIndices, setSnapIndices] = useState<{ start: number }>({
    start: -1,
  });

  // Detecta o índice inicial dos projetos no SnapController
  useEffect(() => {
    const compute = () => {
      const all = Array.from(
        document.querySelectorAll<HTMLElement>('[data-snap-section]')
      );
      const carouselIdx = all.findIndex((el) => el.id === 'projetos');
      setSnapIndices({ start: carouselIdx + 1 });
    };
    compute();
    const t = setTimeout(compute, 200);
    return () => clearTimeout(t);
  }, []);

  const activeProjetoIdx = useMemo(() => {
    if (snapIndices.start < 0) return -1;
    const offset = snap.current - snapIndices.start;
    if (offset < 0 || offset >= projetos.length) return -1;
    return offset;
  }, [snap.current, snapIndices.start]);

  return (
    <div className="relative">
      {projetos.map((p, i) => (
        <ProjetoInline
          key={p.slug}
          projeto={p}
          index={i}
          isActive={activeProjetoIdx === i}
          isMobile={isMobile}
          onGoToCarrossel={() => {
            if (snapIndices.start > 0)
              snap.goToIndex(snapIndices.start - 1);
          }}
        />
      ))}
    </div>
  );
}

function ProjetoInline({
  projeto,
  index,
  isActive,
  isMobile,
  onGoToCarrossel,
}: {
  projeto: Projeto;
  index: number;
  isActive: boolean;
  isMobile: boolean;
  onGoToCarrossel: () => void;
}) {
  return (
    <section
      id={`projeto-${projeto.slug}`}
      data-snap-section={`projeto-${projeto.slug}`}
      className="snap-section relative flex h-screen w-full flex-col overflow-hidden bg-carbon pt-14 md:pt-16"
      style={{ height: '100dvh' }}
    >
      {/* Mobile back link */}
      {isMobile && (
        <button
          onClick={onGoToCarrossel}
          data-cursor="hover"
          className="absolute left-4 top-20 z-30 flex items-center gap-2 font-mono text-tiny uppercase tracking-[0.2em] text-teal"
        >
          <svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <path d="M18 5 Q 10 4 2 5 L 6 1 M 2 5 L 6 9" />
          </svg>
          Projetos
        </button>
      )}

      {/* Wrapper relativo para sobrepor a barra na borda inferior do preview */}
      <div className="relative z-10 flex flex-1 flex-col items-center px-4 pb-4 md:px-8 md:pb-6">
        {/* Preview principal — flex-1 ocupa todo espaço disponível.
            min-h-0 permite que o flex-1 encolha abaixo do conteúdo intrínseco
            em viewports curtos. Sem max-h cap: queremos o quadro o maior
            possível em qualquer altura de tela. Wrappeado em Link: clicar na
            imagem leva pra página completa do projeto. */}
        <Link
          href={`/projetos/${projeto.slug}`}
          data-cursor="hover"
          aria-label={`Abrir página do projeto ${projeto.titulo}`}
          className="group relative w-full min-h-0 max-w-[1320px] flex-1 overflow-hidden rounded-lg border border-blue-deep/50 shadow-[0_20px_60px_rgba(0,0,0,0.5)] transition-[border-color,transform,box-shadow] duration-[500ms] ease-artisan hover:border-teal/70 hover:shadow-[0_28px_80px_rgba(9,194,167,0.18)]"
          style={{
            // position: relative inline + display block — ancorar a imagem
            // fill descendente, mesmo se as classes Tailwind ainda não
            // aplicaram (primeiro paint em dev mode).
            position: 'relative',
            display: 'block',
            background: projeto.corCapa,
          }}
        >
          <TreatedImage
            src={projeto.imagemPrincipal}
            alt={projeto.titulo}
            fill
            treated={false}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[700ms] ease-artisan group-hover:scale-[1.02]"
          />
          <GrainOverlay intensity={0.08} />
        </Link>

        {/* Barra discreta — sobrepõe levemente a borda inferior do preview,
            mais estreita que ele para dar destaque ao mockup. Estrutura em
            três colunas com gaps generosos: esquerda (identificação),
            centro (stack), direita (ações). */}
        <div className="relative z-10 -mt-6 flex w-[min(1040px,95%)] items-center justify-between gap-5 rounded-md border border-blue-deep/60 bg-carbon/85 px-6 py-3 backdrop-blur-md md:-mt-7 md:gap-10 md:px-9 md:py-4">
          {/* Esquerda: título + cliente */}
          <div className="flex min-w-0 shrink-0 flex-col">
            <div className="font-trickster text-xl text-cream leading-none md:text-2xl">
              {projeto.titulo}
            </div>
            <div className="mt-1.5 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-stone md:block">
              {projeto.cliente}
            </div>
          </div>

          {/* Divisor sutil */}
          <span
            aria-hidden="true"
            className="hidden h-8 w-px shrink-0 bg-blue-deep/60 md:block"
          />

          {/* Centro: stack — agora alinhada à esquerda com label, parece
              "metadata" em vez de pilhas de tags soltas */}
          <div className="hidden min-w-0 flex-1 flex-col gap-1.5 md:flex">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-stone">
              Stack
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {projeto.tecnologias.slice(0, 4).map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>

          {/* Divisor sutil */}
          <span
            aria-hidden="true"
            className="hidden h-8 w-px shrink-0 bg-blue-deep/60 lg:block"
          />

          {/* Direita: ações + ano */}
          <div className="flex shrink-0 items-center gap-2.5 md:gap-3">
            {projeto.urlExterna && (
              <Button
                as="a"
                href={projeto.urlExterna}
                external
                variant="outline"
                className="group hidden md:inline-flex"
              >
                Visitar site
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Button>
            )}
            <Button
              as="a"
              href={`/projetos/${projeto.slug}`}
              variant="filled"
              className="group"
            >
              Explorar
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Button>
            <div className="hidden flex-col items-center gap-0.5 font-mono text-[9px] uppercase tracking-[0.25em] text-stone lg:flex">
              <span>Ano</span>
              <span className="text-cream">{projeto.ano}</span>
            </div>
          </div>
        </div>
      </div>

      <span aria-hidden="true" className="sr-only">
        Projeto {index + 1} de {projetos.length}
      </span>
    </section>
  );
}

