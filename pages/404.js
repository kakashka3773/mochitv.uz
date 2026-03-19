import Link from "next/link";
import Image from "next/image";

export default function Custom404() {
  return (
    <div className="error-page">
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>
      <div className="bg-text">404</div>

      <div className="card">
        <div className="image-wrap">
         <img
  src="/assets/404-girl.png"
  width="300"
  height="300"
  alt="404 anime"
/>
        </div>

        {/* Xato bermasligi uchun gradientni to'g'ridan to'g'ri style ichida yozdik */}
        <h1 
          className="title" 
          style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #a5a5b0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Sahifa topilmadi
        </h1>
        
        <p className="desc">
          Kechirasiz, siz qidirayotgan sahifa yo‘q, o‘chirilgan yoki manzil noto‘g‘ri kiritilgan.
        </p>

      <div
  style={{
    display: "flex",
    justifyContent: "center",
    marginTop: "30px"
  }}
>
  <Link
    href="/"
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      padding: "12px 22px",
      borderRadius: "12px",
      background: "linear-gradient(135deg,#ff2e63,#ff4d6d)",
      color: "#ffffff",
      fontWeight: "600",
      fontSize: "15px",
      textDecoration: "none",
      boxShadow: "0 8px 20px rgba(255,46,99,0.4)",
      transition: "all 0.25s ease",
      cursor: "pointer"
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        display: "block"
      }}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>

    <span>Bosh sahifaga qaytish</span>
  </Link>
</div>
      </div>

      {/* Faqat bitta xavfsiz style jsx ishlatildi */}
      <style jsx>{`
        :global(body), :global(html) {
          margin: 0;
          padding: 0;
          background-color: #050505;
        }

        :global(*) {
          box-sizing: border-box;
        }

        .error-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #050505;
          overflow: hidden;
          position: relative;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .bg-text {
          position: absolute;
          font-size: 35vw;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.02);
          z-index: 0;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          user-select: none;
        }

        .bg-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          z-index: 0;
          opacity: 0.6;
          animation: pulse 8s ease-in-out infinite alternate;
        }

        .bg-glow-1 {
          width: 300px;
          height: 300px;
          background: #5865F2;
          top: -5%;
          left: -5%;
        }

        .bg-glow-2 {
          width: 280px;
          height: 280px;
          background: #FF69B4;
          bottom: -5%;
          right: -5%;
          animation-delay: -4s;
        }

        .card {
          position: relative;
          z-index: 1;
          width: 100%;
          border-radius: 32px;
          padding: 40px 30px;
          text-align: center;
          transform: translateY(0);
        }

        .image-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .girl-image {
          width: 100%;
          max-width: 320px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 20px 30px rgba(0, 0, 0, 0.5));
          pointer-events: none;
          user-select: none;
          animation: float 6s ease-in-out infinite;
        }

        .title {
          margin: 0 0 12px;
          font-size: 42px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }

        .desc {
          max-width: 440px;
          margin: 0 auto 32px;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
        }

        .actions {
          display: flex;
          justify-content: center;
        }

        .home-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          min-height: 54px;
          padding: 0 28px;
          border-radius: 16px;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          color: white;
          background: linear-gradient(135deg, #4f8cff 0%, #ff69b4 100%);
          box-shadow: 0 12px 30px rgba(79, 140, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
        }

        .home-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(79, 140, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          filter: brightness(1.1);
        }

        .home-btn:active {
          transform: translateY(1px) scale(0.98);
        }

        .icon {
          transition: transform 0.3s ease;
        }

        .home-btn:hover .icon {
          transform: scale(1.1) translateX(-2px);
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.2); opacity: 0.8; }
        }

        @keyframes cardAppear {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (max-width: 640px) {
          .card {
            border-radius: 28px;
            padding: 30px 20px;
          }
          .title {
            font-size: 32px;
          }
          .desc {
            font-size: 15px;
          }
          .home-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}