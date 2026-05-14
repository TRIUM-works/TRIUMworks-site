'use client';

import { use, useRef } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

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

export default function ProjetoContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === resolvedParams.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="projeto-page">
      <section className="pj-hero">
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

      <section className="pj-showcase">
        <div className="pj-showcase__inner">
          <ShowcaseLayout project={project} />
        </div>
      </section>

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
    </div>
  );
}
