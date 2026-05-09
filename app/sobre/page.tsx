'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import { FaArrowRight } from 'react-icons/fa';

const founders = [
  {
    initial: 'G',
    name: 'Guilherme',
    role: 'Co-fundador',
    bio: '',
    image: '/images/Guilherme.jpeg', // Adicione o caminho aqui, ex: '/images/Guilherme.jpg'
  },
  {
    initial: 'L',
    name: 'Lucas',
    role: 'Co-fundador',
    bio: '',
    image: '/images/Lucas.jpeg', // Adicione o caminho aqui, ex: '/images/Lucas.jpg'
  },
];

const beliefs = [
  {
    n: '01',
    title: 'Nada de templates.',
    text: 'Cada site é desenhado e construído do zero pra refletir a marca por trás dele. Sem encaixar a sua história num modelo pronto.',
  },
  {
    n: '02',
    title: 'Performance é parte do design.',
    text: 'Um site bonito que demora a carregar é um site que perde cliente. Velocidade não é detalhe técnico, é experiência.',
  },
  {
    n: '03',
    title: 'Próximos de você.',
    text: 'Escolhemos crescer de forma próxima, não distante. Desenvolvemos projetos com atendimento direto, acompanhamento real e foco total no que o seu negócio precisa.',
  },
];

