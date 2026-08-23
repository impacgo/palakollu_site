import { useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealLine from "../components/RevealLine";
import Reveal from "../components/Reveal";
import Contact from "../components/Contact";
import PackageRoute from "../components/PackageRoute";
import MobileStickyCTA from "../components/MobileStickyCTA";
import { getPackages, getPlaces } from "../lib/contentStore";
import { getLenis, NAV_OFFSET } from "../lib/lenis";

export default function PackageDetail() {
  const { id } = useParams();
  const pkg = getPackages().find((p) => p.id === id);

  if (!pkg) return <Navigate to="/" replace />;

  return <PackageDetailView key={pkg.id} pkg={pkg} />;
}

function PackageDetailView({ pkg }) {
  const [stage, setStage] = useState(0);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const advance = (next) => setTimeout(() => setStage(next), 180);

  const [nights, days] = pkg.duration.split(" / ");
  const allPlaces = getPlaces();
  const includedPlaces = (pkg.placeIds || [])
    .map((pid) => allPlaces.find((p) => p.id === pid))
    .filter(Boolean);

  function scrollToContact() {
    const el = document.getElementById("contact");
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.3 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Hero — same parallax + split-reveal language as the homepage hero */}
      <section
        ref={sectionRef}
        className="relative h-[85vh] min-h-[600px] w-full overflow-hidden bg-soil-deep"
      >
        <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[140px] -bottom-[140px]">
          <img
            src={pkg.photo}
            alt={pkg.title}
            className="h-full w-full object-cover animate-kenburns"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-paddy-deep/25 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-soil-deep via-transparent to-transparent" />

        <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-14 md:px-10 md:pb-16">
          <Reveal>
            <Link
              to="/packages"
              className="mb-6 inline-flex w-fit items-center gap-2 font-sans text-[12px] uppercase tracking-widest-3 text-husk/80 transition-colors hover:text-turmeric"
            >
              ← Back to Packages
            </Link>
          </Reveal>

          <div className="flex max-w-3xl flex-col gap-3">
            <RevealLine duration={0.6} barSpread={140} onDone={() => advance(1)}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric text-shadow-soft">
                {pkg.featured ? "Signature Journey · " : ""}
                {pkg.duration}
              </p>
            </RevealLine>

            {stage >= 1 && (
              <RevealLine duration={0.9} barSpread={220}>
                <h1 className="font-display font-normal text-husk text-shadow-hero text-[clamp(34px,6vw,60px)] leading-[1.05]">
                  {pkg.title}
                </h1>
              </RevealLine>
            )}

            {stage >= 1 && (
              <Reveal delay={0.35}>
                <p className="max-w-xl text-[15px] leading-relaxed text-husk-dim text-shadow-soft">
                  {pkg.tagline}
                </p>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.5} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div>
              <span className="block font-display text-xl text-turmeric-soft">{nights}</span>
              <span className="text-[11px] uppercase tracking-widest-3 text-husk-dim">Nights</span>
            </div>
            <div>
              <span className="block font-display text-xl text-turmeric-soft">{days}</span>
              <span className="text-[11px] uppercase tracking-widest-3 text-husk-dim">Days</span>
            </div>
            <div>
              <span className="block font-display text-xl text-turmeric-soft">{pkg.itinerary.length}</span>
              <span className="text-[11px] uppercase tracking-widest-3 text-husk-dim">Stops</span>
            </div>
            <div>
              <span className="block font-display text-xl text-turmeric-soft">
                ₹{pkg.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] uppercase tracking-widest-3 text-husk-dim">Per person</span>
            </div>

            <div className="ml-auto flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToContact}
                className="rounded-full bg-terracotta px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
              >
                Start Planning
              </button>
              <a
                href="#route"
                className="rounded-full border border-turmeric/40 px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:border-turmeric hover:text-turmeric"
              >
                Explore Route
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cinematic, scroll-driven route experience with the animated cart */}
      <PackageRoute pkg={pkg} allPlaces={allPlaces} />

      {/* Day by day */}
      <section className="relative bg-soil-deep bg-village-weave py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Reveal>
              <h2 className="font-display text-2xl text-husk">Day by day</h2>
            </Reveal>
            <div className="mt-6 space-y-6">
              {pkg.itinerary.map(([title, desc], i) => (
                <Reveal key={title} delay={i * 0.08} className="border-l-2 border-paddy/60 pl-5">
                  <b className="font-sans text-[11px] uppercase tracking-widest-3 text-turmeric">
                    Day {i + 1}
                  </b>
                  <h3 className="mt-1 font-display text-[19px] text-husk">{title}</h3>
                  <p className="mt-1 text-[14px] leading-relaxed text-husk-dim">{desc}</p>
                </Reveal>
              ))}
            </div>

            {includedPlaces.length > 0 && (
              <Reveal delay={0.2} className="mt-14">
                <h3 className="font-display text-2xl text-husk">Places on this trail</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {includedPlaces.map((place) => (
                    <Link
                      key={place.id}
                      to={`/places/${place.id}`}
                      className="rounded-full border border-turmeric/30 bg-turmeric/10 px-4 py-2 text-[12.5px] text-turmeric-soft transition-colors hover:bg-turmeric/20"
                    >
                      {place.name}
                    </Link>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delay={0.1} className="flex flex-col gap-6">
            <div className="rounded-sm border border-turmeric/15 bg-soil-2 p-7">
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk-dim">
                Where you'll stay
              </h4>
              <p className="mt-3 font-display text-[20px] text-husk">{pkg.hotel.name}</p>
              <p className="text-[11px] uppercase tracking-widest-3 text-turmeric">{pkg.hotel.type}</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-husk-dim">{pkg.hotel.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {pkg.hotel.amenities.map((a) => (
                  <span key={a} className="rounded bg-paddy-deep/40 px-2 py-1 text-[11px] text-paddy">
                    {a}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-[11.5px] italic text-husk-dim/70">
                Accommodation shown is representative and subject to confirmation.
              </p>
            </div>

            <div className="rounded-sm border border-turmeric/15 bg-soil-2 p-7">
              <h4 className="font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk-dim">
                Price breakdown
              </h4>
              <table className="mt-4 w-full text-[13px]">
                <tbody>
                  {pkg.priceLines.map(([label, amt]) => (
                    <tr key={label} className="border-b border-husk/10">
                      <td className="py-2 text-husk-dim">{label}</td>
                      <td className="py-2 text-right font-medium text-husk">{amt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 flex items-baseline justify-between border-t border-dashed border-husk/20 pt-3">
                <span className="text-[13px] text-husk-dim">Total / person</span>
                <span className="font-display text-[24px] text-turmeric-soft">
                  ₹{pkg.price.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact prefill={pkg.title} />

      <MobileStickyCTA price={pkg.price} label="Plan This Trail" />
    </>
  );
}
