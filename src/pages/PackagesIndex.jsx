import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import PackageCard from "../components/PackageCard";
import PackageComparison from "../components/PackageComparison";
import { getPackages } from "../lib/contentStore";

export default function PackagesIndex() {
  const PACKAGES = getPackages();

  return (
    <>
      <PageHero
        eyebrow="Curated Journeys"
        title="Pick your pace through the delta."
        description="Every journey includes a day-wise route, a place to stay and a transparent price breakdown — open one to see the full itinerary."
        image={PACKAGES[1]?.photo}
        tone="canal"
      />

      <section className="relative bg-soil bg-village-weave py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PACKAGES.map((pkg, i) => (
              <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
                <PackageCard pkg={pkg} />
              </Reveal>
            ))}
          </div>

          <PackageComparison />

          <Reveal delay={0.1} className="mt-16 flex flex-col items-center gap-5 border-t border-turmeric/10 pt-14 text-center">
            <h2 className="font-display text-[clamp(24px,3.2vw,32px)] text-husk">
              Don't see the right fit?
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-husk-dim">
              Every journey can be lengthened, shortened or combined with places from our full
              list — tell us what you'd like to experience and we'll shape a route around it.
            </p>
            <Link
              to="/contact"
              className="mt-2 rounded-full bg-terracotta px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
            >
              Plan Your Trail
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
