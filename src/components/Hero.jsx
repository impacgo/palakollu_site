import { lazy, Suspense, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImg from "../assets/hero-backwaters.webp";
import RevealLine from "./RevealLine";

// Three.js only powers this one subtle particle layer — keep it out of
// the main bundle and let it fade in a beat after first paint.
const HeroFireflies = lazy(() => import("./HeroFireflies"));

const bottomContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const bottomItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

function PalmIcon(props) {
  return (
    <svg viewBox="0 0 40 46" fill="none" {...props}>
      <path d="M20 46V22" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path
        d="M20 22C20 22 6 18 3 8M20 22C20 22 3 15 2 2M20 22C20 22 34 18 37 8M20 22C20 22 37 15 38 2M20 22C20 22 10 10 12 1M20 22C20 22 30 10 28 1"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Hero() {
  const [stage, setStage] = useState(0); // 0 eyebrow, 1 heading, 2 subtitle, 3 bottom bar
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);

  const advance = (next) => setTimeout(() => setStage(next), 180);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-soil-deep"
    >
      {/* Background image — parallax drift as the section scrolls past */}
      <motion.div style={{ y: bgY }} className="absolute inset-x-0 -top-[140px] -bottom-[140px]">
        <img
          src={heroImg}
          alt="A traditional houseboat drifting through the palm-lined backwaters near the Godavari delta"
          className="h-full w-full object-cover animate-kenburns"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </motion.div>

      {/* Contrast overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-soil-deep via-transparent to-transparent" />

      {/* Firefly / dust particle layer */}
      <Suspense fallback={null}>
        <HeroFireflies />
      </Suspense>

      {/* Foreground content — drifts slower than the backdrop, fading near the scroll-out point */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full w-full flex-col items-center px-6 text-center"
      >
        {/* spacer for fixed nav */}
        <div className="h-24 md:h-28 shrink-0" />

        {/* center text block */}
        <div className="flex flex-1 flex-col items-center justify-center gap-5 md:gap-7 -mt-6 max-w-4xl">
          <RevealLine duration={0.7} barSpread={120} onDone={() => advance(1)}>
            <p className="font-sans text-[11px] md:text-xs font-medium uppercase tracking-widest-2 text-turmeric text-shadow-soft">
              West Godavari · Andhra Pradesh
            </p>
          </RevealLine>

          {stage >= 1 && (
            <RevealLine duration={0.95} barSpread={240} onDone={() => advance(2)}>
              <h1 className="font-display font-normal text-balance leading-[1.08] tracking-widest-3 text-shadow-hero text-[clamp(32px,6vw,72px)] text-husk">
                GODAVARI <span className="text-turmeric-soft">DELTA</span> ESCAPES
              </h1>
            </RevealLine>
          )}

          {stage >= 2 && (
            <RevealLine
              duration={1}
              barSpread={190}
              className="max-w-md"
              onDone={() => advance(3)}
            >
              <p className="font-sans text-[15px] md:text-[16px] leading-relaxed text-shadow-soft text-husk-dim">
                Curated tours through Palakollu's temple towns and canal-side
                villages — coconut groves, backwaters and{" "}
                <span className="text-turmeric-soft">the Godavari at dusk</span>,
                mapped stop by stop.
              </p>
            </RevealLine>
          )}
        </div>

        {/* bottom bar */}
        <motion.div
          variants={bottomContainer}
          initial="hidden"
          animate={stage >= 3 ? "show" : "hidden"}
          className="flex items-center justify-center gap-6 pb-14 md:pb-16 shrink-0"
        >
          <motion.div variants={bottomItem}>
            <PalmIcon className="h-9 w-9 text-husk/80" />
          </motion.div>

          <motion.div variants={bottomItem} className="h-11 w-px bg-husk/35" />

          <motion.span variants={bottomItem} className="font-display text-2xl text-husk/90">
            P
          </motion.span>

          <motion.div variants={bottomItem} className="h-11 w-px bg-husk/35" />

          <motion.a
            href="#packages"
            variants={bottomItem}
            className="group relative flex h-20 w-20 items-center justify-center rounded-full"
          >
            <span className="absolute inset-0 rounded-full border border-dashed border-turmeric/60 animate-ring-spin" />
            <span className="absolute inset-[3px] rounded-full border border-turmeric/40 transition-colors duration-300 group-hover:bg-turmeric group-hover:border-turmeric" />
            <span className="relative font-sans text-[10px] font-semibold uppercase tracking-widest-3 text-husk transition-colors duration-300 group-hover:text-soil-deep">
              Book<br />Now
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
