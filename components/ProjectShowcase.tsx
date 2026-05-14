'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [isMobile, setIsMobile] = useState(true);

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
      <motion.div
        className="pcard__glow"
        style={isMobile ? { background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 70%)` } : { y: imgY, background: `radial-gradient(ellipse at center, ${project.color}10 0%, transparent 70%)` }}
      />

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
            <div className="pcard__screen-edge" style={{ background: `linear-gradient(90deg, transparent 0%, ${project.color}80 50%, transparent 100%)` }} />
          </motion.div>
        </Link>
      </div>

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
    </section>
  );
}
