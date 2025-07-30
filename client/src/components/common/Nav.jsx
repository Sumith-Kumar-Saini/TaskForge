import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/hooks/useWindowSize"; // adjust path as needed

const links = [
  { label: "Features", href: "/#features" },
  { label: "Use Cases", href: "/#use-case" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Roadmap", href: "/#roadmap" },
  { label: "Contact", href: "/#contact" },
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isMobile } = useWindowSize();

  // Close menu automatically when switching to desktop
  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="md:px-5 md:py-2 py-2 bg-zinc-300 backdrop-blur-xs text-white relative">
      <nav className="flex items-center justify-between relative z-30">
        {/* Logo & Hamburger */}
        <div className="flex items-center">
          <h1 className="md:block hidden font-semibold text-zinc-900 md:text-[15px]">
            TaskForge
          </h1>
          <svg
            className="ri-menu-2-line text-zinc-900 text-2xl px-2 cursor-pointer md:hidden block w-10 h-10"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen((prev) => !prev);
            }}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1 7H9.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1 13H19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M1 19H9.8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}

        {/* Nav Links */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`z-20 flex-col md:flex-row md:static md:bg-transparent md:text-[15px] md:items-center md:justify-center flex gap-3 bg-zinc-200 w-full fixed pb-10 top-0 md:pb-0 md:w-fit text-center px-3 py-1 text-2xl md:transition-none transition-all duration-300 h-screen md:h-fit ${
            isMenuOpen ? "left-0" : "-left-[100%]"
          }`}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ri-close-line text-red-400/70 mt-2 text-3xl self-end cursor-pointer md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M9 9L15 15M15 9L9 15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {links.map(({ label, href }, idx) => (
            <Link
              key={idx}
              className="text-zinc-900"
              to={href}
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-5 justify-end px-3 py-3">
          <button className="bg-blue-500 px-3 py-1 md:px-5 rounded-[5px] cursor-pointer">
            Sign In
          </button>
          <button className="bg-blue-500 px-3 py-1 md:px-5 rounded-[5px] cursor-pointer">
            Get Started
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
