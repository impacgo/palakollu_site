import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { getPlaces } from "../lib/contentStore";

export default function Arrival() {
  const places = getPlaces();
  const largeImage = places.find((p) => p.id === "p7")?.photo; // Undi — paddy fields
  const smallImage = places.find((p) => p.id === "p8")?.photo; // Narasapuram — craft

  return (
    <section className="relative bg-husk py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-2 md:gap-12">
        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="aspect-[3/4] w-full max-w-md overflow-hidden rounded-sm"
          >
            <img src={largeImage} alt="Paddy fields near Undi village" className="h-full w-full object-cover" />
          </motion.div>

          <Reveal delay={0.3} className="absolute -bottom-10 -right-6 h-32 w-32 overflow-hidden rounded-full border-4 border-husk shadow-xl md:-right-10 md:h-40 md:w-40">
            <img src={smallImage} alt="Hand-worked lace craft in Narasapuram" className="h-full w-full object-cover" />
          </Reveal>
        </div>

        <div>
          <Reveal>
            <span className="font-sans text-[11px] font-medium uppercase tracking-widest-2 text-terracotta">
              Palakollu · West Godavari
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-[clamp(28px,4.2vw,44px)] leading-[1.12] text-soil">
              A different way to see Andhra.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-soil/75">
              Palakollu sits within a landscape shaped by water, agriculture, temples and
              village life. Here, the journey is not only about reaching a destination — it
              is about the roads, people, meals and quiet moments between them.
            </p>
          </Reveal>
          <Reveal delay={0.32}>
            <span className="mt-6 inline-block font-sans text-[11px] uppercase tracking-widest-3 text-soil/50">
              16°31′ N · 81°44′ E
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
