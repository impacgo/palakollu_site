import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import SectionBackdrop from "./SectionBackdrop";

/**
 * Shared cinematic banner for standalone pages (Places, Packages, About,
 * Contact) — same split-reveal typography and photographic treatment as
 * the homepage hero and the Place/Package detail heroes, so every entry
 * point into the site feels like the same world.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  tone = "canal",
  height = "h-[62vh] min-h-[420px]",
}) {
  return (
    <section className={`relative w-full overflow-hidden bg-soil-deep ${height}`}>
      <SectionBackdrop tone={tone} src={image} animate={!!image} alt={title} eager />
      <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
        <SplitReveal barSpread={90} duration={0.55}>
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric text-shadow-soft">
            {eyebrow}
          </span>
        </SplitReveal>

        <SplitReveal barSpread={220} duration={0.85} delay={0.08} className="mt-4">
          <h1 className="font-display font-normal text-husk text-shadow-hero text-[clamp(32px,5.5vw,58px)] leading-[1.08] text-balance">
            {title}
          </h1>
        </SplitReveal>

        {description && (
          <Reveal delay={0.22} className="mt-5 max-w-xl">
            <p className="text-[15px] leading-relaxed text-husk-dim text-shadow-soft">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
