import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CassettePlayer({ autoPlay = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef(null);

  // You can replace this URL with your own local /music.mp3 or any audio link!
  const audioUrl = "/Harvest.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      if (autoPlay) {
        // Autoplay after user interaction (which happened on loading screen start button)
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch(error => {
              console.log("Autoplay was blocked or failed:", error);
            });
        }
      }
    }
    
    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, [autoPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      <audio ref={audioRef} src={audioUrl} loop />

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-2 bg-rose-500 text-white text-xs px-3 py-1.5 rounded-xl shadow-lg border border-rose-400 font-semibold pointer-events-auto"
          >
            🔊 Click to pause/play our mixtape!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cassette Player Body */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="pointer-events-auto bg-slate-900/90 border border-slate-700/50 backdrop-blur rounded-2xl p-3 shadow-2xl flex items-center gap-3 w-56 hover:border-rose-400/50 transition-all duration-300"
      >
        {/* Cassette Tape SVG */}
        <div className="relative w-16 h-10 bg-rose-200 border border-rose-300 rounded-sm flex-shrink-0 flex items-center justify-center overflow-hidden">
          {/* Label stripe */}
          <div className="absolute top-1 left-1 right-1 h-3 bg-white border border-rose-300 rounded-[1px] flex items-center justify-center font-cursive text-[10px] text-rose-500 font-bold select-none leading-none pt-0.5">
            Mixtape &lt;3
          </div>

          {/* Center dark space */}
          <div className="mt-2 w-12 h-4 bg-slate-800 rounded-[2px] border border-rose-300 flex items-center justify-between px-2">
            {/* Reel Left */}
            <svg
              viewBox="0 0 100 100"
              className={`w-3.5 h-3.5 fill-rose-300 ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '3s' }}
            >
              <circle cx="50" cy="50" r="45" stroke="#f43f5e" strokeWidth="8" fill="none" />
              <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85" stroke="#f43f5e" strokeWidth="12" />
              <circle cx="50" cy="50" r="15" fill="#1e293b" />
            </svg>

            {/* Reel Right */}
            <svg
              viewBox="0 0 100 100"
              className={`w-3.5 h-3.5 fill-rose-300 ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '3s' }}
            >
              <circle cx="50" cy="50" r="45" stroke="#f43f5e" strokeWidth="8" fill="none" />
              <path d="M50 0 L50 100 M0 50 L100 50 M15 15 L85 85 M85 15 L15 85" stroke="#f43f5e" strokeWidth="12" />
              <circle cx="50" cy="50" r="15" fill="#1e293b" />
            </svg>
          </div>

          {/* Tape window details */}
          <div className="absolute bottom-0.5 w-8 h-1 bg-rose-300/50 rounded-full" />
        </div>

        {/* Info & Controls */}
        <div className="flex-1 flex flex-col min-w-0">
          <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider select-none">
            {isPlaying ? '🎵 Playing' : '🔇 Paused'}
          </p>
          <p className="text-white text-xs font-semibold truncate select-none leading-none mt-1">
            Harvest - Opeth 🍂
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-2 mt-2">
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-6 h-6 rounded bg-rose-500 hover:bg-rose-600 active:scale-95 text-white flex items-center justify-center transition-all duration-200 focus:outline-none"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              {isPlaying ? (
                <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="4" height="16" />
                  <rect x="16" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-2.5 h-2.5 fill-current ml-0.5" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Mute */}
            <button
              onClick={toggleMute}
              className="w-6 h-6 rounded bg-slate-700 hover:bg-slate-600 active:scale-95 text-slate-300 flex items-center justify-center transition-all duration-200 focus:outline-none"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
