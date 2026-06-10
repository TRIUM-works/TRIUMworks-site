'use client';

import { useEffect } from 'react';
import {
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
 * Fundo discreto: base quase preta + dois glows MUITO desfocados (cor da
 * atmosfera de cada seção) que derivam devagar e reagem de leve ao mouse,
 * com grão por cima. Substitui o liquid-chrome por algo suave/"blur".
 */
export function BackgroundFX() {
  const { atmosphere } = useAtmosphere();
  const reduced = useReducedMotion();
  const isMobile = useMobile();

  // No mobile o blur(130px) animando em loop força o GPU a re-rasterizar uma
  // camada gigante todo frame — derruba o FPS. Mantemos os glows estáticos
  // (com a transição de cor) e desligamos o movimento/escala infinitos.
  const heavy = !reduced && !isMobile;

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

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ backgroundColor: '#050609' }}
    >
      <motion.div className="absolute inset-0" style={{ x: sx, y: sy }}>
        {/* Glow A — canto superior direito */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '68vw',
            height: '68vw',
            left: '52%',
            top: '-18%',
            filter: isMobile ? 'blur(90px)' : 'blur(130px)',
            opacity: 0.26,
            willChange: heavy ? 'transform' : 'auto',
          }}
          animate={
            heavy
              ? {
                  backgroundColor: atmosphere.colorA,
                  x: ['0vw', '-17vw', '0vw'],
                  y: ['0vh', '14vh', '0vh'],
                  scale: [1, 1.24, 1],
                }
              : { backgroundColor: atmosphere.colorA }
          }
          transition={
            heavy
              ? {
                  backgroundColor: COLOR_TWEEN,
                  x: { duration: 20, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 26, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
                }
              : { backgroundColor: COLOR_TWEEN }
          }
        />
        {/* Glow B — canto inferior esquerdo */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '58vw',
            height: '58vw',
            left: '-18%',
            top: '48%',
            filter: isMobile ? 'blur(90px)' : 'blur(130px)',
            opacity: 0.2,
            willChange: heavy ? 'transform' : 'auto',
          }}
          animate={
            heavy
              ? {
                  backgroundColor: atmosphere.colorB,
                  x: ['0vw', '18vw', '0vw'],
                  y: ['0vh', '-15vh', '0vh'],
                  scale: [1, 1.22, 1],
                }
              : { backgroundColor: atmosphere.colorB }
          }
          transition={
            heavy
              ? {
                  backgroundColor: COLOR_TWEEN,
                  x: { duration: 24, repeat: Infinity, ease: 'easeInOut' },
                  y: { duration: 19, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 22, repeat: Infinity, ease: 'easeInOut' },
                }
              : { backgroundColor: COLOR_TWEEN }
          }
        />
      </motion.div>

      {/* Mantém o conjunto sóbrio (preto com detalhes) */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(5,6,9,0.42)' }}
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
