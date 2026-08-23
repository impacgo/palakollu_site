import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];
const EDGE_MARGIN = 8;

/**
 * A thin vertical seam sits at the exact center of the content.
 * On mount it splits in two — one half sweeping left, the other right —
 * while the content itself unmasks outward from that same center line,
 * so the text appears to open up from the seam until fully revealed.
 */
export default function RevealLine({
  children,
  duration = 0.9,
  delay = 0,
  barSpread = 160,
  className = "",
  onDone,
}) {
  const transition = { duration, delay, ease: EASE };
  const wrapperRef = useRef(null);
  const [spread, setSpread] = useState(barSpread);

  // The bars travel ±spread from the element's own horizontal center via
  // a CSS transform. A transform doesn't affect layout, but on this app's
  // pages it still inflates document.documentElement.scrollWidth on
  // narrow viewports (confirmed: this holds true no matter how many
  // ancestors already have overflow:hidden — only clamping the actual
  // travel distance to the real available space reliably prevents it,
  // without needing any shared-ancestor CSS that would also risk
  // breaking position:sticky elsewhere on the page).
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
          animate={{ x: -spread, opacity: 0 }}
          transition={transition}
        />
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: spread, opacity: 0 }}
          transition={transition}
        />
      </span>

      <motion.div
        initial={{ clipPath: "inset(0 50% 0 50%)" }}
        animate={{ clipPath: "inset(0 0% 0 0%)" }}
        transition={transition}
        onAnimationComplete={onDone}
      >
        {children}
      </motion.div>
    </div>
  );
}
