import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import SectionDivider from "../components/SectionDivider";
import PhotoSlot from "../components/PhotoSlot";
import { ABOUT_BACKDROP } from "../data/content";
import { getPlaces, getGodavariFacts } from "../lib/contentStore";

export default function AboutPage() {
  const places = getPlaces();
  const GODAVARI_FACTS = getGodavariFacts();
  const byId = (id) => places.find((p) => p.id === id);

  const SECTIONS = [
    {
      key: "palakollu",
      num: "01",
      title: "Palakollu",
      body:
        "Palakollu is a temple town on the Godavari delta, built around the Ksheera Ramalingeswara Swamy Temple — one of five Pancharama Kshetras scattered across this stretch of West Godavari. Markets, canal bunds and everyday town life sit right alongside the temple's stepped courtyard, and it's this mix of the sacred and the ordinary that sets the tone for everything nearby.",
      place: byId("p1"),
    },
    {
      key: "water",
      num: "02",
      title: "The water",
      body:
        "Every place on this list traces back to one river. The Godavari splits into canals as it nears the coast, feeding paddy fields and coconut groves before finally meeting the Bay of Bengal at Antarvedi. Revered across South India as the Dakshina Ganga — \"the Ganges of the South\" — it shapes the land, the routes and the rhythm of the delta.",
      place: byId("p3"),
    },
    {
      key: "land",
      num: "03",
      title: "The land",
      body:
        "Away from the water, the delta is paddy fields, coconut groves and narrow village roads — irrigation canals built on Sir Arthur Cotton's 19th-century barrage turned this into one of Andhra Pradesh's most fertile stretches. It's a working landscape, not a manicured one, and that's exactly what makes the drive between stops as worthwhile as the stops themselves.",
      place: byId("p7"),
    },
    {
      key: "people",
      num: "04",
      title: "The people",
      body:
        "Homestay families, drivers, boat operators, farmers and craftspeople shape every journey we put together — the lace-workers of Narasapuram, the boat operators on the Dindi backwaters, the families who open their homes along the canal roads. We work with them directly rather than routing around them.",
      place: byId("p8"),
    },
    {
      key: "journey",
      num: "05",
      title: "The journey",
      body:
        "We build short, unhurried routes rather than long checklists — a handful of places, seen properly, with time left over for the roads between them. That's the idea behind every package on this site: fewer stops, more of the delta actually reaching you.",
      place: byId("p5"),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="About Palakollu Trails"
        title="The delta is not a backdrop. It is the story."
        description="A short introduction to the town, the river and the way we think about travelling through this part of West Godavari."
        image={ABOUT_BACKDROP}
        tone="paddy"
      />

      <section className="relative bg-soil-deep bg-village-weave py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-20 md:gap-28">
            {SECTIONS.map((s, i) => (
              <Reveal
                key={s.key}
                className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-turmeric/15">
                  <PhotoSlot src={s.place?.photo} aspect="aspect-auto h-full" className="h-full" alt={s.title} />
                </div>
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest-3 text-turmeric">
                    {s.num}
                  </span>
                  <h2 className="mt-2 font-display text-[clamp(26px,3.6vw,38px)] leading-tight text-husk">
                    {s.title}
                  </h2>
                  <p className="mt-4 max-w-md text-[15px] leading-relaxed text-husk-dim">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-paddy-deep bg-village-weave pb-24 md:pb-32">
        <SectionDivider />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Reveal>
            <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric">
              What we build routes on
            </span>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {GODAVARI_FACTS.map((f, i) => (
              <Reveal key={f.stat} delay={i * 0.08}>
                <span className="block font-display text-[22px] text-turmeric-soft">{f.stat}</span>
                <span className="mt-1 block font-sans text-[11px] uppercase tracking-widest-3 text-husk">
                  {f.label}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-husk py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-[clamp(26px,3.6vw,38px)] leading-tight text-soil">
              Walk slowly. Eat locally. Listen longer. Leave lighter.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 text-[15px] leading-relaxed text-soil/75">
              That's the whole philosophy — smaller groups, local hosts and guides, and routes
              built around a handful of places rather than a long list of them.
            </p>
          </Reveal>
          <Reveal delay={0.22} className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/packages"
              className="rounded-full bg-terracotta px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
            >
              See the Journeys
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-soil/30 px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-soil transition-colors hover:border-soil hover:bg-soil hover:text-husk"
            >
              Plan Your Escape
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
