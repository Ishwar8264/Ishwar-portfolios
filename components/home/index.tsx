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
    <section id="home" className="hero-wrap">
      <div className="hero-grid mx-auto grid min-h-[100svh] w-[min(1200px,95%)] items-center gap-8 pt-24 pb-8 md:pt-28 md:pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:pt-24 lg:pb-6">
        <div className="flex flex-col justify-center gap-5 lg:pr-4">
          <div className="flex flex-wrap gap-2">
            <span className="hero-pill">{profile.role}</span>
            <span className="hero-pill">{profile.currentRolePeriod}</span>
          </div>

          <h1 className="max-w-4xl text-3xl leading-[1.06] font-semibold tracking-tight sm:text-5xl">
            {profile.name}
            <span className="mt-2 block text-xl leading-tight font-medium text-muted-foreground sm:text-3xl">
              {profile.tagline}
            </span>
          </h1>

          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">
            {profile.summary}
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="hero-metric-card">
              <p className="hero-metric-label">Current Company</p>
              <p className="hero-metric-value">{profile.currentCompany}</p>
            </article>
            <article className="hero-metric-card">
              <p className="hero-metric-label">Current Product</p>
              <p className="hero-metric-value">{profile.currentProduct}</p>
            </article>
            <article className="hero-metric-card">
              <p className="hero-metric-label">Location</p>
              <p className="hero-metric-value">{profile.location}</p>
            </article>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a className="hero-btn-primary" href="#projects">
              View Projects
            </a>
            <a className="hero-btn-secondary" href={resumeHref} download>
              Download Resume
            </a>
            <a className="hero-btn-secondary" href={`mailto:${contact.email}`}>
              Let&apos;s Connect
            </a>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.focus.map((focusItem) => (
              <span key={focusItem} className="hero-tag">
                {focusItem}
              </span>
            ))}
          </div>

          <MotionDemo />
        </div>

        <aside className="flex items-center lg:justify-end">
          <div className="hero-image-shell relative w-full overflow-hidden rounded-3xl border border-border p-2">
            <Image
              src="/images/profile/img-2.jpeg"
              alt={`${profile.name} profile photo`}
              width={960}
              height={1200}
              priority
              className="h-[min(54svh,520px)] w-full rounded-2xl object-cover object-center lg:h-[min(64svh,540px)]"
            />

            <div className="hero-floating-card left-4 top-4">
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Live Product
              </p>
              <a
                className="mt-1 block text-sm font-semibold hover:underline"
                href="https://klakar.com/"
                target="_blank"
                rel="noreferrer noopener"
              >
                Klakar
              </a>
            </div>

            <div className="hero-floating-card right-4 bottom-4 flex items-center gap-3">
              <Image
                src="/images/profile/ishwar-logo.png"
                alt="Ishwar logo"
                width={34}
                height={34}
                className="size-8 rounded-md object-contain"
              />
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Based In
                </p>
                <p className="text-sm font-semibold">{profile.location}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
