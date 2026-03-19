import Image from "next/image";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { Highlighter } from "@/components/ui/highlighter";
import { LightRays } from "@/components/ui/light-rays";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { SparklesText } from "@/components/ui/sparkles-text";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { resumeHref } from "@/content/profile";
import type { ContactData, ProfileData } from "@/types/portfolio";

import AnimatedName from "./animated-name.client";
import MotionDemo from "./motion-demo.client";

type HomeSectionProps = {
  profile: ProfileData;
  contact: ContactData;
};

export default function HomeSection({ profile, contact }: HomeSectionProps) {
  const metrics = [
    { label: "Current Company", value: profile.currentCompany, from: "#f97316", to: "#f43f5e" },
    { label: "Current Product", value: profile.currentProduct, from: "#0ea5e9", to: "#2563eb" },
    { label: "Location", value: profile.location, from: "#8b5cf6", to: "#22c55e" },
  ] as const;
  const summaryHighlights = [
    {
      text: "Klakar",
      color: "rgba(96, 165, 250, 0.28)",
    },
    {
      text: "Next.js App Router",
      color: "rgba(125, 211, 252, 0.28)",
    },
    {
      text: "React ecosystem and Zustand",
      color: "rgba(244, 114, 182, 0.24)",
    },
    {
      text: "server-side and client-side API integration",
      color: "rgba(74, 222, 128, 0.24)",
    },
    {
      text: "Postman and Swagger",
      color: "rgba(251, 191, 36, 0.28)",
    },
    {
      text: "PostgreSQL/SQL basics plus MongoDB with Prisma and Mongoose",
      color: "rgba(192, 132, 252, 0.24)",
    },
  ] as const;

  const summarySegments = (() => {
    let remaining = profile.summary;
    const segments: Array<string | (typeof summaryHighlights)[number]> = [];

    for (const highlight of summaryHighlights) {
      const matchIndex = remaining.indexOf(highlight.text);
      if (matchIndex === -1) {
        continue;
      }

      if (matchIndex > 0) {
        segments.push(remaining.slice(0, matchIndex));
      }

      segments.push(highlight);
      remaining = remaining.slice(matchIndex + highlight.text.length);
    }

    if (remaining.length > 0) {
      segments.push(remaining);
    }

    return segments.length > 0 ? segments : [profile.summary];
  })();

  return (
    <section id="home" className="hero-wrap">
      <div aria-hidden="true" className="hero-background">
        <FlickeringGrid
          className="hero-flickering-grid"
          squareSize={5}
          gridGap={7}
          flickerChance={0.22}
          color="rgb(59, 130, 246)"
          maxOpacity={0.26}
        />
        <LightRays
          className="hero-light-rays"
          count={8}
          blur={28}
          speed={16}
          color="rgba(96, 165, 250, 0.22)"
          length="58vh"
        />
      </div>

      <div className="hero-grid mx-auto grid min-h-[100svh] w-[min(1200px,95%)] items-center gap-8 pt-24 pb-8 md:pt-28 md:pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:pt-24 lg:pb-6">
        <div className="min-w-0 flex flex-col justify-center gap-5 lg:pr-4">
          <BlurFade inView delay={0.05}>
            <div className="flex flex-wrap gap-2">
              <div className="hero-pill">
                <SparklesText
                  className="hero-pill-sparkles text-[0.68rem] font-semibold tracking-[0.12em] uppercase"
                  sparklesCount={5}
                  colors={{ first: "#60a5fa", second: "#f472b6" }}
                >
                  {profile.role}
                </SparklesText>
              </div>
              <div className="hero-pill">
                <AnimatedShinyText className="text-[0.68rem] font-semibold tracking-[0.12em] uppercase text-muted-foreground">
                  {profile.currentRolePeriod}
                </AnimatedShinyText>
              </div>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.09}>
            <div className="max-w-4xl">
              <h1 className="leading-[1.06] font-semibold tracking-tight">
                <span className="hero-name-glow">
                  <AnimatedName
                    name={profile.name}
                    place="hero"
                    size="hero"
                    palette="neon"
                  />
                </span>
              </h1>
              <TypingAnimation
                as="p"
                duration={52}
                delay={220}
                startOnView={false}
                className="hero-tagline mt-3 block text-xl leading-tight font-medium text-muted-foreground sm:text-3xl"
              >
                {profile.tagline}
              </TypingAnimation>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.12}>
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
              {summarySegments.map((segment, index) =>
                typeof segment === "string" ? (
                  <span key={`summary-text-${index}`}>{segment}</span>
                ) : (
                  <Highlighter
                    key={`${segment.text}-${index}`}
                    color={segment.color}
                    animationDuration={900}
                    iterations={1}
                    padding={1}
                    isView
                  >
                    {segment.text}
                  </Highlighter>
                ),
              )}
            </p>
          </BlurFade>

          <BlurFade inView delay={0.16}>
            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <MagicCard
                  key={metric.label}
                  className="hero-metric-card"
                  gradientFrom={metric.from}
                  gradientTo={metric.to}
                  gradientOpacity={0.2}
                  gradientSize={170}
                >
                  <p className="hero-metric-label">{metric.label}</p>
                  <p className="hero-metric-value">{metric.value}</p>
                </MagicCard>
              ))}
            </div>
          </BlurFade>

          <BlurFade inView delay={0.2}>
            <div className="flex flex-wrap items-center gap-2.5">
              <ShimmerButton
                as="a"
                href="#projects"
                className="h-10 px-4 text-sm font-semibold"
                background="linear-gradient(115deg, rgb(15,23,42), rgb(30,64,175))"
                shimmerColor="#93c5fd"
              >
                View Projects
              </ShimmerButton>
              <ShimmerButton
                as="a"
                href={resumeHref}
                download
                className="h-10 px-4 text-sm font-semibold"
                background="linear-gradient(115deg, rgba(15,23,42,0.92), rgba(71,85,105,0.92))"
                shimmerColor="#cbd5e1"
              >
                Download Resume
              </ShimmerButton>
              <ShimmerButton
                as="a"
                href={`mailto:${contact.email}`}
                className="h-10 px-4 text-sm font-semibold"
                background="linear-gradient(115deg, rgba(12,74,110,0.94), rgba(30,41,59,0.94))"
                shimmerColor="#67e8f9"
              >
                Let&apos;s Connect
              </ShimmerButton>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.24}>
            <div className="hero-marquee-shell">
              <Marquee
                pauseOnHover
                repeat={2}
                className="hero-marquee [--duration:44s] [--gap:0.75rem]"
              >
                <div className="hero-marquee-track">
                  {profile.focus.map((focusItem) => (
                    <span key={focusItem} className="hero-marquee-item">
                      {focusItem}
                    </span>
                  ))}
                </div>
              </Marquee>
            </div>
          </BlurFade>

          <BlurFade inView delay={0.28}>
            <MotionDemo />
          </BlurFade>
        </div>

        <BlurFade
          inView
          delay={0.14}
          direction="left"
          className="flex min-w-0 items-center lg:justify-end"
        >
          <MagicCard
            className="hero-image-card-shell w-full rounded-[1.85rem] p-px"
            mode="orb"
            gradientFrom="#60a5fa"
            gradientTo="#f472b6"
            gradientSize={280}
            glowFrom="#60a5fa"
            glowTo="#f472b6"
            glowSize={280}
            glowBlur={82}
            glowOpacity={0.18}
          >
            <div className="hero-image-shell relative w-full overflow-hidden rounded-[calc(1.85rem-1px)] border border-border/70 p-2">
              <div aria-hidden="true" className="hero-image-backdrop">
                <LightRays
                  className="hero-image-rays"
                  count={5}
                  blur={18}
                  speed={14}
                  color="rgba(255, 255, 255, 0.16)"
                  length="44vh"
                />
              </div>
              <Image
                src="/images/profile/img-2.jpeg"
                alt={`${profile.name} profile photo`}
                width={960}
                height={1200}
                priority
                className="hero-image-photo h-[min(54svh,520px)] w-full rounded-2xl object-cover object-center lg:h-[min(64svh,540px)]"
              />
              <div aria-hidden="true" className="hero-image-vignette" />

              <div className="hero-floating-card hero-floating-card-top left-4 top-4">
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

              <div className="hero-floating-card hero-floating-card-bottom right-4 bottom-4 flex items-center gap-3">
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
          </MagicCard>
        </BlurFade>
      </div>
    </section>
  );
}
