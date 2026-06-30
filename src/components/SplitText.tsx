import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  text: string;
  outlined?: boolean;
  className?: string;
  /** When true, the component drives its own char-by-char reveal as it
   * scrolls into view. When false, chars start hidden and it's up to the
   * parent to animate the ".char" elements (e.g. Hero's intro timeline). */
  animateOnScroll?: boolean;
  stagger?: number;
  duration?: number;
  yOffset?: number;
}

export default function SplitText({
  text,
  outlined = false,
  className = "",
  animateOnScroll = false,
  stagger = 0.03,
  duration = 0.9,
  yOffset = 60,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  const style = outlined
    ? { WebkitTextStroke: "1.5px rgba(34,211,238,0.75)", color: "transparent" }
    : {};

  useEffect(() => {
    if (!animateOnScroll || !containerRef.current) return;

    const chars = containerRef.current.querySelectorAll(".char");
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      onEnter: () => {
        gsap.to(chars, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease: "power4.out",
        });
      },
    });

    return () => trigger.kill();
  }, [animateOnScroll, duration, stagger]);

  return (
    <span ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ opacity: 0, transform: `translateY(${yOffset}px)`, ...style }}
          aria-hidden="true"
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
