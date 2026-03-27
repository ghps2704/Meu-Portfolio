import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

const MY_EMAIL = "gpersuhn2704@gmail.com";

interface SplitCharsProps {
  text: string;
  outlined?: boolean;
  className?: string;
}

function SplitChars({ text, outlined = false, className = "" }: SplitCharsProps) {
  const style = outlined
    ? {
        WebkitTextStroke: "1.5px rgba(34,211,238,0.75)",
        color: "transparent",
      }
    : {};

  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
          style={{ opacity: 0, transform: "translateY(110px)", ...style }}
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MY_EMAIL);
    toast.success("E-mail copiado!");
  };

  return (
    <section
      id="inicio"
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white px-6"
    >
      {/* Main title block */}
      <div ref={titleRef} className="leading-none overflow-visible">
        {/* First line — solid white */}
        <div className="overflow-hidden mb-2">
          <SplitChars
            text="GUILHERME"
            className="text-[12vw] md:text-[10vw] font-black tracking-[0.05em] text-white"
          />
        </div>

        {/* Second line — outlined / stroke only */}
        <div className="overflow-hidden">
          <SplitChars
            text="PERSUHN"
            outlined
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
          Criando sistemas rápidos &amp; interfaces interativas
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
          className="text-gray-500 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
        >
          <FaLinkedin />
        </a>
        <span className="w-px h-4 bg-gray-800" />
        <button
          onClick={handleCopyEmail}
          aria-label="Copiar e-mail"
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
          ROLE PARA EXPLORAR
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
