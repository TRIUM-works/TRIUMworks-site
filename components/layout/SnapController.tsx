'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { LenisContext } from './SmoothScrollProvider';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface SnapAPI {
  current: number;
  count: number;
  goToIndex: (i: number) => void;
  goToId: (id: string) => void;
  next: () => void;
  prev: () => void;
}

const SnapContext = createContext<SnapAPI>({
  current: 0,
  count: 0,
  goToIndex: () => {},
  goToId: () => {},
  next: () => {},
  prev: () => {},
});

export function useSnap() {
  return useContext(SnapContext);
}

const SCROLL_DURATION = 1.2;

export function SnapController({ children }: { children: React.ReactNode }) {
  const lenis = useContext(LenisContext);
  const reduced = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const animatingRef = useRef(false);
  const sectionsRef = useRef<HTMLElement[]>([]);

  const refreshSections = useCallback(() => {
    const list = Array.from(
      document.querySelectorAll<HTMLElement>('[data-snap-section]')
    );
    sectionsRef.current = list;
    setCount(list.length);
  }, []);

  useEffect(() => {
    refreshSections();
    // Re-medir apenas quando o layout muda (resize) e em casos pontuais
    // disparados via evento custom. Observar todo o body com subtree:true
    // fazia o handler rodar centenas de vezes durante as animações iniciais
    // do Framer Motion, travando o carregamento por vários segundos.
    const onLayout = () => refreshSections();
    window.addEventListener('resize', onLayout);
    window.addEventListener('trium:snap-refresh', onLayout);
    return () => {
      window.removeEventListener('resize', onLayout);
      window.removeEventListener('trium:snap-refresh', onLayout);
    };
  }, [refreshSections]);

  const goToIndex = useCallback(
    (i: number) => {
      const sections = sectionsRef.current;
      const target = Math.max(0, Math.min(sections.length - 1, i));
      const el = sections[target];
      if (!el) return;

      animatingRef.current = true;
      setCurrent(target);

      const onDone = () => {
        animatingRef.current = false;
      };

      if (lenis && !reduced) {
        lenis.scrollTo(el, {
          duration: SCROLL_DURATION,
          easing: (t: number) =>
            t < 0.5
              ? 4 * t * t * t
              : 1 - Math.pow(-2 * t + 2, 3) / 2,
          onComplete: onDone,
        });
        setTimeout(onDone, SCROLL_DURATION * 1000 + 100);
      } else {
        el.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start',
        });
        setTimeout(onDone, reduced ? 50 : 800);
      }
    },
    [lenis, reduced]
  );

  const goToId = useCallback(
    (id: string) => {
      const idx = sectionsRef.current.findIndex(
        (el) => el.id === id || el.dataset.snapSection === id
      );
      if (idx >= 0) goToIndex(idx);
    },
    [goToIndex]
  );

  const next = useCallback(() => goToIndex(current + 1), [current, goToIndex]);
  const prev = useCallback(() => goToIndex(current - 1), [current, goToIndex]);

  // Track current section by scroll position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onScroll = () => {
      if (animatingRef.current) return;
      const center = window.scrollY + window.innerHeight / 2;
      const sections = sectionsRef.current;
      for (let i = 0; i < sections.length; i++) {
        const el = sections[i];
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (center >= top && center < bottom) {
          setCurrent(i);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <SnapContext.Provider value={{ current, count, goToIndex, goToId, next, prev }}>
      {children}
    </SnapContext.Provider>
  );
}
