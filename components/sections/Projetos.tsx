'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type PanInfo,
} from 'framer-motion';
import { projetos } from '@/lib/data/projetos';
import { useSnap } from '@/components/layout/SnapController';
import { useAtmosphere } from '@/components/layout/Atmosphere';
import { cn } from '@/lib/utils';

const total = projetos.length;
const INK = '#E8E3D7';
const EASE = [0.16, 1, 0.3, 1] as const;

/** Anexa alpha (0–1) a um hex sólido: #EF4444 + 0.4 → #EF444466 */
function withAlpha(hex: string, a: number) {
  return hex + Math.round(a * 255).toString(16).padStart(2, '0');
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export function Projetos() {
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const snap = useSnap();
  const { setAtmosphere } = useAtmosphere();
  const reduced = useReducedMotion();
  const isMobile = useMedia('(max-width: 767px)');
  const finePointer = useMedia('(pointer: fine)');

  const goTo = useCallback((i: number) => {
    setIndex(Math.max(0, Math.min(total - 1, i)));
  }, []);
  // Loop infinito: passar do último volta pro primeiro e vice-versa.
  const next = useCallback(() => setIndex((i) => (i + 1) % total), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), []);

  const projeto = projetos[index];

  // A atmosfera do fundo assume a cor da marca do projeto em foco.
  useEffect(() => {
    if (inView) {
      setAtmosphere({
        id: `projetos-${projeto.slug}`,
        colorA: projeto.accent,
        colorB: INK,
      });
    }
  }, [inView, projeto, setAtmosphere]);

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

  // ── Tilt 3D do deck (desktop, pointer fino) ──
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const rX = useSpring(tiltX, { stiffness: 130, damping: 18, mass: 0.6 });
  const rY = useSpring(tiltY, { stiffness: 130, damping: 18, mass: 0.6 });
  // Brilho especular que acompanha a inclinação.
  const glossX = useTransform(rY, [-9, 9], ['18%', '82%']);
  const glossY = useTransform(rX, [7, -7], ['15%', '85%']);
  const gloss = useMotionTemplate`radial-gradient(480px circle at ${glossX} ${glossY}, rgba(232,227,215,0.13), transparent 60%)`;

  const tiltEnabled = finePointer && !reduced;

  const onTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltEnabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    tiltY.set(px * 9);
    tiltX.set(py * -7);
  };
  const onTiltLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  // Geometria do leque: mais aberto no desktop, discreto no mobile.
  const xStep = isMobile ? 22 : 64;
  const yStep = isMobile ? 8 : 12;
  const scaleStep = isMobile ? 0.045 : 0.06;
  const rotStep = isMobile ? 1.2 : 1.8;
  // No mobile só os 3 cards da frente ficam montados: os de trás ficam ocultos
  // atrás mesmo, então não vale a pena compô-los/decodificá-los (8 imagens
  // full-bleed empilhadas é o que trava o aparelho).
  const visibleDepth = isMobile ? 3 : total;

  return (
    <section
      ref={ref}
      id="projetos"
      data-snap-section="projetos"
      className="snap-section relative flex h-screen w-full items-center overflow-hidden"
      style={{
        height: '100svh',
        color: INK,
        ['--ac' as string]: projeto.accent,
      }}
    >
      {/* Número-fantasma editorial — desktop: canto inferior esquerdo, inteiro */}
      <GhostNumber
        index={index}
        accent={projeto.accent}
        className="absolute left-8 z-[1] hidden md:block"
        style={{ fontSize: 'clamp(130px, 14vw, 210px)', bottom: 'clamp(20px, 5vh, 56px)' }}
      />

      <div className="relative z-10 grid w-full grid-cols-1 items-center gap-6 md:grid-cols-[38%_62%] md:gap-6">
        {/* ── Texto (esquerda) — colado no card, na altura dele ── */}
        <div className="order-2 px-6 md:order-1 md:pl-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={projeto.slug}
              className="flex flex-col gap-5 md:ml-auto md:mr-6 md:h-[50vh] md:max-w-sm md:justify-between md:gap-0"
            >
              <Reveal reduced={reduced}>
                <div className="flex items-center gap-2.5 font-mono text-tiny uppercase tracking-[0.3em] text-[#E8E3D7]/60">
                  <span
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: projeto.accent }}
                  />
                  {projeto.categoria} · {projeto.ano}
                </div>
              </Reveal>

              <div>
                <Reveal
                  reduced={reduced}
                  delay={0.06}
                  className="-mb-[clamp(10px,1.3vw,19px)] pb-[clamp(10px,1.3vw,19px)]"
                >
                  <h2
                    data-cursor="hover"
                    className="font-display font-bold leading-[0.92] tracking-[-0.02em] text-[#E8E3D7]"
                    style={{ fontSize: 'clamp(36px, 4.6vw, 70px)' }}
                  >
                    {projeto.titulo}
                  </h2>
                </Reveal>
                <Reveal reduced={reduced} delay={0.12}>
                  <p className="mt-3 line-clamp-3 font-lora text-[15px] leading-relaxed text-[#E8E3D7]/70 md:mt-5 md:line-clamp-none md:text-body-lg">
                    {projeto.descricaoCurta}
                  </p>
                </Reveal>
              </div>

              <Reveal reduced={reduced} delay={0.18}>
                <a
                  href={projeto.urlExterna}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group inline-flex w-fit items-center gap-2 border-b border-[#E8E3D7]/30 pb-1 font-mono text-tiny uppercase tracking-[0.2em] text-[#E8E3D7] transition-colors hover:border-[var(--ac)]"
                >
                  Ver projeto
                  <span
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
                    style={{ color: projeto.accent }}
                  >
                    ↗
                  </span>
                </a>
              </Reveal>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Deck de cards (direita) ── */}
        <div className="relative order-1 md:order-2">
          {/* Número-fantasma — mobile: espiando atrás do canto do card */}
          <GhostNumber
            index={index}
            accent={projeto.accent}
            className="absolute -top-9 right-4 z-0 md:hidden"
            style={{ fontSize: '88px' }}
          />

          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.16}
            onDragEnd={handleDragEnd}
            style={{ touchAction: 'pan-y' }}
            className="relative z-10 ml-5 mr-9 cursor-grab active:cursor-grabbing md:ml-0 md:mr-24 md:max-w-[820px]"
          >
            {/* Palco em perspectiva — o deck inteiro inclina seguindo o cursor;
                as cartas de trás abrem em leque para a direita. */}
            <div
              style={{ perspective: 1400 }}
              onPointerMove={onTiltMove}
              onPointerLeave={onTiltLeave}
            >
              <motion.div
                className="relative aspect-video w-full"
                style={
                  tiltEnabled
                    ? { rotateX: rX, rotateY: rY, transformStyle: 'preserve-3d' }
                    : undefined
                }
              >
                {projetos.map((p, i) => {
                  const depth = (i - index + total) % total; // 0 = frente
                  const isActive = depth === 0;
                  // Mobile: descarta os cards do fundo (ocultos) — menos camadas
                  // na GPU e menos imagens decodificadas.
                  if (depth > visibleDepth) return null;
                  return (
                    <motion.div
                      key={p.slug}
                      onClick={() => !isActive && goTo(i)}
                      data-cursor="hover"
                      className={cn(
                        'absolute inset-0 overflow-hidden rounded-2xl border border-[#E8E3D7]/10 md:rounded-[2rem]',
                        !isActive && 'cursor-pointer'
                      )}
                      style={{
                        background: '#0b0e13',
                        // Sombra estática (fora do spring): animá-la forçava
                        // repaint por frame e travava a troca no mobile.
                        boxShadow: isActive
                          ? `0 30px 80px rgba(0,0,0,0.55), 0 0 110px ${withAlpha(projeto.accent, 0.16)}`
                          : '0 20px 50px rgba(0,0,0,0.4)',
                      }}
                      initial={false}
                      animate={{
                        x: depth * xStep,
                        y: depth * yStep,
                        scale: 1 - depth * scaleStep,
                        rotate: depth * rotStep,
                        zIndex: total - depth,
                        opacity: isActive ? 1 : 0.95 - depth * 0.12,
                        // Blur só no desktop. Animar `filter` re-rasteriza o card
                        // a cada frame — é o que mais trava o mobile. Lá a
                        // profundidade vem só de scale/escurecimento (compostos).
                        filter: isMobile ? 'none' : `blur(${depth * 1.5}px)`,
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
                      {/* Scrim sutil para ancorar o card no fundo escuro */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                      {/* Escurecimento das cartas de trás via opacity (composto) */}
                      <motion.div
                        className="pointer-events-none absolute inset-0 bg-black"
                        initial={false}
                        animate={{ opacity: depth * 0.22 }}
                        transition={{
                          type: 'spring',
                          stiffness: 140,
                          damping: 22,
                          mass: 0.9,
                        }}
                      />
                      {/* Brilho especular que segue o tilt (só no card da frente) */}
                      {isActive && tiltEnabled && (
                        <motion.div
                          className="pointer-events-none absolute inset-0"
                          style={{ background: gloss }}
                        />
                      )}
                    </motion.div>
                  );
                })}

              </motion.div>
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
                    <span className="absolute inset-x-0 top-[calc(50%-1px)] h-[2px] rounded-full bg-[#E8E3D7]/20" />
                    <motion.span
                      className="absolute inset-x-0 top-[calc(50%-1px)] h-[2px] origin-left rounded-full"
                      initial={false}
                      animate={{
                        scaleX: i <= index ? 1 : 0,
                        backgroundColor: projeto.accent,
                      }}
                      transition={{
                        scaleX: { duration: 0.5, ease: EASE },
                        backgroundColor: { duration: 0.5 },
                      }}
                    />
                  </button>
                ))}
              </div>

              <PagButton dir="next" onClick={next} />

              <span className="ml-1 font-mono text-[10px] tracking-[0.2em] text-[#E8E3D7]/55">
                <span style={{ color: projeto.accent }}>
                  {String(index + 1).padStart(2, '0')}
                </span>{' '}
                / {String(total).padStart(2, '0')}
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

