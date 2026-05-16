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
            <div className="footer__brand-row">
              <img src="/logo/trium-badge-teal.png" alt="" className="footer__badge" aria-hidden="true" />
              <img src="/logo/trium-wordmark.png" alt="TRIUM" className="footer__logo" />
            </div>
            <p className="footer__tagline">
              Soluções digitais feitas à mão. Pensadas para durar.
              <br />
              Volta Redonda, RJ.
            </p>
          </div>

          <nav className="footer__col footer__col--nav" aria-label="Rodapé">
            <span className="footer__col-title">Navegar</span>
            <Link href="/" className="footer__nav-link">Home</Link>
            <Link href="/projetos" className="footer__nav-link">Projetos</Link>
            <Link href="/sobre" className="footer__nav-link">Sobre</Link>
            <Link href="/contato" className="footer__nav-link">Contato</Link>
          </nav>

          <div className="footer__col footer__col--social">
            <span className="footer__col-title">Encontre-nos</span>
            <div className="footer__social-row">
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
        </div>

        <div className="footer__bottom-row">
          <p className="footer__copy">
            © {new Date().getFullYear()} TRIUM · Volta Redonda · RJ
          </p>
          <p className="footer__from">
            Feito à mão em Volta Redonda
          </p>
        </div>
      </div>
    </footer>
  );
}
