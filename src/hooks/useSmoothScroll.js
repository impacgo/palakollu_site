import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis, NAV_OFFSET } from "../lib/lenis";

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function jumpTo(el) {
  const top = el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET;
  window.scrollTo({ top, behavior: "auto" });
}

export default function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function handleAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      jumpTo(el);
    }

    // Respect the OS "reduce motion" setting: skip the momentum-scroll
    // library entirely and fall back to instant native scrolling.
    if (reduceMotion) {
      document.addEventListener("click", handleAnchorClick);
      return () => document.removeEventListener("click", handleAnchorClick);
    }

    const lenis = new Lenis({
      duration: 1.3,
      easing: easeOutExpo,
      smoothWheel: true,
    });
    setLenis(lenis);

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    function handleSmoothAnchorClick(e) {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.3 });
    }
    document.addEventListener("click", handleSmoothAnchorClick);

    return () => {
      document.removeEventListener("click", handleSmoothAnchorClick);
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);
}
