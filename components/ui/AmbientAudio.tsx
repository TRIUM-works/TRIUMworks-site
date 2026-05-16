'use client';

import { useEffect, useRef, useState } from 'react';

export function AmbientAudio() {
  // Sempre começa desativado: o navegador bloqueia autoplay sem gesto do
  // usuário, então não adianta restaurar estado do localStorage.
  const [active, setActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    let cancelled = false;
    if (active) {
      audio.volume = 0;
      audio.play().catch(() => {
        /* autoplay bloqueado: precisa de clique */
      });
      const step = () => {
        if (cancelled) return;
        if (audio.volume < 0.04) {
          audio.volume = Math.min(0.04, audio.volume + 0.003);
          requestAnimationFrame(step);
        }
      };
      step();
    } else {
      const step = () => {
        if (cancelled) return;
        if (audio.volume > 0.01) {
          audio.volume = Math.max(0, audio.volume - 0.01);
          requestAnimationFrame(step);
        } else {
          audio.pause();
        }
      };
      step();
    }
    return () => {
      cancelled = true;
    };
  }, [active]);

  const toggle = () => setActive((v) => !v);

  return (
    <>
      <audio
        ref={audioRef}
        src="/sounds/ambient.mp3"
        loop
        preload="none"
        aria-hidden="true"
      />
      <button
        onClick={toggle}
        data-cursor="hover"
        aria-label={
          active ? 'Desativar áudio ambiente' : 'Ativar áudio ambiente'
        }
        aria-pressed={active}
        className="fixed bottom-8 left-8 z-40 flex h-10 w-10 items-center justify-center transition-colors duration-300"
        style={{ color: active ? '#09C2A7' : '#7A857F' }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M3 12 H6" />
          <path d="M8 8 V16" />
          <path d="M12 5 V19" />
          <path d="M16 9 V15" />
          <path d="M20 11 V13" />
        </svg>
      </button>
    </>
  );
}
