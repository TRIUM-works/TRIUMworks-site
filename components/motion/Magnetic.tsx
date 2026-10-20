'use client';

import { useRef } from 'react';
import { m, useMotionValue, useSpring } from 'motion/react';

type Props = {
  children: React.ReactNode;
  /** Fração da distância até o ponteiro que o elemento percorre. */
  strength?: number;
  className?: string;
};

/**
 * O próprio elemento segue o mouse alguns pixels, e volta ao soltar.
 * Soma com o `data-cursor-magnetic` do CustomCursor: o cursor ancora no
 * centro e o botão vem ao encontro dele. Só reage a mouse; toque ignora.
 */
export function Magnetic({ children, strength = 0.25, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const spring = { stiffness: 220, damping: 18, mass: 0.4 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  return (
    <m.div
      ref={ref}
      className={className ?? 'inline-block'}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </m.div>
  );
}
