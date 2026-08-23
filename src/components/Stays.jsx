import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import PhotoSlot from "./PhotoSlot";
import { StayIcon } from "./icons";
import { getPackages } from "../lib/contentStore";

export default function Stays() {
  const packages = getPackages();

  return (
    <section className="relative bg-soil-deep bg-village-weave pb-28 md:pb-36">
      <SectionDivider />
      <div className="mx-auto max-w-6xl px-6">
        <SectionIntro
          eyebrow="Where You'll Stay"
          heading="Stay where the village slows down"
          description="Every journey includes a place to stay — homestays, riverside cottages and backwater houseboats set among the same canals and coconut groves you're travelling through."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-sm border border-turmeric/15 bg-soil-2/50">
                <div className="relative">
                  <PhotoSlot Icon={StayIcon} tone={pkg.tone} src={pkg.photo} aspect="aspect-[16/10]" alt={pkg.hotel?.name} />
                  <span className="absolute left-4 top-4 rounded-full bg-soil-deep/85 px-3 py-1 font-sans text-[10px] font-medium uppercase tracking-widest-3 text-husk backdrop-blur-sm">
                    {pkg.hotel?.type || "Stay"}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[21px] text-husk">{pkg.hotel?.name || "Stay to be confirmed"}</h3>
                  <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-husk-dim">{pkg.hotel?.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {(pkg.hotel?.amenities || []).map((a) => (
                      <span key={a} className="rounded bg-paddy-deep/40 px-2 py-1 text-[11px] text-paddy">
                        {a}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 font-sans text-[11px] font-medium uppercase tracking-widest-3 text-turmeric transition-colors hover:text-turmeric-soft"
                  >
                    Included in {pkg.title} →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-[12.5px] italic text-husk-dim/70">
            Properties shown are representative and subject to confirmation at the time of booking.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
