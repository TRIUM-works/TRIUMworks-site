'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaInstagram, FaArrowRight } from 'react-icons/fa';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="cta-section section-padding" ref={ref}>
      <div className="cta-section__content">
        <div className="cta-section__grid">
          <motion.div
            className="cta-section__left"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <span className="cta-section__label">Vamos conversar</span>
            <h2>
              Pronto para levar seu projeto ao
              <span className="gradient-text"> próximo nível?</span>
            </h2>
            <p className="cta-section__desc">
              Entre em contato e vamos transformar sua ideia em uma
              experiência digital incrível.
            </p>
          </motion.div>

          <motion.div
            className="cta-section__right"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <a
              href="https://wa.me/5585981254006"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--whatsapp"
            >
              <FaWhatsapp size={22} />
              <div>
                <strong>WhatsApp</strong>
                <span>Resposta rápida</span>
              </div>
              <FaArrowRight size={14} className="cta-btn__arrow" />
            </a>

            <a
              href="https://www.instagram.com/triumtech_/"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn--instagram"
            >
              <FaInstagram size={22} />
              <div>
                <strong>Instagram</strong>
                <span>@triumtech_</span>
              </div>
              <FaArrowRight size={14} className="cta-btn__arrow" />
            </a>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .cta-section {
          position: relative;
        }

        .cta-section__content {
          padding: 0 clamp(24px, 5vw, 80px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .cta-section__grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 80px 60px;
          border-radius: var(--radius-xl);
          border: 1px solid rgba(1, 205, 174, 0.08);
          background: linear-gradient(135deg, rgba(1, 205, 174, 0.02) 0%, rgba(5, 5, 5, 0.3) 100%);
          position: relative;
          overflow: hidden;
        }

        .cta-section__grid::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .cta-section__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 20px;
        }

        .cta-section__left h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          margin-bottom: 16px;
        }

        .cta-section__desc {
          color: var(--color-text-secondary);
          font-size: 1rem;
          line-height: 1.7;
          max-width: 400px;
        }

        .cta-section__right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .cta-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          background: var(--color-bg-elevated);
          transition: all var(--transition-base);
          color: var(--color-text);
        }

        .cta-btn:hover {
          transform: translateX(8px);
          border-color: var(--color-border-hover);
        }

        .cta-btn--whatsapp:hover {
          border-color: rgba(37, 211, 102, 0.3);
        }

        .cta-btn--instagram:hover {
          border-color: rgba(220, 39, 67, 0.3);
        }

        .cta-btn--whatsapp { color: #25D366; }
        .cta-btn--instagram { color: #DC2743; }

        .cta-btn div {
          flex: 1;
        }

        .cta-btn strong {
          display: block;
          font-size: 1rem;
          color: var(--color-text);
          margin-bottom: 2px;
        }

        .cta-btn span {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .cta-btn__arrow {
          color: var(--color-text-secondary);
          transition: all 0.3s ease;
        }

        .cta-btn:hover .cta-btn__arrow {
          color: var(--color-primary);
          transform: translateX(4px);
        }

        @media (max-width: 900px) {
          .cta-section__grid {
            grid-template-columns: 1fr;
            gap: 40px;
            padding: 48px 24px;
          }
        }
      `}</style>
    </section>
  );
}
