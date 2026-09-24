"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type ScrollToTopProps = {
  className?: string;
  /** Scroll position (in px) after which the button becomes visible. */
  showAfter?: number;
};

export default function ScrollToTop({
  className,
  showAfter = 480,
}: ScrollToTopProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setVisible(y > showAfter);
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
  }, [showAfter]);

  const handleClick = () => {
    if (shouldReduceMotion) {
      window.scrollTo(0, 0);
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="scroll-to-top"
          type="button"
          onClick={handleClick}
          aria-label="Scroll back to top"
          className={cn(
            "portfolio-scroll-top group fixed bottom-5 right-5 z-40 inline-flex size-11 items-center justify-center rounded-full border border-border/70 bg-background/85 text-foreground shadow-lg backdrop-blur-md transition-colors hover:border-border hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            className,
          )}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
          whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
        >
          <ArrowUp className="size-4 transition-transform group-hover:-translate-y-px" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
