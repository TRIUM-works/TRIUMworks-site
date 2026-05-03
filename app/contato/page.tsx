'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { FaWhatsapp, FaInstagram, FaArrowRight, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

export default function ContatoPage() {
  return (
    <div className="contato-page grid-bg">
      {/* Hero */}
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
              Estamos prontos para transformar sua ideia em realidade.
              Escolha o canal que preferir e vamos conversar sobre seu projeto.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact channels */}
      <section className="ct-channels">
        <div className="ct-channels__content">
          <div className="ct-channels__grid">
            {/* WhatsApp */}
            <ScrollReveal direction="left">
              <a
                href="https://wa.me/5585981254006"
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

            {/* Instagram */}
            <ScrollReveal direction="right" delay={0.1}>
              <a
                href="https://www.instagram.com/triumtech_/"
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

      {/* Info strip */}
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
                  <p>Atendemos todo o Brasil remotamente</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="ct-cta">
        <div className="ct-cta__content">
          <ScrollReveal>
            <div className="ct-cta__inner">
              <span className="ct-cta__label">Comece agora</span>
              <h2>Cada grande projeto começa<br />com uma <span className="gradient-text">conversa</span></h2>
              <p>Não importa o tamanho do seu projeto — estamos aqui para ajudar.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style jsx global>{`
        .contato-page {
          padding-top: 100px;
        }

        /* Hero */
        .ct-hero {
          position: relative;
          padding: 80px 0 100px;
          overflow: hidden;
        }

        .ct-hero__bg {
          position: absolute;
          inset: 0;
        }

        .ct-hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .ct-hero__orb--1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(37, 211, 102, 0.06) 0%, transparent 70%);
          top: -150px;
          left: 20%;
          animation: float-orb-1 12s ease-in-out infinite;
        }

        .ct-hero__orb--2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(220, 39, 67, 0.05) 0%, transparent 70%);
          bottom: -100px;
          right: 15%;
          animation: float-orb-2 15s ease-in-out infinite;
        }

        .ct-hero__content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 80px;
          align-items: start;
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .ct-hero__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 20px;
        }

        .ct-hero__left h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
        }

        .ct-hero__right {
          padding-top: 50px;
        }

        .ct-hero__right p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--color-text-body);
        }

        /* Channels */
        .ct-channels {
          padding: 0 0 80px;
        }

        .ct-channels__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .ct-channels__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .ct-card {
          display: flex;
          flex-direction: column;
          padding: 48px 40px;
          border-radius: var(--radius-xl);
          border: 1px solid var(--color-border);
          background: var(--color-bg-elevated);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          position: relative;
          overflow: hidden;
        }

        .ct-card__glow {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          top: -150px;
          right: -80px;
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .ct-card:hover .ct-card__glow { opacity: 1; }

        .ct-card--whatsapp .ct-card__glow {
          background: radial-gradient(circle, rgba(37, 211, 102, 0.12) 0%, transparent 70%);
        }
        .ct-card--instagram .ct-card__glow {
          background: radial-gradient(circle, rgba(220, 39, 67, 0.12) 0%, transparent 70%);
        }

        .ct-card:hover {
          transform: translateY(-6px);
          border-color: var(--color-border-hover);
        }

        .ct-card__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
        }

        .ct-card__icon {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ct-card--whatsapp .ct-card__icon {
          background: rgba(37, 211, 102, 0.1);
          color: #25D366;
        }
        .ct-card--instagram .ct-card__icon {
          background: rgba(220, 39, 67, 0.1);
          color: #DC2743;
        }

        .ct-card__arrow {
          color: var(--color-text-secondary);
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(-8px);
        }

        .ct-card:hover .ct-card__arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--color-primary);
        }

        .ct-card h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
        }

        .ct-card p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .ct-card__cta {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-primary);
          position: relative;
          z-index: 1;
          margin-top: auto;
        }

        /* Info */
        .ct-info {
          padding: 0 0 100px;
        }

        .ct-info__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .ct-info__grid {
          display: flex;
          align-items: center;
          gap: 40px;
          padding: 32px 40px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          background: var(--color-glass);
        }

        .ct-info__item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ct-info__icon {
          color: var(--color-primary);
          min-width: 18px;
        }

        .ct-info__item strong {
          display: block;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 2px;
        }

        .ct-info__item p {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
        }

        .ct-info__separator {
          width: 1px;
          height: 40px;
          background: var(--color-border);
        }

        /* CTA */
        .ct-cta {
          padding: 0 0 120px;
        }

        .ct-cta__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .ct-cta__inner {
          max-width: 600px;
        }

        .ct-cta__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 16px;
        }

        .ct-cta__inner h2 {
          margin-bottom: 16px;
        }

        .ct-cta__inner p {
          color: var(--color-text-secondary);
          font-size: 1.05rem;
        }

        @media (max-width: 768px) {
          .ct-hero__content {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .ct-hero__right { padding-top: 0; }

          .ct-channels__grid {
            grid-template-columns: 1fr;
          }

          .ct-info__grid {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .ct-info__separator { width: 100%; height: 1px; }

          .ct-cta__inner h2 br { display: none; }
        }
      `}</style>
    </div>
  );
}
