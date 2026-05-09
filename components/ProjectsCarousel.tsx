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

  // Hide footer when this page is mounted
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) (footer as HTMLElement).style.display = 'none';
    // Also prevent body scroll so wheel doesn't leak
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

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  // Scroll/wheel to navigate (throttled) — on the whole window
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

  // Drag end handler — one project per swipe
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

  // Card positions and styles — circular (infinite) with shortest-path diff
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

    // Hide cards beyond 2 positions on either side
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

    // Tighter visible window: 2 cards each side, fading to 0 at the edge
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

      {/* Cards Stack */}
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

      {/* Project info — title + buttons only */}
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

      {/* Dot navigation */}
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

      {/* Hint text */}
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

      {/* Nav arrows (desktop) */}
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

      <style jsx global>{`
        /* ============================================
           PROJECTS CAROUSEL PAGE
           ============================================ */
        .pc-page {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: transparent;
          user-select: none;
          touch-action: pan-y;
        }

        .pc-page__glow {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
          z-index: 0;
        }

        /* ---- Cards container ---- */
        .pc-page__cards {
          position: relative;
          width: 100%;
          height: clamp(220px, 38vh, 380px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          cursor: grab;
          touch-action: none;
        }

        .pc-page__cards:active {
          cursor: grabbing;
        }

        /* ---- Individual card ---- */
        .pc-card {
          position: absolute;
          width: clamp(180px, 28vw, 370px);
          aspect-ratio: 4 / 5;
          border-radius: clamp(14px, 1.8vw, 20px);
          overflow: hidden;
          will-change: transform, opacity;
          pointer-events: none;
        }

        .pc-card--active {
          pointer-events: auto;
        }

        .pc-card__img-wrap {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: inherit;
          overflow: hidden;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.06),
            inset 0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        .pc-card__img {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: top center;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .pc-card--active:hover .pc-card__img {
          transform: scale(1.05);
        }

        .pc-card__shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.08) 0%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.02) 100%
          );
          pointer-events: none;
        }

        .pc-card__edge {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 3;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .pc-card--active .pc-card__edge {
          opacity: 1;
        }

        /* ---- Project info ---- */
        .pc-page__info {
          position: relative;
          z-index: 3;
          text-align: center;
          margin-top: clamp(52px, 8vh, 84px);
          padding: 0 24px;
        }

        .pc-page__title {
          font-family: var(--font-heading);
          font-size: clamp(1.2rem, 2vw, 1.8rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--color-text);
          margin-bottom: 16px;
        }

        .pc-page__actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .pc-page__btn {
          font-size: 0.85rem;
          padding: 12px 24px;
        }

        /* ---- Dots ---- */
        .pc-page__dots {
          position: absolute;
          bottom: clamp(60px, 9vh, 90px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          z-index: 5;
        }

        .pc-page__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1.5px solid rgba(255, 255, 255, 0.2);
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }

        .pc-page__dot--active {
          background: var(--color-primary);
          border-color: var(--color-primary);
          box-shadow: 0 0 10px rgba(1, 205, 174, 0.4);
          width: 24px;
          border-radius: 10px;
        }

        .pc-page__dot:hover:not(.pc-page__dot--active) {
          border-color: rgba(255, 255, 255, 0.5);
        }

        /* ---- Hint text ---- */
        .pc-page__hint {
          position: absolute;
          bottom: clamp(20px, 4vh, 40px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 5;
          color: var(--color-text-secondary);
          font-size: 0.8rem;
          font-family: var(--font-body);
          letter-spacing: 0.06em;
          opacity: 0.6;
          white-space: nowrap;
        }

        .pc-page__hint-icon {
          display: flex;
          align-items: center;
          color: var(--color-primary);
          opacity: 0.7;
        }

        /* ---- Navigation arrows ---- */
        .pc-page__arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(10, 10, 10, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--color-text);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pc-page__arrow--left {
          left: clamp(16px, 3vw, 48px);
        }

        .pc-page__arrow--right {
          right: clamp(16px, 3vw, 48px);
        }

        .pc-page__arrow:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          box-shadow: 0 0 20px rgba(1, 205, 174, 0.15);
          transform: translateY(-50%) scale(1.08);
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .pc-page__cards {
            height: clamp(160px, 30vh, 240px);
          }

          .pc-card {
            width: clamp(140px, 48vw, 240px);
          }

          .pc-page__info {
            margin-top: 16px;
          }

          .pc-page__title {
            font-size: 1.4rem;
          }

          .pc-page__actions {
            gap: 8px;
          }

          .pc-page__btn {
            font-size: 0.78rem;
            padding: 10px 18px;
          }

          .pc-page__dots {
            bottom: 50px;
          }

          .pc-page__hint {
            bottom: 16px;
            font-size: 0.72rem;
          }
        }

        @media (max-width: 480px) {
          .pc-card {
            width: clamp(130px, 52vw, 220px);
          }
        }

        /* ---- Reduced motion ---- */
        @media (prefers-reduced-motion: reduce) {
          .pc-card,
          .pc-page__info,
          .pc-page__glow {
            transition: none !important;
          }
        }

        /* Mobile cursor fix */
        @media (pointer: coarse), (hover: none) {
          .pc-page__arrow,
          .pc-page__dot,
          .pc-page__btn,
          .pc-page__cards {
            cursor: auto;
          }
        }
      `}</style>
    </section>
  );
}
