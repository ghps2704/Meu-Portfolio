// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import DotNavigation from './components/DotNavigation';
import CursorSpotlight from './components/CursorSpotlight';

const sections = [<Hero />, <About />, <Projects />, <Contact />];

const sectionVariants: Variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? '100vh' : '-100vh',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction < 0 ? '100vh' : '-100vh',
      opacity: 0,
    }),
};

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isScrolling = useRef(false);

  const changeSection = (newIndex: number) => {
    if (isScrolling.current) return;
    if (newIndex === currentIndex) return;
    if (newIndex < 0 || newIndex >= sections.length) return;

    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 1300);

    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling.current) return;

      const scrollDirection = event.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + scrollDirection;
      
      changeSection(nextIndex);
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex]); 

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      <CursorSpotlight />
      <DotNavigation
        total={sections.length}
        currentIndex={currentIndex}
        setCurrentIndex={changeSection}
      />
      
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          className="absolute w-full h-full"
          variants={sectionVariants}
          custom={direction}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            y: { type: 'tween', ease: 'easeInOut', duration: 1.2 },
            opacity: { duration: 0.4, ease: 'easeOut' },
          }}
        >
          {sections[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;