import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "inicio", label: "Início" },
  { to: "sobre", label: "Sobre" },
  { to: "projetos", label: "Projetos" },
  { to: "contato", label: "Contato" },
];

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MobileMenu({ isOpen, setIsOpen }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center space-y-8 z-40"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {navLinks.map((link) => (
            <a
              key={link.to}
              href={`#${link.to}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-cyan-400 text-3xl font-semibold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
