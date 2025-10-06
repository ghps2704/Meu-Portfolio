import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 p-6">
      <div className="container mx-auto flex justify-between items-center text-gray-500">
        <p className="text-sm">&copy; {new Date().getFullYear()} Guilherme Persuhn</p>
        <div className="flex space-x-4">
          <a href="https://github.com/ghps2704" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/guilherme-henrique-2a1999218" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}