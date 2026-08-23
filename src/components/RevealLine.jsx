import { motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1];

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

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="absolute inset-y-0 left-1/2 w-0 pointer-events-none">
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: -barSpread, opacity: 0 }}
          transition={transition}
        />
        <motion.span
          className="absolute top-0 h-full w-px bg-turmeric"
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: barSpread, opacity: 0 }}
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
