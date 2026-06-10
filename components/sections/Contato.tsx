'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  useAtmosphere,
  ATMOSPHERES,
} from '@/components/layout/Atmosphere';

const WHATSAPP_URL =
  'https://wa.me/5585981254006?text=' +
  encodeURIComponent(
    'Olá! Vi seu portfólio e gostaria de conversar sobre a criação de um site para o meu negócio.'
  );
const INSTAGRAM_URL = 'https://www.instagram.com/triumworks/';

function WhatsAppIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21 L4.5 16.2 A8.5 8.5 0 1 1 8 19.2 Z" />
      <path d="M8.5 9.5 Q9 11.5 10.5 13 Q12 14.5 14.5 15 L15.5 13.7 L17 14.5 Q16.5 16 15 16.2 Q12 16.5 9 13.5 Q6 10.5 6.3 7.5 Q6.5 6 8 5.5 L8.8 7 Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

function ContactButton({
  href,
  icon,
  label,
  aria,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  aria: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      data-cursor="hover"
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-white/30 px-8 py-5 font-mono uppercase tracking-[0.18em] text-small text-white transition-[transform,border-color,box-shadow] duration-[600ms] ease-artisan hover:scale-[1.03] hover:border-teal hover:shadow-[0_10px_36px_-8px_rgba(9,194,167,0.45)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-left scale-x-0 bg-teal transition-transform duration-[600ms] ease-artisan group-hover:scale-x-100"
      />
      <span className="inline-flex transition-transform duration-[600ms] ease-artisan group-hover:scale-110 group-hover:text-carbon">
        {icon}
      </span>
      <span className="transition-colors duration-[600ms] group-hover:text-carbon">
        {label}
      </span>
    </a>
  );
}

export function Contato() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const { setAtmosphere } = useAtmosphere();

  useEffect(() => {
    if (inView) setAtmosphere(ATMOSPHERES.contato);
  }, [inView, setAtmosphere]);

  return (
    <section
      ref={ref}
      id="contato"
      data-snap-section="contato"
      className="snap-section relative flex h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{ height: '100svh' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 font-mono text-tiny uppercase tracking-[0.3em] text-white/50 terminal-cursor"
        >
          ✦ Vamos conversar
        </motion.div>

        <motion.h2
          data-cursor="hover"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold leading-[0.9] tracking-[-0.02em] text-white"
          style={{ fontSize: 'clamp(48px, 9vw, 132px)' }}
        >
          conta sua <span className="font-lora font-normal italic text-teal">ideia</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-7 max-w-lg font-lora text-body-lg text-white/70"
        >
          Conta o que você quer construir. Respondemos em até 24 horas — direto
          com quem projeta e desenvolve.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7"
        >
          <ContactButton
            href={WHATSAPP_URL}
            icon={<WhatsAppIcon />}
            label="WhatsApp"
            aria="Falar via WhatsApp (abre em nova aba)"
          />
          <ContactButton
            href={INSTAGRAM_URL}
            icon={<InstagramIcon />}
            label="Instagram"
            aria="Ver Instagram (abre em nova aba)"
          />
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
        TRIUM — Volta Redonda, RJ
      </div>
    </section>
  );
}
