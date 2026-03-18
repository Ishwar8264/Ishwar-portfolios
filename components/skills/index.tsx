import type { SkillGroup } from "@/types/portfolio";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

export default function SkillsSection({ groups }: SkillsSectionProps) {
  return (
    <section id="skills" className="mx-auto w-[min(1200px,95%)] border-t border-border py-20">
      <div className="mb-8 space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Skills
        </p>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Frontend-first stack with product engineering focus.
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.title}
            className="rounded-3xl border border-border bg-card/70 p-5"
          >
            <h3 className="text-lg font-semibold">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
