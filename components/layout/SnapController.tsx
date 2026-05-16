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
const WHEEL_THRESHOLD = 18;
const TOUCH_THRESHOLD = 50;

export function SnapController({ children }: { children: React.ReactNode }) {
  const lenis = useContext(LenisContext);
  const reduced = useReducedMotion();

  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const animatingRef = useRef(false);
  const lastDirRef = useRef(0);
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
    const obs = new MutationObserver(refreshSections);
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
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

  // Wheel-driven snap — só intercepta para sair do Hero (index 0) descendo
  useEffect(() => {
    if (reduced) return;
    let wheelAccum = 0;
    let wheelTimer: ReturnType<typeof setTimeout> | null = null;
    const onWheel = (e: WheelEvent) => {
      if (animatingRef.current) {
        e.preventDefault();
        return;
      }
      // Permitir scroll natural se elemento marcado com data-allow-scroll
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-allow-scroll]')) return;

      if (current !== 0 || e.deltaY <= 0) return;

      wheelAccum += e.deltaY;
      if (wheelAccum > WHEEL_THRESHOLD) {
        wheelAccum = 0;
        lastDirRef.current = 1;
        goToIndex(1);
        e.preventDefault();
      }
      if (wheelTimer) clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => {
        wheelAccum = 0;
      }, 220);
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelTimer) clearTimeout(wheelTimer);
    };
  }, [current, goToIndex, reduced]);

  // Touch swipe — mesma restrição (só Hero → Projetos)
  useEffect(() => {
    if (reduced) return;
    let startY = 0;
    let active = false;

    const onStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      if (current !== 0) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-allow-scroll]')) return;
      active = true;
      startY = e.touches[0].clientY;
    };
    const onEnd = (e: TouchEvent) => {
      if (!active) return;
      const endY = e.changedTouches[0].clientY;
      const dy = startY - endY;
      if (dy > TOUCH_THRESHOLD && !animatingRef.current && current === 0) {
        goToIndex(1);
      }
      active = false;
    };
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [current, goToIndex, reduced]);

  // Keyboard — apenas Hero → Projetos via PageDown/ArrowDown intercepta;
  // demais teclas seguem o comportamento natural do navegador/Lenis.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (animatingRef.current) return;
      if (current === 0 && ['PageDown', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        goToIndex(1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, goToIndex]);

  return (
    <SnapContext.Provider value={{ current, count, goToIndex, goToId, next, prev }}>
      {children}
    </SnapContext.Provider>
  );
}
