import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import { getGodavariFacts } from "../lib/contentStore";

export default function GodavariFacts() {
  const GODAVARI_FACTS = getGodavariFacts();

  return (
    <section className="relative overflow-hidden bg-paddy-deep bg-village-weave pb-24 md:pb-32">
      <SectionDivider />
      <div className="mx-auto max-w-6xl px-6">
        <SectionIntro
          eyebrow="The Godavari River"
          heading="The lifeline the whole delta is built on"
          description="Every temple, canal and paddy field around Palakollu traces back to this one river — here's what makes it worth knowing before you visit."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GODAVARI_FACTS.map((f, i) => (
            <Reveal key={f.stat} delay={i * 0.1} className="h-full">
              <div className="h-full rounded-sm border border-turmeric/15 bg-soil-deep/40 p-6 backdrop-blur-sm">
                <span className="font-display text-[26px] text-turmeric-soft">{f.stat}</span>
                <h3 className="mt-2 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk">
                  {f.label}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-husk-dim">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
