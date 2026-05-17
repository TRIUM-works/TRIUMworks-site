'use client';

import { createContext, useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    // Skip Lenis on touch devices — native inertial scroll is smoother
    // and much cheaper on mobile GPUs.
    const isCoarse =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    let rafId = 0;
    const tick = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
