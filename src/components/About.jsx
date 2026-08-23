import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import PhotoSlot from "./PhotoSlot";
import { getPlaces } from "../lib/contentStore";

export default function About() {
  const places = getPlaces();
  const byId = (id) => places.find((p) => p.id === id);

  const MOVEMENTS = [
    {
      num: "01",
      tag: "Sacred",
      title: "Pancharama temple town",
      body: "Palakollu begins with Ksheera Ramalingeswara Swamy Temple and a town shaped by faith, markets and everyday life.",
      place: byId("p1"),
      size: "large",
    },
    {
      num: "02",
      tag: "Rural",
      title: "Canals & coconut country",
      body: "Paddy fields, coconut groves, narrow roads and branching waterways define the countryside around Palakollu.",
      place: byId("p5"),
      size: "small",
    },
    {
      num: "03",
      tag: "Coastal",
      title: "Where the river meets the sea",
      body: "Antarvedi and the coast at Perupalem reveal the delta's meeting point with the Bay of Bengal.",
      place: byId("p3"),
      size: "small",
    },
  ];

  const [sacred, rural, coastal] = MOVEMENTS;

  return (
    <section id="about" className="relative bg-soil-deep bg-village-weave pb-28 md:pb-36">
      <SectionDivider />
      <div className="mx-auto max-w-6xl px-6">
        <SectionIntro
          eyebrow="The Delta in Three Movements"
          heading="Begin with the place. Stay for the feeling."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Reveal className="group h-full">
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-sm border border-turmeric/15">
              <PhotoSlot
                src={sacred.place?.photo}
                aspect="aspect-auto h-full"
                className="h-full"
                alt={sacred.title}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soil-deep via-soil-deep/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="font-sans text-[11px] uppercase tracking-widest-3 text-turmeric">
                  {sacred.num} — {sacred.tag}
                </span>
                <h3 className="mt-2 font-display text-[26px] text-husk">{sacred.title}</h3>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-husk-dim">{sacred.body}</p>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-6">
            {[rural, coastal].map((m) => (
              <Reveal key={m.num} className="group h-full">
                <div className="relative h-full min-h-[195px] overflow-hidden rounded-sm border border-turmeric/15">
                  <PhotoSlot src={m.place?.photo} aspect="aspect-auto h-full" className="h-full" alt={m.title} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soil-deep via-soil-deep/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <span className="font-sans text-[10.5px] uppercase tracking-widest-3 text-turmeric">
                      {m.num} — {m.tag}
                    </span>
                    <h3 className="mt-1.5 font-display text-[21px] text-husk">{m.title}</h3>
                    <p className="mt-1.5 max-w-xs text-[13px] leading-relaxed text-husk-dim">{m.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
