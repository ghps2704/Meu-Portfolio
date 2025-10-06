import { motion } from 'framer-motion';
import useMousePosition from '../hooks/useMousePosition';

export default function CursorSpotlight() {
  const { x, y } = useMousePosition();
  const size = 350; // Aumentei um pouco o tamanho para um efeito mais suave

  return (
    <motion.div
      // AQUI ESTÁ A CORREÇÃO:
      // O efeito de mesclagem e o z-index pertencem à lanterna!
      className="fixed top-0 left-0 pointer-events-none z-10 mix-blend-screen" 
      animate={{
        x: x - size / 2,
        y: y - size / 2,
      }}
      transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        // Um gradiente branco funciona melhor com mix-blend-screen em fundos escuros
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent 70%)',
      }}
    />
  );
}