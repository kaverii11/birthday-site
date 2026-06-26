import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './LoadingScreen';
import HeroSection   from './HeroSection';
import Timeline      from './Timeline';
import GallerySection from './GallerySection';
import JarSection    from './JarSection';
import Footer        from './Footer';
import CassettePlayer from './CassettePlayer';

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {!gameStarted ? (
          <LoadingScreen key="loading" onStart={() => setGameStarted(true)} />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HeroSection />
            <Timeline />
            <GallerySection />
            <JarSection />
            <Footer />
            <CassettePlayer autoPlay={true} />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
