import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const milestones = [
  {
    date:  'Jan 14',
    emoji: '✨',
    title: 'The Day We Met',
    desc:  'Thanks to a stupid concert and a very lucky restaurant, i met the most amazing person alive and not a day has gone by where i have not fallen more in love with you',
    secret: 'I still remember exactly how i felt. But the concert, lucky chan, chin lungs and walking around cause we dont want to be separated and then being together in the cab ride back home was just something else. I knew from that day on that you are the one',
    color: 'from-rose-400 to-pink-500',
    bg:    'bg-rose-50',
    border:'border-rose-200',
    dot:   'bg-rose-400',
  },
  {
    date:  'Jan 17',
    emoji: '💋',
    title: 'First Kiss',
    desc:  'Three days later. Butterflies, racing heart, my team losing the derby match and us just wanting to be together.',
    secret: 'Best loss my team ever had, because it meant I got to be with you.',
    color: 'from-pink-400 to-fuchsia-500',
    bg:    'bg-pink-50',
    border:'border-pink-200',
    dot:   'bg-pink-400',
  },
  {
    date:  'Jan 31',
    emoji: '❤️',
    title: 'First "I Love You"',
    desc:  'The three words that changed everything. You said it first and my heart? Gone. Social day has to be our best first date date.',
    secret: 'When you said it first, i was so surprised but then it just slipped out because that feeling i had for you was so true and so real.',
    color: 'from-red-400 to-rose-500',
    bg:    'bg-red-50',
    border:'border-red-200',
    dot:   'bg-red-400',
  },
  {
    date:  'Feb 8',
    emoji: '💍',
    title: 'Propose Day',
    desc:  'My first valentines week, cutest rose day and best day to be proposed to by you, the love of my life.',
    secret: 'Seeing your smile when i gave u rose on rose day, and the following valentines week was the absolute highlight of my year.',
    color: 'from-fuchsia-400 to-purple-500',
    bg:    'bg-fuchsia-50',
    border:'border-fuchsia-200',
    dot:   'bg-fuchsia-400',
  },
  {
    date:  'June 27',
    emoji: '🎂',
    title: 'Happy 25th Birthday!',
    desc:  'Level 25 — you\'ve officially unlocked the unc stage but don\'t worry lucky for you I\'m very much into you. So glad I get to be here for it. 🥳',
    secret: 'I can\'t wait to celebrate 100 more birthdays with you. You are my forever.',
    color: 'from-amber-400 to-orange-500',
    bg:    'bg-amber-50',
    border:'border-amber-200',
    dot:   'bg-amber-400',
    special: true,
  },
];

// card variants
const cardVariants = {
  hidden:  { opacity: 0, y: 60, scale: 0.95 },
  visible: { opacity: 1, y: 0,  scale: 1 },
};

function TimelineCard({ m, i }) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <li className="relative">
      {/* dot */}
      <div
        className={`absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full ${m.dot} ring-4 ring-white shadow-md z-10 md:left-1/2`}
        aria-hidden
      />

      {/* card — alternating sides on md+ */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`
          ml-14 md:ml-0
          ${i % 2 === 0 ? 'md:mr-[52%]' : 'md:ml-[52%]'}
          ${m.bg} ${m.border} border rounded-2xl p-5 shadow-md
          hover:shadow-xl hover:-translate-y-1 transition-all duration-300
          ${m.special ? 'ring-2 ring-amber-300 ring-offset-2' : ''}
        `}
      >
        {/* date badge */}
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${m.color} text-white mb-3`}
        >
          {m.date}
        </span>

        <div className="flex items-start gap-3">
          <span className="text-3xl leading-none flex-shrink-0 mt-0.5">{m.emoji}</span>
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">
              {m.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-1">{m.desc}</p>
            
            {/* Secret Reveal Section */}
            <div className="mt-3 pt-3 border-t border-slate-200/50">
              <button 
                onClick={() => setIsRevealed(!isRevealed)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 transition-colors focus:outline-none"
              >
                {isRevealed ? '🙈 Hide Secret' : '✉️ Read Secret Memory'}
              </button>
              
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-3 p-3 bg-white/60 rounded-xl text-sm italic text-slate-700 shadow-sm border border-rose-100/50">
                      "{m.secret}"
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {m.special && (
          <p className="mt-4 text-center text-amber-500 font-bold text-sm tracking-wide">
            🎉 TODAY IS YOUR DAY! 🎉
          </p>
        )}
      </motion.div>
    </li>
  );
}

export default function Timeline() {
  return (
    <section
      id="timeline"
      className="w-full max-w-2xl mx-auto px-4 py-20"
      aria-label="Our love story timeline"
    >
      {/* heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <p className="text-rose-400 font-semibold tracking-widest uppercase text-sm mb-2">
          Our Story
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight">
          The Milestones 💕
        </h2>
        <p className="mt-3 text-slate-500 text-lg">
          From the very first moment, all the way to today.
        </p>
      </motion.div>

      {/* timeline */}
      <div className="relative">
        {/* vertical line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-0.5 timeline-line md:left-1/2 md:-translate-x-1/2"
          aria-hidden
        />

        <ol className="space-y-16 list-none m-0 p-0">
          {milestones.map((m, i) => (
            <TimelineCard key={i} m={m} i={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
