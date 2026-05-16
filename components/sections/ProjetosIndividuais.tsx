'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { projetos, type Projeto } from '@/lib/data/projetos';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSnap } from '@/components/layout/SnapController';
import { TreatedImage } from '@/components/ui/TreatedImage';
import { Tag } from '@/components/ui/Tag';
import { Button } from '@/components/ui/Button';
import { GrainOverlay, grainSvg } from '@/components/ui/GrainOverlay';
import { useSprayTrail } from '@/lib/hooks/useSprayTrail';
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
      className="snap-section relative flex h-screen w-full flex-col overflow-hidden bg-carbon pt-16 md:pt-20"
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
      <div className="relative z-10 flex flex-1 flex-col items-center px-4 pb-10 md:px-8 md:pb-14">
        {/* Preview principal — ocupa quase toda a tela.
            max-h cap impede o preview de esticar absurdamente em fullscreen
            ou monitores muito grandes. */}
        <div
          className="relative w-full max-w-[1280px] max-h-[760px] flex-1 overflow-hidden rounded-lg border border-blue-deep/50 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          style={{ background: projeto.corCapa }}
        >
          <TreatedImage
            src={projeto.imagemPrincipal}
            alt={projeto.titulo}
            fill
            treated={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <GrainOverlay intensity={0.08} />
          <PreviewSpray />
        </div>

        {/* Barra discreta — sobrepõe levemente a borda inferior do preview,
            mais estreita que ele para dar destaque ao mockup */}
        <div className="relative z-10 -mt-7 flex w-[min(820px,92%)] items-center justify-between gap-4 rounded-md border border-blue-deep/60 bg-carbon/85 px-5 py-3 backdrop-blur-md md:-mt-8 md:px-7 md:py-4">
          {/* Esquerda: título + cliente */}
          <div className="flex min-w-0 flex-col">
            <div className="font-trickster text-xl text-cream leading-none md:text-2xl">
              {projeto.titulo}
            </div>
            <div className="mt-1 hidden font-mono text-[10px] uppercase tracking-[0.25em] text-stone md:block">
              {projeto.cliente}
            </div>
          </div>

          {/* Centro: tags */}
          <div className="hidden flex-1 flex-wrap items-center justify-center gap-2 md:flex">
            {projeto.tecnologias.slice(0, 4).map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          {/* Direita: ação + ano */}
          <div className="flex shrink-0 items-center gap-4">
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
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-stone md:block">
              {String(projeto.ano).split('').join(' ')}
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

/**
 * Overlay de spray sobre o preview do projeto.
 * Aplica apenas textura granulada (sem cor própria forte) na trilha do mouse,
 * via mix-blend-overlay para se integrar à imagem original.
 */
function PreviewSpray() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const paintRef = useRef<HTMLDivElement>(null);
  const { onPointerMove } = useSprayTrail(wrapperRef, paintRef, {
    baseRadius: 80,
    maxAge: 90,
    growth: 0.4,
  });

  return (
    <div
      ref={wrapperRef}
      onPointerMove={onPointerMove}
      aria-hidden="true"
      // pointer-events-auto só pra capturar o mousemove; o filho com paint
      // tem pointer-events-none, então não atrapalha nada (a área do preview
      // não tem links/cliques próprios).
      className="absolute inset-0 z-[5]"
    >
      <div
        ref={paintRef}
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("${grainSvg}")`,
          backgroundSize: '140px 140px',
          mixBlendMode: 'overlay',
          opacity: 0,
          transition: 'opacity 220ms ease-out',
        }}
      />
    </div>
  );
}
