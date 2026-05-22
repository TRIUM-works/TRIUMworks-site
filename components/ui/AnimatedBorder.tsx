'use client';

import { motion } from 'framer-motion';

export function AnimatedBorder({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="absolute left-0 top-0 w-px rounded-full bg-teal/50"
      initial={{ height: '0%' }}
      whileInView={{ height: '100%' }}
      viewport={{ once: true, margin: '-5% 0px' }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay }}
    />
  );
}
