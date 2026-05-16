'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { CONTACT_INFO, getWhatsAppUrl, getInstagramUrl } from '@/data/contact';


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
          <span className="section-label cta-section__label">
            Contato <span className="section-label__num">/ 03</span>
          </span>
          <h2>
            Pronto para levar seu projeto ao <em><span className="gradient-text">próximo nível?</span></em>
          </h2>
          <p className="cta-section__desc">
            Entre em contato e vamos transformar sua ideia em uma experiência
            digital incrível para sua empresa em Volta Redonda ou região.
          </p>
        </motion.div>

        <motion.div
          className="cta-section__right"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href={`mailto:${CONTACT_INFO.email}`} className="cta-section__email">
            {CONTACT_INFO.email}
          </a>

          <div className="cta-icons">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-icons__link cta-icons__link--whatsapp"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} className="cta-icons__icon" />
              <span className="cta-icons__text">WhatsApp</span>
            </a>

            <span className="cta-icons__divider" />

            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-icons__link cta-icons__link--instagram"
              aria-label="Instagram"
            >
              <FaInstagram size={18} className="cta-icons__icon" />
              <span className="cta-icons__text">Instagram</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
