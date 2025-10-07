import { motion, type Variants } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ParallaxTilt from "react-parallax-tilt";

const projectsData = [
  {
    title: "Portfólio para Psicóloga",
    description:
      "Um site de apresentação profissional e acolhedor para uma psicóloga, focado em transmitir confiança e facilitar o agendamento de consultas.",
    imageUrl: "/print-porfolio-psicologa.png",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    liveUrl: "https://portfolio-adriana-gold.vercel.app/",
    repoUrl: "https://github.com/ghps2704/portfolio-adriana",
  },
  {
    title: "Quantum Store (E-commerce)",
    description:
      "Um e-commerce front-end completo com carrinho, filtros, busca e animações, construído para simular uma experiência de compra real utilizando a Context API do React.",
    imageUrl: "/quantum-store.png",
    techStack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Framer Motion",
      "React Hot Toast",
    ],
    liveUrl: "https://quantum-store-psi.vercel.app/",
    repoUrl: "https://github.com/ghps2704/QuantumStore",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Projects() {
  return (
    <section
      id="projetos"
      className="w-full h-full flex flex-col bg-transparent text-white pt-20 md:pt-24"
    >
      <div className="container mx-auto px-6 text-center flex-shrink-0">
        <h2 className="text-4xl font-bold text-cyan-400">Meus Projetos</h2>
        <p className="text-lg text-gray-300 mt-4 mb-10">
          Uma amostra do que eu amo construir.
        </p>
      </div>

      <div className="flex-grow overflow-y-auto pb-20 md:pb-24 scrollbar-thin scrollbar-thumb-cyan-400 scrollbar-track-gray-700 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {projectsData.map((project, index) => (
              <ParallaxTilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.05}
                transitionSpeed={1000}
                gyroscope={true}
              >
                <motion.div
                  className="bg-gray-800 rounded-lg shadow-xl overflow-hidden h-full"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <img
                    src={project.imageUrl}
                    alt={`Screenshot do projeto ${project.title}`}
                    className="w-full h-64 object-cover object-top"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Ver ao Vivo <FaExternalLinkAlt className="ml-2" />
                      </a>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Ver o Código <FaGithub className="ml-2" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </ParallaxTilt>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
