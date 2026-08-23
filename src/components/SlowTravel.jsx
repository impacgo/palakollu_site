import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

const PRINCIPLES = [
  {
    title: "Local First",
    body: "Support local hosts, guides and food providers rather than outside operators.",
  },
  {
    title: "Smaller Experiences",
    body: "Keep groups small so every visit stays personal and respectful.",
  },
  {
    title: "Respect the Land",
    body: "Protect the waterways, farms and village spaces that make this delta what it is.",
  },
  {
    title: "Leave Lightly",
    body: "Avoid waste and unnecessary impact on the places and people who host you.",
  },
];

export default function SlowTravel() {
  return (
    <section className="relative bg-husk py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <SplitReveal barSpread={220} duration={0.85}>
            <h2 className="font-display text-[clamp(26px,4vw,42px)] leading-[1.2] text-soil">
              Walk slowly. Eat locally.
              <br />
              Listen longer. Leave lighter.
            </h2>
          </SplitReveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="h-px w-10 bg-terracotta/50" />
              <h3 className="mt-4 font-display text-xl text-soil">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-soil/70">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
