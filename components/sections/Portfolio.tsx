'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { projetos, type Projeto } from '@/lib/data/projetos';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { cn } from '@/lib/utils';

// Posição visual de cada coluna. O quadro do meio sobe (raised) e fica
// POR CIMA da palavra "portfolio"; os laterais ficam ATRÁS dela, então o
// texto invade o topo deles — o efeito de sobreposição que o cliente pediiu.
interface Slot {
  raised: boolean;
  z: number; // z do quadro relativo ao texto (texto = z-20)
}

const SLOTS: Slot[] = [
  { raised: false, z: 10 }, // esquerda — atrás do texto
  { raised: true, z: 30 }, // meio — na frente do texto, elevado
  { raised: false, z: 10 }, // direita — atrás do texto
];

export function Portfolio() {
  const router = useRouter();

  return (
    <section
      id="projetos"
      data-snap-section="projetos"
      className="snap-section relative flex w-full flex-col overflow-hidden bg-carbon"
      style={{ minHeight: '100dvh' }}
    >
      <GrainOverlay intensity={0.08} />

      {/* Cabeçalho */}
      <div className="relative z-30 flex shrink-0 items-end justify-between px-6 pt-24 md:px-12 md:pt-24">
        <div>
          <div className="mb-2 font-mono text-tiny uppercase tracking-[0.3em] text-stone terminal-cursor">
            ✦ Portfolio
          </div>
          <h2
            data-cursor="hover"
            className="font-trickster text-h2 leading-none text-teal"
          >
            Projetos selecionados
          </h2>
        </div>
        <div className="hidden max-w-[220px] text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-stone md:block">
          Três trabalhos, cada um pensado sob medida — clique para explorar
        </div>
      </div>

      {/* Palco dos quadros + palavra sobreposta */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 md:px-12">
        {/* Palavra gigante POR CIMA dos quadros (z-40 > z dos cards), na parte
            de baixo deles — assim lê-se "portfolio" cruzando os cartões. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-40 select-none whitespace-nowrap font-trickster leading-none text-cream"
          style={{
            fontSize: 'clamp(64px, 15vw, 230px)',
            textShadow: '0 12px 60px rgba(0,0,0,0.6)',
            transform: 'translate(-50%, -18%)',
          }}
        >
          portfolio
        </span>

        {/* Trilho dos quadros */}
        <div className="relative flex w-full max-w-[1100px] items-center justify-center gap-2 sm:gap-5 md:gap-8">
          {projetos.slice(0, 3).map((projeto, i) => (
            <Frame
              key={projeto.slug}
              projeto={projeto}
              index={i}
              slot={SLOTS[i] ?? SLOTS[0]}
              onHover={() => router.prefetch(`/projetos/${projeto.slug}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Frame({
  projeto,
  index,
  slot,
  onHover,
}: {
  projeto: Projeto;
  index: number;
  slot: Slot;
  onHover: () => void;
}) {
  const img = projeto.imagemCard ?? projeto.imagemPrincipal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15% 0px' }}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.12,
        ease: [0.65, 0, 0.35, 1],
      }}
      className="relative min-w-0 flex-1 max-w-[300px]"
      style={{ zIndex: slot.z }}
    >
      {/* Wrapper dedicado ao deslocamento "elevado" — transform próprio para
          não colidir com o `y` animado do motion.div pai nem com o translate
          de hover do Link. */}
      <div
        className={cn(
          'transition-transform duration-[600ms] ease-artisan',
          slot.raised ? '-translate-y-6 md:-translate-y-16' : 'translate-y-0'
        )}
      >
        <Link
          href={`/projetos/${projeto.slug}`}
          onPointerEnter={onHover}
          data-cursor="hover"
          aria-label={`Abrir projeto ${projeto.titulo}`}
          className={cn(
            'group relative block w-full overflow-hidden border border-blue-deep/70 bg-blue-deep/20 shadow-[0_24px_70px_rgba(0,0,0,0.55)] transition-[transform,border-color,box-shadow] duration-[600ms] ease-artisan',
            'hover:-translate-y-2 hover:border-teal hover:shadow-[0_30px_90px_rgba(9,194,167,0.22)]',
            // Mais alto no mobile (10/17) e proporção de cartaz no desktop (30/44).
            'aspect-[10/17] md:aspect-[30/44]'
          )}
        >
        <Image
          src={img}
          alt={projeto.titulo}
          fill
          sizes="(min-width: 768px) 300px, 33vw"
          className="object-cover transition-[transform,filter] duration-[800ms] ease-artisan grayscale-[0.35] group-hover:scale-[1.05] group-hover:grayscale-0"
        />

        {/* Véu para legibilidade + escurecimento no topo (onde o texto invade) */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(13,20,35,0.55) 0%, rgba(13,20,35,0.05) 35%, rgba(13,20,35,0.05) 55%, rgba(13,20,35,0.92) 100%)',
          }}
        />

        <GrainOverlay intensity={0.12} />

        {/* Marcas de mira nos cantos — detalhe editorial */}
        <Crosshair className="left-2 top-2" />
        <Crosshair className="right-2 top-2" />

        {/* Número */}
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 z-10 font-mono text-tiny tracking-[0.2em] text-cream/70"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Legenda inferior */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3 md:p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-teal">
            {projeto.categoria} · {projeto.ano}
          </div>
          <div className="mt-1 flex items-end justify-between gap-2">
            <h3 className="font-trickster text-lg leading-none text-cream md:text-2xl">
              {projeto.titulo}
            </h3>
            <span
              aria-hidden="true"
              className="mb-0.5 shrink-0 text-teal opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:opacity-100"
            >
              ↗
            </span>
          </div>
          {/* sublinhado que cresce no hover */}
          <span className="mt-2 block h-px w-0 bg-teal transition-[width] duration-[600ms] ease-artisan group-hover:w-full" />
        </div>
        </Link>
      </div>
    </motion.div>
  );
}

function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="#E7E2D6"
      strokeWidth="1"
      strokeOpacity="0.5"
      className={cn('pointer-events-none absolute z-10', className)}
    >
      <path d="M7 1 V13 M1 7 H13" />
    </svg>
  );
}
