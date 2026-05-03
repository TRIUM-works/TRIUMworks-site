'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowRight } from 'react-icons/fa';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const isEven = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const infoY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={ref}
      className={`pcard ${isEven ? 'pcard--left' : 'pcard--right'}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Big number background */}
      <motion.span
        className="pcard__bg-number"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.1 }}
        style={{ color: `${project.color}08` }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      {/* Image section */}
      <motion.div
        className="pcard__visual"
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link href={`/projetos/${project.slug}`} className="pcard__image-link">
          <motion.div className="pcard__image-container" style={{ y: imgY }}>
            <div
              className="pcard__image"
              style={{ backgroundImage: `url(${project.images.thumbnail})` }}
            />
          </motion.div>
          <div className="pcard__image-overlay">
            <span>Ver projeto <FaArrowRight size={14} /></span>
          </div>
          <div
            className="pcard__image-border"
            style={{ borderColor: `${project.color}30` }}
          />
        </Link>
      </motion.div>

      {/* Info section */}
      <motion.div className="pcard__info" style={{ y: infoY }}>
        <motion.div
          className="pcard__info-inner"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="pcard__meta">
            <span className="pcard__number" style={{ color: project.color }}>
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="pcard__divider" />
            <span className="pcard__category">{project.subtitle}</span>
          </div>

          <h3 className="pcard__title">{project.title}</h3>

          <p className="pcard__description">{project.description}</p>

          <div className="pcard__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <div className="pcard__actions">
            <Link href={`/projetos/${project.slug}`} className="btn-primary">
              Explorar
              <FaArrowRight size={12} />
            </Link>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Visitar site
            </a>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="projects-section grid-bg" id="projetos">
      <div className="projects-section__header">
        <div className="container">
          <motion.div
            className="projects-section__header-inner"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="projects-section__header-left">
              <span className="projects-section__label">Portfólio</span>
              <h2>
                Projetos que<br />
                <span className="gradient-text">entregam resultados</span>
              </h2>
            </div>
            <div className="projects-section__header-right">
              <p>
                Cada projeto é único — desenhado e desenvolvido sob medida para
                alcançar os objetivos de cada cliente.
              </p>
              <Link href="/projetos" className="btn-outline" style={{ marginTop: '20px' }}>
                Ver todos
                <FaArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="projects-section__list">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      <style jsx global>{`
        .projects-section {
          padding: 140px 0 100px;
          position: relative;
        }

        /* Header — asymmetric layout */
        .projects-section__header {
          margin-bottom: 120px;
        }

        .projects-section__header-inner {
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 60px;
          align-items: end;
        }

        .projects-section__header-left {
          text-align: left;
        }

        .projects-section__label {
          display: inline-block;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-primary);
          margin-bottom: 16px;
        }

        .projects-section__header-right {
          text-align: left;
          padding-bottom: 8px;
        }

        .projects-section__header-right p {
          color: var(--color-text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        /* Project list */
        .projects-section__list {
          display: flex;
          flex-direction: column;
          gap: 200px;
        }

        /* Project Card — full width, asymmetric */
        .pcard {
          position: relative;
          display: grid;
          align-items: center;
          padding: 0 clamp(24px, 5vw, 80px);
        }

        .pcard--left {
          grid-template-columns: 1.4fr 1fr;
          gap: 80px;
        }

        .pcard--right {
          grid-template-columns: 1fr 1.4fr;
          gap: 80px;
        }

        .pcard--right .pcard__visual {
          order: 2;
        }

        .pcard--right .pcard__info {
          order: 1;
          padding-left: clamp(20px, 4vw, 80px);
        }

        .pcard--left .pcard__info {
          padding-right: clamp(20px, 3vw, 40px);
        }

        /* Background number */
        .pcard__bg-number {
          position: absolute;
          font-family: var(--font-heading);
          font-size: clamp(12rem, 20vw, 22rem);
          font-weight: 700;
          line-height: 1;
          pointer-events: none;
          z-index: 0;
          user-select: none;
        }

        .pcard--left .pcard__bg-number {
          right: 5%;
          top: -15%;
        }

        .pcard--right .pcard__bg-number {
          left: 5%;
          top: -15%;
        }

        /* Image */
        .pcard__visual {
          position: relative;
          z-index: 1;
        }

        .pcard__image-link {
          display: block;
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          aspect-ratio: 16 / 11;
        }

        .pcard__image-container {
          width: 100%;
          height: 120%;
          position: absolute;
          top: -10%;
        }

        .pcard__image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .pcard__image-link:hover .pcard__image {
          transform: scale(1.08);
        }

        .pcard__image-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: 2;
        }

        .pcard__image-overlay span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          padding: 12px 28px;
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: var(--radius-full);
          backdrop-filter: blur(8px);
          transform: translateY(10px);
          transition: transform 0.4s ease;
        }

        .pcard__image-link:hover .pcard__image-overlay {
          opacity: 1;
        }

        .pcard__image-link:hover .pcard__image-overlay span {
          transform: translateY(0);
        }

        .pcard__image-border {
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          border: 1px solid transparent;
          transition: border-color 0.4s ease;
          z-index: 3;
          pointer-events: none;
        }

        .pcard__image-link:hover .pcard__image-border {
          border-color: inherit;
        }

        /* Info */
        .pcard__info {
          position: relative;
          z-index: 1;
        }

        .pcard__info-inner {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pcard__meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pcard__number {
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .pcard__divider {
          width: 32px;
          height: 1px;
          background: var(--color-border);
        }

        .pcard__category {
          font-size: 0.85rem;
          color: var(--color-text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        .pcard__title {
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }

        .pcard__description {
          color: var(--color-text-secondary);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 420px;
        }

        .pcard__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .pcard__actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .projects-section__header-inner {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .projects-section__header-right {
            max-width: 500px;
          }
        }

        @media (max-width: 900px) {
          .pcard--left,
          .pcard--right {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .pcard--right .pcard__visual { order: 0; }
          .pcard--right .pcard__info { order: 0; padding-left: 0; }
          .pcard--left .pcard__info { padding-right: 0; }

          .projects-section__list { gap: 100px; }
          .pcard__bg-number { display: none; }

          .pcard__description {
            max-width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
