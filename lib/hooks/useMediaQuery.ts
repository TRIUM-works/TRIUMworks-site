'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Lê uma media query e re-renderiza quando ela muda.
 *
 * useSyncExternalStore em vez de useState + useEffect: a media query é um
 * estado externo ao React, e copiá-la para um state dentro de um efeito
 * causava um render extra a cada montagem (a regra set-state-in-effect do
 * React 19 acusa isso). No servidor devolve `false`, como antes.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
