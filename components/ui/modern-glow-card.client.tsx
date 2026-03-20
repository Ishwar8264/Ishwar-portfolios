"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

type ModernGlowCardProps = {
  children: React.ReactNode;
  className?: string;
  accentFrom?: string;
  accentTo?: string;
  glowSize?: number;
  maxTiltDeg?: number;
  hoverScale?: number;
};

function hexToRgba(hex: string, alpha: number) {
  const cleanHex = hex.replace("#", "");
  const normalized =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((char) => `${char}${char}`)
          .join("")
      : cleanHex;

  if (normalized.length !== 6) {
    return `rgba(56, 189, 248, ${alpha})`;
  }

  const red = Number.parseInt(normalized.slice(0, 2), 16);
  const green = Number.parseInt(normalized.slice(2, 4), 16);
  const blue = Number.parseInt(normalized.slice(4, 6), 16);

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

export default function ModernGlowCard({
  children,
  className,
  accentFrom = "#38bdf8",
  accentTo = "#f472b6",
  glowSize = 230,
  maxTiltDeg = 6,
  hoverScale = 1.008,
}: ModernGlowCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const shouldTrackPointer = !shouldReduceMotion && canHover;
  const pointerX = useMotionValue(-999);
  const pointerY = useMotionValue(-999);
  const rotateX = useSpring(0, { stiffness: 240, damping: 24, mass: 0.65 });
  const rotateY = useSpring(0, { stiffness: 240, damping: 24, mass: 0.65 });
  const glowOpacity = useSpring(0, { stiffness: 260, damping: 30, mass: 0.7 });
  const accentFromSoft = hexToRgba(accentFrom, 0.28);
  const accentToSoft = hexToRgba(accentTo, 0.24);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncCanHover = () => {
      setCanHover(mediaQuery.matches);
    };

    syncCanHover();
    mediaQuery.addEventListener("change", syncCanHover);
    return () => {
      mediaQuery.removeEventListener("change", syncCanHover);
    };
  }, []);

  const reset = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
    pointerX.set(-999);
    pointerY.set(-999);
  }, [glowOpacity, pointerX, pointerY, rotateX, rotateY]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltY = ((localX - centerX) / centerX) * maxTiltDeg;
      const tiltX = -((localY - centerY) / centerY) * maxTiltDeg;

      pointerX.set(localX);
      pointerY.set(localY);
      rotateX.set(tiltX);
      rotateY.set(tiltY);
      glowOpacity.set(0.42);
    },
    [glowOpacity, maxTiltDeg, pointerX, pointerY, rotateX, rotateY],
  );

  const glowBackground = useMotionTemplate`
    radial-gradient(${glowSize}px circle at ${pointerX}px ${pointerY}px,
      ${accentFromSoft},
      transparent 66%)
  `;

  const borderGlowBackground = useMotionTemplate`
    radial-gradient(${glowSize + 40}px circle at ${pointerX}px ${pointerY}px,
      ${accentToSoft},
      transparent 72%)
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-3xl border border-border/85 bg-card text-card-foreground",
        "shadow-[0_10px_30px_-18px_color-mix(in_oklch,var(--foreground)_35%,transparent)]",
        className,
      )}
      onPointerEnter={shouldTrackPointer ? () => glowOpacity.set(0.24) : undefined}
      onPointerMove={shouldTrackPointer ? onPointerMove : undefined}
      onPointerLeave={shouldTrackPointer ? reset : undefined}
      whileHover={shouldTrackPointer ? { scale: hoverScale } : undefined}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={
        shouldTrackPointer
          ? {
              rotateX,
              rotateY,
              transformPerspective: 1100,
            }
          : undefined
      }
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(145deg,color-mix(in_oklch,var(--card)_96%,transparent),color-mix(in_oklch,var(--background)_92%,transparent))]"
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit]"
        style={{
          opacity: shouldTrackPointer ? glowOpacity : 0,
          background: borderGlowBackground,
        }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: shouldTrackPointer ? glowOpacity : 0,
          background: glowBackground,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full opacity-28 blur-3xl"
        style={{
          background: `radial-gradient(circle, ${accentFrom}33, transparent 72%)`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background)_2%,transparent),transparent_28%)]"
      />

      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}
