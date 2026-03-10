import { useState, useEffect, useRef } from "react";

export default function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        setPosition({ x: ev.clientX, y: ev.clientY });
        rafId.current = null;
      });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return position;
}
