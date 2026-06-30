import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import useMousePosition from "../hooks/useMousePosition";

const MAGNETIC_PULL = 0.4;

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const quickRing = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const quickDot = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const magnetTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;

    quickDot.current = {
      x: gsap.quickTo(dotRef.current, "x", { duration: 0.15, ease: "power3.out" }),
      y: gsap.quickTo(dotRef.current, "y", { duration: 0.15, ease: "power3.out" }),
    };
    quickRing.current = {
      x: gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3.out" }),
      y: gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3.out" }),
    };
  }, []);

  useEffect(() => {
    if (!quickDot.current || !quickRing.current) return;

    const target = magnetTarget.current;
    if (target) {
      const rect = target.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      quickDot.current.x(cx + (x - cx) * (1 - MAGNETIC_PULL));
      quickDot.current.y(cy + (y - cy) * (1 - MAGNETIC_PULL));
      quickRing.current.x(cx + (x - cx) * (1 - MAGNETIC_PULL));
      quickRing.current.y(cy + (y - cy) * (1 - MAGNETIC_PULL));
    } else {
      quickDot.current.x(x);
      quickDot.current.y(y);
      quickRing.current.x(x);
      quickRing.current.y(y);
    }
  }, [x, y]);

  useEffect(() => {
    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      magnetTarget.current = el;
      gsap.to(ringRef.current, { scale: 1.8, opacity: 0.5, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
    };
    const onLeave = () => {
      magnetTarget.current = null;
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
    };

    const elements = document.querySelectorAll<HTMLElement>("[data-magnetic]");
    elements.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-cyan-400 pointer-events-none z-[100] mix-blend-screen"
        style={{ translate: "-50% -50%" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-cyan-400/60 pointer-events-none z-[100] mix-blend-screen"
        style={{ translate: "-50% -50%" }}
      />
    </>
  );
}
