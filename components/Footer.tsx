'use client';

import Link from 'next/link';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="/images/logo.png" alt="TriumTech" className="footer__logo" />
            <p className="footer__tagline">
              Criação de sites profissionais que transformam negócios.
            </p>
          </div>

          <div className="footer__links">
            <h4>Navegação</h4>
            <Link href="/">Home</Link>
            <Link href="/sobre">Sobre</Link>
            <Link href="/contato">Contato</Link>
          </div>

          <div className="footer__social">
            <h4>Redes</h4>
            <div className="footer__social-links">
              <a
                href="https://wa.me/5585981254006"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="https://www.instagram.com/triumtech_/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} TriumTech. Todos os direitos reservados.</p>
        </div>
      </div>

      <style jsx global>{`
        .footer {
          border-top: 1px solid var(--color-border);
          padding: 60px 0 30px;
          margin-top: 40px;
        }

        .footer__inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer__logo {
          height: 28px;
          width: auto;
          margin-bottom: 12px;
        }

        .footer__tagline {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          max-width: 300px;
        }

        .footer__links h4,
        .footer__social h4 {
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--color-text-secondary);
          margin-bottom: 16px;
        }

        .footer__links a {
          display: block;
          color: var(--color-text-body);
          font-size: 0.9rem;
          padding: 4px 0;
          transition: color var(--transition-fast);
        }

        .footer__links a:hover {
          color: var(--color-primary);
        }

        .footer__social-links {
          display: flex;
          gap: 12px;
        }

        .footer__social-links a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          transition: all var(--transition-base);
        }

        .footer__social-links a:hover {
          border-color: var(--color-primary);
          color: var(--color-primary);
          transform: translateY(-2px);
        }

        .footer__bottom {
          padding-top: 24px;
          border-top: 1px solid var(--color-border);
          text-align: center;
        }

        .footer__bottom p {
          font-size: 0.8rem;
          color: var(--color-text-secondary);
        }

        @media (max-width: 768px) {
          .footer__inner {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .footer__tagline {
            margin: 0 auto;
          }
          .footer__social-links {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
}
