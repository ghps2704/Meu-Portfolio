import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Hero() {
  const myEmail = "gpersuhn2704@gmail.com";

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/ghps2704",
      label: "GitHub",
    },
    {
      icon: <FaLinkedin />,
      href: "https://linkedin.com/in/guilherme-henrique-2a1999218",
      label: "LinkedIn",
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(myEmail);
    toast.success("E-mail copiado para a área de transferência!");
  };

  return (
    <section
      id="inicio"
      className="h-screen flex items-center justify-center text-center bg-transparent text-white p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Guilherme Persuhn
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          Transformo sua visão em um produto digital, e seu produto em um
          negócio.
        </motion.p>

        <motion.div
          className="flex justify-center space-x-6"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              aria-label={link.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-3xl"
            >
              {link.icon}
            </a>
          ))}

          <button
            onClick={handleCopyEmail}
            aria-label="Copiar e-mail"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-3xl"
          >
            <FaEnvelope />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
