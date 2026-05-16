'use client';

export default function BackgroundLights() {
  return (
    <>
      <svg
        className="bg-filters"
        aria-hidden="true"
        focusable="false"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="chalk-grain" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.85"
              numOctaves="2"
              seed="3"
              stitchTiles="stitch"
            />
            <feDisplacementMap in="SourceGraphic" scale="6" />
            <feGaussianBlur stdDeviation="0.4" />
          </filter>
        </defs>
      </svg>

      <div className="bg-lights" aria-hidden="true">
        <div className="bg-chalk bg-chalk--1" />
        <div className="bg-chalk bg-chalk--2" />
        <div className="bg-chalk bg-chalk--3" />
        <div className="bg-chalk bg-chalk--4" />
        <div className="bg-chalk bg-chalk--5" />
        <div className="bg-chalk bg-chalk--6" />
        <div className="bg-chalk bg-chalk--teal" />
      </div>
    </>
  );
}
