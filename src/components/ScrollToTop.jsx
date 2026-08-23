import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLenis } from "../lib/lenis";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={handleClick}
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-turmeric/40 bg-soil-deep/80 text-husk backdrop-blur-sm transition-colors hover:border-turmeric hover:text-turmeric focus-visible:outline focus-visible:outline-2 focus-visible:outline-turmeric md:bottom-8 md:right-8"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
            <path d="M8 13V3M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
