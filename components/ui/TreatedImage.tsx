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
      className={cn('relative overflow-hidden', className)}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      style={{
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
