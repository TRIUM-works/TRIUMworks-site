'use client';

import { motion } from 'framer-motion';
import { DrawGraphic } from '@/components/animations/DrawGraphic';

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
      className="group relative inline-flex items-center justify-center gap-3 overflow-hidden border border-teal px-8 py-5 font-mono uppercase tracking-[0.18em] text-small text-cream transition-colors duration-[600ms] ease-artisan hover:text-carbon"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 origin-left scale-x-0 transition-transform duration-[600ms] ease-artisan group-hover:scale-x-100"
        style={{
          background:
            'linear-gradient(135deg, #09C2A7 0%, #067A6B 100%)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 mix-blend-overlay group-hover:opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml;utf8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'240\' height=\'240\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
      {icon}
      <span>{label}</span>
    </a>
  );
}

export function Contato() {
  return (
    <section
      id="contato"
      data-snap-section="contato"
      className="snap-section relative flex w-full items-start overflow-hidden bg-carbon pt-12 pb-0 md:pt-16 md:pb-0"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <DrawGraphic>
          <div className="mb-md">
            <div className="mb-4 font-mono text-tiny uppercase tracking-[0.3em] text-stone">
              ✦ Conversemos
            </div>
            <h2 className="font-trickster text-h1 text-teal">Contato</h2>
            <p className="mx-auto mt-6 max-w-xl font-lora text-body-lg text-cream">
              Conta o que você quer construir. Respondemos em até 24 horas.
            </p>
          </div>
        </DrawGraphic>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{
            duration: 0.8,
            ease: [0.65, 0, 0.35, 1],
          }}
          className="flex flex-col items-center justify-center gap-6 md:flex-row md:gap-md"
        >
          <ContactButton
            href={WHATSAPP_URL}
            icon={<WhatsAppIcon />}
            label="WhatsApp"
            aria="Falar via WhatsApp (abre em nova aba)"
          />
          <span
            aria-hidden="true"
            className="font-trickster text-3xl text-teal/60"
          >
            ✦
          </span>
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
