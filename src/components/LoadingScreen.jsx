import { motion } from "framer-motion";

/**
 * Branded loading state used as the Suspense fallback for lazy-loaded
 * routes — a slowly drawing river line instead of a generic spinner.
 */
export default function LoadingScreen() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 bg-soil-deep px-6 py-24">
      <div className="flex flex-col items-center leading-none">
        <span className="font-display text-[20px] tracking-widest-2 text-husk">PALAKOLLU</span>
        <span className="mt-1 font-sans text-[9px] tracking-widest-2 text-turmeric/80">
          TRAILS · WEST GODAVARI
        </span>
      </div>
      <svg viewBox="0 0 200 24" className="w-40">
        <path
          d="M2 12 C 50 2, 70 22, 100 12 S 150 2, 198 12"
          fill="none"
          stroke="#d4a13d"
          strokeOpacity="0.15"
          strokeWidth="1.5"
        />
        <motion.path
          d="M2 12 C 50 2, 70 22, 100 12 S 150 2, 198 12"
          fill="none"
          stroke="#d4a13d"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
