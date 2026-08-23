import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import PackageCard from "./PackageCard";
import PackageComparison from "./PackageComparison";
import { getPackages } from "../lib/contentStore";

export default function Packages() {
  const PACKAGES = getPackages();

  return (
    <section id="packages" className="relative bg-soil bg-village-weave pb-28 md:pb-36">
      <SectionDivider />
      <div className="mx-auto max-w-6xl px-6">
        <SectionIntro
          eyebrow="Curated Journeys"
          heading="Pick your pace through the delta"
          description="Every journey includes a day-wise route, a place to stay and a transparent price breakdown — open one to see the full itinerary."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <PackageComparison />
      </div>
    </section>
  );
}
