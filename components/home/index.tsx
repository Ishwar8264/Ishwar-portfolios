import Image from "next/image";

import { resumeHref } from "@/content/profile";
import type { ContactData, ProfileData } from "@/types/portfolio";

import MotionDemo from "./motion-demo.client";

type HomeSectionProps = {
  profile: ProfileData;
  contact: ContactData;
};

export default function HomeSection({ profile, contact }: HomeSectionProps) {
  return (
    <section
      id="home"
      className="mx-auto grid min-h-[85vh] w-[min(1200px,95%)] gap-8 py-10 lg:grid-cols-[1.15fr_0.85fr]"
    >
      <div className="flex flex-col justify-center gap-7">
        <p className="w-fit rounded-full border border-border px-4 py-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {profile.role}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.tagline}
        </h1>
        <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
          {profile.summary}
        </p>

        <div className="flex flex-wrap gap-2">
          {profile.focus.map((focusItem) => (
            <span
              key={focusItem}
              className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {focusItem}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            href="#projects"
          >
            View Projects
          </a>
          <a
            className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            href={resumeHref}
            download
          >
            Download Resume
          </a>
          <a
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
            href={`mailto:${contact.email}`}
          >
            Let&apos;s Connect
          </a>
        </div>

        <MotionDemo />
      </div>

      <aside className="flex items-end">
        <div className="relative w-full overflow-hidden rounded-3xl border border-border bg-card p-2">
          <Image
            src="/images/profile/img-2.jpeg"
            alt={`${profile.name} profile photo`}
            width={960}
            height={1200}
            priority
            className="h-[460px] w-full rounded-2xl object-cover object-center"
          />
          <div className="absolute right-5 bottom-5 flex items-center gap-3 rounded-2xl border border-border/70 bg-background/85 px-3 py-2 backdrop-blur">
            <Image
              src="/images/profile/ishwar-logo.png"
              alt="Ishwar logo"
              width={32}
              height={32}
              className="size-8 rounded-lg object-contain"
            />
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                Based In
              </p>
              <p className="text-sm font-semibold">{profile.location}</p>
            </div>
          </div>
        </div>
      </aside>
    </section>
  );
}
