'use client';

import { useEffect } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import { useAtmosphere } from './Atmosphere';
import { useMobile } from '@/lib/hooks/useMobile';
import { grainSvg } from '@/components/ui/GrainOverlay';

const COLOR_TWEEN = { duration: 2.2, ease: [0.65, 0, 0.35, 1] as const };

/**
 * Fundo discreto: base quase preta + dois glows suaves (cor da atmosfera de
 * cada seção) com grão por cima.
 *
 * Desktop: glows são divs sólidos com filter:blur que derivam devagar e
 * reagem ao mouse.
 *
 * Mobile: filter:blur num elemento fixed é caríssimo — re-rasteriza a cada
 * frame no scroll e, ao animar a cor, durante toda a transição. Por isso no
 * mobile a suavidade vem de radial-gradient (zero custo de filtro) e a cor é
 * interpolada via motion value, repintando só um gradiente leve.
 */
export function BackgroundFX() {
  const { atmosphere } = useAtmosphere();
  const reduced = useReducedMotion();
  const isMobile = useMobile();

  const heavy = !reduced && !isMobile;

  // Parallax do mouse — só no desktop.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 24, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 45, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (!heavy) return;
    const onMove = (e: PointerEvent) => {
      mx.set(((e.clientX / window.innerWidth) - 0.5) * 110);
      my.set(((e.clientY / window.innerHeight) - 0.5) * 110);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, heavy]);

  // Cores dos glows do mobile como motion values interpoláveis (sem blur).
  const colA = useMotionValue(atmosphere.colorA);
  const colB = useMotionValue(atmosphere.colorB);
  // colA/colB alimentam direto o backgroundColor dos glows do mobile (blur
  // estático), interpolando a cor na troca de seção.

  useEffect(() => {
    if (!isMobile) return;
    const a = animate(colA, atmosphere.colorA, COLOR_TWEEN);
    const b = animate(colB, atmosphere.colorB, COLOR_TWEEN);
    return () => {
      a.stop();
      b.stop();
    };
  }, [isMobile, atmosphere.colorA, atmosphere.colorB, colA, colB]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      // translateZ(0) promove o fundo a uma camada própria: no mobile o scroll
      // não força repaint dele (fica composto na GPU).
      style={{ backgroundColor: '#050609', transform: 'translateZ(0)' }}
    >
      <motion.div
        className="absolute inset-0"
        style={heavy ? { x: sx, y: sy } : undefined}
      >
        {isMobile ? (
          <>
            {/* Glow A — canto superior direito. Mesmo blur do desktop, porém
                estático (sem o loop de movimento que travava o mobile). */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '95vw',
                height: '95vw',
                left: '35%',
                top: '-20%',
                filter: 'blur(80px)',
                opacity: 0.5,
                backgroundColor: colA,
              }}
            />
            {/* Glow B — canto inferior esquerdo, também estático. */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '90vw',
                height: '90vw',
                left: '-30%',
                top: '42%',
                filter: 'blur(80px)',
                opacity: 0.42,
                backgroundColor: colB,
              }}
            />
          </>
        ) : (
          <>
            {/* Glow A — canto superior direito */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '68vw',
                height: '68vw',
                left: '52%',
                top: '-18%',
                filter: 'blur(130px)',
                opacity: 0.26,
                willChange: 'transform',
              }}
              animate={{
                backgroundColor: atmosphere.colorA,
                x: ['0vw', '-17vw', '0vw'],
                y: ['0vh', '14vh', '0vh'],
                scale: [1, 1.24, 1],
              }}
              transition={{
                backgroundColor: COLOR_TWEEN,
                x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 26, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
            {/* Glow B — canto inferior esquerdo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '58vw',
                height: '58vw',
                left: '-18%',
                top: '48%',
                filter: 'blur(130px)',
                opacity: 0.2,
                willChange: 'transform',
              }}
              animate={{
                backgroundColor: atmosphere.colorB,
                x: ['0vw', '18vw', '0vw'],
                y: ['0vh', '-15vh', '0vh'],
                scale: [1, 1.22, 1],
              }}
              transition={{
                backgroundColor: COLOR_TWEEN,
                x: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 19, repeat: Infinity, ease: 'easeInOut' },
                scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
              }}
            />
          </>
        )}
      </motion.div>

      {/* Mantém o conjunto sóbrio (preto com detalhes). No mobile o overlay é
          bem mais leve — senão "engole" a cor dos glows e o fundo fica preto. */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: isMobile ? 'rgba(5,6,9,0.12)' : 'rgba(5,6,9,0.42)' }}
      />

      {/* Grão (granulado) — visível sobre o preto, inclusive no mobile */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("${grainSvg}")`,
          backgroundSize: '200px 200px',
        }}
      />
    </div>
  );
}
