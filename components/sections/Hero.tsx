'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useSnap } from '@/components/layout/SnapController';
import { useAtmosphere, ATMOSPHERES } from '@/components/layout/Atmosphere';
import { StrokeText } from '@/components/animations/StrokeText';

export function Hero() {
  const snap = useSnap();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { setAtmosphere } = useAtmosphere();

  useEffect(() => {
    if (inView) setAtmosphere(ATMOSPHERES.hero);
  }, [inView, setAtmosphere]);

  return (
    <section
      ref={ref}
      id="inicio"
      data-snap-section="inicio"
      className="snap-section relative flex h-screen w-full flex-col items-center justify-center overflow-hidden"
      style={{ height: '100dvh' }}
    >
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo TRIUM (modelo antigo) em destaque no centro */}
        <h1
          data-cursor="hover"
          className="font-trickster leading-[0.92] text-white"
          style={{
            fontSize: 'clamp(88px, 17vw, 230px)',
            textShadow: '0 8px 50px rgba(0,0,0,0.45)',
          }}
        >
          <StrokeText text="TRIUM" delay={0.2} letterStagger={0.12} />
        </h1>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-mono text-sm uppercase tracking-[0.45em] text-white/75 md:text-base"
          style={{ textShadow: '0 2px 18px rgba(0,0,0,0.4)' }}
        >
          Soluções digitais
        </motion.p>
      </div>

      {/* Indicador de continuidade */}
      <motion.button
        type="button"
        onClick={() => snap.goToId('projetos')}
        data-cursor="hover"
        aria-label="Ir para Projetos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="group absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50 transition-colors group-hover:text-white">
          Rolar
        </span>
        <motion.span
          aria-hidden="true"
          className="text-white/60 transition-colors group-hover:text-white"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            width="18"
            height="10"
            viewBox="0 0 18 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 1 L9 8 L17 1" />
          </svg>
        </motion.span>
      </motion.button>
    </section>
  );
}
