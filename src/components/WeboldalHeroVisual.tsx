import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Code2,
  Smartphone,
  Palette,
  MousePointer2,
  Boxes,
  Tablet,
  Monitor,
  Smartphone as PhoneIcon
} from 'lucide-react';

const CODE_LINES: Array<Array<{ t: string; c: string }>> = [
  [
    { t: '<', c: 'text-slate-500' },
    { t: 'section', c: 'text-pink-300' },
    { t: '>', c: 'text-slate-500' }
  ],
  [
    { t: '  <', c: 'text-slate-500' },
    { t: 'h1', c: 'text-purple-300' },
    { t: '>', c: 'text-slate-500' },
    { t: 'AdyFlow', c: 'text-slate-100' },
    { t: '</', c: 'text-slate-500' },
    { t: 'h1', c: 'text-purple-300' },
    { t: '>', c: 'text-slate-500' }
  ],
  [
    { t: '  <', c: 'text-slate-500' },
    { t: 'p', c: 'text-blue-300' },
    { t: '>', c: 'text-slate-500' },
    { t: 'Marketing & AI', c: 'text-slate-300' },
    { t: '</', c: 'text-slate-500' },
    { t: 'p', c: 'text-blue-300' },
    { t: '>', c: 'text-slate-500' }
  ],
  [
    { t: '</', c: 'text-slate-500' },
    { t: 'section', c: 'text-pink-300' },
    { t: '>', c: 'text-slate-500' }
  ]
];

const TOTAL_CODE_CHARS = CODE_LINES.reduce(
  (sum, line) => sum + line.reduce((s, tk) => s + tk.t.length, 0),
  0
);

const BRAND_COLORS = [
  { dot: 'bg-blue-500', hex: '#3B82F6' },
  { dot: 'bg-purple-500', hex: '#8B5CF6' },
  { dot: 'bg-pink-500', hex: '#EC4899' },
  { dot: 'bg-slate-100', hex: '#F1F5F9' }
];

const DEVICES = [
  { key: 'phone', Icon: PhoneIcon, label: 'Mobil' },
  { key: 'tablet', Icon: Tablet, label: 'Tablet' },
  { key: 'desktop', Icon: Monitor, label: 'Desktop' }
];

