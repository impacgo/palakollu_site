import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SplitReveal from "./SplitReveal";
import SectionBackdrop from "./SectionBackdrop";
import SectionDivider from "./SectionDivider";
import { CONTACT_BACKDROP } from "../data/content";
import { getSiteSettings } from "../lib/contentStore";

/**
 * Closing homepage CTA. Deliberately a short teaser rather than the full
 * enquiry form (that now lives on its own /contact page, and inline on
 * Place/Package detail pages where prefill context matters) — this keeps
 * the homepage narrative from ending in a wall of form fields.
 */
export default function PlanTrailCTA() {
  const settings = getSiteSettings();

  return (
    <section className="relative overflow-hidden bg-soil-deep pb-28 md:pb-36">
      <SectionBackdrop tone="canal" src={CONTACT_BACKDROP} animate alt="A boat drifting on the Godavari canals at dusk" />
      <SectionDivider className="relative z-10" />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <SplitReveal barSpread={90} duration={0.55}>
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric">
            Plan Your Trip
          </span>
        </SplitReveal>

        <SplitReveal barSpread={200} duration={0.85} delay={0.08} className="mt-4">
          <h2 className="font-display font-normal text-[clamp(28px,4.2vw,46px)] leading-[1.12] text-balance text-husk text-shadow-soft">
            Your Godavari story starts here.
          </h2>
        </SplitReveal>

        <Reveal delay={0.16} className="mt-5">
          <p className="max-w-md text-[15px] leading-relaxed text-husk-dim">
            Tell us when you'd like to come and how many people are travelling — we'll help
            shape a route and a place to stay around Palakollu.
          </p>
        </Reveal>

        <Reveal delay={0.26} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-full bg-terracotta px-7 py-3.5 font-sans text-[12.5px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
          >
            Plan Your Trail
          </Link>
          <Link
            to="/packages"
            className="rounded-full border border-turmeric/40 px-7 py-3.5 font-sans text-[12.5px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:border-turmeric hover:text-turmeric"
          >
            View Journeys
          </Link>
        </Reveal>

        <Reveal delay={0.34} className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-dashed border-husk/15 pt-7 text-[13px] text-husk-dim">
          <span>{settings.phone}</span>
          <span className="text-husk-dim/40">·</span>
          <span>{settings.email}</span>
          <span className="text-husk-dim/40">·</span>
          <span>{settings.address.split(",").slice(0, 2).join(",")}</span>
        </Reveal>
      </div>
    </section>
  );
}
