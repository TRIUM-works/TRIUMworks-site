'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMobile } from '@/lib/hooks/useMobile';
import { useSnap } from '@/components/layout/SnapController';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'contato', label: 'Contato' },
];

export function Header() {
  const isMobile = useMobile();
  const snap = useSnap();
  const [active, setActive] = useState('inicio');
  const [open, setOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const burstTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Progresso de saída do Hero (0 = título ainda visível, 1 = título já saiu)
  const [heroExit, setHeroExit] = useState(0);
  // Largura da scrollbar — usada para alinhar o badge fixo ao mesmo eixo
  // visual dos elementos absolute dentro de containers w-full (que ficam
  // dentro da área do body, sem a scrollbar).
  const [scrollbarW, setScrollbarW] = useState(0);
  // useMobile retorna false no SSR e pode virar true no client. Sem este
  // gate, o servidor renderiza DesktopMenu e o client tenta hidratar
  // MobileMenu → hydration mismatch → árvore inteira pode ser descartada,
  // que combinado com fast-refresh stale produz o erro ao recarregar.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    let lastT = -1;
    const compute = () => {
      const vh = window.innerHeight;
      const start = vh * 0.55;
      const end = vh * 0.9;
      const t = Math.max(0, Math.min(1, (window.scrollY - start) / (end - start)));
      // Evita setState desnecessário (a cada scroll, mesmo sem mudança real
      // de progresso, dispararia re-render do Header inteiro).
      if (Math.abs(t - lastT) > 0.005) {
        lastT = t;
        setHeroExit(t);
      }
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        compute();
      });
    };
    const measureScrollbar = () => {
      setScrollbarW(window.innerWidth - document.documentElement.clientWidth);
    };
    const onResize = () => {
      compute();
      measureScrollbar();
    };
    compute();
    measureScrollbar();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-snap-section]')
    );
    const el = sections[snap.current];
    if (!el) return;
    // Achar primeiro ancestral com id conhecido OU usar id da própria seção
    const knownIds = SECTIONS.map((s) => s.id);
    if (knownIds.includes(el.id)) {
      setActive(el.id);
    } else {
      // Se está num projeto individual (entre o carrossel e a próxima seção
      // conhecida — Sobre), marcar "projetos".
      const projetosIdx = sections.findIndex((s) => s.id === 'projetos');
      const sobreIdx = sections.findIndex((s) => s.id === 'sobre');
      if (
        projetosIdx >= 0 &&
        sobreIdx >= 0 &&
        snap.current > projetosIdx &&
        snap.current < sobreIdx
      ) {
        setActive('projetos');
      }
    }
  }, [snap.current]);

  const goTo = (id: string) => {
    snap.goToId(id);
    setOpen(false);
  };

  const handleLogo = () => {
    setBurstKey((k) => k + 1);
    if (burstTimerRef.current) clearTimeout(burstTimerRef.current);
    burstTimerRef.current = setTimeout(() => setBurstKey(0), 3500);
  };

  return (
    <>
      {/* Badge TRIUM no topo central — aparece quando o título grande do Hero
          está saindo de cena; fica escondido enquanto ele ainda é visível. */}
      <motion.button
        onClick={() => {
          handleLogo();
          snap.goToId('inicio');
        }}
        data-cursor="hover"
        aria-label="TRIUM — Voltar ao início"
        style={{
          opacity: heroExit,
          pointerEvents: heroExit > 0.5 ? 'auto' : 'none',
          marginLeft: `${-scrollbarW / 2 + 8}px`,
        }}
        animate={{ x: '-50%', y: heroExit > 0 ? 0 : -8 }}
        transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        className="fixed left-1/2 top-4 z-50 rounded-full border border-blue-deep/60 bg-carbon/75 px-5 py-1.5 font-trickster text-[22px] leading-none text-cream shadow-[0_4px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
      >
        TRIUM
      </motion.button>

      {burstKey > 0 && <EasterEggBurst key={burstKey} />}

      {/* Só decide desktop vs mobile depois de mountar no client. No SSR
          ambos não renderizam (nada de mismatch); na hidratação React faz
          uma única passada server-vs-client compatível, depois o efeito
          dispara e a UI correta aparece. */}
      {mounted &&
        (!isMobile ? (
          <DesktopMenu active={active} onNavigate={goTo} />
        ) : (
          <MobileMenu
            open={open}
            setOpen={setOpen}
            active={active}
            onNavigate={goTo}
          />
        ))}
    </>
  );
}

