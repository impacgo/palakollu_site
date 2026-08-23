import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";

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

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] w-full flex-col items-center justify-center bg-soil-deep bg-village-weave px-6 text-center">
      <Reveal>
        <PalmIcon className="mx-auto h-10 w-10 text-turmeric/60" />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric">
          404
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <h1 className="mt-3 font-display text-[clamp(30px,5vw,52px)] text-husk">
          The trail bends somewhere else.
        </h1>
      </Reveal>
      <Reveal delay={0.26}>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-turmeric/50 px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
        >
          Return to Palakollu
        </Link>
      </Reveal>
    </section>
  );
}
