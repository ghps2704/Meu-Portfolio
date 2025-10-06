import { motion, type Variants } from "framer-motion";

const shapeVariants: Variants = {
  enter: {
    opacity: 0,
    scale: 0.5,
    rotate: -45,
  },
  center: {
    opacity: 0.1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 45,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export default function AnimatedShape() {
  return (
    <motion.div
      className="absolute inset-0 m-auto w-96 h-96 border-4 border-cyan-400/20 rounded-lg -z-10"
      variants={shapeVariants}
    />
  );
}
