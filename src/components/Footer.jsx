import { Link } from "react-router-dom";
import { getSiteSettings } from "../lib/contentStore";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Places", to: "/places" },
  { label: "Packages", to: "/packages" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function PalmIcon(props) {
  return (
    <svg viewBox="0 0 40 46" fill="none" {...props}>
      <path d="M20 46V22" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M20 22C20 22 6 18 3 8M20 22C20 22 3 15 2 2M20 22C20 22 34 18 37 8M20 22C20 22 37 15 38 2M20 22C20 22 10 10 12 1M20 22C20 22 30 10 28 1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Footer() {
  const settings = getSiteSettings();

  return (
    <footer className="relative bg-soil-deep bg-village-weave pt-16 pb-10">
      <div className="stitch-seam absolute top-0 inset-x-0" />

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <PalmIcon className="h-8 w-8 text-turmeric/70" />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-widest-2 text-husk">PALAKOLLU</span>
                <span className="mt-1 font-sans text-[9px] tracking-widest-2 text-turmeric/90">
                  TRAILS · WEST GODAVARI
                </span>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-husk-dim">
              Village journeys through West Godavari and the Godavari Delta — canal roads,
              temple towns and coconut country, one stop at a time.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-turmeric">
              Explore
            </h4>
            <nav className="mt-4 flex flex-col gap-3">
              {LINKS.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="w-fit font-sans text-[13.5px] text-husk-dim transition-colors hover:text-turmeric"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-turmeric">
              Get in Touch
            </h4>
            <div className="mt-4 flex flex-col gap-2.5 text-[13.5px] text-husk-dim">
              <span>Phone — {settings.phone}</span>
              <span>WhatsApp — {settings.whatsapp}</span>
              <span>Email — {settings.email}</span>
              <span>{settings.address}</span>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-3 border-t border-turmeric/10 pt-7 text-center md:flex-row md:justify-between md:text-left">
          <p className="font-sans text-[12px] text-husk-dim/70">© {new Date().getFullYear()} Palakollu Trails.</p>
          <div className="flex items-center gap-5">
            <p className="font-sans text-[11px] uppercase tracking-widest-3 text-husk-dim/50">
              Godavari Delta · Andhra Pradesh
            </p>
            <Link
              to="/admin"
              className="font-sans text-[10.5px] uppercase tracking-widest-3 text-husk-dim/30 transition-colors hover:text-turmeric/70"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
