'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reseta o scroll pro topo a cada mudança de rota. O Lenis é
  // destruído fora da home (ver SmoothScrollProvider), então o scroll
  // do html é puramente nativo aqui e window.scrollTo funciona limpo.
  // Sem este reset, a posição de scroll da rota anterior é preservada
  // e páginas curtas como /projetos/[slug] aparecem em branco/pretas.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // AnimatePresence removido — em modo "wait" com mode="wait" e key=pathname,
  // a transição estava deixando a página presa em opacity 0 + blur depois
  // de aparecer brevemente (provavelmente exit interrompido por re-render
  // do SmoothScrollProvider quando o Lenis é destruído ao sair da home).
  // Sem transição: navegação direta e confiável. Animações de entrada de
  // cada seção (RevealText, ImageReveal) cobrem a falta de transição.
  return <main id="main-content">{children}</main>;
}
