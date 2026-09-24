import Image from "next/image";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { ProjectData } from "@/types/portfolio";

type ProjectsSectionProps = {
  projects: ProjectData[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="rose" pattern="grid" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <BlurFade inView delay={0.04} className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
              Projects
            </AnimatedShinyText>
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Portfolio projects, client work, and shipped frontend builds.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            A selection of responsive websites and web applications built with
            React.js, Next.js, JavaScript, and modern frontend development
            practices.
          </p>
        </BlurFade>

        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <BlurFade key={project.title} inView delay={0.08 + index * 0.05}>
              <ModernGlowCard
                accentFrom={index % 2 === 0 ? "#38bdf8" : "#fb7185"}
                accentTo={index % 2 === 0 ? "#6366f1" : "#f59e0b"}
                className="relative p-5"
              >
                <article>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group/image block"
                    aria-label={`Open ${project.title} live demo`}
                  >
                    <div className="relative mb-4 overflow-hidden rounded-2xl border border-border/70 bg-background/80">
                      <Image
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        width={1440}
                        height={900}
                        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 520px"
                        className="h-44 w-full object-cover object-top transition-transform duration-500 group-hover/image:scale-[1.03]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                    </div>
                  </a>

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
              </ModernGlowCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
