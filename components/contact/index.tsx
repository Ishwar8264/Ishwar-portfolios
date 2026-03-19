import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import type { ContactData } from "@/types/portfolio";
import { resumeHref } from "@/content/profile";

type ContactSectionProps = {
  contact: ContactData;
};

export default function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="relative isolate mx-auto w-[min(1200px,95%)] overflow-hidden border-t border-border py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_16%_18%,color-mix(in_oklch,var(--chart-3)_20%,transparent),transparent_52%),radial-gradient(circle_at_84%_82%,color-mix(in_oklch,var(--chart-1)_18%,transparent),transparent_56%)]"
      />
      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <BlurFade inView delay={0.05}>
          <MagicCard
            mode="orb"
            glowFrom="#22d3ee"
            glowTo="#a855f7"
            glowOpacity={0.24}
            className="relative rounded-3xl border border-border/75 bg-card/70 p-6"
          >
            <BorderBeam
              size={88}
              duration={7.2}
              delay={0.4}
              borderWidth={1.5}
              colorFrom="#22d3ee"
              colorTo="#f97316"
            />
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <AnimatedShinyText className="text-xs uppercase tracking-[0.2em]">
                Contact
              </AnimatedShinyText>
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Let&apos;s build something sharp and useful.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              Open for frontend engineering roles, freelance builds, and
              product-focused collaboration.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <ShimmerButton
                as="a"
                href={`mailto:${contact.email}`}
                className="h-10 px-4 text-sm font-medium"
                background="linear-gradient(115deg, rgb(17,24,39), rgb(30,64,175))"
                shimmerColor="#93c5fd"
              >
                Email Me
              </ShimmerButton>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                LinkedIn
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                GitHub
              </a>
              <a
                href={resumeHref}
                download
                className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition-colors hover:bg-muted"
              >
                Download Resume
              </a>
            </div>
          </MagicCard>
        </BlurFade>

        <BlurFade inView delay={0.12}>
          <MagicCard
            className="rounded-3xl border border-border/75 bg-card/70 p-6"
            gradientFrom="#34d399"
            gradientTo="#3b82f6"
            gradientOpacity={0.16}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Direct Reach
            </p>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 block text-sm font-medium hover:underline"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Phone
                </p>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="mt-1 block text-sm font-medium hover:underline"
                >
                  {contact.phone}
                </a>
              </div>
            </div>
          </MagicCard>
        </BlurFade>
      </div>
    </section>
  );
}
