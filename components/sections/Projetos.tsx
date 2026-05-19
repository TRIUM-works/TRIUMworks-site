'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { projetos, type Projeto } from '@/lib/data/projetos';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSnap } from '@/components/layout/SnapController';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { cn } from '@/lib/utils';

const SPACING_DESKTOP = 230;
const SPACING_MOBILE = 160;
const VISIBLE_DESKTOP = 2;
const VISIBLE_MOBILE = 1;

interface CardProps {
  projeto: Projeto;
  index: number;
  offset: number;
  isActive: boolean;
  spacing: number;
  isMobile: boolean;
  onClick: () => void;
}

function Card({
  projeto,
  index,
  offset,
  isActive,
  spacing,
  isMobile,
  onClick,
}: CardProps) {
  const absOffset = Math.abs(offset);
  const x = offset * spacing;
  const scale = isActive ? 1.15 : Math.max(0.55, 0.85 - absOffset * 0.05);
  const opacity = isActive ? 1 : Math.max(0.15, 0.6 - absOffset * 0.15);
  const z = 50 - absOffset;
  const rot = isActive ? 0 : offset > 0 ? -1 : 1;

  // No mobile: sem blur (filter animado é o que mais trava troca de card),
  // rotação 0 (rotação + spring + scale juntos causam jank em GPUs mobile)
  // e tween curto no lugar de spring para uma troca direta.
  const animate = isMobile
    ? {
        x: `calc(${x}px - 50%)`,
        y: '-50%',
        scale,
        opacity,
      }
    : {
        x: `calc(${x}px - 50%)`,
        y: '-50%',
        scale,
        opacity,
        rotate: rot,
        filter: isActive ? 'blur(0px)' : `blur(${Math.min(absOffset * 0.6, 2)}px)`,
      };

  const transition = isMobile
    ? { type: 'tween' as const, duration: 0.28, ease: [0.4, 0, 0.2, 1] as const }
    : { type: 'spring' as const, stiffness: 120, damping: 22, mass: 0.8 };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      aria-label={`${projeto.titulo} — projeto ${String(index + 1).padStart(2, '0')}`}
      className="absolute left-1/2 top-1/2 origin-center"
      style={{ zIndex: z, willChange: 'transform, opacity' }}
      animate={animate}
      transition={transition}
    >
      <div
        className={cn(
          'relative flex h-[280px] w-[170px] flex-col items-center justify-between overflow-hidden border bg-blue-deep p-4 transition-shadow duration-500 md:h-[380px] md:w-[240px] md:p-6',
          isActive
            ? isMobile
              ? 'border-teal shadow-[0_0_24px_rgba(13,59,102,0.45)]'
              : 'border-teal shadow-[0_0_60px_rgba(13,59,102,0.6)]'
            : 'border-blue-deep'
        )}
      >
        {/* Grain por cima do azul do card inteiro */}
        <GrainOverlay intensity={0.14} />

        {/* Cantos decorativos */}
        <CornerSvg active={isActive} pos="tl" />
        <CornerSvg active={isActive} pos="tr" />
        <CornerSvg active={isActive} pos="bl" />
        <CornerSvg active={isActive} pos="br" />

        {/* Capa */}
        <div className="flex h-full w-full flex-col">
          <div
            className="relative flex flex-1 items-center justify-center overflow-hidden"
            style={{
              background: isActive
                ? projeto.corCapa
                : 'radial-gradient(circle at 50% 50%, #1a4a85 0%, #0d3b66 100%)',
            }}
          >
            {!isActive && (
              <span
                className="select-none font-trickster text-7xl text-cream/80"
                aria-hidden="true"
              >
                {projeto.logoLetra}
              </span>
            )}
            {isActive && (
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 30%, rgba(13,59,102,0.6) 100%)',
                }}
              />
            )}
            <GrainOverlay intensity={0.12} />
          </div>

          <div className="mt-5 text-center">
            <div
              className={cn(
                'font-mono uppercase tracking-[0.28em] text-tiny',
                isActive ? 'text-cream' : 'text-cream/70'
              )}
            >
              {projeto.titulo.split(' ').join(' ')}
            </div>
            {isActive && (
              <div className="mt-2 flex items-center justify-center gap-2 font-mono text-tiny uppercase tracking-[0.25em] text-teal">
                Ver mais
                <motion.span
                  aria-hidden="true"
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block"
                >
                  ↓
                </motion.span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Linha indicadora abaixo do card ativo */}
      {isActive && (
        <motion.div
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          className="absolute -bottom-4 left-1/2 h-px w-16 -translate-x-1/2 bg-teal origin-center"
        />
      )}
    </motion.button>
  );
}

