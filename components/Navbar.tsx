'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#projetos', label: 'Projetos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        <div className="navbar__inner container">
          <Link href="/" className="navbar__logo">
            <img src="/images/logo.png" alt="TriumTech" />
          </Link>

          <nav className="navbar__links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`navbar__link ${pathname === link.href ? 'navbar__link--active' : ''}`}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    className="navbar__link-indicator"
                    layoutId="navbar-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <button
            className={`navbar__hamburger ${isMobileOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav className="mobile-menu__nav">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="mobile-menu__link"
                    onClick={() => setIsMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: var(--z-navbar);
          padding: 20px 0;
          transition: all var(--transition-base);
        }

        .navbar--scrolled {
          padding: 12px 0;
          background: rgba(5, 5, 5, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--color-border);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar__logo img {
          height: 32px;
          width: auto;
          transition: transform var(--transition-fast);
        }

        .navbar__logo:hover img {
          transform: scale(1.05);
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .navbar__link {
          position: relative;
          padding: 8px 20px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          transition: color var(--transition-fast);
          border-radius: var(--radius-full);
        }

        .navbar__link:hover {
          color: var(--color-text);
        }

        .navbar__link--active {
          color: var(--color-text);
        }

        .navbar__link-indicator {
          position: absolute;
          inset: 0;
          background: rgba(1, 205, 174, 0.1);
          border: 1px solid rgba(1, 205, 174, 0.2);
          border-radius: var(--radius-full);
          z-index: -1;
        }

        /* Hamburger */
        .navbar__hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 8px;
          z-index: 1001;
        }

        .navbar__hamburger span {
          display: block;
          width: 24px;
          height: 2px;
          background: var(--color-text);
          border-radius: 2px;
          transition: all var(--transition-base);
          transform-origin: center;
        }

        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translateY(5px) translateX(5px);
        }
        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }
        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translateY(-5px) translateX(5px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(5, 5, 5, 0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-menu__nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mobile-menu__link {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 300;
          color: var(--color-text-secondary);
          transition: all var(--transition-fast);
          padding: 8px 0;
        }

        .mobile-menu__link:hover {
          color: var(--color-primary);
          transform: translateX(10px);
        }

        @media (max-width: 768px) {
          .navbar__links {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
