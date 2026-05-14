'use client';

import Link from 'next/link';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { getWhatsAppUrl, getInstagramUrl } from '@/data/contact';


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__row">
          <div className="footer__col footer__col--brand">
            <img src="/logo/logo.png" alt="TRIUM" className="footer__logo" />
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
            © {new Date().getFullYear()} TRIUM — Volta Redonda, RJ
          </p>
        </div>
      </div>
    </footer>
  );
}
