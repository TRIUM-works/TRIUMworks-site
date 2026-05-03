'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const scrollDown = () => {
    const el = document.getElementById('projetos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} className="hero" id="hero">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
        <div className="hero__gradient-orb hero__gradient-orb--3" />
        <div className="hero__grid-lines" />
      </div>

      <motion.div
        className="hero__content"
        style={{ y, opacity, scale }}
      >
        <motion.div
          className="hero__badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="hero__badge-dot" />
          Criamos experiências digitais
        </motion.div>

        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          Design que <span className="gradient-text">transforma</span> negócios
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          Sites profissionais com performance excepcional e design que conquista clientes.
          Transformamos ideias em experiências digitais impactantes.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          <a href="#projetos" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollDown(); }}>
            Ver projetos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/contato" className="btn-outline">Fale conosco</a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="hero__scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        onClick={scrollDown}
      >
        <div className="hero__mouse">
          <div className="hero__mouse-wheel" />
        </div>
      </motion.div>

      <style jsx global>{`
        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero__gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.5;
        }

        .hero__gradient-orb--1 {
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(1, 205, 174, 0.12) 0%, transparent 70%);
          top: -250px;
          right: -150px;
          animation: float-orb-1 12s ease-in-out infinite;
        }

        .hero__gradient-orb--2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(1, 205, 174, 0.06) 0%, transparent 70%);
          bottom: -150px;
          left: -150px;
          animation: float-orb-2 15s ease-in-out infinite;
        }

        .hero__gradient-orb--3 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 229, 195, 0.05) 0%, transparent 70%);
          top: 40%;
          left: 30%;
          animation: float-orb-1 18s ease-in-out infinite reverse;
        }

        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }

        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, -30px) scale(1.15); }
        }

        .hero__grid-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
        }

        .hero__content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 0 40px;
          max-width: 1100px;
          width: 100%;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-bottom: 36px;
          background: var(--color-glass);
        }

        .hero__badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-primary);
          box-shadow: 0 0 8px var(--color-primary);
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px var(--color-primary); }
          50% { opacity: 0.6; box-shadow: 0 0 16px var(--color-primary); }
        }

        .hero__title {
          margin-bottom: 28px;
          line-height: 1.05;
          font-size: clamp(3rem, 7vw, 5.5rem);
        }

        .hero__subtitle {
          font-size: clamp(1rem, 1.5vw, 1.25rem);
          color: var(--color-text-secondary);
          margin-bottom: 48px;
          line-height: 1.7;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero__actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Scroll indicator */
        .hero__scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          cursor: none;
          z-index: 2;
        }

        .hero__mouse {
          width: 26px;
          height: 42px;
          border: 2px solid rgba(1, 205, 174, 0.4);
          border-radius: 14px;
          position: relative;
          display: flex;
          justify-content: center;
        }

        .hero__mouse-wheel {
          width: 3px;
          height: 8px;
          background: var(--color-primary);
          border-radius: 3px;
          margin-top: 8px;
          animation: scroll-wheel 2s ease-in-out infinite;
        }

        @keyframes scroll-wheel {
          0% { opacity: 0; transform: translateY(0); }
          30% { opacity: 1; }
          60% { opacity: 1; }
          100% { opacity: 0; transform: translateY(12px); }
        }

        @media (max-width: 768px) {
          .hero__content {
            padding: 0 20px;
          }
          .hero__gradient-orb--1 { width: 300px; height: 300px; }
          .hero__gradient-orb--2 { width: 200px; height: 200px; }
          .hero__gradient-orb--3 { display: none; }
        }
      `}</style>
    </section>
  );
}
