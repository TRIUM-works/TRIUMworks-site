'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import DeviceMockup from '@/components/DeviceMockup';
import ScrollReveal from '@/components/ScrollReveal';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

/* ---- PUZZLE LAYOUTS ---- */

function LayoutA({ project }: { project: typeof projects[0] }) {
  return (
    <div className="puzzle-grid puzzle-grid--a">
      <ScrollReveal className="puzzle-grid__item puzzle-grid__item--main">
        <DeviceMockup type="desktop" src={project.images.desktop[0]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.15} direction="left" className="puzzle-grid__item puzzle-grid__item--left">
        <DeviceMockup type="mobile" src={project.images.mobile[0]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.25} direction="right" className="puzzle-grid__item puzzle-grid__item--right">
        <DeviceMockup type="mobile" src={project.images.mobile[1]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.2} className="puzzle-grid__item puzzle-grid__item--bottom">
        <DeviceMockup type="desktop" src={project.images.desktop[1]} alt={project.title} />
      </ScrollReveal>
    </div>
  );
}

function LayoutB({ project }: { project: typeof projects[0] }) {
  return (
    <div className="puzzle-grid puzzle-grid--b">
      <ScrollReveal className="puzzle-grid__item puzzle-grid__item--hero">
        <DeviceMockup type="desktop" src={project.images.desktop[0]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.2} direction="left" className="puzzle-grid__item puzzle-grid__item--mob1">
        <DeviceMockup type="mobile" src={project.images.mobile[0]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.3} direction="right" className="puzzle-grid__item puzzle-grid__item--mob2">
        <DeviceMockup type="mobile" src={project.images.mobile[1]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.15} className="puzzle-grid__item puzzle-grid__item--desk2">
        <DeviceMockup type="desktop" src={project.images.desktop[1]} alt={project.title} />
      </ScrollReveal>
    </div>
  );
}

function LayoutC({ project }: { project: typeof projects[0] }) {
  return (
    <div className="puzzle-grid puzzle-grid--c">
      <ScrollReveal direction="left" className="puzzle-grid__item puzzle-grid__item--side-mob">
        <DeviceMockup type="mobile" src={project.images.mobile[0]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.15} className="puzzle-grid__item puzzle-grid__item--center-desk">
        <DeviceMockup type="desktop" src={project.images.desktop[0]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.25} direction="right" className="puzzle-grid__item puzzle-grid__item--side-mob2">
        <DeviceMockup type="mobile" src={project.images.mobile[1]} alt={project.title} />
      </ScrollReveal>
      <ScrollReveal delay={0.2} className="puzzle-grid__item puzzle-grid__item--full-desk">
        <DeviceMockup type="desktop" src={project.images.desktop[1]} alt={project.title} />
      </ScrollReveal>
    </div>
  );
}

