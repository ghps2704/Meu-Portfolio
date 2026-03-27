import { useState, useEffect, useRef } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "react-hot-toast";
import useMediaQuery from "./hooks/useMediaQuery";

import CosmosBackground from "./components/CosmosBackground";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";

const NAV_ITEMS = [
  { label: "INÍCIO", id: "inicio" },
  { label: "SOBRE", id: "sobre" },
  { label: "PROJETOS", id: "projetos" },
  { label: "CONTATO", id: "contato" },
];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function App() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0
          ? Math.max(0, Math.min(1, window.scrollY / maxScroll))
          : 0;
        setScrollProgress(progress);

        // Determine current section by which element is most in view
        const ids = NAV_ITEMS.map((n) => n.id);
        let active = 0;
        ids.forEach((id, i) => {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5) active = i;
          }
        });
        setCurrentSection(active);
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  // Mobile layout — cosmos lite + standard scroll
  if (isMobile) {
    return (
      <div style={{ background: "#000" }}>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#0f172a",
              color: "#22d3ee",
              border: "1px solid rgba(34,211,238,0.2)",
            },
          }}
        />
        <CosmosBackground lite />
        {/* Vignette for readability */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 1,
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.65) 100%)",
          }}
        />
        <div className="relative" style={{ zIndex: 10 }}>
          <Header isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <MobileMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    );
  }

  // Desktop — cosmic long-scroll experience
  return (
    <div style={{ background: "#000" }}>
      <SpeedInsights />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#0f172a",
            color: "#22d3ee",
            border: "1px solid rgba(34,211,238,0.2)",
          },
        }}
      />

      {/* Three.js fixed canvas */}
      <CosmosBackground />

      {/* Dark vignette overlay — improves text readability against bright stars/bloom */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Side navigation */}
      <nav
        className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-5"
        aria-label="Navegação lateral"
      >
        {/* Hamburger icon */}
        <div className="flex flex-col gap-1 mb-2">
          <span className="block w-6 h-px bg-cyan-400" />
          <span className="block w-4 h-px bg-cyan-400/60" />
          <span className="block w-5 h-px bg-cyan-400/40" />
        </div>

        {/* Vertical nav labels */}
        <div
          className="flex flex-col gap-4"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {NAV_ITEMS.map((item, i) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-[10px] tracking-[0.35em] font-light transition-all duration-300 ${
                currentSection === i
                  ? "text-cyan-400"
                  : "text-gray-600 hover:text-gray-300"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[9px] tracking-[0.45em] text-gray-500 font-light">
          SCROLL
        </span>
        <div className="w-28 h-px bg-gray-800 relative overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-cyan-400 transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <span className="text-[9px] tracking-[0.25em] text-gray-500 font-light">
          {String(currentSection + 1).padStart(2, "0")} /{" "}
          {String(NAV_ITEMS.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scrollable content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
