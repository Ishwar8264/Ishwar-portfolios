import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  Laptop,
  MapPin,
  Sparkles,
  Workflow,
} from "lucide-react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import { cn } from "@/lib/utils";
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

type GroupKey = "job" | "freelance";

const GROUP_META: Record<
  GroupKey,
  {
    label: string;
    eyebrow: string;
    headline: string;
    description: string;
    accentFrom: string;
    accentTo: string;
    icon: typeof BriefcaseBusiness;
  }
> = {
  job: {
    label: "Job Experience",
    eyebrow: "Employment",
    headline:
      "Full-time frontend roles at startups — owning product UI end-to-end and shipping for real users.",
    description:
      "Companies I've worked at as a Frontend Developer, the products I've contributed to, and the impact delivered.",
    accentFrom: "#38bdf8",
    accentTo: "#6366f1",
    icon: BriefcaseBusiness,
  },
  freelance: {
    label: "Freelance Work",
    eyebrow: "Independent",
    headline:
      "Selective freelance frontend projects — websites, landing pages, and web apps shipped alongside my full-time role.",
    description:
      "Available for freelance frontend work. Below are select freelance engagements where I owned the frontend end-to-end.",
    accentFrom: "#fb7185",
    accentTo: "#f59e0b",
    icon: Laptop,
  },
};

function ExperienceItem({
  item,
  index,
  groupKey,
}: {
  item: ExperienceData;
  index: number;
  groupKey: GroupKey;
}) {
  const { startYear, endYear } = getYearRange(item.period);
  const current = isCurrentRole(item);
  const meta = GROUP_META[groupKey];
  const accentFrom = index % 2 === 0 ? meta.accentFrom : meta.accentTo;
  const accentTo = index % 2 === 0 ? meta.accentTo : meta.accentFrom;

  return (
    <BlurFade key={`${item.company}-${item.period}`} inView delay={0.1 + index * 0.06}>
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
          accentFrom={accentFrom}
          accentTo={accentTo}
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
                    {groupKey === "job" ? "Role" : "Engagement"} {String(index + 1).padStart(2, "0")}
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
}

function ExperienceGroup({
  groupKey,
  items,
}: {
  groupKey: GroupKey;
  items: ExperienceData[];
}) {
  const meta = GROUP_META[groupKey];
  const Icon = meta.icon;
  const currentExperience = items.find((item) => isCurrentRole(item)) ?? items[0];

  const stats = [
    {
      value: `${items.length}`,
      label: groupKey === "job" ? "Roles" : "Engagements",
      icon: BriefcaseBusiness,
      iconClassName: groupKey === "job" ? "text-sky-500" : "text-fuchsia-500",
      shellClassName:
        groupKey === "job"
          ? "bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(59,130,246,0.08))]"
          : "bg-[linear-gradient(135deg,rgba(236,72,153,0.14),rgba(245,158,11,0.08))]",
    },
    {
      value: `${items.filter((item) => item.projectName).length}`,
      label: "Product tracks",
      icon: BadgeCheck,
      iconClassName: "text-emerald-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(16,185,129,0.16),rgba(59,130,246,0.06))]",
    },
    {
      value: `${new Set(items.map((item) => getCityLabel(item.location))).size}`,
      label: "Locations",
      icon: MapPin,
      iconClassName: "text-amber-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(245,158,11,0.14),rgba(244,114,182,0.08))]",
    },
    {
      value: `${new Set(items.flatMap((item) => item.focusAreas ?? [])).size}`,
      label: "Focus areas",
      icon: Workflow,
      iconClassName: "text-violet-500",
      shellClassName:
        "bg-[linear-gradient(135deg,rgba(139,92,246,0.14),rgba(34,211,238,0.08))]",
    },
  ] as const;

  return (
    <div className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
        <div className="space-y-4 xl:sticky xl:top-28 xl:pt-5">
          <BlurFade inView delay={0.04}>
            <ModernGlowCard
              className="min-w-0 p-6 sm:p-7"
              accentFrom={meta.accentFrom}
              accentTo={meta.accentTo}
            >
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Icon className="size-3.5" />
                <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                  {meta.eyebrow}
                </AnimatedShinyText>
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                {meta.headline}
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-base">
                {meta.description}
              </p>

              {currentExperience ? (
                <div className="mt-6 rounded-[1.7rem] border border-border/70 bg-background/72 p-4 sm:p-5 backdrop-blur">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {groupKey === "job" ? "Current role" : "Active engagement"}
                  </p>
                  <p className="mt-3 text-base font-semibold tracking-tight">
                    {currentExperience.role}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                      {groupKey === "job" ? "Current Role" : "Available Now"}
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
              {stats.map((stat) => {
                const StatIcon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className={cn(
                      "rounded-2xl border border-border/70 px-4 py-4 shadow-sm backdrop-blur",
                      stat.shellClassName,
                    )}
                  >
                    <StatIcon className={cn("size-4", stat.iconClassName)} />
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
            <div
              className={cn(
                "experience-flow-line absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full opacity-85",
              )}
              style={{
                background: `linear-gradient(180deg, ${meta.accentFrom}, ${meta.accentTo})`,
              }}
            />
          </div>

          <div className="space-y-5">
            {items.map((item, index) => (
              <ExperienceItem
                key={`${item.company}-${item.period}`}
                item={item}
                index={index}
                groupKey={groupKey}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  const jobItems = experiences.filter((item) => (item.kind ?? "job") === "job");
  const freelanceItems = experiences.filter((item) => item.kind === "freelance");

  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="blue" pattern="ripple" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        {/* Section header — overall */}
        <BlurFade inView delay={0.02} className="mb-12 space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
              Experience
            </AnimatedShinyText>
          </p>
          <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Frontend experience across startups and freelance clients.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Currently working full-time as a Frontend Developer at a startup,
            with selective freelance frontend work on the side. Below is the
            full breakdown — split into employment and independent engagements.
          </p>
        </BlurFade>

        {jobItems.length > 0 ? (
          <div className="mb-16">
            <ExperienceGroup groupKey="job" items={jobItems} />
          </div>
        ) : null}

        {freelanceItems.length > 0 ? (
          <div>
            <ExperienceGroup groupKey="freelance" items={freelanceItems} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
