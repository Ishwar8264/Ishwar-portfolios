"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const toneClasses = [
  "animated-name-tone-1",
  "animated-name-tone-2",
  "animated-name-tone-3",
  "animated-name-tone-4",
  "animated-name-tone-5",
  "animated-name-tone-6",
] as const;

const sizeClasses = {
  xs: "text-sm",
  sm: "text-base",
  md: "text-xl sm:text-2xl",
  lg: "text-2xl sm:text-3xl",
  xl: "text-3xl sm:text-4xl",
  hero: "text-3xl sm:text-5xl",
} as const;

const placeClasses = {
  hero: "animated-name-place-hero",
  about: "animated-name-place-about",
  navbar: "animated-name-place-navbar",
  inline: "animated-name-place-inline",
} as const;

const paletteClasses = {
  brand: "animated-name-palette-brand",
  warm: "animated-name-palette-warm",
  ocean: "animated-name-palette-ocean",
  neon: "animated-name-palette-neon",
} as const;

const placeRevealConfig = {
  hero: {
    typeSpeedMs: 165,
    deleteSpeedMs: 115,
    holdTypedMs: 980,
    restartDelayMs: 320,
  },
  about: {
    typeSpeedMs: 155,
    deleteSpeedMs: 110,
    holdTypedMs: 900,
    restartDelayMs: 300,
  },
  navbar: {
    typeSpeedMs: 140,
    deleteSpeedMs: 102,
    holdTypedMs: 840,
    restartDelayMs: 280,
  },
  inline: {
    typeSpeedMs: 150,
    deleteSpeedMs: 108,
    holdTypedMs: 880,
    restartDelayMs: 280,
  },
} as const;

type AnimatedNameSize = keyof typeof sizeClasses;
type AnimatedNamePlace = keyof typeof placeClasses;
type AnimatedNamePalette = keyof typeof paletteClasses;

type AnimatedNameProps = {
  name: string;
  className?: string;
  size?: AnimatedNameSize;
  place?: AnimatedNamePlace;
  palette?: AnimatedNamePalette;
  colors?: string[];
};

type RevealPhase =
  | "typing"
  | "holdingTyped"
  | "deleting"
  | "holdingEmpty";

function letterDynamicStyle(index: number, colors: string[] | undefined) {
  const customColor =
    colors && colors.length > 0 ? colors[index % colors.length] : undefined;
  const style = {} as CSSProperties & { color?: string };

  if (customColor) {
    style.color = customColor;
  }

  return style;
}

export default function AnimatedName({
  name,
  className,
  size = "lg",
  place = "inline",
  palette = "brand",
  colors,
}: AnimatedNameProps) {
  const shouldReduceMotion = useReducedMotion();
  const letters = useMemo(() => Array.from(name), [name]);
  const revealConfig = placeRevealConfig[place];
  const cleanColors = colors?.filter((value) => value.trim().length > 0);
  const hasCustomColors = Boolean(cleanColors && cleanColors.length > 0);
  const [visibleCount, setVisibleCount] = useState(
    shouldReduceMotion ? letters.length : 0,
  );
  const [phase, setPhase] = useState<RevealPhase>("typing");
  const visibleLetters = useMemo(
    () => letters.slice(0, visibleCount),
    [letters, visibleCount],
  );

  useEffect(() => {
    setVisibleCount(shouldReduceMotion ? letters.length : 0);
    setPhase("typing");
  }, [letters.length, shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    if (phase === "typing") {
      if (visibleCount < letters.length) {
        timer = setTimeout(() => {
          setVisibleCount((current) => current + 1);
        }, revealConfig.typeSpeedMs);
      } else {
        setPhase("holdingTyped");
      }
    } else if (phase === "holdingTyped") {
      timer = setTimeout(() => {
        setPhase("deleting");
      }, revealConfig.holdTypedMs);
    } else if (phase === "deleting") {
      if (visibleCount > 0) {
        timer = setTimeout(() => {
          setVisibleCount((current) => current - 1);
        }, revealConfig.deleteSpeedMs);
      } else {
        setPhase("holdingEmpty");
      }
    } else if (phase === "holdingEmpty") {
      timer = setTimeout(() => {
        setPhase("typing");
      }, revealConfig.restartDelayMs);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [
    phase,
    revealConfig.deleteSpeedMs,
    revealConfig.holdTypedMs,
    revealConfig.restartDelayMs,
    letters.length,
    revealConfig.typeSpeedMs,
    shouldReduceMotion,
    visibleCount,
  ]);

  return (
    <span
      role="text"
      aria-label={name}
      className={cn(
        "animated-name-root",
        sizeClasses[size],
        placeClasses[place],
        !hasCustomColors && paletteClasses[palette],
        className,
      )}
    >
      {visibleLetters.map((letter, index) => {
        if (letter === " ") {
          return (
            <span
              key={`space-${index}`}
              aria-hidden="true"
              className="animated-name-space"
            />
          );
        }

        return (
          <span
            key={`${letter}-${index}`}
            aria-hidden="true"
            className={cn(
              "animated-name-letter",
              toneClasses[index % toneClasses.length],
            )}
            style={letterDynamicStyle(index, cleanColors)}
          >
            {letter}
          </span>
        );
      })}
      {!shouldReduceMotion ? (
        <span aria-hidden="true" className="animated-name-cursor">
          |
        </span>
      ) : null}
    </span>
  );
}
