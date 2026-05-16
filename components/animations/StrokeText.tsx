'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  text: string;
  className?: string;
  delay?: number;
  letterStagger?: number;
  letterDuration?: number;
}

export function StrokeText({
  text,
  className,
  delay = 0,
  letterStagger = 0.08,
  letterDuration = 0.6,
}: Props) {
  const letters = Array.from(text);
  return (
    <span className={cn('inline-block', className)} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          aria-hidden="true"
          className="inline-block"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: letterDuration,
            ease: [0.85, 0, 0.15, 1],
            delay: delay + i * letterStagger,
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch === ' ' ? ' ' : ch}
        </motion.span>
      ))}
    </span>
  );
}