export default function ProjetoPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === resolvedParams.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const PuzzleLayout =
    project.layoutVariant === 'A' ? LayoutA
    : project.layoutVariant === 'B' ? LayoutB
    : LayoutC;

  return (
    <div className="projeto-page grid-bg">
      {/* Hero */}
      <section className="pj-hero">
        <div
          className="pj-hero__glow"
          style={{
            background: `radial-gradient(ellipse 60% 50% at 80% 20%, ${project.color}12 0%, transparent 70%)`,
          }}
        />

        <div className="pj-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/#projetos" className="pj-hero__back">
              <FaArrowLeft size={12} />
              Voltar
            </Link>
          </motion.div>

          <div className="pj-hero__grid">
            <div className="pj-hero__left">
              <motion.span
                className="pj-hero__number"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ color: project.color }}
              >
                {String(currentIndex + 1).padStart(2, '0')}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                {project.title}
              </motion.h1>

              <motion.p
                className="pj-hero__subtitle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                style={{ color: project.color }}
              >
                {project.subtitle}
              </motion.p>
            </div>

            <div className="pj-hero__right">
              <motion.p
                className="pj-hero__desc"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {project.fullDescription}
              </motion.p>

              <motion.div
                className="pj-hero__tags"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </motion.div>

              <motion.div
                className="pj-hero__actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visitar site
                  <FaExternalLinkAlt size={12} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mockups */}
      <section className="pj-mockups">
        <div className="pj-mockups__inner">
          <ScrollReveal>
            <div className="pj-mockups__header">
              <span className="pj-mockups__label">Showcase</span>
              <h2>Veja em <span className="gradient-text">ação</span></h2>
            </div>
          </ScrollReveal>

          <PuzzleLayout project={project} />
        </div>
      </section>

      {/* Navigation */}
      <section className="pj-nav">
        <div className="pj-nav__inner">
          {prevProject ? (
            <Link href={`/projetos/${prevProject.slug}`} className="pj-nav__link pj-nav__link--prev">
              <FaArrowLeft size={14} />
              <div>
                <span>Anterior</span>
                <strong>{prevProject.title}</strong>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link href={`/projetos/${nextProject.slug}`} className="pj-nav__link pj-nav__link--next">
              <div>
                <span>Próximo</span>
                <strong>{nextProject.title}</strong>
              </div>
              <FaArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </section>

      <style jsx global>{`
        .projeto-page {
          padding-top: 100px;
        }

        /* Hero — asymmetric split */
        .pj-hero {
          position: relative;
          overflow: hidden;
          padding: 60px 0 80px;
        }

        .pj-hero__glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .pj-hero__content {
          position: relative;
          z-index: 1;
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .pj-hero__back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          margin-bottom: 60px;
          transition: color var(--transition-fast);
        }

        .pj-hero__back:hover { color: var(--color-primary); }

        .pj-hero__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }

        .pj-hero__left { }

        .pj-hero__number {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          margin-bottom: 16px;
        }

        .pj-hero__left h1 {
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          line-height: 1.05;
          margin-bottom: 16px;
        }

        .pj-hero__subtitle {
          font-size: 1.1rem;
          font-weight: 500;
        }

        .pj-hero__right {
          padding-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .pj-hero__desc {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--color-text-body);
        }

        .pj-hero__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pj-hero__actions {
          margin-top: 8px;
        }

        /* Mockups section */
        .pj-mockups {
          padding: 80px 0 120px;
        }

        .pj-mockups__inner {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .pj-mockups__header {
          margin-bottom: 60px;
        }

        .pj-mockups__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 12px;
        }

        .pj-mockups__header h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
        }

        /* ===== PUZZLE GRIDS ===== */

        /* Layout A: Desktop full → 2 mobiles + desktop below */
        .puzzle-grid--a {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }
        .puzzle-grid--a .puzzle-grid__item--main {
          grid-column: 1 / -1;
        }
        .puzzle-grid--a .puzzle-grid__item--left {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .puzzle-grid--a .puzzle-grid__item--right {
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }
        .puzzle-grid--a .puzzle-grid__item--bottom {
          grid-column: 1 / -1;
        }

        /* Layout B: Desktop wide → mobile + mobile → desktop */
        .puzzle-grid--b {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
        }
        .puzzle-grid--b .puzzle-grid__item--hero {
          grid-column: 1 / -1;
        }
        .puzzle-grid--b .puzzle-grid__item--mob1 {
          display: flex;
          justify-content: flex-end;
          align-items: flex-start;
        }
        .puzzle-grid--b .puzzle-grid__item--mob2 {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
        }
        .puzzle-grid--b .puzzle-grid__item--desk2 {
          grid-column: 1 / -1;
        }

        /* Layout C: mobile | desktop | mobile → desktop full */
        .puzzle-grid--c {
          display: grid;
          grid-template-columns: 1fr 2.5fr 1fr;
          grid-template-rows: auto auto;
          gap: 16px;
          align-items: center;
        }
        .puzzle-grid--c .puzzle-grid__item--side-mob {
          display: flex;
          justify-content: center;
        }
        .puzzle-grid--c .puzzle-grid__item--center-desk { }
        .puzzle-grid--c .puzzle-grid__item--side-mob2 {
          display: flex;
          justify-content: center;
        }
        .puzzle-grid--c .puzzle-grid__item--full-desk {
          grid-column: 1 / -1;
        }

        /* Navigation */
        .pj-nav {
          border-top: 1px solid var(--color-border);
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .pj-nav__inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 40px 0;
        }

        .pj-nav__link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 24px;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          transition: all var(--transition-base);
        }

        .pj-nav__link:hover {
          border-color: var(--color-primary);
          transform: translateY(-2px);
        }

        .pj-nav__link span {
          display: block;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin-bottom: 4px;
        }

        .pj-nav__link strong {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 500;
        }

        .pj-nav__link--next { text-align: right; }

        @media (max-width: 768px) {
          .pj-hero__grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .puzzle-grid--a,
          .puzzle-grid--b {
            grid-template-columns: 1fr;
          }
          .puzzle-grid--a .puzzle-grid__item--main,
          .puzzle-grid--a .puzzle-grid__item--bottom,
          .puzzle-grid--b .puzzle-grid__item--hero,
          .puzzle-grid--b .puzzle-grid__item--desk2 {
            grid-column: 1;
          }

          .puzzle-grid--c {
            grid-template-columns: 1fr;
          }
          .puzzle-grid--c .puzzle-grid__item--full-desk {
            grid-column: 1;
          }

          .pj-nav__inner {
            flex-direction: column;
            gap: 16px;
          }
          .pj-nav__link { width: 100%; justify-content: center; }
        }
      `}</style>
    </div>
  );
}
