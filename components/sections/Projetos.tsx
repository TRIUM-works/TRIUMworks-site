'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useInView,
  type PanInfo,
} from 'framer-motion';
import { projetos } from '@/lib/data/projetos';
import { useSnap } from '@/components/layout/SnapController';
import { useAtmosphere, ATMOSPHERES } from '@/components/layout/Atmosphere';
import { cn } from '@/lib/utils';

const total = projetos.length;
const INK = '#E8E3D7';

export function Projetos() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const snap = useSnap();
  const { setAtmosphere } = useAtmosphere();

  const goTo = useCallback(
    (i: number) => setIndex(Math.max(0, Math.min(total - 1, i))),
    []
  );
  // Loop infinito: passar do último volta pro primeiro e vice-versa.
  const next = useCallback(() => setIndex((i) => (i + 1) % total), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), []);

  useEffect(() => {
    if (inView) setAtmosphere(ATMOSPHERES.projetos);
  }, [inView, setAtmosphere]);

  useEffect(() => {
    if (!inView) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [inView, next, prev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60) next();
    else if (info.offset.x > 60) prev();
  };

  const projeto = projetos[index];

  return (
    <section
      ref={ref}
      id="projetos"
      data-snap-section="projetos"
      className="snap-section relative flex h-screen w-full items-center overflow-hidden"
      style={{ height: '100dvh', color: INK }}
    >
      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-8 md:grid-cols-[38%_62%] md:gap-6">
        {/* ── Texto (esquerda) — colado no card, na altura dele ── */}
        <div className="order-2 px-6 md:order-1 md:pl-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={projeto.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-8 md:ml-auto md:mr-6 md:h-[50vh] md:max-w-sm md:justify-between md:gap-0"
            >
              <div className="font-mono text-tiny uppercase tracking-[0.3em] text-[#E8E3D7]/60">
                {projeto.categoria} · {projeto.ano}
              </div>

              <div>
                <h2
                  data-cursor="hover"
                  className="font-display font-bold leading-[0.92] tracking-[-0.02em] text-[#E8E3D7]"
                  style={{ fontSize: 'clamp(38px, 4.6vw, 70px)' }}
                >
                  {projeto.titulo}
                </h2>
                <p className="mt-5 font-lora text-body-lg text-[#E8E3D7]/70">
                  {projeto.descricaoCurta}
                </p>
              </div>

              <a
                href={projeto.urlExterna}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group inline-flex w-fit items-center gap-2 border-b border-[#E8E3D7]/30 pb-1 font-mono text-tiny uppercase tracking-[0.2em] text-[#E8E3D7] transition-colors hover:border-[#E8E3D7]"
              >
                Ver projeto
                <span className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Deck de cards (direita) — menor e descolado da parede ── */}
        <div className="order-1 md:order-2">
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            style={{ touchAction: 'pan-y' }}
            className="relative ml-6 cursor-grab active:cursor-grabbing md:ml-0 md:max-w-[900px]"
          >
            {/* Palco — paisagem 16:9, à esquerda da coluna (perto do texto);
                as cartas de trás abrem para a direita, no espaço livre. */}
            <div className="relative aspect-video w-full">
              {projetos.map((p, i) => {
                const depth = (i - index + total) % total; // 0 = frente
                const isActive = depth === 0;
                return (
                  <motion.div
                    key={p.slug}
                    onClick={() => !isActive && goTo(i)}
                    data-cursor="hover"
                    className={cn(
                      'absolute inset-0 overflow-hidden rounded-[2rem] shadow-[0_40px_90px_rgba(0,0,0,0.5)]',
                      !isActive && 'cursor-pointer'
                    )}
                    style={{ background: '#0b0e13' }}
                    initial={false}
                    animate={{
                      x: depth * 46, // cartas de trás abrem para a DIREITA
                      y: depth * 10,
                      scale: 1 - depth * 0.06,
                      rotate: depth * 1.5,
                      zIndex: total - depth,
                      opacity: depth === 0 ? 1 : 0.85,
                      filter: `blur(${depth * 4}px)`, // ... com blur
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 140,
                      damping: 22,
                      mass: 0.9,
                    }}
                  >
                    {/* Imagem do projeto */}
                    <Image
                      src={p.imagemCard ?? p.imagemPrincipal}
                      alt={p.titulo}
                      fill
                      priority={i === 0}
                      sizes="(min-width: 768px) 56vw, 100vw"
                      className="object-cover"
                      draggable={false}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Paginação — compacta */}
            <div className="mt-5 flex items-center gap-3">
              <PagButton dir="prev" onClick={prev} />

              <div className="flex max-w-[160px] flex-1 items-center gap-1.5">
                {projetos.map((p, i) => (
                  <button
                    key={p.slug}
                    onClick={() => goTo(i)}
                    data-cursor="hover"
                    aria-label={`Ir para ${p.titulo}`}
                    className="group relative h-3 flex-1"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-[#E8E3D7]/20" />
                    <motion.span
                      className="absolute inset-x-0 top-1/2 h-[2px] origin-left -translate-y-1/2 rounded-full bg-[#E8E3D7]"
                      initial={false}
                      animate={{ scaleX: i <= index ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </button>
                ))}
              </div>

              <PagButton dir="next" onClick={next} />

              <span className="ml-1 font-mono text-[10px] tracking-[0.2em] text-[#E8E3D7]/55">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Continuidade vertical → Contato */}
      <motion.button
        type="button"
        onClick={() => snap.goToId('contato')}
        data-cursor="hover"
        aria-label="Ir para Contato"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="group absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#E8E3D7]/45 transition-colors group-hover:text-[#E8E3D7]">
          Contato
        </span>
        <span className="text-[#E8E3D7]/55 transition-transform duration-500 group-hover:translate-y-1 group-hover:text-[#E8E3D7]">
          ↓
        </span>
      </motion.button>
    </section>
  );
}

function PagButton({
  dir,
  onClick,
}: {
  dir: 'prev' | 'next';
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      data-cursor="hover"
      aria-label={dir === 'prev' ? 'Projeto anterior' : 'Próximo projeto'}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E3D7]/30 text-xs text-[#E8E3D7] transition-all duration-300 hover:border-[#E8E3D7] hover:bg-[#E8E3D7] hover:text-carbon"
    >
      <span style={{ transform: dir === 'prev' ? 'scaleX(-1)' : 'none' }}>→</span>
    </button>
  );
}