export default function SobrePage() {
  return (
    <div className="sobre-page">
      {/* ===== Hero — editorial ===== */}
      <section className="sb-hero">
        <div className="sb-hero__inner">
          <motion.span
            className="sb-hero__eyebrow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Sobre
          </motion.span>
          <motion.h1
            className="sb-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Um estúdio criativo,<br />
            <span className="gradient-text">sem distância.</span>
          </motion.h1>
          <motion.p
            className="sb-hero__lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            A TriumTech é um estúdio criativo de Volta Redonda, RJ, focado em criar
            sites modernos, rápidos e estratégicos para empresas de
            todo o Brasil. Sem burocracia, sem excesso de camadas e sem atendimento
            distante.
          </motion.p>
          <motion.p
            className="sb-hero__lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            Aqui, você fala diretamente com quem pensa, projeta e desenvolve o seu site.
            Cada projeto é construído de forma próxima, personalizada e com atenção total
            aos detalhes.
          </motion.p>
        </div>
      </section>

      {/* ===== Founders ===== */}
      <section className="sb-founders">
        <div className="sb-founders__inner">
          {founders.map((f, i) => (
            <ScrollReveal key={f.name} delay={i * 0.1} direction={i % 2 === 0 ? 'left' : 'right'}>
              <article className="sb-founder">
                <div className="sb-founder__avatar" aria-hidden>
                  {f.image ? (
                    <img src={f.image} alt={f.name} className="sb-founder__img" />
                  ) : (
                    f.initial
                  )}
                </div>
                <div className="sb-founder__text">
                  <h3>{f.name}</h3>
                  <span className="sb-founder__role">{f.role}</span>
                  <p>{f.bio}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== Beliefs ===== */}
      <section className="sb-beliefs">
        <div className="sb-beliefs__inner">
          <ScrollReveal>
            <h2 className="sb-beliefs__heading">
              No que <span className="gradient-text">acreditamos</span>
            </h2>
          </ScrollReveal>
          <ul className="sb-beliefs__list">
            {beliefs.map((b, i) => (
              <ScrollReveal key={b.n} delay={i * 0.08}>
                <li className="sb-belief">
                  <span className="sb-belief__num">{b.n}</span>
                  <div className="sb-belief__body">
                    <h3>{b.title}</h3>
                    <p>{b.text}</p>
                  </div>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Closing CTA ===== */}
      <section className="sb-end">
        <div className="sb-end__inner">
          <ScrollReveal>
            <h2>
              Tem um projeto na cabeça?<br />
              <span className="gradient-text">Bora conversar.</span>
            </h2>
            <Link href="/contato" className="sb-end__btn">
              Falar com a gente
              <FaArrowRight size={12} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <style jsx global>{`
        .sobre-page {
          padding-top: 100px;
        }

        /* ===== HERO ===== */
        .sb-hero {
          position: relative;
          padding: clamp(60px, 10vw, 120px) 0 clamp(60px, 8vw, 100px);
          overflow: hidden;
        }
        .sb-hero::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          top: -240px;
          right: -180px;
          background: radial-gradient(circle, rgba(1, 205, 174, 0.09) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .sb-hero__inner {
          position: relative;
          z-index: 1;
          max-width: 880px;
          padding: 0 clamp(24px, 5vw, 60px);
          margin: 0 auto;
        }
        .sb-hero__eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-secondary);
          margin-bottom: 28px;
          font-weight: 500;
        }
        .sb-hero__title {
          font-size: clamp(2.4rem, 6vw, 4.6rem);
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin-bottom: 32px;
          font-weight: 300;
        }
        .sb-hero__lede {
          font-size: clamp(1.05rem, 1.4vw, 1.25rem);
          line-height: 1.7;
          color: var(--color-text-body);
          max-width: 640px;
        }
        .sb-hero__lede + .sb-hero__lede {
          margin-top: 18px;
        }

        /* ===== FOUNDERS ===== */
        .sb-founders {
          padding: clamp(20px, 4vw, 40px) 0 clamp(40px, 6vw, 80px);
        }
        .sb-founders__inner {
          max-width: 880px;
          padding: 0 clamp(24px, 5vw, 60px);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(0px, 2vw, 24px);
        }
        .sb-founder {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 32px 0;
          border-top: 1px solid var(--color-border);
        }
        .sb-founder__avatar {
          width: 56px;
          height: 56px;
          min-width: 56px;
          border-radius: 50%;
          background: rgba(1, 205, 174, 0.08);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 500;
          font-size: 1.25rem;
          letter-spacing: 0.02em;
          overflow: hidden;
        }
        .sb-founder__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .sb-founder__text h3 {
          font-size: 1.25rem;
          margin-bottom: 4px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .sb-founder__role {
          display: block;
          font-size: 0.72rem;
          color: var(--color-primary);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 12px;
          font-weight: 500;
        }
        .sb-founder__text p {
          font-size: 0.92rem;
          color: var(--color-text-secondary);
          line-height: 1.65;
        }

        /* ===== BELIEFS ===== */
        .sb-beliefs {
          padding: clamp(60px, 10vw, 120px) 0;
        }
        .sb-beliefs__inner {
          max-width: 880px;
          padding: 0 clamp(24px, 5vw, 60px);
          margin: 0 auto;
        }
        .sb-beliefs__heading {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: clamp(36px, 5vw, 60px);
          font-weight: 300;
          letter-spacing: -0.02em;
        }
        .sb-beliefs__list {
          list-style: none;
          display: flex;
          flex-direction: column;
        }
        .sb-belief {
          display: flex;
          gap: clamp(20px, 4vw, 48px);
          padding: clamp(24px, 4vw, 36px) 0;
          border-top: 1px solid var(--color-border);
        }
        .sb-belief:last-child {
          border-bottom: 1px solid var(--color-border);
        }
        .sb-belief__num {
          font-family: var(--font-heading);
          font-size: clamp(1.3rem, 2vw, 1.5rem);
          color: var(--color-primary);
          font-weight: 500;
          letter-spacing: 0.04em;
          flex-shrink: 0;
          padding-top: 6px;
        }
        .sb-belief__body {
          flex: 1;
        }
        .sb-belief__body h3 {
          font-size: clamp(1.2rem, 2.2vw, 1.5rem);
          margin-bottom: 10px;
          font-weight: 500;
          letter-spacing: -0.01em;
        }
        .sb-belief__body p {
          font-size: 1rem;
          color: var(--color-text-secondary);
          line-height: 1.7;
          max-width: 600px;
        }

        /* ===== END ===== */
        .sb-end {
          padding: clamp(60px, 10vw, 120px) 0 clamp(80px, 12vw, 140px);
        }
        .sb-end__inner {
          max-width: 880px;
          padding: 0 clamp(24px, 5vw, 60px);
          margin: 0 auto;
        }
        .sb-end__inner h2 {
          font-size: clamp(2rem, 4.5vw, 3.4rem);
          font-weight: 300;
          letter-spacing: -0.025em;
          line-height: 1.1;
          margin-bottom: 32px;
        }
        .sb-end__btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border-radius: var(--radius-full);
          background: var(--color-primary);
          color: #000;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all var(--transition-base);
        }
        .sb-end__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(1, 205, 174, 0.3);
        }

        /* ===== Responsive ===== */
        @media (max-width: 700px) {
          .sb-founders__inner {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .sb-founder {
            padding: 24px 0;
          }
          .sb-belief {
            gap: 16px;
          }
          .sb-end__inner h2 br {
            display: none;
          }
        }

        @media (hover: none), (pointer: coarse), (max-width: 768px) {
          .sb-hero::before {
            filter: blur(40px);
            width: 360px;
            height: 360px;
            top: -160px;
            right: -120px;
          }
        }
      `}</style>
    </div>
  );
}
