'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    q: 'Vocês integram Inteligência Artificial nos sites?',
    a: 'Sim. Integramos IA de várias formas: chatbots de atendimento 24/7, automação de captura e qualificação de leads, geração de conteúdo, busca semântica em catálogos e fluxos inteligentes de pré-vendas. A IA entra sempre conectada ao objetivo do seu negócio — nunca como enfeite.',
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
      className="snap-section relative flex w-full items-center overflow-hidden bg-carbon py-md"
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="mb-md text-center">
          <div className="mb-4 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
            ✦ Perguntas frequentes
          </div>
          <h2 data-cursor="hover" className="font-trickster text-h1 text-teal">
            FAQ
          </h2>
          <p className="mx-auto mt-6 max-w-xl font-lora text-body-lg text-cream">
            As perguntas que mais ouvimos de quem quer começar um projeto com a gente.
          </p>
        </div>

        <ul className="divide-y divide-blue-deep/40 border-t border-b border-blue-deep/40">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="hover"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-teal"
                >
                  <span
                    className={cn(
                      'font-lora text-body-lg',
                      isOpen ? 'text-teal' : 'text-cream'
                    )}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                    className="shrink-0 font-trickster text-2xl text-teal"
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
                      <p className="pb-5 pr-10 font-lora text-body-md text-stone">
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
