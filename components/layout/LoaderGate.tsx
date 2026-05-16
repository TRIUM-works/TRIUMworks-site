'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader } from './Loader';

export function LoaderGate({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <>
      <Loader onComplete={() => setDone(true)} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
