'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useSnap } from '@/components/layout/SnapController';
import { useMobile } from '@/lib/hooks/useMobile';

// Seta "desenhada" — linha vertical com leve curva (Q) e chevron irregular.
function SketchArrowUp({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* haste levemente ondulada */}
      <path d="M12 21 Q 11.4 12 12.2 3" />
      {/* chevron um pouco irregular */}
      <path d="M5.5 9 Q 8.5 6 12 3 Q 15.5 6 18.5 9" />
    </svg>
  );
}

export function BackToTop() {
  const snap = useSnap();
  const isMobile = useMobile();
  // Não aparece no Hero (página 0)
  const visible = snap.current > 0;

  const goTop = () => snap.goToIndex(0);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={goTop}
          aria-label="Voltar ao topo"
          data-cursor="hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
          className={
            isMobile
              ? // Mobile: só seta, canto inferior direito, respirando
                'group fixed bottom-6 right-6 z-[45] flex h-11 w-11 items-center justify-center text-teal'
              : // Desktop: seta + texto
                'group fixed bottom-8 right-[110px] z-[45] flex flex-col items-center gap-1.5 text-teal transition-all duration-300 hover:-translate-y-0.5'
          }
        >
          {isMobile ? (
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="block"
            >
              <SketchArrowUp size={26} />
            </motion.span>
          ) : (
            <>
              <span className="transition-transform duration-300 group-hover:-translate-y-0.5">
                <SketchArrowUp size={22} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone group-hover:text-teal">
                Voltar ao topo
              </span>
            </>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
