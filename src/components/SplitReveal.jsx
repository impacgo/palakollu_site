import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];
const VIEWPORT = { once: true, margin: "-15% 0px -15% 0px" };
const EDGE_MARGIN = 8;

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
  const wrapperRef = useRef(null);
  const [spread, setSpread] = useState(barSpread);

  // See RevealLine.jsx for why this is clamped at runtime rather than
  // contained via any shared-ancestor CSS overflow rule.
  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const safeDistance = Math.min(center, window.innerWidth - center) - EDGE_MARGIN;
    setSpread(Math.max(0, Math.min(barSpread, safeDistance)));
  }, [barSpread]);

  return (
    <div ref={wrapperRef} className={`relative inline-block ${className}`}>
      <span className="absolute inset-y-0 left-1/2 w-0 pointer-events-none">
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          whileInView={{ x: -spread, opacity: 0 }}
          viewport={VIEWPORT}
          transition={transition}
        />
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          whileInView={{ x: spread, opacity: 0 }}
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
