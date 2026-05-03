'use client';

import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import { FaCode, FaPaintBrush, FaRocket, FaHandshake } from 'react-icons/fa';

const values = [
  {
    icon: FaPaintBrush,
    title: 'Design Premium',
    description: 'Cada detalhe é pensado para transmitir profissionalismo e modernidade, refletindo a identidade única da sua marca.',
  },
  {
    icon: FaCode,
    title: 'Código Limpo',
    description: 'Desenvolvimento com as melhores práticas, garantindo performance, SEO otimizado e facilidade de manutenção.',
  },
  {
    icon: FaRocket,
    title: 'Performance',
    description: 'Sites rápidos que carregam instantaneamente, proporcionando a melhor experiência para seus visitantes.',
  },
  {
    icon: FaHandshake,
    title: 'Parceria',
    description: 'Atendimento próximo e personalizado. Estamos junto com você em cada etapa do projeto.',
  },
];

const timeline = [
  { year: '2024', title: 'Fundação', description: 'Guilherme e Lucas unem forças para criar a TriumTech, com a missão de transformar negócios através da tecnologia.' },
  { year: '2024', title: 'Primeiros Projetos', description: 'Entregamos nossos primeiros sites profissionais, estabelecendo nossa reputação de qualidade e comprometimento.' },
  { year: '2025', title: 'Crescimento', description: 'Expandimos nosso portfólio e aprimoramos nossas habilidades, sempre buscando entregar o melhor para cada cliente.' },
];

