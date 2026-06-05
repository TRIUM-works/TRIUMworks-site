'use client';

import { motion } from 'framer-motion';
import { GrainOverlay } from '@/components/ui/GrainOverlay';

const WHATSAPP_URL =
  'https://wa.me/5585981254006?text=' +
  encodeURIComponent(
    'Olá! Vi seu portfólio e gostaria de conversar sobre a criação de um site para o meu negócio.'
  );
const INSTAGRAM_URL = 'https://www.instagram.com/triumtech_/';

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
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-teal px-8 py-5 font-mono uppercase tracking-[0.18em] text-small text-cream transition-[transform,letter-spacing,box-shadow,border-color] duration-[600ms] ease-artisan hover:scale-[1.03] hover:tracking-[0.2em] hover:border-teal-light hover:shadow-[0_10px_36px_-8px_rgba(9,194,167,0.45)]"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-[600ms] ease-artisan group-hover:scale-x-100"
        style={{
          background: 'linear-gradient(135deg, #09C2A7 0%, #067A6B 100%)',
        }}
      />
      <span
        aria-hidden="true"
        className="inline-flex transition-transform duration-[600ms] ease-artisan group-hover:scale-110 group-hover:-translate-x-0.5"
      >
        {icon}
      </span>
      <span className="transition-transform duration-[600ms] ease-artisan group-hover:translate-x-0.5">
        {label}
      </span>
    </a>
  );
}

export function Contato() {
  return (
    <section
      id="contato"
      data-snap-section="contato"
      className="snap-section relative flex w-full flex-col justify-center overflow-hidden bg-carbon pt-24 pb-16"
      style={{ minHeight: '100dvh' }}
    >
      <GrainOverlay intensity={0.08} />

      {/* Badge decorativo */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        <img
          src="/trium-badge-teal.png"
          alt=""
          aria-hidden="true"
          className="w-72 opacity-[0.06] md:w-[28rem]"
        />
      </div>

      <div className="relative z-10 mx-auto mt-16 flex w-full max-w-3xl flex-col items-center px-6 text-center md:px-12">
        <div className="mb-3 font-mono text-tiny uppercase tracking-[0.3em] text-stone terminal-cursor">
          ✦ Conversemos
        </div>

        <motion.h2
          data-cursor="hover"
          initial={{ y: 28, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          className="font-trickster text-display leading-[0.92] text-cream"
        >
          vamos <span className="text-teal">conversar</span>
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.65, 0, 0.35, 1] }}
          className="mt-6 max-w-xl font-lora text-body-lg text-stone"
        >
          Conta o que você quer construir. Respondemos em até 24 horas — direto
          com quem projeta e desenvolve.
        </motion.p>

        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
          className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:gap-8"
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
    </section>
  );
}
