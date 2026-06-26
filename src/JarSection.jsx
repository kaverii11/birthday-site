import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  'You are one of the most caring and thoughtful guys ever, and I can see it from your tiniest actions.',
  'Incredibly smart, so witty and clever—not just academically but in every WAY.',
  'The way you make even ordinary days feel special; even monotonous days become exciting and fun when I\'m with you.',
  'Your insane ability to cheer me up instantly (hats off!)',
  'How deeply you care about the people you love and everyone around you.',
  'Your hugs and how they genuinely fix everything. I wanna hug you not only when I\'m sad but at my happiest too.',
  'How you remember the little things I mention, even if just once.',
  "How when I spend time with you I never want to leave your side, I feel so calm and happy.",
  'The way you look at me like I am your moon hehe 🌙',
  'Your patience (especially with my indecisiveness and my nakhre).',
  'How hard you work for everything you have (except ola notice days hehe).',
  'How hot you are, and how good you are at satisfying me lol >_<',
  "How well our personalities match, it's like you complete me.",
  'How you always communicate so well and always care for my feelings.',
  'Coolest taste in music, movies and everything, you are so cultured.',
  'Your love for travel/food and your very extensive knowledge about it all.',
  'How you make me feel safe without even trying.',
  "Your back, your hands, your face, your eyes—you're so cute I wanna keep you in a pendant and carry you around with me always.",
  'The texts you send me just to say you miss me or love me, these notifications light up my face.',
  "How beautifully you play the guitar (I'm such a sucker for you, my rockstar).",
  "The way you hold my hand like it's precious.",
  'Our cooking adventures (even the chaotic ones where we fight).',
  "How you've made me a better person just by being you.",
  "You bring out the best in me and I just want to be the best for you.",
  'I love everything about you. Happy 25th my love! 🎂',
];

// Pastel note colors
const NOTE_COLORS = [
  'bg-rose-100    border-rose-300    text-rose-800',
  'bg-pink-100    border-pink-300    text-pink-800',
  'bg-fuchsia-100 border-fuchsia-300 text-fuchsia-800',
  'bg-purple-100  border-purple-300  text-purple-800',
  'bg-amber-100   border-amber-300   text-amber-800',
  'bg-lime-100    border-lime-300    text-lime-800',
  'bg-sky-100     border-sky-300     text-sky-800',
  'bg-teal-100    border-teal-300    text-teal-800',
];

// Deterministic positions / rotations so they don't shift on re-render
function useNotePositions(count) {
  return useMemo(() => {
    // Seed-based pseudo-random (simple LCG)
    let s = 42;
    const rand = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };

    return Array.from({ length: count }, (_, i) => {
      const angle   = (i / count) * 360 + rand() * 40 - 20;   // spread in a circle
      const dist    = 160 + rand() * 200;                       // 160-360px from center
      const rad     = (angle * Math.PI) / 180;
      return {
        x:     Math.cos(rad) * dist,
        y:     Math.sin(rad) * dist,
        rot:   rand() * 30 - 15,
        delay: rand() * 0.5,
        color: NOTE_COLORS[i % NOTE_COLORS.length],
      };
    });
  }, [count]);
}

// Jar SVG component
function JarSVG({ isOpen, onClick }) {
  return (
    <button
      id="jar-btn"
      onClick={onClick}
      aria-label={isOpen ? 'Close jar' : 'Open jar to see 25 reasons I love you'}
      className={`
        relative z-10 cursor-pointer bg-transparent border-0 p-0
        transition-transform duration-200 hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-rose-300 focus:ring-offset-2
        rounded-full
        ${isOpen ? '' : 'jar-glow'}
      `}
    >
      <svg
        viewBox="0 0 120 160"
        className="w-48 h-60 md:w-64 md:h-80 drop-shadow-2xl"
        aria-hidden="true"
      >
        {/* Jar body */}
        <defs>
          <linearGradient id="jarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#fce7f3" />
            <stop offset="40%"  stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#fce7f3" />
          </linearGradient>
          <linearGradient id="lidGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* jar shape */}
        <path
          d="M35 50 Q28 55 26 70 L22 130 Q22 145 35 148 L85 148 Q98 145 98 130 L94 70 Q92 55 85 50 Z"
          fill="url(#jarGrad)"
          stroke="#f9a8d4"
          strokeWidth="2"
        />

        {/* glass shine */}
        <path
          d="M38 60 Q35 80 35 110"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* lid */}
        <rect x="30" y="38" width="60" height="14" rx="5" fill="url(#lidGrad)" />
        <rect x="38" y="32" width="44" height="10" rx="4" fill="#f472b6" />

        {/* label */}
        <rect x="34" y="88" width="52" height="38" rx="6" fill="white" fillOpacity="0.7" stroke="#f9a8d4" strokeWidth="1" />
        <text x="60" y="103" textAnchor="middle" fontSize="8" fill="#be185d" fontWeight="bold">25 Things</text>
        <text x="60" y="114" textAnchor="middle" fontSize="7" fill="#be185d">I Love</text>
        <text x="60" y="124" textAnchor="middle" fontSize="7" fill="#be185d">About You</text>

        {/* heart inside */}
        {!isOpen && (
          <text x="60" y="78" textAnchor="middle" fontSize="14">💕</text>
        )}

        {/* sparkle when open */}
        {isOpen && (
          <>
            <text x="18" y="45" fontSize="12">✨</text>
            <text x="88" y="38" fontSize="10">⭐</text>
            <text x="55" y="28" fontSize="14">🎊</text>
          </>
        )}
      </svg>
    </button>
  );
}