/** Reveal editorial: o conteúdo sobe por trás de uma máscara (overflow hidden). */
function Reveal({
  children,
  delay = 0,
  className,
  reduced,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  reduced?: boolean | null;
}) {
  if (reduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, delay } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {children}
      </motion.div>
    );
  }
  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ y: '110%' }}
        animate={{ y: '0%', transition: { duration: 0.6, ease: EASE, delay } }}
        exit={{ y: '-110%', transition: { duration: 0.3, ease: EASE } }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Índice gigante em contorno, na cor da marca do projeto em foco. */
function GhostNumber({
  index,
  accent,
  className,
  style,
}: {
  index: number;
  accent: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn('pointer-events-none select-none', className)}
      style={style}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -28, transition: { duration: 0.25, ease: EASE } }}
          transition={{ duration: 0.6, ease: EASE }}
          className="block font-display font-bold tracking-[-0.04em]"
          style={{
            lineHeight: 0.78,
            color: 'transparent',
            WebkitTextStroke: `1.5px ${withAlpha(accent, 0.4)}`,
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.span>
      </AnimatePresence>
    </div>
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
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#E8E3D7]/30 text-xs text-[#E8E3D7] transition-all duration-300 hover:border-[var(--ac)] hover:bg-[var(--ac)] hover:text-carbon"
    >
      <span style={{ transform: dir === 'prev' ? 'scaleX(-1)' : 'none' }}>→</span>
    </button>
  );
}