function DesktopMenu({
  active,
  onNavigate,
}: {
  active: string;
  onNavigate: (id: string) => void;
}) {
  // Progresso baseado na posição da seção ativa na lista, não no scroll total.
  // Assim a linha cresce em "passos" alinhados com as labels do menu.
  const activeIdx = Math.max(0, SECTIONS.findIndex((s) => s.id === active));
  const sectionProgress = activeIdx / Math.max(1, SECTIONS.length - 1);

  return (
    <aside
      aria-label="Navegação principal"
      className="fixed right-0 top-0 z-40 flex h-screen w-20 flex-col items-center"
      style={{ height: '100dvh' }}
    >
      {/* Indicador disponibilidade — limitado em altura para não invadir o
          centro do menu em viewports curtos. Em telas baixas (<800px efetivos)
          a label de texto some, sobra só o dot pulsante. */}
      <div className="flex shrink-0 flex-col items-center gap-2 pt-8">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal" />
        </span>
        <span
          className="font-mono uppercase tracking-[0.25em] text-stone"
          style={{
            fontSize: '9px',
            writingMode: 'vertical-rl',
            maxHeight: 'calc(50dvh - 220px)',
            overflow: 'hidden',
          }}
        >
          Aceitando novos projetos
        </span>
      </div>

      {/* Menu — agora ocupando o centro vertical do aside */}
      <ul className="flex flex-1 flex-col items-center justify-center gap-6">
        {SECTIONS.map((s) => {
          const isActive = active === s.id;
          return (
            <li key={s.id} className="relative flex items-center gap-2">
              {isActive && (
                <motion.span
                  layoutId="nav-marker"
                  className="absolute -left-4 text-teal"
                  style={{ fontSize: '10px' }}
                >
                  ✦
                </motion.span>
              )}
              <button
                onClick={() => onNavigate(s.id)}
                data-cursor="hover"
                className={cn(
                  'group font-mono uppercase tracking-[0.15em] transition-colors duration-300',
                  isActive ? 'text-teal' : 'text-stone hover:text-cream'
                )}
                style={{
                  fontSize: '11px',
                  writingMode: 'vertical-rl',
                }}
              >
                {s.label}
                <span className="block h-px w-0 bg-teal transition-all duration-500 group-hover:w-full" />
              </button>
            </li>
          );
        })}
      </ul>

      {/* Barra de progresso — agora no rodapé do aside */}
      <div className="flex shrink-0 items-center justify-center pb-8">
        <svg
          aria-hidden="true"
          className="h-[22vh] max-h-[180px] w-[1px]"
          viewBox="0 0 1 100"
          preserveAspectRatio="none"
        >
          <line x1="0.5" y1="0" x2="0.5" y2="100" stroke="#0D3B66" strokeWidth="1" />
          <motion.line
            x1="0.5"
            y1="0"
            x2="0.5"
            stroke="#09C2A7"
            strokeWidth="1"
            initial={false}
            animate={{ y2: sectionProgress * 100 }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
      </div>
    </aside>
  );
}

function MobileMenu({
  open,
  setOpen,
  active,
  onNavigate,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  active: string;
  onNavigate: (id: string) => void;
}) {
  return (
    <>
      <header
        className={cn(
          'fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-end px-6 backdrop-blur-md',
          'bg-carbon/60 border-b border-blue-deep/40'
        )}
      >
        <button
          onClick={() => setOpen(!open)}
          data-cursor="hover"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex h-10 w-10 flex-col items-end justify-center gap-1.5"
        >
          <motion.span
            className="block h-px bg-teal"
            animate={{
              width: open ? 22 : 22,
              rotate: open ? 45 : 0,
              y: open ? 4 : 0,
            }}
          />
          <motion.span
            className="block h-px bg-teal"
            animate={{
              width: open ? 22 : 14,
              rotate: open ? -45 : 0,
              y: open ? -3 : 0,
            }}
          />
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="fixed right-0 top-0 z-30 flex h-screen w-4/5 flex-col justify-center bg-carbon px-10 pt-20"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                  mixBlendMode: 'overlay',
                }}
              />
            </div>
            <ul className="relative z-10 flex flex-col gap-8">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.6,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                >
                  <button
                    onClick={() => onNavigate(s.id)}
                    data-cursor="hover"
                    className={cn(
                      'font-lora text-h2',
                      active === s.id ? 'text-teal' : 'text-cream'
                    )}
                  >
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function EasterEggBurst() {
  const symbols = ['✦', '〜', '朩'];
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    char: symbols[i % symbols.length],
    angle: (Math.PI * 2 * i) / 14 + Math.random() * 0.5,
    dist: 140 + Math.random() * 180,
    rot: (Math.random() - 0.5) * 720,
    size: 16 + Math.random() * 22,
  }));

  return (
    <div className="pointer-events-none fixed left-1/2 top-8 z-50 -translate-x-1/2">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute font-trickster text-teal"
          style={{ fontSize: p.size }}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: [0, Math.cos(p.angle) * p.dist, 0],
            y: [
              0,
              Math.sin(p.angle) * p.dist + 40,
              0,
            ],
            opacity: [0, 0.9, 0],
            rotate: [0, p.rot, 0],
          }}
          transition={{ duration: 3, ease: [0.65, 0, 0.35, 1] }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}
