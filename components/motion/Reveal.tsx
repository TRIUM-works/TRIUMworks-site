'use client';

import { m } from 'motion/react';
import { EASE } from '@/lib/easing';

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Quanto o bloco sobe ao entrar, em px. */
  y?: number;
  /** Fração do bloco que precisa estar na tela para disparar. */
  amount?: number;
};

/** Aparece subindo de leve ao entrar na tela, uma vez só. */
export function Reveal({ children, className, delay = 0, y = 22, amount = 0.3 }: Props) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE.out }}
    >
      {children}
    </m.div>
  );
}
