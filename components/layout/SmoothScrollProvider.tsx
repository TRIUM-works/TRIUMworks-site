'use client';

import { createContext, useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const reduced = useReducedMotion();
  const rafCb = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    if (reduced) return;

    const instance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    const onScroll = () => ScrollTrigger.update();
    instance.on('scroll', onScroll);

    const tick = (time: number) => {
      instance.raf(time * 1000);
    };
    rafCb.current = tick;

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      instance.off('scroll', onScroll);
      if (rafCb.current) gsap.ticker.remove(rafCb.current);
      instance.destroy();
      setLenis(null);
    };
  }, [reduced]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
