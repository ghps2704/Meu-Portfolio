import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Footer from "./Footer";

export default function Contact() {
  return (
    <section
      id="contato"
      className="w-full text-white bg-transparent py-20 md:py-0 md:h-full flex items-center justify-center relative"
    >
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-bold text-cyan-400 mb-4">
            Vamos Conversar
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Gostou do que viu? Atualmente estou disponível para novas
            oportunidades e projetos freelancer. Adoraria ouvir sobre suas
            ideias.
          </p>

          <a
            href="https://api.whatsapp.com/send/?phone=5543998161106&text=Ol%C3%A1!+Vi+seu+site+e+gostaria+de+mais+informa%C3%A7%C3%B5es.&type=phone_number&app_absent=0"
            className="inline-block bg-cyan-500 text-gray-900 font-bold py-4 px-10 rounded-full hover:bg-cyan-400 transition-all duration-300 shadow-lg text-lg"
            target="_blank"
          >
            Diga Olá
          </a>

          <div className="flex justify-center space-x-6 mt-12">
            <a
              href="https://github.com/ghps2704"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-3xl"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/guilherme-henrique-2a1999218"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-3xl"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:gpersuhn2704@gmail.com"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-3xl"
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>
      </div>

      <Footer />
    </section>
  );
}
