import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CompassRoseIcon } from "./icons";

const TONES = {
  soil: "from-soil-2 via-soil to-soil-deep",
  terracotta: "from-[#6b2c1c] via-soil to-soil-deep",
  paddy: "from-[#2c3f22] via-soil to-soil-deep",
  canal: "from-[#1c3540] via-soil to-soil-deep",
};

/**
 * Drop-in image slot: pass `src` once a real photo is ready and it
 * renders as a normal photo (with a gentle scroll parallax drift and
 * a fade-in once loaded). Until then it renders tasteful branded
 * placeholder art (gradient + icon) sized to the same aspect ratio,
 * so swapping in photography later is a one-line change.
 */
export default function PhotoSlot({
  src,
  alt = "",
  Icon = CompassRoseIcon,
  tone = "soil",
  aspect = "aspect-[4/3]",
  className = "",
  eager = false,
}) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  if (src) {
    return (
      <div ref={ref} className={`relative overflow-hidden ${aspect} ${className}`}>
        <motion.div style={{ y }} className="absolute inset-x-0 -top-[7%] h-[114%]">
          <img
            src={src}
            alt={alt}
            loading={eager ? "eager" : "lazy"}
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </motion.div>
        {/* Lush green-forest grade — ties every photo to the hero's mood while keeping its greens vivid */}
        <div className="pointer-events-none absolute inset-0 bg-paddy-deep/20 mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soil-deep/50 via-transparent to-black/5" />
        <div className="pointer-events-none absolute inset-0 border border-turmeric/10" />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${aspect} ${className} bg-gradient-to-br ${TONES[tone]}`}
    >
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(217,164,65,0.18), transparent 55%), radial-gradient(circle at 80% 75%, rgba(217,164,65,0.12), transparent 50%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="h-10 w-10 md:h-12 md:w-12 text-turmeric/50 transition-transform duration-700 group-hover:scale-110" />
      </div>
      <div className="absolute inset-0 border border-husk/10" />
    </div>
  );
}
