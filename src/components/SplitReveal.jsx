import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];
const VIEWPORT = { once: true, margin: "-15% 0px -15% 0px" };

/**
 * Scroll-triggered sibling of RevealLine: same center-seam split-open
 * effect, but fires once when scrolled into view instead of on mount.
 */
export default function SplitReveal({
  children,
  duration = 0.8,
  delay = 0,
  barSpread = 160,
  className = "",
}) {
  const transition = { duration, delay, ease: EASE };

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="absolute inset-y-0 left-1/2 w-0 pointer-events-none">
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          whileInView={{ x: -barSpread, opacity: 0 }}
          viewport={VIEWPORT}
          transition={transition}
        />
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          whileInView={{ x: barSpread, opacity: 0 }}
          viewport={VIEWPORT}
          transition={transition}
        />
      </span>

      <motion.div
        initial={{ clipPath: "inset(0 50% 0 50%)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0%)" }}
        viewport={VIEWPORT}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}