function CornerSvg({
  active,
  pos,
}: {
  active: boolean;
  pos: 'tl' | 'tr' | 'bl' | 'br';
}) {
  const placement = {
    tl: 'top-2 left-2',
    tr: 'top-2 right-2 rotate-90',
    bl: 'bottom-2 left-2 -rotate-90',
    br: 'bottom-2 right-2 rotate-180',
  }[pos];
  return (
    <svg
      aria-hidden="true"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke={active ? '#09C2A7' : '#1a4a85'}
      strokeWidth="1"
      strokeLinecap="round"
      className={cn('pointer-events-none absolute z-10', placement)}
    >
      <path d="M0 5 L0 0 L5 0" />
    </svg>
  );
}

export function Projetos() {
  const [current, setCurrent] = useState(0);
  const isMobile = useMobile();
  const snap = useSnap();

  const spacing = isMobile ? SPACING_MOBILE : SPACING_DESKTOP;
  const visibleCount = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP;

  const total = projetos.length;

  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(total - 1, i));
      setCurrent(clamped);
    },
    [total]
  );

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 70) goTo(current - 1);
    else if (info.offset.x < -70) goTo(current + 1);
  };

  const openProjeto = (slug: string) => {
    // Vai para a página individual do projeto inline (ETAPA 3 cria essas pages).
    // Para já: tenta navegar via snap pra index do projeto.
    const projIndex = projetos.findIndex((p) => p.slug === slug);
    if (projIndex < 0) return;
    // O snap-section "projetos" é a página atual. Cada projeto individual fica
    // logo após. Snap atual + 1 + projIndex.
    snap.goToIndex(snap.current + 1 + projIndex);
  };

  // Setas teclado dentro do carrossel
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (snap.current !== getProjetosSnapIndex()) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        e.stopPropagation();
        goTo(current - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        e.stopPropagation();
        goTo(current + 1);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, goTo, snap.current]);

  return (
    <section
      id="projetos"
      data-snap-section="projetos"
      className="snap-section relative flex h-screen w-full flex-col items-center overflow-hidden bg-carbon"
      style={{ height: '100dvh' }}
    >
      <GrainOverlay intensity={0.08} />

      {/* Cabeçalho — em flow no topo, com espaço próprio. Antes era absolute
          top-20, o que fazia o título flutuar e colidir com o card em alturas
          curtas. */}
      <div className="z-20 shrink-0 pt-20 text-center md:pt-24">
        <div className="mb-2 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
          ✦ Portfolio
        </div>
        <h2 data-cursor="hover" className="font-trickster text-h2 text-teal">
          Projetos
        </h2>
      </div>

      {/* Carrossel — flex-1, ocupa o espaço entre cabeçalho e controles */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ touchAction: 'pan-y' }}
        className="relative flex w-full flex-1 cursor-grab items-center justify-center active:cursor-grabbing"
      >
        <div className="relative h-[340px] w-full md:h-[460px]">
          {projetos.map((p, i) => {
            const offset = i - current;
            if (Math.abs(offset) > visibleCount + 1) return null;
            return (
              <Card
                key={p.slug}
                projeto={p}
                index={i}
                offset={offset}
                spacing={spacing}
                isMobile={isMobile}
                isActive={i === current}
                onClick={() => {
                  if (i === current) openProjeto(p.slug);
                  else goTo(i);
                }}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Controles — em flow no rodapé, garantindo espaço sob o card */}
      <div className="z-10 flex shrink-0 flex-col items-center gap-5 pb-12 md:gap-6 md:pb-16">
        {!isMobile && (
          <div className="flex items-center gap-44">
            <CarouselArrow
              dir="left"
              disabled={current === 0}
              onClick={() => goTo(current - 1)}
            />
            <CarouselArrow
              dir="right"
              disabled={current === total - 1}
              onClick={() => goTo(current + 1)}
            />
          </div>
        )}
        <div className="flex gap-2">
          {projetos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              data-cursor="hover"
              aria-label={`Ir para projeto ${i + 1}`}
              className={cn(
                'h-px transition-all duration-500',
                i === current ? 'w-8 bg-teal' : 'w-4 bg-stone hover:bg-cream'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function getProjetosSnapIndex(): number {
  if (typeof window === 'undefined') return -1;
  const list = Array.from(document.querySelectorAll('[data-snap-section]'));
  return list.findIndex((el) => el.id === 'projetos');
}

function CarouselArrow({
  dir,
  disabled,
  onClick,
}: {
  dir: 'left' | 'right';
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      data-cursor="hover"
      aria-label={dir === 'left' ? 'Projeto anterior' : 'Próximo projeto'}
      className={cn(
        'flex h-8 w-10 items-center justify-center text-teal transition-all',
        disabled
          ? 'cursor-default opacity-20'
          : 'opacity-70 hover:opacity-100 hover:scale-110'
      )}
    >
      <svg
        width="40"
        height="14"
        viewBox="0 0 40 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transform: dir === 'left' ? 'scaleX(-1)' : 'none' }}
      >
        <path d="M2 7 Q 14 5 30 7 L 26 3 M 30 7 L 26 11" />
      </svg>
    </button>
  );
}
