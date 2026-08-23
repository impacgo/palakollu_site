import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import palakolluImg from "../assets/photos/place-ksheera-temple.webp";
import canalsImg from "../assets/photos/about-backdrop.webp";
import paddyImg from "../assets/photos/place-undi.webp";
import backwatersImg from "../assets/photos/place-dindi.webp";
import riverImg from "../assets/photos/package-delta-explorer.webp";
import coastImg from "../assets/photos/place-perupalem.webp";

const STOPS = [
  { label: "PALAKOLLU", img: palakolluImg, alt: "The Ksheera Ramalingeswara temple in Palakollu" },
  { label: "CANALS", img: canalsImg, alt: "Canals threading through the Godavari delta, seen from above" },
  { label: "PADDY FIELDS", img: paddyImg, alt: "Bright green paddy fields around a village near Palakollu" },
  { label: "BACKWATERS", img: backwatersImg, alt: "A houseboat on the Dindi backwaters" },
  { label: "RIVER", img: riverImg, alt: "The Godavari river with a small boat" },
  { label: "COAST", img: coastImg, alt: "The delta coastline at Perupalem" },
];

const RIVER_PATH = "M10 90 C 140 20, 220 160, 300 90 S 460 20, 590 90";

// Each label's reveal start — also the point at which the backdrop switches
// to that stop's photo (see indexForProgress below).
const STARTS = STOPS.map((_, i) => 0.14 + i * 0.11);
const FADE = 0.08;

function indexForProgress(p) {
  for (let i = STARTS.length - 1; i >= 0; i--) {
    if (p >= STARTS[i]) return i;
  }
  return 0;
}

function FollowLabel({ label, progress, start }) {
  const opacity = useTransform(progress, [start, start + FADE], [0, 1]);
  const y = useTransform(progress, [start, start + FADE], [10, 0]);
  return (
    <motion.span
      style={{ opacity, y }}
      className="font-sans text-[11px] md:text-[12px] font-medium uppercase tracking-widest-3 text-husk-dim"
    >
      {label}
    </motion.span>
  );
}

/**
 * Desktop only. Long pinned-scroll section (h-[320vh] + sticky h-screen)
 * with a scroll-linked photo crossfade — a "scroll-jacking" pattern that's
 * fragile on real mobile browsers, where the dynamic viewport height
 * (address bar showing/hiding mid-scroll) fights the sticky positioning
 * and scroll-progress math, and can leave the section rendering blank.
 * Mobile gets an entirely separate, normal-flow layout below instead of
 * trying to patch this pattern — same approach already used successfully
 * for the package route animation (see PackageRoute.jsx).
 */
function DesktopFollowWater() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = indexForProgress(v);
    setActiveIndex((prev) => (prev === idx ? prev : idx));
  });

  const pathLength = useTransform(scrollYProgress, [0.08, 0.85], [0, 1]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.16]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.12, 0.9, 1], [0, 1, 1, 0.4]);

  return (
    <section ref={ref} className="relative hidden h-[320vh] bg-soil-deep md:block">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <AnimatePresence>
          <motion.img
            key={STOPS[activeIndex].label}
            style={{ scale: imageScale }}
            src={STOPS[activeIndex].img}
            alt={STOPS[activeIndex].alt}
            loading={activeIndex === 0 ? "eager" : "lazy"}
            decoding="async"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-soil-deep via-transparent to-soil-deep" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <motion.div style={{ opacity: headlineOpacity }}>
            <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric">
              The Godavari Delta
            </span>
            <h2 className="mt-4 font-display text-[clamp(30px,5.2vw,58px)] text-husk text-shadow-hero">
              Follow the water.
            </h2>
          </motion.div>

          <svg viewBox="0 0 600 160" className="mt-10 w-full max-w-xl">
            <path d={RIVER_PATH} fill="none" stroke="#d4a13d" strokeOpacity="0.15" strokeWidth="2" />
            <motion.path
              d={RIVER_PATH}
              fill="none"
              stroke="#d4a13d"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 md:gap-x-10">
            {STOPS.map((stop, i) => (
              <FollowLabel key={stop.label} label={stop.label} progress={scrollYProgress} start={STARTS[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Mobile only. Same story — river, six stops, coast — as a normal-flow
 * vertical sequence with viewport-triggered (not scroll-tied) reveals.
 * No sticky, no vh-based section height, so it can't be affected by
 * mobile browsers resizing the viewport mid-scroll.
 */
function MobileFollowWater() {
  return (
    <section className="relative bg-soil-deep bg-village-weave py-16 md:hidden">
      <div className="px-6 text-center">
        <Reveal>
          <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric">
            The Godavari Delta
          </span>
          <h2 className="mt-4 font-display text-[clamp(28px,7vw,40px)] leading-tight text-husk">
            Follow the water.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <svg viewBox="0 0 600 160" className="mx-auto mt-8 w-full max-w-sm">
            <path d={RIVER_PATH} fill="none" stroke="#d4a13d" strokeOpacity="0.15" strokeWidth="2" />
            <motion.path
              d={RIVER_PATH}
              fill="none"
              stroke="#d4a13d"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
            />
          </svg>
        </Reveal>
      </div>

      <div className="mt-10 flex flex-col gap-4 px-6">
        {STOPS.map((stop, i) => (
          <Reveal key={stop.label} delay={(i % 3) * 0.06} className="relative overflow-hidden rounded-sm border border-turmeric/15">
            <img
              src={stop.img}
              alt={stop.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="h-40 w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soil-deep via-soil-deep/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-3">
              <span className="font-sans text-[11px] tabular-nums text-turmeric">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-sans text-[12px] font-medium uppercase tracking-widest-3 text-husk">
                {stop.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default function FollowTheWater() {
  return (
    <>
      <DesktopFollowWater />
      <MobileFollowWater />
    </>
  );
}
