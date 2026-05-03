'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowRight } from 'react-icons/fa';

function ProjectTile({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      className={`ptile ptile--${index % 3 === 0 ? 'wide' : index % 3 === 1 ? 'tall' : 'square'}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link href={`/projetos/${project.slug}`} className="ptile__link">
        <div
          className="ptile__image"
          style={{ backgroundImage: `url(${project.images.thumbnail})` }}
        />
        <div className="ptile__overlay">
          <div className="ptile__overlay-bg" style={{ background: `${project.color}CC` }} />
          <div className="ptile__overlay-content">
            <span className="ptile__number">{String(index + 1).padStart(2, '0')}</span>
            <h3>{project.title}</h3>
            <p>{project.subtitle}</p>
            <div className="ptile__tags">
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="ptile__cta">
              Explorar <FaArrowRight size={12} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjetosPage() {
  return (
    <div className="projetos-page grid-bg">
      {/* Hero */}
      <section className="plist-hero">
        <div className="plist-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="plist-hero__label">Portfólio completo</span>
            <h1>Todos os <span className="gradient-text">projetos</span></h1>
            <p className="plist-hero__desc">
              Uma coleção dos nossos trabalhos. Cada projeto representa uma
              história única de transformação digital.
            </p>
          </motion.div>

          <motion.div
            className="plist-hero__stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="plist-stat">
              <span className="plist-stat__number gradient-text">{projects.length}</span>
              <span className="plist-stat__label">Projetos</span>
            </div>
            <div className="plist-stat__sep" />
            <div className="plist-stat">
              <span className="plist-stat__number gradient-text">100%</span>
              <span className="plist-stat__label">Satisfação</span>
            </div>
            <div className="plist-stat__sep" />
            <div className="plist-stat">
              <span className="plist-stat__number gradient-text">2024</span>
              <span className="plist-stat__label">Desde</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="plist-grid-section">
        <div className="plist-grid-section__content">
          <div className="plist-grid">
            {projects.map((project, index) => (
              <ProjectTile key={project.slug} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .projetos-page {
          padding-top: 100px;
        }

        /* Hero */
        .plist-hero {
          padding: 80px 0 100px;
        }

        .plist-hero__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .plist-hero__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 20px;
        }

        .plist-hero__content h1 {
          font-size: clamp(3rem, 6vw, 5rem);
          margin-bottom: 20px;
        }

        .plist-hero__desc {
          max-width: 500px;
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--color-text-secondary);
        }

        .plist-hero__stats {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-top: 60px;
          padding: 24px 0;
          border-top: 1px solid var(--color-border);
          width: fit-content;
        }

        .plist-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .plist-stat__number {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 600;
        }

        .plist-stat__label {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          font-weight: 500;
        }

        .plist-stat__sep {
          width: 1px;
          height: 40px;
          background: var(--color-border);
        }

        /* Grid */
        .plist-grid-section {
          padding: 0 0 120px;
        }

        .plist-grid-section__content {
          padding: 0 clamp(24px, 5vw, 100px);
          max-width: 1400px;
          margin: 0 auto;
        }

        .plist-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          grid-auto-rows: 320px;
        }

        /* Tile sizes */
        .ptile--wide { grid-column: span 2; }
        .ptile--tall { grid-row: span 1; }
        .ptile--square { }

        .ptile {
          border-radius: var(--radius-lg);
          overflow: hidden;
          position: relative;
        }

        .ptile__link {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
        }

        .ptile__image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .ptile:hover .ptile__image {
          transform: scale(1.1);
        }

        .ptile__overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: flex-end;
          padding: 32px;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .ptile:hover .ptile__overlay {
          opacity: 1;
        }

        .ptile__overlay-bg {
          position: absolute;
          inset: 0;
          opacity: 0.85;
        }

        .ptile__overlay-content {
          position: relative;
          z-index: 1;
          color: white;
        }

        .ptile__number {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          opacity: 0.7;
          margin-bottom: 8px;
          display: block;
        }

        .ptile__overlay-content h3 {
          font-size: 1.6rem;
          font-weight: 600;
          margin-bottom: 4px;
          color: white;
        }

        .ptile__overlay-content p {
          font-size: 0.9rem;
          opacity: 0.8;
          color: white;
          margin-bottom: 12px;
        }

        .ptile__tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          margin-bottom: 16px;
        }

        .ptile__tags span {
          font-size: 0.75rem;
          padding: 3px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
        }

        .ptile__cta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: white;
        }

        @media (max-width: 900px) {
          .plist-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 280px;
          }
          .ptile--wide { grid-column: span 1; }

          .plist-hero__stats {
            flex-wrap: wrap;
          }
        }

        @media (min-width: 901px) and (max-width: 1100px) {
          .plist-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
