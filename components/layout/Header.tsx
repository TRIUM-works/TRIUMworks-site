'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useSnap } from '@/components/layout/SnapController';

const SECTIONS = [
  { id: 'projetos', label: 'Projetos' },
  { id: 'contato', label: 'Contato' },
];

export function Header() {
  const snap = useSnap();
  const router = useRouter();
  const pathname = usePathname();

  const goSection = (id: string) => {
    if (pathname === '/') snap.goToId(id);
    else router.push(`/#${id}`);
  };

  return (
    <>
      {/* Scrim sutil para contraste do menu sobre o fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-black/35 to-transparent"
      />

      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-center gap-14 py-7 md:gap-20">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => goSection(s.id)}
              data-cursor="hover"
              className="group font-mono text-[11px] uppercase tracking-[0.25em] text-white/75 transition-colors hover:text-white md:text-xs"
            >
              {s.label}
              <span className="mt-1 block h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
            </button>
          ))}
        </nav>
      </header>
    </>
  );
}
