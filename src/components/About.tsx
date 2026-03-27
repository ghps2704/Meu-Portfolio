import { motion } from "framer-motion";

const techSkills = [
  "React",
  "TypeScript",
  "Node.js",
  "Supabase",
  "n8n",
  "Tailwind CSS",
  "Framer Motion",
  "Git",
  "Vite",
];

export default function About() {
  return (
    <section
      id="sobre"
      data-section
      className="relative min-h-screen flex items-center py-24 px-6 md:px-16"
    >
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">

          {/* Left — profile image */}
          <motion.div
            className="md:col-span-2 flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-3 rounded-full bg-cyan-400/10 blur-xl" />
              <div className="absolute -inset-1 rounded-full border border-cyan-400/20" />
              <img
                src="/guilherme.png"
                alt="Guilherme Persuhn"
                loading="lazy"
                className="relative rounded-full w-52 h-52 md:w-64 md:h-64 object-cover"
              />
            </div>

            {/* Label under photo */}
            <div className="text-center">
              <p className="text-[9px] tracking-[0.55em] text-gray-600 uppercase">
                Software Engineer
              </p>
              <p className="text-[9px] tracking-[0.35em] text-gray-700 uppercase mt-1">
                Brasil — Inst. ESPE &amp; Empreendedor
              </p>
            </div>
          </motion.div>

          {/* Right — content panel */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            {/* Glass card */}
            <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10">
              <h2 className="text-[10px] tracking-[0.55em] text-cyan-400/70 uppercase mb-3">
                Sobre Mim
              </h2>
              <h3 className="text-3xl md:text-4xl font-black tracking-wider text-white mb-2">
                GUILHERME
              </h3>
              <div className="w-10 h-px bg-cyan-400 mb-7" />

              <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
                <p>
                  Construo coisas na intersecção entre{" "}
                  <span className="text-cyan-400/80">
                    Tecnologia e Finanças
                  </span>
                  .
                </p>
                <p>
                  Como Software Engineer, me especializo em criar ferramentas
                  internas, automações e aplicações full-stack que resolvem
                  problemas reais de negócio. Meu stack gira em torno de React,
                  TypeScript, Node.js e ferramentas no-code como n8n.
                </p>
                <p>
                  Em paralelo, opero os mercados B3 e americano de forma
                  independente. Isso afiou algo que a engenharia pura raramente
                  desenvolve: a capacidade de tomar{" "}
                  <span className="text-cyan-400/80">
                    decisões sob incerteza
                  </span>{" "}
                  e manter disciplina quando sistemas não se comportam como
                  esperado.
                </p>
              </div>

              {/* Skills */}
              <div className="mt-8">
                <p className="text-[9px] tracking-[0.45em] text-gray-600 uppercase mb-4">
                  Stack &amp; Ferramentas
                </p>
                <div className="flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-white/5 border border-white/10 text-cyan-300/80 px-3 py-1.5 rounded-full text-[11px] tracking-wide font-medium hover:border-cyan-400/40 hover:text-cyan-300 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
