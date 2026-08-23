import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getLenis, NAV_OFFSET } from "../lib/lenis";

/**
 * Keeps scroll position sane across route changes: jumps fresh pages
 * to the top instantly, and smooth-scrolls to a target section when a
 * link arrives with a #hash (e.g. a footer link back to "/#packages").
 */
export default function ScrollManager() {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    const lenis = getLenis();
    const changedPage = prevPath.current !== location.pathname;

    if (location.hash) {
      const id = location.hash.slice(1);
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.2, immediate: changedPage });
        else el.scrollIntoView({ behavior: changedPage ? "auto" : "smooth" });
        return true;
      };
      requestAnimationFrame(() => {
        if (!scrollToTarget()) setTimeout(scrollToTarget, 150);
      });
    } else if (changedPage) {
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    }

    prevPath.current = location.pathname;
  }, [location.pathname, location.hash]);

  return null;
}
