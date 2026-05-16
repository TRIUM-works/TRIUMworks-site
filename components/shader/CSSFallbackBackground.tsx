'use client';

import { GrainOverlay } from '@/components/ui/GrainOverlay';

export function CSSFallbackBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-carbon">
      <div
        aria-hidden="true"
        className="absolute inset-0 animate-[fallback_18s_ease-in-out_infinite]"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 28% 38%, rgba(13, 59, 102, 0.45) 0%, transparent 55%), radial-gradient(ellipse 55% 40% at 72% 62%, rgba(6, 122, 107, 0.35) 0%, transparent 60%), #111418',
        }}
      />
      <GrainOverlay intensity={0.12} />
      <style jsx>{`
        @keyframes fallback {
          0%,
          100% {
            transform: scale(1) translate(0, 0);
            filter: hue-rotate(0deg);
          }
          50% {
            transform: scale(1.1) translate(-4%, 3%);
            filter: hue-rotate(20deg);
          }
        }
      `}</style>
    </div>
  );
}
