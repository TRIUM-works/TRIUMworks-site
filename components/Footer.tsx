'use client';

import Link from 'next/link';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { getWhatsAppUrl, getInstagramUrl } from '@/data/contact';


export default function Footer() {
  return (
    <footer className="footer">
      {/* Footer content */}
      <div className="footer__content">
        <div className="footer__row">
          <div className="footer__col footer__col--brand">
            <img src="/images/logo.png" alt="TriumTech" className="footer__logo" />
            <p className="footer__tagline">
              Criação de sites em Volta Redonda, RJ. Elevamos marcas ao próximo nível
              com experiências digitais sob medida.
            </p>
          </div>

          <nav className="footer__col footer__col--nav">
            <Link href="/" className="footer__nav-link">Home</Link>
            <Link href="/sobre" className="footer__nav-link">Sobre</Link>
            <Link href="/contato" className="footer__nav-link">Contato</Link>
          </nav>

          <div className="footer__col footer__col--social">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={16} />
            </a>
            <a
              href={getInstagramUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-btn"
              aria-label="Instagram"
            >
              <FaInstagram size={16} />
            </a>
          </div>
        </div>

        <div className="footer__bottom-row">
          <p className="footer__copy">
            © {new Date().getFullYear()} TriumTech — Volta Redonda, RJ · Médio Paraíba
          </p>
        </div>
      </div>

      <style jsx global>{`
        .footer {
          position: relative;
          margin-top: 0;
          overflow: hidden;
        }



        /* ---- Content area ---- */
        .footer__content {
          padding: 48px clamp(24px, 5vw, 80px) 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer__row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          margin-bottom: 48px;
        }

        .footer__col--brand {
          flex: 1;
          max-width: 320px;
        }

        .footer__logo {
          height: 26px;
          width: auto;
          margin-bottom: 14px;
          opacity: 0.8;
        }

        .footer__tagline {
          color: var(--color-text-secondary);
          font-size: 0.85rem;
          line-height: 1.6;
          opacity: 0.7;
        }

        /* Nav links as a horizontal row */
        .footer__col--nav {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-top: 4px;
        }

        .footer__nav-link {
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: 1px solid transparent;
          transition: all var(--transition-base);
          letter-spacing: 0.02em;
        }

        .footer__nav-link:hover {
          color: var(--color-text);
          border-color: var(--color-border);
          background: var(--color-glass);
        }

        /* Social icons */
        .footer__col--social {
          display: flex;
          align-items: center;
          gap: 8px;
          padding-top: 4px;
        }

        .footer__social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }

        .footer__social-btn:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          box-shadow: 0 0 16px var(--color-primary-glow);
          transform: translateY(-2px);
        }

        /* ---- Bottom row ---- */
        .footer__bottom-row {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 20px;
          border-top: 1px solid var(--color-border);
        }

        .footer__copy {
          font-size: 0.72rem;
          color: var(--color-text-secondary);
          opacity: 0.5;
          letter-spacing: 0.04em;
        }

        /* ---- Responsive ---- */
        @media (max-width: 768px) {
          .footer__row {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 28px;
          }

          .footer__col--brand {
            max-width: 260px;
          }

          .footer__col--nav {
            flex-wrap: wrap;
            justify-content: center;
          }

          .footer__col--social {
            justify-content: center;
          }

          .footer__bottom-row {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
