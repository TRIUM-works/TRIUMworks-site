'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const LETTERS = [
  {
    char: 'T',
    path: 'M5 5 H45 M25 5 V55',
  },
  {
    char: 'R',
    path: 'M5 55 V5 H30 Q45 5 45 17 Q45 30 30 30 H5 M30 30 L45 55',
  },
  {
    char: 'I',
    path: 'M5 5 H45 M25 5 V55 M5 55 H45',
  },
  {
    char: 'U',
    path: 'M5 5 V40 Q5 55 25 55 Q45 55 45 40 V5',
  },
  {
    char: 'M',
    path: 'M5 55 V5 L25 35 L45 5 V55',
  },
];

interface Props {
  onComplete?: () => void;
}

export function Loader({ onComplete }: Props) {
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    const duration = reduced ? 600 : 3200;
    const t = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(t);
  }, [reduced]);

  useEffect(() => {
    if (!visible) {
      const t = setTimeout(() => onComplete?.(), 500);
      return () => clearTimeout(t);
    }
  }, [visible, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[150] flex items-center justify-center bg-carbon"
          role="status"
          aria-live="polite"
          aria-label="Carregando TRIUM..."
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <GrainOverlay intensity={0.15} />
          </motion.div>

          <div className="relative z-10 flex items-center gap-4">
            {!reduced ? (
              <svg
                width="320"
                height="80"
                viewBox="0 0 270 60"
                fill="none"
                stroke="#09C2A7"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {LETTERS.map((l, i) => (
                  <motion.path
                    key={l.char}
                    d={l.path}
                    transform={`translate(${i * 52},0)`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: {
                        duration: 0.8,
                        delay: 0.4 + i * 0.18,
                        ease: [0.85, 0, 0.15, 1],
                      },
                      opacity: {
                        duration: 0.2,
                        delay: 0.4 + i * 0.18,
                      },
                    }}
                  />
                ))}
                <motion.text
                  x="265"
                  y="20"
                  fontFamily="serif"
                  fontSize="18"
                  fill="#09C2A7"
                  stroke="none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 1, 0.6, 1],
                    scale: [0.8, 1.1, 1.0, 1.1],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.4,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  ✦
                </motion.text>
              </svg>
            ) : (
              <motion.div
                className="font-trickster text-display text-teal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                TRIUM
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
