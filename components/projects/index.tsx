import type { ProjectData } from "@/types/portfolio";

type ProjectsSectionProps = {
  projects: ProjectData[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="mx-auto w-[min(1200px,95%)] border-t border-border py-20"
    >
      <div className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Projects
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Selected work and shipped interfaces.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="rounded-3xl border border-border bg-card/70 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
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
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {stackItem}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Live Demo
              </a>

              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
                >
                  Repo
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
