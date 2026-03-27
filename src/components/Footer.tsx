export default function Footer() {
  return (
    <footer className="absolute bottom-0 left-0 right-0 px-8 py-5">
      <div className="flex justify-between items-center">
        <p className="text-[9px] tracking-[0.4em] text-gray-700 uppercase">
          &copy; {new Date().getFullYear()} Guilherme Persuhn
        </p>
        <p className="text-[9px] tracking-[0.3em] text-gray-800 uppercase">
          Crafted in the cosmos
        </p>
      </div>
    </footer>
  );
}