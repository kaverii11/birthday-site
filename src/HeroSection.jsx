import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroSection() {
  const [hearts, setHearts] = useState([]);

  const handleStatClick = (label, e) => {
    if (label === 'Milestones') {
      document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
    } else if (label === 'Love Notes') {
      document.getElementById('jar-section')?.scrollIntoView({ behavior: 'smooth' });
    } else if (label === 'Love Level') {
      const rect = e.currentTarget.getBoundingClientRect();
      const heroRect = document.getElementById('hero').getBoundingClientRect();
      const x = rect.left + rect.width / 2 - heroRect.left;
      const y = rect.top + rect.height / 2 - heroRect.top;
      
      const newHearts = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 150,
        y: y + (Math.random() - 0.5) * 150,
        scale: Math.random() * 0.5 + 0.8,
        rot: Math.random() * 60 - 30,
      }));
      
      setHearts(prev => [...prev, ...newHearts]);
      setTimeout(() => {
        setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
      }, 2000);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 overflow-hidden px-4"
      aria-label="Birthday hero section"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-rose-200 rounded-full blur-3xl opacity-25 -translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-200 rounded-full blur-3xl opacity-25 translate-x-1/3 translate-y-1/3 pointer-events-none" aria-hidden />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-200 rounded-full blur-2xl opacity-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none" aria-hidden />

      {/* Floating emojis */}
      {['🌸', '💕', '⭐', '🎀', '✨', '💖'].map((em, i) => (
        <span
          key={i}
          className="absolute text-2xl select-none pointer-events-none animate-float"
          style={{
            left:              `${8 + i * 15}%`,
            top:               `${15 + (i % 3) * 25}%`,
            animationDelay:    `${i * 0.5}s`,
            animationDuration: `${3.5 + i * 0.3}s`,
            opacity:           0.6,
          }}
          aria-hidden
        >
          {em}
        </span>
      ))}

      {/* Click Heart Explosion */}
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0, x: heart.x, y: heart.y, rotate: heart.rot }}
            animate={{ opacity: 0, scale: heart.scale, y: heart.y - 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute z-50 text-3xl pointer-events-none"
          >
            💖
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-center z-10"
      >
        {/* Level badge */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 250, damping: 20, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-rose-200 rounded-full px-4 py-2 shadow-md mb-6"
        >
          <span className="text-rose-500 font-bold text-sm tracking-widest uppercase">🔓 Level</span>
          <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-fuchsia-600 leading-none">
            25
          </span>
          <span className="text-rose-500 font-bold text-sm tracking-widest uppercase">Unlocked!</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-5xl md:text-7xl font-black text-slate-800 leading-tight mb-4"
        >
          Happy{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-600">
            Birthday
          </span>
          ,<br />my love 💖
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-slate-600 text-lg md:text-xl max-w-md mx-auto mb-10 leading-relaxed"
        >
          You've levelled up to 25 and somehow gotten even more wonderful.
          Scroll down for our story hehe ✨
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {[
            { icon: '💕', label: 'Milestones', value: '5', hoverMsg: 'Scroll to Story' },
            { icon: '💌', label: 'Love Notes', value: '25', hoverMsg: 'Scroll to Jar' },
            { icon: '❤️', label: 'Love Level', value: '∞', hoverMsg: 'Tap for Magic!' },
          ].map(({ icon, label, value, hoverMsg }) => (
            <div
              key={label}
              onClick={(e) => handleStatClick(label, e)}
              className="group relative cursor-pointer bg-white/70 backdrop-blur border border-rose-100 rounded-2xl px-5 py-3 shadow-sm text-center transition-all duration-300 hover:scale-105 hover:shadow-md hover:border-rose-300"
            >
              <span className="text-2xl transition-transform group-hover:scale-125 inline-block">{icon}</span>
              <p className="font-extrabold text-2xl text-slate-800 leading-tight mt-1">{value}</p>
              <p className="text-slate-500 text-xs tracking-wide">{label}</p>
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                {hoverMsg}
              </div>
            </div>
          ))}
        </motion.div>

        {/* scroll cue */}
        <motion.a
          href="#timeline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-flex flex-col items-center gap-1 text-rose-400 hover:text-rose-600 transition-colors group"
          aria-label="Scroll to our love story"
        >
          <span className="text-sm font-semibold tracking-wide">Our Story</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="text-xl"
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
