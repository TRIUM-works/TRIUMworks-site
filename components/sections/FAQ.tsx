'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { cn } from '@/lib/utils';

interface QA {
  q: string;
  a: string;
}

// Mesmo conteúdo do FAQPage schema em layout.tsx — Google e IAs cruzam
// schema + texto visível; manter pareado é o que sinaliza confiança.
const FAQS: QA[] = [
  {
    q: 'Onde fica a TRIUM e vocês atendem fora de Volta Redonda?',
    a: 'A TRIUM é um estúdio de tecnologia baseado em Volta Redonda, RJ. Atendemos clientes de toda a região Sul Fluminense — Barra Mansa, Resende, Barra do Piraí — e de todo o Brasil de forma remota. Você fala direto com quem projeta e desenvolve o seu site.',
  },
  {
    q: 'Que tipos de site a TRIUM cria?',
    a: 'Sites institucionais, landing pages de alta conversão, e-commerces, marketplaces multi-vendedor e plataformas web sob medida. Tudo feito com tecnologias modernas (Next.js, React, Supabase) e foco em performance, SEO e design premium.',
  },
  {
    q: 'Quanto tempo demora para entregar um site?',
    a: 'Depende do escopo. Landing pages costumam ficar prontas em 2 a 3 semanas. Sites institucionais completos levam de 3 a 6 semanas. E-commerces e plataformas com IA têm cronograma definido junto com você após o briefing.',
  },
  {
    q: 'Como funciona o orçamento?',
    a: 'É só mandar uma mensagem no WhatsApp contando o que você quer construir. Respondemos em até 24 horas com uma proposta personalizada. Sem intermediários, sem burocracia.',
  },
  {
    q: 'A TRIUM cuida do site depois que ele fica no ar?',
    a: 'Sim. Oferecemos planos de manutenção contínua, atualizações de conteúdo, monitoramento de performance e otimização de SEO para garantir que o site continue rápido, seguro e bem posicionado no Google.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      data-snap-section="faq"
      className="snap-section relative flex w-full flex-col justify-center overflow-hidden bg-carbon py-24"
      style={{ minHeight: '100dvh' }}
    >
      <GrainOverlay intensity={0.06} />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-12">
        {/* Cabeçalho */}
        <div className="mb-10 flex items-end justify-between gap-6 md:mb-14">
          <div>
            <div className="mb-2 font-mono text-tiny uppercase tracking-[0.3em] text-stone terminal-cursor">
              ✦ Perguntas frequentes
            </div>
            <h2
              data-cursor="hover"
              className="font-trickster text-h1 leading-none text-teal"
            >
              FAQ
            </h2>
          </div>
          <p className="hidden max-w-xs text-right font-lora text-body text-stone md:block">
            As perguntas que mais ouvimos de quem quer começar um projeto com a
            gente.
          </p>
        </div>

        {/* Lista numerada */}
        <ul className="border-t border-blue-deep/40">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-blue-deep/40">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="hover"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-center gap-4 py-5 text-left md:gap-8 md:py-7"
                >
                  <span
                    className={cn(
                      'shrink-0 font-mono text-tiny tracking-[0.2em] transition-colors',
                      isOpen ? 'text-teal' : 'text-stone group-hover:text-cream'
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={cn(
                      'flex-1 font-trickster text-xl leading-tight transition-colors md:text-3xl',
                      isOpen ? 'text-teal' : 'text-cream group-hover:text-teal'
                    )}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                    className="shrink-0 font-trickster text-2xl text-teal md:text-3xl"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-10 pr-10 font-lora text-body-md text-stone md:pl-16">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
