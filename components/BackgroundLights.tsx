'use client';

export default function BackgroundLights() {
  return (
    <>
      <div className="bg-lights" aria-hidden="true">
        {/* Top-right cluster */}
        <div className="bg-light bg-light--1" />
        {/* Mid-left  */}
        <div className="bg-light bg-light--2" />
        {/* Center-low */}
        <div className="bg-light bg-light--3" />
        {/* Bottom-right */}
        <div className="bg-light bg-light--4" />
        {/* Far bottom-left */}
        <div className="bg-light bg-light--5" />
        {/* Very top-left accent */}
        <div className="bg-light bg-light--6" />
        {/* Mid-right soft fill */}
        <div className="bg-light bg-light--7" />
      </div>

      <style jsx global>{`
        .bg-lights {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .bg-light {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
        }

        /* ---- Orb 1: top-right, large ---- */
        .bg-light--1 {
          width: 900px;
          height: 900px;
          top: -10%;
          right: -8%;
          background: radial-gradient(
            circle,
            rgba(1, 205, 174, 0.08) 0%,
            rgba(1, 205, 174, 0.03) 35%,
            transparent 70%
          );
          filter: blur(80px);
          animation: bgFloat1 20s ease-in-out infinite;
        }

        /* ---- Orb 2: mid-left ---- */
        .bg-light--2 {
          width: 700px;
          height: 700px;
          top: 30%;
          left: -12%;
          background: radial-gradient(
            circle,
            rgba(0, 229, 195, 0.07) 0%,
            rgba(0, 229, 195, 0.02) 40%,
            transparent 70%
          );
          filter: blur(100px);
          animation: bgFloat2 25s ease-in-out infinite;
        }

        /* ---- Orb 3: center-low ---- */
        .bg-light--3 {
          width: 600px;
          height: 600px;
          top: 55%;
          left: 35%;
          background: radial-gradient(
            circle,
            rgba(1, 205, 174, 0.06) 0%,
            rgba(1, 205, 174, 0.015) 45%,
            transparent 70%
          );
          filter: blur(90px);
          animation: bgFloat3 22s ease-in-out infinite;
        }

        /* ---- Orb 4: bottom-right ---- */
        .bg-light--4 {
          width: 800px;
          height: 800px;
          bottom: -15%;
          right: -5%;
          background: radial-gradient(
            circle,
            rgba(0, 229, 195, 0.07) 0%,
            rgba(0, 229, 195, 0.025) 35%,
            transparent 70%
          );
          filter: blur(110px);
          animation: bgFloat1 28s ease-in-out infinite reverse;
        }

        /* ---- Orb 5: far bottom-left ---- */
        .bg-light--5 {
          width: 650px;
          height: 650px;
          bottom: 5%;
          left: -5%;
          background: radial-gradient(
            circle,
            rgba(1, 205, 174, 0.05) 0%,
            rgba(1, 205, 174, 0.015) 40%,
            transparent 70%
          );
          filter: blur(100px);
          animation: bgFloat2 18s ease-in-out infinite reverse;
        }

        /* ---- Orb 6: very top-left, small accent ---- */
        .bg-light--6 {
          width: 500px;
          height: 500px;
          top: -5%;
          left: 10%;
          background: radial-gradient(
            circle,
            rgba(1, 205, 174, 0.05) 0%,
            rgba(1, 205, 174, 0.015) 45%,
            transparent 70%
          );
          filter: blur(70px);
          animation: bgFloat3 16s ease-in-out infinite;
        }

        /* ---- Orb 7: mid-right soft fill ---- */
        .bg-light--7 {
          width: 550px;
          height: 550px;
          top: 70%;
          right: 15%;
          background: radial-gradient(
            circle,
            rgba(0, 229, 195, 0.045) 0%,
            rgba(0, 229, 195, 0.012) 40%,
            transparent 70%
          );
          filter: blur(90px);
          animation: bgFloat1 24s ease-in-out infinite;
        }

        /* ---- Float animations ---- */
        @keyframes bgFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25%  { transform: translate(30px, -20px) scale(1.05); }
          50%  { transform: translate(-15px, 25px) scale(0.97); }
          75%  { transform: translate(20px, 10px) scale(1.03); }
        }

        @keyframes bgFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%  { transform: translate(-25px, 15px) scale(1.08); }
          66%  { transform: translate(18px, -22px) scale(0.95); }
        }

        @keyframes bgFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%  { transform: translate(22px, 18px) scale(1.04); }
          70%  { transform: translate(-20px, -12px) scale(0.98); }
        }
      `}</style>
    </>
  );
}
