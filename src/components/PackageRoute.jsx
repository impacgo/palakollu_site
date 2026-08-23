import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import Reveal from "./Reveal";
import SectionIntro from "./SectionIntro";
import { getLenis } from "../lib/lenis";

const PATH_D =
  "M40 60 C 200 20, 260 140, 420 90 S 640 30, 720 110 S 940 170, 1120 90";
const VIEW_W = 1160;
const VIEW_H = 220;
const SAMPLES = 40;

// The "you are here" marker — a location pin, drawn in the same viewBox
// coordinate space as the route line and stop circles so its scale stays
// locked to theirs. Terracotta, per the site's own color rule that
// terracotta marks a "selected state" — this is the selected point on
// the trail. The tip sits exactly on the route line; a soft ring pulses
// outward from its base like a live-location beacon.
function LocationPin() {
  return (
    <>
      <motion.circle
        cx="0"
        cy="0"
        r="6"
        fill="var(--color-terracotta)"
        initial={{ opacity: 0.55, scale: 0.6 }}
        animate={{ opacity: 0, scale: 2.8 }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        style={{ transformOrigin: "0px 0px" }}
      />
      <ellipse cx="0" cy="1.5" rx="7" ry="2.5" fill="rgba(0,0,0,0.35)" />

      <path
        d="M0 -38 C 8 -38 14.5 -32 14.5 -24 C 14.5 -13 0 0 0 0 C 0 0 -14.5 -13 -14.5 -24 C -14.5 -32 -8 -38 0 -38 Z"
        fill="var(--color-terracotta)"
        stroke="var(--color-husk)"
        strokeWidth="1.4"
      />
      <circle cx="0" cy="-24" r="5.5" fill="var(--color-soil-deep)" />
      <circle cx="0" cy="-24" r="5.5" fill="none" stroke="var(--color-turmeric)" strokeWidth="1" />
    </>
  );
}

const EMPTY_SAMPLES = { t: [0, 1], xs: [0, 0], ys: [0, 0] };

function useStopPoints(count) {
  const pathRef = useRef(null);
  const [points, setPoints] = useState([]);
  const [samples, setSamples] = useState(EMPTY_SAMPLES);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();

    const stopPts = Array.from({ length: count }, (_, i) => {
      const p = path.getPointAtLength((i / Math.max(count - 1, 1)) * total);
      return { x: p.x, y: p.y };
    });
    setPoints(stopPts);

    const t = [];
    const xs = [];
    const ys = [];
    for (let i = 0; i <= SAMPLES; i++) {
      const p = path.getPointAtLength((i / SAMPLES) * total);
      t.push(i / SAMPLES);
      xs.push(p.x);
      ys.push(p.y);
    }
    setSamples({ t, xs, ys });
  }, [count]);

  return { pathRef, points, samples };
}

