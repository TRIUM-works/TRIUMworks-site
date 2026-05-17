'use client';

import { cn } from '@/lib/utils';

interface Props {
  intensity?: number;
  animated?: boolean;
  className?: string;
}

export const grainSvg = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#n)" opacity="1"/>
  </svg>`
)}`;

export function GrainOverlay({
  intensity = 0.1,
  animated = false,
  className,
}: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        // Escondido em telas pequenas — mix-blend-overlay é caríssimo em GPU
        // mobile e quase invisível em telas pequenas de qualquer jeito.
        'pointer-events-none absolute inset-0 z-[2] mix-blend-overlay hidden md:block',
        animated && 'animate-[grain_8s_steps(6)_infinite]',
        className
      )}
      style={{
        backgroundImage: `url("${grainSvg}")`,
        backgroundSize: '240px 240px',
        opacity: intensity,
      }}
    />
  );
}
