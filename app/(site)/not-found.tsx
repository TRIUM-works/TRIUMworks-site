'use client';

import { motion } from 'framer-motion';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-carbon px-6">
      <GrainOverlay intensity={0.12} />
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 100 100"
          fill="none"
          stroke="#09C2A7"
          strokeWidth="1"
          strokeLinecap="round"
          aria-hidden="true"
          animate={{ rotate: 360, opacity: [0.25, 0.35, 0.25] }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          <path d="M 50 10 A 40 40 0 1 1 14 65" />
        </motion.svg>
        <div className="mt-8 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
          404
        </div>
        <h1 className="mt-4 max-w-lg font-trickster text-h1 text-cream">
          Este traço ainda não foi desenhado.
        </h1>
        <div className="mt-md">
          <Button as="a" href="/" variant="outline">
            Voltar ao início
          </Button>
        </div>
      </div>
    </div>
  );
}
