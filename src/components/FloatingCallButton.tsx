import { Phone } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <>
      <a
        href="tel:+36204378880"
        aria-label="Hívjon most: +36 20 437 8880"
        className="fcb fixed z-50 right-4 bottom-5 sm:right-5 sm:bottom-6 lg:right-6 lg:bottom-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold w-14 h-14 sm:w-auto sm:h-auto sm:px-5 sm:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <Phone size={20} className="shrink-0" />
        <span className="hidden sm:inline tabular-nums text-sm lg:text-base">+36 20 437 8880</span>
      </a>

      <style>{`
        .fcb {
          opacity: 0;
          transform: translateX(24px);
          animation: fcb-in 500ms cubic-bezier(0.22, 1, 0.36, 1) 400ms forwards;
          box-shadow: 0 8px 32px rgba(168, 85, 247, 0.35);
          background-size: 100% 100%;
          background-position: 0% 50%;
          transition: transform 200ms ease-out, box-shadow 200ms ease-out, background-position 300ms ease-out;
        }
        @keyframes fcb-in {
          to { opacity: 1; transform: translateX(0); }
        }
        @media (min-width: 1024px) {
          .fcb {
            animation: fcb-in 500ms cubic-bezier(0.22, 1, 0.36, 1) 400ms forwards,
                       fcb-glow 2.5s ease-in-out 900ms infinite;
          }
        }
        @keyframes fcb-glow {
          0%, 100% { box-shadow: 0 8px 32px rgba(168, 85, 247, 0.35); }
          50% { box-shadow: 0 10px 40px rgba(168, 85, 247, 0.55); }
        }
        @media (hover: hover) {
          .fcb:hover {
            transform: scale(1.05);
            will-change: transform;
            box-shadow: 0 12px 44px rgba(168, 85, 247, 0.6);
          }
        }
        .fcb:active {
          transform: scale(0.96);
          transition-duration: 120ms;
          background-size: 200% 100%;
          background-position: 100% 50%;
        }
        @media (prefers-reduced-motion: reduce) {
          .fcb {
            animation: fcb-fade 200ms ease-out forwards !important;
            transform: none !important;
          }
          @keyframes fcb-fade { to { opacity: 1; } }
          .fcb:hover { transform: none !important; }
          .fcb:active { transform: none !important; }
        }
      `}</style>
    </>
  );
}
