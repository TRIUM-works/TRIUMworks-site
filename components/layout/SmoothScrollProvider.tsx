'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

let instance: Lenis | null = null;

/**
 * A instância ativa do Lenis, ou null quando o scroll é nativo (touch ou
 * movimento reduzido). Lida na hora do uso, não guardada em state: quem
 * rola a página (SnapController) só precisa dela no momento do scrollTo, e
 * espelhá-la num state custava um render a mais na montagem.
 */
export function getLenis() {
  return instance;
}

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Em touch o scroll inercial nativo é mais suave e bem mais barato na GPU.
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (reduce || coarse) return;

    instance = new Lenis({
      autoRaf: true,
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    return () => {
      instance?.destroy();
      instance = null;
    };
  }, []);

  return <>{children}</>;
}
