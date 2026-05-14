'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { FaWhatsapp, FaInstagram, FaArrowRight, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { getWhatsAppUrl, getInstagramUrl } from '@/data/contact';


export default function ContatoContent() {
  return (
    <div className="contato-page">
      <section className="ct-hero">
        <div className="ct-hero__bg">
          <div className="ct-hero__orb ct-hero__orb--1" />
          <div className="ct-hero__orb ct-hero__orb--2" />
        </div>
        <div className="ct-hero__content">
          <motion.div
            className="ct-hero__left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="ct-hero__label">Contato</span>
            <h1>
              Vamos criar algo
              <span className="gradient-text"> incrível juntos</span>
            </h1>
          </motion.div>
          <motion.div
            className="ct-hero__right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p>
              Estamos em Volta Redonda, RJ, prontos para transformar sua ideia em
              realidade. Escolha o canal que preferir e vamos conversar sobre seu
              projeto.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="ct-channels">
        <div className="ct-channels__content">
          <div className="ct-channels__grid">
            <ScrollReveal direction="left" className="ct-card-wrapper">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-card ct-card--whatsapp"
              >
                <div className="ct-card__glow" />
                <div className="ct-card__top">
                  <div className="ct-card__icon">
                    <FaWhatsapp size={28} />
                  </div>
                  <FaArrowRight className="ct-card__arrow" size={16} />
                </div>
                <h3>WhatsApp</h3>
                <p>Resposta rápida e direta. A maneira mais ágil de iniciar seu projeto.</p>
                <span className="ct-card__cta">Iniciar conversa</span>
              </a>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1} className="ct-card-wrapper">
              <a
                href={getInstagramUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-card ct-card--instagram"
              >
                <div className="ct-card__glow" />
                <div className="ct-card__top">
                  <div className="ct-card__icon">
                    <FaInstagram size={28} />
                  </div>
                  <FaArrowRight className="ct-card__arrow" size={16} />
                </div>
                <h3>Instagram</h3>
                <p>Acompanhe nosso trabalho, veja bastidores e entre em contato por DM.</p>
                <span className="ct-card__cta">Seguir @triumtech_</span>
              </a>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="ct-info">
        <div className="ct-info__content">
          <ScrollReveal>
            <div className="ct-info__grid">
              <div className="ct-info__item">
                <FaClock size={18} className="ct-info__icon" />
                <div>
                  <strong>Horário</strong>
                  <p>Seg - Sex, 9h às 18h</p>
                </div>
              </div>
              <div className="ct-info__separator" />
              <div className="ct-info__item">
                <FaMapMarkerAlt size={18} className="ct-info__icon" />
                <div>
                  <strong>Localização</strong>
                  <p>Volta Redonda, RJ — atendemos Volta Redonda e todo o Brasil</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
