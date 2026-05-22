'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'p' | 'span' | 'div' | 'h2' | 'h3';
  once?: boolean;
}

export function RevealText({
  children,
  className,
  delay = 0,
  as = 'p',
  once = true,
}: Props) {
  const MotionTag = motion[as] as typeof motion.p;

  if (typeof children === 'string') {
    const words = children.split(' ');
    return (
      <MotionTag
        className={cn(className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-10% 0px' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block"
            variants={{
              hidden: { y: 14, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.45,
                  ease: [0.33, 1, 0.68, 1],
                  delay: delay + i * 0.035,
                },
              },
            }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
