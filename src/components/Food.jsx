import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import { FoodIcon } from "./icons";
import { getFoodItems } from "../lib/contentStore";

export default function Food() {
  const items = getFoodItems();

  return (
    <section className="relative bg-paddy-deep bg-village-weave pb-28 md:pb-36">
      <SectionDivider />
      <div className="mx-auto max-w-6xl px-6">
        <SectionIntro
          eyebrow="Taste the Delta"
          heading="Simple, seasonal, cooked at home"
          description="Andhra staples from home kitchens and local markets, not a set hotel menu — what an exact homestay serves on your dates will still vary."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="flex h-full flex-col rounded-sm border border-turmeric/15 bg-soil-deep/40 p-6">
                <FoodIcon className="h-8 w-8 text-turmeric" />
                <h3 className="mt-4 font-display text-[19px] text-husk">{item.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-husk-dim">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mx-auto mt-10 max-w-xl text-center">
          <p className="text-[12.5px] italic text-husk-dim/70">
            Exact menus vary by homestay, season and availability.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
