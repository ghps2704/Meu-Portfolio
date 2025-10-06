import { Link } from 'react-scroll';
import { motion } from 'framer-motion';

const navLinks = [
  { to: 'sobre', label: 'Sobre' },
  { to: 'projetos', label: 'Projetos' },
  { to: 'contato', label: 'Contato' },
];

export default function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          <Link 
            to="inicio" 
            smooth={true} 
            duration={500}
            className="cursor-pointer"
          >
            Guilherme Persuhn
          </Link>
        </div>

        {/* Links de Navegação */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to} 
              smooth={true}
              duration={500}
              offset={-80} 
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 font-medium cursor-pointer"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}