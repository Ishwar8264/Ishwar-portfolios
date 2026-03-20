"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

import { StripedPattern } from "@/components/magicui/striped-pattern";
import { cn } from "@/lib/utils";

import { AnimatedGridPattern } from "./animated-grid-pattern";

type SectionBackgroundTone = "blue" | "teal" | "rose" | "cyan";
type SectionPattern = "interactive" | "striped" | "grid" | "dot" | "ripple";

type SectionBackgroundProps = {
  tone?: SectionBackgroundTone;
  pattern?: SectionPattern;
  className?: string;
};

const toneClasses: Record<
  SectionBackgroundTone,
  {
    stripe: string;
    stripeAlt: string;
    interactive: string;
    ripple: string;
  }
> = {
  blue: {
    stripe:
      "text-sky-500/22 dark:text-sky-300/12 [mask-image:linear-gradient(90deg,transparent,white_12%,white_90%,transparent),linear-gradient(180deg,transparent,white_10%,white_90%,transparent)]",
    stripeAlt:
      "text-cyan-500/11 dark:text-cyan-300/8 [mask-image:radial-gradient(circle_at_center,white,transparent_82%)]",
    interactive:
      "fill-sky-500/12 stroke-sky-500/20 dark:fill-sky-300/10 dark:stroke-sky-300/18",
    ripple: "border-sky-500/35 bg-sky-500/6 dark:border-sky-300/28 dark:bg-sky-300/6",
  },
  teal: {
    stripe:
      "text-teal-500/20 dark:text-teal-300/11 [mask-image:linear-gradient(90deg,transparent,white_10%,white_92%,transparent),linear-gradient(180deg,transparent,white_8%,white_92%,transparent)]",
    stripeAlt:
      "text-emerald-500/11 dark:text-emerald-300/8 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]",
    interactive:
      "fill-teal-500/12 stroke-teal-500/19 dark:fill-teal-300/10 dark:stroke-teal-300/16",
    ripple:
      "border-teal-500/32 bg-teal-500/6 dark:border-teal-300/26 dark:bg-teal-300/6",
  },
  rose: {
    stripe:
      "text-rose-500/18 dark:text-rose-300/10 [mask-image:linear-gradient(90deg,transparent,white_10%,white_92%,transparent),linear-gradient(180deg,transparent,white_8%,white_92%,transparent)]",
    stripeAlt:
      "text-fuchsia-500/12 dark:text-fuchsia-300/8 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]",
    interactive:
      "fill-rose-500/12 stroke-rose-500/20 dark:fill-rose-300/10 dark:stroke-rose-300/16",
    ripple:
      "border-rose-500/34 bg-rose-500/6 dark:border-rose-300/26 dark:bg-rose-300/6",
  },
  cyan: {
    stripe:
      "text-cyan-500/18 dark:text-cyan-300/11 [mask-image:linear-gradient(90deg,transparent,white_10%,white_92%,transparent),linear-gradient(180deg,transparent,white_8%,white_90%,transparent)]",
    stripeAlt:
      "text-blue-500/11 dark:text-blue-300/8 [mask-image:radial-gradient(circle_at_center,white,transparent_80%)]",
    interactive:
      "fill-cyan-500/12 stroke-cyan-500/20 dark:fill-cyan-300/10 dark:stroke-cyan-300/17",
    ripple:
      "border-cyan-500/34 bg-cyan-500/6 dark:border-cyan-300/26 dark:bg-cyan-300/6",
  },
};

export default function SectionBackground({
  tone = "blue",
  pattern = "interactive",
  className,
}: SectionBackgroundProps) {
  const shouldReduceMotion = useReducedMotion();
  const colors = toneClasses[tone];
  const showInteractive = pattern === "interactive";
  const showStriped = pattern === "striped";
  const showGrid = pattern === "grid";
  const showDot = pattern === "dot";
  const showRipple = pattern === "ripple";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {showGrid ? (
        <div
          className={cn(
            "absolute inset-0 opacity-35",
            "[background-image:linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_8%,transparent)_1px,transparent_1px)]",
            "[background-size:42px_42px]",
            "[mask-image:radial-gradient(circle_at_center,white,transparent_88%)]",
          )}
        />
      ) : null}

      {showDot ? (
        <div
          className={cn(
            "absolute inset-0 opacity-45",
            "[background-image:radial-gradient(circle,color-mix(in_oklch,var(--foreground)_20%,transparent)_1.25px,transparent_1.25px)]",
            "[background-size:24px_24px]",
            "[mask-image:radial-gradient(circle_at_center,white,transparent_88%)]",
          )}
        />
      ) : null}

      {showStriped ? (
        <>
          <StripedPattern
            direction="right"
            width={20}
            height={20}
            className={cn("opacity-70", colors.stripe)}
          />
          <StripedPattern
            direction="left"
            width={26}
            height={26}
            className={cn("opacity-55", colors.stripeAlt)}
          />
        </>
      ) : null}

      {showInteractive ? (
        <AnimatedGridPattern
          width={56}
          height={56}
          numSquares={24}
          maxOpacity={0.22}
          duration={5}
          repeatDelay={1.1}
          className={cn(
            "absolute inset-0 h-full w-full opacity-85",
            "[mask-image:radial-gradient(circle_at_center,white,transparent_86%)]",
            colors.interactive,
          )}
        />
      ) : null}

      {showRipple ? (
        <LazyMotion features={domAnimation}>
          <div
            className={cn(
              "absolute inset-0",
              "[mask-image:radial-gradient(circle_at_center,white,transparent_86%)]",
            )}
          >
            {[0, 1, 2].map((index) => (
              <m.div
                key={`ripple-${index}`}
                className={cn(
                  "absolute top-1/2 left-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border",
                  colors.ripple,
                )}
                initial={
                  shouldReduceMotion
                    ? { opacity: 0.2, scale: 1 }
                    : { opacity: 0.32, scale: 0.26 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 0.2, scale: 1 }
                    : { opacity: [0.34, 0.16, 0], scale: [0.26, 1.08, 1.62] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 5.8,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 1.2,
                        ease: "easeOut",
                      }
                }
              />
            ))}
          </div>
        </LazyMotion>
      ) : null}
    </div>
  );
}
