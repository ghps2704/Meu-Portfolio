import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const MY_EMAIL = "gpersuhn2704@gmail.com";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const tl = gsap.timeline({ delay: 0.5 });

    // Animate all chars in the title block
    tl.to(titleRef.current.querySelectorAll(".char"), {
      y: 0,
      opacity: 1,
      duration: 1.4,
      stagger: 0.035,
      ease: "power4.out",
    });

    if (subtitleRef.current) {
      tl.to(
        subtitleRef.current,
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.8"
      );
    }

    if (linksRef.current) {
      tl.to(
        linksRef.current,
        { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
        "-=0.55"
      );
    }

    if (scrollHintRef.current) {
      tl.to(
        scrollHintRef.current,
        { opacity: 1, duration: 0.8, ease: "power1.out" },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  // "Zoom through the name" outro — the title scales up and fades as the
  // user starts scrolling past Hero, scrubbed to scroll so it stays in
  // lockstep with the cosmic camera move instead of firing as a one-shot.
  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    const outro = gsap.fromTo(
      titleRef.current,
      { scale: 1, opacity: 1, filter: "blur(0px)" },
      {
        scale: 2.2,
        opacity: 0,
        filter: "blur(6px)",
        ease: "power1.in",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      }
    );

    return () => {
      outro.scrollTrigger?.kill();
      outro.kill();
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MY_EMAIL);
    toast.success("Email copied!");
  };

  return (
    <section
      id="inicio"
      data-section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white px-6"
    >
      {/* Dark radial backdrop — darkens the cosmos behind the name without touching the letters */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "80vw",
          height: "55vh",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, transparent 70%)",
        }}
      />

      {/* Main title block */}
      <div ref={titleRef} className="relative leading-none overflow-visible">
        {/* First line — solid white */}
        <div className="overflow-hidden mb-2">
          <SplitText
            text="GUILHERME"
            yOffset={110}
            className="text-[12vw] md:text-[10vw] font-black tracking-[0.05em] text-white"
          />
        </div>

        {/* Second line — outlined / stroke only */}
        <div className="overflow-hidden">
          <SplitText
            text="PERSUHN"
            outlined
            yOffset={110}
            className="text-[12vw] md:text-[10vw] font-black tracking-[0.1em]"
          />
        </div>
      </div>

      {/* Divider */}
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-7" />

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="flex flex-col items-center gap-2"
        style={{ opacity: 0, transform: "translateY(18px)", textShadow: "0 1px 12px rgba(0,0,0,1)" }}
      >
        <p className="text-xs md:text-sm tracking-[0.5em] text-cyan-400/80 font-light uppercase">
          Software Engineer
        </p>
        <p className="text-[10px] tracking-[0.35em] text-gray-600 font-light uppercase hidden md:block">
          Building fast systems &amp; interactive interfaces
        </p>
      </div>

      {/* Social links */}
      <div
        ref={linksRef}
        className="flex items-center gap-7 mt-10"
        style={{ opacity: 0, transform: "translateY(14px)" }}
      >
        <a
          href="https://github.com/ghps2704"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          data-magnetic
          className="text-gray-500 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
        >
          <FaGithub />
        </a>
        <span className="w-px h-4 bg-gray-800" />
        <a
          href="https://linkedin.com/in/guilherme-henrique-2a1999218"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          data-magnetic
          className="text-gray-500 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
        >
          <FaLinkedin />
        </a>
        <span className="w-px h-4 bg-gray-800" />
        <button
          onClick={handleCopyEmail}
          aria-label="Copy email"
          data-magnetic
          className="text-gray-500 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
        >
          <FaEnvelope />
        </button>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="text-[9px] tracking-[0.5em] text-gray-600 font-light">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
