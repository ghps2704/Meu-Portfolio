import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import Footer from "./Footer";

const MY_EMAIL = "gpersuhn2704@gmail.com";

export default function Contact() {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(MY_EMAIL);
    toast.success("E-mail copiado!");
  };

  return (
    <section
      id="contato"
      data-section
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        className="w-full max-w-xl bg-black/50 backdrop-blur-md rounded-3xl px-10 py-14 border border-white/8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Label */}
        <p className="text-[9px] tracking-[0.55em] text-cyan-400/60 uppercase mb-4">
          Vamos trabalhar juntos
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-black tracking-[0.1em] text-white mb-3">
          CONTATO
        </h2>
        <div className="w-12 h-px bg-cyan-400 mx-auto mb-8" />

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed mb-10 max-w-md mx-auto">
          Gostou do que viu? Estou disponível para novas oportunidades e
          projetos. Adoraria ouvir sobre suas ideias.
        </p>

        {/* CTA button */}
        <a
          href="https://api.whatsapp.com/send/?phone=5543998161106&text=Ol%C3%A1!+Vi+seu+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block group relative"
        >
          <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl group-hover:bg-cyan-400/30 transition-all duration-500" />
          <span className="relative inline-block border border-cyan-400/60 text-cyan-400 font-bold py-4 px-12 rounded-full text-sm tracking-[0.3em] uppercase hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300">
            Vamos Conversar
          </span>
        </a>

        {/* Social icons */}
        <div className="flex items-center justify-center gap-8 mt-14">
          <a
            href="https://github.com/ghps2704"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
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
            className="text-gray-600 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <span className="w-px h-4 bg-gray-800" />
          <button
            onClick={handleCopyEmail}
            aria-label="Copiar e-mail"
            className="text-gray-600 hover:text-cyan-400 transition-all duration-300 text-xl hover:scale-110"
          >
            <FaEnvelope />
          </button>
        </div>
      </motion.div>

      <Footer />
    </section>
  );
}
