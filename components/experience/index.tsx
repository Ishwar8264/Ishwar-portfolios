import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import type { ExperienceData } from "@/types/portfolio";

type ExperienceSectionProps = {
  experiences: ExperienceData[];
};

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="blue" pattern="ripple" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <BlurFade inView delay={0.04} className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
              Experience
            </AnimatedShinyText>
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Professional frontend engineering experience.
          </h2>
        </BlurFade>

        <div className="space-y-4">
          {experiences.map((item, index) => (
            <BlurFade
              key={`${item.company}-${item.period}`}
              inView
              delay={0.08 + index * 0.06}
            >
              <ModernGlowCard
                className="p-5 sm:p-6"
                accentFrom={index % 2 === 0 ? "#22d3ee" : "#fb7185"}
                accentTo={index % 2 === 0 ? "#3b82f6" : "#f59e0b"}
              >
                <article>
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{item.role}</h3>
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-sm text-muted-foreground hover:underline"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{item.company}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {item.period}
                      </p>
                      <p className="mt-1 text-sm font-medium">{item.location}</p>
                    </div>
                  </div>

                  {item.projectName ? (
                    <div className="mt-3">
                      {item.projectUrl ? (
                        <a
                          href={item.projectUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted"
                        >
                          Product: {item.projectName}
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground">
                          Product: {item.projectName}
                        </span>
                      )}
                    </div>
                  ) : null}

                  <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                    {item.highlights.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-1 block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ModernGlowCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
