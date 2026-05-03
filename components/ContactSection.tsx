'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="cta-section section-padding" ref={ref}>
      <div className="cta-section__inner">
        <motion.div
          className="cta-section__text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          className="cta-icons"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="https://wa.me/5585981254006"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-icons__link cta-icons__link--whatsapp"
            aria-label="WhatsApp"
          >
            <span className="cta-icons__text">WhatsApp</span>
            <FaWhatsapp size={20} className="cta-icons__icon" />
          </a>

          <span className="cta-icons__divider" />

          <a
            href="https://www.instagram.com/triumtech_/"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-icons__link cta-icons__link--instagram"
            aria-label="Instagram"
          >
            <FaInstagram size={20} className="cta-icons__icon" />
            <span className="cta-icons__text">Instagram</span>
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .cta-section {
          position: relative;
        }

        .cta-section__inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 clamp(24px, 5vw, 60px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
        }

        .cta-section__label {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 16px;
        }

        .cta-section__text h2 {
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          margin-bottom: 14px;
          line-height: 1.15;
        }

        .cta-section__desc {
          color: var(--color-text-secondary);
          font-size: 0.95rem;
          line-height: 1.7;
          max-width: 440px;
          margin: 0 auto;
        }

        /* ---- Icon pair ---- */
        .cta-icons {
          display: flex;
          align-items: center;
          gap: 6px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          background: var(--color-glass);
          padding: 4px;
        }

        .cta-icons__link {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          height: 48px;
          padding: 0 24px;
          border-radius: var(--radius-full);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
          text-decoration: none;
        }

        .cta-icons__text {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .cta-icons__icon {
          flex-shrink: 0;
          transition: all var(--transition-fast);
        }

        .cta-icons__link:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .cta-icons__link--whatsapp:hover {
          color: #25D366;
          border-radius: var(--radius-full) 0 0 var(--radius-full);
        }

        .cta-icons__link--whatsapp:hover .cta-icons__icon {
          filter: drop-shadow(0 0 8px rgba(37, 211, 102, 0.4));
        }

        .cta-icons__link--instagram:hover {
          color: #DC2743;
          border-radius: 0 var(--radius-full) var(--radius-full) 0;
        }

        .cta-icons__link--instagram:hover .cta-icons__icon {
          filter: drop-shadow(0 0 8px rgba(220, 39, 67, 0.4));
        }

        .cta-icons__divider {
          width: 1px;
          height: 22px;
          background: var(--color-border);
          flex-shrink: 0;
        }
      `}</style>
    </section>
  );
}
