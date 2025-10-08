// src/App.tsx
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import useMediaQuery from "./hooks/useMediaQuery";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "react-hot-toast";

import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import DotNavigation from "./components/DotNavigation";
import CursorSpotlight from "./components/CursorSpotlight";
import AnimatedShape from "./components/AnimatedShape";

const sections = [<Hero />, <About />, <Projects />, <Contact />];

const sectionVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100vh" : "-100vh",
    opacity: 0,
  }),
  center: { zIndex: 1, y: 0, opacity: 1 },
  exit: (direction: number) => ({
    zIndex: 0,
    y: direction < 0 ? "100vh" : "-100vh",
    opacity: 0,
  }),
};

function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const isScrolling = useRef(false);

  const changeSection = (newIndex: number) => {
    if (
      isScrolling.current ||
      newIndex === currentIndex ||
      newIndex < 0 ||
      newIndex >= sections.length
    )
      return;
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 1300);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";
    const handleWheel = (event: WheelEvent) => {
      if (isScrolling.current) return;
      const scrollDirection = event.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + scrollDirection;
      changeSection(nextIndex);
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "auto";
    };
  }, [isMobile, currentIndex]);

  // LAYOUT MOBILE
  if (isMobile) {
    return (
      <div className="bg-gray-900">
        <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

        {/* Adicionado o Toaster para o mobile */}
        <Toaster
          position="bottom-center"
          toastOptions={{ style: { background: "#333", color: "#fff" } }}
        />

        <main>
          {sections.map((Section, index) => (
            <div key={index}>{Section}</div>
          ))}
        </main>
      </div>
    );
  }

  // LAYOUT DESKTOP
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Adicionado o Toaster para o desktop */}
      <Toaster
        position="bottom-center"
        toastOptions={{ style: { background: "#333", color: "#fff" } }}
      />

      <SpeedInsights />
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
            y: { type: "tween", ease: "easeInOut", duration: 1.2 },
            opacity: { duration: 0.4, ease: "easeOut" },
          }}
        >
          <AnimatedShape />
          {sections[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
