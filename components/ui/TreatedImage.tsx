'use client';

import Image from 'next/image';
import { useState } from 'react';
import { GrainOverlay } from './GrainOverlay';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  treated?: boolean;
}

export function TreatedImage({
  src,
  alt,
  width = 1200,
  height = 750,
  className,
  priority,
  fill,
  treated = true,
}: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-cursor="hover"
      className={cn('relative overflow-hidden', className)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
        // position: relative inline garante que o <Image fill /> sempre tenha
        // um ancestral posicionado, MESMO antes do Tailwind carregar em dev
        // (evita a imagem "vazar" pro body inteiro no primeiro paint).
        position: 'relative',
        boxShadow: 'inset 0 0 80px rgba(17,20,24,0.6)',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        className={cn(
          'h-full w-full object-cover transition-all duration-[600ms] ease-artisan',
          treated && !hovered && 'grayscale-[0.5]'
        )}
        style={{
          // maxWidth/height inline impede que imagens com width=2000
          // (HTML attribute do next/image) rendam no tamanho intrínseco
          // antes do CSS aplicar `h-full w-full`. Inline ganha de qualquer
          // stylesheet, então funciona no primeiro paint do dev server.
          maxWidth: '100%',
          height: fill ? undefined : 'auto',
          filter: treated && !hovered ? 'grayscale(0.5) hue-rotate(140deg)' : 'none',
        }}
      />
      {treated && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-multiply"
          style={{ backgroundColor: '#0D3B66', opacity: 0.08 }}
        />
      )}
      <GrainOverlay intensity={0.06} />
    </div>
  );
}
