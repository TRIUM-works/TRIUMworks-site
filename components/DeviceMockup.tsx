'use client';

import { motion } from 'framer-motion';

interface DeviceMockupProps {
  type: 'desktop' | 'mobile';
  src: string;
  alt?: string;
  className?: string;
}

export default function DeviceMockup({ type, src, alt = '', className = '' }: DeviceMockupProps) {
  if (type === 'desktop') {
    return (
      <div className={`mockup-desktop ${className}`}>
        <div className="mockup-desktop__header">
          <div className="mockup-desktop__dots">
            <span />
            <span />
            <span />
          </div>
          <div className="mockup-desktop__bar" />
        </div>
        <div className="mockup-desktop__screen">
          <img src={src} alt={alt} loading="lazy" />
        </div>

        <style jsx>{`
          .mockup-desktop {
            background: #1a1a1a;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255,255,255,0.08);
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          }
          .mockup-desktop__header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 14px;
            background: #111;
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
          .mockup-desktop__dots {
            display: flex;
            gap: 6px;
          }
          .mockup-desktop__dots span {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #333;
          }
          .mockup-desktop__dots span:first-child { background: #ff5f57; }
          .mockup-desktop__dots span:nth-child(2) { background: #febc2e; }
          .mockup-desktop__dots span:nth-child(3) { background: #28c840; }
          .mockup-desktop__bar {
            flex: 1;
            height: 24px;
            background: #222;
            border-radius: 6px;
          }
          .mockup-desktop__screen {
            overflow: hidden;
          }
          .mockup-desktop__screen img {
            width: 100%;
            display: block;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`mockup-mobile ${className}`}>
      <div className="mockup-mobile__notch" />
      <div className="mockup-mobile__screen">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      <div className="mockup-mobile__bar" />

      <style jsx>{`
        .mockup-mobile {
          background: #1a1a1a;
          border-radius: 28px;
          overflow: hidden;
          border: 3px solid #2a2a2a;
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          padding: 8px;
          position: relative;
          max-width: 220px;
        }
        .mockup-mobile__notch {
          width: 80px;
          height: 20px;
          background: #1a1a1a;
          border-radius: 0 0 14px 14px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        .mockup-mobile__screen {
          border-radius: 20px;
          overflow: hidden;
          margin-top: -8px;
        }
        .mockup-mobile__screen img {
          width: 100%;
          display: block;
        }
        .mockup-mobile__bar {
          width: 100px;
          height: 4px;
          background: #333;
          border-radius: 4px;
          margin: 8px auto 4px;
        }
      `}</style>
    </div>
  );
}
