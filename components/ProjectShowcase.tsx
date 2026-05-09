'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isMobile, setIsMobile] = useState(true); // default true to prevent hydration mismatch flashes of weird 3d

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(
        window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches,
      );
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const cardY = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [40, 0, 0, 0, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.9, 1, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      className="pcard"
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Glow accent behind image */}
      <motion.div
        className="pcard__glow"
        style={isMobile ? { background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 70%)` } : { y: imgY, background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 70%)` }}
      />

      {/* Perspective image wrapper */}
      <div className="pcard__perspective-wrap">
        <Link
          href={`/projetos/${project.slug}`}
          data-cursor-variant="project"
          style={{ display: 'block', cursor: 'none' }}
        >
          <motion.div
            className="pcard__screen"
            style={isMobile ? {} : { y: imgY, rotateX, scale }}
          >
            <div
              className="pcard__screen-image"
              style={{ backgroundImage: `url(${project.images.thumbnail})` }}
            />
            <div className="pcard__screen-shine" />
            {/* Top edge accent line */}
            <div className="pcard__screen-edge" style={{ background: `linear-gradient(90deg, transparent 0%, ${project.color}80 50%, transparent 100%)` }} />
          </motion.div>
        </Link>
      </div>

      {/* Info card — centered below */}
      <motion.div
        className="pcard__info-card"
        style={isMobile ? {} : { y: cardY }}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.25 }}
      >
        <div className="pcard__info-top">
          <h3 className="pcard__title">{project.title}</h3>
          <div className="pcard__tags">
            {project.tags.map((tag) => (
              <span key={tag} className="pcard__tag">{tag}</span>
            ))}
          </div>
        </div>
        <div className="pcard__info-bottom">
          <Link href={`/projetos/${project.slug}`} className="pcard__btn pcard__btn--explore">
            Explorar <FaArrowRight size={10} />
          </Link>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="pcard__btn pcard__btn--visit">
            Visitar site <FaExternalLinkAlt size={9} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectShowcase() {
  return (
    <section className="projects-section" id="projetos">
      <div className="projects-section__list">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <style jsx global>{`
        .projects-section {
          padding: clamp(60px, 10vw, 120px) 0 clamp(80px, 12vw, 140px);
          position: relative;
        }

        .projects-section__list {
          display: flex;
          flex-direction: column;
          gap: clamp(60px, 8vw, 100px);
          align-items: center;
        }

        /* ---- Project Card ---- */
        .pcard {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: min(1150px, 90vw, 140vh);
          margin: 0 auto;
          position: relative;
          padding: 0 clamp(12px, 3vw, 40px);
        }

        /* Subtle glow behind */
        .pcard__glow {
          position: absolute;
          width: 70%;
          height: 60%;
          top: 10%;
          left: 15%;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
          opacity: 0.6;
        }

        /* Perspective wrapper */
        .pcard__perspective-wrap {
          width: 100%;
          perspective: 1200px;
          position: relative;
          z-index: 1;
        }

        /* Screen with 3D tilt + rounded shape */
        .pcard__screen {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          border-radius: clamp(16px, 2vw, 24px);
          overflow: hidden;
          transition: filter 0.5s ease, box-shadow 0.5s ease;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.04),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        @media (hover: hover) {
          .pcard:hover .pcard__screen {
            filter: brightness(0.85) saturate(0.8);
            box-shadow:
              0 40px 100px rgba(0, 0, 0, 0.6),
              0 0 0 1px rgba(255, 255, 255, 0.1),
              inset 0 0 0 1px rgba(255, 255, 255, 0.1);
          }
        }

        .pcard__screen-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: top center;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Top edge accent */
        .pcard__screen-edge {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        @media (hover: hover) {
          .pcard:hover .pcard__screen-edge {
            opacity: 1;
          }
        }

        /* Subtle shine overlay */
        .pcard__screen-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.05) 0%,
            transparent 35%,
            transparent 65%,
            rgba(255, 255, 255, 0.015) 100%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* ---- Info Card (centered below image) ---- */
        .pcard__info-card {
          position: relative;
          z-index: 2;
          margin-top: clamp(-44px, -6vw, -80px);
          background: rgba(10, 10, 10, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: clamp(12px, 1.2vw, 16px);
          padding: clamp(20px, 4cqi, 32px) clamp(24px, 5cqi, 40px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(20px, 4cqi, 32px);
          width: clamp(80%, 85%, 90%);
          max-width: 860px;
          container-type: inline-size;
          transition: border-color 0.4s ease, transform 0.4s ease, box-shadow 0.4s ease;
        }

        @media (hover: hover) {
          .pcard:hover .pcard__info-card {
            border-color: rgba(1, 205, 174, 0.18);
            transform: translateY(-3px);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
          }
        }

        .pcard__info-top {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
          min-width: 0;
        }

        .pcard__title {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 4cqi, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--color-text);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pcard__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
        }

        .pcard__tag {
          display: inline-block;
          padding: clamp(3px, 0.5cqi, 5px) clamp(8px, 1.5cqi, 14px);
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.07);
          font-size: clamp(0.65rem, 1.2cqi, 0.85rem);
          font-family: var(--font-body);
          font-weight: 500;
          color: var(--color-text-secondary);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          transition: all var(--transition-fast);
        }

        @media (hover: hover) {
          .pcard:hover .pcard__tag {
            border-color: rgba(1, 205, 174, 0.12);
            color: rgba(1, 205, 174, 0.65);
          }
        }

        .pcard__info-bottom {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .pcard__btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: clamp(10px, 1.5cqi, 14px) clamp(18px, 3cqi, 26px);
          border-radius: var(--radius-full);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: clamp(0.75rem, 1.5cqi, 0.95rem);
          transition: all var(--transition-base);
          white-space: nowrap;
          cursor: none;
        }

        .pcard__btn--explore {
          background: var(--color-primary);
          color: #000;
          border: none;
        }

        .pcard__btn--explore:hover {
          box-shadow: 0 4px 20px rgba(1, 205, 174, 0.3);
          transform: translateY(-1px);
        }

        .pcard__btn--visit {
          background: transparent;
          color: var(--color-text-secondary);
          border: 1px solid var(--color-border);
        }

        .pcard__btn--visit:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-1px);
        }

        /* ---- Responsive ---- */

        /* Smaller desktops / laptops (19" monitors ~1366-1440px) */
        @media (max-width: 1440px) {
          .pcard {
            max-width: min(900px, 85vw);
          }
        }

        @media (max-width: 1024px) {
          .pcard {
            max-width: min(800px, 90vw);
          }

          .pcard__info-card {
            width: 88%;
          }
        }

        @media (max-width: 900px) {
          .projects-section__list {
            gap: 80px;
          }

          .pcard__info-card {
            flex-direction: column;
            align-items: flex-start;
            width: 92%;
            gap: 14px;
          }

          .pcard__info-bottom {
            width: 100%;
          }

          .pcard__btn {
            flex: 1;
            justify-content: center;
          }

          .pcard__title {
            white-space: normal;
          }
        }

        /* Lighter blur on touch — backdrop-filter is GPU-expensive on mobile */
        @media (hover: none), (pointer: coarse), (max-width: 768px) {
          .pcard__info-card {
            background: rgba(10, 10, 10, 0.94);
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .pcard__btn {
            cursor: pointer;
          }
        }

        @media (max-width: 480px) {
          .projects-section__list {
            gap: 60px;
          }

          .pcard__info-card {
            width: 95%;
            margin-top: -24px;
            padding: 14px 18px;
          }

          .pcard__title {
            font-size: 1rem;
          }

          .pcard__tag {
            font-size: 0.6rem;
            padding: 3px 8px;
          }

          .pcard__btn {
            font-size: 0.75rem;
            padding: 10px 14px;
          }

          .pcard__glow {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
