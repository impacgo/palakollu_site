import { useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealLine from "../components/RevealLine";
import Reveal from "../components/Reveal";
import SectionDivider from "../components/SectionDivider";
import Contact from "../components/Contact";
import PhotoSlot from "../components/PhotoSlot";
import { PLACE_ICONS } from "../components/icons";
import { getPlaces, getPackages } from "../lib/contentStore";

function BackArrow(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M10 3 4 8l6 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PlaceDetail() {
  const { id } = useParams();
  const place = getPlaces().find((p) => p.id === id);

  if (!place) return <Navigate to="/" replace />;

  // Keyed remount per place so the hero reveal animation replays cleanly
  // whenever a visitor jumps between "More places nearby" links.
  return <PlaceDetailView key={place.id} place={place} />;
}

function PlaceDetailView({ place }) {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const advance = (next) => setTimeout(() => setStage(next), 180);

  const Icon = PLACE_ICONS[place.icon];
  const relatedPackages = getPackages().filter((pk) => pk.placeIds?.includes(place.id));
  const morePlaces = getPlaces().filter((p) => p.id !== place.id).slice(0, 3);

  return (
    <>
      {/* Hero — same parallax + split-reveal language as the homepage hero */}
      <section
        ref={sectionRef}
        className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-soil-deep"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[140px] -bottom-[140px]">
          <img
            src={place.photo}
            alt={place.name}
            className="h-full w-full object-cover animate-kenburns"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-paddy-deep/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-deep via-transparent to-transparent" />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <Reveal>
            <Link
              to="/places"
              className="mb-6 inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-widest-3 text-husk/80 transition-colors hover:text-turmeric"
            >
              <BackArrow className="h-3 w-3" /> Back to Places
            </Link>
          </Reveal>

          <div className="flex max-w-3xl flex-col gap-3">
            <RevealLine duration={0.6} barSpread={100} onDone={() => advance(1)}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric text-shadow-soft">
                {place.dist}
              </p>
            </RevealLine>

            {stage >= 1 && (
              <RevealLine duration={0.9} barSpread={220}>
                <h1 className="font-display font-normal text-husk text-shadow-hero text-[clamp(34px,6vw,64px)] leading-[1.05]">
                  {place.name}
                </h1>
              </RevealLine>
            )}
          </div>
        </div>
      </section>

      {/* Story + quick facts */}
      <section className="relative bg-soil-deep bg-village-weave py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <p className="text-[16px] leading-relaxed text-husk-dim">{place.story}</p>
            </Reveal>

            {relatedPackages.length > 0 && (
              <Reveal delay={0.15} className="mt-14">
                <h3 className="font-display text-2xl text-husk">Featured in</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {relatedPackages.map((pk) => (
                    <Link
                      key={pk.id}
                      to={`/packages/${pk.id}`}
                      className="rounded-full border border-turmeric/30 bg-turmeric/10 px-4 py-2 text-[12.5px] text-turmeric-soft transition-colors hover:bg-turmeric/20"
                    >
                      {pk.title}
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-sm border border-turmeric/15 bg-soil-2 p-7">
              {Icon && <Icon className="h-9 w-9 text-turmeric" />}
              <h4 className="mt-4 font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk-dim">
                Good to know
              </h4>
              <dl className="mt-4 space-y-3 text-[13.8px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-husk-dim">Distance</dt>
                  <dd className="text-husk">{place.dist}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-husk-dim">Best time</dt>
                  <dd className="text-husk">{place.bestTime}</dd>
                </div>
              </dl>
              <div className="mt-5 border-t border-dashed border-husk/20 pt-5">
                <h5 className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk-dim">
                  Highlights
                </h5>
                <ul className="mt-3 space-y-2">
                  {place.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-[13.5px] text-husk-dim">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-turmeric" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-col gap-2.5 border-t border-dashed border-husk/20 pt-5">
                <a
                  href="#contact"
                  className="rounded-full bg-terracotta py-2.5 text-center font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
                >
                  Add to Your Trail
                </a>
                <Link
                  to="/packages"
                  className="rounded-full border border-turmeric/40 py-2.5 text-center font-sans text-[11.5px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:border-turmeric hover:text-turmeric"
                >
                  Explore Packages
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More places nearby */}
      {morePlaces.length > 0 && (
        <section className="relative bg-soil pb-24 md:pb-32">
          <SectionDivider />
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center font-display text-[clamp(26px,3.6vw,38px)] text-husk">
              More places nearby
            </h2>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {morePlaces.map((p) => (
                <Reveal key={p.id} className="group h-full">
                  <Link
                    to={`/places/${p.id}`}
                    className="block h-full overflow-hidden rounded-sm border border-turmeric/15 bg-soil-2 transition-all duration-300 hover:-translate-y-1 hover:border-turmeric/50"
                  >
                    <PhotoSlot
                      Icon={PLACE_ICONS[p.icon]}
                      tone={p.tone}
                      src={p.photo}
                      aspect="aspect-[4/3]"
                      alt={p.name}
                    />
                    <div className="p-5">
                      <span className="font-sans text-[10px] uppercase tracking-widest-3 text-turmeric">
                        {p.dist}
                      </span>
                      <h3 className="mt-1.5 font-display text-[18px] text-husk">{p.name}</h3>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact prefill={place.name} />
    </>
  );
}
