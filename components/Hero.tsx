'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches,
      );
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollDown = () => {
    const el = document.getElementById('projetos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="hero" id="hero">
      <div className="hero__bg" />

      <motion.img
        src="/logo/trium-badge-teal.png"
        alt=""
        aria-hidden="true"
        className="hero__badge-mark"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="hero__content"
        style={isMobile ? undefined : { y, opacity, scale }}
      >
        <motion.span
          className="section-label hero__label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
        >
          Início <span className="section-label__num">/ 01</span>
        </motion.span>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Design que <span className="gradient-text">transforma</span> negócios
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Sites profissionais com performance excepcional e design que conquista clientes.
          Transformamos ideias em experiências digitais para o seu negócio.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <a
            href="#projetos"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); scrollDown(); }}
          >
            Ver projetos
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="/contato" className="btn-outline">Fale conosco</a>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={isMobile ? undefined : { opacity: scrollIndicatorOpacity }}
        transition={{ delay: 1.1, duration: 0.6 }}
        onClick={scrollDown}
        aria-label="Rolar para projetos"
      >
        <span>Role para ver</span>
        <div className="hero__mouse">
          <div className="hero__mouse-wheel" />
        </div>
      </motion.button>
    </section>
  );
}
