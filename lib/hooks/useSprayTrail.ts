'use client';

import { useCallback, useEffect, useRef, type RefObject } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
  r: number;
}

interface Options {
  // Tempo de vida em frames (~60fps).
  maxAge?: number;
  // Raio inicial dos pontos principais (px).
  baseRadius?: number;
  // Variação do raio com o tempo (px/frame). Negativo = encolhe (rastro afina).
  growth?: number;
  // Número máximo de pontos ativos simultaneamente.
  maxPoints?: number;
  // Quantas partículas espalhadas por movimento do mouse (sensação de pincel).
  particlesPerMove?: number;
}

/**
 * Mantém uma "trilha" de pontos do mouse sobre `targetRef` e a aplica como
 * `mask-image` (vários radial-gradients combinados) ao elemento `paintRef`.
 *
 * Resultado: o paintRef só fica visível nos trechos por onde o mouse passou
 * recentemente, com fade orgânico. Como cada novo movimento adiciona pontos
 * com leve jitter, dá sensação de spray/airbrush e não de linha lisa.
 */
export function useSprayTrail(
  targetRef: RefObject<HTMLElement>,
  paintRef: RefObject<HTMLElement>,
  options: Options = {}
) {
  const {
    maxAge = 160,
    baseRadius = 55,
    growth = -0.15,
    maxPoints = 220,
    particlesPerMove = 7,
  } = options;

  const pointsRef = useRef<Point[]>([]);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // envelhece e descarta
      const alive: Point[] = [];
      for (const p of pointsRef.current) {
        p.age += 1;
        if (p.age < maxAge) alive.push(p);
      }
      pointsRef.current = alive;

      const el = paintRef.current;
      if (el) {
        if (alive.length === 0) {
          el.style.opacity = '0';
        } else {
          let mask = '';
          for (let i = 0; i < alive.length; i++) {
            const p = alive[i];
            const t = 1 - p.age / maxAge;
            // raio cai com o tempo (rastro afina no final); piso pequeno
            const radius = Math.max(2, p.r + p.age * growth);
            // mantém a tinta visível mais tempo e cai rápido no final
            const alpha = Math.pow(t, 0.65);
            if (i > 0) mask += ', ';
            mask += `radial-gradient(circle ${radius.toFixed(1)}px at ${p.x.toFixed(1)}px ${p.y.toFixed(1)}px, rgba(0,0,0,${alpha.toFixed(3)}) 18%, rgba(0,0,0,0) 75%)`;
          }
          el.style.maskImage = mask;
          (el.style as CSSStyleDeclaration & { webkitMaskImage: string }).webkitMaskImage = mask;
          el.style.opacity = '1';
        }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paintRef, maxAge, growth]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = targetRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Cluster de várias partículas espalhadas com ângulo/distância aleatórios
      // → o conjunto não parece um círculo, parece uma "cerda" de pincel.
      for (let i = 0; i < particlesPerMove; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 0.6) * baseRadius * 0.85;
        // Variação grande no tamanho — algumas partículas grandes (corpo),
        // várias pequenas (chuvisco) → contorno irregular.
        const r = baseRadius * (0.18 + Math.pow(Math.random(), 1.8) * 0.85);
        // Pequeno offset na idade — assim a borda do cluster já começa
        // levemente desbotada e cria gradiente natural.
        const ageJitter = Math.floor(Math.random() * 8);
        pointsRef.current.push({
          x: x + Math.cos(angle) * dist,
          y: y + Math.sin(angle) * dist,
          age: ageJitter,
          r,
        });
      }

      if (pointsRef.current.length > maxPoints) {
        pointsRef.current.splice(0, pointsRef.current.length - maxPoints);
      }
    },
    [targetRef, baseRadius, maxPoints, particlesPerMove]
  );

  return { onPointerMove };
}
