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
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
