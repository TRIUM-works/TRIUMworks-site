'use client';

import { useEffect, useRef, useState } from 'react';

const ECO_COUNT = 3;

type Mode = 'idle' | 'hover' | 'click' | 'eco';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');

  const cursorRef = useRef<HTMLDivElement>(null);
  const ecoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const ecoTargets = useRef(
    Array.from({ length: ECO_COUNT }, () => ({ x: -100, y: -100 }))
  );
  const ecoCurrent = useRef(
    Array.from({ length: ECO_COUNT }, () => ({ x: -100, y: -100 }))
  );
  // Offsets fixos pra eco: distribuídos em ângulos
  const ecoOffsets = useRef([
    { dx: -22, dy: -16, lerp: 0.08 },
    { dx: 24, dy: 8, lerp: 0.06 },
    { dx: -4, dy: 22, lerp: 0.05 },
  ]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      const el = e.target as HTMLElement | null;
      if (el?.closest<HTMLElement>('[data-cursor-eco]')) {
        setMode('eco');
      } else {
        const cursorAttr = el?.closest<HTMLElement>('[data-cursor]');
        if (cursorAttr) {
          setMode(
            (cursorAttr.dataset.cursor as 'hover' | 'click') || 'hover'
          );
        } else {
          setMode('idle');
        }
      }
    };
    const onDown = () => setMode((m) => (m === 'eco' ? 'eco' : 'click'));
    const onUp = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest('[data-cursor-eco]')) {
        setMode('eco');
        return;
      }
      const cursorAttr = el?.closest<HTMLElement>('[data-cursor]');
      setMode(cursorAttr ? 'hover' : 'idle');
    };

    let frame = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Eco — 3 cursores extras com offsets e lerp diferente
      for (let i = 0; i < ECO_COUNT; i++) {
        const off = ecoOffsets.current[i];
        ecoTargets.current[i].x = target.current.x + off.dx;
        ecoTargets.current[i].y = target.current.y + off.dy;
        ecoCurrent.current[i].x +=
          (ecoTargets.current[i].x - ecoCurrent.current[i].x) * off.lerp;
        ecoCurrent.current[i].y +=
          (ecoTargets.current[i].y - ecoCurrent.current[i].y) * off.lerp;
        const ref = ecoRefs.current[i];
        if (ref) {
          ref.style.transform = `translate3d(${ecoCurrent.current[i].x}px, ${ecoCurrent.current[i].y}px, 0) translate(-50%, -50%)`;
        }
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size =
    mode === 'eco'
      ? 20
      : mode === 'hover'
      ? 40
      : mode === 'click'
      ? 30
      : 18;
  const bg =
    mode === 'hover'
      ? 'rgba(9, 194, 167, 0.18)'
      : mode === 'click'
      ? 'rgba(9, 194, 167, 0.35)'
      : mode === 'eco'
      ? 'rgba(9, 194, 167, 0.10)'
      : 'transparent';

  const ecoVisible = mode === 'eco';

  return (
    <>
      {/* Eco cursors */}
      {Array.from({ length: ECO_COUNT }).map((_, i) => (
        <div
          key={`eco-${i}`}
          ref={(el) => {
            ecoRefs.current[i] = el;
          }}
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[201] rounded-full border border-teal transition-all duration-300"
          style={{
            width: 18 - i * 3,
            height: 18 - i * 3,
            backgroundColor: 'rgba(9, 194, 167, 0.06)',
            opacity: ecoVisible ? 0.6 - i * 0.15 : 0,
            transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)',
            willChange: 'transform, opacity',
            mixBlendMode: 'screen',
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[202] rounded-full border border-teal"
        style={{
          width: size,
          height: size,
          backgroundColor: bg,
          willChange: 'transform',
          transition:
            'width 200ms ease-out, height 200ms ease-out, background-color 200ms ease-out',
        }}
      />
    </>
  );
}
