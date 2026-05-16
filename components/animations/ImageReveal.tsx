'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ImageReveal({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{
        duration: 0.8,
        ease: [0.65, 0, 0.35, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
