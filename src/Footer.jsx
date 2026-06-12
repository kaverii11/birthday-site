import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <p className="text-4xl mb-4">🎂 🎉 💖</p>
        <p className="text-slate-300 text-lg font-semibold mb-1">
          Happy 25th Birthday!
        </p>
        <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
          Made with infinite love, and a little bit of antigravity.
          Here's to you, to us, and to every chapter and beyond.
          I love you my unc 💕
        </p>
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-30 max-w-xs mx-auto" />
        <p className="mt-4 text-rose-400/50 text-xs tracking-widest uppercase font-pixel">
          &lt;3 forever
        </p>
      </motion.div>
    </footer>
  );
}