export default function WeboldalHeroVisual() {
  const { t } = useTranslation();
  const [typed, setTyped] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  const [activeDevice, setActiveDevice] = useState(0);
  const tiltRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      frame++;
      if (frame <= TOTAL_CODE_CHARS) {
        setTyped(frame);
        timer = setTimeout(tick, 40);
      } else {
        timer = setTimeout(() => {
          frame = 0;
          setTyped(0);
          timer = setTimeout(tick, 600);
        }, 4000);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveColor((i) => (i + 1) % BRAND_COLORS.length);
    }, 900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveDevice((i) => (i + 1) % DEVICES.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
    };
    const onLeave = () => {
      el.style.transform = '';
    };
    const parent = el.parentElement;
    parent?.addEventListener('mousemove', onMove);
    parent?.addEventListener('mouseleave', onLeave);
    return () => {
      parent?.removeEventListener('mousemove', onMove);
      parent?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  let charBudget = typed;
  const renderedLines = CODE_LINES.map((line) => {
    const tokens: Array<{ t: string; c: string }> = [];
    for (const tk of line) {
      if (charBudget <= 0) break;
      if (tk.t.length <= charBudget) {
        tokens.push(tk);
        charBudget -= tk.t.length;
      } else {
        tokens.push({ t: tk.t.slice(0, charBudget), c: tk.c });
        charBudget = 0;
      }
    }
    return tokens;
  });
  const typingDone = typed >= TOTAL_CODE_CHARS;

  return (
    <div className="relative max-w-5xl mx-auto px-2 sm:px-0">
      <div className="absolute -inset-x-12 -top-24 -bottom-24 pointer-events-none overflow-hidden hidden sm:block">
        <div className="adf-orb adf-orb-1"></div>
        <div className="adf-orb adf-orb-2"></div>
        <div className="adf-orb adf-orb-3"></div>
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(148 163 184 / 0.6) 1px, transparent 1px), linear-gradient(to bottom, rgb(148 163 184 / 0.6) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        ></div>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="adf-particle"
            style={{
              left: `${(i * 9 + 5) % 95}%`,
              top: `${(i * 17 + 12) % 90}%`,
              animationDelay: `${(i * 0.7).toFixed(2)}s`,
              animationDuration: `${10 + (i % 5) * 2}s`
            }}
          ></span>
        ))}
      </div>

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
        viewBox="0 0 1000 600"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="adf-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M 90 110 Q 240 130 320 220"
          stroke="url(#adf-line)"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          className="adf-flow"
        />
        <path
          d="M 130 520 Q 280 480 360 420"
          stroke="url(#adf-line)"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          className="adf-flow"
          style={{ animationDelay: '1.2s' }}
        />
        <path
          d="M 880 110 Q 820 220 880 320"
          stroke="url(#adf-line)"
          strokeWidth="1"
          strokeDasharray="4 6"
          fill="none"
          className="adf-flow"
          style={{ animationDelay: '0.6s' }}
        />
      </svg>

      <div ref={tiltRef} className="adf-tilt relative transition-transform duration-300 ease-out">
        <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg shadow-purple-500/10 bg-gradient-to-br from-white to-slate-50 adf-float-a">
          <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-slate-200">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
            <div className="flex-1 ml-3">
              <div className="bg-slate-100 border border-slate-300 rounded-md px-3 py-1.5 text-xs sm:text-sm text-slate-700 font-mono inline-flex items-center gap-2 max-w-full">
                <span className="text-green-600">https://</span>
                <span className="truncate">yourbrand.com</span>
                <span className="ml-1 inline-block w-2 h-3 bg-pink-500 adf-blink"></span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/9] bg-gradient-to-br from-white via-slate-50 to-white p-6 sm:p-10">
            <div className="grid grid-cols-12 gap-4 h-full">
              <div className="col-span-7 flex flex-col justify-center space-y-3">
                <div className="h-3 w-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <div className="adf-shimmer h-6 sm:h-8 w-4/5 rounded-md bg-slate-300/40"></div>
                <div
                  className="adf-shimmer h-6 sm:h-8 w-3/5 rounded-md bg-slate-300/30"
                  style={{ animationDelay: '0.3s' }}
                ></div>
                <div className="space-y-2 pt-3">
                  <div className="adf-shimmer h-2.5 w-full rounded-full bg-slate-300/30" style={{ animationDelay: '0.6s' }}></div>
                  <div className="adf-shimmer h-2.5 w-5/6 rounded-full bg-slate-300/30" style={{ animationDelay: '0.8s' }}></div>
                  <div className="adf-shimmer h-2.5 w-2/3 rounded-full bg-slate-300/30" style={{ animationDelay: '1s' }}></div>
                </div>
                <div className="flex gap-2 pt-3">
                  <div className="adf-pulse-btn h-9 w-32 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600"></div>
                  <div className="h-9 w-28 rounded-lg border border-slate-300"></div>
                </div>
              </div>
              <div className="col-span-5 relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/8 via-purple-500/8 to-pink-500/8 border border-slate-200 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-3 left-3 right-3 flex gap-1.5">
                    <div className="h-2 w-12 rounded-full bg-slate-400/40"></div>
                    <div className="h-2 w-8 rounded-full bg-slate-400/20"></div>
                  </div>
                  <div className="absolute inset-x-3 top-10 bottom-3 grid grid-cols-2 grid-rows-3 gap-1.5">
                    <div className="adf-tile rounded bg-slate-300/30" style={{ animationDelay: '0.1s' }}></div>
                    <div className="adf-tile relative rounded overflow-hidden bg-pink-500/20" style={{ animationDelay: '0.2s' }}>
                      <span className="absolute inset-0 adf-radial"></span>
                    </div>
                    <div className="adf-tile rounded bg-purple-500/20" style={{ animationDelay: '0.3s' }}></div>
                    <div className="adf-tile rounded bg-slate-300/30" style={{ animationDelay: '0.4s' }}></div>
                    <div className="adf-tile rounded bg-blue-500/20 col-span-2" style={{ animationDelay: '0.5s' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <MousePointer2
              className="absolute text-slate-900 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] adf-cursor hidden md:block"
              size={22}
            />
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute -left-8 lg:-left-16 top-12 adf-float-b">
        <div className="bg-white backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <Palette size={14} className="text-pink-600" />
            <span className="text-xs font-semibold text-slate-700">{t('weboldal_page.float_palette')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {BRAND_COLORS.map((c, i) => (
              <span
                key={i}
                className={`relative w-5 h-5 rounded-full border border-slate-300 ${c.dot} transition-transform duration-300 ${
                  activeColor === i ? 'scale-125 shadow-[0_0_12px_rgba(236,72,153,0.5)]' : 'scale-100'
                }`}
              ></span>
            ))}
          </div>
          <div className="mt-2 h-4 font-mono text-[10px] text-slate-600 tracking-tight">
            {BRAND_COLORS[activeColor].hex}
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute -right-4 lg:-right-10 -top-6 adf-float-c">
        <div className="bg-white backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-lg shadow-blue-500/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-slate-300 flex items-center justify-center">
              <Boxes size={14} className="text-blue-600" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold text-slate-900">12 {t('weboldal_page.float_components')}</div>
              <div className="text-[10px] text-slate-600">{t('weboldal_page.float_components_sub')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:block absolute -right-6 lg:-right-12 top-32 adf-float-d">
        <div className="bg-white backdrop-blur-md border border-slate-200 rounded-2xl p-2.5 shadow-lg shadow-blue-500/10">
          <div className="w-20 h-32 rounded-xl bg-gradient-to-br from-slate-100 to-white border border-slate-200 relative overflow-hidden">
            <Smartphone size={14} className="absolute top-2 left-2 text-blue-600" />
            <div className="absolute inset-x-2 top-7 space-y-1.5">
              <div className="h-2 w-full rounded bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="adf-shimmer h-1.5 w-3/4 rounded-full bg-slate-300/40"></div>
              <div className="adf-shimmer h-1.5 w-full rounded-full bg-slate-300/50" style={{ animationDelay: '0.3s' }}></div>
              <div className="adf-shimmer h-1.5 w-2/3 rounded-full bg-slate-300/50" style={{ animationDelay: '0.6s' }}></div>
              <div className="h-4 w-full rounded bg-gradient-to-r from-purple-600 to-pink-600 mt-2"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute -left-4 lg:-left-10 -bottom-8 adf-float-e">
        <div className="bg-white backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-lg font-mono text-[11px] leading-relaxed min-w-[210px]">
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={14} className="text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">index.html</span>
          </div>
          <pre className="whitespace-pre">
            {renderedLines.map((line, li) => (
              <div key={li} className="min-h-[1em]">
                {line.map((tk, ti) => (
                  <span key={ti} className={tk.c}>
                    {tk.t}
                  </span>
                ))}
                {!typingDone && li === renderedLines.length - 1 && line.length > 0 && (
                  <span className="inline-block w-1.5 h-3 align-[-1px] bg-pink-500 adf-blink ml-0.5"></span>
                )}
              </div>
            ))}
          </pre>
        </div>
      </div>

      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 -bottom-12 items-center gap-3 bg-white backdrop-blur-md border border-slate-200 rounded-full px-4 py-2 shadow-lg">
        <div className="flex items-center gap-1.5">
          {DEVICES.map(({ key, Icon }, i) => (
            <span
              key={key}
              className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-500 ${
                activeDevice === i
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md shadow-pink-500/40'
                  : 'text-slate-600'
              }`}
            >
              <Icon size={14} />
            </span>
          ))}
        </div>
        <span className="w-px h-5 bg-slate-300"></span>
        <div className="flex items-center gap-1.5">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70 adf-ping"></span>
            <span className="relative w-2 h-2 rounded-full bg-emerald-400"></span>
          </span>
          <span className="text-[11px] font-semibold text-slate-700">{t('weboldal_page.float_responsive')}</span>
        </div>
      </div>

      <style>{`
        .adf-float-a { animation: adf-float-a 6s ease-in-out infinite; will-change: transform; }
        .adf-float-b { animation: adf-float-b 5s ease-in-out infinite; }
        .adf-float-c { animation: adf-float-c 5s ease-in-out infinite; animation-delay: 0.4s; }
        .adf-float-d { animation: adf-float-d 7s ease-in-out infinite; animation-delay: 0.6s; }
        .adf-float-e { animation: adf-float-e 8s ease-in-out infinite; animation-delay: 0.2s; }

        @keyframes adf-float-a { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        @keyframes adf-float-b { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes adf-float-c { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        @keyframes adf-float-d { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-6px) rotate(-1deg); } }
        @keyframes adf-float-e { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }

        .adf-blink { animation: adf-blink 1s steps(2,end) infinite; }
        @keyframes adf-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .adf-shimmer { position: relative; overflow: hidden; }
        .adf-shimmer::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%);
          transform: translateX(-100%);
          animation: adf-shimmer 2s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes adf-shimmer { 0% { transform: translateX(-100%); } 60%,100% { transform: translateX(100%); } }

        .adf-tile { opacity: 0; transform: scale(0.9); animation: adf-tile-in 0.6s ease-out forwards; will-change: transform, opacity; }
        @keyframes adf-tile-in { to { opacity: 1; transform: scale(1); } }

        .adf-radial {
          background: radial-gradient(circle at 30% 30%, rgba(236,72,153,0.55) 0%, transparent 60%);
          animation: adf-radial 8s ease-in-out infinite;
          will-change: opacity, transform;
        }
        @keyframes adf-radial {
          0%,100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .adf-pulse-btn { animation: adf-pulse-btn 3s ease-in-out infinite; }
        @keyframes adf-pulse-btn {
          0%,100% { box-shadow: 0 0 0 0 rgba(236,72,153,0.45), 0 8px 18px -8px rgba(168,85,247,0.5); }
          50% { box-shadow: 0 0 0 10px rgba(236,72,153,0), 0 12px 26px -8px rgba(236,72,153,0.6); }
        }

        .adf-cursor {
          left: 0; top: 0;
          animation: adf-cursor 14s ease-in-out infinite;
          will-change: transform, opacity;
        }
        @keyframes adf-cursor {
          0% { transform: translate(60px, 80px); opacity: 0.9; }
          15% { transform: translate(120px, 60px) scale(0.95); }
          30% { transform: translate(220px, 130px); }
          50% { transform: translate(360px, 80px); }
          65% { transform: translate(420px, 200px); }
          80% { transform: translate(280px, 240px); }
          100% { transform: translate(60px, 80px); opacity: 0.9; }
        }

        .adf-flow { animation: adf-flow 3s linear infinite; }
        @keyframes adf-flow { to { stroke-dashoffset: -40; } }

        .adf-orb { position: absolute; border-radius: 9999px; filter: blur(80px); will-change: transform; }
        .adf-orb-1 { width: 320px; height: 320px; background: rgba(59,130,246,0.22); top: -40px; left: -60px; animation: adf-orb-a 24s ease-in-out infinite; }
        .adf-orb-2 { width: 280px; height: 280px; background: rgba(168,85,247,0.20); top: 40%; right: -40px; animation: adf-orb-b 28s ease-in-out infinite; }
        .adf-orb-3 { width: 360px; height: 360px; background: rgba(236,72,153,0.18); bottom: -80px; left: 30%; animation: adf-orb-c 30s ease-in-out infinite; }
        @keyframes adf-orb-a { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(40px,30px,0); } }
        @keyframes adf-orb-b { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(-30px,-20px,0); } }
        @keyframes adf-orb-c { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(20px,-30px,0); } }

        .adf-particle {
          position: absolute;
          width: 2px; height: 2px; border-radius: 9999px;
          background: rgba(236,72,153,0.55);
          box-shadow: 0 0 6px rgba(236,72,153,0.5);
          animation: adf-particle 14s linear infinite;
          will-change: transform, opacity;
        }
        @keyframes adf-particle {
          0% { transform: translateY(0); opacity: 0; }
          15% { opacity: 0.8; }
          85% { opacity: 0.6; }
          100% { transform: translateY(-120px); opacity: 0; }
        }

        .adf-ping { animation: adf-ping 2s cubic-bezier(0,0,0.2,1) infinite; }
        @keyframes adf-ping { 75%,100% { transform: scale(2.2); opacity: 0; } }

        @media (prefers-reduced-motion: reduce) {
          .adf-float-a, .adf-float-b, .adf-float-c, .adf-float-d, .adf-float-e,
          .adf-blink, .adf-shimmer::after, .adf-tile, .adf-radial, .adf-pulse-btn,
          .adf-cursor, .adf-flow, .adf-orb, .adf-particle, .adf-ping {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
          .adf-tile { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
}
