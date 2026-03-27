import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ParallaxTilt from "react-parallax-tilt";

const projectsData = [
  {
    title: "Trade Claro",
    subtitle: "Diário de Trades",
    description:
      "Diário de trades com camada psicológica integrada para day traders brasileiros. Registra resultado, emoção, confiança e adesão ao plano — e cruza esses dados para revelar padrões comportamentais.",
    imageUrl: "/trade-claro.png",
    techStack: ["React", "TypeScript", "Supabase", "Vercel"],
    liveUrl: "https://trade-claro-43rz.vercel.app/",
    accentColor: "from-cyan-500/20 to-blue-600/10",
  },
  {
    title: "Portfólio",
    subtitle: "Para Psicóloga",
    description:
      "Site de apresentação profissional e acolhedor para uma psicóloga, focado em transmitir confiança e facilitar o agendamento de consultas.",
    imageUrl: "/print-porfolio-psicologa.png",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    liveUrl: "https://portfolio-adriana-gold.vercel.app/",
    repoUrl: "https://github.com/ghps2704/portfolio-adriana",
    accentColor: "from-purple-500/20 to-pink-600/10",
  },
  {
    title: "Quantum Store",
    subtitle: "E-commerce",
    description:
      "E-commerce front-end completo com carrinho, filtros, busca e animações, construído para simular uma experiência de compra real utilizando a Context API do React.",
    imageUrl: "/quantum-store.png",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Framer Motion",
    ],
    liveUrl: "https://quantum-store-psi.vercel.app/",
    repoUrl: "https://github.com/ghps2704/QuantumStore",
    accentColor: "from-emerald-500/20 to-teal-600/10",
  },
  {
    title: "Odontly",
    subtitle: "ERP para Clínicas Odontológicas",
    description:
      "ERP completo com IA integrada para clínicas odontológicas. Gestão de agenda, financeiro, prontuários digitais e um assistente de IA que otimiza receita e preenche lacunas na agenda automaticamente.",
    imageUrl: "/odontly.png",
    techStack: [
      "React",
      "TypeScript",
      "Node.js",
      "Supabase",
      "Tailwind CSS",
    ],
    liveUrl: "https://odontly.com.br/",
    repoUrl: "",
    accentColor: "from-blue-500/20 to-indigo-600/10",
  },
];

export default function Projects() {
  return (
    <section
      id="projetos"
      data-section
      className="relative min-h-screen py-24 px-6 md:px-16"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-[9px] tracking-[0.55em] text-cyan-400/70 uppercase mb-3">
            Trabalhos Selecionados
          </p>
          <h2 className="text-4xl md:text-5xl font-black tracking-[0.12em] text-white">
            PROJETOS
          </h2>
          <div className="w-10 h-px bg-cyan-400 mt-4" />
        </motion.div>

        {/* Project cards grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            >
              <ParallaxTilt
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                perspective={1200}
                scale={1.03}
                transitionSpeed={1200}
                gyroscope
                className="h-full"
              >
                <div className="group relative h-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500">
                  {/* Gradient accent top */}
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${project.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Project image */}
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-[9px] tracking-[0.45em] text-gray-600 uppercase mb-1">
                      {project.subtitle}
                    </p>
                    <h3 className="text-lg font-black tracking-wider text-white mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-5">
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-white/5 border border-white/8 text-cyan-400/70 px-2.5 py-1 rounded-full text-[10px] tracking-wide"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-5">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-gray-400 hover:text-cyan-400 transition-colors duration-200 uppercase"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        Ver Projeto
                      </a>
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-gray-400 hover:text-cyan-400 transition-colors duration-200 uppercase"
                        >
                          <FaGithub className="text-xs" />
                          Código
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ParallaxTilt>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
