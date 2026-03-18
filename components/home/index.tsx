import { Button } from "@/components/ui/button";

import MotionDemo from "./motion-demo.client";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[85vh] w-[min(1200px,95%)] flex-col justify-center gap-7 py-10"
    >
      <p className="w-fit rounded-full border border-border px-4 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        Frontend Engineer
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
        Building fast and expressive interfaces for real products.
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
        Motion + CSS demo integrated in a server-first page. Animations are
        smooth, optional, and reduced-motion friendly.
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="lg">View Projects</Button>
        <a
          className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
          href="#projects"
        >
          Explore Work
        </a>
      </div>

      <MotionDemo />
    </section>
  );
}
