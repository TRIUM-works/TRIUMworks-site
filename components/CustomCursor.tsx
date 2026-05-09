'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isProject, setIsProject] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Less delay: higher stiffness + damping
  const cursorX = useSpring(0, { damping: 50, stiffness: 800, mass: 0.1 });
  const cursorY = useSpring(0, { damping: 50, stiffness: 800, mass: 0.1 });

  // Spotlight follows with slightly more lag for organic feel
  const glowX = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });
  const glowY = useSpring(0, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches
    ) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      glowX.set(e.clientX);
      glowY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const isInteractive = (target: HTMLElement) =>
      target.tagName === 'A' ||
      target.tagName === 'BUTTON' ||
      target.closest('a') ||
      target.closest('button') ||
      target.dataset.cursorHover;

    const isProjectTarget = (target: HTMLElement) =>
      target.dataset?.cursorVariant === 'project' ||
      !!target.closest('[data-cursor-variant="project"]');

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isProjectTarget(target)) {
        setIsProject(true);
        setIsHovering(false);
        return;
      }
      if (isInteractive(target)) {
        setIsHovering(true);
        setIsProject(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isProjectTarget(target)) {
        setIsProject(false);
        return;
      }
      if (isInteractive(target)) {
        setIsHovering(false);
        setIsProject(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, glowX, glowY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Small dot cursor */}
      <motion.div
        className={`custom-cursor${isProject ? ' custom-cursor--project' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isProject ? 5 : isHovering ? 3.5 : 1,
        }}
        transition={{ scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
      />

      {/* Outer ring */}
      <motion.div
        className={`custom-cursor-ring${isProject ? ' custom-cursor-ring--project' : ''}`}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: isProject ? 1.8 : isHovering ? 1.5 : 1,
          opacity: isProject ? 0 : isHovering ? 0 : isVisible ? 0.4 : 0,
        }}
        transition={{ scale: { duration: 0.3 }, opacity: { duration: 0.2 } }}
      />

      {/* Large spotlight glow — hero gets data-cursor-glow="strong" */}
      <motion.div
        className="custom-cursor-glow"
        style={{
          x: glowX,
          y: glowY,
          opacity: isVisible && !isProject ? 1 : 0,
        }}
      />

      <style jsx global>{`
        .custom-cursor {
          position: fixed;
          top: -5px;
          left: -5px;
          width: 10px;
          height: 10px;
          background: var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: var(--z-cursor);
          transition: background-color 0.25s ease, mix-blend-mode 0s;
        }

        /* Negative-color effect over project cards */
        .custom-cursor--project {
          background: #ffffff;
          mix-blend-mode: difference;
        }

        .custom-cursor-ring {
          position: fixed;
          top: -18px;
          left: -18px;
          width: 36px;
          height: 36px;
          border: 1.5px solid var(--color-primary);
          border-radius: 50%;
          pointer-events: none;
          z-index: var(--z-cursor);
        }

        .custom-cursor-ring--project {
          border-color: #ffffff;
          mix-blend-mode: difference;
        }

        .custom-cursor-glow {
          position: fixed;
          top: -250px;
          left: -250px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(1, 205, 174, 0.07) 0%, rgba(1, 205, 174, 0.02) 40%, transparent 70%);
          pointer-events: none;
          z-index: 1;
          will-change: transform;
        }

        @media (pointer: coarse), (hover: none) {
          .custom-cursor,
          .custom-cursor-ring,
          .custom-cursor-glow {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
