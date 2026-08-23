import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TONE_GRADIENTS = {
  soil: "from-soil-2 via-soil to-soil-deep",
  terracotta: "from-[#4a2015] via-soil to-soil-deep",
  canal: "from-[#132c34] via-soil to-soil-deep",
  paddy: "from-[#25341c] via-soil to-soil-deep",
};

/**
 * Full-bleed section backdrop matching the hero's treatment: a photo
 * (once one is supplied) or tonal gradient art, feathered at the top
 * and bottom edges so it reads as one continuous canvas with the
 * sections above and below rather than a hard-edged block. Drifts
 * slowly on scroll for the same parallax depth as the hero.
 */
export default function SectionBackdrop({ tone = "soil", src, alt = "", animate = false, eager = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            className={`h-full w-full object-cover ${animate ? "animate-kenburns" : ""}`}
          />
        ) : (
          <div className={`relative h-full w-full bg-gradient-to-br ${TONE_GRADIENTS[tone]}`}>
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 18% 22%, rgba(217,164,65,0.16), transparent 55%), radial-gradient(circle at 82% 78%, rgba(217,164,65,0.12), transparent 50%)",
              }}
            />
          </div>
        )}
      </motion.div>
      {src && <div className="absolute inset-0 bg-paddy-deep/20 mix-blend-multiply" />}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-soil-deep via-transparent to-soil-deep" />
    </div>
  );
}
