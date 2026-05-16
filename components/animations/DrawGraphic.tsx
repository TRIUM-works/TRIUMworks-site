'use client';

import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function DrawGraphic({
  children,
  delay = 0,
  duration = 0.6,
  className,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration,
        ease: [0.85, 0, 0.15, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}
