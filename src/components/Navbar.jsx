import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const LEFT_LINKS = [
  { label: "Places", to: "/places" },
  { label: "Packages", to: "/packages" },
];

const RIGHT_LINKS = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

// The desktop nav doesn't need a "Home" item — the centered logo already
// does that job and is always visible. On mobile the logo reads more as
// a brand mark than a tappable link at a glance, so the menu gets an
// explicit Home entry instead.
const MOBILE_LINKS = [{ label: "Home", to: "/" }, ...LEFT_LINKS, ...RIGHT_LINKS];

function CompassIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.1" />
      <path
        d="M15.2 8.8 12 12l-3.2 3.2L12 12l3.2-3.2Z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" />
    </svg>
  );
}

function NavItem({ label, to, active, onClick, className = "" }) {
  const cls = `font-sans font-medium uppercase tracking-widest-3 transition-colors duration-300 ${
    active ? "text-turmeric" : "text-husk/85 hover:text-turmeric"
  } ${className}`;

  return (
    <Link to={to} onClick={onClick} className={cls}>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(to) {
    return location.pathname === to || location.pathname.startsWith(`${to}/`);
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 inset-x-0 z-50 border-b transition-all duration-500 ${
        scrolled || !isHome
          ? "bg-soil-deep/90 backdrop-blur-md border-turmeric/15 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
          : "bg-gradient-to-b from-black/45 to-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Left links */}
          <nav className="hidden md:flex items-center gap-9">
            {LEFT_LINKS.map((l) => (
              <NavItem key={l.label} {...l} active={isActive(l.to)} className="text-[12.5px]" />
            ))}
          </nav>

          {/* Center logo lockup */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none select-none"
          >
            <span className="font-display text-[22px] md:text-[26px] tracking-widest-2 text-husk">
              PALAKOLLU
            </span>
            <span className="font-sans text-[9px] md:text-[10px] tracking-widest-2 text-turmeric/90 mt-1 font-medium">
              TRAILS · WEST GODAVARI
            </span>
          </Link>

          {/* Right links */}
          <div className="hidden md:flex items-center gap-9">
            {RIGHT_LINKS.map((l) => (
              <NavItem key={l.label} {...l} active={isActive(l.to)} className="text-[12.5px]" />
            ))}
            <CompassIcon className="w-[18px] h-[18px] text-husk/80 hover:text-turmeric transition-colors duration-300 cursor-pointer" />
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden ml-auto text-husk text-2xl leading-none z-10"
            aria-label="Toggle menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className="md:hidden relative overflow-hidden">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-display text-[26vw] leading-none text-husk/[0.04] transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        >
          GODAVARI
        </span>
        <div
          className={`relative overflow-hidden transition-[max-height] duration-400 bg-soil-deep/97 backdrop-blur-md border-t border-turmeric/10 ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col px-8 py-6 gap-5">
            {MOBILE_LINKS.map((l) => (
              <NavItem
                key={l.label}
                {...l}
                active={isActive(l.to)}
                onClick={() => setOpen(false)}
                className="text-[13px]"
              />
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 w-fit rounded-full bg-terracotta px-5 py-2.5 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
            >
              Plan Your Trail
            </Link>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
