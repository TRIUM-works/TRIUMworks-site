'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'idle' | 'hover' | 'click';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('idle');

  const cursorRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Só ativa em dispositivos com mouse de verdade (desktop). Touch e
    // dispositivos híbridos usam o cursor nativo do sistema.
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
      const cursorAttr = el?.closest<HTMLElement>('[data-cursor]');
      if (cursorAttr) {
        setMode(
          (cursorAttr.dataset.cursor as 'hover' | 'click') || 'hover'
        );
      } else {
        setMode('idle');
      }
    };
    const onDown = () => setMode('click');
    const onUp = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null;
      const cursorAttr = el?.closest<HTMLElement>('[data-cursor]');
      setMode(cursorAttr ? 'hover' : 'idle');
    };

    let frame = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.22;
      current.current.y += (target.current.y - current.current.y) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;
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

  // Idle: anel fino, sem preenchimento. Hover/click: círculo preenchido em
  // branco com mix-blend-mode: difference — inverte as cores do que está
  // embaixo, dando o efeito de "filtro de cor" sobre textos, imagens e botões.
  const isFilled = mode === 'hover' || mode === 'click';
  const size = mode === 'hover' ? 56 : mode === 'click' ? 44 : 22;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[202] rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: isFilled ? '#FFFFFF' : 'transparent',
        border: isFilled ? 'none' : '1.5px solid #09C2A7',
        mixBlendMode: isFilled ? 'difference' : 'normal',
        willChange: 'transform, width, height',
        transition:
          'width 280ms cubic-bezier(0.65, 0, 0.35, 1), height 280ms cubic-bezier(0.65, 0, 0.35, 1), background-color 200ms ease-out, border 200ms ease-out',
      }}
    />
  );
}
