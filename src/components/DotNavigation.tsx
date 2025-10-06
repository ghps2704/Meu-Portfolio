import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DotNavigationProps {
  total: number;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const sectionNames = ["Início", "Sobre", "Projetos", "Contato"];

export default function DotNavigation({
  total,
  currentIndex,
  setCurrentIndex,
}: DotNavigationProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.span
                className="absolute right-full mr-4 px-3 py-1 bg-gray-700 text-white text-sm rounded-md whitespace-nowrap"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {sectionNames[index]}
              </motion.span>
            )}
          </AnimatePresence>

          <button
            onClick={() => setCurrentIndex(index)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentIndex === index ? "#22d3ee" : "#6b7280",
              transform: currentIndex === index ? "scale(1.5)" : "scale(1)",
            }}
          />
        </div>
      ))}
    </div>
  );
}
