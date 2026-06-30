import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import ParallaxTilt from "react-parallax-tilt";
import useMediaQuery from "../hooks/useMediaQuery";
import SplitText from "./SplitText";

const projectsData = [
  {
    title: "Trade Claro",
    subtitle: "Trade Journal",
    description:
      "Trade journal with an integrated psychological layer for day traders. Tracks results, emotions, confidence, and plan adherence — then cross-references that data to reveal behavioral patterns.",
    imageUrl: "/trade-claro.png",
    techStack: ["React", "TypeScript", "Supabase", "Vercel"],
    liveUrl: "https://trade-claro-43rz.vercel.app/",
    accentColor: "from-cyan-500/20 to-blue-600/10",
  },
  {
    title: "Portfolio",
    subtitle: "For a Psychologist",
    description:
      "A professional and welcoming website for a psychologist, focused on conveying trust and making it easy to schedule appointments.",
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
      "Complete front-end e-commerce with cart, filters, search, and animations, built to simulate a real shopping experience using React's Context API.",
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
    subtitle: "ERP for Dental Clinics",
    description:
      "Full-featured ERP with integrated AI for dental clinics. Manages scheduling, finances, digital patient records, and an AI assistant that optimizes revenue and automatically fills gaps in the calendar.",
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

function ProjectLinks({ project }: { project: (typeof projectsData)[number] }) {
  return (
    <div className="flex items-center gap-6">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-magnetic
        className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-gray-400 hover:text-cyan-400 transition-colors duration-200 uppercase"
      >
        <FaExternalLinkAlt className="text-xs" />
        View Project
      </a>
      {project.repoUrl && (
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-magnetic
          className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-gray-400 hover:text-cyan-400 transition-colors duration-200 uppercase"
        >
          <FaGithub className="text-xs" />
          Code
        </a>
      )}
    </div>
  );
}

function TechTags({ techStack }: { techStack: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {techStack.map((tech) => (
        <span
          key={tech}
          className="bg-white/5 border border-white/8 text-cyan-400/70 px-2.5 py-1 rounded-full text-[10px] tracking-wide"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}

function SectionHeading() {
  return (
    <motion.div
      className="mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <p className="text-[9px] tracking-[0.55em] text-cyan-400/70 uppercase mb-3">
        Selected Works
      </p>
      <h2 className="text-4xl md:text-5xl font-black tracking-[0.12em] text-white">
        PROJETOS
      </h2>
      <div className="w-10 h-px bg-cyan-400 mt-4" />
    </motion.div>
  );
}

export default function Projects() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section
      id="projetos"
      data-section
      className="relative min-h-screen py-24 px-6 md:pl-32 md:pr-16"
    >
      <div className="container mx-auto max-w-6xl">
        <SectionHeading />

        {isDesktop ? (
          // Case-study layout — each project gets its own full-width,
          // alternating-side scene instead of being squeezed into a grid card.
          <div className="flex flex-col gap-32">
            {projectsData.map((project, index) => {
              const reversed = index % 2 === 1;
              return (
                <motion.div
                  key={project.title}
                  className={`flex flex-col md:flex-row ${reversed ? "md:flex-row-reverse" : ""} items-center gap-12`}
                  initial={{ opacity: 0, x: reversed ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <div className="w-full md:w-3/5">
                    <ParallaxTilt
                      tiltMaxAngleX={5}
                      tiltMaxAngleY={5}
                      perspective={1400}
                      scale={1.02}
                      transitionSpeed={1200}
                      glareEnable
                      glareMaxOpacity={0.08}
                      glareColor="#22d3ee"
                      glareBorderRadius="20px"
                    >
                      <div className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/30 transition-all duration-500">
                        <div
                          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${project.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10`}
                        />
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          loading="lazy"
                          className="w-full h-72 lg:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      </div>
                    </ParallaxTilt>
                  </div>

                  <div className="w-full md:w-2/5">
                    <p className="text-[9px] tracking-[0.45em] text-gray-600 uppercase mb-2">
                      {project.subtitle}
                    </p>
                    <h3 className="text-3xl lg:text-4xl font-black tracking-wider text-white mb-4">
                      <SplitText text={project.title} animateOnScroll yOffset={24} />
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                    <div className="mb-7">
                      <TechTags techStack={project.techStack} />
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Mobile — compact grid, no pinned scroll choreography
          <div className="flex flex-wrap justify-center gap-6">
            {projectsData.map((project, index) => (
              <motion.div
                key={project.title}
                className="w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: index * 0.1 }}
              >
                <div className="group relative h-full bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/30 transition-all duration-500">
                  <div
                    className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${project.accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />
                  <div className="relative overflow-hidden h-44">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>
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
                    <div className="mb-6">
                      <TechTags techStack={project.techStack} />
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
