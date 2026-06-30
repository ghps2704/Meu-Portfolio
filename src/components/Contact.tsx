import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import ParallaxTilt from "react-parallax-tilt";
import Footer from "./Footer";
import SplitText from "./SplitText";

const MY_EMAIL = "gpersuhn2704@gmail.com";

export default function Contact() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MY_EMAIL);
    toast.success("Email copied!");
  };

  return (
    <section
      id="contato"
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <ParallaxTilt
          tiltMaxAngleX={4}
          tiltMaxAngleY={4}
          perspective={1400}
          scale={1.01}
          transitionSpeed={1200}
          glareEnable
          glareMaxOpacity={0.06}
          glareColor="#22d3ee"
          glareBorderRadius="24px"
          className="bg-black/50 backdrop-blur-md rounded-3xl px-10 py-14 border border-white/8"
        >
          {/* Label */}
          <p className="text-[9px] tracking-[0.55em] text-cyan-400/60 uppercase mb-4">
            Let's work together
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-black tracking-[0.1em] text-white mb-3">
            <SplitText text="CONTACT" animateOnScroll yOffset={40} />
          </h2>
          <div className="w-12 h-px bg-cyan-400 mx-auto mb-8" />

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md mx-auto">
            Like what you see? I'm open to new opportunities and projects.
            I'd love to hear about your ideas.
          </p>

          {/* CTA button */}
          <a
            href="https://api.whatsapp.com/send/?phone=5543998161106&text=Ol%C3%A1!+Vi+seu+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            data-magnetic
            className="inline-block group relative"
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/30 transition-all duration-500" />
            <span className="relative inline-block border border-cyan-400/60 text-cyan-400 font-bold py-4 px-12 rounded-full text-sm tracking-[0.3em] uppercase hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300">
              Let's Talk
            </span>
          </a>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-8 mt-14">
            <a
              href="https://github.com/ghps2704"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-magnetic
              className="text-gray-600 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
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
              className="text-gray-600 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <span className="w-px h-4 bg-gray-800" />
            <button
              onClick={handleCopyEmail}
              aria-label="Copy email"
              data-magnetic
              className="text-gray-600 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
            >
              <FaEnvelope />
            </button>
          </div>
        </ParallaxTilt>
      </motion.div>

      <Footer />
    </section>
  );
}
