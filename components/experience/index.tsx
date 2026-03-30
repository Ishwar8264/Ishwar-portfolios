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
        <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)] xl:items-start">
          <div className="space-y-4 xl:sticky xl:top-28">
            <BlurFade inView delay={0.04}>
              <ModernGlowCard
                className="min-w-0 p-5 sm:p-6"
                accentFrom="#38bdf8"
                accentTo="#6366f1"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                    Experience
                  </AnimatedShinyText>
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Frontend work presented like a product journey, not a plain
                  resume list.
                </h2>
                <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                  Each chapter highlights the role context, product surface, and
                  execution themes so the section feels easier to scan and more
                  credible at first glance.
                </p>

                {currentExperience ? (
                  <div className="mt-5 rounded-[1.6rem] border border-border/70 bg-background/70 p-4 backdrop-blur">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                        Current Chapter
                      </span>
                      {currentExperience.projectName ? (
                        <span className="rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                          {currentExperience.projectName}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-base font-semibold tracking-tight">
                      {currentExperience.role}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {currentExperience.company}
                    </p>
                    {currentExperience.summary ? (
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {currentExperience.summary}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </ModernGlowCard>
            </BlurFade>

            <BlurFade inView delay={0.08}>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
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

          <div className="relative min-w-0 pl-0 sm:pl-12">
            <div
              aria-hidden
              className="absolute top-0 bottom-0 left-4 hidden w-px bg-[linear-gradient(180deg,rgba(56,189,248,0.4),rgba(99,102,241,0.08),rgba(244,114,182,0.28))] sm:block"
            />

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
                      <div className="absolute top-8 left-0 hidden sm:flex sm:w-8 sm:justify-center">
                        <div className="flex size-8 items-center justify-center rounded-full border border-sky-400/30 bg-background/90 text-[10px] font-semibold tracking-[0.16em] text-sky-600 shadow-sm dark:text-sky-300">
                          {String(index + 1).padStart(2, "0")}
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-[130px_minmax(0,1fr)]">
                        <div className="hidden lg:block lg:pt-5">
                          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                            {startYear}
                          </p>
                          <p className="mt-1 text-sm font-medium text-foreground">
                            {endYear === startYear ? startYear : `${startYear} to ${endYear}`}
                          </p>
                        </div>

                        <ModernGlowCard
                          className="min-w-0 p-5 sm:p-6"
                          accentFrom={index % 2 === 0 ? "#38bdf8" : "#fb7185"}
                          accentTo={index % 2 === 0 ? "#6366f1" : "#f59e0b"}
                        >
                          <article className="min-w-0">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground lg:hidden">
                                    {item.period}
                                  </span>
                                  {current ? (
                                    <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                                      Current
                                    </span>
                                  ) : null}
                                  {item.projectName ? (
                                    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                                      Product-linked role
                                    </span>
                                  ) : null}
                                </div>

                                <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                                  {item.role}
                                </h3>

                                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                  {item.companyUrl ? (
                                    <a
                                      href={item.companyUrl}
                                      target="_blank"
                                      rel="noreferrer noopener"
                                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                                    >
                                      <Building2 className="size-4" />
                                      <span>{item.company}</span>
                                      <ArrowUpRight className="size-3.5" />
                                    </a>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5">
                                      <Building2 className="size-4" />
                                      <span>{item.company}</span>
                                    </span>
                                  )}

                                  <span className="inline-flex items-center gap-1.5">
                                    <MapPin className="size-4" />
                                    <span>{item.location}</span>
                                  </span>
                                </div>
                              </div>

                              {item.projectName ? (
                                item.projectUrl ? (
                                  <a
                                    href={item.projectUrl}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                  >
                                    <Sparkles className="size-3.5" />
                                    <span>{item.projectName}</span>
                                    <ArrowUpRight className="size-3.5" />
                                  </a>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/72 px-3 py-1 text-xs font-medium text-muted-foreground">
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
