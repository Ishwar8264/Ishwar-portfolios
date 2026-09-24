"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Thin gradient progress bar fixed at the very top of the viewport.
 * Tracks how far the user has scrolled through the page.
 */
export default function ReadingProgress() {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const next = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, next)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (shouldReduceMotion) {
    return (
      <div
        aria-hidden
        className="portfolio-reading-progress fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      >
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }

  return (
    <motion.div
      aria-hidden
      className="portfolio-reading-progress fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent"
      initial={{ opacity: 0 }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-sky-400 via-fuchsia-400 to-amber-300 shadow-[0_0_10px_-2px_rgba(56,189,248,0.6)]"
        style={{ width: `${progress}%` }}
        transition={{ duration: 0.05, ease: "linear" }}
      />
    </motion.div>
  );
}