function RouteAnimated({ pkg, stops, places }) {
  const sectionRef = useRef(null);
  const { pathRef, points, samples } = useStopPoints(stops.length);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  const progress = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (paused) return;
    progress.set(v);
    setActiveIndex(Math.min(stops.length - 1, Math.round(v * (stops.length - 1))));
  });

  const pathLength = useTransform(progress, [0.04, 0.96], [0, 1]);
  const catX = useTransform(progress, samples.t, samples.xs);
  const catY = useTransform(progress, samples.t, samples.ys);

  function jumpToStop(i) {
    const section = sectionRef.current;
    if (!section) return;
    setPaused(false);
    const scrollable = section.offsetHeight - window.innerHeight;
    const target = section.offsetTop + (i / Math.max(stops.length - 1, 1)) * scrollable;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 1.1 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  }

  const activeStop = stops[activeIndex];
  const activePlace = places[activeIndex];
  const backdrop = activePlace?.photo || pkg.photo;

  return (
    <section ref={sectionRef} className="relative hidden md:block" style={{ height: `${100 + stops.length * 70}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-soil-deep">
        {/* Photographic backdrop — crossfades to the real photo of whichever
            stop the cart is currently passing, same technique as "Follow the
            Water" so this section reads as part of the same photographic
            world as the rest of the site rather than a flat illustration. */}
        <AnimatePresence>
          <motion.img
            key={activeStop.title}
            src={backdrop}
            alt={activeStop.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover animate-kenburns"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-paddy-deep/20 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-black/35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-soil-deep" />

        <div className="relative z-10 flex h-full w-full flex-col justify-between px-6 pb-10 pt-28 md:px-10">
          {/* Route line + numbered stops + cart, drawn as a map overlay */}
          <div className="mx-auto w-full max-w-4xl">
            <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full" style={{ overflow: "visible" }}>
              <path ref={pathRef} d={PATH_D} fill="none" stroke="var(--color-turmeric)" strokeOpacity="0.3" strokeWidth="2.5" />
              <motion.path
                d={PATH_D}
                fill="none"
                stroke="var(--color-turmeric)"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength }}
              />

              {points.map((p, i) => (
                <g key={i} className="cursor-pointer" onClick={() => jumpToStop(i)}>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={i === activeIndex ? 9 : 6}
                    fill={i <= activeIndex ? "var(--color-terracotta)" : "var(--color-soil-deep)"}
                    stroke="var(--color-turmeric)"
                    strokeWidth="1.5"
                    style={{ transition: "r 0.3s, fill 0.3s" }}
                  />
                  <text x={p.x} y={p.y + 24} textAnchor="middle" fill="var(--color-husk)" fontSize="11" letterSpacing="1" className="text-shadow-soft">
                    {String(i + 1).padStart(2, "0")}
                  </text>
                </g>
              ))}

              <motion.g style={{ x: catX, y: catY }}>
                <LocationPin />
              </motion.g>
            </svg>
          </div>

          {/* Stop info + controls, anchored bottom like the site's other heroes */}
          <div className="mx-auto flex w-full max-w-5xl items-end justify-between gap-8">
            <div className="min-h-[92px] max-w-md">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                >
                  <span className="font-sans text-[11px] uppercase tracking-widest-3 text-turmeric text-shadow-soft">
                    Stop {String(activeIndex + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 font-display text-[26px] text-husk text-shadow-soft">{activeStop.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-husk-dim text-shadow-soft">{activeStop.desc}</p>
                  {activePlace && (
                    <Link
                      to={`/places/${activePlace.id}`}
                      className="mt-2 inline-block text-[12px] uppercase tracking-widest-3 text-turmeric-soft hover:text-turmeric"
                    >
                      View place →
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className="rounded-full border border-turmeric/50 bg-soil-deep/40 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk backdrop-blur-sm transition-colors hover:border-turmeric hover:text-turmeric"
              >
                {paused ? "Resume" : "Pause"}
              </button>
              <button
                type="button"
                onClick={() => jumpToStop(0)}
                className="rounded-full border border-turmeric/50 bg-soil-deep/40 px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-widest-3 text-husk backdrop-blur-sm transition-colors hover:border-turmeric hover:text-turmeric"
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RouteStopsVertical({ stops, places }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="relative">
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-turmeric/15" />
      <div className="flex flex-col gap-3">
        {stops.map((stop, i) => {
          const place = places[i];
          const isOpen = open === i;
          return (
            <div key={stop.title} className="relative pl-10">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-turmeric/40 bg-soil-deep font-sans text-[11px] text-turmeric"
              >
                {i + 1}
              </button>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full rounded-sm border border-turmeric/15 bg-soil-2/60 px-4 py-3 text-left"
              >
                <span className="font-display text-[17px] text-husk">{stop.title}</span>
              </button>
              <div className={`grid transition-[grid-template-rows] duration-400 ease-out ${isOpen ? "grid-rows-[1fr] mt-2" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <div className="rounded-sm border border-turmeric/10 bg-soil-2/30 p-4">
                    {place?.photo && (
                      <img src={place.photo} alt={stop.title} className="mb-3 h-32 w-full rounded-sm object-cover" />
                    )}
                    <p className="text-[13.5px] leading-relaxed text-husk-dim">{stop.desc}</p>
                    {place && (
                      <Link
                        to={`/places/${place.id}`}
                        className="mt-2 inline-block text-[12px] uppercase tracking-widest-3 text-turmeric-soft"
                      >
                        View place →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function PackageRoute({ pkg, allPlaces }) {
  const reduceMotion = useReducedMotion();
  const stops = pkg.waypoints && pkg.waypoints.length > 0 ? pkg.waypoints : null;

  if (!stops) return null;

  const places = stops.map((s) => allPlaces.find((p) => p.id === s.placeId));

  return (
    <section id="route" className="relative bg-soil-deep">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <SectionIntro
          eyebrow="The Route"
          heading="Watch the journey unfold"
          description="Scroll to follow the trail — or tap a stop to jump straight to it."
        />
      </div>

      {reduceMotion ? (
        <div className="mx-auto max-w-2xl px-6 py-14">
          <RouteStopsVertical stops={stops} places={places} />
        </div>
      ) : (
        <RouteAnimated pkg={pkg} stops={stops} places={places} />
      )}

      <div className="mx-auto max-w-2xl px-6 py-14 md:hidden">
        <Reveal>
          <RouteStopsVertical stops={stops} places={places} />
        </Reveal>
      </div>
    </section>
  );
}
