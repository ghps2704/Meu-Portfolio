import { motion } from "framer-motion";

const techSkills = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Estratégia Digital",
  "SEO",
  "Git",
  "Vite",
];

export default function About() {
  return (
    <section
      id="sobre"
      className="w-full h-full flex items-center bg-transparent text-white py-20 md:py-0"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="md:col-span-1 flex justify-center">
            <img
              src="/guilherme.png"
              alt="Foto de Guilherme Persuhn"
              className="rounded-full w-60 h-60 md:w-72 md:h-72 object-cover shadow-lg border-4 border-gray-700"
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl font-bold mb-4 text-cyan-400">Sobre Mim</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Sou um profissional com um perfil único que une o técnico, o
              analítico e o estratégico.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Minha base é o desenvolvimento front-end, uma área em que
              tenho mais de 4 anos de experiência, com foco total em React,
              TypeScript e na construção de interfaces de alta performance.
              Minha jornada no mercado financeiro como Day Trader afiou
              minha visão analítica, disciplina e a capacidade de tomar decisões
              estratégicas sob pressão.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Hoje, eu uno essas duas frentes. Minha paixão é usar minha
              habilidade técnica para construir produtos digitais, e minha visão
              estratégica como Lançador Digital para garantir que esses
              produtos se transformem em negócios de sucesso. Eu não só construo
              a plataforma; eu ajudo a criar o plano para o seu lançamento.
            </p>

            <div className="pt-4">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                Habilidades & Ferramentas
              </h3>
              <div className="flex flex-wrap gap-3">
                {techSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-700 text-cyan-300 px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
