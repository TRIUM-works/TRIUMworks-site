'use client';

import { motion } from 'framer-motion';
import { useSnap } from '@/components/layout/SnapController';
import { CSSFallbackBackground } from '@/components/shader/CSSFallbackBackground';
import { StrokeText } from '@/components/animations/StrokeText';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const snap = useSnap();

  const scrollToProjetos = () => snap.goToId('projetos');

  return (
    <section
      id="inicio"
      data-snap-section="inicio"
      className="snap-section relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-carbon"
    >
      <CSSFallbackBackground />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <TriumSpotlightTitle />

        <motion.p
          className="mt-6 max-w-xl font-lora italic text-body-lg text-stone"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.65, 0, 0.35, 1] }}
        >
          Soluções digitais feitas à mão. Pensadas para durar.
          Direto de Volta Redonda, RJ, para o Brasil.
        </motion.p>

        <motion.div
          aria-hidden="true"
          className="mt-8 text-2xl text-teal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.85, 0, 0.15, 1] }}
        >
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✦
          </motion.span>
        </motion.div>

        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.7, ease: [0.65, 0, 0.35, 1] }}
          className="mt-10"
        >
          <Button onClick={scrollToProjetos}>Ver Projetos</Button>
        </motion.div>
      </div>

      {/* Scroll indicator — clicável: vai para Projetos */}
      <motion.button
        type="button"
        onClick={scrollToProjetos}
        data-cursor="hover"
        aria-label="Ir para Projetos"
        className="group absolute bottom-10 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <motion.span
          aria-hidden="true"
          className="block h-10 w-px bg-stone group-hover:bg-teal"
          animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top' }}
        />
        <span className="font-mono text-tiny uppercase tracking-[0.25em] text-stone group-hover:text-teal">
          scroll
        </span>
      </motion.button>
    </section>
  );
}

function TriumSpotlightTitle() {
  return (
    <h1
      data-cursor="hover"
      className="font-trickster text-cream leading-[0.92]"
      style={{ fontSize: 'clamp(96px, 18vw, 240px)' }}
    >
      <StrokeText text="TRIUM" delay={0.2} letterStagger={0.12} />
    </h1>
  );
}
