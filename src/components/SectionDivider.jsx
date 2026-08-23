import Reveal from "./Reveal";

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

export default function SectionDivider({ className = "" }) {
  return (
    <div className={`relative z-10 ${className}`}>
      <div className="stitch-seam w-full" />
      <div className="flex items-center justify-center gap-5 py-10 md:py-16">
        <Reveal y={12}>
          <PalmIcon className="h-7 w-7 text-husk/50" />
        </Reveal>
        <Reveal y={12} delay={0.06} className="h-8 w-px bg-husk/25" />
        <Reveal y={12} delay={0.12}>
          <span className="font-display text-lg text-husk/60">P</span>
        </Reveal>
        <Reveal y={12} delay={0.18} className="h-8 w-px bg-husk/25" />
        <Reveal y={12} delay={0.24}>
          <PalmIcon className="h-7 w-7 -scale-x-100 text-husk/50" />
        </Reveal>
      </div>
    </div>
  );
}
