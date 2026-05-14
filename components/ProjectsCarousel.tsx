'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { projects } from '@/data/projects';
import { FaArrowRight, FaExternalLinkAlt } from 'react-icons/fa';

export default function ProjectsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const isDragging = useRef(false);
  const lastWheel = useRef(0);

  useEffect(() => {
    const check = () =>
      setIsMobile(
        window.innerWidth <= 768 || window.matchMedia('(pointer: coarse)').matches,
      );
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) (footer as HTMLElement).style.display = 'none';
    document.body.style.overflow = 'hidden';
    return () => {
      if (footer) (footer as HTMLElement).style.display = '';
      document.body.style.overflow = '';
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const len = projects.length;
      const normalized = ((index % len) + len) % len;
      setActiveIndex(normalized);
      animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    },
    [dragX],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  useEffect(() => {
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheel.current < 600) return;
      lastWheel.current = now;
      if (e.deltaY > 0 || e.deltaX > 0) goNext();
      else if (e.deltaY < 0 || e.deltaX < 0) goPrev();
    };
    window.addEventListener('wheel', handler, { passive: false });
    return () => window.removeEventListener('wheel', handler);
  }, [goNext, goPrev]);

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 50;
    const vThreshold = 300;
    if (info.offset.x < -threshold || info.velocity.x < -vThreshold) {
      goNext();
    } else if (info.offset.x > threshold || info.velocity.x > vThreshold) {
      goPrev();
    } else {
      animate(dragX, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  };

  const getCardStyle = (index: number) => {
    const len = projects.length;
    let diff = index - activeIndex;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;

    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateZ: 0,
        zIndex: 10,
        opacity: 1,
        filter: 'brightness(1) blur(0px)',
      };
    }

    const side = diff > 0 ? 1 : -1;
    const absDiff = Math.abs(diff);

    if (absDiff > 2) {
      return {
        x: side * (isMobile ? 180 : 360),
        y: 0,
        scale: 0.55,
        rotateZ: side * 12,
        zIndex: 0,
        opacity: 0,
        filter: 'brightness(0.4) blur(8px)',
      };
    }

    const baseOffset = isMobile ? 90 : 165;
    const stepOffset = isMobile ? 55 : 110;

    return {
      x: side * (baseOffset + (absDiff - 1) * stepOffset),
      y: absDiff * 10,
      scale: 1 - absDiff * 0.13,
      rotateZ: side * (absDiff * 6),
      zIndex: 10 - absDiff,
      opacity: absDiff === 1 ? 0.6 : 0.18,
      filter: `brightness(${1 - absDiff * 0.25}) blur(${absDiff * 1.5}px)`,
    };
  };

  const project = projects[activeIndex];
  const activeDragRotate = useTransform(dragX, [-200, 0, 200], [-8, 0, 8]);

  return (
    <section className="pc-page" ref={containerRef}>
      <motion.div
        className="pc-page__cards"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.15}
        style={{ x: dragX }}
        onDragStart={() => { isDragging.current = true; }}
        onDragEnd={(e, info) => {
          isDragging.current = false;
          handleDragEnd(e, info);
        }}
      >
        {projects.map((p, i) => {
          const style = getCardStyle(i);
          const isActive = i === activeIndex;

          return (
            <motion.div
              key={p.slug}
              className={`pc-card ${isActive ? 'pc-card--active' : ''}`}
              animate={{
                x: style.x,
                y: style.y,
                scale: style.scale,
                rotateZ: style.rotateZ,
                opacity: style.opacity,
              }}
              style={{
                zIndex: style.zIndex,
                filter: style.filter,
                ...(isActive ? { rotateZ: activeDragRotate } : {}),
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
            >
              <div className="pc-card__img-wrap">
                <div
                  className="pc-card__img"
                  style={{ backgroundImage: `url(${p.images.thumbnail})` }}
                />
                <div className="pc-card__shine" />
                <div
                  className="pc-card__edge"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${p.color}80 50%, transparent 100%)`,
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`info-${activeIndex}`}
          className="pc-page__info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="pc-page__title">{project.title}</h2>
          <div className="pc-page__actions">
            <Link href={`/projetos/${project.slug}`} className="btn-primary pc-page__btn">
              Explorar <FaArrowRight size={12} />
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline pc-page__btn"
            >
              Visitar site <FaExternalLinkAlt size={10} />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="pc-page__dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`pc-page__dot ${i === activeIndex ? 'pc-page__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ir para projeto ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        className="pc-page__hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="pc-page__hint-icon">
          <motion.div
            animate={{ x: [0, -6, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
        <span>Deslize para ver mais</span>
      </motion.div>

      {!isMobile && (
        <>
          <button
            className="pc-page__arrow pc-page__arrow--left"
            onClick={goPrev}
            aria-label="Projeto anterior"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="pc-page__arrow pc-page__arrow--right"
            onClick={goNext}
            aria-label="Próximo projeto"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
