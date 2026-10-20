'use client';

import { m, type Variants } from 'motion/react';
import { EASE } from '@/lib/easing';

const container: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: { staggerChildren: 0.055, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.95, ease: EASE.out } },
};

type Props = {
  /** Linhas separadas por `|`: "conta sua ideia|a gente constrói". */
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
};

/**
 * Título que entra palavra por palavra, cada uma subindo de dentro de uma
 * máscara. Leitores de tela recebem a frase inteira pelo aria-label; as
 * palavras soltas ficam escondidas deles.
 */
export function SplitTitle({ text, as = 'h2', className, style, delay = 0 }: Props) {
  const Tag = { h1: m.h1, h2: m.h2, h3: m.h3, p: m.p }[as];
  const lines = text.split('|').map((l) => l.trim().split(/\s+/));

  return (
    <Tag
      aria-label={lines.map((l) => l.join(' ')).join(' ')}
      className={className}
      style={style}
      variants={container}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
    >
      {lines.map((line, i) => (
        <span key={i} aria-hidden="true" className="block">
          {line.map((w, j) => (
            // A folga compensada (padding + margem negativa) alarga a máscara
            // sem mexer no layout: sem ela o acento do "ó" e a perna do "g"
            // ficariam cortados pela entrelinha apertada dos títulos.
            <span
              key={j}
              className="-my-[0.14em] inline-block overflow-hidden py-[0.14em] align-top"
            >
              <m.span variants={word} className="inline-block">
                {w}
              </m.span>
              {j < line.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
