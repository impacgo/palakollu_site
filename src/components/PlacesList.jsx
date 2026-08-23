import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import PhotoSlot from "./PhotoSlot";
import { PLACE_ICONS } from "./icons";
import { getPlaces } from "../lib/contentStore";

/**
 * The editorial numbered-list treatment for destinations — extracted so
 * both the homepage "Places" section and the standalone /places index
 * can share one implementation instead of drifting apart.
 */
export default function PlacesList({ places = getPlaces() }) {
  return (
    <div className="divide-y divide-turmeric/10 border-y border-turmeric/10">
      {places.map((place, i) => (
        <Reveal key={place.id} delay={(i % 4) * 0.05} as="div">
          <Link to={`/places/${place.id}`} className="group block">
            <div className="flex items-center justify-between gap-6 py-6">
              <div className="flex items-center gap-5 md:gap-7">
                <span className="font-sans text-[12px] tabular-nums text-husk-dim/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[19px] leading-tight text-husk transition-colors duration-300 group-hover:text-turmeric md:text-[26px]">
                  {place.name}
                </h3>
              </div>
              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden font-sans text-[10.5px] uppercase tracking-widest-3 text-turmeric sm:inline">
                  {place.dist}
                </span>
                <span className="text-turmeric opacity-0 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 md:opacity-0">
                  →
                </span>
              </div>
            </div>

            <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr]">
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center">
                  <div className="h-44 w-full shrink-0 overflow-hidden rounded-sm sm:h-28 sm:w-44">
                    <PhotoSlot
                      Icon={PLACE_ICONS[place.icon]}
                      tone={place.tone}
                      src={place.photo}
                      aspect="aspect-auto h-full"
                      alt={place.name}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-sans text-[10.5px] uppercase tracking-widest-3 text-turmeric sm:hidden">
                      {place.dist}
                    </span>
                    <p className="max-w-md text-[13.5px] leading-relaxed text-husk-dim">{place.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
