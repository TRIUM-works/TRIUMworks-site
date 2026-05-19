'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { fundadores } from '@/lib/data/fundadores';
import { DrawGraphic } from '@/components/animations/DrawGraphic';

export function Sobre() {
  return (
    <section
      id="sobre"
      data-snap-section="sobre"
      className="snap-section relative flex h-screen w-full items-center overflow-hidden bg-carbon"
    >
      <div className="mx-auto max-w-3xl px-6">
        <DrawGraphic>
          <div className="mb-md">
            <div className="mb-4 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
              朩 Quem somos
            </div>
            <h2 data-cursor="hover" className="font-trickster text-h1 text-teal">
              Sobre nós
            </h2>
            <p className="mt-6 max-w-2xl font-lora text-body-lg text-cream">
              A TRIUM é um estúdio criativo de Volta Redonda, RJ, focado em
              criar sites modernos, rápidos e estratégicos para empresas de
              todo o Brasil. Aqui, você fala diretamente com quem pensa,
              projeta e desenvolve o seu site — sem burocracia, sem
              distância.
            </p>
          </div>
        </DrawGraphic>

        <div aria-hidden="true" className="my-md flex justify-center">
          <svg
            width="120"
            height="24"
            viewBox="0 0 120 24"
            fill="none"
            stroke="#09C2A7"
            strokeWidth="1"
            strokeLinecap="round"
          >
            <motion.path
              d="M5 12 Q 22 2, 35 12 T 65 12 T 95 12 T 118 12"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            />
          </svg>
        </div>

        <div className="grid gap-md md:grid-cols-2 md:gap-12">
          {fundadores.map((f, i) => (
            <motion.div
              key={f.nome}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                duration: 0.8,
                delay: i * 0.2,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="flex items-center gap-5"
            >
              <div
                data-cursor="hover"
                className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-blue-deep"
                style={{
                  // position/size inline — evita que a Image fill desça pro
                  // body inteiro no primeiro paint do dev server, antes do
                  // Tailwind aplicar h-20 w-20 relative.
                  position: 'relative',
                  width: 80,
                  height: 80,
                  background:
                    'radial-gradient(circle at 30% 30%, #0D3B66 0%, #111418 70%)',
                }}
              >
                <Image
                  src={f.foto}
                  alt={f.nome}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      'url("data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                  }}
                />
              </div>
              <div>
                <h3 className="font-lora text-h3 text-cream">{f.nome}</h3>
                <div className="mt-1 font-mono uppercase tracking-[0.2em] text-tiny text-stone">
                  {f.cargo}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
