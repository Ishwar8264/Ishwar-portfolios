import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import ModernGlowCard from "@/components/ui/modern-glow-card.client";
import SectionBackground from "@/components/ui/section-background.client";
import type { ServiceData } from "@/types/portfolio";

type ServicesSectionProps = {
  services: ServiceData[];
};

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden border-t border-border py-20"
    >
      <SectionBackground tone="rose" pattern="grid" />

      <div className="relative z-10 mx-auto w-[min(1200px,95%)]">
        <BlurFade inView delay={0.04} className="mb-8 space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
              Services
            </AnimatedShinyText>
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frontend development services for startups, businesses, and brands.
          </h2>
          <p className="max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            Helping clients in Gurugram and across India with modern React.js,
            Next.js, responsive UI, and frontend performance-focused builds.
          </p>
        </BlurFade>

        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <BlurFade key={service.title} inView delay={0.08 + index * 0.05}>
              <ModernGlowCard
                className="h-full p-5"
                accentFrom={index % 2 === 0 ? "#f59e0b" : "#22d3ee"}
                accentTo={index % 2 === 0 ? "#fb7185" : "#3b82f6"}
              >
                <article className="h-full">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Service {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                    {service.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {service.keywords.map((keyword) => (
                      <span
                        key={`${service.title}-${keyword}`}
                        className="rounded-full border border-border/70 bg-background/80 px-3 py-1 text-[11px] font-medium text-muted-foreground"
                      >
                        {keyword}
                      </span>
                    ))}
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
