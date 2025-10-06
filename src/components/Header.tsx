
import { FaBars, FaTimes } from 'react-icons/fa';

interface HeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Header({ isOpen, setIsOpen }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 md:hidden">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white">
          <a href="#inicio" onClick={() => setIsOpen(false)}>
            Guilherme Persuhn
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-2xl z-50"
          aria-label="Abrir ou fechar menu"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </header>
  );
}