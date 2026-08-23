import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getLenis, NAV_OFFSET } from "../lib/lenis";

/**
 * Mobile-only sticky bottom bar (spec §42). Appears once the hero has
 * scrolled past, and hides itself once the enquiry form ("#contact") is
 * actually in view — no point floating a CTA over the form it points to.
 */
export default function MobileStickyCTA({ price, label = "Plan This Trail" }) {
  const [pastHero, setPastHero] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const seenContact = useRef(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setContactVisible(entry.isIntersecting);
        if (entry.isIntersecting) seenContact.current = true;
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function handleClick() {
    const el = document.getElementById("contact");
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.2 });
    else el.scrollIntoView({ behavior: "smooth" });
  }

  const visible = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-turmeric/20 bg-soil-deep/95 px-5 py-3.5 backdrop-blur-md md:hidden"
          style={{ paddingBottom: "max(0.875rem, env(safe-area-inset-bottom))" }}
        >
          {price && (
            <div className="leading-none">
              <span className="block font-display text-lg text-turmeric-soft">₹{price.toLocaleString("en-IN")}</span>
              <span className="text-[10px] uppercase tracking-widest-3 text-husk-dim">per person</span>
            </div>
          )}
          <button
            type="button"
            onClick={handleClick}
            className="flex-1 rounded-full bg-terracotta py-3 font-sans text-[12.5px] font-semibold uppercase tracking-widest-3 text-husk transition-colors hover:bg-turmeric hover:text-soil-deep"
          >
            {label}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
