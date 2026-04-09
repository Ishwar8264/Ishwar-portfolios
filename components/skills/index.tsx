import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import SectionBackground from "@/components/ui/section-background.client";
import type { SkillGroup } from "@/types/portfolio";

type SkillsSectionProps = {
  groups: SkillGroup[];
};

export default function SkillsSection({ groups }: SkillsSectionProps) {
  const marqueeItems = Array.from(
    new Set(groups.flatMap((group) => group.items)),
  );

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="teal" pattern="dot" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <BlurFade inView delay={0.04} className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
              Skills
            </AnimatedShinyText>
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frontend development skills for modern websites and web apps.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Focused on Next.js, React.js, JavaScript, responsive design,
            Tailwind CSS, and API integration for fast, user-friendly frontend
            experiences.
          </p>
        </BlurFade>

        <BlurFade
          inView
          delay={0.08}
          className="mb-5 rounded-2xl border border-border/70 bg-card/55 p-1.5"
        >
          <Marquee
            pauseOnHover
            repeat={3}
            className="[--duration:28s] [--gap:0.65rem] p-1"
          >
            {marqueeItems.map((item) => (
              <span
                key={`ticker-${item}`}
                className="rounded-full border border-border/65 bg-background/78 px-3 py-1 text-[11px] font-medium text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </Marquee>
        </BlurFade>

        <div className="grid gap-4 md:grid-cols-2">
          {groups.map((group, index) => (
            <BlurFade key={group.title} inView delay={0.1 + index * 0.05}>
              <MagicCard
                className="rounded-3xl border border-border/75 bg-card/65 p-5"
                gradientFrom={index % 2 === 0 ? "#0ea5e9" : "#f59e0b"}
                gradientTo={index % 2 === 0 ? "#14b8a6" : "#ec4899"}
                gradientOpacity={0.18}
                gradientSize={220}
              >
                <article>
                  <h3 className="text-lg font-semibold">{group.title}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </MagicCard>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
