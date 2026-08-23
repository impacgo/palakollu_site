import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import SectionDivider from "./SectionDivider";
import { getPlaces } from "../lib/contentStore";

const AUTO_ADVANCE_MS = 5500;

// Real, checked-against-public-sources cultural detail — no invented
// customs or fabricated "local voices," per the site's own content rule.
// Ordered to lead with the most visually striking, unambiguous photo
// matches first — each item's photo should actually support its text,
// not just loosely gesture at it.
export default function Traditions() {
  const places = getPlaces();
  const byId = (id) => places.find((p) => p.id === id);
  const reduceMotion = useReducedMotion();

  const ITEMS = [
    {
      title: "A coconut economy, not just a crop",
      tag: "Land",
      body: "Coconut groves cover close to 40% of Andhra Pradesh's coconut-growing area right here. The harvest becomes rope in West Godavari's coir workshops — mostly women's work — oil in bullock-driven chekka presses, and toddy tapped straight from the crown, much as it has for generations.",
      photo: byId("p7")?.photo,
      alt: "Paddy fields and coconut groves near Undi",
    },
    {
      title: "Five sacred shrines",
      tag: "Faith",
      body: "Palakollu's Ksheerarama is one of five Pancharama Kshetras scattered across the delta, each said to hold a fragment of a single Shivling — a legend that ties temple towns across this stretch of Andhra together.",
      photo: byId("p1")?.photo,
      alt: "Ksheera Ramalingeswara temple, Palakollu",
    },
    {
      title: "The lace-makers of Narasapuram",
      tag: "Craft",
      body: "A craft introduced in 1844 and still worked entirely by hand, Narasapuram's GI-tagged crochet lace is one of the delta's most distinctive living traditions — practiced mostly by women, passed down through generations.",
      photo: byId("p8")?.photo,
      alt: "A lace-maker at work in Narasapuram",
    },
    {
      title: "Life along the canals",
      tag: "Waterways",
      body: "These backwaters aren't just scenery — over 1,000 km of canals fed by the Dowleswaram barrage make them the delta's roads. Every Sankranti, that same water hosts the Sir Arthur Cotton Godavari Trophy, when Kerala-style dragon boat teams race the canals near Atreyapuram.",
      photo: byId("p5")?.photo,
      alt: "Backwater canal near Dindi, the everyday water-life of the delta",
    },
  ];

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (paused || reduceMotion) return;
    timerRef.current = setTimeout(() => {
      setActive((i) => (i + 1) % ITEMS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, reduceMotion]);

  function select(i) {
    setActive(i);
    setPaused(true);
  }

  const current = ITEMS[active];

  return (
    <section
      className="relative overflow-hidden bg-soil-deep"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionDivider />
      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-10 md:pt-16">
        <SectionIntro
          eyebrow="Traditions of the Delta"
          heading="A slower, older way of life"
          description="Coconut groves tended for generations, hand-worked lace, canals that double as roads and racetracks — the customs that shape everyday life here, not staged for visitors."
        />
      </div>

      <div className="relative mt-14 h-[72vh] min-h-[460px] w-full overflow-hidden md:h-[78vh]">
        <AnimatePresence>
          <motion.img
            key={current.title}
            src={current.photo}
            alt={current.alt}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-paddy-deep/20 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-black/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soil-deep via-black/10 to-black/25" />

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-8 md:px-10 md:pb-10">
          <div className="max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-turmeric text-shadow-soft">
                  {current.tag}
                </span>
                <h3 className="mt-2 font-display text-[clamp(24px,3.4vw,34px)] leading-tight text-husk text-shadow-hero">
                  {current.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-husk-dim text-shadow-soft">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {ITEMS.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => select(i)}
                className="group flex flex-col gap-2 text-left"
                aria-current={i === active}
              >
                <span className="relative block h-[2px] w-full overflow-hidden rounded-full bg-husk/20">
                  {i === active && (
                    <motion.span
                      key={`${item.title}-${active}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-turmeric"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: paused || reduceMotion ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                    />
                  )}
                  {i < active && <span className="absolute inset-0 bg-turmeric/60" />}
                </span>
                <span
                  className={`font-sans text-[10.5px] font-medium uppercase tracking-widest-3 transition-colors ${
                    i === active ? "text-husk" : "text-husk-dim/60 group-hover:text-husk-dim"
                  }`}
                >
                  {item.tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
