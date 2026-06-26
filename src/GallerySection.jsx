import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const memories = [
  {
    id: 1,
    title: "Memory 1",
    caption: "[Caption 1] 💕",
    longDesc: "[Long Description for Memory 1 - Write your beautiful story here!]",
    img: "/images/IMG_2223.jpg",
    rot: "-3deg",
  },
  {
    id: 2,
    title: "Memory 2",
    caption: "[Caption 2] ✨",
    longDesc: "[Long Description for Memory 2 - Write your beautiful story here!]",
    img: "/images/IMG_3753.jpg",
    rot: "2deg",
  },
  {
    id: 3,
    title: "Memory 3",
    caption: "[Caption 3] ☕",
    longDesc: "[Long Description for Memory 3 - Write your beautiful story here!]",
    img: "/images/IMG_4951.jpg",
    rot: "-2deg",
  },
  {
    id: 4,
    title: "Memory 4",
    caption: "[Caption 4] 🚗",
    longDesc: "[Long Description for Memory 4 - Write your beautiful story here!]",
    img: "/images/IMG_6895.jpg",
    rot: "3deg",
  },
  {
    id: 5,
    title: "Memory 5",
    caption: "[Caption 5] 🍿",
    longDesc: "[Long Description for Memory 5 - Write your beautiful story here!]",
    img: "/images/IMG_8419.jpg",
    rot: "-1deg",
  },
  {
    id: 6,
    title: "Memory 6",
    caption: "[Caption 6] 💍",
    longDesc: "[Long Description for Memory 6 - Write your beautiful story here!]",
    img: "/images/IMG_9512.JPG",
    rot: "1deg",
  },
  {
    id: 7,
    title: "Memory 7",
    caption: "[Caption 7] 🎂",
    longDesc: "[Long Description for Memory 7 - Write your beautiful story here!]",
    img: "/images/IMG_9891.JPG",
    rot: "-2deg",
  },
];

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section
      id="gallery"
      className="relative w-full py-24 bg-gradient-to-b from-rose-50 to-pink-50 overflow-hidden"
      aria-labelledby="gallery-heading"
    >
      {/* Background blobs */}
      <div className="absolute top-20 right-[-10%] w-80 h-80 bg-fuchsia-100 rounded-full blur-3xl opacity-40 pointer-events-none" aria-hidden />
      <div className="absolute bottom-10 left-[-10%] w-80 h-80 bg-rose-100 rounded-full blur-3xl opacity-40 pointer-events-none" aria-hidden />

      {/* Heading */}
      <div className="text-center mb-16 px-4">
        <p className="text-rose-400 font-semibold tracking-widest uppercase text-sm mb-2">
          Our Memory Lane
        </p>
        <h2
          id="gallery-heading"
          className="text-4xl md:text-5xl font-extrabold text-slate-800 leading-tight"
        >
          The Scrapbook 📸
        </h2>
        <p className="mt-3 text-slate-500 text-lg max-w-md mx-auto">
          A scattered pile of my absolute favorite moments with you. Click any to open.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 items-center justify-items-center">
        {memories.map((photo) => (
          <motion.div
            key={photo.id}
            style={{ '--rot': photo.rot }}
            initial={{ opacity: 0, y: 40, rotate: photo.rot }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            whileHover={{ 
              scale: 1.05, 
              rotate: '0deg', 
              zIndex: 10,
              boxShadow: "0 25px 50px -12px rgba(244, 63, 94, 0.25)"
            }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            onClick={() => setSelectedPhoto(photo)}
            className="cursor-pointer bg-white p-4 pb-8 shadow-xl border border-slate-100 rounded-sm w-72 md:w-80 flex flex-col justify-between"
          >
            {/* Image Frame */}
            <div className="relative aspect-square w-full overflow-hidden bg-slate-50 border border-slate-200/55 rounded-sm">
              <img
                src={photo.img}
                alt={photo.title}
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Handwritten Caption */}
            <div className="mt-5 text-center">
              <p className="font-cursive text-3xl text-rose-600 leading-tight tracking-wide">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.9, opacity: 0, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-rose-100/50 flex flex-col md:flex-row cursor-default p-4 gap-6"
            >
              {/* Photo on left */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[450px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                <img
                  src={selectedPhoto.img}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Story/Text on right */}
              <div className="w-full md:w-1/2 flex flex-col justify-center p-4">
                <div className="mb-2">
                  <span className="text-rose-500 font-bold text-xs uppercase tracking-widest">
                    ✨ Memory Story
                  </span>
                  <h3 className="text-3xl font-extrabold text-slate-800 mt-1">
                    {selectedPhoto.title}
                  </h3>
                </div>
                
                <div className="mt-4 h-px bg-slate-100 w-24" />

                <p className="font-cursive text-2xl md:text-3xl text-slate-700 leading-relaxed mt-6 italic">
                  "{selectedPhoto.longDesc}"
                </p>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 transition-colors flex items-center justify-center font-bold text-slate-500 focus:outline-none"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
