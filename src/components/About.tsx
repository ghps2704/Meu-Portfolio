import { motion } from "framer-motion";

const techSkills = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
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
              src="/Guilherme.jpeg"
              alt="Foto de Guilherme Persuhn"
              className="rounded-full w-60 h-60 md:w-72 md:h-72 object-cover shadow-lg border-4 border-gray-700"
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl font-bold mb-4 text-cyan-400">Sobre Mim</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Minha trajetória profissional combina a lógica analítica do
              mercado financeiro com a criatividade da tecnologia. Como Day
              Trader, desenvolvi uma forte disciplina e uma visão estratégica
              para identificar padrões e tomar decisões precisas sob muita
              pressão.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Durante as tardes, canalizo essa mesma energia e foco no
              desenvolvimento front-end, minha outra grande paixão. Utilizo
              minha capacidade de resolver problemas para construir interfaces
              de usuário que não são apenas bonitas, mas também eficientes e
              intuitivas. Acredito que a mesma atenção aos detalhes que leva ao
              sucesso no mercado é a que cria uma experiência digital de alta
              qualidade.
            </p>

            <div className="pt-4">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                Tecnologias
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
