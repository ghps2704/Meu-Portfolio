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
              loading="lazy"
              className="rounded-full w-60 h-60 md:w-72 md:h-72 object-cover shadow-lg border-4 border-gray-700"
            />
          </div>

          <div className="md:col-span-2 space-y-6">
            <h2 className="text-4xl font-bold mb-4 text-cyan-400">Sobre Mim</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Construo coisas na intersecção entre Tecnologia e Finanças.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Como Software Engineer, me especializo em criar ferramentas
              internas, automações e aplicações full-stack que resolvem
              problemas reais de negócio — não só funcionais, mas que as
              pessoas realmente querem usar. Meu stack atual gira em torno de
              React, TypeScript, Node.js e ferramentas no-code como n8n,
              sempre escolhidas com base no que o problema exige.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Em paralelo, opero os mercados B3 e americano de forma
              independente. Esse mundo afiou algo que a engenharia pura
              raramente desenvolve: a capacidade de tomar decisões sob
              incerteza, gerenciar risco e manter disciplina quando os sistemas
              não se comportam como esperado. Isso mudou a forma como penso
              sobre software.
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