// Individual love note card
function NoteCard({ reason, position, index, onClose }) {
  const { rot, color } = position;

  return (
    <motion.div
      id={`note-card-${index}`}
      className={`
        absolute z-20 note-card border-2 rounded-xl p-5 shadow-2xl
        text-sm md:text-base font-semibold leading-relaxed text-center
        cursor-pointer select-none w-56 md:w-64
        ${color}
      `}
      style={{ '--rot': `${rot}deg` }}
      initial={{ y: 0, scale: 0, opacity: 0, rotate: 0 }}
      animate={{ y: -160, scale: 1, opacity: 1, rotate: rot }}
      exit={{ y: 50, scale: 0, opacity: 0, rotate: 0 }}
      transition={{
        type:    'spring',
        stiffness: 260,
        damping:   20,
      }}
      onClick={onClose}
      role="button"
      tabIndex={0}
      aria-label={`Note ${index + 1}: ${reason}. Click to close.`}
      onKeyDown={e => e.key === 'Enter' && onClose()}
    >
      <span className="block text-lg mb-1">{index + 1}.</span>
      {reason}
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  JAR SECTION
// ══════════════════════════════════════════════════════════════════════════════
export default function JarSection() {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(-1);
  const [confetti,     setConfetti]     = useState([]);
  const positions = useNotePositions(reasons.length);

  const isOpen = currentNoteIndex !== -1;

  const spawnConfetti = useCallback(() => {
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id:    i,
      x:     Math.random() * 100,
      size:  Math.random() * 10 + 6,
      color: ['#fb7185', '#f9a8d4', '#fde68a', '#6ee7b7', '#93c5fd', '#c4b5fd'][Math.floor(Math.random() * 6)],
      delay: Math.random() * 2,
      dur:   Math.random() * 3 + 3,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 5000);
  }, []);

  const handleJarClick = () => {
    if (!isOpen) {
      spawnConfetti();
      setCurrentNoteIndex(0);
    } else {
      setCurrentNoteIndex(-1);
    }
  };

  const handleNoteClick = (e) => {
    e.stopPropagation();
    if (currentNoteIndex < reasons.length - 1) {
      setCurrentNoteIndex(prev => prev + 1);
    } else {
      setCurrentNoteIndex(-1); // Reset when done
    }
  };

  return (
    <section
      id="jar-section"
      className="relative w-full py-24 flex flex-col items-center bg-gradient-to-b from-pink-50 to-rose-100 overflow-hidden"
      aria-labelledby="jar-heading"
    >
      {/* Background blobs */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-rose-200 rounded-full blur-3xl opacity-30 pointer-events-none" aria-hidden />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-fuchsia-200 rounded-full blur-3xl opacity-30 pointer-events-none" aria-hidden />

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 px-4"
      >
        <p className="text-rose-400 font-semibold tracking-widest uppercase text-sm mb-2">
          The Grand Finale
        </p>
        <h2
          id="jar-heading"
          className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-3"
        >
          25 Reasons I Love You 🫙
        </h2>
        <p className="text-slate-500 text-base max-w-md mx-auto">
          {isOpen
            ? 'Click any note to put it back ✨'
            : 'Click the jar to pop it open and let the love out 💕'}
        </p>
      </motion.div>

      {/* Jar + notes container */}
      <div className="relative flex items-center justify-center" style={{ width: 500, height: 500 }}>
        <JarSVG isOpen={isOpen} onClick={handleJarClick} />

        <AnimatePresence mode="wait">
          {isOpen && (
            <NoteCard
              key={currentNoteIndex}
              index={currentNoteIndex}
              reason={reasons[currentNoteIndex]}
              position={positions[currentNoteIndex]}
              onClose={handleNoteClick}
            />
          )}
        </AnimatePresence>
      </div>

      {/* CTA when closed */}
      {!isOpen && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-rose-400 font-semibold text-sm animate-bounce"
          aria-hidden
        >
          ↑ tap me! ↑
        </motion.p>
      )}

      {/* Confetti 🎊 */}
      {confetti.map(p => (
        <span
          key={p.id}
          className="confetti-particle rounded-sm pointer-events-none"
          style={{
            left:              `${p.x}%`,
            width:             p.size,
            height:            p.size,
            backgroundColor:   p.color,
            animationDuration: `${p.dur}s`,
            animationDelay:    `${p.delay}s`,
          }}
          aria-hidden
        />
      ))}
    </section>
  );
}
