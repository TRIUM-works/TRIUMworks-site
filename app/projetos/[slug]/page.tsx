'use client';

import { use, useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

/* ---- Reveal on scroll with scale-up effect ---- */
function ShowcaseReveal({
  children,
  delay = 0,
  className = '',
  label,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`showcase-item ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.92 }
      }
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="showcase-item__wrap">
        {children}
        {label && (
          <div className="showcase-item__overlay">
            <span className="showcase-item__label">{label}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---- Showcase Layout (Dynamic Grid) ---- */
function ShowcaseLayout({ project }: { project: typeof projects[0] }) {
  return (
    <div className="showcase-grid">
      {project.images.gallery.map((img, idx) => (
        <ShowcaseReveal
          key={idx}
          className={`showcase-grid__item showcase-grid__item--${img.format}`}
          label={img.format === 'desktop' ? 'Desktop' : 'Mobile'}
          delay={idx * 0.12}
        >
          <img
            src={img.url}
            alt={`${project.title} — ${img.format === 'desktop' ? 'Desktop' : 'Mobile'}`}
            loading="lazy"
          />
        </ShowcaseReveal>
      ))}
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

  return (
    <div className="projeto-page grid-bg">
      {/* ===== Hero — Centered header ===== */}
      <section className="pj-hero">
        <div
          className="pj-hero__glow"
          style={{
            background: `radial-gradient(ellipse 50% 40% at 50% 30%, ${project.color}14 0%, transparent 70%)`,
          }}
        />

        <div className="pj-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link href="/#projetos" className="pj-hero__back">
              <FaArrowLeft size={11} />
              Projetos
            </Link>
          </motion.div>

          <motion.h1
            className="pj-hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {project.title}
          </motion.h1>

          <motion.p
            className="pj-hero__desc"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {project.fullDescription}
          </motion.p>

          <motion.div
            className="pj-hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="pj-hero__visit-btn"
            >
              Visitar site
              <FaExternalLinkAlt size={11} />
            </a>
          </motion.div>

          <motion.div
            className="pj-hero__tags"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
          >
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== Showcase ===== */}
      <section className="pj-showcase">
        <div className="pj-showcase__inner">
          <ShowcaseLayout project={project} />
        </div>
      </section>

      {/* ===== Navigation ===== */}
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

        /* ===== HERO — Centered ===== */
        .pj-hero {
          position: relative;
          overflow: hidden;
          padding: 80px 0 60px;
          text-align: center;
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
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .pj-hero__back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          margin-bottom: 48px;
          transition: color var(--transition-fast);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .pj-hero__back:hover { color: var(--color-primary); }

        .pj-hero__title {
          font-size: clamp(2.8rem, 6vw, 5rem);
          line-height: 1.05;
          margin-bottom: 24px;
          letter-spacing: -0.03em;
          font-weight: 300;
        }

        .pj-hero__desc {
          font-size: clamp(0.95rem, 1.3vw, 1.1rem);
          line-height: 1.8;
          color: var(--color-text-secondary);
          max-width: 760px;
          margin-bottom: 32px;
        }

        .pj-hero__cta {
          margin-bottom: 28px;
        }

        .pj-hero__visit-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          padding: 10px 24px;
          border-radius: var(--radius-full);
          border: 1px solid var(--color-border);
          transition: all var(--transition-base);
          letter-spacing: 0.02em;
          background: transparent;
        }
        .pj-hero__visit-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px var(--color-primary-glow);
        }

        .pj-hero__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }

        /* ===== SHOWCASE SECTION ===== */
        .pj-showcase {
          padding: 40px 0 120px;
        }

        .pj-showcase__inner {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1200px;
          margin: 0 auto;
        }

        /* ---- Showcase Grid ---- */
        .showcase-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2vw, 24px);
          grid-auto-flow: dense;
        }

        .showcase-grid__item--desktop {
          grid-column: span 2;
        }

        .showcase-grid__item--mobile {
          grid-column: span 1;
        }

        /* Desktop image container */
        .showcase-grid__item--desktop .showcase-item__wrap {
          aspect-ratio: 16 / 9;
        }

        /* Mobile image container — slightly shorter than true 9:16 */
        .showcase-grid__item--mobile .showcase-item__wrap {
          aspect-ratio: 9 / 13;
        }

        /* ---- Showcase Item ---- */
        .showcase-item__wrap {
          position: relative;
          width: 100%;
          border-radius: clamp(12px, 1.5vw, 20px);
          overflow: hidden;
          background: #0c0c0c;
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: border-color 0.4s ease, box-shadow 0.5s ease;
        }

        .showcase-item__wrap:hover {
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .showcase-item__wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .showcase-item__wrap:hover img {
          transform: scale(1.03);
        }

        /* Hover overlay with label */
        .showcase-item__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: clamp(16px, 2vw, 28px);
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.65) 0%,
            rgba(0, 0, 0, 0.15) 35%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .showcase-item__wrap:hover .showcase-item__overlay {
          opacity: 1;
        }

        .showcase-item__label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          padding: 6px 14px;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* ===== NAVIGATION ===== */
        .pj-nav {
          border-top: 1px solid var(--color-border);
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1200px;
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

        /* ===== RESPONSIVE ===== */
        @media (max-width: 768px) {
          .pj-hero {
            padding: 60px 0 40px;
          }
          .pj-hero__title {
            font-size: clamp(2rem, 8vw, 3rem);
          }
          .pj-hero__back {
            margin-bottom: 32px;
          }

          .showcase-grid {
            gap: 12px;
          }

          .pj-nav__inner {
            flex-direction: column;
            gap: 16px;
          }
          .pj-nav__link {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .showcase-grid {
            gap: 12px;
          }
          .showcase-item__wrap {
            border-radius: 12px;
          }
        }
      `}</style>
    </div>
  );
}
