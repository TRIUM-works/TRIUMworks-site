'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fundadores } from '@/lib/data/fundadores';
import { GrainOverlay } from '@/components/ui/GrainOverlay';

export function Sobre() {
  return (
    <section
      id="sobre"
      data-snap-section="sobre"
      className="snap-section relative flex w-full flex-col justify-center overflow-hidden bg-carbon pt-24 pb-12 md:pt-24"
      style={{ minHeight: '100dvh' }}
    >
      <GrainOverlay intensity={0.06} />

      {/* Título grande à esquerda */}
      <div className="relative z-10 mb-8 px-6 md:mb-12 md:px-12">
        <div className="mb-3 font-mono text-tiny uppercase tracking-[0.3em] text-stone terminal-cursor">
          朩 Quem somos
        </div>
        <h2
          data-cursor="hover"
          className="font-trickster text-display leading-[0.9] text-teal"
        >
          sobre
        </h2>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-6 md:grid-cols-[1.2fr_1fr] md:gap-16 md:px-12">
        {/* Texto + fundadores */}
        <div>
          <motion.p
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
            className="max-w-xl font-lora text-body-lg text-cream"
          >
            A TRIUM é um estúdio criativo de Volta Redonda, RJ, focado em criar
            sites modernos, rápidos e estratégicos para empresas de todo o
            Brasil. Aqui, você fala diretamente com quem pensa, projeta e
            desenvolve o seu site — sem burocracia, sem distância.
          </motion.p>

          <div className="mt-10 flex flex-wrap items-center gap-8">
            {fundadores.map((f, i) => (
              <motion.div
                key={f.nome}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.15,
                  ease: [0.65, 0, 0.35, 1],
                }}
                className="flex items-center gap-4"
              >
                <div
                  data-cursor="hover"
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-blue-deep"
                  style={{
                    position: 'relative',
                    width: 64,
                    height: 64,
                    background:
                      'radial-gradient(circle at 30% 30%, #0D3B66 0%, #111418 70%)',
                  }}
                >
                  <Image
                    src={f.foto}
                    alt={f.nome}
                    fill
                    sizes="64px"
                    className="object-cover grayscale-[0.3]"
                  />
                </div>
                <div>
                  <h3 className="font-lora text-h3 text-cream">{f.nome}</h3>
                  <div className="mt-0.5 font-mono text-tiny uppercase tracking-[0.2em] text-stone">
                    {f.cargo}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selo giratório */}
        <div className="flex justify-center md:justify-end">
          <RotatingBadge />
        </div>
      </div>
    </section>
  );
}

function RotatingBadge() {
  const ring = 'TRIUM ✦ ESTÚDIO DIGITAL ✦ VOLTA REDONDA, RJ ✦ ';

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      className="relative h-56 w-56 md:h-72 md:w-72"
    >
      {/* Anel de texto girando */}
      <motion.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <path
            id="badge-circle"
            d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
          />
        </defs>
        <text className="font-mono uppercase" fontSize="11" letterSpacing="3" fill="#7A857F">
          <textPath href="#badge-circle" startOffset="0">
            {ring}
          </textPath>
        </text>
      </motion.svg>

      {/* Anéis decorativos */}
      <div className="absolute inset-6 rounded-full border border-blue-deep/50" />
      <div className="absolute inset-10 rounded-full border border-blue-deep/30" />

      {/* Selo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-teal/40 bg-blue-deep/20 backdrop-blur-sm md:h-36 md:w-36">
          <GrainOverlay intensity={0.1} className="rounded-full" />
          <img
            src="/trium-badge-teal.png"
            alt=""
            aria-hidden="true"
            className="w-16 opacity-90 md:w-20"
          />
        </div>
      </div>
    </motion.div>
  );
}
