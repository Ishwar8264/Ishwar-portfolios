import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Sparkles,
  Workflow,
} from "lucide-react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import type { ExperienceData } from "@/types/portfolio";

type ExperienceSectionProps = {
  experiences: ExperienceData[];
};

function getCityLabel(location: string) {
  const [city] = location.split(",");
  return city?.trim() || location;
}

function getYearRange(period: string) {
  const years = period.match(/\d{4}/g) ?? [];
  const startYear = years[0] ?? period;
  const endYear = period.includes("Present")
    ? "Now"
    : years[years.length - 1] ?? startYear;

  return { startYear, endYear };
}

function isCurrentRole(item: ExperienceData) {
  return Boolean(item.current) || item.period.includes("Present");
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const cityCount = new Set(experiences.map((item) => getCityLabel(item.location)))
    .size;
  const liveProductCount = experiences.filter((item) => item.projectName).length;
  const focusAreaCount = new Set(
    experiences.flatMap((item) => item.focusAreas ?? []),
  ).size;
  const currentExperience =
    experiences.find((item) => isCurrentRole(item)) ?? experiences[0];

  const sectionStats = [
    {
      value: `${experiences.length}`,
      label: "Career chapters",
      icon: BriefcaseBusiness,
      iconClassName: "text-sky-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(59,130,246,0.08))]",
    },
    {
      value: `${liveProductCount}`,
      label: "Live product roles",
      icon: BadgeCheck,
      iconClassName: "text-emerald-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(59,130,246,0.06))]",
    },
    {
      value: `${cityCount}`,
      label: "City contexts",
      icon: MapPin,
      iconClassName: "text-fuchsia-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(236,72,153,0.14),rgba(99,102,241,0.08))]",
    },
    {
      value: `${focusAreaCount}`,
      label: "Frontend focus themes",
      icon: Workflow,
      iconClassName: "text-amber-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(245,158,11,0.14),rgba(244,114,182,0.08))]",
    },
  ] as const;

  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="blue" pattern="ripple" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
          <div className="space-y-4 xl:sticky xl:top-28">
            <BlurFade inView delay={0.04}>
              <ModernGlowCard
                className="min-w-0 p-6 sm:p-7"
                accentFrom="#38bdf8"
                accentTo="#6366f1"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                    Experience
                  </AnimatedShinyText>
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Experience shaped by startup delivery, responsive execution,
                  and product-focused frontend work.
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                  Cleaner chapter cards, stronger timeline anchors, and better
                  scan rhythm make the section feel more intentional.
                </p>

                {currentExperience ? (
                  <div className="mt-6 rounded-[1.7rem] border border-border/70 bg-background/72 p-4 sm:p-5 backdrop-blur">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      Current role snapshot
                    </p>
                    <p className="mt-3 text-base font-semibold tracking-tight">
                      {currentExperience.role}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                        Current Chapter
                      </span>
                      <span className="rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {currentExperience.company}
                      </span>
                      {currentExperience.projectName ? (
                        <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                          {currentExperience.projectName}
                        </span>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </ModernGlowCard>
            </BlurFade>

            <BlurFade inView delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                {sectionStats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className={`rounded-2xl border border-border/70 px-4 py-4 shadow-sm backdrop-blur ${stat.shellClassName}`}
                    >
                      <Icon className={`size-4 ${stat.iconClassName}`} />
                      <p className="mt-3 text-2xl font-semibold tracking-tight">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </BlurFade>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-[3.25rem] hidden sm:block"
            >
              <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-border/75" />
              <div className="experience-flow-line absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full opacity-85" />
            </div>

            <div className="space-y-5">
              {experiences.map((item, index) => {
                const { startYear, endYear } = getYearRange(item.period);
                const current = isCurrentRole(item);

                return (
                  <BlurFade
                    key={`${item.company}-${item.period}`}
                    inView
                    delay={0.1 + index * 0.06}
                  >
                    <div className="relative">
                      <div className="absolute top-5 left-[3.25rem] hidden -translate-x-1/2 sm:flex">
                        <div className="min-w-[88px] rounded-[1.35rem] border border-border/80 bg-background/92 px-3 py-2 text-center shadow-[0_14px_40px_-28px_rgba(59,130,246,0.45)] backdrop-blur">
                          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                            {startYear}
                          </p>
                          <p className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                            {endYear}
                          </p>
                        </div>
                      </div>

                      <ModernGlowCard
                        className="min-w-0 sm:ml-[6.5rem] p-5 sm:p-6"
                        accentFrom={index % 2 === 0 ? "#38bdf8" : "#fb7185"}
                        accentTo={index % 2 === 0 ? "#6366f1" : "#f59e0b"}
                      >
                        <article className="min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:hidden">
                                  {item.period}
                                </span>
                                {current ? (
                                  <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                                    Current
                                  </span>
                                ) : null}
                                <span className="rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                                  Chapter {String(index + 1).padStart(2, "0")}
                                </span>
                              </div>

                              <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                                {item.role}
                              </h3>
                            </div>

                            <span className="hidden rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground sm:inline-flex">
                              {item.period}
                            </span>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.companyUrl ? (
                              <a
                                href={item.companyUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              >
                                <Building2 className="size-3.5" />
                                <span>{item.company}</span>
                                <ArrowUpRight className="size-3.5" />
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-medium text-muted-foreground">
                                <Building2 className="size-3.5" />
                                <span>{item.company}</span>
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-medium text-muted-foreground">
                              <MapPin className="size-3.5" />
                              <span>{item.location}</span>
                            </span>

                            {item.projectName ? (
                              item.projectUrl ? (
                                <a
                                  href={item.projectUrl}
                                  target="_blank"
                                  rel="noreferrer noopener"
                                  className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 transition-colors hover:bg-sky-500/15 dark:text-sky-300"
                                >
                                  <Sparkles className="size-3.5" />
                                  <span>{item.projectName}</span>
                                  <ArrowUpRight className="size-3.5" />
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-700 dark:text-sky-300">
                                  <Sparkles className="size-3.5" />
                                  <span>{item.projectName}</span>
                                </span>
                              )
                            ) : null}
                          </div>

                          {item.summary ? (
                            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
                              {item.summary}
                            </p>
                          ) : null}

                          {item.focusAreas && item.focusAreas.length > 0 ? (
                            <div className="mt-4 flex flex-wrap gap-2">
                              {item.focusAreas.map((area) => (
                                <span
                                  key={`${item.company}-${area}`}
                                  className="rounded-full border border-border/70 bg-background/82 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                                >
                                  {area}
                                </span>
                              ))}
                            </div>
                          ) : null}

                          <div className="mt-5 grid gap-3 md:grid-cols-2">
                            {item.highlights.map((point) => (
                              <div
                                key={point}
                                className="flex gap-3 rounded-2xl border border-border/70 bg-background/62 p-3 backdrop-blur"
                              >
                                <div className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <Workflow className="size-3.5" />
                                </div>
                                <p className="text-sm leading-6 text-muted-foreground">
                                  {point}
                                </p>
                              </div>
                            ))}
                          </div>
                        </article>
                      </ModernGlowCard>
                    </div>
                  </BlurFade>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
