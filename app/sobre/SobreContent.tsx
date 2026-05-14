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
    image: '/images/Guilherme.jpeg',
  },
  {
    initial: 'L',
    name: 'Lucas',
    role: 'Co-fundador',
    bio: '',
    image: '/images/Lucas.jpeg',
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

export default function SobreContent() {
  return (
    <div className="sobre-page">
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
            A TRIUM é um estúdio criativo de Volta Redonda, RJ, focado em criar
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
    </div>
  );
}
