'use client';

import { LazyMotion, MotionConfig, domMax } from 'motion/react';

/**
 * Configuração global de animação.
 *
 * LazyMotion + `m` carrega os recursos de animação uma vez, em vez de cada
 * `motion.*` puxar o pacote inteiro. `strict` faz qualquer `motion.*` que
 * escape quebrar no dev, para o ganho não se perder em silêncio.
 * domMax (e não domAnimation) porque o deck de projetos usa `drag`.
 *
 * reducedMotion="user": quem pediu menos movimento no sistema deixa de ver
 * deslocamentos e escalas; fades continuam. Antes cada componente checava
 * isso por conta própria.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
