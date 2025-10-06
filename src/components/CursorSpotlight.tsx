import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export default function CursorSpotlight() {
  const { x, y } = useMousePosition();
  const size = 350;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-10 mix-blend-screen"
      animate={{
        x: x - size / 2,
        y: y - size / 2,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background:
          "radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%)",
      }}
    />
  );
}
