import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";

export default function SectionIntro({ eyebrow, heading, description, align = "center" }) {
  const wrap =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${wrap}`}>
      <SplitReveal barSpread={90} duration={0.55}>
        <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric">
          {eyebrow}
        </span>
      </SplitReveal>

      <SplitReveal barSpread={200} duration={0.85} delay={0.08}>
        <h2 className="font-display font-normal text-[clamp(28px,4.2vw,46px)] leading-[1.12] tracking-wide text-balance text-husk text-shadow-soft">
          {heading}
        </h2>
      </SplitReveal>

      {description && (
        <Reveal delay={0.15}>
          <p className="text-[15px] leading-relaxed text-balance text-husk-dim">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
