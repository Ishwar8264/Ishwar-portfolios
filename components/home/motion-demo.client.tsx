"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";

const highlights = [
  {
    title: "Current Role",
    detail:
      "Software Engineer, Frontend at RiverHead Software (Aug 2025 — Present).",
  },
  {
    title: "Current Product",
    detail:
      "Working on Klakar, a platform for artist portfolios, gigs, jobs, and classes.",
  },
  {
    title: "Engineering Focus",
    detail:
      "React, Zustand, Next.js (Pages + App Router), and Java backend API testing.",
  },
] as const;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function MotionDemo() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <LazyMotion features={domAnimation}>
      <div className="motion-demo-shell relative mt-4 overflow-hidden rounded-3xl border border-border bg-card/70 p-5 sm:p-7">
        {!shouldReduceMotion ? (
          <m.div
            aria-hidden
            className="motion-demo-orb absolute -top-16 -right-10 h-36 w-36 rounded-full"
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 0.32, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ) : null}

        <m.div
          className="relative z-10"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Current Snapshot
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Building Klakar as a frontend software engineer.
          </h3>
        </m.div>

        <m.div
          className="relative z-10 mt-5 grid gap-3 sm:grid-cols-3"
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          {highlights.map((item) => (
            <m.article
              key={item.title}
              variants={itemVariants}
              className="motion-demo-card rounded-2xl border border-border/70 bg-background/75 p-4 transition-transform duration-300 hover:-translate-y-1"
            >
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
            </m.article>
          ))}
        </m.div>
      </div>
    </LazyMotion>
  );
}
