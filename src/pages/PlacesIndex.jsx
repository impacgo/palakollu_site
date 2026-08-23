import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import PlacesList from "../components/PlacesList";
import Reveal from "../components/Reveal";
import { ABOUT_BACKDROP } from "../data/content";
import { getPlaces } from "../lib/contentStore";

export default function PlacesIndex() {
  const PLACES = getPlaces();

  return (
    <>
      <PageHero
        eyebrow={`Around Palakollu · ${PLACES.length} Places`}
        title="Every stop worth the detour."
        description="Temples, backwaters, beaches, villages and craft traditions within reach of Palakollu — the full list, in one place."
        image={ABOUT_BACKDROP}
        tone="paddy"
      />

      <section className="relative bg-soil-deep bg-village-weave py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <PlacesList />

          <Reveal delay={0.1} className="mt-16 flex flex-col items-center gap-5 border-t border-turmeric/10 pt-14 text-center">
            <h2 className="font-display text-[clamp(24px,3.2vw,32px)] text-husk">
              Not sure where to start?
            </h2>
            <p className="max-w-md text-[14px] leading-relaxed text-husk-dim">
              Our packages string several of these places together into a single, easy route —
              or tell us what you'd like to see and we'll shape one around it.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/packages"
                className="rounded-full bg-terracotta px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
              >
                See the Journeys
              </Link>
              <Link
                to="/contact"
                className="rounded-full border border-turmeric/40 px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:border-turmeric hover:text-turmeric"
              >
                Plan Your Trail
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
