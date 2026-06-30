import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let sharedLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return sharedLenis;
}

/** Smooth/inertia scroll wired into the GSAP ticker so ScrollTrigger-driven
 * animations stay frame-synced instead of racing the native scroll event. */
export default function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    sharedLenis = lenis;

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      sharedLenis = null;
    };
  }, [enabled]);
}
