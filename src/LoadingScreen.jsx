import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Typewriter hook ───────────────────────────────────────────────────────────
function useTypewriter(lines, speed = 45, lineDelay = 700) {
  const [displayed, setDisplayed] = useState([]);
  const [cursor, setCursor]       = useState(true);

  useEffect(() => {
    let lineIdx  = 0;
    let charIdx  = 0;
    let finished = false;
    let timeoutId;

    const tick = () => {
      if (finished) return;
      if (lineIdx >= lines.length) { finished = true; return; }

      const line = lines[lineIdx];

      if (charIdx <= line.length) {
        setDisplayed(prev => {
          const next = [...prev];
          next[lineIdx] = line.slice(0, charIdx);
          return next;
        });
        charIdx++;
        timeoutId = setTimeout(tick, charIdx === 1 && lineIdx > 0 ? lineDelay : speed);
      } else {
        lineIdx++;
        charIdx = 0;
        timeoutId = setTimeout(tick, lineDelay);
      }
    };

    tick();

    const blinkId = setInterval(() => setCursor(c => !c), 500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(blinkId);
      finished = true;
    };
  }, []);                                   // eslint-disable-line react-hooks/exhaustive-deps

  return { displayed, cursor };
}

// ── Starfield ─────────────────────────────────────────────────────────────────
function Stars({ count = 120 }) {
  const stars = useRef(
    Array.from({ length: count }, () => ({
      x:     Math.random() * 100,
      y:     Math.random() * 100,
      size:  Math.random() * 2.5 + 0.5,
      delay: Math.random() * 4,
      dur:   Math.random() * 2 + 2,
    }))
  ).current;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left:             `${s.x}%`,
            top:              `${s.y}%`,
            width:            s.size,
            height:           s.size,
            animationDelay:   `${s.delay}s`,
            animationDuration:`${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function RetroProgressBar({ progress }) {
  return (
    <div className="w-full max-w-xs mx-auto mt-6">
      <div className="border-2 border-green-400 p-px">
        <div className="relative h-5 bg-slate-900 overflow-hidden">
          <motion.div
            className="progress-stripes h-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: 'linear' }}
          />
        </div>
      </div>
      <p className="text-green-400 font-pixel text-[9px] text-center mt-2 tracking-widest">
        {progress}%
      </p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  LOADING SCREEN
// ══════════════════════════════════════════════════════════════════════════════
const BOOT_LINES = [
  '> INITIALIZING BIRTHDAY OS v25.0...',
  '> RUNNING ELIGIBILITY CHECK...',
  '> AGE REQUIREMENT: 24+',
  '> CHECKING USER AGE...',
  '> VERIFIED ✓  AGE = 25  [ABOVE THRESHOLD]',
  '> wink wink... you are.',
  '> ALL SYSTEMS NOMINAL.',
  '> PRESS START TO CONTINUE_',
];

export default function LoadingScreen({ onStart }) {
  const { displayed, cursor } = useTypewriter(BOOT_LINES, 35, 500);
  const [progress, setProgress]   = useState(0);
  const [ready, setReady]         = useState(false);

  // drive a fake progress bar in sync with the typing
  useEffect(() => {
    const dur = BOOT_LINES.join('').length * 35 + BOOT_LINES.length * 500;
    let start;
    const raf = (ts) => {
      if (!start) start = ts;
      const pct = Math.min(100, Math.round(((ts - start) / dur) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(raf);
      else setReady(true);
    };
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 text-green-400 overflow-hidden"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* CRT effects */}
      <div className="crt-overlay" />
      <div className="crt-vignette" />
      <Stars />

      {/* ASCII-style title */}
      <div className="font-pixel text-center mb-8 px-4">
        <p className="text-[10px] md:text-xs text-green-300 tracking-widest pixel-glow mb-1">
          ★ HAPPY BIRTHDAY ★
        </p>
        <h1 className="text-xl md:text-3xl pixel-glow leading-snug">
          LEVEL 25
        </h1>
        <p className="text-[10px] md:text-xs text-green-300 tracking-widest pixel-glow mt-1">
          ACHIEVEMENT UNLOCKED
        </p>
      </div>

      {/* Terminal window */}
      <div className="relative w-full max-w-lg mx-4 border border-green-700 rounded bg-slate-950/90 shadow-[0_0_40px_rgba(74,222,128,0.15)]">
        {/* title bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-green-700 bg-green-950/50">
          <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          <span className="font-pixel text-[8px] ml-2 text-green-600 tracking-widest">BIRTHDAY_OS.exe</span>
        </div>

        {/* body */}
        <div className="p-4 md:p-6 font-mono text-[11px] md:text-xs leading-6 min-h-[220px]">
          {BOOT_LINES.map((_, i) => (
            <p key={i} className={`${i < displayed.length ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
              {displayed[i] ?? ''}
              {i === displayed.length - 1 && (
                <span className={`inline-block w-2 h-4 ml-1 bg-green-400 align-bottom ${cursor ? 'opacity-100' : 'opacity-0'}`} />
              )}
            </p>
          ))}
        </div>
      </div>

      {/* Progress */}
      <RetroProgressBar progress={progress} />

      {/* Start button */}
      <AnimatePresence>
        {ready && (
          <motion.button
            id="start-btn"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onStart}
            className="mt-10 font-pixel text-[11px] px-8 py-4 border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-950 transition-colors duration-200 tracking-widest animate-pulse-glow focus:outline-none focus:ring-2 focus:ring-green-300"
          >
            ▶ PRESS START
          </motion.button>
        )}
      </AnimatePresence>

      {/* floating hearts */}
      {['💚', '✨', '🎮', '💾', '⭐'].map((em, i) => (
        <span
          key={i}
          className="absolute select-none text-xl pointer-events-none animate-float opacity-30"
          style={{
            left:              `${10 + i * 20}%`,
            bottom:            `${15 + (i % 3) * 12}%`,
            animationDelay:    `${i * 0.7}s`,
            animationDuration: `${3 + i * 0.4}s`,
          }}
        >
          {em}
        </span>
      ))}
    </motion.div>
  );
}