export default function SobrePage() {
  return (
    <div className="sobre-page grid-bg">
      {/* Hero — asymmetric */}
      <section className="sb-hero">
        <div className="sb-hero__bg">
          <div className="sb-hero__orb sb-hero__orb--1" />
          <div className="sb-hero__orb sb-hero__orb--2" />
        </div>
        <div className="sb-hero__content">
          <motion.div
            className="sb-hero__left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="sb-hero__label">Sobre nós</span>
            <h1>
              Criatividade e tecnologia
              <span className="gradient-text"> caminhando juntas</span>
            </h1>
          </motion.div>
          <motion.div
            className="sb-hero__right"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <p>
              Somos Guilherme e Lucas, fundadores da Trium Tech — um projeto que nasceu
              da nossa paixão por tecnologia, design e soluções digitais que realmente
              fazem a diferença.
            </p>
            <p>
              Na Trium Tech, unimos criatividade e conhecimento técnico para
              desenvolver sites modernos, funcionais e sob medida para cada cliente.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values — staggered grid */}
      <section className="sb-values">
        <div className="sb-values__content">
          <ScrollReveal>
            <div className="sb-values__header">
              <span className="sb-values__label">Nossos valores</span>
              <h2>O que nos <span className="gradient-text">diferencia</span></h2>
            </div>
          </ScrollReveal>

          <div className="sb-values__grid">
            {values.map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
                <div className="sb-value-card glass-card">
                  <div className="sb-value-card__icon">
                    <value.icon size={22} />
                  </div>
                  <div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Timeline — left-aligned */}
      <section className="sb-story">
        <div className="sb-story__content">
          <div className="sb-story__grid">
            <ScrollReveal>
              <div className="sb-story__header">
                <span className="sb-story__label">Nossa história</span>
                <h2>Uma jornada de<br /><span className="gradient-text">evolução</span></h2>
              </div>
            </ScrollReveal>

            <div className="sb-story__timeline">
              {timeline.map((item, i) => (
                <ScrollReveal key={i} delay={i * 0.15}>
                  <div className="sb-timeline-item">
                    <div className="sb-timeline-item__dot" />
                    <div className="sb-timeline-item__line" />
                    <div className="sb-timeline-item__content">
                      <span className="sb-timeline-item__year">{item.year}</span>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="sb-quote">
        <div className="sb-quote__content">
          <ScrollReveal direction="left">
            <div className="sb-quote__inner">
              <div className="sb-quote__mark">&ldquo;</div>
              <blockquote>
                Acreditamos que uma presença digital de qualidade é essencial
                para qualquer negócio. Seja para lançar um novo projeto,
                modernizar seu site ou criar uma vitrine digital que represente
                sua marca — conte com a gente.
              </blockquote>
              <p className="sb-quote__author">— Guilherme & Lucas, Fundadores</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style jsx global>{`
        .sobre-page {
          padding-top: 100px;
        }

        /* Hero — wide asymmetric */
        .sb-hero {
          position: relative;
          padding: 80px 0 100px;
          overflow: hidden;
        }

        .sb-hero__bg {
          position: absolute;
          inset: 0;
        }

        .sb-hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
        }

        .sb-hero__orb--1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(1, 205, 174, 0.1) 0%, transparent 70%);
          top: -200px;
          right: 10%;
          animation: float-orb-1 12s ease-in-out infinite;
        }

        .sb-hero__orb--2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(1, 205, 174, 0.06) 0%, transparent 70%);
          bottom: -100px;
          left: 5%;
          animation: float-orb-2 15s ease-in-out infinite;
        }

        .sb-hero__content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 80px;
          align-items: start;
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .sb-hero__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 20px;
        }

        .sb-hero__left h1 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1.1;
        }

        .sb-hero__right {
          padding-top: 60px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sb-hero__right p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--color-text-body);
        }

        /* Values */
        .sb-values {
          padding: 100px 0;
        }

        .sb-values__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .sb-values__header {
          margin-bottom: 60px;
        }

        .sb-values__label,
        .sb-story__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 16px;
        }

        .sb-values__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .sb-value-card {
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 36px 32px;
          transition: all var(--transition-base);
        }

        .sb-value-card:hover {
          border-color: rgba(1, 205, 174, 0.15);
          transform: translateY(-3px);
        }

        .sb-value-card__icon {
          width: 48px;
          height: 48px;
          min-width: 48px;
          border-radius: 14px;
          background: rgba(1, 205, 174, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
        }

        .sb-value-card h3 {
          font-size: 1.15rem;
          margin-bottom: 8px;
        }

        .sb-value-card p {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          line-height: 1.6;
        }

        /* Story */
        .sb-story {
          padding: 100px 0;
        }

        .sb-story__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .sb-story__grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: start;
        }

        .sb-story__header h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
        }

        .sb-story__timeline {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .sb-timeline-item {
          position: relative;
          padding-left: 40px;
          padding-bottom: 40px;
        }

        .sb-timeline-item__dot {
          position: absolute;
          left: 0;
          top: 6px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-primary);
          box-shadow: 0 0 12px var(--color-primary-glow);
        }

        .sb-timeline-item__line {
          position: absolute;
          left: 5px;
          top: 20px;
          bottom: 0;
          width: 1px;
          background: linear-gradient(180deg, rgba(1, 205, 174, 0.3), transparent);
        }

        .sb-timeline-item__year {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-primary);
          letter-spacing: 0.1em;
        }

        .sb-timeline-item__content h3 {
          font-size: 1.2rem;
          margin: 6px 0 8px;
        }

        .sb-timeline-item__content p {
          font-size: 0.95rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
        }

        /* Quote */
        .sb-quote {
          padding: 60px 0 120px;
        }

        .sb-quote__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .sb-quote__inner {
          max-width: 700px;
          margin-left: auto;
          padding: 60px;
          position: relative;
          border-left: 2px solid rgba(1, 205, 174, 0.2);
        }

        .sb-quote__mark {
          font-family: var(--font-heading);
          font-size: 5rem;
          line-height: 1;
          color: var(--color-primary);
          opacity: 0.2;
          position: absolute;
          top: 20px;
          left: 30px;
        }

        .sb-quote__inner blockquote {
          font-size: 1.15rem;
          font-style: italic;
          color: var(--color-text-body);
          line-height: 1.8;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .sb-quote__author {
          font-size: 0.9rem;
          color: var(--color-primary);
          font-weight: 500;
        }

        @media (max-width: 900px) {
          .sb-hero__content {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .sb-hero__right { padding-top: 0; }

          .sb-values__grid {
            grid-template-columns: 1fr;
          }

          .sb-story__grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .sb-quote__inner {
            margin-left: 0;
            padding: 40px 24px 40px 30px;
          }
        }
      `}</style>
    </div>
  );
}
