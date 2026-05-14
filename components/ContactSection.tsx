'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { getWhatsAppUrl, getInstagramUrl } from '@/data/contact';


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
            Entre em contato e vamos transformar sua ideia em uma experiência
            digital incrível para sua empresa em Volta Redonda ou região.
          </p>
        </motion.div>

        <motion.div
          className="cta-icons"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href={getWhatsAppUrl()}
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
            href={getInstagramUrl()}
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
    </section>
  );
}
