import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { ProjectData } from "@/types/portfolio";

type ProjectsSectionProps = {
  projects: ProjectData[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative isolate mx-auto w-[min(1200px,95%)] overflow-hidden border-t border-border py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_14%,color-mix(in_oklch,var(--chart-2)_18%,transparent),transparent_50%),radial-gradient(circle_at_90%_82%,color-mix(in_oklch,var(--chart-5)_18%,transparent),transparent_56%)]"
      />
      <BlurFade inView delay={0.04} className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
            Projects
          </AnimatedShinyText>
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work and shipped interfaces.
        </h2>
      </BlurFade>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project, index) => (
          <BlurFade key={project.title} inView delay={0.08 + index * 0.05}>
            <MagicCard
              gradientFrom={index % 2 === 0 ? "#38bdf8" : "#fb7185"}
              gradientTo={index % 2 === 0 ? "#6366f1" : "#f59e0b"}
              gradientOpacity={0.18}
              className="relative rounded-3xl border border-border/75 bg-card/70 p-5"
            >
              {index === 0 ? (
                <BorderBeam
                  size={86}
                  duration={6.8}
                  delay={0.2}
                  borderWidth={1.5}
                  colorFrom="#22d3ee"
                  colorTo="#f472b6"
                />
              ) : null}
              <article>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="rounded-full border border-border/70 bg-background/72 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                    {project.status}
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((stackItem) => (
                    <span
                      key={`${project.title}-${stackItem}`}
                      className="rounded-full border border-border/70 bg-background/82 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {stackItem}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <ShimmerButton
                    as="a"
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="h-9 px-4 text-sm font-medium"
                    background="linear-gradient(115deg, rgb(15,23,42), rgb(14,116,144))"
                    shimmerColor="#67e8f9"
                  >
                    Live Demo
                  </ShimmerButton>

                  {project.repoUrl ? (
                    <ShimmerButton
                      as="a"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="h-9 px-4 text-sm font-medium"
                      background="linear-gradient(115deg, rgba(30,41,59,0.94), rgba(71,85,105,0.92))"
                      shimmerColor="#cbd5e1"
                    >
                      Repo
                    </ShimmerButton>
                  ) : null}
                </div>
              </article>
            </MagicCard>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
